import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "By role. By job to be done.",
  subtitle: "Solutions tailored for plant manager, CFO, planner, quality head, IT lead, CEO.",
  tag: "By Role",
  accent: "#10B981",
});
export const metadata: Metadata = {
  title: "By Role | CFO, Plant Head, IT Head, Sales, HR Solutions",
  description: "How Papyrus BPApp solves the daily pain of each role in an Indian paper mill: CFO/Finance Controller, Plant Head, Operations Manager, IT Head, Sales/Commercial Head, HR Head.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions by Role — Paper Mill Leadership",
    description: "Role-specific ERP solutions for CFO, plant head, operations, IT, sales, HR.",
    url: "/solutions",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
