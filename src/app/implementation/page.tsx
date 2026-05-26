"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Settings2,
  GraduationCap,
  GitCompare,
  Rocket,
  UserCheck,
  Database,
  BookOpen,
  HeadphonesIcon,
  FileText,
  LifeBuoy,
  Phone,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const PHASES = [
  {
    number: 1,
    name: "Discovery & Scoping",
    duration: "Week 1–2",
    accent: "#F59E0B",
    activities: [
      "Module selection workshop",
      "Current process documentation",
      "Data audit",
      "Integration planning",
    ],
    deliverables: [
      "Signed scope document",
      "Module list confirmed",
      "Go-live date confirmed",
    ],
  },
  {
    number: 2,
    name: "Configuration",
    duration: "Week 3–6",
    accent: "#F97316",
    activities: [
      "Master data setup (customers, vendors, products, machines)",
      "Module configuration",
      "Workflow rules",
      "GST setup",
    ],
    deliverables: [
      "Configured system in staging",
      "Test data loaded",
    ],
  },
  {
    number: 3,
    name: "Training",
    duration: "Week 7–9",
    accent: "#10B981",
    activities: [
      "Role-based training sessions (Finance team, Production team, Management)",
      "Train-the-trainer for super users",
    ],
    deliverables: [
      "Team trained and certified",
      "User acceptance testing complete",
    ],
  },
  {
    number: 4,
    name: "Parallel Run",
    duration: "Week 10–11",
    accent: "#3B82F6",
    activities: [
      "Run both old and new systems in parallel",
      "Data validation",
      "Reconciliation checks",
      "Issue resolution",
    ],
    deliverables: [
      "Sign-off on data accuracy",
      "Cutover plan approved",
    ],
  },
  {
    number: 5,
    name: "Go-Live & Hypercare",
    duration: "Week 12+",
    accent: "#A855F7",
    activities: [
      "Production go-live",
      "Dedicated support for first 4 weeks",
      "Weekly check-ins",
      "Performance monitoring",
    ],
    deliverables: [
      "Live on BPApp",
      "Hypercare period complete",
      "Transition to standard support",
    ],
  },
];

const INCLUDED = [
  {
    icon: UserCheck,
    title: "Dedicated Implementation Manager",
    description: "Single point of contact throughout the project. No handoffs, no confusion.",
    accent: "#F59E0B",
  },
  {
    icon: Database,
    title: "Data Migration",
    description: "Migration from Tally, Excel, or legacy ERP with validation before go-live.",
    accent: "#10B981",
  },
  {
    icon: GraduationCap,
    title: "Role-Based Training",
    description: "Finance, production, management, and IT teams trained separately on what they need.",
    accent: "#3B82F6",
  },
  {
    icon: Settings2,
    title: "Configuration & Setup",
    description: "All module configuration done by our team — not outsourced to an SI.",
    accent: "#F97316",
  },
  {
    icon: LifeBuoy,
    title: "Go-Live Support",
    description: "4-week hypercare with daily check-ins after you go live.",
    accent: "#A855F7",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Customized user manuals tailored to your mill's specific configuration.",
    accent: "#EC4899",
  },
];

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#080808]" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[1440px] mx-auto px-6 pt-36 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            Implementation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl"
          >
            From contract to<br />
            <span className="amber-text">go-live in 12 weeks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            Structured onboarding with dedicated support. No consultants needed, no big SI bills.
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
              Start Your Journey{" "}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all"
            >
              See our architecture
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PHASE TIMELINE */}
      <section className="py-24 border-y border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            5-Phase Process
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            A proven path to production.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-16">
            Every implementation follows the same disciplined process. No surprises, no scope creep.
          </p>

          <div className="space-y-6">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl border border-[#1f1f1f] overflow-hidden"
              >
                {/* Phase number + name */}
                <div
                  className="lg:col-span-3 p-6 flex flex-col justify-between"
                  style={{ background: `${phase.accent}0d`, borderRight: `1px solid ${phase.accent}20` }}
                >
                  <div>
                    <div
                      className="text-5xl font-black leading-none mb-2"
                      style={{ color: `${phase.accent}40` }}
                    >
                      0{phase.number}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{phase.name}</h3>
                    <span
                      className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-md border"
                      style={{
                        color: phase.accent,
                        borderColor: `${phase.accent}40`,
                        background: `${phase.accent}15`,
                      }}
                    >
                      {phase.duration}
                    </span>
                  </div>
                </div>

                {/* Activities */}
                <div className="lg:col-span-5 p-6 bg-[#0f0f0f] border-r border-[#1f1f1f]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                    Activities
                  </p>
                  <ul className="space-y-2">
                    {phase.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2 text-sm text-zinc-300">
                        <div
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: phase.accent }}
                        />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-4 p-6 bg-[#0c0c0c]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                    Deliverables
                  </p>
                  <ul className="space-y-2">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: phase.accent }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            What&apos;s included.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Implementation is not just software delivery — it is everything needed to make your team
            confident and your mill live.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INCLUDED.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-amber-500/25 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.accent}15` }}
                  >
                    <Icon size={20} style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POST GO-LIVE SUPPORT */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Post Go-Live
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Support after go-live.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Two support tiers. Both cover you — one is for mills that want peace of mind around the
            clock.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <HeadphonesIcon size={20} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                    Standard Support
                  </p>
                  <h3 className="text-xl font-black text-white">Standard</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Email + ticket system",
                  "8am–6pm IST coverage",
                  "< 24hr response time",
                  "Monthly status reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 size={14} className="text-zinc-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-[#0f0f0f] border border-amber-500/30 rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl"
                style={{ background: "#F59E0B20", color: "#F59E0B" }}
              >
                Recommended
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Phone size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-0.5">
                    Premium Support
                  </p>
                  <h3 className="text-xl font-black text-white">Premium</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Phone + WhatsApp + email",
                  "24×7 coverage for critical issues",
                  "< 2hr response time",
                  "Quarterly business reviews",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* READY TO START */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
                Ready to start?
              </p>
              <h2 className="text-4xl font-black text-white tracking-tight mb-3">
                12 weeks to go-live.
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                Every day you delay is a day your competitors have better data. Let&apos;s set a
                go-live date.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              <div className="flex items-center gap-4 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl px-8 py-5">
                <div className="text-5xl font-black text-amber-400">12</div>
                <div>
                  <div className="text-sm font-bold text-white">Weeks</div>
                  <div className="text-xs text-zinc-500">Typical full go-live</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
              >
                Start Your Journey{" "}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
