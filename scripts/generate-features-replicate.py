#!/usr/bin/env python3
"""
Generate feature photos via Replicate (flux-schnell).
Targets only platform-data.ts Unsplash w=1200 URLs.
"""

import os, re, time, requests, unicodedata

REPLICATE_TOKEN = os.environ["REPLICATE_API_TOKEN"]
PREDICT_URL = "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions"
OUT_DIR = "public/images/features"

FILES = [
    "src/lib/modules/data.ts",
    "src/lib/modules/extra-data.ts",
    "src/lib/modules/platform-data.ts",
]

MODULE_CONTEXT = {
    "sales": "paper mill sales and order management office",
    "procurement": "paper mill procurement and purchasing department",
    "production": "paper manufacturing production floor",
    "deckle": "paper mill reel slitting and deckle optimization",
    "inventory": "paper mill warehouse and inventory management",
    "finance": "paper mill finance and accounting department",
    "hr": "paper mill human resources and workforce",
    "ai": "AI-powered analytics for paper manufacturing",
    "party": "paper mill customer and vendor relationship management",
    "stock-preparation": "paper mill stock preparation and pulp processing area",
    "converting-finishing": "paper converting and finishing production line",
    "broke-management": "paper mill broke and waste recovery area",
    "recipe-development": "paper mill R&D laboratory and recipe development",
    "crm": "paper mill customer relationship management",
    "helpdesk": "customer service and support operations",
    "marketing-automation": "B2B marketing and lead generation",
    "field-service": "paper mill field service and technician operations",
    "iot-devices": "industrial IoT sensors and devices on paper machines",
    "digital-twin": "digital twin visualization of paper mill",
    "sustainability": "paper mill sustainability and ESG reporting",
    "edge-computing": "industrial edge computing for paper mill",
    "rpa": "robotic process automation for paper mill operations",
    "voice": "voice interface for industrial operations",
    "document-intelligence": "document processing and intelligence",
    "engineering-change": "engineering change management system",
    "administration": "enterprise system administration dashboard",
    "rbac": "role-based access control and security",
    "email-hub": "enterprise email management hub",
    "notifications": "smart notification and alerting system",
    "monitoring": "system health monitoring dashboard",
    "maintenance": "paper machine maintenance and CMMS",
    "quality": "paper quality management and testing laboratory",
    "projects": "project management and planning",
    "automations": "workflow automation platform",
    "mobile": "mobile operations for paper mill workers",
    "documents": "document management system",
    "product-catalog": "paper product catalog and grade master",
    "pricing": "pricing management and rate contracts",
    "lookups": "reference data management",
    "number-series": "document numbering and series management",
    "business-profile": "business profile and mill configuration",
    "approvals": "approval workflow management",
    "audit": "audit trail and compliance tracking",
    "lab-master": "laboratory master data and testing procedures",
}

