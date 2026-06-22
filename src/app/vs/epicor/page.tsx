import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs Epicor",
  subtitle: "Mid-market manufacturing ERP",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs Epicor Kinetic | Paper Mill ERP Alternative",
  description:
    "Epicor Kinetic is mid-market manufacturing ERP. Papyrus BPApp is paper-first, India-first cloud ERP with native deckle optimization and GST.",
  alternates: { canonical: "/vs/epicor" },
  keywords: [
    "Epicor alternative",
    "Epicor Kinetic alternative paper",
    "Epicor vs Papyrus",
    "manufacturing ERP India",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Epicor Kinetic",
    description: "Epicor is generic mid-market. Papyrus BPApp is paper-first, India-first.",
    url: "/vs/epicor",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "Epicor",
  competitorFull: "Epicor Kinetic (formerly Epicor ERP)",
  competitorTagline: "Mid-market manufacturing ERP",
  slug: "epicor",
  intro:
    "Epicor Kinetic (formerly Epicor ERP 10) is a respected mid-market manufacturing ERP with strong roots in discrete manufacturing — automotive, machinery, electronics. Process industries including paper are supported but require configuration. Papyrus BPApp delivers what Epicor needs partner customization for — paper-specific workflows, India compliance, deckle optimization — all in cloud-native form.",
  positioningPapyrus:
    "Paper-first cloud ERP for Indian mills. 45 native paper modules. INR pricing, 4–12 week implementation.",
  positioningCompetitor:
    "Epicor Kinetic is a mid-market ERP suite available on cloud or on-prem. Strong in discrete manufacturing, project-based, MTO/CTO businesses. Paper industry coverage via process manufacturing extensions + ISV solutions. Indian compliance via Epicor India localization + partner customization.",
  rows: [
    { feature: "Paper-specific data model", papyrus: true, competitor: false },
    { feature: "Native deckle optimization", papyrus: true, competitor: false },
    { feature: "Out-of-box GST + e-invoice", papyrus: true, competitor: "partial" },
    { feature: "Indian payroll", papyrus: true, competitor: "partial" },
    { feature: "Process manufacturing depth", papyrus: true, competitor: true, note: "Epicor strong for process" },
    { feature: "Shop floor execution + OEE", papyrus: true, competitor: true },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: "partial" },
    { feature: "AI/ML built-in", papyrus: true, competitor: "partial" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial" },
    { feature: "Mobile-first design", papyrus: true, competitor: "partial" },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "6–18 months" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹1–2.5 crore" },
  ],
  whenChooseCompetitor: [
    "Diversified manufacturing where paper is one of several lines and Epicor breadth matters.",
    "Strong project-based or MTO/CTO manufacturing where Epicor's traditional strength applies.",
    "Existing Epicor footprint in group operations.",
    "Need for very deep configurator-driven product setup that paper-first ERPs don't prioritize.",
  ],
  whenChoosePapyrus: [
    "Pure-play paper mill where Epicor's general manufacturing breadth is overkill.",
    "Cost-sensitive: 70–80% lower TCO with paper-specific depth built in.",
    "Mills wanting deckle, broke, paper grades natively.",
    "Indian compliance as default behavior, not customization.",
    "Faster ROI: 4–12 weeks vs 6–18 months Epicor rollout.",
  ],
  migration: "Migrating from Epicor to Papyrus BPApp: data export via Epicor's standard tools, mapped to Papyrus BPApp schema. Phased rollout (8–14 weeks). Most paper mills find the transition faster than the original Epicor implementation.",
  faqs: [
    { q: "Is Papyrus BPApp's process manufacturing capability comparable to Epicor?", a: "For paper industry workflows — yes. Epicor's process manufacturing is broad but generic; Papyrus BPApp is paper-tuned (grades, parent reels, deckle, broke, GSM/BF/BS, MG/MF/calendering)." },
    { q: "Does Papyrus BPApp have configurator like Epicor's CPQ?", a: "Papyrus BPApp has product catalog with variant configuration — sufficient for paper grade combinations. For very complex CPQ (1000+ option combinations), Epicor may have an edge, but rare in paper." },
    { q: "TCO for 60 TPD mill?", a: "Epicor: ₹1–2 crore implementation, ₹40–80 lakh annual licenses + ₹30–50 lakh partner support. 5-year TCO ₹4–8 crore. Papyrus BPApp: annual subscription ₹4–12 lakh for small mills · ₹12–30 lakh for mid mills (60 TPD typical) · ₹30 lakh+ for large mills. 5-year TCO ₹1.5–3 crore. 60–75% reduction." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
