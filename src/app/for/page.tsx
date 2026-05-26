import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

const OG = ogImage({
  title: "Every paper mill. Configured right.",
  subtitle: "Kraft · Tissue · Integrated · Newsprint · Board · Recycled — workflows tuned to your grade family.",
  tag: "By Mill Type",
  accent: "#F59E0B",
});

export const metadata: Metadata = {
  title: "ERP by Paper Mill Type | Kraft · Tissue · Newsprint · Board · Recycled",
  description:
    "Papyrus BPApp configured for every paper mill type — kraft, tissue, integrated, newsprint, board, and recycled. Mill-type-specific workflows, quality parameters, and customer profiles.",
  alternates: { canonical: "/for" },
  keywords: [
    "kraft paper mill ERP",
    "tissue mill software",
    "newsprint mill management",
    "paperboard ERP",
    "recycled paper mill",
    "integrated mill ERP",
  ],
  openGraph: {
    title: "ERP by Mill Type — Papyrus BPApp",
    description: "Configured for kraft, tissue, integrated, newsprint, board, and recycled mills.",
    url: "/for",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const MILL_TYPES = [
  {
    slug: "kraft-mill",
    name: "Kraft Mill",
    tagline: "BF/BS quality, packaging buyers, virgin + recycled furnish",
    desc: "Kraft liner + medium for packaging. BF/BS testing native, multi-grade slitting, COD/BOD compliance.",
    accent: "#F59E0B",
  },
  {
    slug: "tissue-mill",
    name: "Tissue Mill",
    tagline: "Soft furnish, converter customers, hygiene & specialty",
    desc: "Bath, facial, towel, napkin. Soft-touch grade tracking, sheet count math, converter-customer workflows.",
    accent: "#EC4899",
  },
  {
    slug: "integrated-mill",
    name: "Integrated Mill",
    tagline: "Pulping + papermaking + converting on one campus",
    desc: "Multi-PM scheduling, cross-PM pulp allocation, stock-prep linkage, plant-level OEE rollup.",
    accent: "#10B981",
  },
  {
    slug: "newsprint-mill",
    name: "Newsprint Mill",
    tagline: "High-speed PMs, DIP furnish, daily newspaper customers",
    desc: "Deinked pulp tracking, brightness control, reel-to-press delivery commits, contract pricing.",
    accent: "#3B82F6",
  },
  {
    slug: "board-mill",
    name: "Board / Paperboard Mill",
    tagline: "Multi-ply formers, food-grade compliance, FBB/SBS/CUK",
    desc: "Multi-ply BOM, GSM-by-layer, food-contact compliance, premium-grade quality control.",
    accent: "#A78BFA",
  },
  {
    slug: "recycled-mill",
    name: "Recycled / Waste-Paper Mill",
    tagline: "Waste-paper procurement, grade-wise pricing, RCM transport",
    desc: "Supplier scorecards by waste grade, quality at receipt, RCM on transport, MSME compliance.",
    accent: "#EF4444",
  },
];

export default function ForIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-12 px-6 max-w-[var(--container-max)] mx-auto">
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">By Mill Type</p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[1.0] mb-6">
          Every paper mill.<br />
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Configured right.
          </span>
        </h1>
        <p className="text-lg text-text-2 max-w-2xl leading-relaxed mb-8">
          Papyrus BPApp adapts to your mill type — kraft, tissue, integrated, newsprint, board, or
          recycled. Quality parameters, customer profiles, furnish handling, compliance — all tuned
          to the grade family you make.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-[var(--container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MILL_TYPES.map((m) => (
            <Link
              key={m.slug}
              href={`/for/${m.slug}`}
              className="group block bg-surface border rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
              style={{ borderColor: `${m.accent}25` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl border flex items-center justify-center"
                  style={{ background: `${m.accent}12`, borderColor: `${m.accent}40` }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.accent }} />
                </div>
                <ArrowRight size={16} className="text-text-4 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-amber-300 transition-colors">{m.name}</h3>
              <p className="text-xs font-mono mb-3" style={{ color: m.accent }}>{m.tagline}</p>
              <p className="text-sm text-text-2 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
