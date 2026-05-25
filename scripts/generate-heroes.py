#!/usr/bin/env python3
"""Generate hero images via Cloudflare Workers AI (flux-1-schnell)."""

import os
import sys
import time
import requests

ACCOUNT_ID = os.environ["CLOUDFLARE_ACCOUNT_ID"]
API_TOKEN = os.environ["CLOUDFLARE_API_TOKEN"]
MODEL = "@cf/black-forest-labs/flux-1-schnell"
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/heroes")
BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{MODEL}"

MODULES = [
    {
        "slug": "sales",
        "file": "sales-hero.png",
        "prompt": "Paper mill sales office interior, order management workstation with multiple monitors showing production orders, Indian industrial setting, professional business environment, dramatic industrial lighting, dark moody atmosphere, photorealistic",
    },
    {
        "slug": "production",
        "file": "production-hero.png",
        "prompt": "Fourdrinier paper machine in full operation inside a large Indian paper mill, massive industrial machinery with wet end and dry end sections, steam rising, paper web forming on wire, dramatic industrial lighting, photorealistic high detail",
    },
    {
        "slug": "deckle",
        "file": "deckle-hero.png",
        "prompt": "Industrial reel slitting machine and rewinder in Indian paper mill, large paper reels being slit into customer widths, precision slitting operation, operator monitoring the process, industrial machinery close-up, dramatic lighting, photorealistic",
    },
    {
        "slug": "inventory",
        "file": "inventory-hero.png",
        "prompt": "Large paper mill warehouse interior, massive rolls of paper stacked in organized rows, forklift operating in reel storage yard, industrial racking systems, high bay warehouse lighting, Indian manufacturing facility, photorealistic",
    },
    {
        "slug": "procurement",
        "file": "procurement-hero.png",
        "prompt": "Raw material delivery at Indian paper mill, chemical drums and fiber bales arriving at receiving dock, truck unloading chemicals at mill entrance, industrial warehouse setting, dramatic lighting, photorealistic",
    },
    {
        "slug": "finance",
        "file": "finance-hero.png",
        "prompt": "Corporate finance office with multiple large monitors showing financial dashboards and GST compliance software, Indian business setting, professional accountant at desk, dark modern office interior, dramatic lighting, photorealistic",
    },
    {
        "slug": "hr",
        "file": "hr-hero.png",
        "prompt": "Indian paper mill workers during shift handover briefing, industrial workers in hard hats and safety gear gathered at mill floor, paper machine visible in background, industrial setting, candid professional moment, photorealistic",
    },
    {
        "slug": "ai",
        "file": "ai-hero.png",
        "prompt": "Futuristic AI analytics command center with large curved screens showing real-time production data, predictive analytics dashboards, neural network visualizations, dark room with blue and amber glowing interfaces, dramatic tech atmosphere, photorealistic",
    },
    {
        "slug": "maintenance",
        "file": "maintenance-hero.png",
        "prompt": "Maintenance engineer working on paper machine at Indian paper mill, technician with tools performing preventive maintenance on industrial machinery, close-up of mechanical components, professional industrial setting, dramatic lighting, photorealistic",
    },
    {
        "slug": "quality",
        "file": "quality-hero.png",
        "prompt": "Paper quality testing laboratory at Indian paper mill, technician testing paper samples with precision instruments, lab equipment for measuring GSM brightness and tensile strength, clean white lab coats, professional lab setting, photorealistic",
    },
    {
        "slug": "stock-preparation",
        "file": "stock-preparation-hero.png",
        "prompt": "Stock preparation area at paper mill, large pulp chest and agitators, fiber preparation equipment, mechanical refiners and blend chests, industrial piping system, steam and mist in air, dramatic industrial lighting, photorealistic",
    },
    {
        "slug": "converting-finishing",
        "file": "converting-finishing-hero.png",
        "prompt": "Paper converting and finishing line at Indian paper mill, sheeting machine cutting large paper reels into precise sheets, packaging line with ream wrappers, operators monitoring process, industrial production floor, photorealistic",
    },
    {
        "slug": "broke-management",
        "file": "broke-management-hero.png",
        "prompt": "Broke paper recovery area at paper mill, workers collecting waste paper broke into repulping vat, broke chest and pulping equipment, industrial recovery process, paper mill floor level view, dramatic industrial atmosphere, photorealistic",
    },
    {
        "slug": "crm",
        "file": "crm-hero.png",
        "prompt": "Indian paper industry sales executive meeting with customer at paper mill, business professionals in discussion, paper samples being reviewed, professional industrial visit setting, warm business relationship, natural light from windows, photorealistic",
    },
    {
        "slug": "digital-twin",
        "file": "digital-twin-hero.png",
        "prompt": "Digital twin visualization of paper mill, holographic 3D model of entire manufacturing facility floating above control desk, engineer interacting with virtual mill model, futuristic augmented reality overlay on industrial setting, amber and blue glowing interfaces, photorealistic",
    },
    {
        "slug": "iot-devices",
        "file": "iot-devices-hero.png",
        "prompt": "IoT sensors and PLC controllers mounted on paper machine in paper mill, network of industrial sensors with blinking status lights, MQTT gateway devices, modern industrial automation equipment, close-up of electronic control panels on machinery, photorealistic",
    },
    {
        "slug": "recipe-development",
        "file": "recipe-development-hero.png",
        "prompt": "Paper mill R&D laboratory, research scientist developing new paper formula, paper samples and testing equipment on lab bench, formula development workspace with notebooks and computers, Indian research laboratory setting, professional scientific environment, photorealistic",
    },
    {
        "slug": "party",
        "file": "party-hero.jpg",
        "prompt": "Indian paper industry business meeting, executives shaking hands after deal, customer and vendor relationship management in professional conference room, Indian business professionals in formal attire, warm relationship, natural office lighting, photorealistic",
    },
    {
        "slug": "helpdesk",
        "file": "helpdesk-hero.jpg",
        "prompt": "Customer support team at Indian paper company, support agents with headsets at workstations, help desk operation center with multiple monitors showing ticket dashboards, professional support environment, warm office lighting, photorealistic",
    },
    {
        "slug": "marketing-automation",
        "file": "marketing-automation-hero.jpg",
        "prompt": "B2B marketing team at Indian paper company office, marketing executives reviewing campaign analytics dashboards on large screens, lead generation funnel visualizations, modern marketing operations room, professional business setting, photorealistic",
    },
    {
        "slug": "field-service",
        "file": "field-service-hero.jpg",
        "prompt": "Field service technician visiting paper mill customer site, engineer in safety gear checking machinery with mobile tablet, on-site technical service at industrial facility, professional field service operation, Indian industrial setting, photorealistic",
    },
    {
        "slug": "sustainability",
        "file": "sustainability-hero.jpg",
        "prompt": "Sustainable paper manufacturing facility in India, solar panels on roof of paper mill, green landscaping around industrial plant, environmental compliance monitoring, clean production environment, ESG sustainability in Indian manufacturing, photorealistic",
    },
    {
        "slug": "edge-computing",
        "file": "edge-computing-hero.jpg",
        "prompt": "Industrial edge computing installation at paper mill, ruggedized compute hardware mounted in industrial panel cabinet near paper machine, blinking status LEDs on servers, cable management, factory automation setting, dramatic industrial lighting, photorealistic",
    },
    {
        "slug": "rpa",
        "file": "rpa-hero.jpg",
        "prompt": "Robotic process automation visualization at paper company office, computer screen showing automated data entry bots processing documents, GST portal automation, automated document workflow, modern Indian business office, tech-forward workplace, photorealistic",
    },
    {
        "slug": "voice",
        "file": "voice-hero.jpg",
        "prompt": "Paper mill worker using voice commands on factory floor, industrial worker speaking to AI assistant device while operating machinery, hands-free ERP interaction in manufacturing setting, speech recognition in industrial environment, photorealistic",
    },
    {
        "slug": "document-intelligence",
        "file": "document-intelligence-hero.jpg",
        "prompt": "Document intelligence processing center, computer screen showing AI extracting data from scanned invoices and purchase orders, optical character recognition highlighting fields, document automation workspace at Indian company, photorealistic",
    },
    {
        "slug": "engineering-change",
        "file": "engineering-change-hero.jpg",
        "prompt": "Engineering change management meeting at paper mill, engineers reviewing updated machine drawings and BOM changes on large screen, design change documentation process, technical team in conference room with engineering drawings, photorealistic",
    },
    {
        "slug": "administration",
        "file": "administration-hero.jpg",
        "prompt": "Enterprise system administration dashboard on large monitors, IT administrator configuring multi-company ERP settings, corporate data center background, professional IT operations center, dark modern office setting, photorealistic",
    },
    {
        "slug": "rbac",
        "file": "rbac-hero.jpg",
        "prompt": "Cybersecurity and access control dashboard, security administrator managing user permissions and role assignments on screen, enterprise security operations, digital lock and shield visualizations, dark professional IT environment, photorealistic",
    },
    {
        "slug": "email-hub",
        "file": "email-hub-hero.jpg",
        "prompt": "Enterprise email hub management dashboard, email template designer on screen, transactional email workflows for Indian paper company, professional business communication center, modern office setting, photorealistic",
    },
    {
        "slug": "notifications",
        "file": "notifications-hero.jpg",
        "prompt": "Smart notification and alerting command center, multiple screens showing real-time production alerts and system notifications, operations manager responding to production alerts, dark control room atmosphere, photorealistic",
    },
    {
        "slug": "monitoring",
        "file": "monitoring-hero.jpg",
        "prompt": "System health monitoring dashboard on large screens at paper mill IT operations center, server performance metrics and API response time charts, operations team monitoring ERP health, dark modern NOC setting, photorealistic",
    },
    {
        "slug": "projects",
        "file": "projects-hero.jpg",
        "prompt": "Project management war room at Indian paper company, Gantt chart and WBS on large display, project manager reviewing capital expansion timeline, professional project management setting, photorealistic",
    },
    {
        "slug": "automations",
        "file": "automations-hero.jpg",
        "prompt": "Visual workflow automation designer on screen, drag-drop process builder with colorful automation flows, IT professional building business automation, modern enterprise automation platform, professional office setting, photorealistic",
    },
    {
        "slug": "mobile",
        "file": "mobile-hero.jpg",
        "prompt": "Paper mill workers using mobile ERP app on smartphones and tablets on shop floor, industrial workers accessing production data on mobile devices, mobile operations in manufacturing setting, photorealistic",
    },
    {
        "slug": "documents",
        "file": "documents-hero.jpg",
        "prompt": "Digital document management system at Indian paper company, employee scanning documents at workstation, electronic document library on screen, paperless office transformation, professional document management setting, photorealistic",
    },
    {
        "slug": "product-catalog",
        "file": "product-catalog-hero.jpg",
        "prompt": "Paper product catalog and grade master system on screen, paper grade specifications with GSM brightness and technical parameters, product management dashboard at paper mill, professional product data management, photorealistic",
    },
    {
        "slug": "pricing",
        "file": "pricing-hero.jpg",
        "prompt": "Pricing management dashboard at paper company sales office, price list and customer rate contract screen, pricing analyst reviewing margin analysis, professional pricing operations setting, photorealistic",
    },
    {
        "slug": "lookups",
        "file": "lookups-hero.jpg",
        "prompt": "Reference data management screen at Indian ERP implementation, GST HSN code lookup configuration, statutory reference tables on screen, data management professional at workstation, professional office setting, photorealistic",
    },
    {
        "slug": "number-series",
        "file": "number-series-hero.jpg",
        "prompt": "Document numbering configuration screen for Indian paper company ERP, invoice and purchase order number series setup, compliance document numbering management, professional system configuration interface, photorealistic",
    },
    {
        "slug": "business-profile",
        "file": "business-profile-hero.jpg",
        "prompt": "Paper mill business profile setup wizard on screen, company configuration and mill specification input, ERP onboarding process for Indian paper manufacturer, professional system setup environment, photorealistic",
    },
    {
        "slug": "approvals",
        "file": "approvals-hero.jpg",
        "prompt": "Approval workflow management dashboard, manager reviewing pending approvals inbox with multiple document types, mobile approval screen on phone, enterprise approval management center, professional business setting, photorealistic",
    },
    {
        "slug": "audit",
        "file": "audit-hero.jpg",
        "prompt": "Compliance audit workspace at Indian paper company, auditor reviewing tamper-proof transaction logs on screen, audit trail documentation and evidence gathering, professional audit environment with organized records, photorealistic",
    },
    {
        "slug": "lab-master",
        "file": "lab-master-hero.jpg",
        "prompt": "Paper quality laboratory master data management, lab equipment calibration certificates and test procedure library on screen, quality lab manager reviewing testing standards, professional paper testing laboratory setting, photorealistic",
    },
]


