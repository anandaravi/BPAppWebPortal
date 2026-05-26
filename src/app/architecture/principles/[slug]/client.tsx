"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { PRINCIPLES, PRINCIPLE_SLUGS } from "@/lib/principles-data";
import { getIcon } from "@/lib/icons";
import { CTABanner } from "@/components/sections/cta-banner";

export function PrincipleDetailClient({ slug }: { slug: string }) {
  const p = PRINCIPLES[slug];
  if (!p) return null;

  const Icon = getIcon(p.iconName);
  const idx = PRINCIPLE_SLUGS.indexOf(slug);
  const prev = idx > 0 ? PRINCIPLES[PRINCIPLE_SLUGS[idx - 1]] : null;
  const next = idx < PRINCIPLE_SLUGS.length - 1 ? PRINCIPLES[PRINCIPLE_SLUGS[idx + 1]] : null;

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain min-h-[60vh]">
        <div className="absolute inset-0">
          <Image src={p.photo} alt={p.title} fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${p.accent}, transparent)` }} />

        <div className="relative max-w-[1440px] mx-auto px-6 pt-32 pb-20">
          <motion.nav initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
            <Link href="/architecture" className="hover:text-amber-400 transition-colors">Architecture</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-400">Principles</span>
            <ChevronRight size={12} />
            <span style={{ color: p.accent }}>{p.title}</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center border flex-shrink-0"
                style={{ background: `${p.accent}12`, borderColor: `${p.accent}40` }}>
                <Icon size={24} style={{ color: p.accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: p.accent }}>
                  Architecture Principle · {String(idx + 1).padStart(2, "0")} of {PRINCIPLE_SLUGS.length}
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                  {p.title}
                </h1>
              </div>
            </div>

            <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-10">{p.blurb}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
                Discuss with us <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/architecture" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all">
                <ArrowLeft size={14} /> Back to Architecture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IT MEANS */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: p.accent }}>What this means</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">In practice.</h2>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              {p.whatItMeans.map((m, i) => (
                <motion.div key={m}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                  <p className="text-sm text-zinc-300 leading-relaxed">{m}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: p.accent }}>How it works</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-12">Under the hood.</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {p.howItWorks.map((step, i) => (
                <motion.div key={step.step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                    style={{ borderColor: `${p.accent}60`, color: p.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 flex-1">
                    <h3 className="text-white font-bold text-sm mb-1.5">{step.step}</h3>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-5">Visual</p>

              {p.diagramType === "layers" && (
                <div className="space-y-2">
                  {["UI Surface", "API Layer", "Business Logic", "Module Schema", "Platform Foundation"].map((layer, i) => (
                    <motion.div key={layer}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="px-4 py-3 rounded-lg border text-center text-sm font-bold"
                      style={{
                        background: `${p.accent}${(25 - i * 4).toString(16).padStart(2, "0")}`,
                        borderColor: `${p.accent}50`,
                        color: "#fff",
                      }}>
                      {layer}
                    </motion.div>
                  ))}
                </div>
              )}

              {p.diagramType === "flow" && (
                <div className="space-y-1">
                  {["Trigger Event", "Validate + Auth", "Process", "Emit Event", "Subscribers React"].map((node, i) => (
                    <div key={node}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                        style={{ background: `${p.accent}10`, borderColor: `${p.accent}30` }}>
                        <span className="w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center"
                          style={{ background: p.accent, color: "#000" }}>
                          {i + 1}
                        </span>
                        <span className="text-sm text-white font-medium">{node}</span>
                      </motion.div>
                      {i < 4 && (
                        <div className="flex justify-center py-1">
                          <span className="text-zinc-700 font-mono text-xs">↓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {p.diagramType === "matrix" && (
                <div className="space-y-3">
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Tenant isolation matrix</p>
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                    <div className="text-center text-zinc-600 py-1"></div>
                    <div className="text-center text-zinc-300 py-1 font-bold">Tenant A</div>
                    <div className="text-center text-zinc-300 py-1 font-bold">Tenant B</div>
                    {["DB Schema", "API Auth", "RLS Policy", "Audit Log"].map((row) => (
                      <div key={row} className="contents">
                        <div className="text-zinc-400 py-2">{row}</div>
                        <div className="text-center py-2 rounded border bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold">✓ Isolated</div>
                        <div className="text-center py-2 rounded border bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold">✓ Isolated</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Same deployment, fully isolated data planes. No cross-tenant queries possible.
                  </p>
                </div>
              )}

              {p.diagramType === "scale" && (
                <div className="space-y-5">
                  {[
                    { label: "Small (1 plant)", count: 1 },
                    { label: "Medium (3 plants)", count: 3 },
                    { label: "Large (8 plants)", count: 8 },
                    { label: "Group (15+ plants)", count: 15 },
                  ].map((row, i) => (
                    <motion.div key={row.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-400">{row.label}</span>
                        <span className="font-mono" style={{ color: p.accent }}>{row.count} nodes</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(row.count, 15) }).map((_, j) => (
                          <div key={j} className="h-6 flex-1 rounded"
                            style={{ background: `${p.accent}40`, border: `1px solid ${p.accent}60` }} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-[#1f1f1f]">
                    Same architecture, same code, same data model. Just more nodes.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXAMPLE */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: p.accent }}>Real-World Example</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">{p.example.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="bg-[#0f0f0f] border border-red-500/20 rounded-2xl p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-3">Before</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{p.example.before}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#0f0f0f] border rounded-2xl p-6" style={{ borderColor: `${p.accent}40` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: p.accent }}>After</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{p.example.after}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/architecture/principles/${prev.slug}`}
              className="group bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 hover:border-amber-500/30 transition-colors">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 flex items-center gap-1">
                <ArrowLeft size={11} /> Previous principle
              </p>
              <p className="text-white font-bold text-base group-hover:text-amber-400 transition-colors">{prev.title}</p>
            </Link>
          ) : <div />}
          {next && (
            <Link href={`/architecture/principles/${next.slug}`}
              className="group bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 hover:border-amber-500/30 transition-colors text-right">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 flex items-center justify-end gap-1">
                Next principle <ArrowRight size={11} />
              </p>
              <p className="text-white font-bold text-base group-hover:text-amber-400 transition-colors">{next.title}</p>
            </Link>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
