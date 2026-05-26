import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Papyrus BPApp | India's Paper Mill ERP",
  description: "Built in India for Indian paper manufacturers. Why Papyrus BPApp exists, who it's for, and how 44 modules cover every corner of a paper mill — from order intake to GST compliance.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Papyrus BPApp — Built in India for Indian Paper Mills",
    description: "Why Papyrus BPApp exists and how it serves Indian paper manufacturers.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
