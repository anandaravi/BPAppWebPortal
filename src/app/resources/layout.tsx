import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Guides, videos, presentations.",
  subtitle: "Implementation guides, mill-floor videos, slide decks, webinars — paper-industry first.",
  tag: "Resources",
  accent: "#F59E0B",
});
export const metadata: Metadata = {
  title: "Resources | Paper Mill ERP Videos, Guides & Webinars",
  description: "Free resources for Indian paper manufacturers: product videos, customer stories, implementation guides, GST/FEMA configuration manuals, deckle optimizer playbook, ROI frameworks.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Papyrus BPApp Resources — Videos, Guides, Webinars",
    description: "Free paper mill ERP learning content.",
    url: "/resources",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
