import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Paper Mill ERP Videos, Guides & Webinars",
  description: "Free resources for Indian paper manufacturers: product videos, customer stories, implementation guides, GST/FEMA configuration manuals, deckle optimizer playbook, ROI frameworks.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Papyrus BPApp Resources — Videos, Guides, Webinars",
    description: "Free paper mill ERP learning content.",
    url: "/resources",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
