import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";

export type ArticleData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  author?: string;
  body: string;
  tags?: string[];
};

function renderBody(md: string) {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      out.push(
        <h2 key={key++} className="text-2xl font-bold text-foreground mt-12 mb-4 leading-tight">
          {line.slice(3)}
        </h2>,
      );
      i++;
    } else if (line.startsWith("### ")) {
      out.push(
        <h3 key={key++} className="text-xl font-bold text-foreground mt-8 mb-3 leading-tight">
          {line.slice(4)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("> ")) {
      out.push(
        <blockquote
          key={key++}
          className="border-l-3 border-amber-500/60 pl-5 my-6 text-text-2 italic"
        >
          {line.slice(2)}
        </blockquote>,
      );
      i++;
    } else if (
      line.trim().startsWith("|") &&
      line.trim().endsWith("|") &&
      i + 1 < lines.length &&
      /^\s*\|?[\s:|-]+\|[\s:|-]+\|?\s*$/.test(lines[i + 1])
    ) {
      const parseRow = (l: string) =>
        l
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
      const headers = parseRow(line);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        rows.push(parseRow(lines[i]));
        i++;
      }
      out.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-border-dim">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface">
                {headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left text-[11px] font-bold uppercase tracking-widest text-amber-400 px-4 py-3 border-b border-border-dim"
                    dangerouslySetInnerHTML={{ __html: renderInline(h) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="hover:bg-[#0c0c0c] transition-colors">
                  {r.map((c, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2.5 text-text-2 border-b border-border-dim last:border-b-0 align-top leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderInline(c) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      out.push(
        <ul key={key++} className="space-y-2 my-5 ml-2">
          {items.map((it, j) => (
            <li key={j} className="flex gap-2.5 text-text-2 leading-relaxed">
              <span className="text-amber-500 mt-1">•</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(it) }} />
            </li>
          ))}
        </ul>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      out.push(
        <p
          key={key++}
          className="text-text-2 leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: renderInline(line) }}
        />,
      );
      i++;
    }
  }
  return out;
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-surface-3 px-1.5 py-0.5 rounded text-amber-300 text-sm">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline">$1</a>');
}

export function ArticlePage({ article }: { article: ArticleData }) {
  const articleSchema = {
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE.url}/bp_app.png`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author || SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/bp_app.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${article.slug}` },
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: article.title, url: `/blog/${article.slug}` },
          ]),
        ]}
      />

      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-text-3 hover:text-amber-400 mb-6 transition-colors"
        >
          ← Back to Blog
        </Link>

        <header className="mb-10">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-text-2 leading-relaxed mb-6">{article.subtitle}</p>
          <div className="flex items-center gap-4 text-xs text-text-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {article.readMinutes} min read
            </span>
          </div>
        </header>

        <div className="prose-paper">{renderBody(article.body)}</div>

        <section className="mt-16 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">
            See how Papyrus BPApp solves this
          </h2>
          <p className="text-text-2 mb-5 max-w-xl mx-auto">
            Book a demo tailored to your mill — we&apos;ll show you exactly the workflows discussed
            in this article.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo
            <ArrowRight size={14} />
          </Link>
        </section>
      </article>
    </div>
  );
}
