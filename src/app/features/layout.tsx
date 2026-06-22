import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "396 capabilities across 45 modules.",
  subtitle: "Browse every feature — from MPS scheduling to GSTR-9 reconciliation.",
  tag: "Features",
  accent: "#F59E0B",
});
export const metadata: Metadata = {
  title: "Features | 396+ Capabilities Across 45 Paper Mill Modules",
  description: "Complete feature catalog of Papyrus BPApp — 396+ capabilities across 45 modules covering production planning, deckle optimization, quality, finance, GST, HR/payroll, AI, IoT and more for Indian paper mills.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Papyrus BPApp Features — 396 Capabilities",
    description: "Every feature, every module, in one place.",
    url: "/features",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
