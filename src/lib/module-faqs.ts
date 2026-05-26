export const MODULE_FAQS: Record<string, { q: string; a: string }[]> = {
  deckle: [
    {
      q: "How much trim waste reduction can the Deckle Optimizer achieve?",
      a: "Typical Indian mills go from 8%+ trim waste down to under 3.5% within 3 months of go-live. On a 50 TPD kraft mill, that's about ₹2.8 crore/year in recovered paper.",
    },
    {
      q: "What is 3-tier optimization?",
      a: "Three modes of trim optimization tuned for different use cases: Instant (under 2 seconds for real-time changes), Balanced (5–30 seconds for shift-start planning), and Full (up to 5 minutes for next-day master planning with 180+ constraints).",
    },
    {
      q: "Can it integrate with our existing slitter PLCs?",
      a: "Yes. The Deckle Optimizer outputs slit-width plans that can be downloaded to slitter PLCs via the IoT module (OPC UA, Modbus, MQTT). Most major slitter vendors are supported.",
    },
    {
      q: "Does it work standalone or only as part of the full ERP?",
      a: "Both. The Deckle Optimizer can run standalone with REST API integration to your existing ERP, or as a fully-integrated module inside Papyrus BPApp.",
    },
    {
      q: "What about explainability — can planners see why a plan was chosen?",
      a: "Yes. Every plan shows the active constraints, satisfied/violated counts, and reasoning. Planners can compare alternatives side-by-side before approving.",
    },
  ],
  production: [
    {
      q: "Does it cover MPS, MRP, and CRP?",
      a: "Yes. Master Production Schedule (MPS) plans what to produce when. Material Requirements Planning (MRP) calculates pulp, chemicals, packaging needs. Capacity Requirements Planning (CRP) validates against machine and labour capacity.",
    },
    {
      q: "How is OEE tracked?",
      a: "Availability × Performance × Quality calculated per shift, per machine, in real time. Downtime reasons captured at the machine via shop floor app or PLC integration. Root-cause analytics built in.",
    },
    {
      q: "Can it handle multi-PM (multiple paper machines) on same campus?",
      a: "Yes. Each machine has its own schedule, OEE, and crew. Pulp allocation across PMs is calculated automatically.",
    },
    {
      q: "Mobile shop floor app available?",
      a: "Yes. Operators log work order status, downtime, quality samples on mobile/tablet. Supervisors approve handovers on mobile.",
    },
  ],
  ai: [
    {
      q: "Which LLMs power the AI engine?",
      a: "Configurable per deployment: Anthropic Claude, Google Gemini, OpenAI GPT-4. Customer chooses based on data residency and cost preferences.",
    },
    {
      q: "What can predictive maintenance detect?",
      a: "Vibration patterns indicating bearing wear, dryer cylinder temperature anomalies, refiner load drift, motor current spikes. Typically 24–72 hour advance warning of failures.",
    },
    {
      q: "Is conversational AI just chat, or can it take actions?",
      a: "Both. 'Show me top 10 customers this month' returns data. 'Create a quote for 50 tons of 100 GSM kraft for ABC Mills' creates the draft quote with human approval before submit.",
    },
    {
      q: "What about data privacy and AI hallucinations?",
      a: "All AI interactions are logged and auditable. Tool-use (creating quotes, approvals) requires human confirmation. Customer data never leaves the deployment region.",
    },
  ],
  finance: [
    {
      q: "Is GST e-invoicing built in?",
      a: "Yes. IRN generation via IRP, QR code, e-way bill, GSTR-1/3B auto-population, GSTR-2B reconciliation, ITC ledger, RCM on transport — all native.",
    },
    {
      q: "What about FEMA for exporters?",
      a: "FEMA-compliant forex handling, shipping bill generation, ICEGATE integration, ECGC, packing credit, post-shipment finance, SOFTEX/EDPMS reconciliation.",
    },
    {
      q: "Multi-company, multi-currency, multi-GSTIN?",
      a: "Yes. Native support for multiple legal entities, multi-currency (with FX revaluation), and multiple GSTINs (per state). Consolidated reporting at group level.",
    },
    {
      q: "Real-time costing for paper mills?",
      a: "Yes. Multi-stage cost rollup (pulp → paper → finishing) with actual material, labour, energy consumption. Cost per ton visible at shift end.",
    },
  ],
  hr: [
    {
      q: "Does it handle PF, ESI, PT, LWF, gratuity?",
      a: "Yes. Native EPFO ECR generation, ESI challan, state-specific PT slabs, LWF, gratuity calculation. Form 16, Form 24Q quarterly filing.",
    },
    {
      q: "Multi-shift workforce with biometric attendance?",
      a: "Yes. Biometric integration (most major vendors), shift policies, roster planning, overtime calculation, contract labour management.",
    },
    {
      q: "Mobile self-service for employees?",
      a: "Yes. Employee self-service (ESS) for leave, attendance, payslip, declarations on mobile. Manager self-service (MSS) for approvals.",
    },
    {
      q: "Statutory compliance for 500+ employee mills?",
      a: "Designed for this scale. PF, ESI, PT, LWF, Gratuity, Bonus, all filed electronically. Audit-ready records with full history.",
    },
  ],
  sales: [
    {
      q: "Quotation with grade/GSM/width grid?",
      a: "Yes. Paper-specific quotation with grade × GSM × width pricing matrix, customer-specific discounts, scheme management.",
    },
    {
      q: "Dispatch control tower for multi-customer reels?",
      a: "Yes. Multi-customer dispatch board with lorry assignment, weighbridge integration, e-way bill, gate pass — all in one screen.",
    },
    {
      q: "Credit limit and receivables management?",
      a: "Customer-level credit limit with real-time utilization. AR aging, dunning workflows, collection alerts.",
    },
    {
      q: "E-invoice and e-way bill auto-generation?",
      a: "Yes. Sales order → invoice → IRN with QR → e-way bill, all auto-chained. Single user action.",
    },
  ],
  quality: [
    {
      q: "Does it include LIMS (Lab Information Management System)?",
      a: "Yes. Sample logging, test scheduling, result entry, COA generation, equipment calibration, trend reporting.",
    },
    {
      q: "Can quality plans be customer-specific?",
      a: "Yes. Each customer can have its own quality plan with specific tests, tolerances, and pass/fail criteria. COA per dispatch reflects the buyer's plan.",
    },
    {
      q: "NCR and CAPA workflows built in?",
      a: "Yes. Non-conformance reports tied to batches, root-cause analysis, corrective and preventive action tracking, ISO 9001/IATF audit-ready records.",
    },
    {
      q: "SPC charts and process control?",
      a: "Yes. X-bar R, p-chart, c-chart with UCL/LCL violations flagged in real time. Per-machine, per-grade dashboards.",
    },
  ],
  procurement: [
    {
      q: "How is MSME compliance handled?",
      a: "Vendor master tracks MSME registration. System flags overdue payments approaching 45 days. Auto-reports for MCA filing.",
    },
    {
      q: "Three-way match for invoices?",
      a: "Yes. PO + GRN + Invoice three-way match before payment release. GST validation, RCM handling, TDS deduction automatic.",
    },
    {
      q: "Waste paper / scrap procurement support?",
      a: "Yes. Grade-wise pricing, quality at receipt, supplier scorecards, RCM on transport — built for recycled paper mills.",
    },
    {
      q: "RFQ workflow with email integration?",
      a: "Yes. Auto-generate RFQs from requisitions, email to vendors, capture quotes, score and award. Full audit trail.",
    },
  ],
  inventory: [
    {
      q: "Reel-level traceability for paper mills?",
      a: "Yes. Every machine reel gets a unique ID with full genealogy (machine, shift, furnish, quality data) tracked through slitting, packaging, dispatch.",
    },
    {
      q: "Multi-warehouse and multi-plant?",
      a: "Yes. Each location operates independently with consolidated views. Inter-warehouse transfers with proper tax/cost handling.",
    },
    {
      q: "Cycle counting and physical verification?",
      a: "Yes. ABC analysis, cycle count schedules, mobile-based stock take, variance reconciliation.",
    },
    {
      q: "FIFO vs weighted-average valuation?",
      a: "Both supported. Configurable per item or item group. Consistent with Indian GAAP and Ind AS requirements.",
    },
  ],
  maintenance: [
    {
      q: "Preventive maintenance scheduling?",
      a: "Yes. Time-based and counter-based PM schedules, auto-generated work orders, spare parts reservation, technician assignment.",
    },
    {
      q: "Predictive maintenance with AI?",
      a: "Yes. ML models on vibration, temperature, current data flag impending failures 24–72 hours ahead. Common targets: paper machine bearings, refiners, dryers, pumps.",
    },
    {
      q: "Spare parts inventory and reorder?",
      a: "Yes. Min/max levels, auto-reorder triggers, criticality tagging, vendor master integration.",
    },
    {
      q: "Breakdown maintenance with root-cause analysis?",
      a: "Yes. Breakdown logging from shop floor, RCA workflow with 5-why or fishbone analysis, MTBF/MTTR analytics.",
    },
  ],
};
