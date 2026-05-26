"use client";

import { motion } from "framer-motion";

export type WorkflowNode = {
  id: string;
  label: string;
  sub?: string;
  variant?: "start" | "active" | "end" | "default";
};

export type WorkflowEdge = {
  from: string;
  to: string;
  label?: string;
};

export type WorkflowDiagramProps = {
  title?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  accent: string;
  layout?: "horizontal" | "wrap";
};

const VARIANT_STYLES: Record<NonNullable<WorkflowNode["variant"]>, { bg: string; border: string; text: string }> = {
  start: { bg: "bg-emerald-500/15", border: "border-emerald-500/30", text: "text-emerald-300" },
  active: { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-300" },
  end: { bg: "bg-zinc-500/15", border: "border-zinc-500/30", text: "text-text-2" },
  default: { bg: "bg-surface-2", border: "border-[#262626]", text: "text-foreground" },
};

export function WorkflowDiagram({ title, nodes, edges, accent, layout = "wrap" }: WorkflowDiagramProps) {
  void edges;
  void accent;
  return (
    <div className="bg-background border border-border-dim rounded-2xl p-6 md:p-8">
      {title && <p className="text-xs text-text-3 mb-5 uppercase tracking-widest font-semibold">{title}</p>}

      <div className={layout === "wrap" ? "flex flex-wrap items-center gap-3" : "flex items-center gap-3 overflow-x-auto"}>
        {nodes.map((n, i) => {
          const v = VARIANT_STYLES[n.variant ?? "default"];
          return (
            <div key={n.id} className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`min-w-[120px] rounded-xl border px-4 py-3 ${v.bg} ${v.border} flex flex-col items-center text-center`}>
                <span className={`text-sm font-bold ${v.text}`}>{n.label}</span>
                {n.sub && <span className="text-[10px] text-text-3 mt-0.5 font-mono">{n.sub}</span>}
              </motion.div>
              {i < nodes.length - 1 && (
                <motion.svg
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.1 }}
                  width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-zinc-700 flex-shrink-0">
                  <path d="M0 6 H 14 M 10 1 L 14 6 L 10 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </motion.svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
