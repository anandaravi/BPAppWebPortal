"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export type DocFlowNode = {
  label: string;
  sub?: string;
  highlight?: boolean;
};

export function DocumentFlow({ title, nodes, accent }: { title?: string; nodes: DocFlowNode[]; accent: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
      {title && <p className="text-xs text-zinc-500 mb-6 uppercase tracking-widest font-semibold">{title}</p>}

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {nodes.map((n, i) => (
          <div key={n.label} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={`md:col-span-1 rounded-xl px-3 py-3 border text-center ${
                n.highlight
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-[#161616] border-[#262626] text-zinc-200"
              }`}>
              <p className="text-xs font-bold leading-tight">{n.label}</p>
              {n.sub && <p className="text-[10px] text-zinc-500 mt-1 font-mono">{n.sub}</p>}
            </motion.div>
            {i < nodes.length - 1 && (
              <ChevronRight size={18} className="hidden md:block mx-auto" style={{ color: accent, opacity: 0.6 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
