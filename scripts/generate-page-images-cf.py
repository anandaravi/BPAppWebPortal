#!/usr/bin/env python3
"""Generate page-level images via Cloudflare Workers AI (flux-1-schnell).
Fallback to account 2 if account 1 hits 429.
"""

import os
import sys
import time
import requests

ACCOUNT_ID = os.environ["CLOUDFLARE_ACCOUNT_ID"]
API_TOKEN = os.environ["CLOUDFLARE_API_TOKEN"]
ACCOUNT_ID2 = os.environ.get("CLOUDFLARE_ACCOUNT_ID2", "")
API_TOKEN2 = os.environ.get("CLOUDFLARE_API_TOKEN2", "")
MODEL = "@cf/black-forest-labs/flux-1-schnell"
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/pages")

_state = {"account": 1, "id": ACCOUNT_ID, "token": API_TOKEN}

def _base_url():
    return f"https://api.cloudflare.com/client/v4/accounts/{_state['id']}/ai/run/{MODEL}"

def _switch_account():
    if _state["account"] == 2 or not ACCOUNT_ID2 or not API_TOKEN2:
        return False
    _state["account"] = 2
    _state["id"] = ACCOUNT_ID2
    _state["token"] = API_TOKEN2
    print("  ⤳ switched to account 2")
    return True

