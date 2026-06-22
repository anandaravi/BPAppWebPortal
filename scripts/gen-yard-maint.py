#!/usr/bin/env python3
"""One-off: generate hero + feature images for the new yard & maintenance modules."""
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
    ("heroes/yard-hero.jpg", 1360, 768, f"Truck gate entrance of a large Indian paper mill, security gate house with boom barrier, lorries queued at the weighbridge, yard control tower, vehicles waiting, wide establishing shot, {STYLE}"),
    ("features/yard--gate-movement.jpg", 1200, 800, f"Security guard at mill gate checking a lorry with a tablet, gate pass on screen, driver in cab, boom barrier, gate house, {STYLE}"),
    ("features/yard--weighbridge-material.jpg", 1200, 800, f"Loaded truck on an industrial weighbridge platform at a paper mill, digital weighbridge display showing tonnage, raw material bales and chemical drums on the truck, operator booth, {STYLE}"),
    ("features/yard--zones-movement.jpg", 1200, 800, f"Aerial view of a paper mill yard organised into marked zones, trucks parked in numbered bays, loading docks, painted lane markings, forklifts moving between staging areas, {STYLE}"),
    ("features/yard--control-tower-mobile.jpg", 1200, 800, f"Logistics control room with large screens showing a live yard map and vehicle list, dispatcher monitoring gate movements, amber and blue glowing dashboards, dark room, {STYLE}"),
    ("features/maintenance--asset-master.jpg", 1200, 800, f"Industrial asset tag and QR code on a large paper machine, maintenance engineer scanning equipment with a tablet showing an asset register, machinery nameplate, {STYLE}"),
    ("features/maintenance--functional-locations.jpg", 1200, 800, f"Engineer studying a plant layout schematic on a screen showing hierarchical equipment locations, paper machine sections labelled, control room, {STYLE}"),
    ("features/maintenance--preventive-condition.jpg", 1200, 800, f"Maintenance technician with a vibration sensor and infrared thermometer inspecting a rotating roller bearing on a paper machine, condition monitoring gauges, {STYLE}"),
    ("features/maintenance--work-orders.jpg", 1200, 800, f"Maintenance crew executing a work order on a paper machine, technician with a checklist tablet and tools, spare parts laid out, hard hats, {STYLE}"),
    ("features/maintenance--lifecycle-depreciation.jpg", 1200, 800, f"Finance and engineering review of industrial asset value, screen showing depreciation chart and asset lifecycle timeline beside a paper machine, professional office, {STYLE}"),
]

def gen(rel, w, h, prompt):
    out = os.path.join(ROOT, rel)
    if os.path.exists(out) and os.path.getsize(out) > 1000:
        print(f"  SKIP {rel}"); return True
    for _ in range(2):
        r = requests.post(f"https://api.cloudflare.com/client/v4/accounts/{_state['id']}/ai/run/{MODEL}",
                          headers={"Authorization": f"Bearer {_state['token']}", "Content-Type": "application/json"},
                          json={"prompt": prompt, "num_steps": 8, "width": w, "height": h}, timeout=120)
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
    open(out, "wb").write(b)
    print(f"  DONE {rel} ({len(b)} bytes)"); return True

ok = sum(gen(*j) for j in JOBS)
print(f"\n{ok}/{len(JOBS)} generated")
sys.exit(0 if ok == len(JOBS) else 1)
