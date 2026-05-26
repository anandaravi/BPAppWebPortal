import Link from "next/link";
import { ArrowRight, Check, X, Minus } from "lucide-react";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";

export type ComparisonRow = {
  feature: string;
  papyrus: string | true | false | "partial";
  competitor: string | true | false | "partial";
  note?: string;
};

export type ComparisonPageData = {
  competitor: string;
  competitorFull: string;
  competitorTagline: string;
  slug: string;
  intro: string;
  positioningPapyrus: string;
  positioningCompetitor: string;
  rows: ComparisonRow[];
  whenChooseCompetitor: string[];
  whenChoosePapyrus: string[];
  migration?: string;
  faqs: { q: string; a: string }[];
};

function Cell({ value }: { value: ComparisonRow["papyrus"] }) {
  if (value === true)
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
        <Check size={14} /> Yes
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-text-4 text-sm">
        <X size={14} /> No
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-medium">
        <Minus size={14} /> Partial
      </span>
    );
  return <span className="text-sm text-text-2">{value}</span>;
}

export function ComparisonPage({ data }: { data: ComparisonPageData }) {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare", url: "/vs" },
            { name: data.competitor, url: `/vs/${data.slug}` },
          ]),
          faqSchema(data.faqs),
        ]}
      />

      <article className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <header className="mb-14">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Comparison
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5 leading-tight">
            Papyrus BPApp <span className="text-text-3">vs</span>{" "}
            <span className="amber-text">{data.competitorFull}</span>
          </h1>
          <p className="text-lg text-text-2 leading-relaxed max-w-3xl">{data.intro}</p>
        </header>

        {/* Positioning */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              Papyrus BPApp
            </p>
            <h3 className="text-foreground font-bold mb-3">India-first, paper-first, integrated</h3>
            <p className="text-sm text-text-2 leading-relaxed">{data.positioningPapyrus}</p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-text-3 text-xs font-bold uppercase tracking-wider mb-2">
              {data.competitor}
            </p>
            <h3 className="text-foreground font-bold mb-3">{data.competitorTagline}</h3>
            <p className="text-sm text-text-2 leading-relaxed">{data.positioningCompetitor}</p>
          </div>
        </section>

        {/* Feature matrix */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-3">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-amber-400 w-44">
                    Papyrus BPApp
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-3 w-44">
                    {data.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border-dim last:border-b-0 ${i % 2 === 0 ? "bg-background" : "bg-background"}`}
                  >
                    <td className="px-4 py-3 text-sm text-foreground font-medium">
                      {r.feature}
                      {r.note && (
                        <span className="block text-xs text-text-4 mt-0.5 font-normal">{r.note}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Cell value={r.papyrus} />
                    </td>
                    <td className="px-4 py-3">
                      <Cell value={r.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose */}
        <section className="grid md:grid-cols-2 gap-4 mb-14">
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-text-3 text-xs font-bold uppercase tracking-wider mb-3">
              When to choose {data.competitor}
            </p>
            <ul className="space-y-2.5">
              {data.whenChooseCompetitor.map((it, i) => (
                <li key={i} className="text-sm text-text-2 leading-relaxed flex gap-2.5">
                  <span className="text-text-4 mt-1">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              When Papyrus BPApp wins
            </p>
            <ul className="space-y-2.5">
              {data.whenChoosePapyrus.map((it, i) => (
                <li key={i} className="text-sm text-foreground leading-relaxed flex gap-2.5">
                  <Check size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {data.migration && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Migrating from {data.competitor}
            </h2>
            <p className="text-text-2 leading-relaxed">{data.migration}</p>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-surface border border-border rounded-xl p-5 open:border-amber-500/30 transition-colors"
              >
                <summary className="cursor-pointer text-foreground font-semibold text-base flex items-center justify-between">
                  {f.q}
                  <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-text-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            See Papyrus BPApp on your own data
          </h2>
          <p className="text-text-2 mb-6 max-w-xl mx-auto">
            Book a personalized demo. We&apos;ll walk through the modules most relevant to your mill —
            and show you exactly how it stacks up against {data.competitor}.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo
            <ArrowRight size={14} />
          </Link>
        </section>
      </article>
    </div>
  );
}
