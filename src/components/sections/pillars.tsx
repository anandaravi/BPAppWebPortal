"use client";

import { motion } from "framer-motion";
import { Workflow, Bot, ShieldCheck, Gauge } from "lucide-react";

const PILLARS = [
  {
    icon: Workflow,
    word: "Streamline",
    title: "End the spreadsheet sprawl.",
    desc: "Every workflow — order intake to dispatch, PR to payment, hire to retire — consolidated into one connected platform. No more data hand-offs between disconnected systems.",
    color: "#F59E0B",
  },
  {
    icon: Bot,
    word: "Automate",
    title: "Let the engine do the routine.",
    desc: "MRP triggers PRs. Approvals route themselves. GST returns auto-populate. AI bulk-actions low-risk items. Workflows execute on events. Your team focuses on judgment calls, not data entry.",
    color: "#10B981",
  },
  {
    icon: ShieldCheck,
    word: "Govern",
    title: "Compliance isn't optional.",
    desc: "RBAC at the field level. Audit log on every action. Statutory returns on schedule. Tamper-proof evidence trails. Approval matrices that can't be bypassed. Governance by default — not by checklist.",
    color: "#A855F7",
  },
  {
    icon: Gauge,
    word: "Control",
    title: "See it. Steer it. Own it.",
    desc: "Live dashboards across every function. Anomaly detection on the patterns humans miss. Forecasts that surface risk before it lands. Drill into any number to its source transaction. The mill, in your hand.",
    color: "#3B82F6",
  },
];

export function Pillars() {
  return (
    <section className="py-24 bg-background border-b border-border-dim">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Why Papyrus BPApp</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5 leading-tight">
            Run the entire business on <span className="amber-text">four pillars.</span>
          </h2>
          <p className="text-text-2 text-lg leading-relaxed">
            Papyrus BPApp is not just an ERP. It&apos;s the operating system for paper mill businesses —
            built to <span className="text-foreground font-semibold">streamline</span>,{" "}
            <span className="text-foreground font-semibold">automate</span>,{" "}
            <span className="text-foreground font-semibold">govern</span>, and{" "}
            <span className="text-foreground font-semibold">control</span> every function under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.word}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface border rounded-2xl p-6 hover:bg-[#121212] transition-colors group"
                style={{ borderColor: `${p.color}30` }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                    style={{ background: `${p.color}12`, borderColor: `${p.color}40` }}>
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <span className="text-[10px] font-mono font-bold opacity-70" style={{ color: p.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ color: p.color }}>{p.word}</h3>
                <p className="text-foreground font-bold text-sm mb-2.5 leading-tight">{p.title}</p>
                <p className="text-text-2 text-[13px] leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
