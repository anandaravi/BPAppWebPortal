#!/usr/bin/env python3
"""One-off: generate feature images for the deckle multi-machine/AI and production converting sections."""
import os, sys, requests

# load .env
for line in open(os.path.join(os.path.dirname(__file__), "../.env")):
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

MODEL = "@cf/black-forest-labs/flux-1-schnell"
ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
_state = {"id": os.environ["CLOUDFLARE_ACCOUNT_ID"], "token": os.environ["CLOUDFLARE_API_TOKEN"], "n": 1}

def switch():
    if _state["n"] == 2 or not os.environ.get("CLOUDFLARE_ACCOUNT_ID2"):
        return False
    _state.update(id=os.environ["CLOUDFLARE_ACCOUNT_ID2"], token=os.environ["CLOUDFLARE_API_TOKEN2"], n=2)
    print("  ⤳ account 2")
    return True

STYLE = "dark moody atmosphere, dramatic industrial lighting, photorealistic high detail, Indian paper mill setting"
JOBS = [
    ("features/deckle--multi-machine.jpg", 1200, 800, f"Wide view of a paper mill hall with three large paper machines side by side, each producing a jumbo reel, a planner in the foreground silhouetted against a glowing screen of coloured bars, no readable text, {STYLE}"),
    ("features/deckle--cost-model.jpg", 1200, 800, f"Paper reels being slit on a winder, thin strips of trim waste falling into a broke chute, amber light, close-up on the slitter knives and the narrow edge trim, no text, no screens, {STYLE}"),
    ("features/deckle--ai-review.jpg", 1200, 800, f"Engineer reviewing an AI assistant panel listing flagged configuration findings with severity badges beside a slitting plan, paper machine winder in background, {STYLE}"),
    ("features/production--winder-converting.jpg", 1200, 800, f"Large jumbo paper reel being slit on a winder into narrower reels, operator scanning a reel label with a handheld, slit pattern shown on a shop floor terminal, {STYLE}"),
    ("features/production--sheeting-packing.jpg", 1200, 800, f"Paper sheeter cutting reels into sheets, stacks of wrapped reams being bundled onto pallets with pack labels, operator counting reams, {STYLE}"),
]

def gen(rel, w, h, prompt):
    out = os.path.join(ROOT, rel)
    if os.path.exists(out) and os.path.getsize(out) > 1000:
        print(f"  SKIP {rel}"); return True
    for _ in range(2):
        r = requests.post(f"https://api.cloudflare.com/client/v4/accounts/{_state['id']}/ai/run/{MODEL}",
                          headers={"Authorization": f"Bearer {_state['token']}", "Content-Type": "application/json"},
                          json={"prompt": prompt, "steps": 8}, timeout=120)
        if r.status_code == 429 and switch():
            continue
        break
    if r.status_code != 200:
        print(f"  FAIL {rel}: HTTP {r.status_code} {r.text[:150]}"); return False
    ct = r.headers.get("Content-Type", "")
    if "image" in ct:
        b = r.content
    else:
        import json, base64
        b = base64.b64decode(json.loads(r.content)["result"]["image"])
    if len(b) < 1000:
        print(f"  FAIL {rel}: tiny ({len(b)})"); return False
    import io
    from PIL import Image
    img = Image.open(io.BytesIO(b)).convert("RGB")
    # centre-crop to the target aspect, then resize
    sw, sh = img.size
    if sw / sh > w / h:
        nw = int(sh * w / h); img = img.crop(((sw - nw) // 2, 0, (sw - nw) // 2 + nw, sh))
    else:
        nh = int(sw * h / w); img = img.crop((0, (sh - nh) // 2, sw, (sh - nh) // 2 + nh))
    img.resize((w, h), Image.LANCZOS).save(out, "JPEG", quality=85)
    print(f"  DONE {rel} ({len(b)} bytes)"); return True

ok = sum(gen(*j) for j in JOBS)
print(f"\n{ok}/{len(JOBS)} generated")
sys.exit(0 if ok == len(JOBS) else 1)
