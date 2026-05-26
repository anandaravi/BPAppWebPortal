"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Puzzle,
  Users,
  Factory,
  Cloud,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const HOW_IT_WORKS = [
  {
    icon: Puzzle,
    title: "Module Selection",
    description:
      "Choose from 44 modules across Core Operations, Finance, HR, Platform, and Intelligence. Only the modules you activate are in scope. No shelfware, no unused licences.",
    accent: "#F59E0B",
  },
  {
    icon: Users,
    title: "User Count",
    description:
      "Pricing scales with the number of named users accessing the system. Role-based access means you don't pay for view-only staff at the same rate as power users.",
    accent: "#10B981",
  },
  {
    icon: Factory,
    title: "Plant / Location Count",
    description:
      "Each production unit, warehouse, or branch is a plant. Multi-plant licencing allows full data isolation and consolidated group reporting across locations.",
    accent: "#F97316",
  },
  {
    icon: Cloud,
    title: "Deployment Model",
    description:
      "Choose Cloud SaaS (Vercel + managed infra), Private Cloud (your VPC), or On-Premise (your data centre). The deployment model affects infra cost, not feature availability.",
    accent: "#A855F7",
  },
];

const MODULE_GROUPS = [
  {
    name: "Core Operations",
    count: 9,
    description: "Sales, procurement, production, inventory, deckle optimizer, stock prep, converting, broke management, recipe.",
    accent: "#F59E0B",
  },
  {
    name: "Customer Experience",
    count: 4,
    description: "CRM, helpdesk, marketing, field service — full customer lifecycle from lead to after-sale.",
    accent: "#10B981",
  },
  {
    name: "Finance & People",
    count: 4,
    description: "Finance & GST, party management, HR & payroll, document management — compliance-first, India-native.",
    accent: "#F97316",
  },
  {
    name: "Intelligence & Automation",
    count: 9,
    description: "AI analytics, IoT, digital twin, sustainability, edge computing, RPA, voice, document intelligence, ECM.",
    accent: "#A855F7",
  },
  {
    name: "Master Data & Config",
    count: 9,
    description: "Product catalog, pricing rules, lookups, number series, business profile, approvals, audit trail, lab master, quality.",
    accent: "#EF4444",
  },
  {
    name: "Platform",
    count: 9,
    description: "Administration, RBAC, email hub, notifications, monitoring, maintenance, projects, automations, mobile apps.",
    accent: "#06B6D4",
  },
];

const TRADITIONAL_PAIN = [
  "Pay for the full bundle even if you use 20% of it",
  "Licence tiers that force over-buying or under-buying",
  "Costly customisation to remove features you never wanted",
];