FEATURE_PROMPTS = {
    "administration|Multi-Entity Setup": "Multi-company entity setup screen at paper mill group, org structure configuration, multi-tenant enterprise administration dashboard",
    "administration|Departments & Cost Centers": "Department and cost center configuration screen at paper mill, organizational hierarchy setup, cost center mapping interface",
    "administration|Governance & Templates": "System governance templates configuration at enterprise ERP, audit policy settings, compliance framework setup screen",
    "administration|Integration Hub": "ERP integration hub dashboard showing connected systems, API connection status, third-party system integration management screen",
    "rbac|Authentication": "Enterprise authentication configuration screen, SSO and multi-factor authentication settings, security policy management dashboard",
    "rbac|Roles & Permissions": "Role-based access control matrix screen at paper mill, permission assignment grid, user role configuration interface",
    "rbac|Audit & Compliance": "Access control audit log screen showing user activities, compliance report for role assignments, security audit dashboard",
    "email-hub|Templates & Variables": "Email template designer at paper mill ERP, dynamic variable insertion for transactional emails, template library management",
    "email-hub|Workflow Triggers": "Email workflow trigger configuration screen, automated email sequence setup, event-based email trigger management",
    "email-hub|Inbox & Email-to-Ticket": "Unified email inbox at paper mill support team, automatic email-to-ticket conversion screen, shared inbox management",
    "notifications|Smart Alerting": "Smart notification dashboard at paper mill operations, production alert configuration, threshold-based alerting system screen",
    "notifications|Auto-Escalation": "Alert escalation workflow configuration screen, multi-level escalation matrix, SLA breach notification management",
    "notifications|Predictive Alerts": "Predictive alerting dashboard using AI at paper mill, anomaly-based alert triggers, early warning system for production issues",
    "monitoring|Backend Health": "Server health monitoring dashboard at paper mill IT operations, API response time charts, database performance metrics screen",
    "monitoring|Frontend Monitoring": "Frontend application performance monitoring dashboard, page load times and error tracking, user experience metrics screen",
    "monitoring|SLA & Dashboards": "SLA compliance monitoring dashboard at paper mill, uptime metrics and performance SLA tracking, executive operations dashboard",
    "maintenance|Preventive Maintenance": "Preventive maintenance schedule calendar at paper mill, PM work orders for paper machines, maintenance planning screen",
    "maintenance|Breakdown Management": "Breakdown maintenance work order at paper mill, technician responding to machine failure, emergency repair workflow screen",
    "maintenance|Predictive & Condition-Based": "Predictive maintenance analytics dashboard at paper mill, vibration sensor trends predicting bearing failure, condition monitoring screen",
    "maintenance|Analytics & Reliability": "MTBF and MTTR reliability analytics at paper mill maintenance, equipment reliability charts, maintenance KPI dashboard",
    "quality|Quality Plans": "Quality control plan configuration screen at paper mill, inspection parameters for paper grades, quality plan management interface",
    "quality|Inspection Workflow": "Quality inspector performing paper inspection at paper mill lab, inspection checklist on tablet, pass fail determination process",
    "quality|NCR & CAPA": "Non-conformance report tracking dashboard at paper mill quality team, CAPA action plan management, corrective action workflow screen",
    "quality|LIMS & CoA": "Laboratory information management system at paper mill quality lab, Certificate of Analysis generation screen with test parameter actuals",
    "projects|Planning & WBS": "Project work breakdown structure on screen at paper mill, WBS chart with task hierarchy, project planning dashboard",
    "projects|Resource & Budget": "Project resource allocation and budget tracking screen, resource Gantt chart with cost tracking, project management dashboard",
    "projects|Risk & Milestones": "Project risk register and milestone tracking screen at paper mill, risk matrix visualization, project milestone timeline",
    "automations|Visual Designer": "Visual workflow automation designer on screen, drag-drop process builder, automation flowchart with triggers and actions",
    "automations|Triggers & Actions": "Automation trigger configuration screen showing event-based workflow triggers, action library selection, workflow automation settings",
    "automations|RPA & Templates": "Automation template library screen, pre-built workflow templates for paper mill processes, RPA bot template management",
    "automations|Monitoring & SLA": "Workflow automation monitoring dashboard, automation run history and SLA compliance, failed workflow alerts screen",
    "mobile|Shop Floor Operations": "Paper mill worker using mobile app on shop floor, work order completion on smartphone, mobile ERP for industrial workers",
    "mobile|Offline-First": "Mobile app working offline at paper mill shop floor, offline indicator on screen, data sync when connectivity returns",
    "mobile|Approvals & Dashboards": "Manager approving work order on mobile dashboard app, mobile approval workflow, executive dashboard on smartphone",
    "mobile|Field Service & Delivery": "Delivery driver using mobile app for e-Way bill and POD at paper mill dispatch, mobile delivery confirmation screen",
    "documents|Storage & Versioning": "Document management system screen at paper mill, version-controlled document library, file storage and retrieval interface",
    "documents|AI Classification & OCR": "AI-powered document classification screen at paper mill, automatic document categorization and OCR extraction, intelligent filing",
    "documents|Digital Signatures": "Digital signature workflow screen at paper mill, contract signing interface, electronic signature audit trail management",
    "documents|Retention & Compliance": "Document retention policy management screen, compliance archive settings, document lifecycle management dashboard",
    "product-catalog|Material & Grade Master": "Paper grade master data screen at paper mill, grade specifications with GSM brightness and burst strength parameters",
    "product-catalog|BOM & Routing": "Bill of materials and routing configuration at paper mill, BOM explosion screen with raw material components, production routing",
    "product-catalog|Customer Specifications": "Customer-specific paper specification screen at paper mill, custom grade parameters per customer, specification management dashboard",
    "pricing|Price Lists & Hierarchies": "Pricing hierarchy configuration screen at paper mill, grade-based price list with customer tier discounts, price matrix management",
    "pricing|Customer Rate Contracts": "Customer rate contract management screen at paper mill, long-term pricing agreement interface, contract validity and terms",
    "pricing|Margin & Approval": "Pricing margin analysis and approval screen at paper mill sales office, price override approval workflow, margin threshold alerts",
    "lookups|Statutory Reference Data": "Statutory reference data management screen at Indian paper mill, GST HSN codes and SAC codes master, tax reference library",
    "lookups|Geographic & Currency": "Geographic and currency master data screen, Indian state and district master, currency exchange rate management interface",
    "lookups|Business Reference": "Business reference data configuration screen at paper mill, industry-specific lookup tables, configurable reference data management",
    "number-series|Configurable Patterns": "Document number series configuration screen at paper mill, customizable numbering pattern with prefix suffix and sequence",
    "number-series|Statutory Compliance": "GST-compliant invoice number series at Indian paper mill, statutory numbering rules configuration, compliance number management",
    "number-series|Lifecycle Management": "Number series lifecycle management screen, series reset and rollover configuration, multi-year numbering management",
    "business-profile|Mill Profile Capture": "Paper mill business profile configuration screen, company details and mill specifications input form, initial ERP setup wizard",
    "business-profile|Auto-Configuration": "ERP auto-configuration screen after mill profile setup, automated system configuration based on mill type, setup completion dashboard",
    "business-profile|Compliance Setup": "Indian compliance configuration screen for paper mill ERP, GST registration and statutory compliance initial setup",
    "approvals|Unified Inbox": "Unified approval inbox at paper mill manager, pending approvals from multiple modules in one screen, mobile-ready approval dashboard",
    "approvals|Dynamic Matrix": "Approval matrix configuration screen at paper mill, dynamic approval rules based on amount and document type, matrix management",
    "approvals|SLA & Escalation": "Approval SLA and escalation configuration screen, pending approval aging report, auto-escalation rules management dashboard",
    "audit|Tamper-Proof Ledger": "Audit trail ledger screen at paper mill, immutable transaction log with user timestamp and change details, compliance audit trail",
    "audit|Compliance Calendar": "Compliance calendar screen at paper mill, statutory filing deadlines and reminders, GST TDS PF ESI compliance schedule",
    "audit|Auditor Workspace": "External auditor workspace at paper mill, read-only audit access interface, evidence gathering and report generation screen",
    "audit|Evidence Exports": "Audit evidence export screen at paper mill, bulk transaction export with supporting documents, auditor report package generation",
    "lab-master|Test Procedure Library": "Paper test procedure library at quality lab, standardized test method catalog, ISO test procedures for paper properties",
    "lab-master|Equipment & Calibration": "Lab equipment calibration management at paper mill quality lab, calibration schedule for testing instruments, equipment certification tracking",
    "lab-master|Sampling Plans": "Sampling plan configuration at paper mill quality lab, statistical sampling frequency for paper grade inspection, sampling standard settings",
}