def generate_image(module: dict) -> bool:
    out_path = os.path.join(OUT_DIR, module["file"])
    if os.path.exists(out_path):
        size = os.path.getsize(out_path)
        if size > 1000:
            print(f"  SKIP {module['slug']} (already exists, {size} bytes)")
            return True

    print(f"  GEN  {module['slug']}...")
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "prompt": module["prompt"],
        "num_steps": 8,
        "width": 1360,
        "height": 768,
    }
    try:
        resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
        if resp.status_code != 200:
            print(f"  FAIL {module['slug']}: HTTP {resp.status_code} — {resp.text[:200]}")
            return False
        content_type = resp.headers.get("Content-Type", "")
        if "image" in content_type or len(resp.content) > 1000:
            with open(out_path, "wb") as f:
                f.write(resp.content)
            print(f"  DONE {module['slug']} → {out_path} ({len(resp.content)} bytes)")
            return True
        else:
            print(f"  FAIL {module['slug']}: unexpected response — {resp.text[:300]}")
            return False
    except Exception as e:
        print(f"  ERR  {module['slug']}: {e}")
        return False


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Generating {len(MODULES)} hero images → {OUT_DIR}\n")
    ok = 0
    fail = 0
    for m in MODULES:
        success = generate_image(m)
        if success:
            ok += 1
        else:
            fail += 1
        time.sleep(0.5)  # be nice to the API
    print(f"\nDone: {ok} OK, {fail} failed")


if __name__ == "__main__":
    main()
