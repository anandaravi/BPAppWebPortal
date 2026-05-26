import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ARTICLES } from "@/lib/blog/articles";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Blog | Paper Mill ERP, Deckle Optimization, GST Compliance Articles",
  description:
    "Practical articles for Indian paper manufacturers — trim waste reduction, GST compliance, ERP selection, deckle optimization, production planning, and more.",
  alternates: { canonical: "/blog" },
  keywords: [
    "paper mill blog",
    "deckle optimization articles",
    "GST compliance paper industry",
    "paper manufacturing tips India",
    "ERP for paper mill",
  ],
  openGraph: {
    title: "Papyrus BPApp Blog — Paper Mill Insights",
    description: "Practical articles for Indian paper manufacturers.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const articles = Object.values(ARTICLES).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      <article className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Insights for Indian paper manufacturers
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Practical articles on deckle optimization, GST compliance, production planning,
            ERP selection, and the operational realities of running an Indian paper mill.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group bg-[#0f0f0f] border border-[#222] hover:border-amber-500/30 rounded-2xl p-6 transition-colors flex flex-col"
            >
              {a.tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-tight">
                {a.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">{a.subtitle}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={11} />
                    {new Date(a.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={11} />
                    {a.readMinutes} min
                  </span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
