import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Wrench, Bug, Layers, ShieldCheck } from "lucide-react";
import { CHANGELOG, type ChangelogTag } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Latest releases, modules, and improvements shipped on Papyrus BPApp — ERP for Indian paper mills.",
  alternates: { canonical: "/changelog" },
};

const TAG_META: Record<ChangelogTag, { label: string; color: string; Icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  feature: { label: "Feature", color: "text-amber-300 bg-amber-500/15 border-amber-500/30", Icon: Sparkles },
  improvement: { label: "Improvement", color: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30", Icon: Wrench },
  fix: { label: "Fix", color: "text-rose-300 bg-rose-500/15 border-rose-500/30", Icon: Bug },
  module: { label: "Module", color: "text-violet-300 bg-violet-500/15 border-violet-500/30", Icon: Layers },
  compliance: { label: "Compliance", color: "text-sky-300 bg-sky-500/15 border-sky-500/30", Icon: ShieldCheck },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">Changelog</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            What&apos;s new in Papyrus BPApp
          </h1>
          <p className="text-lg text-text-2 leading-relaxed">
            New modules, improvements, and compliance updates — shipped every few weeks.
          </p>
        </header>

        <ol className="relative border-l border-border-dim ml-3 space-y-10">
          {CHANGELOG.map((entry) => (
            <li key={entry.date + entry.title} className="ml-6">
              <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-background" />

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <time className="text-xs font-mono text-text-3">{fmtDate(entry.date)}</time>
                {entry.version && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded border border-border text-text-2">
                    v{entry.version}
                  </span>
                )}
                {entry.tags.map((t) => {
                  const m = TAG_META[t];
                  const Icon = m.Icon;
                  return (
                    <span key={t} className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border ${m.color}`}>
                      <Icon size={10} />
                      {m.label}
                    </span>
                  );
                })}
              </div>

              <h2 className="text-xl font-bold text-foreground mb-2">{entry.title}</h2>
              <p className="text-sm text-text-2 leading-relaxed mb-3">{entry.summary}</p>

              {entry.highlights && (
                <ul className="space-y-1.5 mb-2">
                  {entry.highlights.map((h) => (
                    <li key={h} className="text-sm text-text-3 flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-16 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">See it live</h2>
          <p className="text-text-2 mb-6 max-w-lg mx-auto">
            Want a walkthrough of the latest features for your mill? Book a tailored demo.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
