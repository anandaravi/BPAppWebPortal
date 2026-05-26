import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | 396+ Capabilities Across 44 Paper Mill Modules",
  description: "Complete feature catalog of Papyrus BPApp — 396+ capabilities across 44 modules covering production planning, deckle optimization, quality, finance, GST, HR/payroll, AI, IoT and more for Indian paper mills.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Papyrus BPApp Features — 396 Capabilities",
    description: "Every feature, every module, in one place.",
    url: "/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
