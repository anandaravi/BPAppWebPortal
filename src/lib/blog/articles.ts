import type { ArticleData } from "@/components/seo/article-page";

export const ARTICLES: Record<string, ArticleData> = {
  "reduce-trim-waste-paper-mill": {
    slug: "reduce-trim-waste-paper-mill",
    title: "How to Reduce Trim Waste in Indian Paper Mills",
    subtitle:
      "A practical playbook: from manual deckle planning to a 3-tier optimization engine. Real numbers from real mills.",
    description:
      "Trim waste is the silent ₹2-3 crore/year drain on every Indian paper mill. This guide explains why traditional deckle planning fails, how 3-tier optimization works, and how to measure ROI.",
    publishedAt: "2026-05-26",
    readMinutes: 9,
    tags: ["Deckle", "Cost reduction", "ROI"],
    body: `Trim waste is the silent crore-eating monster sitting on every paper machine in India. A 50 TPD mill running 8% trim waste loses about **₹2.8 crore every year** — and most mill owners don't know it because the loss is buried in the broke pile and re-pulp cycle.

This guide explains what trim waste is, why traditional deckle planning fails, and how a 3-tier optimization engine eliminates it.

## What is trim waste?

When a paper machine produces a wide reel (the **deckle width**, typically 2 to 5.6 metres), that reel must be slit into customer-specific narrower widths — say 800 mm for one customer, 1200 mm for another, 950 mm for a third. The slitting plan tries to fit those customer widths into the deckle as efficiently as possible.

But there's always leftover:
- **Edge trim** — the two edges of the deckle reel are typically discarded (5–25 mm each side).
- **Pattern mismatch** — if customer widths don't add up cleanly to the deckle, there's leftover space that becomes broke.

Total trim waste = edge trim + pattern mismatch. World-class mills run 2.5–3.5% trim. Average Indian mills run 6–10%. Worst cases hit 15%.

## Why traditional deckle planning fails

Most Indian mills plan deckle in one of these ways:
- **Manual on whiteboard** — planner draws rectangles, eyeballs the fit, finalizes a pattern. Fast but suboptimal.
- **Excel solver** — planner uses Excel's solver add-in or a custom spreadsheet. Better than whiteboard but constrained to ~5 customer widths and a single optimization pass.
- **Single-pass optimizer** — bought from a vendor, gives one answer per run. Cannot react to mid-shift changes (cancellations, urgent orders, machine speed changes).

All three share a critical weakness: **they can't reoptimize when reality changes**. Customer cancels at 11 AM? Your fixed deckle plan from 8 AM is now suboptimal — but rerunning it takes 30+ minutes and may not even converge.

## The 3-tier approach

A 3-tier optimization engine runs three different modes depending on the situation:

### Tier 1 — Instant (under 2 seconds)
For real-time changes during the shift: a customer cancels, an urgent order comes in, the production speed dropped. The optimizer rebalances the existing plan in seconds. Used 5–20 times per shift in busy mills.

### Tier 2 — Balanced (5–30 seconds)
For shift-start planning: take fresh order book, compute optimal pattern set considering 30–50 customer widths, finite reel widths, minimum/maximum pocket counts, and a balanced objective (minimize trim + minimize customer split + maximize machine speed).

### Tier 3 — Full (up to 5 minutes)
For next-day master planning: full constraint search across **180+ constraints** — customer specs, machine width tolerance, pocket auto-detection, cutter feasibility, edge trim minimums, customer split tolerance, machine-specific patterns, urgency weighting, learned-pattern preference.

> The result: trim waste dropping from 8%+ to under 3.5% — a typical ₹2-3 crore/year gain on a 50 TPD mill.

## Constraints that matter

A real deckle optimizer must handle:
- **Customer reel widths** — exact mm, not nominal
- **Machine deckle range** — minimum and maximum effective width
- **Edge trim minimums** — per machine, per grade
- **Pocket counts** — minimum 2, maximum 8 (typical)
- **Cutter feasibility** — slitter blade configurations
- **Customer split tolerance** — how much under/over-fulfillment is acceptable
- **Grade compatibility** — different GSM/grades can't share a deckle
- **Sequence learning** — patterns that worked yesterday should be preferred today

Few generic linear-programming solvers handle all 180+ constraints out of the box. This is why paper-specific optimization engines outperform general-purpose ERPs running standard solver libraries.

## How to measure ROI

To know how much you can save, you need three numbers:
- **Current trim %** — most mills don't measure this accurately. Start logging.
- **Target trim %** — typically 3.5% is achievable; 3.0% is excellent.
- **Daily production tons × paper price** — straightforward.

ROI formula:

\`Annual saving = (Current trim % − Target trim %) × Daily tons × 365 × Paper price per ton\`

Example: 50 TPD mill, current 8%, target 3.5%, kraft paper at ₹55,000/ton.

\`Saving = (8% − 3.5%) × 50 × 365 × 55,000 = ₹4.5 crore/year\`

This is **before** counting:
- Better customer service (fewer split orders)
- Faster planner productivity (5 mins/plan vs 45 mins manually)
- Lower broke handling and re-pulp cost

Most deckle optimizers pay back in 3-6 months of operation.

## Implementation checklist

If you're evaluating a deckle optimizer for your mill:
- Does it handle **3-tier optimization** or only single-pass?
- Does it support **at least 100+ constraints** (the bare minimum for serious paper grades)?
- Does it provide **explainability** — can the planner see why the engine chose this plan?
- Does it have **pattern learning** — proven patterns auto-promoted to preferred?
- Can it **integrate with your sales order system** so changes flow in real-time?
- What's the **time to go-live** — weeks or months?

## The integrated approach

A standalone deckle optimizer is good. A deckle optimizer **integrated with your sales orders, production schedule, inventory, and invoicing** is dramatically better.

Why? Because deckle plans aren't made in isolation. They depend on the live order book, machine availability, raw material readiness, and customer credit status. When all five live in different systems, the deckle planner spends 30 minutes a day chasing data — and gets a stale snapshot.

When all five live in one ERP, the deckle plan refreshes automatically and reflects the real state of the mill at every moment.

## Next steps

If trim waste in your mill is over 5%, you're losing significant money you can recover. We've helped Indian mills bring trim from 8.2% to 3.4% in three months — without changing machines, slitters, or operators.

[See how the Papyrus BPApp Deckle Optimizer works →](/product/deckle)`,
  },

  "gst-compliance-checklist-paper-mill": {
    slug: "gst-compliance-checklist-paper-mill",
    title: "GST Compliance Checklist for Indian Paper Manufacturers",
    subtitle:
      "Every GST return, every e-invoice rule, every e-way bill scenario — what paper mills must do in 2026.",
    description:
      "A complete GST compliance guide for paper mills: GSTR-1, GSTR-3B, GSTR-9, e-invoice, e-way bill, ITC reconciliation, RCM on transport, and audit-ready records.",
    publishedAt: "2026-05-26",
    readMinutes: 11,
    tags: ["GST", "Compliance", "Finance"],
    body: `GST compliance for Indian paper mills has evolved dramatically since 2017. What started as a unified tax has become a real-time compliance stack: e-invoicing, e-way bills, GSTR-2A matching, monthly returns, annual reconciliation, audit trails. This guide covers what paper mills must do today.

## The five GST returns a paper mill files

### GSTR-1 — Sales return
Filed monthly (by 11th of next month) or quarterly under QRMP (by end of next month). Lists every outward supply: invoices, debit notes, credit notes, exports, B2C summaries, HSN-wise summary.

For paper mills, key sections:
- **B2B** — every customer invoice (the bulk of filings)
- **Exports** — under LUT or with payment, with shipping bill detail
- **Credit notes** — for returns, quality rejections, post-dispatch rate revisions
- **HSN summary** — most paper grades fall under HSN 4801–4823 with rates of 12% or 18%

### GSTR-3B — Monthly summary + tax payment
Filed by 20th of next month. Summary of outward + inward + tax payable + ITC claimed. This is where actual tax is paid.

GSTR-1 and GSTR-3B must reconcile. Mismatches → notices.

### GSTR-2A / GSTR-2B — ITC available from suppliers
Auto-populated based on suppliers' GSTR-1 filings. Your ITC is only available for invoices that appear here. Critical reconciliation step every month.

### GSTR-9 — Annual return
Filed by 31st December of next financial year. Annual summary of all monthly returns. Required for businesses with turnover > ₹2 crore.

### GSTR-9C — Reconciliation statement
Annual reconciliation of GSTR-9 with audited financial statements. Required for turnover > ₹5 crore.

## E-invoicing — mandatory for paper mills

If your paper mill's turnover exceeds **₹5 crore** in any preceding year, you must generate e-invoices. The flow:

1. Generate invoice in your ERP
2. Push to **IRP (Invoice Registration Portal)** via JSON/API
3. Receive **IRN (Invoice Reference Number)** + signed QR code
4. Print IRN + QR code on the physical invoice
5. Invoice auto-flows to GSTR-1 and customer's GSTR-2A

Without IRN, the invoice is invalid for GST purposes. Customers won't get ITC. Sales are blocked at supply chain partner audits.

## E-way bill — for every dispatch above ₹50,000

E-way bill is mandatory for goods movement (intra-state ≥ ₹1 lakh in most states; inter-state ≥ ₹50,000). Validity by distance:

- Up to 200 km — 1 day
- 200–400 km — 3 days
- 400–800 km — 5 days
- > 800 km — 7 days

Detained trucks at checkposts if e-way bill is missing, expired, or has incorrect vehicle number.

For paper mills with frequent dispatches:
- Auto-generate e-way bills from sales invoice
- Track validity expiry per truck
- Handle vehicle changes mid-journey
- Bulk operations for multi-customer dispatches

## RCM on transport — paper mills must pay

When a paper mill engages a Goods Transport Agency (GTA), GST is paid under **Reverse Charge Mechanism (RCM)** — i.e., the mill (recipient) pays GST instead of the transporter (supplier).

- 5% GST under RCM (no ITC eligible on input side)
- Or 12% GST under RCM (ITC eligible on input side)

Most paper mills opt for the 12% route to claim ITC. Requires:
- Self-invoice generation for each GTA service
- Recording in GSTR-3B (Table 3.1d)
- ITC claim in next GSTR-3B (Table 4A)

## ITC reconciliation — monthly discipline

A paper mill's monthly ITC reconciliation:
1. Pull GSTR-2B (auto-generated from suppliers' filings)
2. Match against books (POs, invoices, payments)
3. Identify mismatches: invoice in books not in 2B, or 2B not in books
4. Follow up with suppliers for missing entries
5. Hold supplier payments on persistent mismatches
6. Claim only matched ITC in GSTR-3B

Tools doing this automatically save 2-4 days per month of finance team effort.

## TDS, TCS, and MSME

GST is just part of the compliance load. Paper mills also handle:

- **TDS** — deducted on rent, professional fees, contract labour, transport (Section 194C). Filed quarterly (24Q, 26Q).
- **TCS** — collected on certain sales (scrap, waste). Filed quarterly (27EQ).
- **MSME Act** — payment to registered MSME suppliers within 45 days. Reporting in MCA quarterly returns.

## Audit-ready records

For audit, paper mills must retain:
- All invoices (outward + inward) for 6 years
- E-way bills for 6 years
- Bank statements + ledgers
- Tax payment challans
- GSTR-1, 2B, 3B, 9 acknowledgments
- ITC reconciliation worksheets
- Vendor RC validation records

This is where modern ERPs differ from Tally/Excel: the audit trail is **automatic** — every entry has a timestamp, user, and source document reference. Manual systems take weeks to compile audit responses; integrated systems compile in minutes.

## Common compliance pain points

What we see in Indian paper mills:

- **Manual e-invoice generation** — typed twice (ERP + IRP portal), errors at 3-5% rate
- **E-way bill management on WhatsApp** — vehicle number changes lost in chat
- **Late GSTR-1 filing** — disrupts customer ITC, kills supply chain trust
- **ITC mismatches piling up** — by year-end, ₹50 lakh+ stuck in unreconciled ITC
- **TDS deducted incorrectly** — wrong section, wrong rate, refund disputes
- **MSME 45-day violations** — flagged in audits, interest accrued

Each of these is preventable with the right system.

## The integrated answer

A paper mill ERP with native GST support eliminates 90% of compliance pain:

- **Invoice → IRN → e-way bill → GSTR-1** flows automatically
- **GSTR-2A/2B reconciliation** runs daily, not monthly
- **RCM self-invoices** generated automatically for every GTA service
- **TDS deduction** auto-calculated by section + rate at payment time
- **MSME tracking** flags overdue dues before they breach 45 days
- **GSTR-9 + 9C** auto-prepared from monthly returns

[See Papyrus BPApp's Finance & GST module →](/product/finance)`,
  },

  "choosing-erp-for-paper-mill": {
    slug: "choosing-erp-for-paper-mill",
    title: "How to Choose the Right ERP for Your Indian Paper Mill",
    subtitle:
      "10 questions to ask every ERP vendor. The hidden gotchas. What separates a deployment that ships from one that drags for 18 months.",
    description:
      "A practical guide to selecting paper mill ERP in India: from generic global ERPs (SAP, Oracle) to industry-specific platforms. The 10 questions that surface real fit.",
    publishedAt: "2026-05-26",
    readMinutes: 10,
    tags: ["ERP", "Buying guide", "Manufacturing"],
    body: `Choosing an ERP is the single most consequential software decision a paper mill makes. Get it right: your mill runs smoothly for the next decade. Get it wrong: you'll be in a multi-year, multi-crore mess that limps along until the next replacement project starts.

This guide gives you 10 questions to ask every vendor — the questions that surface real fit, beyond glossy demos.

## The landscape

ERPs for Indian paper mills fall into four buckets:

1. **Generic global enterprise ERP** — SAP S/4HANA, Oracle Cloud, Microsoft Dynamics 365. Industry depth via customization. High cost, long timelines, deep capability.
2. **Generic mid-market ERP** — Infor LN/CloudSuite, Epicor, Sage X3. Mid-cost, mid-timeline, broad manufacturing capability.
3. **Indian SMB accounting** — Tally, Marg, Busy, ProcessProERP. Strong accounting + GST, weak on manufacturing depth.
4. **Industry-specific** — Papyrus BPApp (paper), and a few others. Purpose-built for paper, fastest to value if it fits.

There's no "best" — it depends on your mill's size, complexity, budget, and timeline.

## The 10 questions

### 1. Is it paper-specific or generic with paper customization?
A paper-specific ERP has a data model built around grades (GSM, BF, BS), parent reels, deckle plans, broke management, customer specs. A generic ERP makes you bolt these on. Bolt-ons crack over time as the platform evolves.

> **Ask**: "Show me how your data model handles a parent reel with multiple slit reels going to different customers, with batch genealogy preserved through finishing and dispatch."

If the answer involves custom fields and code, it's bolted on.

### 2. Is GST native or customized?
"Native" means GST is in the core schema, the e-invoice flow is automatic, GSTR-1 generates without manual mapping, e-way bills auto-trigger on dispatch. "Customized" means you'll pay your implementation partner to build all of this.

> **Ask**: "Walk me through generating an e-invoice + e-way bill from a sales order, end-to-end, in your demo system."

Should take 30 seconds. If it takes 5 minutes with manual entry, it's customized.

### 3. Is the deckle optimizer part of the platform or a partner add-on?
Many ERPs claim "integrated deckle optimization" — but it's actually a third-party tool (Greycon, CrossCut, OpenTrim) bolted on. Integration breaks under change. Partner upgrades you don't.

> **Ask**: "Is the deckle optimizer your own code? Can I see the constraint configuration screens? Show me how a sales order change reaches the optimizer."

Real-time integration looks like a sub-second event flow. Bolt-on integration looks like a batch sync.

### 4. What's the time to first production go-live?
Industry-specific ERPs typically: 4-12 weeks. Mid-market ERPs: 6-18 months. Enterprise ERPs (SAP/Oracle): 12-24 months.

> **Ask**: "What's the maximum you'll commit to in writing for go-live of Sales + Finance + Production?"

Vendors who say "depends on customer readiness" are dodging. Force a number.

### 5. How does the platform handle Indian payroll at scale?
PF + ESI + PT + LWF + state-specific labour rules. For a 100-employee mill, this is non-trivial. For a 500-employee multi-plant group, this is critical.

> **Ask**: "Run a payroll for 200 employees with 3 shifts, biometric attendance, with PF + ESI + PT + LWF + gratuity + bonus + arrears in your demo system. Show me the bank advance file."

If it takes 30 minutes of "configuring" before they can demo, it's not ready.

### 6. Cloud-native or cloud-hosted?
"Cloud-hosted" = legacy desktop ERP shoved into a VM. Still single-tenant, still painful upgrades, still vendor calls for backups.

"Cloud-native" = multi-tenant SaaS, automatic upgrades, built-in disaster recovery, no on-prem hardware ever.

> **Ask**: "When was your last major version upgrade? How many customers were affected by downtime?"

True cloud-native: zero customer downtime, weekly releases. Hosted: planned maintenance windows, customer-by-customer rollout.

### 7. What does TCO look like over 5 years?
Vendors love to talk Year 1 licenses. Real TCO is implementation + licenses + AMC + customization + integration + upgrades + training + people.

> **Ask**: "Give me a 5-year TCO model assuming we add 1 more plant in Year 3 and 50 more users in Year 4."

If they can't give you this within a week, they don't actually know.

### 8. Can we start small and grow?
Modular activation matters. You shouldn't have to buy 45 modules to use 4. You should be able to add modules as needed without a re-implementation.

> **Ask**: "If we start with Sales + Finance + Inventory in Phase 1, what's the cost and time to add Production + Deckle in Phase 2?"

Industry-specific ERPs: usually weeks. Enterprise ERPs: often a new project.

### 9. What's the upgrade story?
ERPs need to evolve — new GST rules, new compliance, new features. If you're 3 versions behind because upgrading is a 6-month project, you've inherited the vendor's technical debt.

> **Ask**: "What version are your customers on today? How often do you upgrade them?"

Cloud-native SaaS: 100% on latest, continuously. Legacy ERPs: spread across 5+ versions, some 5+ years behind.

### 10. Who actually does the implementation?
Vendor-led? Partner-led? Hybrid? Each has trade-offs.

- **Vendor-led**: faster decisions, single accountability, often more expensive
- **Partner-led**: scalable, can be cheaper, can have variable quality
- **Hybrid**: vendor for product + partner for change management — common in enterprise rollouts

> **Ask**: "Will your engineers actually configure my mill, or is this all going to a partner I'll have to manage?"

For mid-market paper mills, vendor-led is usually best. Direct accountability, faster issue resolution.

## The hidden gotchas

Things vendors don't volunteer:

- **Per-user licensing** — looks cheap until you hire shift workers. Some vendors charge per concurrent user (better) or per named user (worse for shift mills).
- **Module licensing** — "Production" might be 3 modules in some pricebooks. Get the full breakdown.
- **Customization cost** — every report you want changed is a project. Industry-specific ERPs typically include these as configuration.
- **Integration cost** — connecting to PLCs, weighbridges, e-invoice portal, banking APIs. Generic ERPs treat each as a project; paper-specific platforms include them.
- **Annual price escalation** — enterprise vendors raise prices 8-15%/year. Check the contract.
- **Termination clause** — what happens when you want to leave? Can you export your data in standard formats?

## The decision framework

For most Indian paper mills under 200 TPD, the decision is:

| Your situation | Best fit |
|---|---|
| Small mill (<10 TPD), accounting-only | Tally/Marg + manual ops |
| Growing mill (10-100 TPD), full digitization | Paper-specific ERP (Papyrus BPApp) |
| Multi-plant mid-market (100-500 TPD) | Paper-specific OR Infor/Dynamics |
| Enterprise multi-country (500+ TPD) | SAP S/4HANA Mill Products |

Above ~200 TPD, hybrid approaches make sense: paper-specific for production/deckle + enterprise for finance consolidation.

## What we recommend

If you're an Indian paper mill under 500 TPD and frustrated with the gap between Tally and SAP, **start with a paper-specific ERP**. Faster to value, India-built, paper-first.

If you're a multinational paper company with 5+ mills globally, **stay with enterprise** — SAP/Oracle depth justifies the cost.

If you're between — **POC both**. Demand 4-week proof-of-value with your real data. The faster ERP usually wins.

[See Papyrus BPApp in action →](/product)`,
  },

  "paper-machine-oee-guide": {
    slug: "paper-machine-oee-guide",
    title: "Paper Machine OEE: A Complete Guide for Indian Mills",
    subtitle:
      "What OEE really means, why most Indian mills calculate it wrong, and how to move from 50% to world-class 85%.",
    description:
      "Complete guide to Overall Equipment Effectiveness (OEE) for paper machines: calculation formula, common mistakes, real-time tracking, root cause analysis, and improvement playbook.",
    publishedAt: "2026-05-26",
    readMinutes: 8,
    tags: ["OEE", "Production", "Operations"],
    body: `OEE — Overall Equipment Effectiveness — is the single most important productivity metric for paper machines. Done right, it tells you exactly where capacity is leaking. Done wrong, it's a vanity number that hides the truth. Most Indian paper mills calculate OEE wrong.

## The formula

\`OEE = Availability × Performance × Quality\`

- **Availability** = Run time ÷ Planned time. Captures unplanned downtime.
- **Performance** = Actual speed ÷ Design speed. Captures speed losses.
- **Quality** = Good output ÷ Total output. Captures reject losses.

World-class paper machines run 85%+ OEE. Indian average: 50–65%.

## Common calculation mistakes

### Mistake 1 — Excluding planned downtime
Many Indian mills exclude PM, grade changes, breaks from "planned time" — making availability look better than reality. The world-class standard counts all non-running time as availability loss (except scheduled non-production shifts).

### Mistake 2 — Using nominal speed
Performance often uses nominal machine speed instead of design speed for the grade being made. A 1500 m/min machine running 95 GSM kraft might have a design speed of 900 m/min — using 1500 inflates performance.

### Mistake 3 — Ignoring small quality losses
Edge trim, broke at startup, off-spec reels going to repulp — these get hidden in "production" rather than quality losses. World-class measurement captures all of it.

### Mistake 4 — Reporting monthly averages
Daily and shift-level OEE surfaces patterns that monthly averages hide. If your shift A consistently runs 70% and shift B runs 55%, the average says 62.5% — useless. Per-shift visibility reveals the real story.

## The world-class targets

- **Availability**: 90%+
- **Performance**: 95%+
- **Quality**: 99%+
- **OEE**: 85%+

A 10-point OEE improvement on a 50 TPD mill = ~5 TPD more output. At ₹55,000/ton, that's ₹10 crore/year — without buying any new equipment.

## The improvement playbook

### Step 1 — Measure correctly
Real-time data capture at the machine. PLC integration > manual reporting > Excel summaries. If your operators are filling shift reports in Excel at 6 PM about what happened at 9 AM, your data is fiction.

### Step 2 — Categorize downtime
Six big loss categories:
- Breakdowns (mechanical, electrical)
- Setup/changeover (grade changes)
- Minor stops (sheet breaks, web wrapping)
- Reduced speed
- Startup quality losses
- Production defects

### Step 3 — Pareto analysis
80/20 rule applies. Find the top 5 downtime reasons accounting for 80% of losses. Fix those first. Most mills find 2–3 reasons account for >50% of losses.

### Step 4 — Root cause for each top loss
Use 5-why or fishbone. Don't accept "operator error" as root cause — drill into training, tools, materials, machine wear.

### Step 5 — Implement countermeasures
Each top loss needs: action owner, deadline, success metric. Review weekly. Most issues have engineering or process solutions, not just discipline.

### Step 6 — Sustain with daily reviews
Morning meetings on live OEE data. Shift handover formal. Operator accountability without blame.

## Real example

A 60 TPD kraft mill: starting OEE 58%. Target 70% in 6 months.

Top 5 losses found:
1. Wet end sheet breaks during humidity changes (18% of downtime)
2. Reel turn-up failures at machine speed (12%)
3. Slitter changeovers between customer widths (10%)
4. Press section blanket changes (9%)
5. Headbox slice adjustment for GSM transitions (8%)

Countermeasures over 4 months:
- Humidity controller upgrade + chemistry adjustment for #1
- Reel turn-up mechanism rebuild + operator training for #2
- Pre-staged knife sets + 90-second changeover SOPs for #3
- Predictive blanket replacement + spare onsite for #4
- Auto slice adjustment via PLC for #5

Result after 4 months: OEE up to 71%. +13 points = +7.8 TPD output = +₹15 crore/year revenue.

## The integrated approach

OEE improvement requires:
- Real-time data (not Excel after the fact)
- Reason-coded downtime capture (at the machine, not in a register)
- Cross-shift visibility (one source of truth)
- Root cause workflows (NCR/CAPA built in)
- AI-driven anomaly detection (catch patterns humans miss)

This is exactly what Papyrus BPApp's Production module + IoT module + AI module deliver natively. No middleware, no integration projects.

[See the Production module →](/product/production)`,
  },

  "mps-mrp-crp-paper-mill": {
    slug: "mps-mrp-crp-paper-mill",
    title: "MPS, MRP, CRP for Paper Mills: How Production Planning Actually Works",
    subtitle:
      "The three-layer planning stack every paper mill needs — explained in plain language with paper-specific examples.",
    description:
      "Master Production Schedule, Material Requirements Planning, Capacity Requirements Planning — what they are, how they connect, and how Indian paper mills use them.",
    publishedAt: "2026-05-26",
    readMinutes: 7,
    tags: ["Production", "Planning", "ERP"],
    body: `Every paper mill runs production planning — but most run it manually in Excel and call it "scheduling." A real production planning stack has three layers: MPS, MRP, CRP. Done right, they form an integrated planning system that catches bottlenecks before they happen.

## MPS — Master Production Schedule

The top layer. Answers: **what will we produce, on which machine, when?**

Inputs:
- Sales orders (firm + forecast)
- Machine availability and PM schedules
- Customer priorities and credit status
- Grade transition costs and constraints

Output: A time-phased plan typically covering 4–12 weeks. "PM1 makes 100 GSM kraft from Mon to Wed, then transitions to 120 GSM Thu–Fri."

For Indian paper mills: MPS is where you decide which orders make the cut, which get delayed, which need overtime.

## MRP — Material Requirements Planning

The middle layer. Answers: **what raw materials do we need, and when?**

Inputs:
- MPS (what we're making, when)
- BOMs (recipe per grade)
- Existing inventory (pulp, chemicals, packing)
- Supplier lead times

Output: Time-phased material requirements. "Need 80 tons of OCC by Wednesday. Need 5 tons of starch by Tuesday. Issue PR for resin by Friday for next week's run."

For Indian paper mills: MRP prevents the all-too-common scenario of starting a customer order Tuesday morning only to discover Monday night that the right chemical isn't in stock.

## CRP — Capacity Requirements Planning

The validation layer. Answers: **does our planned production fit our capacity?**

Inputs:
- MPS proposed schedule
- Machine capacity (effective hours considering downtime targets)
- Labour availability
- Bottleneck operations

Output: Capacity violation alerts. "PM1 is overloaded by 8 hours next week. Either delay an order or run overtime."

For Indian paper mills: CRP catches over-commitment early. Without it, sales teams promise dates that operations can't meet, then the mill scrambles at month-end.

## How they connect

\`Sales Orders → MPS → MRP → Purchase Orders\`
\`              ↓\`
\`             CRP → Schedule Adjustments\`

It's a closed loop. Sales orders feed MPS, MRP issues purchase orders, CRP validates capacity. Changes anywhere ripple through.

## Paper-specific nuances

### Grade transitions cost real money
Switching from 100 GSM to 80 GSM on PM1 takes 2 hours of off-spec production = 4 tons of broke. MPS must account for transition costs when sequencing grades.

### Furnish constraints across PMs
A 200 TPD mill with PM1 (kraft) and PM2 (writing) shares pulp prep capacity. If PM2 needs hardwood furnish at 10 AM and PM1 needs softwood at 11 AM, stock prep is the bottleneck. CRP must catch this.

### Customer specs aren't just GSM
Customer A wants 100 GSM kraft with BF ≥ 18. Customer B wants the same paper but in 800 mm reels. The deckle plan (downstream of MPS) determines which customers can be combined into one run.

### Trim waste is part of the plan
A standalone MPS might say "make 50 tons of 100 GSM kraft." A paper-mill-aware MPS knows that without integrating deckle optimization, you'll waste 8% to trim. So you must produce 54 tons to ship 50.

## How Indian mills typically run today

- **Small mills (<20 TPD)**: Whiteboard scheduling, no formal MPS/MRP/CRP. Owner intuition.
- **Mid mills (20–100 TPD)**: Excel for MPS, manual MRP, no CRP. Frequent firefights.
- **Large mills (>100 TPD)**: ERP-driven MPS/MRP, but often with stale data and manual workarounds.

The gap between Excel-based planning and real integrated MPS/MRP/CRP is where most operational improvement opportunity sits.

## What modern integrated planning looks like

In Papyrus BPApp:
- **Sales orders flow into MPS automatically** — no re-entry
- **MPS auto-sequences orders** using customer priority, deckle compatibility, grade transitions
- **MRP fires daily**, issuing PRs for materials going below safety stock
- **CRP runs every shift**, flagging capacity violations 2–4 weeks ahead
- **Deckle Optimizer is part of the plan**, not a downstream tool

Result: planners spend hours on exception handling, not data entry. Mill output increases 8–15% without buying new equipment.

[See the Production Planning module →](/product/production)`,
  },

  "e-way-bill-paper-mill-guide": {
    slug: "e-way-bill-paper-mill-guide",
    title: "E-Way Bill for Paper Mills: Complete Compliance Guide",
    subtitle:
      "Every paper dispatch needs an e-way bill. Here's how Indian mills should handle generation, validity, vehicle changes, and inspections.",
    description:
      "Complete e-way bill guide for paper mill dispatches: thresholds, generation, validity periods by distance, vehicle change handling, inspection scenarios.",
    publishedAt: "2026-05-26",
    readMinutes: 6,
    tags: ["GST", "Compliance", "Logistics"],
    body: `E-way bill is mandatory for nearly every paper mill dispatch in India. Get it wrong and your truck gets detained at a state checkpost — costing detention, late delivery penalties, and customer relationships. Here's what paper mills need to know.

## When e-way bill is required

- **Inter-state**: For consignments ≥ ₹50,000. Almost every paper mill dispatch crosses this threshold.
- **Intra-state**: Threshold varies by state. Most states require for consignments ≥ ₹1,00,000.
- **Job-work**: E-way bill required even for goods sent on challan (not invoice).

## Validity periods (by distance)

\`Up to 200 km   →  1 day\`
\`200 to 400 km  →  3 days\`
\`400 to 800 km  →  5 days\`
\`Above 800 km   →  7 days\`

Validity starts when the e-way bill is generated. If goods don't move that day, validity wastes.

## Common paper mill scenarios

### Single customer, single truck — straightforward
Generate invoice → generate e-way bill linked to invoice → vehicle number entered → truck moves.

### Multi-customer truck (common for kraft mills)
One truck dispatches to 3 customers, each with separate invoice. Three e-way bills, all linked to same vehicle number, all moving together.

### Vehicle change mid-journey
Truck breakdown 300 km from destination. New truck arranged. Original e-way bill needs vehicle number update via the EWB portal. Done within validity.

### Trans-shipment at warehouse
Mill dispatches to own depot first, then customer. Two legs = two e-way bills. Inventory module must track both legs.

### Returns from customer
Customer rejects 2 tons. Goods come back. Reverse e-way bill needed for the return movement.

## Common mistakes to avoid

### Wrong HSN code
Paper has multiple HSN codes (4801, 4802, 4804, 4805, 4810, 4811, etc.). Using wrong HSN = wrong GST rate = compliance issue.

### Wrong vehicle number format
Should be without spaces, all caps. "MH02AB1234" not "mh-02-ab-1234".

### Mismatched invoice and e-way bill values
If invoice is ₹4,98,000 and e-way bill says ₹5,02,000, audit will catch it.

### Generating e-way bill the day before, not moving
Wastes one day of validity. Generate when truck is loaded, not earlier.

### Forgetting Part-B vehicle update
For inter-state, transporter ID and vehicle number must be entered before movement. Missing this = detention at first checkpost.

## Detention scenarios

If detained at checkpost:
1. **Missing/wrong e-way bill**: Goods detained until corrected
2. **Expired e-way bill**: Penalty up to 200% of tax or ₹10,000 (whichever higher)
3. **No physical documents**: Truck stopped until digital copy can be shown
4. **Value mismatch**: Detention + investigation

Paper mills typically face 2–5 detention incidents per year on long-haul routes. Each costs 24–72 hours of delay.

## Best practices for paper mills

### Automate e-way bill from dispatch
Sales order → invoice → IRN → e-way bill, all auto-chained. Manual entry = errors.

### Validity tracking
Dashboard showing all in-transit e-way bills and remaining validity. Alert at 4 hours remaining.

### Vehicle change workflow
Mobile app for transport team to update vehicle number when breakdowns occur — without waiting for office.

### Multi-customer truck visualization
Map view of trucks in transit, customers served, e-way bill status per leg.

### Historical archive
6-year retention for audit. Searchable by date, customer, truck, route.

## Compliance penalties

- Late generation: ₹500/day per e-way bill
- Wrong information: 100% of tax or ₹10,000 (whichever higher)
- Movement without e-way bill: 200% of tax or ₹10,000 (whichever higher)
- Repeated violations: Higher penalties + investigation

For active paper mills doing 20+ dispatches/day, even 1% error rate = significant exposure.

## How Papyrus BPApp handles it

The Sales + Finance modules generate IRN, e-way bill, and gate pass in one user action from the dispatch screen. Validity tracking, vehicle change workflow, multi-customer truck handling, and audit archive are all native.

No portal switching, no manual data entry, no missed validities.

[See the Finance & GST module →](/product/finance)`,
  },

  "broke-management-paper-mill": {
    slug: "broke-management-paper-mill",
    title: "Broke Management in Paper Mills: Strategies to Reduce In-Mill Waste",
    subtitle:
      "Every paper mill generates broke. Top mills measure it, root-cause it, and use the data to drive operational improvement.",
    description:
      "Complete guide to broke management in paper mills: types of broke, measurement, repulping economics, root-cause analysis, and reduction strategies.",
    publishedAt: "2026-05-26",
    readMinutes: 7,
    tags: ["Operations", "Production", "Cost reduction"],
    body: `Broke — in-mill waste paper — is unavoidable in paper manufacturing. But the difference between top mills and average mills is dramatic: top mills run 3–4% broke, average mills run 7–10%. On a 50 TPD mill, that gap = ₹1.5–2 crore/year in lost margin.

This guide covers what broke is, where it comes from, and how to systematically reduce it.

## Types of broke

### Wet-end broke
Generated at the forming section before drying. From: sheet breaks, edge curl, web wrapping, basis weight transitions. Returns directly to the headbox via broke chest with minimal energy cost.

### Dry-end broke
Generated after the dryers. From: reel turn-up failures, broke at the reel, dryer issues. Must be re-pulped — energy and chemical cost.

### Trim broke
Edge trim and pattern-mismatch waste from slitting. The single largest broke category on most mills. Addressed by deckle optimization.

### Finishing broke
From sheeting, cutting, packaging operations. Often small but easy to ignore.

### Off-spec reels
Full reels rejected at quality (wrong GSM, brightness, moisture, etc.) and sent to broke pile.

## Why measuring broke matters

Broke is the universal symptom. Every operational issue eventually shows up as broke:
- Bad pulp → wet-end breaks → broke
- Worn dryer felts → dry-end breaks → broke
- Slitter blade dull → off-cut edges → broke
- Wrong customer specs → reject reels → broke
- Operator error → handling damage → broke

Measure broke by source, and you can see which operational area needs attention.

## How most Indian mills measure broke today

- **Daily broke pile measurement**: One operator estimates morning. "Looks like 3 tons today." No accuracy, no source attribution.
- **Monthly reconciliation**: Difference between paper produced (machine reel counter) and paper shipped (invoice) = broke. Late, no actionable insight.
- **Excel reporting**: Some mills have shift-wise broke logs but rarely tied to specific causes.

This is enough to know broke exists but not enough to systematically reduce it.

## What modern broke tracking looks like

Per-source attribution at the moment broke is generated:
- Wet-end break: timestamp + grade + machine speed + reason code (entered at machine)
- Reel rejection: reel ID + quality test result + reason
- Trim broke: tied to deckle plan + slitter shift
- Sheeting broke: per shift + per machine

Each broke event has:
- Timestamp
- Tonnage estimate
- Source (machine, operation)
- Reason code
- Operator/shift

Roll this up and you get the Pareto of broke — which 3 sources account for 70% of total broke.

## The economics of broke

Broke isn't "free recycling." Repulping costs include:
- Energy (typically ₹2,000–3,000/ton)
- Chemicals (retention aids, defoamers, etc.)
- Fibre degradation (each cycle through reduces strength)
- Effluent impact (more chemicals in ETP)

True broke cost: typically 30–40% of the paper's sale price. So a 50 TPD mill running 8% broke isn't just losing 4 tons/day of paper — it's losing about ₹1 lakh/day of margin.

## The reduction playbook

### Step 1 — Measure correctly
Real-time broke capture at source. Shop floor app or PLC integration. Not Excel.

### Step 2 — Categorize
Six big categories: wet-end breaks, dry-end breaks, trim, finishing, off-spec, handling damage.

### Step 3 — Pareto and target top 3
80/20 — find the 3 categories accounting for 70%+ of broke. Set monthly targets.

### Step 4 — Root cause per category
Trim broke → deckle optimization
Wet-end breaks → forming section investigation
Off-spec reels → process control + quality plan tightening
Reel turn-up failures → equipment maintenance + operator training

### Step 5 — Implement, measure, iterate
Each target gets an owner, monthly tracking, weekly reviews.

## Common root causes and fixes

| Root cause | Fix |
|---|---|
| Trim waste 8%+ | Deckle Optimizer with 3-tier engine |
| Frequent sheet breaks | Forming section inspection, chemistry tuning |
| Reel turn-up failures | Mechanism rebuild, operator training |
| GSM variation off-spec | Auto slice adjustment, basis weight controller upgrade |
| Brightness variation | Recycled fibre quality control, OBA dosing |
| Dryer-section sheet breaks | Felt replacement schedule, condensate management |
| Operator handling damage | Mechanized handling, awareness program |

## Real outcome

A 70 TPD kraft mill in Maharashtra:
- Starting broke: 8.4%
- After 6 months on Papyrus BPApp with integrated broke tracking + deckle optimization: 3.9%
- Reduction: 4.5 percentage points
- Net gain: 3.15 tons/day saved from broke
- Annual value: ₹6.3 crore at ₹55,000/ton sale price (≈₹2 crore in real margin after repulping cost considered)

## The integrated approach

Broke management benefits from:
- Real-time event capture at the machine
- Integrated trim/deckle optimization (often the biggest single source)
- Quality module tied to reel-level decisions
- Pareto analytics + trend dashboards
- AI anomaly detection for unusual patterns

Papyrus BPApp's Broke Management module + Production + Quality + Deckle + AI work together to make this systematic.

[See the Broke Management module →](/product/broke-management)`,
  },

  "paper-grades-india-guide": {
    slug: "paper-grades-india-guide",
    title: "Indian Paper Grades: GSM, BF, BS Specifications Reference Guide",
    subtitle:
      "Complete reference of paper grades made in India — GSM ranges, BF requirements, end uses, customer expectations.",
    description:
      "Comprehensive guide to Indian paper grades: writing & printing, kraft, tissue, board, newsprint, specialty. GSM ranges, BF/BS specs, brightness, end uses.",
    publishedAt: "2026-05-26",
    readMinutes: 6,
    tags: ["Paper grades", "Quality", "Reference"],
    body: `Indian paper mills produce a remarkable variety of paper grades, each with its own specifications, market expectations, and operational requirements. This is a reference guide to the major grades — useful for sales teams quoting, planners scheduling, and quality teams setting specs.

## Writing & Printing papers

The "office paper" category. Used for printing, copying, books, notebooks.

| Grade | GSM | Brightness | Use |
|---|---|---|---|
| Maplitho | 50–80 | 80–85% | Notebooks, textbooks |
| Cream wove | 50–80 | 70–75% (cream) | Notebooks, cheap printing |
| Bond paper | 60–100 | 90–95% | Office copying, letterhead |
| Offset printing | 60–120 | 85–90% | Books, magazines |
| Coated art | 70–200 | 95%+ | Premium printing, magazines |

Key specs: GSM, brightness, opacity, smoothness, formation. Most made on Fourdrinier machines with hardwood pulp.

## Kraft papers

The "packaging paper" category. Brown, strong, primarily for corrugation.

| Grade | GSM | BF | Use |
|---|---|---|---|
| Test liner | 90–200 | 16–22 | Corrugation outer liner |
| Fluting medium | 100–180 | 14–18 | Corrugation middle (fluted) |
| Kraft sack | 70–120 | 20–28 | Cement sacks, food sacks |
| Recycled kraft | 90–200 | 14–20 | Lower-cost corrugation |
| Virgin kraft | 80–250 | 22–32 | Premium corrugation, food |

Key specs: GSM, BF (burst factor), BS (bursting strength), RCT, ring crush, cobb (water resistance). Made on kraft machines with hardwood/softwood pulp or recycled OCC.

## Tissue & Towel papers

Lightweight, soft, absorbent. For hygiene and household.

| Grade | GSM | Brightness | Use |
|---|---|---|---|
| Toilet tissue | 13–25 | 80–90% | Bathroom rolls |
| Facial tissue | 15–25 | 85–92% | Boxed tissues |
| Kitchen towel | 22–40 | 75–85% | Paper towels |
| Industrial wipe | 30–50 | 70–80% | Wipes, napkins |
| Napkin | 18–25 | 85% | Restaurant napkins |

Key specs: GSM, softness (handle), absorbency, brightness, dust. Made on tissue machines with Yankee dryers + crepe.

## Paperboard

Multi-ply, heavy. For packaging.

| Grade | GSM | Brightness | Use |
|---|---|---|---|
| Duplex board | 200–500 | 75–85% (top) | Cartons, packaging |
| Triplex board | 250–600 | 80–90% (top) | Premium packaging |
| Folding box board | 200–450 | 85–92% | Cosmetics, pharma boxes |
| Solid bleached sulfate (SBS) | 200–400 | 90%+ | Food contact, premium |
| Cup stock | 170–350 | 85%+ | Paper cups |
| Recycled board | 250–600 | 60–75% (top) | Lower-cost packaging |

Key specs: GSM, ply construction, brightness per layer, smoothness, IGT printability, food-contact compliance (FSSAI/FDA). Made on multi-ply machines.

## Newsprint

Low-cost, mechanical pulp content. For newspapers.

| Grade | GSM | Brightness | Use |
|---|---|---|---|
| Standard newsprint | 42–48 | 56–60% | Newspapers |
| Upgraded newsprint | 45–55 | 60–70% | Premium newspapers, inserts |

Key specs: GSM, opacity, tensile strength, brightness, run quality at press speeds (1000+ m/min press runs). Made on high-speed newsprint machines with mechanical pulp + DIP.

## Specialty papers

Niche, high-value grades for specific applications.

| Grade | GSM | Use |
|---|---|---|
| Bible paper | 25–40 | Bibles, dictionaries (thin, opaque) |
| Carbonless paper | 40–80 | Multi-part forms |
| Thermal paper | 50–100 | POS receipts, fax |
| Currency paper | 80–110 | Banknotes (cotton-based, not strictly paper mill) |
| Cigarette paper | 22–30 | Tobacco wraps |
| Filter paper | 30–150 | Coffee filters, lab |
| Glassine | 30–60 | Food packaging |
| Yellow board | 250–500 | Notebook covers |

Each has unique specs — moisture, oil resistance, opacity, etc.

## Indian-specific considerations

### HSN codes matter
- HSN 4801 — Newsprint
- HSN 4802 — Uncoated writing/printing
- HSN 4804 — Uncoated kraft
- HSN 4805 — Other uncoated paper
- HSN 4810 — Coated paper
- HSN 4811 — Surface-coated paper

Different HSN = different GST rate (typically 12% or 18%).

### Statutory specs
BIS standards exist for many grades (IS 1397, IS 6956, IS 1060, etc.). Customer specs often reference BIS.

### FSSAI for food contact
Paper used in direct food contact (tissue, cup stock, food wrap) needs FSSAI compliance. Quality plans must verify migration limits, heavy metals, additives.

## How specs vary by customer

The same nominal grade can have wildly different customer specs:

100 GSM kraft for Customer A (corrugation):
- BF ≥ 18, BS ≥ 1800, cobb ≤ 30

100 GSM kraft for Customer B (food sacks):
- BF ≥ 22, BS ≥ 2200, cobb ≤ 25, food-safe certification

100 GSM kraft for Customer C (cement bags):
- BF ≥ 26, BS ≥ 2600, tear resistance high

Same grade name, three different products. Paper mills need customer-spec-aware quality plans to handle this.

## How ERP supports grade management

Modern paper mill ERP needs:
- Grade master with GSM/BF/BS/brightness/moisture/cobb/etc.
- Customer-specific quality plans tied to grade master
- Per-grade BOM (furnish recipe)
- Per-grade pricing and customer rate contracts
- HSN code per grade for GST compliance
- BIS/FSSAI/FDA cert tracking per grade

Papyrus BPApp's Product Catalog + Quality + Pricing + Documents modules handle all of this natively.

[See all modules →](/product)`,
  },
};
