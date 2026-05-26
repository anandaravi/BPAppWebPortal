import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";


const OG = ogImage({
  title: "Papyrus BPApp vs NetSuite",
  subtitle: "Cloud ERP for SMB to mid-market",
  tag: "Comparison",
  accent: "#EF4444",
});
export const metadata: Metadata = {
  title: "Papyrus BPApp vs Oracle NetSuite | Paper Mill ERP Alternative",
  description:
    "Oracle NetSuite is cloud ERP for SMB to mid-market. Papyrus BPApp is paper-specific with native deckle optimization, India GST, and lower TCO.",
  alternates: { canonical: "/vs/netsuite" },
  keywords: [
    "NetSuite alternative",
    "NetSuite paper mill alternative",
    "Oracle NetSuite vs Papyrus",
    "cloud ERP paper India",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Oracle NetSuite",
    description: "NetSuite is generic cloud ERP. Papyrus BPApp is paper-first cloud ERP.",
    url: "/vs/netsuite",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: ComparisonPageData = {
  competitor: "NetSuite",
  competitorFull: "Oracle NetSuite",
  competitorTagline: "Cloud ERP for SMB to mid-market",
  slug: "netsuite",
  intro:
    "Oracle NetSuite is one of the world's most popular cloud ERPs for growing companies, with strong finance, e-commerce, and services capabilities. It's used by many Indian companies expanding internationally. For paper mills specifically, NetSuite's manufacturing module is generic — paper workflows require customization or third-party SuiteApps.",
  positioningPapyrus:
    "Cloud ERP purpose-built for Indian paper mills. Native deckle, GST, payroll, paper grade master. Modular, INR-priced, fast go-live.",
  positioningCompetitor:
    "NetSuite is a true cloud-native ERP with broad capability — finance, CRM, SCM, e-commerce, basic manufacturing. Strong for services and distribution businesses. Manufacturing depth via Advanced Manufacturing module + SuiteApps. India compliance through SuiteApps and partner customization. Pricing in USD with annual subscription.",
  rows: [
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: true },
    { feature: "Built for paper industry", papyrus: true, competitor: false },
    { feature: "Native deckle optimization", papyrus: true, competitor: false },
    { feature: "Out-of-box Indian GST + e-invoice", papyrus: true, competitor: "partial", note: "NetSuite India SuiteApp" },
    { feature: "Native Indian payroll", papyrus: true, competitor: "partial" },
    { feature: "Paper-specific quality (BF/BS/GSM/cobb)", papyrus: true, competitor: false },
    { feature: "Parent reel genealogy", papyrus: true, competitor: false },
    { feature: "Broke management", papyrus: true, competitor: false },
    { feature: "AI/ML built-in", papyrus: true, competitor: "partial", note: "NetSuite has AI but generic" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial" },
    { feature: "Mobile-first design", papyrus: true, competitor: true },
    { feature: "Pricing currency", papyrus: "INR", competitor: "USD" },
    { feature: "Typical first-year TCO (50 TPD)", papyrus: "₹15–40 lakh", competitor: "₹60 lakh – 1.5 crore" },
  ],
  whenChooseCompetitor: [
    "Multi-country paper company with operations beyond India needing multi-entity, multi-currency consolidation across geographies.",
    "Strong existing NetSuite footprint in the group (parent company, sister units).",
    "Need for tight Salesforce or HubSpot CRM integration — NetSuite has well-known connectors.",
    "Services or distribution business in addition to paper mill — NetSuite breadth helps.",
  ],
  whenChoosePapyrus: [
    "Indian paper mill not requiring multi-country breadth.",
    "Cost-sensitive: 60–75% lower TCO than NetSuite + paper customization.",
    "Want paper-specific capability (deckle, broke, GSM/BF/BS) natively, not via SuiteApps.",
    "INR pricing — no FX exposure.",
    "Modular activation — start with 4 modules, add the rest as you grow.",
    "Faster ROI: 4–12 weeks to value.",
  ],
  migration: "Migrating from NetSuite: data export via SuiteAnalytics + REST APIs. Masters and historical transactions mapped to Papyrus BPApp. Typical 6–10 week migration with parallel run period. Many customers find Papyrus BPApp simpler than NetSuite once paper workflows are tested.",
  faqs: [
    { q: "Is Papyrus BPApp's manufacturing depth comparable to NetSuite Advanced Manufacturing?", a: "For paper industry workflows — deeper. NetSuite Advanced Manufacturing is generic discrete/process. Papyrus BPApp's data model is paper-native (grades, parent reels, deckle, broke). NetSuite needs SuiteApps to match." },
    { q: "Multi-currency, multi-entity support?", a: "Yes. Papyrus BPApp supports multi-entity, multi-currency, multi-GSTIN. For Indian-focused mills this is sufficient. For complex multi-country consolidation across 5+ countries, NetSuite may have an edge." },
    { q: "Salesforce/HubSpot CRM integration?", a: "Yes via REST APIs. Two-way sync of leads, opportunities, accounts. Or use Papyrus BPApp's built-in CRM module." },
    { q: "TCO comparison?", a: "NetSuite: USD-priced, typically ₹30–80 lakh/year subscription + ₹30–60 lakh implementation + ₹20–40 lakh/year partner support. 5-year TCO ₹4–10 crore. Papyrus BPApp: INR-priced, starts at ₹4–12 lakh/year for small mills, ₹12–30 lakh for mid mills. 5-year TCO ₹1–2.5 crore. Typical 70% reduction." },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
