import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { CITIES, CITY_SLUGS } from "@/lib/cities";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { ogImage } from "@/lib/og";

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = CITIES[city];
  if (!c) return { title: "City not found" };
  const title = `Paper Mill ERP for ${c.name}, ${c.state} | Papyrus BPApp`;
  const desc = `ERP for paper mills in ${c.name}, ${c.state}. Built for the ${c.region} Indian paper cluster with deckle optimization, GST compliance, and AI. Trusted by ${c.estimatedMillCount}.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/erp-for-paper-mills/${city}` },
    keywords: [
      `paper mill ERP ${c.name}`,
      `paper mill software ${c.name}`,
      `${c.name} paper industry ERP`,
      `paper mill management software ${c.state}`,
      `ERP for paper mills in ${c.state}`,
      ...c.primaryGrades.map((g) => `${g} mill ERP ${c.name}`),
    ],
    openGraph: {
      title,
      description: desc,
      url: `/erp-for-paper-mills/${city}`,
      images: [
        ogImage({
          title: `ERP for ${c.name} Paper Mills`,
          subtitle: `${c.region} Indian paper cluster · ${c.primaryGrades.slice(0, 3).join(", ")}`,
          tag: c.state,
          accent: "#10B981",
        }),
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        ogImage({
          title: `ERP for ${c.name} Paper Mills`,
          subtitle: `${c.region} Indian paper cluster · ${c.primaryGrades.slice(0, 3).join(", ")}`,
          tag: c.state,
          accent: "#10B981",
        }),
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = CITIES[city];
  if (!c) notFound();

  const faqs = [
    {
      q: `Why is Papyrus BPApp a good fit for paper mills in ${c.name}?`,
      a: `${c.name} mills primarily produce ${c.primaryGrades.join(", ")}. Papyrus BPApp's data model handles these grades natively — paper-specific quality parameters (GSM, BF, BS, brightness, moisture, cobb), parent reel genealogy, deckle plans tailored to corrugator widths, and integrated GST-compliant invoicing. The platform is built in India for Indian mills, with INR pricing and IST-based support.`,
    },
    {
      q: `How long does implementation take for a typical mill in ${c.name}?`,
      a: `4–12 weeks depending on mill complexity. A typical small-to-mid mill in ${c.region} India with 1–2 paper machines goes live in 4–6 weeks: Week 1–2 for masters and finance, Week 3–4 for production and deckle, Week 5–6 for quality and dispatch. Larger multi-machine integrated mills take 8–12 weeks.`,
    },
    {
      q: `Do you have on-site support availability in ${c.name}?`,
      a: `Yes. We provide remote and on-site implementation across all major Indian paper hubs. ${c.name} is well-connected and we coordinate visits during go-live phases. Ongoing support is via cloud-based platform with IST hours team — no on-prem servers to maintain on your end.`,
    },
    {
      q: `What about GST compliance specific to ${c.state}?`,
      a: `Papyrus BPApp handles all Indian GST compliance natively: GSTR-1, GSTR-3B, e-invoice with IRN, e-way bill generation, RCM on transport, ITC reconciliation. State-specific quirks (Maharashtra octroi history, ${c.state} PT slab variations, GST audit requirements) are configured during onboarding.`,
    },
    {
      q: `Can the deckle optimizer recover trim losses for our specific grades in ${c.name}?`,
      a: `Yes. The 3-tier Deckle Optimizer handles ${c.primaryGrades.join(", ")} with full grade-specific constraints (machine deckle range, GSM/BF/BS specs, customer pocket widths, corrugator buyer requirements common in the ${c.region} market). Real Indian mills running these grades typically see trim drop from 8%+ to under 3.5% within 3 months.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Paper Mill ERP by City", url: "/erp-for-paper-mills" },
            { name: c.name, url: `/erp-for-paper-mills/${c.slug}` },
          ]),
          faqSchema(faqs),
          {
            "@type": "LocalBusiness",
            name: `${SITE.name} — Paper Mill ERP in ${c.name}`,
            description: `Cloud ERP for paper mills in ${c.name}, ${c.state}`,
            areaServed: { "@type": "City", name: c.name, containedIn: { "@type": "State", name: c.state } },
            url: `${SITE.url}/erp-for-paper-mills/${c.slug}`,
          },
        ]}
      />

      <div className="min-h-screen bg-background pt-28 pb-24">
        <article className="max-w-5xl mx-auto px-6">
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-6 tracking-wide uppercase">
              <MapPin size={12} />
              {c.region} India · {c.state}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4 leading-tight">
              Paper Mill ERP for <span className="amber-text">{c.name}</span>
            </h1>
            <p className="text-lg text-text-2 leading-relaxed max-w-3xl">
              {c.millProfile}
            </p>
          </header>

          {/* Cluster snapshot */}
          <section className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-surface border border-border rounded-2xl p-5">
              <p className="text-xs text-text-3 uppercase tracking-wider font-semibold mb-2">
                Cluster Size
              </p>
              <p className="text-foreground font-bold text-base leading-tight">
                {c.estimatedMillCount}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-5">
              <p className="text-xs text-text-3 uppercase tracking-wider font-semibold mb-2">
                Primary Grades
              </p>
              <p className="text-foreground font-bold text-sm leading-tight">
                {c.primaryGrades.slice(0, 2).join(", ")}
                {c.primaryGrades.length > 2 && ` +${c.primaryGrades.length - 2}`}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-5">
              <p className="text-xs text-text-3 uppercase tracking-wider font-semibold mb-2">
                State
              </p>
              <p className="text-foreground font-bold text-base leading-tight">{c.state}</p>
            </div>
          </section>

          {/* Industry context */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The {c.name} paper industry
            </h2>
            <p className="text-text-2 leading-relaxed mb-4">{c.industryNote}</p>
            <p className="text-text-2 leading-relaxed">
              {c.name} mills face the operational realities every Indian paper manufacturer
              faces: tight margins, GST compliance burden, multi-customer deckle planning,
              quality consistency for FMCG and packaging buyers, payroll for shift workers
              with full statutory compliance. Papyrus BPApp consolidates all of this into one
              cloud platform purpose-built for Indian paper mills.
            </p>
          </section>

          {/* Why Papyrus BPApp for this city */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Why Papyrus BPApp fits {c.name} mills
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FitCard
                title="Built for your grades"
                desc={`Native handling of ${c.primaryGrades.join(", ")} with grade-specific quality parameters, customer specs, and pricing.`}
              />
              <FitCard
                title="Deckle optimization for your buyers"
                desc={`3-tier Deckle Optimizer trained on Indian corrugator widths and customer pocket combinations common in ${c.region} India.`}
              />
              <FitCard
                title="GST + e-invoice native"
                desc={`Full Indian compliance: GSTR-1/3B/9, IRN, e-way bill, RCM, ITC reconciliation. State-specific PT and LWF handled.`}
              />
              <FitCard
                title="Indian payroll at mill scale"
                desc={`PF, ESI, ${c.state} PT, LWF, shift workers, contract labour — all configured for the regulatory reality of ${c.state}.`}
              />
              <FitCard
                title="Cloud-native, no servers"
                desc={`Multi-tenant SaaS on Indian data centres (or your preferred region). No on-prem hardware to manage in ${c.name}.`}
              />
              <FitCard
                title="INR pricing, India support"
                desc={`Transparent INR pricing. No FX exposure. Implementation and support team operating in IST hours.`}
              />
            </div>
          </section>

          {/* Trust modules */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Most-used modules in {c.region} India mills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Deckle Optimizer", slug: "deckle" },
                { name: "Production Planning", slug: "production" },
                { name: "Quality Management", slug: "quality" },
                { name: "Finance & GST", slug: "finance" },
                { name: "HR & Payroll", slug: "hr" },
                { name: "Sales", slug: "sales" },
              ].map((m) => (
                <Link
                  key={m.slug}
                  href={`/product/${m.slug}`}
                  className="group bg-surface border border-border hover:border-amber-500/30 rounded-xl p-4 transition-colors"
                >
                  <p className="text-sm font-bold text-foreground group-hover:text-amber-300 transition-colors">
                    {m.name}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              href="/product"
              className="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 mt-4 font-medium"
            >
              See all 44 modules →
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Common questions from {c.name} mills
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
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
              See Papyrus BPApp for your {c.name} mill
            </h2>
            <p className="text-text-2 mb-6 max-w-xl mx-auto">
              Book a personalized demo. We&apos;ll walk through workflows tailored to{" "}
              {c.primaryGrades[0].toLowerCase()} mills in {c.region} India.
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

function FitCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <Check size={16} className="text-amber-400 mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-foreground font-bold mb-1.5 text-base">{title}</h3>
          <p className="text-sm text-text-2 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
