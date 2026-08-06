"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Factory, Layers, Package, Scissors, Warehouse } from "lucide-react";

const TWINS = [
  { icon: Factory, label: "Paper machine", desc: "Wet end → pope reel, section by section", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8" },
  { icon: Scissors, label: "Rewinder & sheeters", desc: "Slitting, simplex and duplex decks", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/8" },
  { icon: Package, label: "Packaging line", desc: "Wrapping, strapping and palletising", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8" },
  { icon: Warehouse, label: "Warehouse", desc: "Rack elevation, occupancy and stock ageing", color: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/8" },
  { icon: Layers, label: "Plant & line overview", desc: "The whole run, end to end", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/8" },
];

export function TwinSpotlight() {
  return (
    <section className="relative overflow-hidden bg-background border-y border-border-dim">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />

      <div className="relative max-w-[var(--container-max)] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">Digital Twins</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-5">
              Watch the mill run.<br /><span className="amber-text">Not a spreadsheet of it.</span>
            </h2>
            <p className="text-text-2 text-lg mb-8 leading-relaxed">
              Every machine gets a live schematic — sections, parameters and thresholds drawn as the
              operator sees them, streaming from the readings your mill already records. No new
              sensors, no separate SCADA licence.
            </p>
            <ul className="space-y-3 mb-9">
              {[
                "Section-level view with live values against target, min and max",
                "Streams over server-sent events — no refresh, no polling by hand",
                "Built on your machine masters, parameter readings and OEE records",
                "Warehouse twin shows rack elevation, bin occupancy and stock ageing",
                "Drill down: plant → line → machine → section",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-text-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-amber-400 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Static HTML in /public, so a plain anchor rather than next/link */}
            <a
              href="/twins/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-black transition-colors hover:bg-amber-400"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black/70" />
              </span>
              Open the interactive demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-3 text-xs text-text-4">
              17 asset twins across 2 sites and 4 lines. Demo figures, not a live mill.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <p className="text-xs text-text-3 mb-1 uppercase tracking-widest">Shipped twin types</p>
              <p className="text-2xl font-black text-foreground">Machine · Plant · Warehouse</p>
            </div>
            {TWINS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.label}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className={`bg-surface border ${t.border} rounded-xl p-5 flex items-start gap-4`}>
                  <div className={`w-10 h-10 rounded-xl ${t.bg} border ${t.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={t.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-foreground font-semibold text-sm">{t.label}</span>
                    <p className="text-xs text-text-3 mt-0.5 leading-snug">{t.desc}</p>
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
