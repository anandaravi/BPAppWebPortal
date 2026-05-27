"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Play } from "lucide-react";

type Shot = { src: string; label: string };
type TourTab = {
  slug: string;
  label: string;
  tag: string;
  headline: string;
  body: string;
  bullets: string[];
  hero: string;
  shots: Shot[];
  accent: string;
  href: string;
};

const TABS: TourTab[] = [
  {
    slug: "deckle",
    label: "Deckle Optimizer",
    tag: "Trim Optimization",
    headline: "Eliminate slitting waste with 3-tier optimization.",
    body: "Instant adjustments (<2s), shift planning (5–30s), daily optimization (≤5 min, 180+ constraints). Every plan explainable, every pattern auto-learned.",
    bullets: [
      "3-tier optimization engine with SWO recovery",
      "Pattern learning after 10 approved plans",
      "Plan vs actual reconciliation",
      "Cutter feasibility on pocket auto-detection",
    ],
    hero: "/images/heroes/deckle-hero.jpg",
    shots: [
      { src: "/images/features/deckle--3-tier-optimization.jpg", label: "3-tier engine" },
      { src: "/images/features/deckle--explainability.jpg", label: "Explainability" },
      { src: "/images/features/deckle--pattern-learning.jpg", label: "Pattern learning" },
    ],
    accent: "#EF4444",
    href: "/product/deckle",
  },
  {
    slug: "production",
    label: "Production",
    tag: "MES + Planning",
    headline: "Plan, execute, and optimize every production run.",
    body: "MPS/MRP with capacity planning, shop-floor execution, OEE dashboards, downtime categorization, NCR/CAPA workflow.",
    bullets: [
      "Capacity-aware machine scheduling",
      "Real-time OEE per machine",
      "Downtime root-cause analytics",
      "Quality lab + NCR/CAPA pipeline",
    ],
    hero: "/images/heroes/production-hero.jpg",
    shots: [
      { src: "/images/features/production--planning-layers.jpg", label: "Planning layers" },
      { src: "/images/features/production--analytics-oee.jpg", label: "OEE analytics" },
      { src: "/images/features/production--shop-floor-execution.jpg", label: "Shop floor" },
    ],
    accent: "#F97316",
    href: "/product/production",
  },
  {
    slug: "sales",
    label: "Sales",
    tag: "Order to Cash",
    headline: "Quote to e-invoice — without leaving the platform.",
    body: "Smart order routing, recurring orders, GSTR-1 auto-filing, dispatch control tower, weighbridge reconciliation, export compliance.",
    bullets: [
      "Inventory-aware fulfillment suggestions",
      "e-Way bill + FTA/RoDTEP automation",
      "Real-time dispatch control tower",
      "Margin tracking + credit dunning",
    ],
    hero: "/images/heroes/sales-hero.jpg",
    shots: [
      { src: "/images/features/sales--sales-order-lifecycle.jpg", label: "Order lifecycle" },
      { src: "/images/features/sales--dispatch-control-tower.jpg", label: "Dispatch" },
      { src: "/images/features/sales--invoicing-e-invoice.jpg", label: "e-Invoice" },
    ],
    accent: "#10B981",
    href: "/product/sales",
  },
  {
    slug: "finance",
    label: "Finance",
    tag: "GST + Trade Finance",
    headline: "Indian compliance isn't an add-on. It's built in.",
    body: "GSTR-1/3B auto-filing, ITC ledger, RCM/TCS/TDS, FEMA tracking, LC management, cost accounting segmented by grade and machine.",
    bullets: [
      "GSTR-1/3B auto-filing with IRN generation",
      "RCM / TCS / TDS auto-deductions",
      "LC + invoice discounting + ECGC",
      "Cost variance by production line",
    ],
    hero: "/images/heroes/finance-hero.jpg",
    shots: [
      { src: "/images/features/finance--gst-compliance.jpg", label: "GST" },
      { src: "/images/features/finance--trade-finance.jpg", label: "Trade finance" },
      { src: "/images/features/finance--costing-budgets.jpg", label: "Costing" },
    ],
    accent: "#14B8A6",
    href: "/product/finance",
  },
  {
    slug: "ai",
    label: "AI & Analytics",
    tag: "Natural Language",
    headline: "Ask anything about your mill — act instantly.",
    body: "Chat across sales, production, and finance in one query. Auditable history. Configurable per deployment (Claude / Gemini / OpenAI).",
    bullets: [
      "Cross-module insights from one query",
      "AI bulk actions with human-in-the-loop",
      "Auditable chat history",
      "Predictive analytics — 5-phase",
    ],
    hero: "/images/heroes/ai-hero.jpg",
    shots: [
      { src: "/images/features/ai--conversational-ai.jpg", label: "Chat" },
      { src: "/images/features/ai--bulk-actions.jpg", label: "Bulk actions" },
      { src: "/images/features/ai--predictive-analytics-5-phases.jpg", label: "Predictive" },
    ],
    accent: "#F59E0B",
    href: "/product/ai",
  },
  {
    slug: "inventory",
    label: "Inventory",
    tag: "Batch Traceability",
    headline: "Batch-level traceability from receipt to dispatch.",
    body: "FEFO allocation, reel serial numbering, multi-warehouse transfers, QC holds, sampling plans, cycle counts, one-click batch recalls.",
    bullets: [
      "FEFO / FIFO / weighted-average valuation",
      "Batch split, merge, recall management",
      "Physical verification with blind count",
      "Consignment stock + lot serialization",
    ],
    hero: "/images/heroes/inventory-hero.jpg",
    shots: [
      { src: "/images/features/inventory--batch-management.jpg", label: "Batch mgmt" },
      { src: "/images/features/inventory--grn-workflow.jpg", label: "GRN" },
      { src: "/images/features/inventory--quality-recall.jpg", label: "Recall" },
    ],
    accent: "#8B5CF6",
    href: "/product/inventory",
  },
];

