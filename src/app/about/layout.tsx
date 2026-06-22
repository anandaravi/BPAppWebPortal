import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Built by paper industry insiders.",
  subtitle: "Papyrus BPApp by Netique Infotech — serving paper mills since 2000 with a consulting team carrying 35+ years of paper-industry experience.",
  tag: "About",
  accent: "#F59E0B",
});
export const metadata: Metadata = {
  title: "About Papyrus BPApp | India's Paper Mill ERP",
  description: "Built in India for Indian paper manufacturers. Why Papyrus BPApp exists, who it's for, and how 45 modules cover every corner of a paper mill — from order intake to GST compliance.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Papyrus BPApp — Built in India for Indian Paper Mills",
    description: "Why Papyrus BPApp exists and how it serves Indian paper manufacturers.",
    url: "/about",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
