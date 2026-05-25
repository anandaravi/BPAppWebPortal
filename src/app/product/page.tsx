"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";
import { getIcon } from "@/lib/icons";

export default function ProductOverview() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Product
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6">
          44 modules.<br /><span className="amber-text">One operating system.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-lg max-w-2xl">
          Every module purpose-built for Indian paper manufacturing. From core operations to platform infrastructure.
        </motion.p>
      </section>

      {/* Groups */}
      <section className="px-6 max-w-7xl mx-auto pb-24 space-y-16">
        {MODULE_GROUPS.map((group, gi) => (
          <div key={group.title}>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="w-1 h-5 bg-amber-500 rounded-full" />
              {group.title}
              <span className="text-zinc-600 font-normal text-sm font-mono">{group.slugs.length} modules</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.slugs.map((slug, i) => {
                const m = ALL_MODULES[slug];
                if (!m) return null;
                const Icon = getIcon(m.icon);
                return (
                  <motion.div key={slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}>
                    <Link href={`/product/${slug}`} className="group block relative h-60 rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0f0f0f] amber-card">
                      <Image src={m.photo} alt={m.tag} fill className="object-cover opacity-15 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/85 to-[#0f0f0f]/40" />

                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                            style={{ background: `${m.accent}12`, borderColor: `${m.accent}30` }}>
                            <Icon size={16} style={{ color: m.accent }} />
                          </div>
                          <ArrowRight size={14} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: m.accent }}>{m.tag}</p>
                          <h3 className="text-white font-bold text-base mb-1 leading-tight">{m.name}</h3>
                          <p className="text-zinc-500 text-xs leading-snug line-clamp-2">{m.blurb}</p>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: m.accent }} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