export function ProductTour() {
  const [activeSlug, setActiveSlug] = useState<string>(TABS[0].slug);
  const [shotIdx, setShotIdx] = useState(0);

  const active = TABS.find((t) => t.slug === activeSlug) ?? TABS[0];
  const mainSrc = shotIdx === 0 ? active.hero : active.shots[shotIdx - 1].src;

  const switchTab = (slug: string) => {
    setActiveSlug(slug);
    setShotIdx(0);
  };

  return (
    <section className="relative py-24 border-y border-border bg-background">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2">
            <Play size={11} fill="currentColor" />
            Interactive Tour
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">
            See the product in 60 seconds.
          </h2>
          <p className="text-text-2 max-w-xl mx-auto">
            Click any module below — preview real screens, capabilities, and how it fits your mill.
          </p>
        </motion.div>

        {/* Tab strip */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-6 px-6 scrollbar-thin">
          {TABS.map((t) => {
            const isActive = t.slug === activeSlug;
            return (
              <button
                key={t.slug}
                onClick={() => switchTab(t.slug)}
                aria-pressed={isActive}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  isActive
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                    : "border-border bg-surface text-text-2 hover:text-foreground hover:border-amber-500/20"
                }`}
                style={isActive ? { boxShadow: `0 0 24px ${t.accent}22` } : undefined}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tour panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 bg-surface border border-border rounded-2xl overflow-hidden">
          {/* Left: image + thumbs */}
          <div className="p-3 lg:p-4 flex flex-col gap-3">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border-dim bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.slug}-${shotIdx}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mainSrc}
                    alt={shotIdx === 0 ? active.label : active.shots[shotIdx - 1].label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                {active.tag}
              </div>
            </div>

            {/* Thumb row */}
            <div className="grid grid-cols-4 gap-2">
              {[{ src: active.hero, label: "Overview" }, ...active.shots].map((s, i) => {
                const isSel = i === shotIdx;
                return (
                  <button
                    key={s.src}
                    onClick={() => setShotIdx(i)}
                    aria-label={`Show ${s.label}`}
                    aria-pressed={isSel}
                    className={`group relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                      isSel
                        ? "border-amber-500/60 ring-2 ring-amber-500/30"
                        : "border-border-dim hover:border-amber-500/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={s.label}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 px-1.5 py-1 bg-gradient-to-t from-black/85 to-transparent">
                      <p className="text-[9px] font-semibold text-white truncate text-left">
                        {s.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="p-6 lg:p-8 flex flex-col"
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                {active.headline}
              </h3>
              <p className="text-sm text-text-2 leading-relaxed mb-5">{active.body}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-text-2">
                    <Check
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: active.accent }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
                <Link
                  href={active.href}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
                >
                  Explore {active.label}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-border-light text-text-2 hover:text-foreground hover:border-amber-500/40 text-sm transition-colors"
                >
                  Live demo
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
