import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs Infor LN",
  subtitle: "Mid-market manufacturing ERP",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs Infor LN | Paper Manufacturing ERP Alternative",
  description:
    "Infor LN / CloudSuite Industrial is mid-market manufacturing ERP. Papyrus BPApp is purpose-built for Indian paper mills with native GST, deckle optimization, and AI.",
  alternates: { canonical: "/vs/infor-ln" },
  keywords: [
    "Infor LN alternative",
    "Infor CloudSuite alternative",
    "Infor paper mill alternative",
    "Infor vs Papyrus BPApp",
    "mid-market paper ERP India",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Infor LN / CloudSuite",
    description: "Infor is generic discrete manufacturing ERP. Papyrus BPApp is paper-first, India-first.",
    url: "/vs/infor-ln",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "Infor",
  competitorFull: "Infor LN / CloudSuite Industrial",
  competitorTagline: "Mid-market manufacturing ERP",
  slug: "infor-ln",
  intro:
    "Infor LN (and its cloud version CloudSuite Industrial) is a well-regarded mid-market ERP for discrete and process manufacturing. It works across industries — automotive, electronics, food, paper, chemicals. Papyrus BPApp takes a different bet: paper-first, India-first, with deckle optimization built in as a core module rather than a partner add-on.",
  positioningPapyrus:
    "Cloud-native ERP purpose-built for Indian paper mills. 44 modules tuned for paper industry workflows. Out-of-box Indian GST, FEMA, PF/ESI compliance. 3-tier Deckle Optimizer included.",
  positioningCompetitor:
    "Infor LN is a horizontal ERP with deep manufacturing capability. Strong in discrete manufacturing (automotive, machinery). Process manufacturing extensions exist but require configuration for paper-specific workflows (deckle, broke management, kraft/tissue/board grades). Indian compliance via Infor's India localization layer + partner customization.",
  rows: [
    { feature: "Built specifically for paper industry", papyrus: true, competitor: "partial" },
    { feature: "Out-of-box GST compliance (GSTR-1, e-invoice)", papyrus: true, competitor: "partial" },
    { feature: "Native deckle/trim optimization", papyrus: true, competitor: false, note: "Infor partners with trim solutions" },
    { feature: "Paper-specific quality (BF/BS/GSM/cobb)", papyrus: true, competitor: "partial" },
    { feature: "Broke management module", papyrus: true, competitor: false },
    { feature: "Native Indian payroll", papyrus: true, competitor: "partial" },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: true, note: "CloudSuite is cloud" },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "6–18 months" },
    { feature: "Pricing model", papyrus: "INR, modular, transparent", competitor: "USD, enterprise quotes" },
    { feature: "AI/ML built-in", papyrus: true, competitor: "partial", note: "Infor Coleman AI exists but separate licensing" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial" },
    { feature: "Mobile-first design", papyrus: true, competitor: "partial" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹1–3 crore" },
  ],
  whenChooseCompetitor: [
    "Diversified manufacturing company where paper is one of several business lines and you need horizontal ERP coverage.",
    "Existing Infor footprint (Syteline, M3, LN) in other plants where adding another paper mill onto same platform makes sense.",
    "Need for very specific discrete manufacturing features (configurator-driven products, deep BOM hierarchies) that paper-first ERPs don't prioritize.",
    "Larger enterprise budgets and 6–18 month implementation tolerance.",
  ],
  whenChoosePapyrus: [
    "Pure-play paper mill where every dollar should go into paper-specific capability, not generic manufacturing ERP.",
    "Indian mill needing GST, FEMA, PF, ESI as defaults — not as customization layers.",
    "Cost-sensitive: 50–80% lower TCO for equivalent functional scope.",
    "Need deckle optimization to recover ₹2–3 crore/year trim waste — Infor needs partner solution.",
    "Want broke management, recipe development, paper-specific quality, sustainability/ESG built in.",
    "Faster ROI: 4–12 weeks to value vs 6–18 month Infor rollout.",
  ],
  migration:
    "Migrating from Infor (LN, M3, Syteline) to Papyrus BPApp uses our data migration toolkit: masters export, opening balances, open transactions, historical data. Phased rollout (4–12 weeks) preserves operations continuity. We've completed transitions from Infor for both pure-paper mills and paper businesses within diversified manufacturing groups.",
  faqs: [
    {
      q: "Is Papyrus BPApp deep enough for our paper-specific workflows compared to Infor LN with paper customization?",
      a: "Yes — and typically deeper, because Papyrus BPApp's data model is paper-native. Grade master with GSM/BF/BS/MG/MF, parent reel → slit reel → SKU genealogy, broke management as first-class module, deckle as integrated module not add-on. Infor LN can be customized to handle these but the customization burden is significant.",
    },
    {
      q: "We have other manufacturing operations beyond paper. Does Papyrus BPApp work for those?",
      a: "Papyrus BPApp's architecture supports general discrete manufacturing (BOM, routing, work orders, MRP/CRP) but is most opinionated for paper. For diversified groups, Papyrus BPApp serves paper mills and an Infor or SAP could serve other lines. Or use Papyrus BPApp for the entire group if the non-paper plants are willing to adopt paper-style workflows.",
    },
    {
      q: "Infor's strength is configurability. Is Papyrus BPApp flexible enough?",
      a: "Yes. Configurable workflows, custom fields, custom approval matrices, feature toggles, custom reports, and a low-code automation builder are core to the platform. Customization that takes weeks in Infor (involving ABAP-equivalents) often takes hours in Papyrus BPApp.",
    },
    {
      q: "TCO comparison for a 50 TPD paper mill?",
      a: "Infor LN: implementation ₹1–2 crore, annual licenses ₹40–80 lakh + AMC ₹20–40 lakh. Papyrus BPApp: implementation ₹15–40 lakh, annual subscription ₹4–12 lakh for small mills · ₹12–30 lakh for mid mills (50 TPD typical) · ₹30 lakh+ for large/integrated mills, covering all 44 modules. Typical 60–75% lower 5-year TCO.",
    },
    {
      q: "Will my Infor consultant ecosystem be lost?",
      a: "Infor has a strong global partner ecosystem. Papyrus BPApp is newer; we work directly with customers and select India implementation partners. For Indian paper mills, direct vendor engagement often delivers faster results than multi-tier partner engagements.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
