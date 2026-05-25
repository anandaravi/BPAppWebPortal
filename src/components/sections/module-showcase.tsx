"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const SHOWCASES = [
  {
    tag: "Production",
    headline: "Plan, execute, and optimize every production run.",
    body: "From MPS/MRP explosion to shop floor execution — work orders, shift scheduling, OEE tracking, broke management, and statistical process control in one connected system.",
    points: ["MPS/MRP with capacity planning (CRP)", "Real-time OEE dashboards per machine", "Downtime root-cause categorization", "NCR/CAPA quality workflow", "Broke Pareto analytics & recovery"],
    photo: "/images/heroes/production-hero.jpg",
    accent: "#F97316",
    flip: false,
  },
  {
    tag: "Inventory",
    headline: "Batch-level traceability from receipt to dispatch.",
    body: "Full lot traceability with FEFO allocation, reel serial numbering, multi-warehouse transfers, QC holds, sampling plans, cycle counts, and one-click batch recalls.",
    points: ["FEFO / FIFO / weighted-average valuation", "GRN → Inspection → Usage Decision workflow", "Batch split, merge, and recall management", "Physical verification with blind count mode", "Consignment stock & lot serialization"],
    photo: "/images/heroes/inventory-hero.jpg",
    accent: "#8B5CF6",
    flip: true,
  },
  {
    tag: "Finance & GST",
    headline: "Indian compliance isn't an add-on. It's built in.",
    body: "GSTR-1/3B auto-filing, ITC ledger, RCM/TCS/TDS auto-deductions, FEMA tracking, trade finance (LC, invoice discounting, ECGC) — and cost accounting segmented by machine and grade.",
    points: ["GSTR-1/3B auto-filing with IRN generation", "ITC ledger & ITC reversal scheduling", "RCM, TCS, TDS auto-deductions", "LC management & forex revaluation", "Cost variance by production line"],
    photo: "/images/heroes/finance-hero.jpg",
    accent: "#10B981",
    flip: false,
  },
  {
    tag: "HR & Payroll",
    headline: "Shift rosters to payslips — statutory by default.",
    body: "Manage multi-shift mills with gap compliance, bulk attendance, and complete statutory payroll — PF, ESI, PT, LWF, TDS, gratuity — with bank advice, Form 16, and ESS/MSS portals.",
    points: ["Gap 2.1 shift compliance enforcement", "PF / ESI / PT / LWF auto-deductions", "PF ECR & Form 16 generation", "ESS self-service + MSS manager portal", "Separation, FnF settlement workflow"],
    photo: "/images/heroes/hr-hero.jpg",
    accent: "#EC4899",
    flip: true,
  },
];

export function ModuleShowcase() {
  return (
    <section className="bg-[#0a0a0a]">
      {SHOWCASES.map((s, i) => (
        <div key={s.tag} className="relative overflow-hidden border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${s.flip ? "lg:flex lg:flex-row-reverse" : ""}`}>
              {/* Photo side */}
              <motion.div initial={{ opacity: 0, x: s.flip ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden h-72 lg:h-96 border border-[#1f1f1f]">
                <Image src={s.photo} alt={s.tag} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full border text-xs font-bold"
                  style={{ color: s.accent, borderColor: `${s.accent}40`, background: `${s.accent}10` }}>
                  {s.tag}
                </div>
              </motion.div>

              {/* Text side */}
              <motion.div initial={{ opacity: 0, x: s.flip ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: s.accent }}>{s.tag}</p>
                <h2 className="text-3xl font-black text-white leading-tight mb-4">{s.headline}</h2>
                <p className="text-zinc-400 mb-7 leading-relaxed">{s.body}</p>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: s.accent }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
