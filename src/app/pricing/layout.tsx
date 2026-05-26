import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Transparent Paper Mill ERP Plans",
  description: "Transparent pricing for Papyrus BPApp — Indian paper mill ERP. Start small, scale modular. No hidden costs, no per-user lock-in surprises. GST-compliant invoicing.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Papyrus BPApp Pricing — Transparent Paper Mill ERP",
    description: "Modular pricing for Indian paper mills. Start small, scale up.",
    url: "/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
