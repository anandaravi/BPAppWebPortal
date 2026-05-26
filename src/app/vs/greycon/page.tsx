import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs Greycon",
  subtitle: "Global trim optimization specialist",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs Greycon | Deckle Optimizer + ERP Alternative",
  description:
    "Comparing Greycon X-Trim and GreyconMill against Papyrus BPApp for Indian paper mills. Deckle optimization, ERP integration, pricing, deployment, and India-specific features compared side by side.",
  alternates: { canonical: "/vs/greycon" },
  keywords: [
    "Greycon alternative",
    "Greycon X-Trim alternative",
    "GreyconMill alternative",
    "deckle optimization software",
    "paper mill trim optimizer India",
    "Greycon vs Papyrus",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Greycon — Deckle Optimization + Full ERP",
    description: "Greycon is the global trim leader. Papyrus BPApp delivers integrated deckle optimization plus a full Indian paper mill ERP.",
    url: "/vs/greycon",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "Greycon",
  competitorFull: "Greycon (X-Trim, GreyconMill)",
  competitorTagline: "Global trim optimization specialist",
  slug: "greycon",
  intro:
    "Greycon is the world's most established name in paper mill trim optimization, with X-Trim and GreyconMill deployed at major global paper companies. Papyrus BPApp takes a different approach: instead of bolting trim optimization onto an existing ERP stack, the Deckle Optimizer is a first-class module inside a full Indian paper mill ERP — built natively for GST, multi-tenant cloud, and the operating realities of Indian mills.",
  positioningPapyrus:
    "Cloud-native, India-built ERP with 44 integrated modules. The 3-tier Deckle Optimizer (Instant <2s · Balanced ~30s · Full ≤5 min, 180+ constraints) is one of them — feeding directly from Sales Orders, scheduling into Production, and posting consumption to Inventory and Finance automatically. No middleware, no integration projects, no separate license.",
  positioningCompetitor:
    "Mature point-solution specialist headquartered in the UK. X-Trim is the deckle optimization engine; GreyconMill adds scheduling and supply-chain layers. Strong global pedigree at large multinational paper companies. Typically deployed on-premises, integrated to a separate ERP (SAP, Oracle, IBM) via middleware. Pricing in foreign currency, India support via partners.",
  rows: [
    { feature: "3-tier deckle optimization (instant / shift / daily)", papyrus: true, competitor: "partial", note: "Greycon has single-tier optimization; tiered runs need separate configurations" },
    { feature: "Trim waste reduction (typical)", papyrus: "8% → <3.5%", competitor: "8% → 3.5%", note: "Both achieve similar outcomes on the optimization itself" },
    { feature: "Number of constraints", papyrus: "180+", competitor: "100+", note: "Pocket auto-detection, cutter feasibility, customer specs" },
    { feature: "Pattern learning (auto-capture proven patterns)", papyrus: true, competitor: "partial" },
    { feature: "Explainability (why this plan?)", papyrus: true, competitor: "partial" },
    { feature: "Integrated full ERP (Sales, Production, Finance, HR, etc.)", papyrus: true, competitor: false, note: "Greycon is deckle/scheduling; needs separate ERP" },
    { feature: "Native GST compliance (GSTR-1, e-invoice, e-way bill)", papyrus: true, competitor: false },
    { feature: "Native Indian payroll (PF, ESI, PT, LWF)", papyrus: true, competitor: false },
    { feature: "Cloud-native (multi-tenant SaaS)", papyrus: true, competitor: false, note: "Greycon primarily on-premises" },
    { feature: "Mobile app for shop floor", papyrus: true, competitor: "partial" },
    { feature: "AI engine (predictive maintenance, anomaly detection)", papyrus: true, competitor: false },
    { feature: "Implementation timeline", papyrus: "4–12 weeks", competitor: "6–18 months", note: "Including integration with separate ERP" },
    { feature: "Pricing model", papyrus: "INR, transparent, modular", competitor: "USD/GBP, on quote", note: "FX exposure for Indian buyers" },
    { feature: "India-based support (IST hours)", papyrus: true, competitor: "partial", note: "Greycon support primarily UK; India via partners" },
    { feature: "Indian paper grades default", papyrus: true, competitor: false, note: "GSM, BF, BS, MG, MF terminology native" },
  ],
  whenChooseCompetitor: [
    "Multinational paper company with >5 mills in multiple countries, already standardized on SAP/Oracle, looking for the most globally proven point-solution.",
    "Mill that does not need a new ERP and only wants to replace an existing in-house trim tool.",
    "Strict requirement for on-premises deployment with no cloud component.",
    "Need for very specific specialty paper optimization heuristics that have decades of Greycon tuning behind them.",
  ],
  whenChoosePapyrus: [
    "Indian paper mill (any size) that needs both trim optimization AND a complete ERP — without managing two separate vendors, two integrations, and two contracts.",
    "Mills currently running on Tally + Excel + manual deckle plans, looking to digitize end-to-end in one go.",
    "Cost-conscious buyers: pricing in INR, no FX exposure, transparent modular pricing vs Greycon's enterprise-style quotes.",
    "Mills wanting India-specific compliance (GST, FEMA, PF, ESI, e-invoice) out of the box, not as an add-on.",
    "Faster time-to-value: 4–12 weeks live vs 6–18 months for a Greycon + ERP rollout.",
    "Cloud-first IT strategy: multi-tenant SaaS, no on-prem servers to manage.",
    "Need integrated AI, IoT, mobile, and analytics — not just deckle.",
  ],
  migration:
    "Customers migrating from Greycon to Papyrus BPApp typically run both systems in parallel for one production cycle (2–4 weeks). We import your existing deckle patterns and machine constraints into the Pattern Catalog. After parallel validation, you switch over fully. The Deckle Optimizer module can also be activated as a standalone before adding other modules.",
  faqs: [
    {
      q: "Is Papyrus BPApp's Deckle Optimizer as accurate as Greycon X-Trim?",
      a: "Yes. Both achieve trim waste reductions from 8%+ down to under 3.5% on typical Indian paper grades. Papyrus BPApp's 3-tier engine adds explainability and pattern learning that X-Trim handles less natively. Real customers report comparable or better trim performance, with the bonus that the deckle plan flows directly into production, inventory, and GST-compliant invoicing automatically.",
    },
    {
      q: "Can I use Papyrus BPApp's Deckle Optimizer standalone, without the rest of the ERP?",
      a: "Yes. The Deckle Optimizer is offered as a standalone module that integrates with your existing ERP via REST APIs. Most customers start with deckle-only to prove ROI, then expand to other modules as they decommission legacy systems.",
    },
    {
      q: "How does Papyrus BPApp handle the production scheduling layer that GreyconMill provides?",
      a: "Papyrus BPApp's Production Planning module covers MPS (Master Production Schedule), MRP (Material Requirements Planning), and CRP (Capacity Requirements Planning), with shop floor execution including shift orders and OEE tracking. The deckle plan, schedule, and shop floor view are all in one system — eliminating the integration friction common with Greycon + separate scheduler.",
    },
    {
      q: "What about implementation risk vs Greycon's proven global track record?",
      a: "Greycon has decades of installations at large multinationals — that pedigree is real. But Papyrus BPApp is not a startup product either. It is developed by Netique Infotech Pvt Ltd., pioneers of Deckle Matching software in India, serving paper mills since 2000 with a consulting team carrying 35+ years of paper-industry experience and 20+ years of supporting mills across multiple countries. Netique's earlier products — NDM (Netique Deckle Matcher), Paper Agent, Optrim, Optrim Web, and Papyrus Production Manager — have been running in Indian and overseas paper mills for two decades. Papyrus BPApp is the natural evolution of that lineage into a full end-to-end ERP, delivered under the Papyrus360 brand for software + consulting. Architecturally, it sits on modern cloud foundations (PostgreSQL, Node.js, Next.js, Redis) on AWS/Azure/GCP. Implementation risk is further mitigated by: (1) phased modular rollout starting with deckle, (2) 4–12 week implementation cycle vs 6–18 months, (3) cloud-native with automatic backups and disaster recovery, (4) India-based dedicated support team that already understands paper mill operations.",
    },
    {
      q: "Total cost of ownership: Papyrus BPApp vs Greycon + separate ERP?",
      a: "A typical 50 TPD Indian mill running Greycon X-Trim + SAP B1 + Tally for compliance ends up with 3 vendor contracts, 2–3 integrations, and TCO often exceeding ₹1 crore/year (licenses + AMC + integration maintenance). Papyrus BPApp consolidates into one platform with INR-denominated, modular pricing — small mills typically start at ₹4–12 lakh/year for the core module set including Deckle Optimizer. Equivalent functional scope at 40–60% lower TCO than the multi-vendor stack.",
    },
    {
      q: "Does Papyrus BPApp work for non-Indian mills too?",
      a: "Yes, but our deepest fit is Indian paper mills. The platform supports multi-currency, multi-language, multi-country tax (via configurable tax rules), but our out-of-box advantage is strongest for mills with India-specific compliance needs (GST, FEMA, PF/ESI). For global multi-mill deployments with no India presence, Greycon may have a deeper international footprint.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
