"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "44", label: "Integrated Modules" },
  { value: "5", label: "Module Groups" },
  { value: "Web-First", label: "+ Mobile Companion" },
  { value: "Offline", label: "Field Sync" },
  { value: "GST + FEMA", label: "India Native" },
];

export function StatsBar() {
  return (
    <section className="relative border-y border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl font-black text-amber-400 font-mono tracking-tight">{s.value}</span>
              <span className="text-xs text-zinc-500">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
