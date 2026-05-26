import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs Dataman",
  subtitle: "European paper mill execution specialist",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs Dataman | Paper Mill MES + ERP Alternative",
  description:
    "Dataman is a paper mill MES specialist. Papyrus BPApp delivers MES capabilities plus full ERP, GST compliance, deckle optimization, and India-native features in one cloud platform.",
  alternates: { canonical: "/vs/dataman" },
  keywords: [
    "Dataman alternative",
    "Dataman paper mill alternative",
    "paper mill MES India",
    "Dataman vs Papyrus BPApp",
    "paper mill execution system",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Dataman — Integrated MES + ERP",
    description: "Dataman is MES. Papyrus BPApp is MES + full ERP + Indian compliance, in one platform.",
    url: "/vs/dataman",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "Dataman",
  competitorFull: "Dataman (paper mill MES)",
  competitorTagline: "European paper mill execution specialist",
  slug: "dataman",
  intro:
    "Dataman is a respected European paper mill MES (Manufacturing Execution System) specialist focused on shop floor execution, reel tracking, and production reporting. Papyrus BPApp delivers the same MES depth — plus the entire ERP layer above it (sales, finance, GST, HR, AI), eliminating the need to integrate MES + ERP from two different vendors.",
  positioningPapyrus:
    "Cloud-native ERP + MES + AI in one platform. 44 integrated modules covering deckle, production, sales, GST-native finance, HR/payroll, quality, maintenance, IoT. India-first design with multi-currency, multi-country support.",
  positioningCompetitor:
    "Dataman is a focused MES specialist with deep paper mill expertise. Strong at shop floor data acquisition, reel tracking, and OEE. Typically deployed on-premises with custom integration to SAP/Oracle/IBM for the ERP layer. India presence via partners.",
  rows: [
    { feature: "Shop floor MES (reel tracking, OEE, downtime)", papyrus: true, competitor: true },
    { feature: "Integrated full ERP (sales → finance → HR)", papyrus: true, competitor: false, note: "Dataman is MES only" },
    { feature: "Deckle optimization (3-tier)", papyrus: true, competitor: false },
    { feature: "Native GST compliance", papyrus: true, competitor: false },
    { feature: "Indian payroll (PF, ESI, PT, LWF)", papyrus: true, competitor: false },
    { feature: "Cloud-native SaaS", papyrus: true, competitor: false, note: "Dataman primarily on-prem" },
    { feature: "AI engine (predictive maintenance, anomaly)", papyrus: true, competitor: "partial" },
    { feature: "Mobile app for shop floor", papyrus: true, competitor: "partial" },
    { feature: "IoT + Digital Twin built-in", papyrus: true, competitor: "partial" },
    { feature: "Pricing in INR", papyrus: true, competitor: false },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "6–12 months" },
    { feature: "Vendors required for end-to-end coverage", papyrus: "1", competitor: "2-3", note: "Dataman + ERP + GST add-on" },
  ],
  whenChooseCompetitor: [
    "Large multinational paper company already standardized on SAP/Oracle ERP and only needs an MES layer.",
    "Mill that does not need a new ERP and only wants best-of-breed MES with deep European paper industry pedigree.",
    "Strict requirement for on-premises MES with direct PLC integration to legacy automation.",
  ],
  whenChoosePapyrus: [
    "Indian mills needing both MES and full ERP without managing two vendors and an integration project.",
    "Mills currently on Tally/Excel/manual and need to digitize end-to-end in one rollout.",
    "Cost-sensitive: pricing in INR, modular, no FX exposure, no multi-vendor integration cost.",
    "Cloud-first IT strategy — no on-prem servers.",
    "Faster ROI: deckle optimization + e-invoice + payroll come live in 4–12 weeks vs 6–12 months MES-only.",
    "Need GST, FEMA, PF, ESI as default behavior — not as customizations.",
  ],
  migration:
    "Mills running Dataman MES + separate ERP can migrate to Papyrus BPApp in phases. Phase 1 (4 weeks): activate Sales, Procurement, Inventory, Finance — replace ERP layer. Phase 2 (4 weeks): activate Production + Deckle + Quality — migrate from Dataman MES. We import master data and historical reel-level traceability so audit history is preserved.",
  faqs: [
    {
      q: "Does Papyrus BPApp have shop floor depth comparable to Dataman?",
      a: "Yes. The Production module covers reel-level tracking, machine-level OEE (availability × performance × quality), downtime logging with root cause categorization, shift handover, operator productivity. The IoT module integrates PLC and machine signals natively. Real-time dashboards run on the shop floor.",
    },
    {
      q: "Can we use Papyrus BPApp's MES alongside our existing SAP installation?",
      a: "Yes. The Production + Deckle + Quality modules run standalone and integrate to SAP via REST APIs for cost postings, material consumption, and order status. Many customers use this 'best of both' approach during a multi-year ERP transition.",
    },
    {
      q: "How does Papyrus BPApp handle direct PLC/SCADA integration to paper machines?",
      a: "The IoT Devices module supports OPC UA, Modbus TCP, MQTT, and standard industrial protocols. PLC tags feed production counters, downtime reasons, and quality readings in real time. Integration takes 1–3 weeks per machine depending on PLC age and documentation availability.",
    },
    {
      q: "TCO comparison: Dataman + SAP vs Papyrus BPApp?",
      a: "Dataman MES license + SAP S/4HANA + integration middleware typically costs ₹3–8 crore implementation + ₹50–100 lakh/year ongoing. Papyrus BPApp full platform: ₹15–40 lakh implementation, software starts at ₹4–12 lakh/year for small mills and scales to ₹12–30 lakh/year for mid mills covering all 44 modules. Typical 60–75% TCO reduction.",
    },
    {
      q: "What about Dataman's specific paper industry strengths like grade transitions and tail-fed reel tracking?",
      a: "Both are supported in Papyrus BPApp. Grade transitions are modeled in the Production module with transition reel handling. Tail-fed reel genealogy is tracked through the Inventory module with batch lineage from machine reel to slit reels to finished product.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