const PLUGGABLE_WIN = [
  "Activate only what your mill actually runs today",
  "Add modules incrementally as operations scale",
  "No hidden fees — every dimension is explicit in your quote",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
            alt="Pricing"
            fill
            className="object-cover opacity-25"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[1440px] mx-auto px-6 pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            How Pricing Works
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl"
          >
            Pay for what<br />
            <span className="amber-text">you run.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            BPApp uses a pluggable pricing model. There are no fixed tiers, no
            forced bundles. Your quote is built around exactly which modules you
            deploy, how many users access them, how many plants you run, and
            which deployment model fits your infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              Request a Custom Quote{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all"
            >
              See All Modules
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Four Dimensions
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            How your quote is built.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Every custom quote is a function of four variables. Change any one
            of them and the price changes accordingly — no surprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-7 flex gap-5 hover:border-amber-500/20 transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}
                  >
                    <Icon size={22} style={{ color: item.accent }} />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY PLUGGABLE */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Why Pluggable?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-14">
            No bloat. No over-billing.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#0f0f0f] border border-red-900/40 rounded-2xl p-7"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-5">
                Traditional Fixed-Bundle Software
              </p>
              <ul className="space-y-4">
                {TRADITIONAL_PAIN.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <XCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5 text-red-500"
                    />
                    <span className="text-sm text-zinc-300 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* BPApp */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#0f0f0f] border border-amber-500/30 rounded-2xl p-7"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">
                BPApp Pluggable Model
              </p>
              <ul className="space-y-4">
                {PLUGGABLE_WIN.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 mt-0.5 text-amber-500"
                    />
                    <span className="text-sm text-zinc-200 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INDICATIVE PRICING */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Indicative Annual Cost
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Ballpark, not bait.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14 leading-relaxed">
            Final pricing depends on the four dimensions above. These are realistic
            annual ranges for typical mill profiles to anchor the conversation
            before a custom quote.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tier: "Small Mill",
                price: "₹4–12 lakh",
                period: "per year",
                desc: "Single paper machine, <50 users, core modules (Sales, Production, Inventory, Finance + Deckle).",
                accent: "#34D399",
                items: [
                  "1 paper machine",
                  "Up to ~50 named users",
                  "Cloud SaaS deployment",
                  "Core 8–12 modules",
                  "Standard SLA",
                ],
              },
              {
                tier: "Mid Mill",
                price: "₹12–30 lakh",
                period: "per year",
                desc: "1–2 PMs, 50–150 users, expanded module set with HR/Payroll, Quality, AI add-ons.",
                accent: "#F59E0B",
                items: [
                  "1–2 paper machines",
                  "50–150 named users",
                  "Cloud or Private Cloud",
                  "15–25 modules",
                  "Priority support",
                ],
                featured: true,
              },
              {
                tier: "Large / Integrated Mill",
                price: "₹30 lakh+",
                period: "per year",
                desc: "Multi-PM or integrated mill, 150+ users, full 44-module footprint, multi-plant, custom integration.",
                accent: "#A78BFA",
                items: [
                  "Multi-PM / integrated",
                  "150+ named users",
                  "Cloud · On-prem · Hybrid",
                  "Up to 44 modules",
                  "Dedicated success team",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.tier}
                className="bg-[#0f0f0f] border rounded-2xl p-6 flex flex-col"
                style={{
                  borderColor: tier.featured ? `${tier.accent}50` : "#1f1f1f",
                  boxShadow: tier.featured ? `0 0 32px ${tier.accent}15` : "none",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: tier.accent }}
                  >
                    {tier.tier}
                  </p>
                  {tier.featured && (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        background: `${tier.accent}15`,
                        borderColor: `${tier.accent}40`,
                        color: tier.accent,
                      }}
                    >
                      MOST COMMON
                    </span>
                  )}
                </div>
                <p
                  className="text-4xl font-black font-mono mb-1"
                  style={{ color: tier.accent }}
                >
                  {tier.price}
                </p>
                <p className="text-xs text-zinc-500 mb-5 font-mono">{tier.period}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {tier.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <CheckCircle2
                        size={13}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: tier.accent }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all"
                  style={{
                    borderColor: `${tier.accent}40`,
                    background: `${tier.accent}10`,
                    color: tier.accent,
                  }}
                >
                  Get sized quote <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-600 mt-8 font-mono leading-relaxed max-w-3xl">
            * Ranges include software subscription. Implementation (typically 4–12
            weeks), on-site training, and custom integrations are quoted
            separately and depend on scope. On-premise deployments add
            infrastructure cost; cloud SaaS bundles it.
          </p>
        </div>
      </section>

      {/* MODULE GROUPS OVERVIEW */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            44 Modules Across 6 Groups
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Pick what you need.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Modules are organised into groups for clarity. You can activate any
            combination — you are never forced to take an entire group.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULE_GROUPS.map((group, i) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-amber-500/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-black text-lg">{group.name}</h3>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${group.accent}18`,
                      border: `1px solid ${group.accent}35`,
                      color: group.accent,
                    }}
                  >
                    {group.count} modules
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {group.description}
                </p>
                <div
                  className="mt-5 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, ${group.accent}50, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center text-zinc-500 text-sm mt-10"
          >
            Want the full breakdown?{" "}
            <Link
              href="/product"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Browse all 44 modules →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Custom Quote
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight"
          >
            No surprises. No bloat.{" "}
            <span className="amber-text">Get a quote sized to your mill.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Tell us about your mill — size, modules of interest, user count, and
            deployment preference — and we will put together a transparent,
            line-item quote with no hidden fees.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              Request a Custom Quote{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
