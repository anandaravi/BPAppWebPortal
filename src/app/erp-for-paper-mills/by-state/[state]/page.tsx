import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { STATES, STATE_SLUGS } from "@/lib/states";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = STATES[state];
  if (!s) return { title: "State not found" };
  const title = `ERP for Paper Mills in ${s.name} | ${s.cities.length} City Hub${s.cities.length > 1 ? "s" : ""}`;
  const desc = `Paper mill ERP across ${s.name} (${s.region} India) — covering ${s.cities.map((c) => c.name).join(", ")}. Grades: ${s.grades.slice(0, 4).join(", ")}. Deckle optimization, GST, payroll, AI.`;
  const og = ogImage({
    title: `ERP for ${s.name} Paper Mills`,
    subtitle: `${s.cities.length} hub${s.cities.length > 1 ? "s" : ""} · ${s.region} India · ${s.grades.slice(0, 3).join(", ")}`,
    tag: s.region,
    accent: "#10B981",
  });
  return {
    title,
    description: desc,
    alternates: { canonical: `/erp-for-paper-mills/by-state/${state}` },
    keywords: [
      `paper mill ERP ${s.name}`,
      `paper mill software ${s.name}`,
      `${s.name} paper industry ERP`,
      `paper manufacturing software ${s.name}`,
      ...s.grades.map((g) => `${g} mill ERP ${s.name}`),
    ],
    openGraph: {
      title,
      description: desc,
      url: `/erp-for-paper-mills/by-state/${state}`,
      images: [og],
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = STATES[state];
  if (!s) notFound();

  return (
    <div className="min-h-screen bg-[#080808]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "ERP for Paper Mills", url: "/erp-for-paper-mills" },
            { name: s.name, url: `/erp-for-paper-mills/by-state/${state}` },
          ]),
        ]}
      />

      <section className="pt-32 pb-12 px-6 max-w-[1440px] mx-auto">
        <Link
          href="/erp-for-paper-mills"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 mb-6 transition-colors"
        >
          ← Back to All Locations
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <MapPin size={12} /> {s.region} India · {s.name}
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
          ERP for Paper Mills<br />
          <span style={{ background: "linear-gradient(135deg, #10B981, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            across {s.name}.
          </span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          Papyrus BPApp serves paper mill clusters across {s.name} — {s.cities.length} known hub
          {s.cities.length > 1 ? "s" : ""} producing {s.grades.slice(0, 4).join(", ")} and more.
          Deployed cloud-native with INR pricing, GST compliance, and India-based support.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mb-12">
          {[
            { value: s.cities.length.toString(), label: "Mill hubs covered", color: "#10B981" },
            { value: s.grades.length.toString(), label: "Grade families", color: "#34D399" },
            { value: s.region, label: "Region", color: "#6EE7B7" },
            { value: "₹4–12L+", label: "Annual cost", color: "#A7F3D0" },
          ].map((m) => (
            <div key={m.label} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-2xl font-black font-mono mb-1" style={{ color: m.color }}>
                {m.value}
              </p>
              <p className="text-xs text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 px-6 max-w-[1440px] mx-auto">
        <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">
          Paper mill hubs in {s.name}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-10">
          {s.cities.length} cluster{s.cities.length > 1 ? "s" : ""}, one platform.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.cities.map((c) => (
            <Link
              key={c.slug}
              href={`/erp-for-paper-mills/${c.slug}`}
              className="group block bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1">
                    /{c.slug}
                  </p>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {c.name}
                  </h3>
                </div>
                <ArrowRight
                  size={16}
                  className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                />
              </div>
              <p className="text-[11px] text-zinc-500 font-mono mb-3">{c.estimatedMillCount}</p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-3">
                {c.millProfile}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.primaryGrades.slice(0, 3).map((g) => (
                  <span
                    key={g}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-20 px-6 max-w-[1440px] mx-auto">
        <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">
          Grades served
        </p>
        <h2 className="text-3xl font-black text-white tracking-tight mb-8">
          Built for {s.name}&apos;s grade mix.
        </h2>
        <div className="flex flex-wrap gap-2">
          {s.grades.map((g) => (
            <span
              key={g}
              className="px-3 py-1.5 rounded-full border border-[#1f1f1f] bg-[#0f0f0f] text-zinc-300 text-sm"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
