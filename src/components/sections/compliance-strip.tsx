"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const BADGES = [
  { label: "GST", sub: "GSTR-1 / 3B / 9 · IRN · e-Invoice", color: "#F59E0B" },
  { label: "FEMA", sub: "Export · LC · Forex revaluation", color: "#10B981" },
  { label: "PF / ESI", sub: "ECR · Challan · Form 16", color: "#3B82F6" },
  { label: "TDS / TCS", sub: "26Q · 27Q · 27EQ · Form 16A", color: "#A855F7" },
  { label: "e-Way Bill", sub: "Auto-generate · Cancel · Extend", color: "#F97316" },
  { label: "Aadhaar Act", sub: "Masked PII · Data localisation", color: "#EC4899" },
];

export function ComplianceStrip() {
  return (
    <section className="py-20 bg-[#080808] border-b border-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Indian Compliance</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Built for India&apos;s regulatory stack.<br />
              <span className="text-zinc-500">Not bolted on.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
            Every statutory obligation — GST, FEMA, PF, ESI, TDS — handled inside the platform
            with no third-party compliance tools required.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#0f0f0f] border rounded-xl p-5 flex flex-col gap-3 hover:bg-[#111] transition-colors"
              style={{ borderColor: `${b.color}25` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center border"
                style={{ background: `${b.color}12`, borderColor: `${b.color}35` }}
              >
                <ShieldCheck size={16} style={{ color: b.color }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">{b.label}</p>
                <p className="text-zinc-500 text-[11px] leading-snug">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
