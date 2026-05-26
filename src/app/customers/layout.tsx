import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Built for paper mills.",
  subtitle: "Kraft · Tissue · Newsprint · Board · Recycled · Integrated — every paper mill profile.",
  tag: "Who It's For",
  accent: "#EC4899",
});
export const metadata: Metadata = {
  title: "Who It's For | Paper Mills, Converters, Traders, OEMs",
  description: "Papyrus BPApp serves every type of Indian paper business: small mills, large mills, integrated kraft/tissue/board/newsprint mills, multi-plant groups, converters, traders, job workers, and paper machinery OEMs.",
  alternates: { canonical: "/customers" },
  openGraph: {
    title: "Who Papyrus BPApp Serves — Every Indian Paper Business",
    description: "Small mills to integrated groups. Kraft, tissue, board, newsprint, recycled, specialty.",
    url: "/customers",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
