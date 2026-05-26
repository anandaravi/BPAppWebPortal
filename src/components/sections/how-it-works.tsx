"use client";

import { motion } from "framer-motion";
import {
  ClipboardList, Factory, Truck, FileText, Banknote, ArrowRight
} from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Order Intake",
    desc: "Inquiry → Quotation → Sales Order with credit check, deckle optimization, and delivery date commitment.",
    color: "#F59E0B",
  },
  {
    icon: Factory,
    step: "02",
    title: "Production",
    desc: "MRP explosion triggers work orders. Shop floor executes. OEE, broke, and quality tracked in real time.",
    color: "#F97316",
  },
  {
    icon: Truck,
    step: "03",
    title: "Dispatch",
    desc: "Pick lists, lorry assignment, e-Way Bill auto-generation, and proof of delivery on mobile.",
    color: "#3B82F6",
  },
  {
    icon: FileText,
    step: "04",
    title: "Invoice & GST",
    desc: "Tax invoice with IRN, QR code, and e-invoice push to IRP. GSTR-1 auto-populated.",
    color: "#10B981",
  },
  {
    icon: Banknote,
    step: "05",
    title: "Collections",
    desc: "Receivables aging, payment reconciliation, ITC credit tracked. Period closed. MIS updated.",
    color: "#A855F7",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">End-to-End Flow</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            One order. Five steps.<br />
            <span className="text-zinc-500">Zero gaps.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Every step connected — no re-keying, no reconciliation fire drills, no compliance surprises.
          </p>
        </motion.div>

        {/* Flow steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Arrow between steps — desktop */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center w-6 h-6">
                      <ArrowRight size={12} className="text-zinc-600" />
                    </div>
                  )}

                  {/* Icon circle */}
                  <div
                    className="relative w-24 h-24 rounded-2xl border flex flex-col items-center justify-center mb-5 transition-colors group-hover:border-opacity-60"
                    style={{
                      background: `${s.color}10`,
                      borderColor: `${s.color}30`,
                    }}
                  >
                    <Icon size={28} style={{ color: s.color }} />
                    <span
                      className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full border text-[10px] font-black flex items-center justify-center font-mono"
                      style={{ background: "#0a0a0a", borderColor: `${s.color}50`, color: s.color }}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {["GST-native", "FEMA compliant", "PF / ESI statutory", "Tamper-proof audit trail", "Mobile-ready"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full border border-[#333] text-zinc-500 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
