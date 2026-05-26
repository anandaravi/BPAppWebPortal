"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Cog, Sparkles, Lock, GitMerge, RefreshCw, Zap, ShieldCheck, Server, Workflow } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const LAYERS = [
  {
    tier: "Layer 3",
    title: "Specialized Add-ons",
    desc: "Enable as needed. Each adds optional intelligence or interface — without changing your core operations.",
    color: "#F59E0B",
    modules: ["Deckle Optimizer", "AI & Analytics", "Automations", "Mobile Apps", "Projects", "Quality (Standalone)", "Maintenance"],
  },
  {
    tier: "Layer 2",
    title: "Core Operations",
    desc: "The business modules. Activate one or activate all. Each independently configurable per company and branch.",
    color: "#10B981",
    modules: ["Sales", "Procurement", "Production", "Inventory", "Finance & GST", "HR & Payroll", "Party Management", "Documents"],
  },
  {
    tier: "Layer 1",
    title: "Platform Foundation",
    desc: "Always on. Powers every module above. Multi-tenancy, security, audit, and integration are not bolt-ons — they are the bedrock.",
    color: "#A855F7",
    modules: ["Administration", "RBAC & Security", "Email Hub", "Notifications & Alerts", "Monitoring & Health", "Audit & Compliance"],
  },
];

const PRINCIPLES = [
  { slug: "modular-by-design", icon: Layers, title: "Modular by Design", desc: "Activate only the modules you need today. Add more as you grow. No code changes, no migration projects." },
  { slug: "api-first", icon: GitMerge, title: "API-First", desc: "Every module exposes REST + webhook APIs. Other modules consume them; external systems integrate the same way." },
  { slug: "multi-tenancy-native", icon: Lock, title: "Multi-tenancy Native", desc: "One deployment serves multiple companies, plants, and branches. Data isolation enforced at the query layer." },
  { slug: "audit-everywhere", icon: ShieldCheck, title: "Audit Everywhere", desc: "Every action, every state transition, every read — logged. Built once at the platform, inherited by every module." },
  { slug: "feature-toggles", icon: Cog, title: "Feature Toggles", desc: "Turn features on or off per company. Gradual rollout, A/B testing, emergency shutoff — all from the admin console." },
  { slug: "ai-ready", icon: Sparkles, title: "AI-Ready", desc: "Every module exposes data to the AI layer through structured contracts. New AI insights work day one across all modules." },
  { slug: "configurable-workflows", icon: RefreshCw, title: "Configurable Workflows", desc: "Approval matrix, escalation rules, document templates — all editable without deployments. Business changes don't need engineering." },
  { slug: "event-driven", icon: Zap, title: "Event-Driven", desc: "Events flow on a shared bus. Subscribe a workflow, alert, or integration to any business event without modifying source modules." },
  { slug: "horizontally-scalable", icon: Server, title: "Horizontally Scalable", desc: "Stateless services, queue-driven background jobs, Redis-cached lookups. Add capacity by adding nodes — never by re-architecting." },
];

const TIERS = [
  {
    name: "Starter",
    suited: "Small mills · 1 machine",
    color: "#10B981",
    includes: ["Platform Foundation (full)", "Sales · Procurement · Inventory", "Finance & GST", "Party Management"],
    skip: ["Deckle Optimizer", "AI Analytics", "Mobile Apps", "Advanced Automations"],
  },
  {
    name: "Growth",
    suited: "Medium mills · 2–4 machines",
    color: "#F59E0B",
    includes: ["Everything in Starter", "Production Planning (MPS/MRP/CRP)", "HR & Payroll", "Quality Control", "Mobile Apps · ESS/MSS"],
    skip: ["Deckle Optimizer", "Predictive AI", "RPA Automations"],
  },
  {
    name: "Enterprise",
    suited: "Large mills · 5+ machines",
    color: "#A855F7",
    includes: ["Everything in Growth", "Deckle Optimizer (3-tier)", "AI & Predictive Analytics", "Machine Maintenance", "Automations / RPA", "Project Management"],
    skip: ["—"],
  },
  {
    name: "Group",
    suited: "Multi-plant mill groups",
    color: "#EF4444",
    includes: ["Everything in Enterprise", "Multi-company consolidation", "Inter-company workflows", "Group-level analytics", "Custom integrations", "Dedicated CSM"],
    skip: ["—"],
  },
];

