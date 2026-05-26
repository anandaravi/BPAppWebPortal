import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { CapabilityDetail, getCapabilityBlurb, getProcessFlow, getCapabilityFeatures, getRelatedCapabilities, slugify } from "@/lib/modules/capability-helpers";
import { getIcon } from "@/lib/icons";

export function CapabilityDetailTemplate({ detail }: { detail: CapabilityDetail }) {
  const { module, capability } = detail;
  const Icon = getIcon(capability.icon);
  const accent = module.accent;
  const blurb = getCapabilityBlurb(capability, module);
  const flow = getProcessFlow(capability);
  const features = getCapabilityFeatures(capability, module);
  const related = getRelatedCapabilities(detail);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={module.photo} alt={module.tag} fill className="object-cover opacity-25" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-32 pb-16">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
            <Link href="/product" className="hover:text-amber-400 transition-colors">Product</Link>
            <ChevronRight size={12} />
            <Link href={`/product/${module.slug}`} className="hover:text-amber-400 transition-colors" style={{ color: accent }}>{module.name}</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-400">{capability.title}</span>
          </nav>

          <div>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center border flex-shrink-0"
                style={{ background: `${accent}12`, borderColor: `${accent}40` }}>
                <Icon size={24} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>
                  {module.tag} · Capability
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                  {capability.title}
                </h1>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-10">{blurb}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
                Request a Demo <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href={`/product/${module.slug}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all">
                <ArrowLeft size={14} /> Back to {module.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS FLOW */}
      <section className="py-16 border-y border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Process Flow</p>
          <h2 className="text-3xl font-black text-white tracking-tight mb-10">How it works.</h2>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              {flow.map((step, i) => (
                <div key={`${i}-${step.label}`} className="flex items-center gap-3">
                  <div
                    className="min-w-[140px] rounded-xl border px-4 py-3.5 flex flex-col items-center text-center"
                    style={{
                      background: i === Math.floor(flow.length / 2) ? `${accent}15` : "#161616",
                      borderColor: i === Math.floor(flow.length / 2) ? `${accent}40` : "#262626",
                    }}>
                    <span className="text-[10px] font-mono text-zinc-500 mb-1">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-bold text-white">{step.label}</span>
                    {step.sub && <span className="text-[10px] text-zinc-500 mt-0.5 font-mono">{step.sub}</span>}
                  </div>
                  {i < flow.length - 1 && (
                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="text-zinc-700 flex-shrink-0">
                      <path d="M0 7 H 16 M 12 1 L 16 7 L 12 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Key Features</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5">What you get.</h2>
              <p className="text-zinc-400 leading-relaxed">
                Every feature is purpose-built, fully integrated, and audit-ready. No bolt-ons or compromises.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={`${i}-${f.slice(0, 40)}`}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 flex items-start gap-3 hover:border-amber-500/20 transition-colors">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-sm text-zinc-300">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL MOCKUP */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>In the Product</p>
          <h2 className="text-3xl font-black text-white tracking-tight mb-10">How it looks.</h2>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1f1f1f] bg-[#0a0a0a]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-zinc-500 ml-2 font-mono">Papyrus BPApp · {capability.title}</span>
              <span className="ml-auto text-xs text-zinc-600 font-mono">{module.slug}/{slugify(capability.title)}</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#080808] rounded-xl border border-[#1f1f1f] p-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Status</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
                  <p className="text-sm font-bold text-white">Active</p>
                </div>
                <p className="text-[10px] text-zinc-500">Last activity 2 min ago</p>
              </div>

              <div className="bg-[#080808] rounded-xl border border-[#1f1f1f] p-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Today</p>
                <p className="text-2xl font-black font-mono text-white">142</p>
                <p className="text-[10px] mt-1" style={{ color: accent }}>↑ 12% vs yesterday</p>
              </div>

              <div className="bg-[#080808] rounded-xl border border-[#1f1f1f] p-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">SLA</p>
                <p className="text-2xl font-black font-mono text-white">98.7%</p>
                <p className="text-[10px] text-emerald-400 mt-1">Within target</p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-[#080808] rounded-xl border border-[#1f1f1f] p-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 font-semibold">Recent Activity</p>
                <div className="space-y-2">
                  {flow.map((step, i) => (
                    <div key={`act-${i}`} className="flex items-center gap-3 py-1.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono"
                        style={{ background: i === 0 ? `${accent}25` : "#161616", color: i === 0 ? accent : "#71717a" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="text-xs text-zinc-300 flex-1">{step.label}</span>
                      <span className="text-[10px] text-zinc-600 font-mono">{step.sub}</span>
                      <span className="text-[10px] text-zinc-600 font-mono">{i === 0 ? "now" : `${i * 2}m ago`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED CAPABILITIES */}
      {related.length > 0 && (
        <section className="py-20 border-b border-[#1a1a1a]">
          <div className="max-w-[var(--container-max)] mx-auto px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Related in {module.name}</p>
            <h2 className="text-3xl font-black text-white tracking-tight mb-10">More capabilities.</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((r, i) => {
                const RIcon = getIcon(r.icon);
                return (
                  <div key={`rel-${i}-${r.slug}`}>
                    <Link href={`/product/${module.slug}/${r.slug}`}
                      className="block bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 hover:border-amber-500/30 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                          <RIcon size={14} style={{ color: accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">{r.title}</p>
                        </div>
                        <ArrowRight size={12} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Get Started</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">See {capability.title} in your mill.</h2>
          <p className="text-zinc-400 mb-8">
            Book a demo focused on {module.name}. We&apos;ll walk through {capability.title.toLowerCase()} and the connected workflows.
          </p>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
            Request a Demo <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
