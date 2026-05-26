"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { slugify } from "@/lib/modules/capability-helpers";

export type FeatureCard = {
  icon: string;
  title: string;
  desc: string;
  status?: "preview" | "roadmap";
};

export function FeatureCardGrid({ title, eyebrow, cards, accent, moduleSlug }: { title: string; eyebrow?: string; cards: FeatureCard[]; accent: string; moduleSlug?: string }) {
  return (
    <section className="py-20 border-b border-border-dim">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>{eyebrow}</p>}
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">{title}</h2>
        {moduleSlug && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-12">
            <p className="text-text-3 text-sm">Click any capability to drill in.</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-text-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                Preview — available on request
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-text-3">
                <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                Roadmap — planned within 12 months
              </span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = getIcon(c.icon);
            const cardContent = (
              <>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                    <Icon size={18} style={{ color: accent }} />
                  </div>
                  <div className="flex items-center gap-2">
                    {c.status === "preview" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
                        Preview
                      </span>
                    )}
                    {c.status === "roadmap" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-surface-2 text-text-2 border border-border-light">
                        Roadmap
                      </span>
                    )}
                    {moduleSlug && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-text-4 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                        Drill in
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-foreground font-bold mb-2.5 text-base leading-tight">{c.title}</h3>
                <p className="text-text-2 text-[13px] leading-relaxed">{c.desc}</p>
              </>
            );

            const cardClass = "bg-surface border border-border-dim rounded-2xl p-6 hover:border-amber-500/25 hover:bg-[#121212] transition-all duration-200 group block h-full";

            return (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}>
                {moduleSlug ? (
                  <Link href={`/product/${moduleSlug}/${slugify(c.title)}`} className={cardClass}>{cardContent}</Link>
                ) : (
                  <div className={cardClass}>{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
