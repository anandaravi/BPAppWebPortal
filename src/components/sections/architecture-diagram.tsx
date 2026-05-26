"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_MODULES } from "@/lib/modules";
import { getIcon } from "@/lib/icons";

const DOMAINS = [
  {
    label: "Operations",
    color: "#F97316",
    slugs: [
      "production", "stock-preparation", "deckle", "converting-finishing",
      "broke-management", "quality", "maintenance", "lab-master", "recipe-development",
    ],
  },
  {
    label: "Commercial",
    color: "#F59E0B",
    slugs: ["sales", "procurement", "crm", "helpdesk", "marketing-automation", "field-service", "party"],
  },
  {
    label: "Supply Chain",
    color: "#10B981",
    slugs: ["inventory", "product-catalog", "pricing", "lookups", "number-series"],
  },
  {
    label: "Finance & People",
    color: "#3B82F6",
    slugs: ["finance", "hr", "approvals", "audit"],
  },
  {
    label: "Intelligence",
    color: "#A855F7",
    slugs: ["ai", "automations", "rpa", "voice", "document-intelligence", "mobile", "documents", "engineering-change"],
  },
  {
    label: "Platform",
    color: "#64748B",
    slugs: [
      "administration", "rbac", "email-hub", "notifications",
      "monitoring", "projects", "business-profile",
      "iot-devices", "digital-twin", "sustainability", "edge-computing",
    ],
  },
];

export function ArchitectureDiagram() {
  return (
    <section className="py-28 bg-[#080808] relative overflow-hidden">
      {/* subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff06 1px, transparent 1px), linear-gradient(to bottom, #ffffff06 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Platform Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            44 modules.{" "}
            <span className="text-zinc-500">One connected platform.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base max-w-xl">
            Activate only what you need today. Every module shares the same data
            layer — no integrations, no silos, no duplicate master data.
          </p>
        </motion.div>

        <div className="space-y-3">
          {DOMAINS.map((domain, di) => (
            <motion.div
              key={domain.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: di * 0.07 }}
              className="group relative rounded-xl border border-[#1f1f1f] bg-[#0c0c0c] hover:border-[#2a2a2a] transition-colors overflow-hidden"
            >
              {/* left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ background: domain.color }}
              />

              <div className="pl-5 pr-4 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* domain label */}
                <div className="sm:w-36 shrink-0">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: domain.color }}
                  >
                    {domain.label}
                  </span>
                  <div className="text-zinc-600 text-xs mt-0.5 font-mono">
                    {domain.slugs.length} modules
                  </div>
                </div>

                {/* module chips */}
                <div className="flex flex-wrap gap-2">
                  {domain.slugs.map((slug, i) => {
                    const m = ALL_MODULES[slug];
                    if (!m) return null;
                    const Icon = getIcon(m.icon);
                    return (
                      <motion.div
                        key={slug}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: di * 0.07 + i * 0.03 }}
                      >
                        <Link
                          href={`/product/${slug}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-all duration-200 hover:scale-105"
                          style={{
                            background: `${m.accent}10`,
                            borderColor: `${m.accent}25`,
                            color: "#d1d5db",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${m.accent}20`;
                            e.currentTarget.style.borderColor = `${m.accent}50`;
                            e.currentTarget.style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${m.accent}10`;
                            e.currentTarget.style.borderColor = `${m.accent}25`;
                            e.currentTarget.style.color = "#d1d5db";
                          }}
                        >
                          <Icon size={11} style={{ color: m.accent }} />
                          {m.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* connector lines between platform row and others — decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center gap-4 text-xs text-zinc-600"
        >
          <span className="w-1 h-1 rounded-full bg-amber-500" />
          All domains share a unified data layer — no ETL, no sync, no siloed databases.
          <Link
            href="/architecture"
            className="text-amber-500 hover:text-amber-400 transition-colors font-medium ml-auto shrink-0"
          >
            Architecture deep-dive →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
