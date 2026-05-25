export const SITE = {
  name: "Papyrus BPApp",
  tagline: "The ERP Built for Paper Mills",
  description:
    "Enterprise ERP purpose-built for Indian paper manufacturing. GST-native, AI-powered, complete from orders to payroll.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://papyrusbpapp.com",
  email: "contact@papyrusbpapp.com",
};

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: "44", label: "Modules" },
  { value: "50+", label: "DB Migrations" },
  { value: "3", label: "Languages" },
  { value: "AI", label: "Optimizer" },
  { value: "GST + FEMA", label: "Compliance" },
];

export const MODULES = [
  {
    id: "sales",
    name: "Sales Management",
    tagline: "Complete paper mill sales — from quote to export compliance",
    icon: "ShoppingCart",
    color: "emerald",
    capabilities: [
      "Smart order routing with inventory-aware fulfillment suggestions",
      "Indian export compliance: e-Way bills, FTA/RoDTEP, LC/forex settlement",
      "Revenue intelligence: margin tracking, credit exposure, dunning workflows",
      "Recurring order automation with forecast-driven scheduling",
    ],
    differentiator:
      "Integrated dispatch control tower with real-time weighbridge reconciliation and GSTR-1 auto-filing validation.",
  },
  {
    id: "procurement",
    name: "Procurement",
    tagline: "From RFQ to three-way match in hours, not days",
    icon: "Package",
    color: "blue",
    capabilities: [
      "MRP-driven auto-PR generation with RFQ email bridge for instant supplier quotes",
      "Vendor scorecard management with multi-attribute quotation scoring",
      "GST/TCS/RCM/MSME auto-deductions with three-way match (PO-receipt-invoice)",
      "Configurable approval matrix with SLA-driven escalation",
    ],
    differentiator:
      "Indian MSME payment terms enforcement, reverse-charge and ITC reconciliation for import procurement.",
  },
  {
    id: "production",
    name: "Production Management",
    tagline: "AI-powered planning — from work order to finished reel",
    icon: "Factory",
    color: "orange",
    capabilities: [
      "End-to-end planning with capacity constraints and machine-aware scheduling",
      "Real-time shop floor execution: shift allotments, handovers, ops logging",
      "Downtime & OEE tracking with root-cause categorization and KPI dashboards",
      "Quality assurance pipeline: in-process inspections, lab tests, NCR/CAPA",
    ],
    differentiator:
      "Proprietary Deckle Optimizer eliminates slitting waste with 3-tier optimization engine and pattern learning.",
  },
  {
    id: "inventory",
    name: "Inventory Management",
    tagline: "Batch-level precision from raw material to finished reel",
    icon: "Boxes",
    color: "purple",
    capabilities: [
      "Full lot traceability: batch allocation, reel serial numbering, GR labels",
      "Real-time stock movements: FIFO/weighted-average valuation, multi-warehouse",
      "Quality NCR tracking with sampling plans, lot acceptance, batch recall",
      "Cycle-count reconciliation with ABC analysis and slow-moving stock reporting",
    ],
    differentiator:
      "Batch allocation algorithm respects customer quality specs while maximising FIFO.",
  },
  {
    id: "finance",
    name: "Finance & GST",
    tagline: "Indian-native financials — GST, FEMA, trade finance, cost accounting",
    icon: "IndianRupee",
    color: "green",
    capabilities: [
      "Complete GL, AP/AR: chart of accounts, journal entries, 3-way match, AR aging",
      "Product costing by grade/machine: cost center allocation, variance analysis",
      "Indian tax: GSTR-1/3B auto-filing, ITC ledger, RCM/TCS/TDS, forex revaluation",
      "Trade finance: LC management, invoice discounting, packing credit, ECGC",
    ],
    differentiator:
      "Integrated trade finance module for import/export mills; cost accounting segmented by production line.",
  },
  {
    id: "hr",
    name: "Human Resources",
    tagline: "Attendance to payroll, statutory returns, ESS/MSS",
    icon: "Users",
    color: "pink",
    capabilities: [
      "Shift & attendance: shift policies, rosters, WFH tracking, bulk marking",
      "Payroll at scale: salary structures, CTC preview, statutory breakups, bank advice",
      "Leave & compliance: configurable leave types, approvals, ESI/PF/PT/LWF",
      "Performance & training: appraisal cycles, 360° feedback, competency tracking",
    ],
    differentiator:
      "Shift rotation optimizer for multi-shift mills; state-specific statutory calculations.",
  },
  {
    id: "ai",
    name: "AI & Analytics",
    tagline: "Ask anything about your mill — act instantly",
    icon: "Sparkles",
    color: "yellow",
    capabilities: [
      "Natural language chat: 'What's my top customer this month?' → instant answer",
      "AI bulk actions: auto-approve low-risk POs with human-in-the-loop preview",
      "Cross-module insights pulling from sales, production, and finance in one query",
      "Rate-limited and fully auditable with conversation history",
    ],
    differentiator:
      "Powered by Anthropic Claude + Google Gemini + OpenAI — configurable per deployment.",
  },
  {
    id: "deckle",
    name: "Deckle Optimizer",
    tagline: "Eliminate trim waste with proprietary slitting optimization",
    icon: "Scissors",
    color: "red",
    capabilities: [
      "Three-tier optimization engine: instant adjustments (<2s), shift planning (5–30s), daily optimization (≤5 min, 180+ constraints)",
      "Explainable optimization: every plan shows reasoning, active constraints, SWO recovery",
      "Pattern learning: auto-captures approved plans, learns proven patterns after 10 runs",
      "Interactive planning: drag-drop adjustments, real-time constraint violation indicators",
    ],
    differentiator:
      "Pocket auto-detection with cutter feasibility checks; plan vs. actual reconciliation for continuous improvement.",
  },
  {
    id: "party",
    name: "Party Management",
    tagline: "360° profiles — customers, suppliers, agents, transporters",
    icon: "Building2",
    color: "slate",
    capabilities: [
      "Complete profiles: multiple addresses, contacts, bank accounts, GSTIN/PAN, certifications",
      "Credit & risk: credit limit/days, payment terms, territory auto-assignment, risk rating",
      "Document management: secure upload of PAN, GSTIN, bank proofs, ISO certs",
      "Bulk import & deduplication: GSTIN hard-dupe check, soft-dupe by name",
    ],
    differentiator:
      "Certification expiry alerts (ISO 9001, food safety) critical for quality audits and supplier compliance.",
  },
];

export const PLATFORM_FEATURES = [
  { icon: "Shield", label: "Role-Based Access Control" },
  { icon: "Globe", label: "English / Hindi / Tamil" },
  { icon: "Building", label: "Multi-company / Multi-branch" },
  { icon: "ScrollText", label: "Full Audit Trails" },
  { icon: "Smartphone", label: "Mobile App (iOS + Android)" },
  { icon: "Zap", label: "Background Job Engine" },
];
