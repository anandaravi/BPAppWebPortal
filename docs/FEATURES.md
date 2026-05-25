# Feature Content — All Modules

Source: analyzed from `~/development/PapyrusBPApp` codebase.

---

## 1. Sales Management
**Tagline:** Complete paper mill sales — from quote to export compliance

**Capabilities:**
- Smart order routing & fulfillment with inventory-aware suggestions
- Indian export compliance: e-Way bills, FTA/RoDTEP credits, LC/forex settlement
- Revenue intelligence: margin tracking, credit exposure, dunning workflows
- Recurring order automation with forecast-driven scheduling

**Differentiator:** Integrated dispatch control tower with real-time weighbridge reconciliation and GSTR-1 auto-filing validation.

**Order types:** STANDARD | RUSH | EXPORT | SAMPLE | STANDING | REEL | SHEET | CONVERSION | TOLL_MFG

---

## 2. Procurement
**Tagline:** Paper mill procurement — from RFQ to three-way match in hours

**Capabilities:**
- MRP-driven auto-PR generation with RFQ email bridge for instant supplier quotes
- Vendor scorecard management with quotation scoring (multi-attribute)
- GST/TCS/RCM/MSME auto-deductions with three-way match (PO-receipt-invoice)
- Configurable approval matrix with SLA-driven escalation

**Differentiator:** Indian MSME payment terms enforcement, reverse-charge and ITC reconciliation for import procurement.

---

## 3. Production Management
**Tagline:** AI-powered production planning — from work order to finished reel

**Capabilities:**
- End-to-end production planning with capacity constraints and machine-aware scheduling
- Real-time shop floor execution: shift allotments, handovers, machine ops logging
- Downtime & OEE tracking with root-cause categorization and KPI dashboards
- Quality assurance pipeline: in-process inspections, lab tests, NCR/CAPA workflows

**Differentiator:** Proprietary Deckle Optimizer (see section 8) + chemical consumption tracking per machine/grade.

---

## 4. Inventory Management
**Tagline:** Batch-level precision — from raw material receipt to finished reel dispatch

**Capabilities:**
- Full lot traceability: batch allocation to orders, reel serial numbering, GR labels
- Real-time stock movements: FIFO/weighted-average valuation, multi-warehouse
- Quality NCR tracking with sampling plans, lot acceptance, and batch recall traceability
- Cycle-count reconciliation with ABC analysis and slow-moving stock reporting

**Differentiator:** Batch allocation algorithm respects customer quality specs while maximizing FIFO.

---

## 5. Finance & GST Compliance
**Tagline:** Indian-native financials — GST, FEMA, trade finance, cost accounting

**Capabilities:**
- Complete GL, AP/AR: chart of accounts, journal entries, 3-way match, AR aging
- Product costing by grade/machine: cost center allocation, variance analysis (actual vs. standard)
- Indian tax: GSTR-1/3B auto-filing, ITC ledger, RCM/TCS/TDS, FEMA, forex revaluation
- Trade finance: LC management, invoice discounting, packing credit, ECGC, credit exposure dashboard

**Differentiator:** Integrated trade finance module for import/export mills; cost accounting segmented by production line.

---

## 6. Human Resources
**Tagline:** Paper mill HR — attendance to payroll, statutory returns, ESS/MSS

**Capabilities:**
- Shift & attendance: shift policies, rosters, WFH tracking, bulk marking
- Payroll at scale: salary structures, CTC preview, statutory breakups, bank advice, bulk email
- Leave & compliance: configurable leave types, approvals, carryforward, ESI/PF/PT/LWF
- Performance & training: appraisal cycles, 360° feedback, competency tracking, certifications

**Differentiator:** Shift rotation optimizer for multi-shift mills; state-specific statutory calculations (ESIC, PF, PT, LWF).

---

## 7. AI & Analytics
**Tagline:** Conversational intelligence for your mill — ask anything, act instantly

**Capabilities:**
- Natural language chat: "What's my top customer this month?" → instant answer
- AI bulk actions: auto-approve low-risk POs, mark attendance, with human-in-the-loop preview
- Usage analytics and feedback loop for improving recommendations over time
- Rate-limited (20 chats/min) and fully auditable with conversation history

**AI providers:** Anthropic Claude + Google Gemini Flash + OpenAI (configurable)

**Differentiator:** Cross-functional insights pulling from all modules (sales + production + finance) in one query.

---

## 8. Deckle Optimizer (Slitting Optimization)
**Tagline:** Eliminate trim waste — proprietary slitting optimization saves ₹100K+/month

**Capabilities:**
- Three-tier optimization engine: instant adjustments (<2s), shift planning (5–30s), full daily optimization (≤5 min, 180+ constraints)
- Explainable optimization: every plan includes reasoning, active constraints, recovery analysis
- Pattern learning: auto-captures approved plans, learns proven patterns over time
- Interactive planning: drag-drop adjustments, real-time constraint violation indicators, full audit trail

**Differentiator:** Pocket auto-detection with cutter feasibility checks; plan vs. actual reconciliation for continuous improvement.

---

## 9. Party Management
**Tagline:** 360° party profiles — customers, suppliers, agents, transporters

**Capabilities:**
- Complete profiles: multiple addresses, contacts, bank accounts, GSTIN/PAN, certifications with expiry
- Credit & risk: credit limit/days, payment terms, territory auto-assignment, risk rating with alerts
- Document management: secure upload of PAN, GSTIN, bank proofs, ISO certs; role-based access
- Bulk import & deduplication: CSV template, GSTIN hard-dupe check, soft-dupe by name

**Differentiator:** Certification expiry alerts (ISO 9001, food safety) critical for quality audits and supplier compliance.

---

## Platform-Wide Capabilities

| Capability | Detail |
|-----------|--------|
| Multi-tenancy | Multi-mill, multi-company, branch isolation |
| RBAC | Role-based access control, granular permissions |
| Audit trails | All actions logged with user, timestamp, delta |
| Localization | English, Hindi, Tamil |
| Mobile app | Expo React Native — approvals, field ops |
| Background jobs | BullMQ — invoice reminders, batch expiry, auto-PO, email dispatch |
| Notifications | Push notifications (device token registration) |
| Digital signatures | PDF signing with signpdf + pdfkit + node-forge |
| QR codes | QR generation for labels and dispatch |