const SCALE_PATH = [
  { stage: "Day 1", title: "Start small", desc: "Activate Sales, Procurement, Inventory, Finance. Run your mill operations on Day 1 without re-implementing what you already have." },
  { stage: "Month 3", title: "Add HR & Payroll", desc: "Bring HR onto the platform. PF/ESI/TDS automation kicks in; payroll runs from the same system that runs your sales." },
  { stage: "Month 6", title: "Production planning", desc: "Switch on MPS/MRP/CRP. Capacity planning, work orders, and shop floor execution flow into the inventory and sales modules already running." },
  { stage: "Year 1", title: "Mobile + Quality", desc: "Roll out mobile apps for shop floor and field. Activate Quality Control with LIMS integration. ESS/MSS gives every employee self-service." },
  { stage: "Year 2", title: "AI & Optimization", desc: "Enable AI Analytics, Deckle Optimizer, and Predictive Maintenance. Same data, same workflows — now with intelligence layered on top." },
  { stage: "Beyond", title: "Group scale", desc: "Multi-plant consolidation. Inter-company workflows. Custom integrations. The same platform that started with 50 users now runs 5000." },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
            alt="Architecture" fill className="object-cover opacity-25" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Layers size={12} /> Pluggable Architecture
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 max-w-4xl">
            Built modular.<br /><span className="amber-text">Built to scale.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-2 max-w-2xl mb-10 leading-relaxed">
            Start with the modules you need today. Add more as you grow. No re-implementation,
            no data migration, no consulting weeks. The platform you choose at 50 users is the
            same platform that runs your group at 5000.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Discuss your scale <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/customers" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all">
              See who runs it →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3-LAYER ARCHITECTURE DIAGRAM */}
      <section className="py-24 border-y border-border-dim bg-background">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Architecture</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Three layers. One platform.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Specialized add-ons sit on top of core operations, which sit on top of platform foundation.
            Each layer independently configurable. Each module independently upgradable.
          </p>

          <div className="space-y-5">
            {LAYERS.map((layer, i) => (
              <motion.div key={layer.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border bg-surface overflow-hidden"
                style={{ borderColor: `${layer.color}30` }}>
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: layer.color }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-7 pl-9">
                  <div>
                    <p className="text-xs font-mono mb-2" style={{ color: layer.color }}>{layer.tier}</p>
                    <h3 className="text-2xl font-black text-foreground mb-2">{layer.title}</h3>
                    <p className="text-sm text-text-2 leading-relaxed">{layer.desc}</p>
                  </div>
                  <div className="lg:col-span-2 flex flex-wrap gap-2 items-start">
                    {layer.modules.map((m) => (
                      <span key={m}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                        style={{ background: `${layer.color}10`, borderColor: `${layer.color}30`, color: layer.color }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-3 text-xs text-text-4 font-mono">
            <span className="w-12 h-px bg-zinc-700" />
            Higher layers depend on lower. Lower layers know nothing of higher.
            <span className="w-12 h-px bg-zinc-700" />
          </motion.div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Core Principles</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-12">How modularity actually works.</h2>

          <p className="text-text-3 mb-12">Click any principle to drill into the details, diagrams, and real-world examples.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}>
                  <Link href={`/architecture/principles/${p.slug}`}
                    className="block h-full bg-surface border border-border-dim rounded-2xl p-6 hover:border-amber-500/30 hover:bg-[#121212] transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                        <Icon size={18} className="text-amber-400" />
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-text-4 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                        Drill in
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                    <h3 className="text-foreground font-bold mb-2 text-base group-hover:text-amber-400 transition-colors">{p.title}</h3>
                    <p className="text-text-2 text-[13px] leading-relaxed">{p.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIERS / BUNDLES */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Activation Tiers</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Start where you are.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Pick a tier that matches today&apos;s scale. Upgrade in-place when you outgrow it.
            No data migration, no re-training, no implementation re-do.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier, i) => (
              <motion.div key={tier.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-surface border rounded-2xl p-6 hover:border-amber-500/30 transition-colors flex flex-col"
                style={{ borderColor: `${tier.color}25` }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ background: tier.color }} />
                  <h3 className="text-xl font-black text-foreground">{tier.name}</h3>
                </div>
                <p className="text-xs text-text-3 mb-5 font-mono">{tier.suited}</p>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">Includes</p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {tier.includes.map((inc) => (
                    <li key={inc} className="text-xs text-text-2 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">+</span> {inc}
                    </li>
                  ))}
                </ul>

                {tier.skip[0] !== "—" && (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-4 mb-2">Not included (add later)</p>
                    <ul className="space-y-1">
                      {tier.skip.map((s) => (
                        <li key={s} className="text-xs text-text-4 flex items-start gap-2">
                          <span className="text-zinc-700 mt-0.5">−</span> {s}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE PATH */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Scale Path</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">From Day 1 to Group Scale.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            One platform. Same data model. Same workflows. Add modules when you need them.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent hidden md:block" />

            <div className="space-y-6">
              {SCALE_PATH.map((step, i) => (
                <motion.div key={step.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface border border-amber-500/40 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="bg-surface border border-border-dim rounded-2xl p-5 flex-1 hover:border-amber-500/25 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-amber-400 font-mono">{step.stage}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-text-2 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULE DEPENDENCY VISUAL */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Module Dependencies</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Modules talk through APIs.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            No hidden coupling. Every module call goes through a versioned, audit-logged API.
            Disable one — others keep working.
          </p>

          <div className="bg-surface border border-border-dim rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="inline-block px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-2">
                  <Workflow size={22} className="text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-foreground">Sales Module</p>
                <p className="text-xs text-text-3 mt-1 font-mono">creates order</p>
              </div>

              <div className="flex flex-col items-center gap-2 text-text-4">
                <span className="text-xs font-mono">→ API call →</span>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <span className="text-[10px] font-mono">audit logged · versioned · RBAC checked</span>
              </div>

              <div className="text-center">
                <div className="inline-block px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-2">
                  <Server size={22} className="text-purple-400" />
                </div>
                <p className="text-sm font-bold text-foreground">Inventory Module</p>
                <p className="text-xs text-text-3 mt-1 font-mono">checks ATP</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-3">
              <div className="bg-background border border-border-dim rounded-lg p-3">
                <p className="text-foreground font-semibold mb-1">No direct DB access</p>
                <p>Modules don&apos;t query each other&apos;s tables. Calls go through APIs.</p>
              </div>
              <div className="bg-background border border-border-dim rounded-lg p-3">
                <p className="text-foreground font-semibold mb-1">Versioned contracts</p>
                <p>Breaking changes require versioned APIs. Old clients keep working.</p>
              </div>
              <div className="bg-background border border-border-dim rounded-lg p-3">
                <p className="text-foreground font-semibold mb-1">Graceful degradation</p>
                <p>If a module is disabled, callers handle absence cleanly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
