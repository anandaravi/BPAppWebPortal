"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export type FeatureSectionProps = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  photo?: string;
  visual?: React.ReactNode;
  accent: string;
  flip?: boolean;
};

export function FeatureSection({ tag, title, body, points, photo, visual, accent, flip }: FeatureSectionProps) {
  return (
    <div className="border-b border-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: flip ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            {visual ? (
              visual
            ) : photo ? (
              <div className="relative rounded-2xl overflow-hidden h-80 border border-[#1f1f1f]">
                <Image src={photo} alt={tag} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full border text-xs font-bold"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}>
                  {tag}
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: flip ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accent }}>{tag}</p>
            <h3 className="text-3xl font-black text-white leading-tight mb-4">{title}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">{body}</p>
            <ul className="space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
