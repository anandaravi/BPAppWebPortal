"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Brain, Target, CheckCircle2 } from "lucide-react";

const TIERS = [
  { icon: Zap, label: "Instant Mode", time: "< 2 sec", desc: "Mid-shift quick adjustments", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8" },
  { icon: Brain, label: "Planning Mode", time: "5–30 sec", desc: "Shift-level planning", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/8" },
  { icon: Target, label: "Full Optimization", time: "≤ 5 min", desc: "Daily plan (180+ constraints)", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8" },
];

export function DeckleSpotlight() {
  return (
    <section className="relative overflow-hidden bg-[#080808] border-y border-[#1a1a1a]">
      <div className="absolute inset-0">
        <Image src="/images/heroes/deckle-hero.jpg"
          alt="Paper reels" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/95 to-[#080808]" />
      </div>

      <div className="relative max-w-[var(--container-max)] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">Flagship Feature</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Eliminate trim waste.<br /><span className="amber-text">Maximize reel recovery.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Our proprietary 3-tier optimization engine picks the right algorithm for every
              planning horizon — from reactive mid-shift tweaks to fully optimal daily patterns.
              Saves mills ₹100K+ per month.
            </p>
            <ul className="space-y-3">
              {[
                "Explainable plans — every output shows active constraints and recovery analysis",
                "Pattern learning — engine learns from approved plans, improves over time",
                "Pocket auto-detection with cutter feasibility checks",
                "Plan vs. actual reconciliation for continuous improvement",
                "Interactive drag-drop adjustments with live constraint feedback",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 size={14} className="mt-0.5 text-amber-400 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4">
            <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-6">
              <p className="text-xs text-zinc-500 mb-1 uppercase tracking-widest">Auto-selects based on time budget</p>
              <p className="text-2xl font-black text-white">3-Tier Optimization Engine</p>
            </div>
            {TIERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.label}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className={`bg-[#0f0f0f] border ${t.border} rounded-xl p-5 flex items-start gap-4`}>
                  <div className={`w-10 h-10 rounded-xl ${t.bg} border ${t.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={t.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-white font-semibold text-sm">{t.label}</span>
                      <span className={`text-xs font-mono font-bold ${t.color}`}>{t.time}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
