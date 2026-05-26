"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Puzzle,
  HeartHandshake,
  Microscope,
  Users,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const STATS = [
  { value: "44", label: "Modules" },
  { value: "100%", label: "India-native compliance" },
  { value: "Multi", label: "Tenant architecture" },
  { value: "3-tier", label: "Deckle optimisation" },
];

const DIFFERENTIATORS = [
  {
    icon: Building2,
    title: "Industry-Native",
    description:
      "Not a generic ERP adapted for paper mills — BPApp was designed from the ground up for the Indian paper manufacturing industry. Every workflow, every report, every screen reflects how paper mills actually operate: deckle optimisation, grade changeovers, broke management, reel-level traceability.",
    accent: "#F59E0B",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-First",
    description:
      "GST, FEMA, TDS, PF, and ESI compliance are baked into the core — not bolted on as afterthoughts. The compliance engine keeps your filings accurate and your finance team out of trouble, without custom configuration or third-party add-ons.",
    accent: "#10B981",
  },
  {
    icon: Puzzle,
    title: "Pluggable Architecture",
    description:
      "Activate the modules your mill needs today and expand as your operations scale. Start with core operations and finance, then layer in AI analytics, IoT, and automation when the time is right — without migration projects or data loss.",
    accent: "#A855F7",
  },
];

const APPROACH = [
  {
    icon: HeartHandshake,
    title: "Customer Success",
    description:
      "Dedicated onboarding specialists guide your team from deployment to full adoption. We do not hand you a manual — we work alongside your team until the system runs the way your mill runs.",
    accent: "#F59E0B",
  },
  {
    icon: Microscope,
    title: "Domain Expertise",
    description:
      "Our team includes people who have worked inside paper mills, not just sold software to them. That domain depth means faster configuration, fewer surprises, and solutions built on real-world process knowledge.",
    accent: "#10B981",
  },
  {
    icon: Users,
    title: "Long-term Partnership",
    description:
      "BPApp is not a one-time transaction. As your mill grows, adds plants, or enters new markets, we evolve the system with you — through product updates, expanded modules, and a support relationship that lasts.",
    accent: "#F97316",
  },
];

const COMPLIANCE_ITEMS = [
  "SOC 2 / ISO 27001 Ready",
  "GST Native",
  "FEMA Compliant",
  "Aadhaar Act §29",
  "IT Act §43A",
  "TDS / PF / ESI",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80"
            alt="Paper mill"
            fill
            className="object-cover opacity-25"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            About Papyrus
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl"
          >
            Built by paper<br />
            <span className="amber-text">industry insiders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            Papyrus BPApp is an enterprise ERP built from the ground up for the
            Indian paper manufacturing industry. Forty-four modules, deep domain
            expertise, and compliance that runs in the core — not as an add-on.
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
              Request Demo{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                The ERP that paper mills were waiting for.
              </h2>
              <div className="space-y-5 text-zinc-400 leading-relaxed text-base">
                <p>
                  Papyrus BPApp is developed by{" "}
                  <span className="text-white font-semibold">
                    Netique Infotech Pvt Ltd.
                  </span>{" "}
                  — pioneers of Deckle Matching software in India and a paper-
                  industry technology partner with 4 decades of domain
                  expertise. For 20+ years Netique has supported paper mills
                  across India and overseas with products like NDM (Netique
                  Deckle Matcher), Paper Agent, Optrim, Optrim Web, and Papyrus
                  Production Manager.
                </p>
                <p>
                  Indian paper mills spent years forcing generic ERPs to
                  understand deckle optimisation, grade changeover planning, and
                  broke management. The result was expensive customisation
                  projects that delivered half-solutions — and left critical
                  mill workflows still running on spreadsheets. Papyrus BPApp is
                  the natural evolution of Netique&apos;s four decades of
                  paper-industry experience into a complete end-to-end ERP,
                  delivered under the{" "}
                  <span className="text-white font-semibold">Papyrus360</span>{" "}
                  brand for software and consulting.
                </p>
                <p>
                  The outcome is an ERP where GST filing, TDS deduction, PF
                  compliance, and FEMA reporting are first-class features, not
                  third-party bolt-ons. Where deckle optimisation runs a
                  proprietary optimisation engine at the core. Where you can
                  start with five modules and scale to forty-four without
                  re-implementation.
                </p>
              </div>
            </motion.div>

            {/* Stat grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-7 flex flex-col gap-2"
                >
                  <span className="text-4xl font-black amber-text leading-none">
                    {stat.value}
                  </span>
                  <span className="text-sm text-zinc-400">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Heritage · Netique Infotech
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Four decades. Five products.<br />One paper-industry lineage.
          </h2>
          <p className="text-zinc-400 text-base max-w-3xl mb-12 leading-relaxed">
            Papyrus BPApp didn&apos;t arrive from nowhere. It is built by the same
            team that pioneered Deckle Matching software in India — every product
            in the lineage is still informing how the platform thinks about paper.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent hidden md:block" />
            <div className="space-y-4">
              {[
                {
                  era: "1980s–90s",
                  product: "NDM · Netique Deckle Matcher",
                  desc: "The original Indian deckle matching engine. Decades of mill-floor tuning seeded every constraint in today's optimizer.",
                },
                {
                  era: "2000s",
                  product: "Paper Agent",
                  desc: "Order-to-dispatch coordination for Indian paper traders and mills. Early experience with multi-customer dispatch realities.",
                },
                {
                  era: "2000s–10s",
                  product: "Optrim · Optrim Web",
                  desc: "Desktop and web evolutions of the deckle optimization engine. Multi-country deployments, multi-machine configurations.",
                },
                {
                  era: "2010s",
                  product: "Papyrus Production Manager",
                  desc: "Production scheduling and shop floor execution for paper mills — the precursor to the modern Production module.",
                },
                {
                  era: "2024+",
                  product: "Papyrus BPApp · Papyrus360",
                  desc: "End-to-end ERP for paper manufacturing. 44 modules. Cloud-native, multi-tenant, GST + FEMA native. Software and consulting delivered under the Papyrus360 brand.",
                  active: true,
                },
              ].map((step, i) => (
                <div key={step.product} className="flex gap-5 items-start">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0f0f0f] border-2 flex items-center justify-center font-mono text-[10px] font-bold"
                    style={{
                      borderColor: step.active ? "#F59E0B" : "#444",
                      color: step.active ? "#F59E0B" : "#a1a1aa",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {step.era}
                      </span>
                      <span className="text-zinc-700 hidden sm:inline">·</span>
                      <h3 className="text-base font-bold text-white">
                        {step.product}
                      </h3>
                      {step.active && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {[
              { value: "40 yrs", label: "Domain expertise" },
              { value: "20+ yrs", label: "In-mill deployments" },
              { value: "Multi", label: "Country footprint" },
              { value: "5+", label: "Generations of product" },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4"
              >
                <p className="text-2xl font-black font-mono text-amber-400 mb-1">
                  {m.value}
                </p>
                <p className="text-xs text-zinc-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            What Makes It Different
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-14">
            Three things that set us apart.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-7 flex flex-col gap-5 hover:border-amber-500/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${item.accent}18`,
                      border: `1px solid ${item.accent}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: item.accent }} />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-black mb-3">
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

      {/* OUR APPROACH */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Our Approach
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-14">
            More than software.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPROACH.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-7 hover:border-amber-500/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${item.accent}18`,
                      border: `1px solid ${item.accent}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-white text-xl font-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE STRIP */}
      <section className="py-14 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-8">
            Compliance &amp; Certifications
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {COMPLIANCE_ITEMS.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-300 text-xs font-semibold tracking-wide"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
