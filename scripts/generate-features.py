#!/usr/bin/env python3
"""
Generate feature section photos via Cloudflare Workers AI.
Parses all 3 module data TS files, finds Unsplash w=1200 feature photos,
generates AI replacements, saves to public/images/features/, updates TS files.
"""

import os, re, json, base64, time, requests, unicodedata

ACCOUNT_ID = os.environ["CLOUDFLARE_ACCOUNT_ID"]
API_TOKEN = os.environ["CLOUDFLARE_API_TOKEN"]
ACCOUNT_ID2 = os.environ.get("CLOUDFLARE_ACCOUNT_ID2", "")
API_TOKEN2 = os.environ.get("CLOUDFLARE_API_TOKEN2", "")
MODEL = "@cf/black-forest-labs/flux-1-schnell"
OUT_DIR = "public/images/features"

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

import sys as _sys

FILES = [
    "src/lib/modules/data.ts",
    "src/lib/modules/extra-data.ts",
    "src/lib/modules/platform-data.ts",
]

# Module-level context for prompts
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

# Feature-specific prompt overrides (module|tag -> prompt)
FEATURE_PROMPTS = {
    # Sales
    "sales|Inquiry & Quotation": "Paper mill sales executive reviewing customer inquiry on computer screen, professional Indian office setting, creating detailed quotation for paper grades, dark modern workspace",
    "sales|Sales Order Lifecycle": "Sales order management dashboard on computer screens in paper mill office, order processing workflow, Indian business professional reviewing order status",
    "sales|Dispatch Control Tower": "Paper mill dispatch control room with multiple screens showing lorry assignments and delivery schedules, operators coordinating shipments, industrial logistics setting",
    "sales|Invoicing & E-Invoice": "GST invoice generation on computer screen at Indian paper mill office, e-invoicing software interface, finance professional reviewing invoices",
    "sales|Receivables & Collections": "Accounts receivable dashboard showing payment collection status at paper mill, finance team reviewing outstanding payments, professional office setting",
    "sales|Export & Trade": "Paper mill export documentation and FEMA compliance workspace, trade finance documents on desk, professional Indian export office setting",
    # Procurement
    "procurement|Smart Sourcing": "Procurement officer comparing vendor quotations on multiple screens at Indian paper mill, vendor evaluation spreadsheets, professional procurement office",
    "procurement|Three-Way Match": "Finance professional performing three-way match between PO, GRN and invoice at paper mill, document verification workflow, professional office",
    "procurement|Indian Compliance": "GST compliance documentation for procurement at Indian paper mill, TDS certificates and vendor compliance dashboards on screen",
    # Production
    "production|Planning Layers": "Production planning team reviewing MPS and MRP grid on large screens at paper mill, planning horizon charts, industrial control room setting",
    "production|Production Scheduling": "Paper mill production scheduler working on Gantt chart screen, grade-colored production runs, scheduling software interface",
    "production|Work Order Lifecycle": "Paper mill work order management screen showing work order states from created to completed, shop floor execution tracking",
    "production|Shop Floor Execution": "Paper machine operator at Fourdrinier machine controls, reel winding in progress, shop floor execution at Indian paper mill",
    "production|Quality & Lab": "Lab technician in white coat testing paper samples at quality lab bench, paper testing equipment including GSM tester and brightness meter",
    "production|Analytics & OEE": "OEE analytics dashboard on large screen at paper mill control room, availability and performance metrics, data visualization charts",
    "production|Downtime & Optimization": "Paper machine downtime event tracking board at mill, maintenance crew responding to breakdown, industrial setting with warning lights",
    "production|Resource & Labour Planning": "Shift crew assignment board at paper mill, supervisor assigning workers to machines, shift roster planning in industrial setting",
    # Deckle
    "deckle|3-Tier Optimization": "Reel slitting machine with optimization software running on nearby screen at paper mill, technical operator reviewing deckle plan results",
    "deckle|Explainability": "Paper mill engineer reviewing deckle optimization explanation on screen, trim waste reduction analysis, technical dashboard interface",
    "deckle|Pattern Learning": "Pattern analysis software on screen at paper mill office, historical deckle patterns catalog, data-driven slitting plan optimization",
    "deckle|Configuration": "System configuration dashboard for deckle optimizer at paper mill, technical settings interface, industrial software configuration screen",
    "deckle|Standalone / Pluggable": "Software integration diagram on screen at paper mill IT room, system architecture overview, API integration documentation",
    # Inventory
    "inventory|GRN Workflow": "Goods receipt process at paper mill loading dock, warehouse worker with tablet scanning incoming raw materials, GRN documentation",
    "inventory|Batch Management": "Paper reel batch tracking system screen at warehouse, QR codes on paper reels, batch traceability documentation at Indian paper mill",
    "inventory|Movement & Valuation": "Inventory movement tracking dashboard at paper mill warehouse, stock transfer documentation, warehouse management system screen",
    "inventory|Physical Verification": "Physical stock count at paper mill warehouse, workers with clipboards verifying paper reel inventory, cycle counting process",
    "inventory|Quality & Recall": "Quality hold inspection at paper mill warehouse, defective batch recall process, quality control officer marking reels for rejection",
    # Finance
    "finance|GST Compliance": "GST return filing dashboard on computer screen at Indian paper mill finance office, GSTR-1 and GSTR-3B auto-populated forms with rupee amounts",
    "finance|GL & Periods": "General ledger period closing process at paper mill finance team, trial balance on screen, accounting period management dashboard",
    "finance|AP / AR": "Accounts payable and receivable management dashboard at paper mill, vendor payments and customer collections tracking screen",
    "finance|Costing & Budgets": "Cost center budget analysis on screen at paper mill finance office, production cost breakdown charts, budget vs actual comparison",
    "finance|Trade Finance": "Trade finance documentation at Indian paper mill, letter of credit and bank guarantee documents, export finance workspace",
    # HR
    "hr|Workforce Master": "HR officer reviewing employee master records at paper mill, employee database on screen, professional HR office in Indian manufacturing",
    "hr|Shifts & Attendance": "Shift roster and biometric attendance system at paper mill, workers clocking in at fingerprint scanner, attendance management screen",
    "hr|Payroll Processing": "Payroll processing dashboard at Indian paper mill HR office, salary computation with PF ESI TDS deductions on screen",
    "hr|Statutory Returns": "PF and ESI statutory compliance dashboard at paper mill HR office, challan generation screen, compliance filing interface",
    "hr|Leave & Separation": "Leave management system on screen at paper mill HR office, leave balance dashboard, separation processing workflow",
    "hr|ESS & MSS": "Employee self-service portal on mobile phone and computer at paper mill, workers accessing payslips and leave applications",
    # AI
    "ai|Conversational AI": "AI chat interface on screen at paper mill office, natural language query about production KPIs, conversational ERP interface with dark theme",
    "ai|Bulk Actions": "Bulk data processing dashboard at paper mill, AI-powered batch operations screen, mass update interface for enterprise data",
    "ai|Predictive Analytics (5 Phases)": "Predictive analytics dashboard with demand forecast charts and anomaly detection alerts at paper mill, dark theme data visualization",
    # Party
    "party|Hierarchical Profiles": "Customer account hierarchy on screen at paper mill CRM office, group company structure visualization, account management dashboard",
    "party|Credit & Risk": "Customer credit risk dashboard at paper mill finance office, credit utilization bars and exposure limits on screen",
    "party|Documents & Certifications": "Customer document management screen at paper mill, certification tracking dashboard, compliance document repository",
    "party|Bulk Operations": "Bulk customer data management interface at paper mill, mass update operations screen, data import and export workflow",
    # Stock Prep
    "stock-preparation|Pulp Furnish": "Pulp furnish recipe definition screen at paper mill stock preparation area, furnish ratio configuration with fiber types and percentages",
    "stock-preparation|Chemical Dosing": "Chemical dosing control panel at paper mill stock preparation, sizing agent and retention aid dosing equipment, chemical records dashboard",
    "stock-preparation|Chest & Consistency": "Paper mill machine chest level monitoring dashboard, consistency control screens, SCADA integration showing real-time pulp chest levels",
    # Converting
    "converting-finishing|Slitting & Sheeting": "Reel slitting machine cutting paper to customer widths at converting line, operator monitoring slitting process, yield tracking screen nearby",
    "converting-finishing|Ream & Packaging": "Ream packaging line at paper mill converting area, automatic wrapper machine bundling paper reams, barcode labeling station",
    "converting-finishing|Finishing Lines": "Paper finishing line with coating and calendering equipment at paper mill, supercalender machine in operation, finishing process",
    # Broke
    "broke-management|Broke Capture": "Shop floor broke entry station at paper mill, worker logging broke event on tablet computer, broke collection bins at machine",
    "broke-management|Repulping & Recovery": "Broke repulping vat operation at paper mill, pulper breaking down waste paper for recovery, fiber recovery process",
    "broke-management|Pareto Analytics": "Broke Pareto analysis dashboard on screen at paper mill, broke source distribution charts, wet-end and dry-end breakdown",
    # Recipe
    "recipe-development|Recipe Library": "Paper recipe library on screen at R&D lab, furnish formula cards with fiber ratios and chemical recipes, recipe catalog interface",
    "recipe-development|Trial Management": "Paper trial run management at R&D lab, scientist recording trial results on screen, statistical analysis of paper properties",
    "recipe-development|Customer Approval": "Paper sample evaluation meeting at paper mill, customer reviewing paper samples with sales executive, approval workflow",
    # CRM
    "crm|Pipeline Management": "CRM sales pipeline Kanban board on screen at paper mill sales office, deal stages from lead to won, visual pipeline management",
    "crm|Activity Logging": "Sales executive logging customer interaction on CRM screen at paper mill, activity timeline showing calls and visits, mobile CRM app",
    "crm|Account 360": "Customer 360 view on screen at paper mill sales office, single customer dashboard with orders invoices and complaints, account overview",
    # Helpdesk
    "helpdesk|Ticket Management": "Customer support ticket management screen at paper mill helpdesk, support team resolving issues, SLA timer visible on dashboard",
    "helpdesk|Knowledge Base": "Knowledge base article management screen at paper mill, support documentation library, searchable FAQ system interface",
    "helpdesk|Customer Portal": "Customer self-service portal on screen, branded portal with ticket tracking and document access, modern web interface",
    # Marketing
    "marketing-automation|Campaigns": "Marketing campaign planning dashboard at B2B paper company office, email and SMS campaign builder, audience segmentation screen",
    "marketing-automation|Lead Nurturing": "Lead nurturing workflow designer on screen at paper company marketing office, automated drip campaign sequence visualization",
    "marketing-automation|Attribution & ROI": "Marketing ROI analytics dashboard at paper company, campaign performance charts, multi-touch attribution analysis screen",
    # Field Service
    "field-service|Dispatch & Scheduling": "Field service dispatch board on screen, technician scheduling and route optimization, skill-matched assignment dashboard",
    "field-service|On-site Execution": "Field service technician using mobile app on site at paper mill customer location, work order execution on smartphone, offline capability",
    "field-service|Billing & Analytics": "Field service billing dashboard showing labor parts and travel charges, service analytics screen, first-time fix rate metrics",
    # IoT
    "iot-devices|Device Registration": "Industrial IoT device fleet management dashboard, sensor registry screen with device certificates and firmware versions",
    "iot-devices|Telemetry Ingestion": "Real-time IoT telemetry dashboard showing sensor readings from paper machine, time-series charts for speed temperature and pressure",
    "iot-devices|OTA Updates": "Over-the-air firmware update dashboard for IoT devices at paper mill, staged rollout interface, device fleet update status screen",
    # Digital Twin
    "digital-twin|3D Mill Model": "3D digital twin visualization of paper mill facility on large screen, interactive mill model with machine status overlays, engineer navigating model",
    "digital-twin|Simulation": "What-if scenario comparison dashboard on screen at paper mill, digital twin simulation results showing throughput and quality predictions",
    "digital-twin|AR Assistance": "Maintenance technician using augmented reality glasses at paper machine, AR overlay showing maintenance instructions on equipment",
    # Sustainability
    "sustainability|Footprint Tracking": "Carbon footprint tracking dashboard at paper mill, Scope 1 2 3 emissions charts, per-tonne carbon intensity metrics screen",
    "sustainability|Water & Waste": "Water consumption and wastewater monitoring dashboard at paper mill, effluent quality metrics, environmental compliance screen",
    "sustainability|ESG Reporting": "ESG report generation screen at paper mill, BRSR reporting dashboard, sustainability metrics and evidence documentation",
    # Edge
    "edge-computing|Edge Gateways": "Industrial edge gateway hardware mounted on paper machine, ruggedized edge compute device with network connections, shop floor installation",
    "edge-computing|Edge ML Inference": "Edge ML model deployment dashboard, AI inference running on industrial edge device at paper mill, model performance monitoring screen",
    "edge-computing|Offline Resilience": "Edge computing system maintaining operations during network outage at paper mill, local data buffering indicator, offline resilience dashboard",
    # RPA
    "rpa|Bot Library": "RPA bot library interface showing pre-built automation bots, GST portal scraper and bank statement parser bots, bot management dashboard",
    "rpa|Attended + Unattended": "Robot process automation running on computer at paper mill office, attended bot helping data entry, automation status dashboard",
    "rpa|OCR Pipelines": "Document OCR pipeline processing vendor invoices at paper mill, intelligent document recognition screen, extracted data fields highlighted",
    # Voice
    "voice|Voice Commands": "Voice interface for industrial ERP at paper mill, worker using voice command to query production status, speech recognition interface",
    "voice|Multi-Language": "Multilingual voice interface supporting Hindi and Tamil at paper mill, language selection screen for Indian regional workers",
    "voice|On-Device Processing": "On-device voice processing for industrial use, local speech recognition without cloud dependency, privacy-first voice interface",
    # Document Intelligence
    "document-intelligence|Smart OCR": "Smart OCR processing vendor invoice at paper mill, document scanning and data extraction screen, intelligent document recognition",
    "document-intelligence|Entity Extraction": "Document entity extraction dashboard, highlighted fields in purchase order being extracted by AI, structured data output screen",
    "document-intelligence|Semantic Search": "Document semantic search interface at paper mill, natural language search across document repository, relevant results displayed",
    # ECM
    "engineering-change|ECR Workflow": "Engineering change request workflow screen at paper mill, ECR creation and approval process, change management dashboard",
    "engineering-change|Impact Analysis": "Engineering change impact analysis on screen, affected BOMs and recipes highlighted, change propagation visualization",
    "engineering-change|Effective Dating": "Engineering change effective dating calendar interface, scheduled change activation timeline, version control for engineering documents",
    # Administration
    "administration|Multi-Entity Setup": "Multi-company entity setup screen at paper mill group, org structure configuration, multi-tenant enterprise administration dashboard",
    "administration|Departments & Cost Centers": "Department and cost center configuration screen at paper mill, organizational hierarchy setup, cost center mapping interface",
    "administration|Governance & Templates": "System governance templates configuration at enterprise ERP, audit policy settings, compliance framework setup screen",
    "administration|Integration Hub": "ERP integration hub dashboard showing connected systems, API connection status, third-party system integration management screen",
    # RBAC
    "rbac|Authentication": "Enterprise authentication configuration screen, SSO and multi-factor authentication settings, security policy management dashboard",
    "rbac|Roles & Permissions": "Role-based access control matrix screen at paper mill, permission assignment grid, user role configuration interface",
    "rbac|Audit & Compliance": "Access control audit log screen showing user activities, compliance report for role assignments, security audit dashboard",
    # Email Hub
    "email-hub|Templates & Variables": "Email template designer at paper mill ERP, dynamic variable insertion for transactional emails, template library management",
    "email-hub|Workflow Triggers": "Email workflow trigger configuration screen, automated email sequence setup, event-based email trigger management",
    "email-hub|Inbox & Email-to-Ticket": "Unified email inbox at paper mill support team, automatic email-to-ticket conversion screen, shared inbox management",
    # Notifications
    "notifications|Smart Alerting": "Smart notification dashboard at paper mill operations, production alert configuration, threshold-based alerting system screen",
    "notifications|Auto-Escalation": "Alert escalation workflow configuration screen, multi-level escalation matrix, SLA breach notification management",
    "notifications|Predictive Alerts": "Predictive alerting dashboard using AI at paper mill, anomaly-based alert triggers, early warning system for production issues",
    # Monitoring
    "monitoring|Backend Health": "Server health monitoring dashboard at paper mill IT operations, API response time charts, database performance metrics screen",
    "monitoring|Frontend Monitoring": "Frontend application performance monitoring dashboard, page load times and error tracking, user experience metrics screen",
    "monitoring|SLA & Dashboards": "SLA compliance monitoring dashboard at paper mill, uptime metrics and performance SLA tracking, executive operations dashboard",
    # Maintenance
    "maintenance|Preventive Maintenance": "Preventive maintenance schedule calendar at paper mill, PM work orders for paper machines, maintenance planning screen",
    "maintenance|Breakdown Management": "Breakdown maintenance work order at paper mill, technician responding to machine failure, emergency repair workflow screen",
    "maintenance|Predictive & Condition-Based": "Predictive maintenance analytics dashboard at paper mill, vibration sensor trends predicting bearing failure, condition monitoring screen",
    "maintenance|Analytics & Reliability": "MTBF and MTTR reliability analytics at paper mill maintenance, equipment reliability charts, maintenance KPI dashboard",
    # Quality
    "quality|Quality Plans": "Quality control plan configuration screen at paper mill, inspection parameters for paper grades, quality plan management interface",
    "quality|Inspection Workflow": "Quality inspector performing paper inspection at paper mill lab, inspection checklist on tablet, pass fail determination process",
    "quality|NCR & CAPA": "Non-conformance report tracking dashboard at paper mill quality team, CAPA action plan management, corrective action workflow screen",
    "quality|LIMS & CoA": "Laboratory information management system at paper mill quality lab, Certificate of Analysis generation screen with test parameter actuals",
    # Projects
    "projects|Planning & WBS": "Project work breakdown structure on screen at paper mill, WBS chart with task hierarchy, project planning dashboard",
    "projects|Resource & Budget": "Project resource allocation and budget tracking screen, resource Gantt chart with cost tracking, project management dashboard",
    "projects|Risk & Milestones": "Project risk register and milestone tracking screen at paper mill, risk matrix visualization, project milestone timeline",
    # Automations
    "automations|Visual Designer": "Visual workflow automation designer on screen, drag-drop process builder, automation flowchart with triggers and actions",
    "automations|Triggers & Actions": "Automation trigger configuration screen showing event-based workflow triggers, action library selection, workflow automation settings",
    "automations|RPA & Templates": "Automation template library screen, pre-built workflow templates for paper mill processes, RPA bot template management",
    "automations|Monitoring & SLA": "Workflow automation monitoring dashboard, automation run history and SLA compliance, failed workflow alerts screen",
    # Mobile
    "mobile|Shop Floor Operations": "Paper mill worker using mobile app on shop floor, work order completion on smartphone, mobile ERP for industrial workers",
    "mobile|Offline-First": "Mobile app working offline at paper mill shop floor, offline indicator on screen, data sync when connectivity returns",
    "mobile|Approvals & Dashboards": "Manager approving work order on mobile dashboard app, mobile approval workflow, executive dashboard on smartphone",
    "mobile|Field Service & Delivery": "Delivery driver using mobile app for e-Way bill and POD at paper mill dispatch, mobile delivery confirmation screen",
    # Documents
    "documents|Storage & Versioning": "Document management system screen at paper mill, version-controlled document library, file storage and retrieval interface",
    "documents|AI Classification & OCR": "AI-powered document classification screen at paper mill, automatic document categorization and OCR extraction, intelligent filing",
    "documents|Digital Signatures": "Digital signature workflow screen at paper mill, contract signing interface, electronic signature audit trail management",
    "documents|Retention & Compliance": "Document retention policy management screen, compliance archive settings, document lifecycle management dashboard",
    # Product Catalog
    "product-catalog|Material & Grade Master": "Paper grade master data screen at paper mill, grade specifications with GSM brightness and burst strength parameters",
    "product-catalog|BOM & Routing": "Bill of materials and routing configuration at paper mill, BOM explosion screen with raw material components, production routing",
    "product-catalog|Customer Specifications": "Customer-specific paper specification screen at paper mill, custom grade parameters per customer, specification management dashboard",
    # Pricing
    "pricing|Price Lists & Hierarchies": "Pricing hierarchy configuration screen at paper mill, grade-based price list with customer tier discounts, price matrix management",
    "pricing|Customer Rate Contracts": "Customer rate contract management screen at paper mill, long-term pricing agreement interface, contract validity and terms",
    "pricing|Margin & Approval": "Pricing margin analysis and approval screen at paper mill sales office, price override approval workflow, margin threshold alerts",
    # Lookups
    "lookups|Statutory Reference Data": "Statutory reference data management screen at Indian paper mill, GST HSN codes and SAC codes master, tax reference library",
    "lookups|Geographic & Currency": "Geographic and currency master data screen, Indian state and district master, currency exchange rate management interface",
    "lookups|Business Reference": "Business reference data configuration screen at paper mill, industry-specific lookup tables, configurable reference data management",
    # Number Series
    "number-series|Configurable Patterns": "Document number series configuration screen at paper mill, customizable numbering pattern with prefix suffix and sequence",
    "number-series|Statutory Compliance": "GST-compliant invoice number series at Indian paper mill, statutory numbering rules configuration, compliance number management",
    "number-series|Lifecycle Management": "Number series lifecycle management screen, series reset and rollover configuration, multi-year numbering management",
    # Business Profile
    "business-profile|Mill Profile Capture": "Paper mill business profile configuration screen, company details and mill specifications input form, initial ERP setup wizard",
    "business-profile|Auto-Configuration": "ERP auto-configuration screen after mill profile setup, automated system configuration based on mill type, setup completion dashboard",
    "business-profile|Compliance Setup": "Indian compliance configuration screen for paper mill ERP, GST registration and statutory compliance initial setup",
    # Approvals
    "approvals|Unified Inbox": "Unified approval inbox at paper mill manager, pending approvals from multiple modules in one screen, mobile-ready approval dashboard",
    "approvals|Dynamic Matrix": "Approval matrix configuration screen at paper mill, dynamic approval rules based on amount and document type, matrix management",
    "approvals|SLA & Escalation": "Approval SLA and escalation configuration screen, pending approval aging report, auto-escalation rules management dashboard",
    # Audit
    "audit|Tamper-Proof Ledger": "Audit trail ledger screen at paper mill, immutable transaction log with user timestamp and change details, compliance audit trail",
    "audit|Compliance Calendar": "Compliance calendar screen at paper mill, statutory filing deadlines and reminders, GST TDS PF ESI compliance schedule",
    "audit|Auditor Workspace": "External auditor workspace at paper mill, read-only audit access interface, evidence gathering and report generation screen",
    "audit|Evidence Exports": "Audit evidence export screen at paper mill, bulk transaction export with supporting documents, auditor report package generation",
    # Lab Master
    "lab-master|Test Procedure Library": "Paper test procedure library at quality lab, standardized test method catalog, ISO test procedures for paper properties",
    "lab-master|Equipment & Calibration": "Lab equipment calibration management at paper mill quality lab, calibration schedule for testing instruments, equipment certification tracking",
    "lab-master|Sampling Plans": "Sampling plan configuration at paper mill quality lab, statistical sampling frequency for paper grade inspection, sampling standard settings",
}

