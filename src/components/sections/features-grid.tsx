"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";
import { getIcon } from "@/lib/icons";

export function FeaturesGrid() {
  return (
    <section className="py-28 bg-[#080808]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">All 44 Modules</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Everything a paper mill needs.<br />
              <span className="text-zinc-500">Nothing it doesn&apos;t.</span>
            </h2>
          </div>
          <Link href="/product" className="group inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium">
            Explore all modules <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="space-y-14">
          {MODULE_GROUPS.map((group, gi) => (
            <div key={group.title}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.05 }}
                className="flex items-center gap-3 mb-5">
                <span className="w-1 h-5 bg-amber-500 rounded-full" />
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
                <span className="text-zinc-600 font-mono text-xs">{group.slugs.length} modules</span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.slugs.map((slug, i) => {
                  const m = ALL_MODULES[slug];
                  if (!m) return null;
                  const Icon = getIcon(m.icon);
                  return (
                    <motion.div key={slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.25) }}>
                      <Link href={`/product/${slug}`} className="group block relative h-44 rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#0f0f0f] amber-card">
                        <Image src={m.photo} alt={m.tag} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover opacity-35 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-[#0f0f0f]/20 group-hover:to-[#0f0f0f]/10 transition-all duration-500" />

                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center border"
                              style={{ background: `${m.accent}12`, borderColor: `${m.accent}30` }}>
                              <Icon size={14} style={{ color: m.accent }} />
                            </div>
                            <ArrowRight size={12} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                          </div>

                          <div>
                            <h4 className="text-white font-bold text-sm leading-tight mb-1">{m.name}</h4>
                            <p className="text-zinc-500 text-[11px] leading-snug line-clamp-2">{m.tag}</p>
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
        </div>
      </div>
    </section>
  );
}
