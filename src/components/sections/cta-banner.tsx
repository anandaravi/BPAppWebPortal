"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/heroes/sales-hero.jpg"
          alt="Paper mill" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#080808]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />

      <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-5">Ready to modernize your mill?</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            See Papyrus BPApp<br />in your mill.
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book a personalized demo. We&apos;ll walk through every module relevant to your
            operation — from Deckle optimization to GSTR-3B compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200">
              Request a Demo
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href={`mailto:${SITE.email}`}
              className="px-8 py-4 rounded-xl border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all duration-200">
              Email us directly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
