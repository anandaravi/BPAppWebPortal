import type { Metadata } from "next";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";

export const metadata: Metadata = {
  title: "ERP for Kraft Paper Mills | Papyrus BPApp",
  description:
    "Purpose-built ERP for Indian kraft paper mills. Manage corrugation-grade BF/BS specs, customer-specific GSM ranges, deckle optimization, packaging buyer requirements, and GST compliance — all in one platform.",
  alternates: { canonical: "/for/kraft-mill" },
  keywords: [
    "kraft paper mill ERP",
    "kraft mill software India",
    "corrugation paper ERP",
    "BF BS quality tracking",
    "kraft mill deckle optimizer",
    "Indian kraft mill management",
  ],
  openGraph: {
    title: "ERP for Indian Kraft Paper Mills",
    description: "Deckle, BF/BS quality, packaging buyers, GST — all in one platform built for kraft mills.",
    url: "/for/kraft-mill",
  },
};

const data: MillTypePageData = {
  millType: "Kraft Paper Mills",
  slug: "kraft-mill",
  hook: "The complete ERP for India's kraft paper mills — from BF/BS tracking to e-invoice.",
  intro:
    "Kraft paper mills face a unique combination of challenges: tight GSM and burst factor (BF) specs that vary by customer, corrugation-grade pricing that fluctuates with waste paper prices, packaging buyers who demand consistent quality with COAs, and ever-tightening GST compliance. Papyrus BPApp is built for these realities — covering everything from waste paper procurement to dispatch and GST e-invoicing in one integrated platform.",
  pains: [
    {
      title: "BF / BS specs vary per customer, per order",
      desc: "Customer A wants BF 18 minimum; Customer B accepts BF 16 if BS is high. Tracking these tolerances in Excel leads to rejections, complaints, and credit notes that eat margins.",
    },
    {
      title: "Waste paper price volatility kills costing",
      desc: "Waste paper inputs swing ±30% in a quarter. Without real-time cost roll-up by grade, you can't quote profitably or know which orders to prioritize.",
    },
    {
      title: "Deckle plan for 5+ widths daily",
      desc: "Kraft mills produce 3.5 m to 5.6 m deckles cut into 800–2200 mm widths for different corrugators. Manual deckle planning leaves 6–9% trim waste — ₹2–3 crore/year on a 50 TPD mill.",
    },
    {
      title: "Quality COA per dispatch is mandatory",
      desc: "Packaging buyers require Certificates of Analysis with BF, BS, GSM, moisture, cobb. Manual COA prep delays dispatch and creates audit risk.",
    },
    {
      title: "GST + e-way bill + e-invoice for every dispatch",
      desc: "Multiple GSTINs across plants, RCM on transport, e-way bill validity tracking — small errors mean detained trucks at checkposts.",
    },
    {
      title: "Multi-customer batches on the same reel",
      desc: "When one machine run serves 3–5 customers, batch traceability and split invoicing must be airtight for audits and complaints.",
    },
  ],
  solutions: [
    {
      title: "Customer-spec aware production planning",
      desc: "Quality plans tied to customer master. Production work orders enforce BF/BS/GSM tolerances. Lab tests auto-pass or hold reels against customer specs — not just generic limits.",
      module: "quality",
    },
    {
      title: "Real-time costing with raw material rollup",
      desc: "Waste paper grade prices feed directly into batch costing. Every reel's cost reflects the actual furnish, chemicals, energy, and labour consumed — not yesterday's average. Margin per customer per grade visible at all times.",
      module: "finance",
    },
    {
      title: "3-tier Deckle Optimizer built for kraft",
      desc: "Kraft-specific constraints (corrugator widths in mm, customer pocket combinations, edge trim minimums) baked in. Instant <2s reoptimization when an order is cancelled or upgraded. Pattern learning captures your proven combinations.",
      module: "deckle",
    },
    {
      title: "Auto-COA per dispatch",
      desc: "Quality test results auto-stitch into a customer-specific COA at dispatch time. PDF + email + print, all triggered from the dispatch screen. No manual data entry.",
      module: "quality",
    },
    {
      title: "GST e-invoice + e-way bill in one click",
      desc: "Sales order → dispatch → invoice → IRN with QR code → e-way bill — all auto-chained. Multiple GSTINs supported. RCM on transport vendors handled natively.",
      module: "finance",
    },
    {
      title: "Batch traceability across multi-customer reels",
      desc: "When one machine run serves 5 customers, each slit reel is tracked by batch + customer + invoice. Complaints, recalls, and audit queries resolved in seconds, not days.",
      module: "inventory",
    },
  ],
  caseSnapshot: {
    headline: "Trim waste reduction at a 60 TPD kraft mill (Maharashtra)",
    metric: "₹2.8 crore / year saved",
    desc: "Manual deckle plans were leaving 8.2% trim. Papyrus BPApp's 3-tier Deckle Optimizer brought it to 3.4% within 3 months of go-live. Combined with auto-COA and e-invoice, the platform paid for itself in under 5 months.",
  },
  relevantModules: [
    { name: "Deckle Optimizer", slug: "deckle", why: "3-tier trim optimization tuned for kraft corrugator widths and customer pocket combinations." },
    { name: "Quality Management", slug: "quality", why: "BF/BS/GSM/moisture/cobb testing, customer-spec tolerances, auto-COA at dispatch." },
    { name: "Production Planning", slug: "production", why: "Customer-spec aware work orders, machine schedule, OEE tracking, downtime analytics." },
    { name: "Finance & GST", slug: "finance", why: "E-invoice with IRN, e-way bill, RCM on transport, multi-GSTIN ledgers, real-time costing." },
    { name: "Sales Management", slug: "sales", why: "Quotation with grade/GSM/BF/width grid, dispatch control tower, multi-lorry assignment." },
    { name: "Inventory Management", slug: "inventory", why: "Reel-level traceability, batch allocation per customer, waste paper input tracking." },
    { name: "Procurement", slug: "procurement", why: "Waste paper grading and pricing per supplier, chemical procurement with three-way match." },
    { name: "Broke Management", slug: "broke-management", why: "Capture broke at every stage, route to repulper, track recovery against targets." },
  ],
  faqs: [
    {
      q: "Does Papyrus BPApp handle multi-ply kraft (top + back liner) production?",
      a: "Yes. Multi-ply BOMs are supported with per-layer furnish, GSM, and quality specs. The Deckle Optimizer accounts for the combined deckle width and per-layer constraints. Quality plans test the finished sheet plus per-layer samples if your QC process requires it.",
    },
    {
      q: "How does it handle waste paper price changes that happen weekly?",
      a: "Price lists for waste paper grades (OCC, mixed, IK, white) are versioned with effective dates. Costing always uses the price valid on the date of consumption. You can see margin impact of price changes per customer, per grade, in real time. The system also auto-recalculates standard costs monthly if you use standard costing.",
    },
    {
      q: "We do job-work for some customers (they send their own waste paper). Can the system handle that?",
      a: "Yes. The Engineering Change Management and Inventory modules support principal-owned material. Job-work challans (DC/JC), material in-out reconciliation, and GST job-work workflow are built in. You can run own-stock and job-work side by side on the same machine.",
    },
    {
      q: "What about corrugator customers who place orders by lorry-load, not by tons?",
      a: "Sales orders support both ton-based and lorry-load (by reel count or by deckle pattern) ordering. The deckle plan respects customer-specific reel widths automatically. Dispatch generates the right invoice quantity in tons even if the order was placed in reels.",
    },
    {
      q: "Can we manage multiple kraft mills (2–5 plants) on one platform?",
      a: "Yes. Multi-plant is native. Each mill has its own machines, plans, GSTIN, and operations team — with a consolidated head-office view of total dispatches, receivables, and profitability. Inter-plant transfers (semi-finished reels, chemicals) are handled with proper tax/cost implications.",
    },
    {
      q: "Implementation timeline for a typical 50 TPD kraft mill?",
      a: "4–8 weeks from kickoff to full go-live. Week 1: setup, masters import, user training. Week 2–3: production + deckle + quality go live. Week 4–5: sales + dispatch + invoicing. Week 6–8: finance + payroll + reports. We've completed deployments in as little as 3 weeks for mills ready with clean masters.",
    },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
