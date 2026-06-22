"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ShieldCheck, Zap } from "lucide-react";

const CHAT = [
  { role: "user", text: "Top 3 customers by revenue this month?" },
  { role: "ai", text: "1. ABC Paper Traders — ₹28.4L (↑14%)\n2. National Packaging Co — ₹21.7L (↑3%)\n3. GlobalPrint Exports — ₹19.2L (↓7%)\n\nGlobalPrint decline linked to delayed dispatch on SO-1847. Follow up?" },
  { role: "user", text: "Show POs I can safely bulk-approve." },
  { role: "ai", text: "Found 6 low-risk POs under ₹5L from approved vendors. Preview before approving?" },
];

export function AISpotlight() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border-dim bg-background">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-sm text-foreground font-semibold">AI Assistant</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            </div>
            <div className="p-5 space-y-3 min-h-[340px]">
              {CHAT.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.15 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-amber-500/15 border border-amber-500/20 text-amber-100 rounded-br-sm"
                      : "bg-surface-3 border border-border text-text-2 rounded-bl-sm"
                  }`}>{m.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">AI & Analytics</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-5">
              Ask your ERP anything.<br /><span className="amber-text">Act instantly.</span>
            </h2>
            <p className="text-text-2 text-lg mb-8 leading-relaxed">
              Natural language chat across all 45 modules. Query sales, production,
              finance, and HR in one conversation — then act with full audit trails.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, title: "Cross-module queries", desc: "Pulls sales, production, finance simultaneously" },
                { icon: ShieldCheck, title: "Audit-safe bulk actions", desc: "Human-in-the-loop preview before execution" },
                { icon: Sparkles, title: "Multi-model AI", desc: "Configurable per deployment" },
                { icon: Zap, title: "50+ predictions", desc: "Demand forecast, churn, anomaly detection" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-text-3 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
