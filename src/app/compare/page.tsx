import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scissors, Factory, Globe } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

const OG = ogImage({
  title: "13 alternatives. One honest comparison.",
  subtitle: "Papyrus BPApp vs Greycon, SAP, Oracle, Tally + 10 more — side by side.",
  tag: "Compare",
  accent: "#F59E0B",
});

export const metadata: Metadata = {
  title: "Compare Papyrus BPApp | vs Greycon, SAP, Oracle, Tally + 10 more",
  description:
    "Side-by-side comparisons of Papyrus BPApp against 13 alternatives — paper-mill specialists (Greycon, Optivision, SAP Mill Products, Dataman, ProcessPro), Indian SMB ERPs (Tally, Marg), and global ERP platforms (SAP B1, NetSuite, Oracle JDE, Infor, Microsoft Dynamics, Epicor).",
  alternates: { canonical: "/compare" },
  keywords: [
    "paper mill ERP comparison",
    "Greycon alternative",
    "SAP Mill Products alternative",
    "Tally vs ERP",
    "paper mill software comparison",
    "Indian paper ERP comparison",
  ],
  openGraph: {
    title: "Compare Papyrus BPApp — 13 alternatives, side by side",
    description: "Paper-mill specialists, Indian SMB ERPs, and global platforms — compared against Papyrus BPApp.",
    url: "/compare",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

type Competitor = {
  slug: string;
  name: string;
  tagline: string;
};

const PAPER_MILL: Competitor[] = [
  { slug: "greycon", name: "Greycon", tagline: "Global trim optimization specialist" },
  { slug: "optivision", name: "Optivision", tagline: "Enterprise paper mill MES (Honeywell)" },
  { slug: "sap-mill-products", name: "SAP Mill Products", tagline: "Enterprise-scale global ERP" },
  { slug: "dataman", name: "Dataman", tagline: "European paper mill execution specialist" },
  { slug: "processpro", name: "ProcessPro", tagline: "Process manufacturing ERP" },
];

const INDIAN_SMB: Competitor[] = [
  { slug: "tally", name: "Tally", tagline: "India's most popular accounting software" },
  { slug: "marg", name: "Marg", tagline: "Popular Indian SMB ERP — strong in trading/distribution" },
];

const GLOBAL_ERP: Competitor[] = [
  { slug: "sap-business-one", name: "SAP Business One", tagline: "SAP's SMB ERP suite" },
  { slug: "netsuite", name: "NetSuite", tagline: "Cloud ERP for SMB to mid-market" },
  { slug: "oracle-jde", name: "Oracle JDE", tagline: "Mid-large enterprise ERP" },
  { slug: "infor-ln", name: "Infor LN", tagline: "Mid-market manufacturing ERP" },
  { slug: "microsoft-dynamics", name: "Microsoft Dynamics 365", tagline: "Microsoft's cloud ERP platform" },
  { slug: "epicor", name: "Epicor", tagline: "Mid-market manufacturing ERP" },
];

const GROUPS = [
  {
    title: "Paper Mill Specialists",
    eyebrow: "Built for paper",
    desc: "Vendors purpose-built for paper manufacturing — deckle optimization, MES, and integrated production.",
    icon: Scissors,
    accent: "#EF4444",
    items: PAPER_MILL,
  },
  {
    title: "Indian SMB ERPs",
    eyebrow: "Strong in accounting",
    desc: "Indian accounting + lightweight ERP. Wide adoption but no paper-mill-specific operations layer.",
    icon: Factory,
    accent: "#F59E0B",
    items: INDIAN_SMB,
  },
  {
    title: "Global Enterprise ERPs",
    eyebrow: "Generic horizontal",
    desc: "Global ERP platforms requiring heavy customization for paper-mill operations and Indian compliance.",
    icon: Globe,
    accent: "#3B82F6",
    items: GLOBAL_ERP,
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="pt-32 pb-12 px-6 max-w-[var(--container-max)] mx-auto">
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">Compare</p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[1.0] mb-6">
          13 alternatives.<br />
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            One honest comparison.
          </span>
        </h1>
        <p className="text-lg text-text-2 max-w-2xl leading-relaxed mb-8">
          Side-by-side breakdowns of Papyrus BPApp against paper-mill specialists, Indian SMB ERPs,
          and global enterprise platforms. Feature parity, India-fit, deployment model, pricing
          shape — laid out without spin.
        </p>
        <div className="flex flex-wrap gap-3 text-xs font-mono">
          {[
            { label: "5 paper-mill specialists", color: "#EF4444" },
            { label: "2 Indian SMB ERPs", color: "#F59E0B" },
            { label: "6 global ERPs", color: "#3B82F6" },
          ].map((t) => (
            <span key={t.label} className="px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${t.color}40`, background: `${t.color}10`, color: t.color }}>
              {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* GROUPS */}
      <section className="pb-24 px-6 max-w-[var(--container-max)] mx-auto space-y-16">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.title}>
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-border-dim">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0"
                  style={{ background: `${g.accent}12`, borderColor: `${g.accent}40` }}>
                  <Icon size={20} style={{ color: g.accent }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: g.accent }}>
                    {g.eyebrow}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">{g.title}</h2>
                  <p className="text-text-2 text-sm leading-relaxed max-w-3xl">{g.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/vs/${c.slug}`}
                    className="group block bg-surface border border-border-dim rounded-2xl p-5 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: g.accent }}>
                          vs · /{c.slug}
                        </p>
                        <h3 className="text-xl font-black text-foreground group-hover:text-amber-300 transition-colors">
                          {c.name}
                        </h3>
                      </div>
                      <ArrowRight size={16} className="text-text-4 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-text-2 leading-relaxed">{c.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <CTABanner />
    </div>
  );
}
