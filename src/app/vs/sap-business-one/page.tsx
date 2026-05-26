import type { Metadata } from "next";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";

export const metadata: Metadata = {
  title: "Papyrus BPApp vs SAP Business One | Paper Mill ERP Alternative",
  description:
    "SAP Business One is SMB ERP from SAP. Papyrus BPApp is purpose-built for Indian paper mills with deckle optimization, native GST, and lower TCO.",
  alternates: { canonical: "/vs/sap-business-one" },
  keywords: [
    "SAP Business One alternative",
    "SAP B1 paper mill alternative",
    "SAP B1 vs Papyrus",
    "SMB paper mill ERP India",
  ],
  openGraph: {
    title: "Papyrus BPApp vs SAP Business One",
    description: "SAP B1 is generic SMB ERP. Papyrus BPApp is paper-first, India-native.",
    url: "/vs/sap-business-one",
  },
};

const data: ComparisonPageData = {
  competitor: "SAP B1",
  competitorFull: "SAP Business One",
  competitorTagline: "SAP's SMB ERP suite",
  slug: "sap-business-one",
  intro:
    "SAP Business One (B1) is SAP's offering for small and medium enterprises — including manufacturing companies. Many Indian paper mills sized between Tally and S/4HANA end up evaluating SAP B1. The trade-off: SAP brand strength + integration with parent's SAP ecosystem, but generic across industries with paper-specific features requiring partner add-ons or customization.",
  positioningPapyrus:
    "Paper-first, India-first cloud ERP. 44 modules with native deckle, GST, payroll. Modular activation, INR pricing, 4–12 week go-live.",
  positioningCompetitor:
    "SAP Business One is a generic SMB ERP suite covering finance, sales, inventory, basic manufacturing. Strong in financial controls and SAP HANA integration. Paper-specific workflows (deckle, broke, BF/BS, parent reel genealogy) require third-party add-ons or partner customization. Indian compliance via SAP B1 India localization + customization.",
  rows: [
    { feature: "Built for paper industry", papyrus: true, competitor: false },
    { feature: "Native deckle optimization", papyrus: true, competitor: false, note: "B1 needs Greycon/Optitex add-on" },
    { feature: "Out-of-box Indian GST + e-invoice", papyrus: true, competitor: "partial", note: "B1 India localization + partner work" },
    { feature: "Native Indian payroll (PF/ESI/PT/LWF)", papyrus: true, competitor: false, note: "Most B1 deployments use separate payroll" },
    { feature: "Multi-ply BOM / paper grade master", papyrus: true, competitor: "partial" },
    { feature: "Shop floor execution + OEE", papyrus: true, competitor: "partial" },
    { feature: "Quality (LIMS, NCR/CAPA, SPC)", papyrus: true, competitor: "partial" },
    { feature: "AI engine built-in", papyrus: true, competitor: "partial" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: false },
    { feature: "Mobile-first design", papyrus: true, competitor: "partial" },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: "partial", note: "B1 Cloud exists; primarily on-prem in India" },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "4–9 months" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹50 lakh – 1.5 crore" },
  ],
  whenChooseCompetitor: [
    "Indian subsidiary of multinational where parent uses SAP — easier consolidation through SAP B1.",
    "Strong finance team familiar with SAP that values brand reliability.",
    "Diversified manufacturing where paper is one of several lines.",
    "Existing SAP partner relationship at favorable rates.",
  ],
  whenChoosePapyrus: [
    "Pure-play paper mill where paper-specific capability matters more than SAP brand.",
    "Cost-sensitive: 60–75% lower TCO with paper-specific depth.",
    "Mills wanting deckle optimization without partner add-on integration.",
    "India compliance (GST, FEMA, PF, ESI) as default, not as customization.",
    "Faster ROI: 4–12 weeks to value vs 4–9 months for B1 with paper customization.",
    "Modern cloud-native UX, mobile-first, no on-prem servers.",
  ],
  migration: "Migrating from SAP B1 to Papyrus BPApp is straightforward — masters export from B1 via DI-API, mapped to Papyrus BPApp schema. Phased rollout (6–12 weeks). Customers often start with production/deckle/quality while keeping B1 for finance during transition.",
  faqs: [
    { q: "Is Papyrus BPApp's manufacturing depth comparable to SAP B1 with paper add-ons?", a: "Yes — usually deeper. B1 manufacturing is generic; paper-specific add-ons (Greycon, niche ISVs) bolt onto B1 with integration overhead. Papyrus BPApp has paper-specific workflows natively." },
    { q: "Does it integrate with SAP S/4HANA at parent company?", a: "Yes via REST APIs. Consolidation data (GL summaries, AR/AP, BOM costs) can push to parent S/4HANA as needed." },
    { q: "TCO for 50 TPD mill?", a: "SAP B1: implementation ₹30–60 lakh, annual licenses ₹15–30 lakh, partner support + customization ₹10–20 lakh/year. Total Y1: ₹55 lakh – 1.1 crore. Papyrus BPApp: ₹15–40 lakh Y1 total — software subscription ₹4–12 lakh for small mills · ₹12–30 lakh for mid mills (50 TPD typical) · ₹30 lakh+ for large/integrated. Typical 60–70% reduction." },
    { q: "Will my CA accept Papyrus BPApp finance for audit?", a: "Yes. Auditor-friendly chart of accounts, trial balance, GSTR-1/3B/9, e-invoice, audit trail — designed with practicing CAs." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
