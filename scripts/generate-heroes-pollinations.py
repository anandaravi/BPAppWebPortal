#!/usr/bin/env python3
"""Generate missing hero images via Pollinations.ai (free, no key required)."""

import os
import time
import urllib.parse
import requests

OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/heroes")

MODULES = [
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

BASE_URL = "https://image.pollinations.ai/prompt/{prompt}"


def generate_image(module: dict) -> bool:
    out_path = os.path.join(OUT_DIR, module["file"])
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"  SKIP {module['slug']} (already exists, {os.path.getsize(out_path)} bytes)")
        return True

    print(f"  GEN  {module['slug']}...")
    encoded = urllib.parse.quote(module["prompt"])
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1360&height=768&model=flux&nologo=true&seed=42"
    try:
        resp = requests.get(url, timeout=120)
        if resp.status_code != 200:
            print(f"  FAIL {module['slug']}: HTTP {resp.status_code}")
            return False
        if len(resp.content) < 1000:
            print(f"  FAIL {module['slug']}: too small ({len(resp.content)} bytes)")
            return False
        with open(out_path, "wb") as f:
            f.write(resp.content)
        print(f"  DONE {module['slug']} → {out_path} ({len(resp.content)} bytes)")
        return True
    except Exception as e:
        print(f"  ERR  {module['slug']}: {e}")
        return False


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Generating {len(MODULES)} hero images via Pollinations.ai → {OUT_DIR}\n")
    ok = fail = 0
    for m in MODULES:
        success = generate_image(m)
        if success:
            ok += 1
        else:
            fail += 1
        time.sleep(1)
    print(f"\nDone: {ok} OK, {fail} failed")


if __name__ == "__main__":
    main()
