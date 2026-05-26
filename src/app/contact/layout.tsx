import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo | Paper Mill ERP",
  description: "Book a personalized demo of Papyrus BPApp — the ERP built for Indian paper mills. Select the modules you're interested in. Response within 1 business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Demo of Papyrus BPApp",
    description: "Book a paper mill ERP demo. 44 modules covering production, deckle, GST, HR, AI.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