IMAGES = [
    # --- page heroes ---
    {
        "file": "about-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Indian paper mill interior aerial overview, large modern paper manufacturing plant with multiple paper machines visible, industrial scale manufacturing facility, dramatic overhead industrial lighting, professional corporate photography, photorealistic",
    },
    {
        "file": "tech-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Modern enterprise software architecture visualization, server racks in data center with glowing network connections, dark moody tech environment with blue and amber light accents, cloud infrastructure concept, professional technology photography, photorealistic",
    },
    {
        "file": "pricing-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Indian business executive reviewing enterprise software pricing proposal in modern conference room, professional business meeting, financial planning documents on table, corporate Indian business setting, professional photography, photorealistic",
    },
    # --- solutions personas ---
    {
        "file": "solutions-cfo.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian CFO finance controller reviewing financial dashboards on multiple monitors, corporate finance office, professional Indian executive in business attire, serious focused expression, modern Indian corporate setting, photorealistic",
    },
    {
        "file": "solutions-plant-head.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian plant director on paper mill factory floor, experienced production executive in hard hat reviewing operations, paper machines visible in background, confident industrial leader, Indian manufacturing setting, photorealistic",
    },
    {
        "file": "solutions-ops-manager.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian operations manager at paper mill control room, reviewing production schedules on large screens, operations center with multiple monitors, professional middle management, Indian industrial setting, photorealistic",
    },
    {
        "file": "solutions-it-head.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian CIO IT head at enterprise technology operations center, reviewing system architecture diagrams, server room background visible, professional Indian tech executive, modern Indian corporate IT setting, photorealistic",
    },
    {
        "file": "solutions-sales-head.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian sales director at paper company meeting with customer, commercial head reviewing order pipeline on tablet, professional Indian sales executive, modern Indian business office, photorealistic",
    },
    {
        "file": "solutions-hr-head.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian HR director managing payroll and workforce planning at paper mill, people and culture leader at desk with HR dashboard on screen, professional Indian HR executive, corporate Indian office setting, photorealistic",
    },
    {
        "file": "solutions-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Diverse Indian executive team in boardroom, paper mill leadership team meeting, MD and functional heads gathered around conference table reviewing ERP implementation plans, professional Indian corporate photography, photorealistic",
    },
    # --- customer mill types ---
    {
        "file": "customers-small-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Small Indian paper mill exterior, compact paper manufacturing plant with single machine, industrial building in Indian town, small-scale paper manufacturing facility, photorealistic",
    },
    {
        "file": "customers-medium-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Medium scale Indian paper mill production floor, two or three paper machines in operation, workers on factory floor, mid-size paper manufacturing facility in India, photorealistic",
    },
    {
        "file": "customers-large-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Large Indian paper mill with multiple high-speed paper machines, industrial scale paper manufacturing, massive production hall with advanced machinery, major Indian paper company facility, photorealistic",
    },
    {
        "file": "customers-multisite.jpg",
        "w": 1200, "h": 800,
        "prompt": "Multi-plant paper manufacturing group in India, aerial view showing two separate mill campuses, corporate paper group with multiple facilities, Indian industrial landscape, photorealistic",
    },
    {
        "file": "customers-integrated-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Integrated pulp and paper mill in India, complete facility with pulp mill recovery boiler and paper machines, large scale integrated manufacturing complex, Indian paper industry facility, photorealistic",
    },
    {
        "file": "customers-kraft-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Kraft paper manufacturing line in Indian paper mill, brown kraft paper being produced on wide paper machine, industrial kraft paper production, Indian packaging paper facility, photorealistic",
    },
    {
        "file": "customers-tissue-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Tissue paper manufacturing in Indian paper mill, tissue machine producing rolls of bathroom tissue and facial tissue, clean room environment, modern tissue paper production facility, photorealistic",
    },
    {
        "file": "customers-specialty-board.jpg",
        "w": 1200, "h": 800,
        "prompt": "Specialty board and packaging paper production at Indian mill, multi-ply paperboard machine in operation, specialty coated board manufacturing, Indian packaging board facility, photorealistic",
    },
    {
        "file": "customers-recycled-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Recycled paper mill in India, waste paper bales being fed into repulper, recycled fiber processing, waste paper recovery and recycling plant, Indian recycled paper manufacturing, photorealistic",
    },
    {
        "file": "customers-cooperative-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian cooperative paper mill, worker-owned manufacturing cooperative, paper mill workers gathered outside facility, sahakari mill in Maharashtra or Gujarat, Indian cooperative industrial, photorealistic",
    },
    {
        "file": "customers-newsprint-mill.jpg",
        "w": 1200, "h": 800,
        "prompt": "Newsprint paper mill in India, high-speed newsprint machine producing large rolls of newspaper paper, newsprint manufacturing facility, Indian newsprint production, photorealistic",
    },
    {
        "file": "customers-trader.jpg",
        "w": 1200, "h": 800,
        "prompt": "Indian paper trading and distribution warehouse, large stacks of paper reams and cartons organized in modern warehouse, paper distributor godown, paper trading company in India, photorealistic",
    },
    {
        "file": "customers-converting.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper converting unit in India, sheeting and cutting machines converting large paper reels into finished products, small converting factory, Indian paper converting operation, photorealistic",
    },
    {
        "file": "customers-job-worker.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper job work unit in India, paper mill contractor processing material from multiple principals, small paper processing facility, Indian job worker industrial setting, photorealistic",
    },
    {
        "file": "customers-oem.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper machinery manufacturing facility in India, engineers assembling paper machine components, paper equipment OEM workshop, precision engineering for paper industry, Indian machinery manufacturer, photorealistic",
    },
    {
        "file": "customers-epc.jpg",
        "w": 1200, "h": 800,
        "prompt": "Engineering consultants at paper mill construction site in India, EPC team reviewing blueprints at new mill under construction, project management at paper mill build, Indian EPC contractor, photorealistic",
    },
    {
        "file": "customers-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Diverse Indian paper industry customers gathered at industry conference, paper mill owners and executives at trade show, Indian paper industry association event, professional industry gathering, photorealistic",
    },
    # --- principles ---
    {
        "file": "principles-modular.jpg",
        "w": 1360, "h": 768,
        "prompt": "Modular software architecture visualization, colorful building blocks connecting into complete system, clean modern tech illustration, modular ERP system design, dark background with amber and blue accents, photorealistic",
    },
    {
        "file": "principles-api-first.jpg",
        "w": 1360, "h": 768,
        "prompt": "API integration network visualization, glowing lines connecting multiple systems and applications, REST API endpoints connecting enterprise systems, dark background with amber network connections, tech architecture concept, photorealistic",
    },
    {
        "file": "principles-multitenancy.jpg",
        "w": 1360, "h": 768,
        "prompt": "Multi-tenant cloud architecture concept, multiple isolated business environments within single platform, enterprise SaaS multi-tenancy visualization, dark tech background with segmented data environments, photorealistic",
    },
    {
        "file": "principles-audit.jpg",
        "w": 1360, "h": 768,
        "prompt": "Enterprise audit trail visualization, immutable transaction log screen with timestamps and user actions, compliance audit dashboard, secure tamper-proof records system, dark professional interface, photorealistic",
    },
    {
        "file": "principles-feature-flags.jpg",
        "w": 1360, "h": 768,
        "prompt": "Feature flag management dashboard, software configuration toggles and switches controlling feature rollouts, modern feature management interface, dark tech environment, product configuration control panel, photorealistic",
    },
    {
        "file": "principles-ai-ready.jpg",
        "w": 1360, "h": 768,
        "prompt": "AI and machine learning infrastructure concept, neural network visualization with glowing nodes and connections, AI-ready enterprise platform, dark background with amber and blue neural network patterns, futuristic tech visualization, photorealistic",
    },
    {
        "file": "principles-workflows.jpg",
        "w": 1360, "h": 768,
        "prompt": "Visual workflow configuration designer, drag-drop business process builder on screen, configurable approval workflow diagram, enterprise workflow management tool, professional dark interface, photorealistic",
    },
    {
        "file": "principles-event-driven.jpg",
        "w": 1360, "h": 768,
        "prompt": "Event-driven architecture visualization, real-time event streaming system with pub-sub message flows, enterprise event bus concept, dark tech background with flowing data streams and event processing nodes, photorealistic",
    },
    {
        "file": "principles-scalable.jpg",
        "w": 1360, "h": 768,
        "prompt": "Horizontally scalable cloud infrastructure, server cluster auto-scaling with load, enterprise cloud architecture, dark data center background with scaling nodes and load balancers, modern infrastructure concept, photorealistic",
    },
    # --- deckle deep-dive ---
    {
        "file": "deckle-reactive.jpg",
        "w": 1200, "h": 800,
        "prompt": "Urgent order change notification on paper mill operations screen, production planner quickly responding to customer cancellation, real-time deckle reoptimization on monitor, reactive production planning, Indian paper mill control room, photorealistic",
    },
    {
        "file": "deckle-planning.jpg",
        "w": 1200, "h": 800,
        "prompt": "Production planning session at Indian paper mill, planner building next day master production schedule, order board with deckle assignments on screen, paper mill planning office, professional planning environment, photorealistic",
    },
    {
        "file": "deckle-strategic.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper mill sales executive quoting new customer, customer pricing and deckle feasibility analysis on screen, strategic pricing discussion at paper company office, professional Indian business setting, photorealistic",
    },
    {
        "file": "deckle-learning.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper mill data analyst reviewing deckle pattern performance data, optimization learning visualization showing improving trim waste over time, data-driven production improvement, Indian paper mill analytics dashboard, photorealistic",
    },
    {
        "file": "deckle-deepdive-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Industrial slitting machine and rewinder at Indian paper mill, close-up of precision slitting blades cutting paper reels into multiple widths simultaneously, narrow slit reels on mandrel, dramatic industrial photography, photorealistic",
    },
    # --- production deep-dive ---
    {
        "file": "production-deepdive-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Fourdrinier paper machine wet end and dry end in full operation at Indian paper mill, paper web forming on wire, steam rising, operators on platform monitoring controls, dramatic industrial lighting, photorealistic",
    },
    {
        "file": "production-breakdown.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper mill maintenance crew responding to unexpected breakdown on PM-2 paper machine, technicians with toolboxes diagnosing failure mid-shift, warning lights, industrial emergency repair, photorealistic",
    },
    {
        "file": "production-daily-plan.jpg",
        "w": 1200, "h": 800,
        "prompt": "Production planner at Indian paper mill working on daily master schedule, Gantt chart with grade-color-coded runs on screen, planning office with multiple monitors, professional industrial setting, photorealistic",
    },
    {
        "file": "production-oee-drop.jpg",
        "w": 1200, "h": 800,
        "prompt": "OEE analytics dashboard at paper mill control room showing seven-point drop in availability metric, root-cause investigation on screen, operations manager analyzing performance loss, photorealistic",
    },
    {
        "file": "production-stock-prep.jpg",
        "w": 1200, "h": 800,
        "prompt": "Integrated pulp-and-paper mill stock preparation area starving downstream paper machine PM-3, pulp chest level alarms on SCADA screen, operator coordinating between pulp and paper sides, photorealistic",
    },
    # --- finance deep-dive ---
    {
        "file": "finance-deepdive-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Indian paper mill finance office with large monitors showing GST compliance dashboard and e-invoice generation, chief financial officer reviewing books, professional accounting environment, dramatic lighting, photorealistic",
    },
    {
        "file": "finance-gst-close.jpg",
        "w": 1200, "h": 800,
        "prompt": "GST month-end closing process at Indian paper mill finance team, GSTR-1 and GSTR-3B reconciliation on screen, calm finance staff completing returns on time, professional office setting, photorealistic",
    },
    {
        "file": "finance-margin.jpg",
        "w": 1200, "h": 800,
        "prompt": "Margin analysis dashboard at paper mill finance office, daily contribution per customer and grade breakdown on screen, profitability heatmap visualization, financial analyst reviewing margins, photorealistic",
    },
    {
        "file": "finance-export.jpg",
        "w": 1200, "h": 800,
        "prompt": "Export shipment trade finance workspace at Indian paper mill, shipping bill and eBRC documents on desk, FEMA compliance dashboard on screen, export finance professional reviewing realisation, photorealistic",
    },
    {
        "file": "finance-3way-match.jpg",
        "w": 1200, "h": 800,
        "prompt": "Three-way match process at Indian paper mill accounts payable team, PO and GRN and vendor invoice comparison on screen catching overcharge of four point seven lakh rupees, professional finance office, photorealistic",
    },
    # --- hr deep-dive ---
    {
        "file": "hr-deepdive-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "Indian paper mill HR office overview, HR director and payroll team at workstations, employees in queue at biometric attendance scanner outside, professional industrial HR environment, photorealistic",
    },
    {
        "file": "hr-payroll-close.jpg",
        "w": 1200, "h": 800,
        "prompt": "Five hundred employee paper mill monthly payroll closing in one day, payroll team at Indian HR office finalizing salaries with PF ESI TDS deductions on screen, professional payroll operations, photorealistic",
    },
    {
        "file": "hr-audit-records.jpg",
        "w": 1200, "h": 800,
        "prompt": "Audit-ready employee records archive at Indian paper mill HR office, seven year history of payroll documents on screen, auditor reviewing immutable HR audit trail, professional records management, photorealistic",
    },
    {
        "file": "hr-shift-gap.jpg",
        "w": 1200, "h": 800,
        "prompt": "Shift roster planning at paper mill HR office, shift-gap rule violation alert blocking unsafe crew assignment on screen, supervisor adjusting roster, statutory compliance check, photorealistic",
    },
    {
        "file": "hr-mobile-ess.jpg",
        "w": 1200, "h": 800,
        "prompt": "Paper mill shop floor worker using employee self service app on smartphone, mobile ESS interface showing payslip and leave balance, blue-collar Indian worker reducing HR walk-ins, photorealistic",
    },
    # --- ai deep-dive ---
    {
        "file": "ai-deepdive-hero.jpg",
        "w": 1360, "h": 768,
        "prompt": "AI command center at Indian paper mill, plant manager conversing with AI assistant, large screens showing neural network visualizations and live KPI predictions, amber and blue glowing interfaces, futuristic photorealistic",
    },
    {
        "file": "ai-margin-query.jpg",
        "w": 1200, "h": 800,
        "prompt": "Plant manager at Indian paper mill asking AI conversational interface why margin is down on KR-100 grade, chat interface with cited source records on screen, professional analytics workspace, photorealistic",
    },
    {
        "file": "ai-predictive-bearing.jpg",
        "w": 1200, "h": 800,
        "prompt": "Predictive maintenance AI alert at paper mill showing bearing failure forecast in thirty-eight hours, vibration sensor trend chart with anomaly highlight, maintenance engineer reviewing prediction, photorealistic",
    },
    {
        "file": "ai-bulk-dunning.jpg",
        "w": 1200, "h": 800,
        "prompt": "Bulk dunning operation dashboard at Indian paper mill finance office, AI sending personalized dunning communications to two hundred forty overdue accounts with preview diff, professional bulk action workflow, photorealistic",
    },
    {
        "file": "ai-quality-anomaly.jpg",
        "w": 1200, "h": 800,
        "prompt": "Quality AI anomaly detection at paper mill, defect pattern identified across fourteen paper reels on screen, root-cause cluster visualization, quality engineer investigating, professional QA workspace, photorealistic",
    },
]


