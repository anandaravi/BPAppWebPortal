import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";


const OG = ogImage({
  title: "ERP for Integrated Paper Mills",
  subtitle: "Pulping + papermaking + converting on one campus",
  tag: "By Mill Type",
  accent: "#10B981",
});
export const metadata: Metadata = {
  title: "ERP for Integrated Pulp & Paper Mills | Papyrus BPApp",
  description:
    "Integrated pulp and paper mill ERP for India: pulp mill, recovery boiler, paper machine, finishing — all on one platform. Multi-stage costing, chemical balance, effluent monitoring, GST compliance.",
  alternates: { canonical: "/for/integrated-mill" },
  keywords: [
    "integrated paper mill ERP",
    "pulp and paper mill software",
    "wood yard management",
    "recovery boiler tracking",
    "multi-stage costing paper",
    "kraft pulp mill ERP India",
  ],
  openGraph: {
    title: "ERP for Integrated Pulp & Paper Mills (India)",
    description: "Wood yard to finished reel. One platform. Built for India's largest paper companies.",
    url: "/for/integrated-mill",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: MillTypePageData = {
  millType: "Integrated Pulp & Paper Mills",
  slug: "integrated-mill",
  hook: "From wood yard to finished reel — one platform for India's most complex mills.",
  intro:
    "Integrated pulp and paper mills are among the most operationally complex manufacturing facilities in India: wood yard chip preparation, pulping, recovery boiler, paper machines, finishing, all on a single campus. Each stage produces semi-finished material consumed by the next, with chemical balance, energy flows, and effluent monitoring overlaying everything. Papyrus BPApp unifies all of it — multi-stage costing, inventory across stages, quality at each interface, and end-to-end compliance.",
  pains: [
    {
      title: "Multi-stage costing across pulping → paper → finishing",
      desc: "Cost of finished paper depends on pulp grade, chemicals, energy, and waste paper proportions. Manual cost rollup is reactive (last month's data); pricing decisions today are guesses.",
    },
    {
      title: "Chemical balance: green liquor, white liquor, black liquor",
      desc: "Recovery boiler operation depends on accurate chemical balance and salt content. Off-spec digesters cascade quality issues. Tracking this in plant control + Excel doesn't give finance + procurement visibility.",
    },
    {
      title: "Wood yard inventory and chip yard quality",
      desc: "Hardwood vs softwood chip ratio, debarking efficiency, chip thickness, moisture — all impact pulp quality. Without integrated tracking, deviations are invisible until paper machine quality drops.",
    },
    {
      title: "Multi-machine, multi-grade scheduling",
      desc: "PM1 making writing paper, PM2 making board, PM3 making tissue — each with its own deckle, schedule, and chemical recipes. Pulp allocation across PMs is a daily juggle.",
    },
    {
      title: "Effluent (ETP) and emission monitoring for compliance",
      desc: "MoEF, CPCB, and state PCB compliance requires continuous monitoring with reports. Manual logs are audit nightmares; CEMS/CAAQMS data must integrate with operations.",
    },
    {
      title: "Energy and steam: cogen, boiler efficiency, recovery",
      desc: "Steam generation cost, power purchase/sale balance, captive cogen vs grid economics — without integrated tracking, optimization is reactive at best.",
    },
  ],
  solutions: [
    {
      title: "Multi-stage costing with full BOM rollup",
      desc: "Each stage (wood yard, pulping, paper, finishing) produces semi-finished material with full BOM, labour, energy, and chemical consumption. Finished paper cost rolls up automatically including allocated overheads. Live margin per grade, per customer, today — not next month.",
      module: "finance",
    },
    {
      title: "Chemical balance and recovery boiler tracking",
      desc: "Green liquor, white liquor, black liquor, salt cake — all tracked as inventory across recovery loop. Daily mass balance reports, deviation alerts. Recipe Development module ties chemical changes to quality outcomes.",
      module: "recipe-development",
    },
    {
      title: "Wood yard + chip yard inventory and quality",
      desc: "Wood receipts by species, lot, supplier. Debarking and chipping yields tracked. Chip thickness and moisture tested per shift. Quality feedback loops to wood yard for supplier scorecards.",
      module: "inventory",
    },
    {
      title: "Multi-PM master schedule with pulp allocation",
      desc: "MPS spans all paper machines simultaneously. Pulp grade demand calculated from PM schedules. Stock prep planning balances pulping capacity against PM consumption. Deckle Optimizer runs per machine but aware of plant-wide constraints.",
      module: "production",
    },
    {
      title: "Effluent + emission monitoring with audit reports",
      desc: "IoT integration with ETP and CEMS sensors. Real-time dashboards. Daily/monthly compliance reports auto-generated for MoEF/CPCB/PCB. Audit trail of every reading, every action.",
      module: "sustainability",
    },
    {
      title: "Energy management: steam, power, fuel",
      desc: "Steam generation, distribution to PMs, boiler efficiency tracking. Power import/export and cogen economics. Fuel (coal, biomass, FO) consumption per ton paper. Sustainability module ties this to ESG reporting.",
      module: "sustainability",
    },
  ],
  caseSnapshot: {
    headline: "Integrated mill cost transparency (Tamil Nadu, 200 TPD)",
    metric: "Cost-per-ton visible in 30 mins",
    desc: "Previously, the cost of a ton of paper was known 25 days into the next month after manual rollups across pulping, paper, finishing. With Papyrus BPApp's real-time multi-stage costing, COGS by grade and machine is visible on the management dashboard at end of shift — enabling same-day pricing and product mix decisions.",
  },
  relevantModules: [
    { name: "Production Planning", slug: "production", why: "Multi-PM MPS, pulp allocation, deckle per machine, OEE across stages." },
    { name: "Recipe Development", slug: "recipe-development", why: "Pulp furnish recipes, chemical dosing, trial management, customer approval workflow." },
    { name: "Stock Preparation", slug: "stock-preparation", why: "Pulp chest management, consistency control, chemical dosing balance." },
    { name: "Quality Management", slug: "quality", why: "Inline tests at every stage, LIMS, multi-stage SPC, NCR/CAPA across plant." },
    { name: "Finance & GST", slug: "finance", why: "Multi-stage costing, cost center per area, energy allocation, GST + FEMA + trade finance." },
    { name: "Inventory Management", slug: "inventory", why: "Wood yard, chip yard, pulp, paper, finished goods — all tracked as separate yet linked stages." },
    { name: "Sustainability & ESG", slug: "sustainability", why: "Effluent, emissions, water, waste, energy — full ESG reporting with regulator-ready exports." },
    { name: "Digital Twin", slug: "digital-twin", why: "3D visualization of entire mill, scenario simulation for capacity expansion or new grades." },
    { name: "IoT Devices", slug: "iot-devices", why: "ETP, CEMS, CAAQMS, paper machine PLCs, weighbridge integration." },
    { name: "Maintenance", slug: "maintenance", why: "TPM and predictive maintenance across recovery boiler, pulping, PMs, finishing." },
  ],
  faqs: [
    {
      q: "Our recovery boiler chemistry is unique. Can the system handle custom chemical balance equations?",
      a: "Yes. The Recipe Development and Recipe management modules support custom mass balance equations with multiple inputs and outputs. Configurable per pulping process (kraft, soda, semi-chemical). Daily reports show actual vs expected with deviation analysis.",
    },
    {
      q: "We have 3 paper machines, 2 pulp mills, and a wood yard spread across a 500-acre campus. Multi-location?",
      a: "Yes. Multi-location native. Each operating area (wood yard, pulp mill 1, pulp mill 2, PM1, PM2, PM3, finishing, warehouse) is a separate location with its own staff, processes, and KPIs — under one company. Inter-location movements (chips, pulp, semi-finished paper) flow as internal transfers with full traceability and cost implication.",
    },
    {
      q: "Energy is a huge cost (30% of paper cost). How does the system help optimize it?",
      a: "The Sustainability module tracks steam generation, distribution, condensate return, power import/export, fuel consumption (coal, biomass, lignite, FO, gas) — all per area and per ton output. AI-driven anomaly detection flags efficiency drops (e.g., boiler efficiency falling 2% over a week). Energy cost is allocated to each ton of paper for true cost transparency.",
    },
    {
      q: "We export 30% of our output. Does the system handle exports and FEMA compliance?",
      a: "Yes. The Finance module includes FEMA-compliant forex handling, GST refund on exports (LUT or with payment), shipping bill generation, ICEGATE integration, ECGC tracking, packing credit, post-shipment finance, and SOFTEX/FEMA reporting. Used by integrated mills exporting to Middle East, Africa, Southeast Asia.",
    },
    {
      q: "Our IT team is small. Can we manage this complex an ERP?",
      a: "Papyrus BPApp is cloud-native and fully managed — no servers, no databases for your IT to maintain. The platform is updated and operated by us. Your IT team focuses on integrations (machine PLCs, ETP sensors, weighbridges) and user enablement — typically a team of 3–5 is sufficient even for 200+ TPD integrated mills.",
    },
    {
      q: "Implementation timeline for a 200 TPD integrated mill?",
      a: "Typically 10–16 weeks for full integrated deployment. Phase 1 (weeks 1–4): Finance + Sales + GST go live. Phase 2 (weeks 5–8): Production + Quality + Deckle for one PM. Phase 3 (weeks 9–12): All PMs + Pulping + Wood Yard. Phase 4 (weeks 13–16): IoT integration + Sustainability + AI. Each phase delivers measurable value so ROI starts in month 2, not month 12.",
    },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