def to_filename(slug, tag):
    tag_clean = unicodedata.normalize('NFKD', tag).encode('ascii', 'ignore').decode()
    tag_slug = re.sub(r'[^\w\s-]', '', tag_clean).strip().lower()
    tag_slug = re.sub(r'[\s_]+', '-', tag_slug)
    tag_slug = re.sub(r'-+', '-', tag_slug)
    return f"{slug}--{tag_slug}.jpg"

def get_prompt(slug, tag):
    key = f"{slug}|{tag}"
    if key in FEATURE_PROMPTS:
        prompt = FEATURE_PROMPTS[key]
    else:
        ctx = MODULE_CONTEXT.get(slug, "paper mill enterprise operations")
        prompt = f"{tag} feature in {ctx}, professional Indian industrial setting, photorealistic high quality"
    return prompt + ", dark industrial aesthetic, high quality photograph, no text overlays"

def generate_image(filepath, prompt):
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        return True, "skip"

    headers = {
        "Authorization": f"Bearer {REPLICATE_TOKEN}",
        "Content-Type": "application/json",
        "Prefer": "wait",
    }
    payload = {
        "input": {
            "prompt": prompt,
            "num_outputs": 1,
            "aspect_ratio": "3:2",
            "output_format": "jpg",
            "output_quality": 85,
            "num_inference_steps": 4,
        }
    }

    try:
        resp = requests.post(PREDICT_URL, headers=headers, json=payload, timeout=120)
        if resp.status_code not in (200, 201):
            return False, f"HTTP {resp.status_code}: {resp.text[:150]}"

        data = resp.json()

        # Poll if not complete yet
        if data.get("status") not in ("succeeded", None):
            poll_url = data.get("urls", {}).get("get")
            for _ in range(30):
                time.sleep(2)
                pr = requests.get(poll_url, headers={"Authorization": f"Bearer {REPLICATE_TOKEN}"}, timeout=30)
                data = pr.json()
                if data.get("status") == "succeeded":
                    break
                if data.get("status") == "failed":
                    return False, f"Replicate failed: {data.get('error')}"

        output = data.get("output")
        if not output:
            return False, f"No output: {str(data)[:150]}"

        img_url = output[0] if isinstance(output, list) else output
        img_resp = requests.get(img_url, timeout=60)
        if img_resp.status_code != 200:
            return False, f"Download failed: {img_resp.status_code}"

        with open(filepath, "wb") as f:
            f.write(img_resp.content)
        return True, f"{len(img_resp.content)} bytes"

    except Exception as e:
        return False, str(e)

