import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Stack you can audit.",
  subtitle: "PostgreSQL · Node.js · Next.js · Redis · BullMQ on AWS/Azure/GCP. Open-source foundation.",
  tag: "Technical",
  accent: "#A78BFA",
});
export const metadata: Metadata = {
  title: "Technical Specs | Paper Mill ERP Stack & Infrastructure",
  description: "Papyrus BPApp's technical stack: Next.js + Expo (mobile), Node.js + Express + PostgreSQL + Redis + BullMQ. Multi-tenant, RBAC, full audit trails. Cloud-native, deployable on AWS, Azure, GCP, or on-prem.",
  alternates: { canonical: "/technical" },
  openGraph: {
    title: "Technical Specs of Papyrus BPApp ERP",
    description: "Stack, infrastructure, security, scalability for paper mill ERP.",
    url: "/technical",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function TechnicalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
