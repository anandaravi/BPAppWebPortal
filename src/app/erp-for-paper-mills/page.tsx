import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { CITIES, CITY_SLUGS } from "@/lib/cities";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Paper Mill ERP by City | Papyrus BPApp — India's Paper Hubs",
  description:
    "Paper mill ERP serving every major Indian paper manufacturing cluster: Vapi, Coimbatore, Hoshiarpur, Khanna, Yamunanagar, Kashipur, Saharanpur, Muzaffarnagar, and more.",
  alternates: { canonical: "/erp-for-paper-mills" },
  keywords: [
    "paper mill ERP India",
    "paper mill software by city",
    "paper mill ERP cluster",
    "Indian paper mill hubs",
  ],
  openGraph: {
    title: "Paper Mill ERP — Every Indian Paper Hub",
    description: "ERP for paper mills across India's major manufacturing clusters.",
    url: "/erp-for-paper-mills",
  },
};

export default function Page() {
  const byRegion: Record<string, typeof CITY_SLUGS> = { North: [], South: [], East: [], West: [], Central: [] };
  for (const slug of CITY_SLUGS) {
    const c = CITIES[slug];
    byRegion[c.region].push(slug);
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Paper Mill ERP by City", url: "/erp-for-paper-mills" },
        ])}
      />
      <div className="min-h-screen bg-background pt-28 pb-24">
        <article className="max-w-6xl mx-auto px-6">
          <header className="mb-12">
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Local Coverage
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
              Paper Mill ERP across India
            </h1>
            <p className="text-lg text-text-2 max-w-3xl leading-relaxed">
              Papyrus BPApp serves paper mills in every major Indian manufacturing cluster.
              Find your city below to see paper industry context, primary grades, and how the
              platform fits your regional buyer base.
            </p>
          </header>

          {Object.entries(byRegion).map(([region, slugs]) => {
            if (slugs.length === 0) return null;
            return (
              <section key={region} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-5 bg-amber-500 rounded-full" />
                  <h2 className="text-xl font-bold text-foreground">{region} India</h2>
                  <span className="text-text-4 font-mono text-xs">{slugs.length} hubs</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {slugs.map((slug) => {
                    const c = CITIES[slug];
                    return (
                      <Link
                        key={slug}
                        href={`/erp-for-paper-mills/${slug}`}
                        className="group bg-surface border border-border hover:border-amber-500/30 rounded-xl p-5 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-foreground font-bold group-hover:text-amber-300 transition-colors text-base">
                              {c.name}
                            </p>
                            <p className="text-xs text-text-3 flex items-center gap-1 mt-0.5">
                              <MapPin size={10} />
                              {c.state}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-text-4 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
                          />
                        </div>
                        <p className="text-xs text-text-3 mt-2">
                          {c.estimatedMillCount}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className="mt-12 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Your city not listed?
            </h2>
            <p className="text-text-2 mb-6 max-w-xl mx-auto">
              We serve paper mills across India regardless of location. Book a demo and we&apos;ll
              tailor the conversation to your regional buyer base, grades, and compliance
              requirements.
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
    </>
  );
}