def generate_image(img: dict) -> bool:
    out_path = os.path.join(OUT_DIR, img["file"])
    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
        print(f"  SKIP {img['file']} ({os.path.getsize(out_path)} bytes)")
        return True

    print(f"  GEN  {img['file']}...")
    payload = {
        "prompt": img["prompt"],
        "num_steps": 8,
        "width": img["w"],
        "height": img["h"],
    }
    try:
        for attempt in range(2):
            headers = {
                "Authorization": f"Bearer {_state['token']}",
                "Content-Type": "application/json",
            }
            resp = requests.post(_base_url(), headers=headers, json=payload, timeout=120)
            if resp.status_code == 429:
                if _switch_account():
                    continue
                print(f"  STOP: 429 on both accounts — daily quota exhausted")
                sys.exit(2)
            break
        if resp.status_code != 200:
            print(f"  FAIL {img['file']}: HTTP {resp.status_code} — {resp.text[:200]}")
            return False
        content_type = resp.headers.get("Content-Type", "")
        if "image" in content_type:
            img_bytes = resp.content
        elif "json" in content_type or resp.content[:1] == b"{":
            import json as _json, base64 as _b64
            data = _json.loads(resp.content)
            img_bytes = _b64.b64decode(data["result"]["image"])
        else:
            print(f"  FAIL {img['file']}: unexpected response — {resp.text[:300]}")
            return False
        if len(img_bytes) < 1000:
            print(f"  FAIL {img['file']}: image too small ({len(img_bytes)} bytes)")
            return False
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print(f"  DONE {img['file']} ({len(img_bytes)} bytes)")
        return True
    except Exception as e:
        print(f"  ERR  {img['file']}: {e}")
        return False


def _log_summary(gen, skip, fail):
    from datetime import datetime
    log_path = os.path.join(os.path.dirname(__file__), "_generation.log")
    ts = datetime.now().isoformat(timespec="seconds")
    with open(log_path, "a") as f:
        f.write(f"{ts} generate-page-images-cf.py gen={gen} skip={skip} fail={fail}\n")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Generating {len(IMAGES)} page images via CF flux-1-schnell → {OUT_DIR}\n")
    gen = skip = fail = 0
    for img in IMAGES:
        out_path = os.path.join(OUT_DIR, img["file"])
        pre_exists = os.path.exists(out_path) and os.path.getsize(out_path) > 10000
        success = generate_image(img)
        if success and pre_exists:
            skip += 1
        elif success:
            gen += 1
        else:
            fail += 1
        time.sleep(0.5)
    print(f"\nDone: {gen} generated, {skip} skipped, {fail} failed")
    _log_summary(gen, skip, fail)


if __name__ == "__main__":
    main()
