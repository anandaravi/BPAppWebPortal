import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Pay for what you run.",
  subtitle: "Pluggable pricing — modules, users, plants, deployment. Small mills from ₹4–12 lakh/year.",
  tag: "Pricing",
  accent: "#34D399",
});
export const metadata: Metadata = {
  title: "Pricing | Transparent Paper Mill ERP Plans",
  description: "Transparent pricing for Papyrus BPApp — Indian paper mill ERP. Start small, scale modular. No hidden costs, no per-user lock-in surprises. GST-compliant invoicing.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Papyrus BPApp Pricing — Transparent Paper Mill ERP",
    description: "Modular pricing for Indian paper mills. Start small, scale up.",
    url: "/pricing",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
