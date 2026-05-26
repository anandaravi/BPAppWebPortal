import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs ProcessPro",
  subtitle: "Process manufacturing ERP",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs ProcessPro / ProcessProERP | Paper Mill ERP Alternative",
  description:
    "ProcessPro/ProcessProERP is process manufacturing ERP. Papyrus BPApp is paper-specific cloud ERP with native deckle, GST, and AI.",
  alternates: { canonical: "/vs/processpro" },
  keywords: [
    "ProcessPro alternative",
    "ProcessProERP alternative",
    "process manufacturing ERP India",
    "ProcessPro vs Papyrus",
  ],
  openGraph: {
    title: "Papyrus BPApp vs ProcessProERP",
    description: "ProcessPro is generic process. Papyrus BPApp is paper-specific.",
    url: "/vs/processpro",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "ProcessPro",
  competitorFull: "ProcessPro / ProcessProERP",
  competitorTagline: "Process manufacturing ERP",
  slug: "processpro",
  intro:
    "ProcessPro (acquired by Open Systems, now ProcessProERP) serves process manufacturers — food, beverage, chemicals, cosmetics, nutraceuticals. Some paper mills evaluate it for its process manufacturing focus. Papyrus BPApp goes further: paper-specific data model, deckle optimization, India compliance, and cloud-native architecture.",
  positioningPapyrus:
    "Cloud-native paper-first ERP. Built specifically for Indian paper mills. 44 modules, INR pricing.",
  positioningCompetitor:
    "ProcessProERP is purpose-built for process manufacturing — batch processing, formula management, recipe versioning, lot traceability. Good fit for food/beverage/chemicals. For paper specifically, lacks deckle optimization, paper grade master, India compliance defaults.",
  rows: [
    { feature: "Process manufacturing depth (batch, formula, recipe)", papyrus: true, competitor: true },
    { feature: "Paper-specific data model (grades, parent reels)", papyrus: true, competitor: false },
    { feature: "Native deckle optimization", papyrus: true, competitor: false },
    { feature: "Out-of-box Indian GST", papyrus: true, competitor: false },
    { feature: "Native Indian payroll", papyrus: true, competitor: false },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: "partial" },
    { feature: "AI/ML built-in", papyrus: true, competitor: false },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial" },
    { feature: "Mobile-first design", papyrus: true, competitor: "partial" },
    { feature: "Indian language support", papyrus: true, competitor: false },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "6–12 months" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹50 lakh – 1.5 crore" },
  ],
  whenChooseCompetitor: [
    "Diversified manufacturing including food/beverage/chemicals/paper where common ERP across lines makes sense.",
    "Need for very deep formula management and recipe versioning (common in chemicals/food).",
    "Existing ProcessPro footprint in group operations.",
    "Strong North American/European market presence is critical.",
  ],
  whenChoosePapyrus: [
    "Indian paper mill needing paper-specific workflows, not generic process manufacturing.",
    "GST, FEMA, PF, ESI as defaults — not customization.",
    "Deckle optimization without partner add-ons.",
    "Cost-sensitive: 70%+ lower TCO.",
    "Cloud-native, mobile-first, AI built in — modern stack.",
  ],
  migration: "Migrating from ProcessPro to Papyrus BPApp: masters and formula libraries map to paper grade master + recipe development module. 6–10 week transition for typical paper mill.",
  faqs: [
    { q: "Does Papyrus BPApp handle batch traceability like ProcessPro?", a: "Yes. Reel-level genealogy, batch lineage through pulping → paper → finishing → dispatch. Audit-ready records for ISO 9001/22000/FSSAI." },
    { q: "Formula management for chemical dosing?", a: "Yes via Recipe Development module — chemical recipes per grade, versioning, customer approval workflow." },
    { q: "TCO comparison?", a: "ProcessPro: ₹50 lakh – 1.5 crore Y1 + ₹20–40 lakh/year. Papyrus BPApp: ₹15–40 lakh Y1, annual subscription ₹4–12 lakh for small mills · ₹12–30 lakh for mid mills · ₹30 lakh+ for large/integrated. 60–70% TCO reduction." },
    { q: "What's Papyrus BPApp's paper-industry track record vs ProcessPro's North American base?", a: "Papyrus BPApp is developed by Netique Infotech Pvt Ltd. — pioneers of Deckle Matching software in India with 4 decades of paper-industry domain expertise and 20+ years of multi-country mill deployments. Prior products (NDM, Paper Agent, Optrim, Optrim Web, Papyrus Production Manager) have been deployed in Indian and overseas mills for two decades. Delivered under the Papyrus360 brand. Different region than ProcessPro's primary market, but equivalent depth on paper-specific operations and unmatched India compliance fit." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
