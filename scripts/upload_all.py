#!/usr/bin/env python3
"""
Batch upload all BPApp videos to YouTube with metadata.
Usage:
  python3 scripts/upload_all.py              # upload all
  python3 scripts/upload_all.py --only deckle  # only files matching keyword
  python3 scripts/upload_all.py --dry-run    # preview without uploading
"""

import argparse
import os
import sys
import time
import json

try:
    import googleapiclient.discovery
    import googleapiclient.errors
    import googleapiclient.http
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    import pickle
except ImportError:
    print("Run: pip3 install google-api-python-client google-auth-oauthlib")
    sys.exit(1)

sys.path.insert(0, os.path.dirname(__file__))
from video_metadata import VIDEOS

SECRETS_FILE = os.path.join(os.path.dirname(__file__), "client_secrets.json")
TOKEN_FILE = os.path.join(os.path.dirname(__file__), ".youtube_token.pkl")
RESULTS_FILE = os.path.join(os.path.dirname(__file__), "upload_results.json")
SCOPES = ["https://www.googleapis.com/auth/youtube"]
CHUNK_SIZE = 4 * 1024 * 1024


def get_credentials():
    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "rb") as f:
            creds = pickle.load(f)
    if creds and creds.valid:
        return creds
    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            with open(TOKEN_FILE, "wb") as f:
                pickle.dump(creds, f)
            return creds
        except Exception:
            pass
    flow = InstalledAppFlow.from_client_secrets_file(SECRETS_FILE, SCOPES)
    creds = flow.run_local_server(port=0)
    with open(TOKEN_FILE, "wb") as f:
        pickle.dump(creds, f)
    return creds


def add_to_playlist(youtube, video_id, playlist_id):
    youtube.playlistItems().insert(
        part="snippet",
        body={
            "snippet": {
                "playlistId": playlist_id,
                "resourceId": {"kind": "youtube#video", "videoId": video_id},
            }
        },
    ).execute()
    print(f"   ✓  Added to playlist → https://www.youtube.com/playlist?list={playlist_id}")


def upload_video(youtube, v, dry_run=False, playlist_id=None):
    fname = os.path.basename(v["file"])
    print(f"\n{'[DRY RUN] ' if dry_run else ''}▶  {fname}")
    print(f"   Title  : {v['title']}")
    print(f"   Privacy: {v['privacy']}  |  Category: {v['category']}")
    print(f"   Tags   : {', '.join(v['tags'][:5])}{'...' if len(v['tags']) > 5 else ''}")

    if dry_run:
        return None

    if not os.path.exists(v["file"]):
        print(f"   SKIP: file not found")
        return None

    # YouTube rejects < > and chars above U+FFFF (emoji outside BMP)
    def sanitize(text):
        text = text.replace("<", "(").replace(">", ")")
        return "".join(c if ord(c) <= 0xFFFF else "" for c in text)

    body = {
        "snippet": {
            "title": sanitize(v["title"]),
            "description": sanitize(v["description"]),
            "tags": v["tags"],
            "categoryId": str(v["category"]),
            "defaultLanguage": "en",
        },
        "status": {
            "privacyStatus": v["privacy"],
            "selfDeclaredMadeForKids": False,
        },
    }

    media = googleapiclient.http.MediaFileUpload(
        v["file"], chunksize=CHUNK_SIZE, resumable=True
    )
    request = youtube.videos().insert(
        part=",".join(body.keys()), body=body, media_body=media
    )

    response = None
    last_pct = -1
    while response is None:
        try:
            status, response = request.next_chunk()
            if status:
                pct = int(status.progress() * 100)
                if pct != last_pct:
                    bar = "█" * (pct // 5) + "░" * (20 - pct // 5)
                    print(f"\r   [{bar}] {pct}%", end="", flush=True)
                    last_pct = pct
        except googleapiclient.errors.HttpError as e:
            if e.resp.status in (500, 502, 503, 504):
                print(f"\n   Retrying after transient {e.resp.status}...")
                time.sleep(5)
            else:
                raise

    print(f"\r   [{'█' * 20}] 100%")
    video_id = response["id"]
    url = f"https://youtu.be/{video_id}"
    print(f"   ✓  {url}")
    if playlist_id:
        add_to_playlist(youtube, video_id, playlist_id)
    return video_id


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", default="", help="Filter: only upload files matching this keyword")
    parser.add_argument("--dry-run", action="store_true", help="Preview without uploading")
    parser.add_argument("--privacy", choices=["public", "private", "unlisted"],
                        help="Override privacy for all videos")
    parser.add_argument("--playlist", default="", help="YouTube playlist ID to add videos to")
    args = parser.parse_args()

    videos = VIDEOS
    if args.only:
        videos = [v for v in videos if args.only.lower() in v["file"].lower()
                  or args.only.lower() in v["title"].lower()]
        if not videos:
            print(f"No videos match '{args.only}'")
            sys.exit(1)

    if args.privacy:
        for v in videos:
            v["privacy"] = args.privacy

    # Load existing results to skip already-uploaded
    results = {}
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE) as f:
            results = json.load(f)

    print(f"{'DRY RUN — ' if args.dry_run else ''}Uploading {len(videos)} video(s)\n")
    print("─" * 60)

    if not args.dry_run:
        creds = get_credentials()
        youtube = googleapiclient.discovery.build("youtube", "v3", credentials=creds)
    else:
        youtube = None

    uploaded = 0
    skipped = 0
    failed = 0

    for v in videos:
        fname = os.path.basename(v["file"])
        if fname in results and not args.dry_run:
            print(f"\n  SKIP (already uploaded): {fname}")
            print(f"       → https://youtu.be/{results[fname]}")
            skipped += 1
            continue

        try:
            video_id = upload_video(youtube, v, dry_run=args.dry_run, playlist_id=args.playlist or None)
            if video_id:
                results[fname] = video_id
                with open(RESULTS_FILE, "w") as f:
                    json.dump(results, f, indent=2)
                uploaded += 1
        except Exception as e:
            print(f"\n   FAIL: {e}")
            failed += 1

    print(f"\n{'─' * 60}")
    print(f"Done: {uploaded} uploaded, {skipped} skipped, {failed} failed")
    if results and not args.dry_run:
        print(f"\nAll uploaded video IDs saved → {RESULTS_FILE}")
        for fname, vid_id in results.items():
            print(f"  {fname[:45]:<45} → https://youtu.be/{vid_id}")


if __name__ == "__main__":
    main()