def process_file(ts_path):
    with open(ts_path) as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = lines[:]
    current_slug = None
    current_tag = None
    ok = skip = fail = 0

    for i, line in enumerate(lines):
        slug_m = re.search(r'slug:\s*["\']([^"\']+)["\']', line)
        if slug_m:
            current_slug = slug_m.group(1)

        tag_m = re.search(r'\btag:\s*["\']([^"\']+)["\']', line)
        if tag_m:
            current_tag = tag_m.group(1)

        if 'images.unsplash.com' in line and 'w=1200' in line and current_slug and current_tag:
            fname = to_filename(current_slug, current_tag)
            fpath = os.path.join(OUT_DIR, fname)
            prompt = get_prompt(current_slug, current_tag)

            success, msg = generate_image(fpath, prompt)
            if success and msg == "skip":
                skip += 1
                print(f"  SKIP {current_slug}|{current_tag}")
            elif success:
                ok += 1
                local_url = f"/images/features/{fname}"
                new_lines[i] = re.sub(
                    r'https://images\.unsplash\.com[^\s"\']+',
                    local_url,
                    lines[i]
                )
                print(f"  OK   {current_slug}|{current_tag} ({msg})")
            else:
                fail += 1
                print(f"  FAIL {current_slug}|{current_tag}: {msg}")

    with open(ts_path, 'w') as f:
        f.write('\n'.join(new_lines))

    return ok, skip, fail

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    total_ok = total_skip = total_fail = 0
    for ts_path in FILES:
        print(f"\n=== {ts_path} ===")
        ok, skip, fail = process_file(ts_path)
        total_ok += ok
        total_skip += skip
        total_fail += fail
        print(f"  → {ok} generated, {skip} skipped, {fail} failed")

    print(f"\nTotal: {total_ok} generated, {total_skip} skipped, {total_fail} failed")

if __name__ == "__main__":
    main()
