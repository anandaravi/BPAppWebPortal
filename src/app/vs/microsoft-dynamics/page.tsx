import type { Metadata } from "next";
import { ComparisonPage, type ComparisonPageData } from "@/components/seo/comparison-page";

export const metadata: Metadata = {
  title: "Papyrus BPApp vs Microsoft Dynamics 365 | Paper Mill ERP Alternative",
  description:
    "Microsoft Dynamics 365 (BC, F&O) is general-purpose cloud ERP. Papyrus BPApp is paper-specific with built-in deckle optimization, native GST, and lower TCO.",
  alternates: { canonical: "/vs/microsoft-dynamics" },
  keywords: [
    "Dynamics 365 alternative",
    "Microsoft D365 paper mill",
    "Business Central paper alternative",
    "F&O alternative manufacturing",
    "D365 vs Papyrus BPApp",
  ],
  openGraph: {
    title: "Papyrus BPApp vs Microsoft Dynamics 365",
    description: "D365 is general cloud ERP. Papyrus BPApp is paper-first.",
    url: "/vs/microsoft-dynamics",
  },
};

const data: ComparisonPageData = {
  competitor: "D365",
  competitorFull: "Microsoft Dynamics 365 (BC / F&O)",
  competitorTagline: "Microsoft's cloud ERP platform",
  slug: "microsoft-dynamics",
  intro:
    "Microsoft Dynamics 365 — Business Central (mid-market) and Finance & Operations (enterprise) — is a popular cloud ERP choice for Indian businesses already in the Microsoft ecosystem. It's well-designed, integrates with Microsoft 365, and has strong financial capability. But it's generic across industries — paper-specific workflows (deckle, broke, kraft grades) require customization or ISV add-ons. Papyrus BPApp delivers these natively, at a fraction of the cost.",
  positioningPapyrus:
    "Cloud-native ERP purpose-built for Indian paper mills. 44 paper-specific modules. Native deckle optimization, GST, payroll. India-priced, India-supported, paper-first.",
  positioningCompetitor:
    "Microsoft Dynamics 365 is a horizontal cloud ERP suite. Business Central serves mid-market; Finance & Operations serves enterprise. Strong finance, decent manufacturing, good Microsoft 365 integration. Paper-specific capability requires customization or third-party ISV solutions. Indian compliance via Localization India add-on + partner customization.",
  rows: [
    { feature: "Built specifically for paper industry", papyrus: true, competitor: false },
    { feature: "Built-in deckle/trim optimization", papyrus: true, competitor: false, note: "D365 needs ISV add-on" },
    { feature: "Native GST + e-invoice + e-way bill", papyrus: true, competitor: "partial", note: "D365 has Localization India layer" },
    { feature: "Native Indian payroll (PF/ESI/PT/LWF)", papyrus: true, competitor: "partial" },
    { feature: "Cloud-native multi-tenant SaaS", papyrus: true, competitor: true },
    { feature: "Microsoft 365 integration (Teams, Outlook, Excel)", papyrus: "partial", competitor: true, note: "D365 has tight M365 integration; we have API hooks" },
    { feature: "Power BI integration", papyrus: "partial", competitor: true, note: "We support Power BI via REST APIs" },
    { feature: "Paper grade master, parent reel genealogy", papyrus: true, competitor: false },
    { feature: "Broke management module", papyrus: true, competitor: false },
    { feature: "Lab/LIMS for paper testing", papyrus: true, competitor: false },
    { feature: "AI/ML built-in", papyrus: true, competitor: "partial", note: "D365 has Copilot integration" },
    { feature: "IoT + Digital Twin", papyrus: true, competitor: "partial", note: "D365 has Azure IoT integration" },
    { feature: "Implementation timeline (full)", papyrus: "4–12 weeks", competitor: "4–12 months" },
    { feature: "Typical first-year TCO (50 TPD mill)", papyrus: "₹15–40 lakh", competitor: "₹50 lakh – 2 crore" },
  ],
  whenChooseCompetitor: [
    "Deeply Microsoft-centric IT shop where Teams, Outlook, SharePoint, Power BI integration is critical to workflows.",
    "Diversified business where paper is one of several lines and a horizontal ERP makes sense.",
    "Need for very tight Power BI / Power Platform integration for custom analytics and apps.",
    "Existing Microsoft Enterprise Agreement where D365 licensing is bundled at favorable rates.",
  ],
  whenChoosePapyrus: [
    "Pure-play paper mill where paper-specific capability outweighs generic ERP breadth.",
    "Cost-conscious: 60–80% lower TCO with paper-specific depth built in.",
    "Mills wanting deckle, broke, kraft/tissue/board specifics out of the box — not via customization.",
    "India compliance (GST, FEMA, PF, ESI) as default behavior, not as add-on layers.",
    "Faster time to value (4–12 weeks vs 4–12 months for D365 with paper customization).",
    "Want to use Power BI? Papyrus BPApp's REST APIs feed Power BI dashboards — you get the visualization benefits without D365 ERP overhead.",
  ],
  migration:
    "Migrating from D365 BC to Papyrus BPApp is well-supported. We extract masters and transactions via D365 API or standard data exports. Phased rollout (6–12 weeks) preserves operations. For customers with significant Power BI investments, we feed Papyrus BPApp data into existing Power BI workspaces — no dashboards lost.",
  faqs: [
    {
      q: "Is Papyrus BPApp's manufacturing capability comparable to D365 F&O?",
      a: "For paper mill workflows — yes, and deeper. F&O has broad manufacturing capability (discrete + lean + process) but generic across industries. Papyrus BPApp has paper-specific workflows (grade master, parent reel, deckle, broke, kraft/tissue/board) that F&O requires customization or ISV solutions to handle.",
    },
    {
      q: "We use Microsoft Teams heavily. Can Papyrus BPApp integrate?",
      a: "Yes via webhooks and Teams connectors — notifications for approvals, production alerts, downtime events flow into Teams channels. Tighter native Teams integration is on our roadmap.",
    },
    {
      q: "Power BI is critical for our dashboards. Does Papyrus BPApp support it?",
      a: "Yes. Papyrus BPApp exposes data via REST APIs and an analytics endpoint compatible with Power BI's web data source. Many customers continue using existing Power BI workspaces, just pointed at Papyrus BPApp data. We also offer pre-built dashboards inside the platform if you want to consolidate.",
    },
    {
      q: "TCO comparison for 60 TPD paper mill?",
      a: "D365 F&O: implementation ₹50 lakh – 1 crore, annual licenses ₹40–80 lakh + customization/ISV ₹30–50 lakh. 5-year TCO ₹3–6 crore. Papyrus BPApp: implementation ₹20–50 lakh, annual ₹20–40 lakh. 5-year TCO ₹1–2.5 crore. Typical 60–75% TCO reduction.",
    },
    {
      q: "Microsoft says D365 has AI Copilot. Does Papyrus BPApp have AI too?",
      a: "Yes. Papyrus BPApp's AI module includes a conversational interface (\"What's my top customer this month?\"), predictive maintenance, quality anomaly detection, and AI-assisted production scheduling — powered by Anthropic Claude, Google Gemini, or OpenAI (configurable). Equivalent capability with the bonus of being paper-context-aware out of the box.",
    },
  ],
};

export default function Page() {
  return <ComparisonPage data={data} />;
}
