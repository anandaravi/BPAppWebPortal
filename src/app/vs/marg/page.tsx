import type { Metadata } from "next";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";

export const metadata: Metadata = {
  title: "Papyrus BPApp vs Marg ERP | Paper Mill ERP Alternative",
  description:
    "Marg ERP is popular Indian SMB software for trading and distribution. Papyrus BPApp is full manufacturing ERP for paper mills with deckle, production, quality, AI.",
  alternates: { canonical: "/vs/marg" },
  keywords: [
    "Marg alternative paper mill",
    "Marg ERP vs Papyrus",
    "Indian manufacturing ERP",
    "upgrade from Marg",
    "paper mill ERP India",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Marg ERP",
    description: "Marg is distribution. Papyrus BPApp is full paper manufacturing.",
    url: "/vs/marg",
  },
};

const data: ComparisonPageData = {
  competitor: "Marg",
  competitorFull: "Marg ERP / Marg Inventory",
  competitorTagline: "Popular Indian SMB ERP — strong in trading/distribution",
  slug: "marg",
  intro:
    "Marg ERP is widely used in Indian trading, pharma distribution, FMCG distribution, and small manufacturing. Cost-effective, GST-ready, with strong inventory features. But for a paper mill that needs production planning, deckle optimization, OEE tracking, and shop floor execution — Marg leaves significant gaps. Papyrus BPApp is the manufacturing-grade alternative purpose-built for paper.",
  positioningPapyrus:
    "Manufacturing-grade ERP for Indian paper mills. Covers Marg's strengths (GST, inventory, basic accounting) plus all the manufacturing capability Marg lacks: production planning, deckle, quality, OEE, maintenance, payroll at mill scale, AI.",
  positioningCompetitor:
    "Marg ERP is among India's most popular SMB ERPs, especially in pharma and FMCG distribution. Strengths: low cost, simple UI, fast deployment, decent GST support. Weaknesses: limited manufacturing depth, no production planning, no shop floor, no OEE, no quality management, basic payroll. Built for distribution-first businesses.",
  rows: [
    { feature: "Indian GST + e-invoice + e-way bill", papyrus: true, competitor: true },
    { feature: "Inventory management", papyrus: true, competitor: true },
    { feature: "Basic accounting + finance", papyrus: true, competitor: true },
    { feature: "Production planning (MPS/MRP/CRP)", papyrus: true, competitor: false },
    { feature: "Deckle optimization", papyrus: true, competitor: false },
    { feature: "Shop floor execution + OEE", papyrus: true, competitor: false },
    { feature: "Quality management (LIMS, COA, NCR/CAPA)", papyrus: true, competitor: false },
    { feature: "Maintenance management (PM, predictive)", papyrus: true, competitor: false },
    { feature: "Payroll at mill scale (100+ employees, multi-shift)", papyrus: true, competitor: "partial" },
    { feature: "Multi-plant operations", papyrus: true, competitor: "partial" },
    { feature: "AI engine, IoT, mobile-first", papyrus: true, competitor: false },
    { feature: "Cloud-native multi-tenant", papyrus: true, competitor: "partial" },
    { feature: "Annual cost (small mill)", papyrus: "₹15–25 lakh", competitor: "₹1–3 lakh" },
  ],
  whenChooseCompetitor: [
    "Small paper trader or distributor (no manufacturing) with simple accounting + GST needs.",
    "Pure trading or converting unit with no production planning complexity.",
    "Very tight budget (<₹3 lakh/year) with no immediate plan to digitize manufacturing operations.",
    "Existing Marg deployment with strong CA familiarity and acceptable functional fit.",
  ],
  whenChoosePapyrus: [
    "Any growing paper mill where production complexity is the bottleneck — Marg can't help here.",
    "Mills wanting deckle optimization to recover ₹1–3 crore/year in trim waste.",
    "Need shop floor visibility, OEE, downtime tracking, quality management — none in Marg.",
    "Multi-shift payroll for 50+ employees with PF/ESI/PT/LWF — Marg's payroll is too basic.",
    "Want one platform from order to e-invoice instead of Marg + 3 other tools.",
    "Plan to scale to multi-plant operations within 2–3 years.",
  ],
  migration:
    "Migrating from Marg to Papyrus BPApp typically takes 4–8 weeks. We import masters (items, customers, vendors, opening balances) via Marg's standard export formats. Most customers keep Marg as a read-only archive while running new transactions on Papyrus BPApp. Many start by adding Papyrus BPApp for production/deckle while keeping Marg for accounting during transition.",
  faqs: [
    {
      q: "Is Papyrus BPApp's accounting auditor-friendly like Marg?",
      a: "Yes. Full GL, AP/AR, journal entries, trial balance, P&L, balance sheet, GSTR-1/3B/9, e-invoice — all with auditor-style transaction listings and audit trails. We've reviewed with practicing CAs to ensure familiar workflows.",
    },
    {
      q: "Can we run Papyrus BPApp alongside Marg during transition?",
      a: "Yes — common configuration. Many mills run Papyrus BPApp for production, deckle, quality, and HR while keeping Marg for accounting for 6-12 months. API integration syncs invoice summaries. Most eventually migrate accounting too once team is comfortable.",
    },
    {
      q: "Why is Papyrus BPApp 10× more expensive than Marg?",
      a: "Because Papyrus BPApp does 10× more — it's a full manufacturing ERP with production planning, deckle optimization, quality, maintenance, AI, IoT, multi-plant support. Marg covers ~10% of what a paper mill needs (accounting + GST + basic inventory). The right comparison is 'Marg + Excel + manual deckle + manual quality' vs 'Papyrus BPApp end-to-end'. On total cost and risk basis, Papyrus BPApp typically wins.",
    },
    {
      q: "What about Marg's regional language support?",
      a: "Papyrus BPApp supports English, Hindi, and Tamil. Additional Indian languages can be added on request. Marg has wider Indian language support inherited from its distribution focus.",
    },
    {
      q: "Will my Marg-trained team adapt to Papyrus BPApp easily?",
      a: "Yes. Modern UI is intuitive for users coming from any Indian ERP background. We provide 5-day intensive training + ongoing support. Most users are productive within a week.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
