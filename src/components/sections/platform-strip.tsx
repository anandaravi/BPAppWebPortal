"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ALL_MODULES } from "@/lib/modules";
import { getIcon } from "@/lib/icons";

const HIGHLIGHTED = ["administration", "rbac", "automations", "mobile", "notifications", "monitoring"];

export function PlatformStrip() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14">
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3">Platform Power</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Operations sit on a serious platform.
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Enterprise-grade infrastructure — security, automation, mobile, monitoring — so your business modules just work.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HIGHLIGHTED.map((slug, i) => {
            const m = ALL_MODULES[slug];
            if (!m) return null;
            const Icon = getIcon(m.icon);
            return (
              <motion.div key={slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}>
                <Link href={`/product/${slug}`}
                  className="block bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 hover:border-amber-500/30 transition-colors group h-full">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 border"
                    style={{ background: `${m.accent}12`, borderColor: `${m.accent}30` }}>
                    <Icon size={14} style={{ color: m.accent }} />
                  </div>
                  <p className="text-white text-sm font-bold mb-1 leading-tight">{m.name}</p>
                  <p className="text-zinc-500 text-[11px] leading-snug">{m.tag}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10">
          <Link href="/product" className="group inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium">
            See all 44 modules <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
