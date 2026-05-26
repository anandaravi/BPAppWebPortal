import Link from "next/link";
import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";

export type MillTypePageData = {
  millType: string;
  slug: string;
  hook: string;
  intro: string;
  pains: { title: string; desc: string }[];
  solutions: { title: string; desc: string; module?: string }[];
  caseSnapshot?: { headline: string; metric: string; desc: string };
  relevantModules: { name: string; slug: string; why: string }[];
  faqs: { q: string; a: string }[];
};

export function MillTypePage({ data }: { data: MillTypePageData }) {
  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-24">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "For", url: "/customers" },
            { name: data.millType, url: `/for/${data.slug}` },
          ]),
          faqSchema(data.faqs),
        ]}
      />

      <article className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <header className="mb-14">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            ERP for {data.millType}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            {data.hook}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">{data.intro}</p>
        </header>

        {/* Pain points */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">
            The daily pain in {data.millType.toLowerCase()}s
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.pains.map((p, i) => (
              <div key={i} className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-6">
                <AlertTriangle size={18} className="text-amber-400 mb-3" />
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">
            How Papyrus BPApp solves it
          </h2>
          <div className="space-y-3">
            {data.solutions.map((s, i) => (
              <div key={i} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
                    {s.module && (
                      <Link
                        href={`/product/${s.module}`}
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-2 font-medium"
                      >
                        See the module →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case snapshot */}
        {data.caseSnapshot && (
          <section className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-8 mb-14">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              Real outcome
            </p>
            <p className="text-3xl md:text-4xl font-black text-white mb-3">
              {data.caseSnapshot.metric}
            </p>
            <p className="text-white font-semibold mb-2">{data.caseSnapshot.headline}</p>
            <p className="text-sm text-zinc-400 leading-relaxed">{data.caseSnapshot.desc}</p>
          </section>
        )}

        {/* Relevant modules */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">
            Most relevant modules for {data.millType.toLowerCase()}s
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {data.relevantModules.map((m, i) => (
              <Link
                key={i}
                href={`/product/${m.slug}`}
                className="group bg-[#0f0f0f] border border-[#222] hover:border-amber-500/30 rounded-2xl p-5 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold group-hover:text-amber-300 transition-colors">
                    {m.name}
                  </h3>
                  <ArrowRight size={14} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{m.why}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-[#0f0f0f] border border-[#222] rounded-xl p-5 open:border-amber-500/30 transition-colors"
              >
                <summary className="cursor-pointer text-white font-semibold text-base flex items-center justify-between">
                  {f.q}
                  <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Built specifically for {data.millType.toLowerCase()}s
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Book a demo tailored to your mill type. We'll show you the exact workflows
            and modules that match your operations.
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
