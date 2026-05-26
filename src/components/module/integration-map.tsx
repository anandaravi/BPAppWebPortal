"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type Integration = {
  module: string;
  action: string;
  effect: string;
};

export function IntegrationMap({ moduleName, integrations, accent }: { moduleName: string; integrations: Integration[]; accent: string }) {
  return (
    <section className="py-20 bg-background border-b border-border-dim">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Integrations</p>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">Works with everything else.</h2>
        <p className="text-text-3 mb-12 max-w-2xl">Every {moduleName} action flows into the other modules — no manual data re-entry, no reconciliation pain.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {integrations.map((it, i) => (
            <motion.div key={`${it.module}-${it.action}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25) }}
              className="bg-surface border border-border-dim rounded-xl p-4 flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <ArrowRight size={14} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  <span style={{ color: accent }}>{moduleName}</span>
                  <span className="text-text-4 mx-1.5">→</span>
                  <span>{it.module}</span>
                </p>
                <p className="text-[11px] text-text-2 mt-1.5">{it.action}</p>
                <p className="text-[11px] text-text-3 mt-0.5 italic">{it.effect}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
