"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type ModuleHeroProps = {
  tag: string;
  title: string;
  highlight: string;
  blurb: string;
  photo: string;
  accent: string;
  metrics: { value: string; label: string }[];
};

export function ModuleHero({ tag, title, highlight, blurb, photo, accent, metrics }: ModuleHeroProps) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden grain on-photo">
      <div className="absolute inset-0">
        <Image src={photo} alt={tag} fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />

      <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-40 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ borderColor: `${accent}40`, background: `${accent}10`, color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {tag}
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 max-w-4xl">
          {title}<br />
          <span style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {highlight}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-2 max-w-2xl mb-10 leading-relaxed">{blurb}</motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
            Request a Demo <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/product" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 hover:bg-amber-500/5 text-sm font-medium transition-all">
            ← All Modules
          </Link>
        </motion.div>

        {/* Metrics strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {metrics.map((m) => (
            <div key={m.label} className="bg-surface/80 backdrop-blur border border-border-dim rounded-xl p-4">
              <p className="text-2xl font-black font-mono mb-1" style={{ color: accent }}>{m.value}</p>
              <p className="text-xs text-text-3">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
