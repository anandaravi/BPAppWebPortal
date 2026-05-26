import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

const OG = ogImage({
  title: "Real paper mills. Real outcomes.",
  subtitle: "Case studies — trim waste reduction, GST close acceleration, OEE gains.",
  tag: "Case Studies",
  accent: "#F59E0B",
});

export const metadata: Metadata = {
  title: "Case Studies | Papyrus BPApp Customer Outcomes",
  description:
    "How Indian paper mills deployed Papyrus BPApp — trim waste reduction, OEE gains, GST close acceleration, real numbers from real mills.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Papyrus BPApp",
    description: "Outcomes from real Indian paper mills running Papyrus BPApp.",
    url: "/case-studies",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

export default function CaseStudiesIndex() {
  const published = Object.values(CASE_STUDIES).filter((c) => c.status === "published");

  return (
    <div className="min-h-screen bg-[#080808]">
      <section className="pt-32 pb-12 px-6 max-w-[1440px] mx-auto">
        <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Case Studies
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6">
          Real mills.<br />
          <span style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Real outcomes.
          </span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Numbers from Indian paper mills running Papyrus BPApp — trim waste cuts, OEE gains, GST
          close acceleration. No marketing fluff, just before/after metrics.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-[1440px] mx-auto">
        {published.length === 0 ? (
          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-12 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mb-5">
              <FileText size={20} className="text-amber-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3">Case studies launching soon.</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-6 leading-relaxed">
              We&apos;re publishing case studies from production deployments. In the meantime, see
              comparable benchmark numbers on the Deckle Optimizer page or talk to us about your
              mill profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/product/deckle"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all"
              >
                See Deckle benchmarks
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-all"
              >
                Request a demo <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {published.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group block bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    {c.millType} · {c.millSize} · {c.location}
                  </span>
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h2 className="text-xl font-black text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{c.subtitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.modules.slice(0, 4).map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTABanner />
    </div>
  );
}
