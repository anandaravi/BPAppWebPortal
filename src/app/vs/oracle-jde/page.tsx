import type { Metadata } from "next";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";

export const metadata: Metadata = {
  title: "Papyrus BPApp vs Oracle JD Edwards | Paper Mill ERP Alternative",
  description:
    "Oracle JD Edwards EnterpriseOne is a mid-large enterprise ERP. Papyrus BPApp is purpose-built for Indian paper mills with native deckle optimization, GST, and AI.",
  alternates: { canonical: "/vs/oracle-jde" },
  keywords: [
    "Oracle JD Edwards alternative",
    "JDE alternative paper mill",
    "JD Edwards vs Papyrus",
    "Oracle paper industry alternative",
    "JDE EnterpriseOne paper alternative",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Oracle JD Edwards",
    description: "JDE is enterprise generic. Papyrus BPApp is paper-first, India-first.",
    url: "/vs/oracle-jde",
  },
};

const data: ComparisonPageData = {
  competitor: "Oracle JDE",
  competitorFull: "Oracle JD Edwards EnterpriseOne",
  competitorTagline: "Mid-large enterprise ERP",
  slug: "oracle-jde",
  intro:
    "Oracle JD Edwards EnterpriseOne is a respected mid-large enterprise ERP with broad industry coverage including manufacturing. Indian paper mills using JDE typically inherited it from a global parent company or invested heavily in customization. Papyrus BPApp offers a paper-first alternative: built-in deckle optimization, native Indian compliance, modular cloud deployment, and a fraction of the TCO.",
  positioningPapyrus:
    "Paper-first, India-first cloud ERP. 44 modules covering production, deckle, sales, GST, HR, AI, IoT. No multi-year implementation, no customization armies, no enterprise license complexity.",
  positioningCompetitor:
    "JD Edwards EnterpriseOne is Oracle's mid-enterprise ERP suite (acquired from PeopleSoft/J.D. Edwards). Broad industry breadth, deep manufacturing capability with significant customization. Typically deployed by Indian subsidiaries of multinational parents. Cloud (Oracle Cloud) and on-prem options exist. Implementation needs significant Oracle expertise.",
  rows: [
    { feature: "Paper-specific data model (grades, parent reels, deckle)", papyrus: true, competitor: false },
    { feature: "Built-in deckle/trim optimization", papyrus: true, competitor: false },
    { feature: "Native GST compliance (e-invoice, GSTR-1, e-way bill)", papyrus: true, competitor: "partial", note: "JDE Localization India layer + customization" },
    { feature: "Native Indian payroll (PF/ESI/PT/LWF)", papyrus: true, competitor: "partial" },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: "partial", note: "Oracle Cloud exists; JDE traditionally on-prem" },
    { feature: "AI/ML built-in", papyrus: true, competitor: "partial" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial" },
    { feature: "Mobile-first design", papyrus: true, competitor: "partial" },
    { feature: "Implementation timeline (full)", papyrus: "4–12 weeks", competitor: "9–24 months" },
    { feature: "Implementation team size", papyrus: "1–3 consultants", competitor: "10–30 consultants" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹2–5 crore" },
    { feature: "Pricing transparency", papyrus: true, competitor: false },
  ],
  whenChooseCompetitor: [
    "Indian subsidiary of a multinational where global parent mandates Oracle JDE for consolidation.",
    "Diversified manufacturing group running JDE for multiple business lines where paper is one of several.",
    "Need for very specific JDE strengths: project costing, capital projects, deep finance consolidation.",
    "Large enterprise IT budget with existing Oracle ecosystem investment (Oracle DB, Oracle Cloud).",
  ],
  whenChoosePapyrus: [
    "Indian paper mill not constrained by parent-company ERP mandates.",
    "Cost-conscious buyers: 70–85% lower TCO for equivalent operational scope.",
    "Mills wanting paper-specific capability (deckle, broke, kraft/tissue grades) without customization projects.",
    "Cloud-first IT strategy with no Oracle DB licensing baggage.",
    "Faster ROI: 4–12 weeks to value vs 9–24 month JDE rollout.",
    "Want modern UX, mobile-first design, real-time integrations, AI/IoT — not screens designed in the 2000s.",
  ],
  migration:
    "Migrating from JDE to Papyrus BPApp is most common for: (1) mid-market Indian paper mills wanting to exit a JDE inheritance that doesn't fit, (2) JDE Indian deployments where annual upgrade costs and customization debt exceed the value delivered. We provide masters and historical migration tools. Phased rollout (8–16 weeks) preserves operations.",
  faqs: [
    {
      q: "Is Papyrus BPApp's manufacturing depth comparable to Oracle JDE?",
      a: "For paper industry workflows — yes, and usually deeper. JDE's manufacturing capability is broad but generic. Papyrus BPApp has paper-specific extensions (grade master, parent reel genealogy, deckle, broke, MG/MF/calendering, GSM/BF/BS quality) that JDE requires extensive customization to handle.",
    },
    {
      q: "We use Oracle Database. Does Papyrus BPApp support Oracle DB?",
      a: "Papyrus BPApp runs on PostgreSQL (open-source, no licensing cost). For customers needing Oracle DB for compliance/data residency reasons, we offer integration patterns to push data into Oracle DB as a downstream consolidation system.",
    },
    {
      q: "What about JDE's strength in capital project accounting?",
      a: "Papyrus BPApp's Projects module covers WBS, capital project tracking, AFE (Authorization for Expenditure), capitalization workflows. Sufficient for most paper mills. For very complex multi-billion-rupee capital projects spanning years, JDE may still have an edge.",
    },
    {
      q: "TCO comparison for 100 TPD multi-machine mill?",
      a: "JDE EnterpriseOne: implementation ₹2–4 crore, licenses ₹60–120 lakh/year, AMC + customization ₹40–80 lakh/year. 5-year TCO ₹6–12 crore. Papyrus BPApp: implementation ₹40–80 lakh, annual ₹25–50 lakh. 5-year TCO ₹2–3 crore. Typical 60–75% reduction.",
    },
    {
      q: "Can Papyrus BPApp coexist with our existing JDE during transition?",
      a: "Yes. REST API integration enables a hybrid period — Papyrus BPApp for production/deckle/quality while JDE continues for finance during 6-12 month transition. Most customers eventually migrate finance too once business value is proven.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