def to_filename(slug, tag):
    # Convert tag to filesystem-safe slug
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
    return prompt + ", dark industrial aesthetic, high quality photograph, no text"

def generate_image(filepath):
    if os.path.exists(filepath):
        if os.path.getsize(filepath) > 1000:
            return True, "skip"
    headers = {"Authorization": f"Bearer {API_TOKEN}", "Content-Type": "application/json"}
    payload = {"prompt": "", "num_steps": 8, "width": 1200, "height": 800}
    payload["prompt"] = filepath  # will be overridden by caller
    try:
        resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
        if resp.status_code != 200:
            return False, f"HTTP {resp.status_code}: {resp.text[:100]}"
        data = json.loads(resp.content)
        b64 = data["result"]["image"]
        img_bytes = base64.b64decode(b64)
        with open(filepath, "wb") as f:
            f.write(img_bytes)
        return True, f"{len(img_bytes)} bytes"
    except Exception as e:
        return False, str(e)

def generate_image_with_prompt(filepath, prompt):
    if os.path.exists(filepath):
        if os.path.getsize(filepath) > 1000:
            return True, "skip"
    payload = {"prompt": prompt, "num_steps": 8, "width": 1200, "height": 800}
    try:
        for attempt in range(2):
            headers = {"Authorization": f"Bearer {_state['token']}", "Content-Type": "application/json"}
            resp = requests.post(_base_url(), headers=headers, json=payload, timeout=120)
            if resp.status_code == 429:
                if _switch_account():
                    continue
                print("  STOP: 429 on both accounts — daily quota exhausted")
                _sys.exit(2)
            break
        if resp.status_code != 200:
            return False, f"HTTP {resp.status_code}: {resp.text[:100]}"
        data = json.loads(resp.content)
        b64 = data["result"]["image"]
        img_bytes = base64.b64decode(b64)
        with open(filepath, "wb") as f:
            f.write(img_bytes)
        return True, f"{len(img_bytes)} bytes"
    except SystemExit:
        raise
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
        # Track current module slug
        slug_m = re.search(r'slug:\s*["\']([^"\']+)["\']', line)
        if slug_m:
            current_slug = slug_m.group(1)

        # Track current feature tag (inline or block)
        tag_m = re.search(r'\btag:\s*["\']([^"\']+)["\']', line)
        if tag_m:
            current_tag = tag_m.group(1)

        # Find Unsplash feature photos (w=1200, not heroes)
        if 'images.unsplash.com' in line and 'w=1200' in line and current_slug and current_tag:
            fname = to_filename(current_slug, current_tag)
            fpath = os.path.join(OUT_DIR, fname)
            prompt = get_prompt(current_slug, current_tag)

            success, msg = generate_image_with_prompt(fpath, prompt)
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
                time.sleep(0.3)
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

    print(f"\nDone: {total_ok} generated, {total_skip} skipped, {total_fail} failed")
    from datetime import datetime
    log_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_generation.log")
    ts = datetime.now().isoformat(timespec="seconds")
    with open(log_path, "a") as f:
        f.write(f"{ts} generate-features.py gen={total_ok} skip={total_skip} fail={total_fail}\n")

if __name__ == "__main__":
    main()
