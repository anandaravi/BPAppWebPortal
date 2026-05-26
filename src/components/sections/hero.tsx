"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Activity, Package } from "lucide-react";

const PHOTO = "/images/heroes/production-hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden grain">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image src={PHOTO} alt="Paper mill operations" fill className="object-cover object-center" priority loading="eager" unoptimized />
        <div className="photo-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
      </div>

      {/* Amber vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Built for Indian Paper Manufacturing
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6">
              Run your mill.<br />
              <span className="amber-text">Not workarounds.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed">
              44 integrated modules to streamline, automate, govern, and control your entire mill —
              from order intake and reel optimization to GST filing, payroll, maintenance, and audit. One platform.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200">
                Request a Demo
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 hover:bg-amber-500/5 text-sm font-medium transition-all duration-200">
                Explore Features
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-xs text-zinc-600 flex items-center gap-2">
              <span className="w-8 h-px bg-zinc-700" />
              GST · FEMA · PF/ESI · Aadhaar Act compliant
            </motion.p>
          </div>

          {/* RIGHT: Floating dashboard cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col gap-4">

            {/* Main dashboard card */}
            <div className="bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#222] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#222] bg-[#0a0a0a]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs text-zinc-600 ml-2 font-mono">Mill Dashboard</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Active Orders", value: "142", delta: "+12%", color: "text-amber-400" },
                  { label: "OEE Today", value: "87.4%", delta: "+2.1%", color: "text-emerald-400" },
                  { label: "Pending GST", value: "₹4.2L", delta: "Due 20th", color: "text-zinc-400" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#141414] rounded-xl p-3 border border-[#1f1f1f]">
                    <p className="text-[10px] text-zinc-500 mb-1">{s.label}</p>
                    <p className="text-lg font-bold text-white font-mono">{s.value}</p>
                    <p className={`text-[10px] mt-0.5 ${s.color}`}>{s.delta}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5 space-y-2.5">
                {[
                  { label: "Mill Utilization", pct: 89, color: "bg-amber-500" },
                  { label: "Sales Pipeline", pct: 72, color: "bg-emerald-500" },
                  { label: "Dispatch Ready", pct: 54, color: "bg-blue-500" },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-zinc-500">{b.label}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{b.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
                      <motion.div className={`h-full ${b.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${b.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom two mini cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#222] rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Activity size={14} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-0.5">Deckle Plan</p>
                  <p className="text-sm font-bold text-white">Optimized</p>
                  <p className="text-[10px] text-emerald-400">3.2% trim saved</p>
                </div>
              </div>
              <div className="bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#222] rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Package size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-0.5">GSTR-1</p>
                  <p className="text-sm font-bold text-white">Auto-filed</p>
                  <p className="text-[10px] text-zinc-500">₹28.4L this month</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
