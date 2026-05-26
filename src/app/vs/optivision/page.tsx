import type { Metadata } from "next";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";

export const metadata: Metadata = {
  title: "Papyrus BPApp vs Honeywell Optivision | Paper Mill MES Alternative",
  description:
    "Honeywell Optivision is enterprise paper MES. Papyrus BPApp delivers MES, ERP, deckle optimization, GST compliance, and AI in one cloud platform for Indian paper mills.",
  alternates: { canonical: "/vs/optivision" },
  keywords: [
    "Optivision alternative",
    "Honeywell Optivision alternative",
    "paper mill MES Honeywell",
    "Honeywell Forge paper alternative",
    "Optivision vs Papyrus BPApp",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Honeywell Optivision",
    description: "Optivision is enterprise MES. Papyrus BPApp is integrated MES + ERP + GST for Indian mills.",
    url: "/vs/optivision",
  },
};

const data: ComparisonPageData = {
  competitor: "Optivision",
  competitorFull: "Honeywell Optivision",
  competitorTagline: "Enterprise paper mill MES (Honeywell)",
  slug: "optivision",
  intro:
    "Honeywell Optivision is one of the most widely deployed paper mill MES suites globally, with deep capabilities in production scheduling, reel tracking, and quality data acquisition. It's typically chosen by large multinational paper companies. Papyrus BPApp offers the MES depth Optivision is known for — combined with full ERP, GST compliance, and AI — in a cloud-native platform priced for Indian mills.",
  positioningPapyrus:
    "Cloud-native ERP + MES + AI for Indian paper mills. 44 integrated modules covering everything from order intake to e-invoice, with paper-specific deckle optimization and shop floor execution. Modular activation, INR pricing.",
  positioningCompetitor:
    "Honeywell Optivision is an enterprise MES suite (part of Honeywell Forge) covering production planning, reel tracking, quality data, and shop floor execution. Excellent depth for large mills, typically deployed alongside Honeywell's automation (DCS, PLCs). Integration with separate ERP (SAP, Oracle) required. Pricing aligned to enterprise customers.",
  rows: [
    { feature: "Production planning + scheduling", papyrus: true, competitor: true },
    { feature: "Reel tracking + genealogy", papyrus: true, competitor: true },
    { feature: "Quality data acquisition + SPC", papyrus: true, competitor: true },
    { feature: "Shop floor execution", papyrus: true, competitor: true },
    { feature: "Full ERP (sales, finance, HR, etc.)", papyrus: true, competitor: false },
    { feature: "Deckle optimization (3-tier)", papyrus: true, competitor: "partial" },
    { feature: "Indian GST + e-invoice", papyrus: true, competitor: false },
    { feature: "Indian payroll (PF/ESI/PT/LWF)", papyrus: true, competitor: false },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: "partial" },
    { feature: "AI/ML for predictive maintenance", papyrus: true, competitor: true, note: "Honeywell Forge has AI; integration complexity varies" },
    { feature: "Mobile app for shop floor", papyrus: true, competitor: "partial" },
    { feature: "Integration with non-Honeywell automation", papyrus: true, competitor: "partial", note: "Optivision best with Honeywell DCS/PLC" },
    { feature: "Implementation timeline (full mill)", papyrus: "4–16 weeks", competitor: "12–24 months", note: "Including ERP integration" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹2–5 crore" },
    { feature: "India-based support", papyrus: true, competitor: "partial" },
  ],
  whenChooseCompetitor: [
    "Large multinational paper company already invested in Honeywell automation (Experion, ProcessLogix) where Optivision integrates natively with DCS/PLCs.",
    "Strict requirement for tier-1 enterprise vendor with global track record across hundreds of paper mills.",
    "Need for deep Honeywell Forge AI capabilities tied to existing Honeywell process control platform.",
    "Sufficient budget and IT capacity for 12–24 month implementation + Honeywell partner engagement.",
  ],
  whenChoosePapyrus: [
    "Indian paper mills (small, mid, large) needing MES + ERP without enterprise-scale budget and timeline.",
    "Mills not standardized on Honeywell automation — Papyrus BPApp integrates with any automation vendor (ABB, Siemens, Rockwell, Yokogawa, local PLCs).",
    "Cloud-first IT strategy with no on-prem servers.",
    "Mills currently on Tally + Excel + manual — Papyrus BPApp digitizes everything in one rollout, not 24-month phases.",
    "Need GST, FEMA, PF, ESI out of the box without enterprise customization projects.",
    "Modular activation: start with Deckle + Quality, add more as you grow.",
  ],
  migration:
    "Mills replacing Optivision typically migrate in phases over 8–16 weeks. We preserve historical reel-level genealogy, quality data, and production records. Integrations with existing automation (Honeywell or otherwise) are reconfigured to feed Papyrus BPApp's IoT module via standard protocols (OPC UA, MQTT, Modbus). Most customers complete the migration with continuous operations and no downtime.",
  faqs: [
    {
      q: "Is Papyrus BPApp's MES depth comparable to Optivision?",
      a: "For the operational scope most Indian mills need — reel tracking, OEE, downtime, quality data, shift handover, production scheduling — yes. Optivision has deeper extensions for very large multi-PM mills with complex Honeywell DCS integrations. For 95%+ of Indian paper mills, Papyrus BPApp is equivalent or better in capability and dramatically better in cost/time-to-value.",
    },
    {
      q: "Does Papyrus BPApp work with our existing Honeywell PLCs/DCS?",
      a: "Yes. The IoT Devices module integrates with Honeywell Experion, ProcessLogix, and most modern PLCs via OPC UA, OPC DA, Modbus TCP, and MQTT. We've integrated with ABB AC800M, Siemens S7, Rockwell ControlLogix, Yokogawa CENTUM, and Honeywell — among others. No vendor lock-in.",
    },
    {
      q: "Honeywell Forge bundles AI/IoT. Can Papyrus BPApp match that?",
      a: "Papyrus BPApp includes AI (predictive maintenance, anomaly detection, conversational interface), IoT (device management, telemetry ingestion), and Digital Twin modules natively. Architecture difference: Honeywell Forge is tightly coupled to Honeywell automation; Papyrus BPApp is automation-agnostic.",
    },
    {
      q: "What about scalability for a 500+ TPD multi-PM integrated mill?",
      a: "Papyrus BPApp's multi-tenant, horizontally scalable architecture handles large integrated mills. PostgreSQL + Redis + BullMQ + event-driven processing scales to ingestion rates well above typical paper mill PLC event volume. We've benchmarked at 1000+ events/sec per machine in synthetic tests.",
    },
    {
      q: "TCO comparison: Optivision + SAP vs Papyrus BPApp?",
      a: "Optivision + SAP S/4HANA Mill Products for a 100 TPD mill typically runs ₹5–10 crore implementation + ₹1–2 crore/year ongoing. Papyrus BPApp full platform: ₹30–80 lakh implementation, annual subscription ₹4–12 lakh for small mills · ₹12–30 lakh for mid mills · ₹25–60 lakh for large/integrated mills (100 TPD typical). 70–85% TCO reduction for equivalent operational scope.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
