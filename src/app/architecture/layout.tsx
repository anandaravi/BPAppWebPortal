import type { Metadata } from "next";
import { ogImage } from "@/lib/og";


const OG = ogImage({
  title: "Built for paper. Engineered for scale.",
  subtitle: "Cloud-native multi-tenant architecture. 45 modules, REST APIs, event-driven, audit-ready.",
  tag: "Architecture",
  accent: "#60A5FA",
});
export const metadata: Metadata = {
  title: "Architecture | Modular Paper Mill ERP Platform",
  description: "Papyrus BPApp is built on a modular, API-first, multi-tenant architecture. Activate Sales, Procurement, Inventory, Finance on Day 1 — add Production, Deckle, AI, IoT as you grow. Event-driven, horizontally scalable.",
  alternates: { canonical: "/architecture" },
  openGraph: {
    title: "Papyrus BPApp Architecture — Modular, API-First, Multi-Tenant",
    description: "Day 1 to full mill: how the platform scales with you.",
    url: "/architecture",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
