import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Quote, Calendar } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "@/lib/case-studies";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_STUDIES[slug];
  if (!c || c.status !== "published") return { title: "Case study not found" };
  const og = ogImage({
    title: c.title,
    subtitle: c.subtitle,
    tag: `${c.millType} · ${c.location}`,
    accent: "#F59E0B",
  });
  return {
    title: `${c.title} | Papyrus BPApp Case Study`,
    description: c.description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url: `/case-studies/${slug}`,
      images: [og],
      publishedTime: c.publishedAt,
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASE_STUDIES[slug];
  if (!c || c.status !== "published") notFound();

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Case Studies", url: "/case-studies" },
            { name: c.title, url: `/case-studies/${slug}` },
          ]),
        ]}
      />

      <article className="max-w-4xl mx-auto px-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-xs text-text-3 hover:text-amber-400 mb-6 transition-colors"
        >
          ← Back to Case Studies
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-5">
            {[c.millType, c.millSize, c.location].map((b) => (
              <span
                key={b}
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400"
              >
                {b}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
            {c.title}
          </h1>
          <p className="text-lg text-text-2 leading-relaxed mb-6">{c.subtitle}</p>
          <div className="flex items-center gap-4 text-xs text-text-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(c.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>Modules: {c.modules.join(" · ")}</span>
          </div>
        </header>

        {/* METRICS */}
        <section className="mb-12">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Before vs After
          </p>
          <div className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3 border-b border-border-dim bg-background text-[10px] uppercase tracking-widest font-semibold text-text-3">
              <span>Metric</span>
              <span className="text-center">Before</span>
              <span className="text-center">After</span>
              <span className="text-right">Delta</span>
            </div>
            {c.metrics.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-4 px-5 py-3 border-b border-border-dim last:border-0 items-center text-sm"
              >
                <span className="text-text-2">{m.label}</span>
                <span className="text-text-3 font-mono text-center">{m.before}</span>
                <span className="text-emerald-400 font-mono text-center font-bold">{m.after}</span>
                <span className="text-amber-400 font-mono text-right text-xs">{m.delta}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="mb-10">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-3">Challenge</p>
          <p className="text-text-2 leading-relaxed text-base">{c.challenge}</p>
        </section>

        {/* APPROACH */}
        <section className="mb-10">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Approach</p>
          <p className="text-text-2 leading-relaxed text-base">{c.approach}</p>
        </section>

        {/* OUTCOME */}
        <section className="mb-10">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Outcome</p>
          <p className="text-text-2 leading-relaxed text-base">{c.outcome}</p>
        </section>

        {/* QUOTE */}
        {c.quote && (
          <section className="mb-12 bg-surface border-l-4 border-amber-500/60 rounded-r-2xl p-6 flex gap-4">
            <Quote size={20} className="text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-lg text-foreground italic leading-relaxed mb-3">
                &ldquo;{c.quote.text}&rdquo;
              </p>
              <p className="text-sm text-text-3 font-mono">— {c.quote.role}</p>
            </div>
          </section>
        )}

        {/* TIMELINE */}
        <section className="mb-12">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Implementation Timeline
          </p>
          <div className="space-y-3">
            {c.timeline.map((t, i) => (
              <div key={t.week} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface border-2 border-amber-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-amber-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="bg-surface border border-border-dim rounded-xl p-4 flex-1">
                  <p className="text-xs font-bold text-amber-400 font-mono mb-1">{t.week}</p>
                  <p className="text-sm text-text-2 leading-relaxed">{t.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULES TOUCHED */}
        <section className="mb-12">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Modules deployed
          </p>
          <div className="flex flex-wrap gap-2">
            {c.modules.map((m) => (
              <span
                key={m}
                className="text-sm px-3 py-1.5 rounded-full border border-border-dim bg-surface text-text-2"
              >
                {m}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">
            See similar outcomes for your mill
          </h2>
          <p className="text-text-2 mb-5 max-w-xl mx-auto">
            Book a demo tailored to your mill profile — we&apos;ll show you the exact modules used
            in this case study.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo <ArrowRight size={14} />
          </Link>
        </section>
      </article>

      <div className="mt-16">
        <CTABanner />
      </div>
    </div>
  );
}
