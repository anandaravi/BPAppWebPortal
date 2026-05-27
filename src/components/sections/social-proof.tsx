"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { CLIENTS } from "@/lib/clients";

const TESTIMONIALS = CLIENTS.filter((c) => c.testimonial).slice(0, 3);

const LOGO_ROW = [
  "JK Papers",
  "NR Agarwal",
  "Mehali Papers",
  "Lemit Paper",
  "TNPL",
  "ITC Paperboards",
  "Century Pulp",
  "Trident Paper",
  "Khanna Paper",
  "Naini Papers",
  "Emami Paper",
  "Seshasayee Paper",
];

export function SocialProof() {
  return (
    <section className="relative py-20 border-y border-border bg-background">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
            Trusted by Indian Paper Industry
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            38 mills across India + Gulf run on Papyrus
          </h2>
        </motion.div>

        {/* Logo wall — marquee */}
        <div className="relative overflow-hidden mb-16 mask-fade-x">
          <div className="flex gap-3 animate-marquee whitespace-nowrap will-change-transform">
            {[...LOGO_ROW, ...LOGO_ROW].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border-dim bg-surface text-text-2 text-sm font-semibold font-mono tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col"
            >
              <Quote size={18} className="text-amber-400 mb-3 flex-shrink-0" />
              <p className="text-sm text-text-2 leading-relaxed mb-5 flex-1 line-clamp-6">
                &ldquo;{c.testimonial}&rdquo;
              </p>
              <div className="border-t border-border-dim pt-4">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-text-3 mt-0.5">
                  {c.city}, {c.state} · {c.grade ?? "Paper Manufacturing"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
