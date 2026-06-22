import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All 45 Modules | Complete Paper Mill ERP Product",
  description: "Browse all 45 modules of Papyrus BPApp organized into 6 groups: Core Operations, Customer Experience, Finance & People, Master Data, Intelligence & Automation, Platform & Industry 4.0.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Papyrus BPApp Product — All 45 Modules",
    description: "Every module covering every corner of a paper mill.",
    url: "/product",
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
