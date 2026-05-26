import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";


const OG = ogImage({
  title: "ERP for Recycled Paper Mills",
  subtitle: "Waste-paper procurement, grade-wise pricing, RCM transport",
  tag: "By Mill Type",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "ERP for Recycled Paper Mills | Papyrus BPApp",
  description:
    "Recycled paper mill ERP for India: waste paper grade-wise costing, OCC/ONP/mixed input tracking, supplier scorecards, deckle and GST compliance.",
  alternates: { canonical: "/for/recycled-mill" },
  keywords: [
    "recycled paper mill ERP",
    "waste paper recycling software India",
    "OCC ONP procurement",
    "recycled kraft mill",
    "circular economy paper mill",
  ],
  openGraph: {
    title: "ERP for Indian Recycled Paper Mills",
    description: "Waste paper costing + recycled fibre quality + deckle for recycled mills.",
    url: "/for/recycled-mill",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: MillTypePageData = {
  millType: "Recycled Paper Mills",
  slug: "recycled-mill",
  hook: "Recycled paper mill ERP — waste paper to finished reel, with cost discipline.",
  intro:
    "Recycled paper mills depend entirely on waste paper procurement — and waste paper prices swing ±30% per quarter. Every percentage point of yield matters; every grade of fibre matters; every supplier matters. Papyrus BPApp gives recycled mills the cost transparency and procurement discipline to thrive in this volatile segment.",
  pains: [
    { title: "Waste paper grade variability hits quality", desc: "OCC, ONP, OMG, mixed, IK, white — each grade has different yield, brightness, BF impact. Without batch-level tracking, quality variability surprises you days later at the QC bench." },
    { title: "Price volatility kills costing accuracy", desc: "Waste paper prices change weekly. Last month's standard cost is meaningless this month. Without real-time costing, pricing decisions are guesses." },
    { title: "Supplier reliability varies wildly", desc: "Some suppliers consistently deliver clean OCC; others sneak in moisture, plastics, foreign matter. Without supplier scorecards, you keep paying for poor quality." },
    { title: "Yield losses hidden in process", desc: "Repulping yields vary by fibre source. 5% yield difference = ₹50 lakh+/year on a 50 TPD mill. Most mills don't track yield by source." },
    { title: "Dust, sludge, contaminants management", desc: "Recycled mills generate sludge, plastics, sticky residues. ETP load is high. Without tracking, compliance and operating cost spiral." },
    { title: "RCM on transport + scrap GST + MSME compliance", desc: "Waste paper logistics involve many small vendors. RCM, GST on scrap, MSME 45-day compliance — overhead-heavy without automation." },
  ],
  solutions: [
    { title: "Waste paper grade master with real-time pricing", desc: "Each waste paper grade (OCC, ONP, OMG, white, mixed) tracked separately. Price versioned with effective dates. Costing always reflects price valid on consumption date.", module: "procurement" },
    { title: "Supplier scorecards with grade-quality tracking", desc: "Each supplier scored on grade purity, moisture, contamination, payment terms. Auto-blocked when scorecard falls. Best suppliers prioritized in procurement.", module: "party" },
    { title: "Per-batch yield tracking", desc: "Repulping yield calculated per waste paper batch. Source-to-yield analytics surface which suppliers/grades give best fibre recovery.", module: "production" },
    { title: "Real-time costing with fibre source attribution", desc: "Finished paper cost rolls up actual furnish, chemicals, energy. Cost per ton visible at shift end, not month-end. Margin by customer/grade in real time.", module: "finance" },
    { title: "Sludge, plastics, broke tracking", desc: "Waste outputs (sludge, plastics, contaminants) tracked as inventory. ETP load monitored. Sustainability KPIs reported.", module: "sustainability" },
    { title: "RCM + scrap GST + MSME automation", desc: "Auto self-invoices for GTA, scrap GST collection, MSME 45-day flagging. Compliance burden minimized.", module: "finance" },
  ],
  caseSnapshot: {
    headline: "Yield improvement at a 40 TPD recycled kraft mill (Punjab)",
    metric: "+3.8% yield in 6 months",
    desc: "Batch-level yield tracking revealed that one supplier's 'OCC' was actually mixed-quality, dragging average yield down. Switching to better-scored suppliers (visible only after data) added 3.8% yield = ₹62 lakh/year on 40 TPD operation.",
  },
  relevantModules: [
    { name: "Procurement", slug: "procurement", why: "Waste paper grade-wise procurement, price versioning, MSME compliance, RCM." },
    { name: "Party Management", slug: "party", why: "Supplier scorecards, quality tracking, payment terms, MSME registration tracking." },
    { name: "Production Planning", slug: "production", why: "Per-batch yield, source-to-output traceability, broke and sludge tracking." },
    { name: "Finance & GST", slug: "finance", why: "Real-time costing, RCM, scrap GST, multi-customer profitability." },
    { name: "Quality Management", slug: "quality", why: "Recycled fibre quality, brightness, contamination tests, customer specs." },
    { name: "Sustainability & ESG", slug: "sustainability", why: "Recycled content reporting, water + ETP, sludge management, ESG dashboards." },
    { name: "Inventory Management", slug: "inventory", why: "Waste paper godown, grade-wise stocks, FIFO consumption, broke storage." },
    { name: "Sales Management", slug: "sales", why: "Customer specs, dispatch optimization, e-invoice, payment tracking." },
  ],
  faqs: [
    { q: "How does the system handle waste paper price changes weekly?", a: "Price lists versioned per grade with effective dates. Costing uses price valid on consumption date. You can see margin impact of price changes per customer in real time." },
    { q: "Supplier scorecards — how detailed?", a: "Scorecards track grade purity %, moisture %, contamination %, on-time delivery %, payment term compliance. Composite score determines preferred suppliers in procurement. Auto-block triggers configurable per threshold." },
    { q: "Sludge and ETP management?", a: "Sludge generation tracked as inventory by source. ETP load (BOD, COD, TSS) integrated via IoT sensors. CPCB-ready reports auto-generated monthly." },
    { q: "Multi-grade output mills (kraft + duplex + newsprint)?", a: "Yes. Production module handles grade changes on same machine with transition reel handling and per-grade quality plans." },
    { q: "Implementation for a 30 TPD recycled kraft mill?", a: "4–8 weeks. Procurement + production + costing in Phase 1. Quality + sustainability + ETP integration in Phase 2." },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
