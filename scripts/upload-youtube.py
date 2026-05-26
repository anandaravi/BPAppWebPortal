#!/usr/bin/env python3
"""
Upload a video to YouTube with full metadata.

Setup (one-time):
  1. Go to https://console.cloud.google.com/
  2. Create project → enable "YouTube Data API v3"
  3. Credentials → Create OAuth 2.0 Client ID → Desktop app
  4. Download JSON → save as scripts/client_secrets.json
  5. pip3 install google-api-python-client google-auth-oauthlib

Usage:
  python3 scripts/upload-youtube.py \\
    --file /path/to/video.mp4 \\
    --title "Stop Wasting ₹3 Crore/Year on Paper Trim" \\
    --description "desc.txt" \\
    --tags "paper mill,ERP,deckle optimizer,Indian manufacturing" \\
    --category 28 \\
    --thumb /path/to/thumbnail.jpg \\
    --privacy unlisted

Category IDs (common):
  28 = Science & Technology
  22 = People & Blogs
  27 = Education
  26 = Howto & Style
"""

import argparse
import os
import sys
import time

try:
    import googleapiclient.discovery
    import googleapiclient.errors
    import googleapiclient.http
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    import pickle
except ImportError:
    print("Missing packages. Run:")
    print("  pip3 install google-api-python-client google-auth-oauthlib")
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
SECRETS_FILE = os.path.join(os.path.dirname(__file__), "client_secrets.json")
TOKEN_FILE = os.path.join(os.path.dirname(__file__), ".youtube_token.pkl")
API_SERVICE = "youtube"
API_VERSION = "v3"
CHUNK_SIZE = 4 * 1024 * 1024  # 4 MB


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

    if not os.path.exists(SECRETS_FILE):
        print(f"ERROR: {SECRETS_FILE} not found.")
        print("Download OAuth 2.0 credentials from Google Cloud Console.")
        sys.exit(1)

    flow = InstalledAppFlow.from_client_secrets_file(SECRETS_FILE, SCOPES)
    creds = flow.run_local_server(port=0)
    with open(TOKEN_FILE, "wb") as f:
        pickle.dump(creds, f)
    print(f"Token saved → {TOKEN_FILE}")
    return creds


def upload_video(youtube, args):
    if args.description and os.path.isfile(args.description):
        with open(args.description) as f:
            description = f.read().strip()
    else:
        description = args.description or ""

    tags = [t.strip() for t in args.tags.split(",")] if args.tags else []

    body = {
        "snippet": {
            "title": args.title,
            "description": description,
            "tags": tags,
            "categoryId": str(args.category),
            "defaultLanguage": "en",
        },
        "status": {
            "privacyStatus": args.privacy,
            "selfDeclaredMadeForKids": False,
        },
    }

    media = googleapiclient.http.MediaFileUpload(
        args.file,
        chunksize=CHUNK_SIZE,
        resumable=True,
    )

    request = youtube.videos().insert(
        part=",".join(body.keys()),
        body=body,
        media_body=media,
    )

    print(f"\nUploading: {os.path.basename(args.file)}")
    print(f"  Title   : {args.title}")
    print(f"  Privacy : {args.privacy}")
    print(f"  Tags    : {tags}")
    print()

    response = None
    last_progress = -1
    while response is None:
        try:
            status, response = request.next_chunk()
            if status:
                pct = int(status.progress() * 100)
                if pct != last_progress:
                    bar = "█" * (pct // 5) + "░" * (20 - pct // 5)
                    print(f"\r  [{bar}] {pct}%", end="", flush=True)
                    last_progress = pct
        except googleapiclient.errors.HttpError as e:
            if e.resp.status in (500, 502, 503, 504):
                print(f"\n  Transient error {e.resp.status}, retrying in 5s...")
                time.sleep(5)
            else:
                raise

    print(f"\r  [{'█' * 20}] 100%")
    video_id = response["id"]
    print(f"\n  DONE → https://youtu.be/{video_id}")
    print(f"         https://studio.youtube.com/video/{video_id}/edit")

    if args.thumb:
        if not os.path.exists(args.thumb):
            print(f"  WARN: thumbnail not found: {args.thumb}")
        else:
            print(f"  Uploading thumbnail...")
            youtube.thumbnails().set(
                videoId=video_id,
                media_body=googleapiclient.http.MediaFileUpload(args.thumb),
            ).execute()
            print(f"  Thumbnail set.")

    return video_id


def main():
    parser = argparse.ArgumentParser(description="Upload video to YouTube")
    parser.add_argument("--file", required=True, help="Path to video file")
    parser.add_argument("--title", required=True, help="Video title")
    parser.add_argument(
        "--description",
        default="",
        help="Description text or path to a .txt file",
    )
    parser.add_argument(
        "--tags",
        default="",
        help="Comma-separated tags",
    )
    parser.add_argument(
        "--category",
        type=int,
        default=28,
        help="YouTube category ID (default: 28 = Science & Technology)",
    )
    parser.add_argument(
        "--thumb",
        default="",
        help="Path to thumbnail image (JPG/PNG, max 2MB)",
    )
    parser.add_argument(
        "--privacy",
        choices=["public", "private", "unlisted"],
        default="unlisted",
        help="Privacy status (default: unlisted)",
    )
    args = parser.parse_args()

    if not os.path.exists(args.file):
        print(f"ERROR: video file not found: {args.file}")
        sys.exit(1)

    creds = get_credentials()
    youtube = googleapiclient.discovery.build(
        API_SERVICE, API_VERSION, credentials=creds
    )
    upload_video(youtube, args)


if __name__ == "__main__":
    main()
