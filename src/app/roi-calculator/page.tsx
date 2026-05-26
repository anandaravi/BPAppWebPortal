import type { Metadata } from "next";
import { ROICalculator } from "@/components/roi-calculator";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Paper Mill ROI Calculator | Deckle Trim Waste Savings | Papyrus BPApp",
  description:
    "Calculate how much your paper mill is losing to trim waste — and what you'd save with a 3-tier Deckle Optimizer. Free interactive calculator for Indian paper manufacturers.",
  alternates: { canonical: "/roi-calculator" },
  keywords: [
    "paper mill ROI calculator",
    "deckle ROI calculator",
    "trim waste savings calculator",
    "paper mill cost savings",
    "deckle optimization ROI",
    "paper mill ERP ROI",
  ],
  openGraph: {
    title: "Paper Mill ROI Calculator — Deckle Trim Savings",
    description: "How much is trim waste costing your mill? Calculate in 30 seconds.",
    url: "/roi-calculator",
  },
};

const FAQS = [
  {
    q: "How accurate is this ROI calculator?",
    a: "The calculation uses the same formula auditors use: (current trim % − target trim %) × daily tons × 365 × paper price. The savings range is based on real outcomes at Indian mills running Papyrus BPApp's Deckle Optimizer — typically 60–70% of current trim is recoverable.",
  },
  {
    q: "What target trim % is realistic?",
    a: "World-class kraft mills run 2.5–3.5% trim. Mills running 8%+ today typically reach 3.5–4% within 3 months on the 3-tier Deckle Optimizer. The calculator defaults to 3.5% as conservative target.",
  },
  {
    q: "Are these numbers only for deckle, or full ERP savings?",
    a: "This calculator focuses on deckle/trim savings alone — the most immediate and measurable ROI driver. Full ERP ROI (working capital, faster invoicing, payroll automation, fewer GST notices, etc.) typically adds another 1.5–3× on top.",
  },
  {
    q: "What's the implementation timeline to start seeing these savings?",
    a: "Deckle Optimizer alone goes live in 3–6 weeks. Most mills see measurable trim reduction within 4 weeks of go-live and reach steady-state target within 90 days.",
  },
  {
    q: "Can I get a custom ROI analysis for my specific mill?",
    a: "Yes — book a demo and we'll build a detailed business case using your actual production data, paper grades, customer mix, and current trim numbers.",
  },
];

export default function ROICalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "ROI Calculator", url: "/roi-calculator" },
          ]),
          faqSchema(FAQS),
        ]}
      />
      <ROICalculator faqs={FAQS} />
    </>
  );
}
