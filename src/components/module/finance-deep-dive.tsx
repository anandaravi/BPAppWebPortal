"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, IndianRupee, FileCheck, Receipt, BookOpen, Calculator,
  Globe, Wallet, BarChart3, Lock, AlertTriangle, CheckCircle2, Layers, Building2,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";

const GST_PILLARS = [
  {
    icon: Receipt, name: "E-Invoice & IRN", color: "#10B981", lightHex: "rgba(16,185,129,0.1)",
    title: "NIC IRP integration",
    desc: "Generate IRN with QR code the moment an invoice is finalized. Auto-link to e-Way bill. Handle the 30-day amendment window cleanly via cancel-and-reissue.",
    coverage: "B2B · B2C · Export · SEZ · RCM · Credit Notes",
  },
  {
    icon: FileCheck, name: "GSTR-1 Auto-File", color: "#34D399", lightHex: "rgba(52,211,153,0.1)",
    title: "Real return from real data",
    desc: "Register populates from e-invoices, B2C aggregates, exports, HSN summary, credit notes — all classified to the right table. Download JSON or file directly via API.",
    coverage: "Tables 4A · 4B · 5 · 6A · 6B · 7 · 8 · 9B · 12 · 13",
  },
  {
    icon: BookOpen, name: "GSTR-3B + ITC", color: "#6EE7B7", lightHex: "rgba(110,231,183,0.1)",
    title: "Cash vs credit visibility",
    desc: "GSTR-3B summary builds from sales + purchase registers with ITC ledger applied. See cash payable vs credit available before filing. ITC reversal triggers tracked (180-day rule, blocked credits, common credit).",
    coverage: "3.1 outward · 4 ITC · 5 exempt · 5.1 interest · 6.1 payment",
  },
  {
    icon: Globe, name: "GSTR-9 + Recon", color: "#A7F3D0", lightHex: "rgba(167,243,208,0.1)",
    title: "Annual + audit-ready",
    desc: "GSTR-9 annual return assembly with auto-reconciliation against monthly filings. GSTR-2B vs purchase register matching. Discrepancy reports ready for audit before filing window closes.",
    coverage: "GSTR-9 · GSTR-9C · GSTR-2B recon · ITC eligibility audit",
  },
];

const COSTING_LAYERS = [
  {
    stage: "Stage 1 — Pulping", icon: Layers, color: "#10B981",
    desc: "Furnish costs by virgin/recycled mix, chemical dosing, energy. Per-tonne pulp cost rolls up by recipe.",
    captures: "Raw fibre, NaOH, AKD, alum, retention aids, steam, kWh",
  },
  {
    stage: "Stage 2 — Stock prep & Paper", icon: Layers, color: "#34D399",
    desc: "Stock-prep additives (sizing, retention, drainage aids), wet-end + dry-end energy, wire + felt wear allocation.",
    captures: "Stock additives, steam (drying), kWh (vacuum + drives), wire/felt amortization",
  },
  {
    stage: "Stage 3 — Finishing", icon: Layers, color: "#6EE7B7",
    desc: "Calendering, slitting, reel-wrapping, packing. Conversion cost per slit pattern, deckle waste valuation.",
    captures: "Calender energy, slitter wear, wrap material, labour, deckle trim",
  },
  {
    stage: "Stage 4 — Variances", icon: BarChart3, color: "#A7F3D0",
    desc: "Standard vs actual variance split by material, labour, utility, overhead, FX, yield. Variances post to GL automatically on WO close.",
    captures: "Material price/qty, labour rate/efficiency, utility, overhead absorption, yield",
  },
];

const FEATURE_CATEGORIES = [
  {
    category: "GST Compliance", icon: Receipt, color: "#10B981", count: "22 capabilities",
    items: [
      "IRN generation via NIC IRP",
      "QR code embed on PDF",
      "E-Way bill auto-chain",
      "GSTR-1 auto-population",
      "GSTR-3B summary + ITC ledger",
      "GSTR-2B recon against purchases",
      "GSTR-9 annual return",
      "GSTR-9C reconciliation",
      "RCM journal auto-posting",
      "ITC reversal triggers (180-day rule)",
      "HSN summary export",
      "Multi-GSTIN per legal entity",
    ],
  },
  {
    category: "Costing & Variance", icon: Calculator, color: "#34D399", count: "18 capabilities",
    items: [
      "Multi-stage paper mill costing",
      "Per-grade × machine × shift breakdown",
      "Standard vs actual variance",
      "Material price + qty variance split",
      "Labour rate + efficiency variance",
      "Utility variance (kWh, steam, water)",
      "Overhead absorption per machine-hour",
      "FX gain/loss variance for imports",
      "Yield variance per BOM",
      "Landed cost for imported pulp",
      "Cost rollup per customer order",
      "Real-time margin per SKU",
    ],
  },
  {
    category: "AP / AR", icon: Wallet, color: "#6EE7B7", count: "20 capabilities",
    items: [
      "AP three-way match (PO ↔ GRN ↔ Invoice)",
      "TDS auto-deduct by section",
      "MSME 45-day payment enforcement",
      "AP aging 30/60/90/120+",
      "AR invoice posting to GL",
      "Multi-instrument receipt (NEFT/UPI/Cheque/LC)",
      "PDC register with bounce handling",
      "AR aging + dunning escalation",
      "Interest debit-note auto-gen",
      "Bad debt write-off workflow",
      "Customer credit limit enforcement",
      "Vendor blacklist + audit",
    ],
  },
  {
    category: "FEMA & Trade Finance", icon: Globe, color: "#A7F3D0", count: "16 capabilities",
    items: [
      "FEMA Master Directions compliance",
      "Shipping bill linkage to invoice",
      "ICEGATE EDI integration",
      "eBRC reconciliation",
      "SOFTEX / EDPMS tracking",
      "LC management (issuance → realization)",
      "Packing credit + post-shipment finance",
      "Invoice discounting / SCF",
      "ECGC export credit insurance",
      "Forex revaluation + FX gain/loss",
      "Multi-currency journal entries",
      "FTA / RoDTEP claim files",
    ],
  },
  {
    category: "Multi-Entity", icon: Building2, color: "#34D399", count: "14 capabilities",
    items: [
      "Multi-company legal entities",
      "Multi-GSTIN per company per state",
      "Multi-currency with FX revaluation",
      "Inter-company transactions + elimination",
      "Consolidated group reporting",
      "Per-entity COA with mapping",
      "Cross-entity payment routing",
      "Statutory entity separation in audit",
    ],
  },
  {
    category: "Period & Audit", icon: Lock, color: "#94A3B8", count: "12 capabilities",
    items: [
      "Soft-close + hard-close periods",
      "Period close checklist enforcement",
      "Re-open authorization audit",
      "Journal entry DRAFT → POSTED + reversal",
      "Accrual reversal workflow",
      "Trial balance drill-down",
      "Full audit trail per posting",
      "Read-only mode on locked budgets",
    ],
  },
];

const USE_CASES = [
  {
    title: "GST month-end close, no panic",
    photo: "/images/pages/finance-gst-close.jpg",
    scenario: "CFO of a 3-entity group used to spend 5 working days every month-end reconciling GSTR-1, matching GSTR-2B against purchases, and chasing IRN failures.",
    response: "GSTR-1 populates live from IRN-generated invoices. GSTR-2B recon shows mismatches the day they appear, not at filing. ITC ledger live across all 3 GSTINs. CFO reviews exceptions for 2 hours, files for all entities by 5pm of day 1.",
    metrics: { close_days: "5 → 0.5", mismatches_found: "Live", filings: "3 GSTINs" },
  },
  {
    title: "Margin per customer × grade, daily",
    photo: "/images/pages/finance-margin.jpg",
    scenario: "Sales head wants to know real margin by customer × grade. Finance team produces it quarterly — too late to act when a customer is unprofitable.",
    response: "Multi-stage costing rolls up live. Each invoice tags actual cost (pulp batch, machine hours, energy, conversion). Margin per line visible the same day. Sales head spots customer ABC at -1.2% margin on KR-80, renegotiates within the week.",
    metrics: { granularity: "Customer × Grade", lag: "Same day", margin_recovered: "+2.4%" },
  },
  {
    title: "Export shipment: from PO to eBRC",
    photo: "/images/pages/finance-export.jpg",
    scenario: "Export order to Bangladesh customer. Sales raises invoice, dispatch generates shipping bill, bank realizes proceeds 35 days later. Finance traditionally reconciles eBRC weeks after.",
    response: "Sales order → invoice → shipping bill linked end-to-end. ICEGATE EDI confirms. Bank realization auto-matches against shipping bill, generates eBRC entry. FEMA monitor flags any export approaching realization deadline. No manual stitching, no FEMA breach.",
    metrics: { reconciliation: "Auto", deadline_alerts: "Live", FEMA_breaches: "0" },
  },
  {
    title: "Three-way match catches ₹4.7L overcharge",
    photo: "/images/pages/finance-3way-match.jpg",
    scenario: "Pulp supplier raises AP invoice for ₹84.3L. PO was ₹79.6L. GRN was 102 t against 100 t ordered, but supplier billed pre-agreed rate +6% (post-contract revision they hadn't intimated).",
    response: "Three-way match flags ₹4.7L variance. Payment blocked. AP exec sends auto-drafted dispute mail with PO, GRN and invoice attached. Supplier acknowledges error, issues credit note. Payment released against net amount.",
    metrics: { variance_caught: "₹4.7L", time_to_resolve: "2 days", payment_block: "Auto" },
  },
];

const PERFORMANCE = [
  { metric: "GST month-end close", manual: "5 days", deckle: "Half day", improvement: "10× faster" },
  { metric: "GSTR-1 / 3B reconciliation", manual: "After filing", deckle: "Live", improvement: "Preventive" },
  { metric: "Margin visibility lag", manual: "Quarterly", deckle: "Same day", improvement: "60× tighter" },
  { metric: "AP overpayment risk", manual: "Manual review", deckle: "Auto-blocked", improvement: "Zero leaks" },
  { metric: "FEMA breach incidents", manual: "1-2 / year", deckle: "0", improvement: "Eliminated" },
  { metric: "Period close audit findings", manual: "10-15 / cycle", deckle: "< 2", improvement: "7× cleaner" },
];

const TIMELINE = [
  { week: "Week 1", title: "COA + entities + GSTIN", items: ["Multi-company structure", "COA migration with mapping", "GSTIN registration per state", "Opening balances + reconciliation"] },
  { week: "Week 2", title: "Tax + compliance setup", items: ["IRN integration with NIC IRP", "TDS section configuration", "RCM rule library", "E-Way bill credentials"] },
  { week: "Week 3", title: "Costing + AP/AR config", items: ["Multi-stage costing per machine", "Three-way match tolerances", "MSME suppliers flagged", "AR aging buckets + dunning"] },
  { week: "Week 4", title: "Go-live + parallel run", items: ["Live invoice + IRN flow", "GSTR-1 register live", "AP three-way match enforced", "Parallel run vs legacy for 1 cycle"] },
  { week: "Week 5+", title: "Full cutover", items: ["Legacy system frozen", "GSTR-3B filed via module", "Variance reports tuned", "Audit trail validated"] },
];

export function FinanceDeepDive({ data }: { data: ModuleData }) {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <Image src="/images/pages/finance-deepdive-hero.jpg"
            alt="Finance and GST compliance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20 min-h-[88vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <IndianRupee size={12} /> Compliance Core · Finance & GST
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tight mb-6 max-w-5xl">
            Indian compliance.<br />
            <span style={{ background: "linear-gradient(135deg, #10B981, #6EE7B7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Native, not bolted on.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-2 max-w-2xl mb-10 leading-relaxed">
            GST e-invoice, GSTR-1 / 3B / 9 / 2B reconciliation, ITC ledger, RCM. Multi-stage
            costing for paper mills. FEMA + trade finance. Multi-company, multi-currency,
            multi-GSTIN. Real-time margin per customer × grade. Built for Indian paper manufacturing.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Get a live demo <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/product" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all">
              <ArrowLeft size={14} /> All Modules
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[
              { value: "GSTR-1/3B/9", label: "auto-filing", color: "#10B981" },
              { value: "Multi-GSTIN", label: "per company", color: "#34D399" },
              { value: "FEMA", label: "+ trade finance", color: "#6EE7B7" },
              { value: "Live", label: "margin per SKU", color: "#A7F3D0" },
            ].map((m) => (
              <div key={m.label} className="bg-surface/85 backdrop-blur border border-border-dim rounded-xl p-4">
                <p className="text-2xl font-black font-mono mb-1" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs text-text-3">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 border-y border-border-dim bg-background">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> Generic ERPs underdeliver here
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6 leading-tight">
                Indian GST is <span className="text-emerald-300">not a configuration</span>. It&apos;s a system.
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-6">
                Most global ERPs bolt GST on top — separate filing tool, IRN add-on, GSTR
                reconciliation as an after-thought. Result: five-day month-ends, frequent
                ITC mismatches, FEMA stress on every export.
              </p>
              <p className="text-text-3 text-sm leading-relaxed">
                Paper mills layer additional complexity — multi-stage costing, RCM on transport,
                fibre import via LC, multi-GSTIN across plants. The Finance module is engineered
                around these realities, not adapted to them.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-surface border border-border-dim rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-mono text-text-4 mb-5">Compliance overhead · 3-entity group</p>
              <div className="space-y-4">
                {[
                  { label: "Month-end close (legacy)", value: "5 days", bar: 100, color: "#EF4444" },
                  { label: "GSTR-2B mismatch rate", value: "8.4%", bar: 75, color: "#F59E0B" },
                  { label: "FEMA exceptions/year", value: "12", bar: 55, color: "#FBBF24" },
                  { label: "Month-end (with module)", value: "0.5 day", bar: 90, color: "#34D399" },
                ].map((row, i) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-text-2">{row.label}</span>
                      <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                    </div>
                    <div className="h-2.5 bg-surface-3 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full" style={{ background: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-text-4 mt-5 font-mono leading-relaxed">
                * 3-entity paper group, 5 GSTINs, post-6 month deployment baseline.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GST PILLARS */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">GST Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Four pillars. End-to-end GST.
          </h2>
          <p className="text-text-2 text-lg max-w-3xl mb-14 leading-relaxed">
            From IRN at the point of invoice to annual GSTR-9 reconciliation — every step is
            engineered, integrated, and audit-ready.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GST_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface border rounded-2xl p-6 flex flex-col gap-4"
                  style={{ borderColor: `${p.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: p.lightHex, borderColor: `${p.color}40` }}>
                      <Icon size={20} style={{ color: p.color }} />
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: p.color }}>{p.name}</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1">{p.title}</h3>
                  </div>
                  <p className="text-sm text-text-2 leading-relaxed">{p.desc}</p>
                  <div className="pt-3 border-t border-border-dim">
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: p.color }}>Coverage</p>
                    <p className="text-[11px] text-text-2 font-mono">{p.coverage}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COSTING STAGES */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Multi-Stage Costing</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Cost the way a paper mill actually runs.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Four costing stages from pulp to finished reel. Standard vs actual tracked at each stage with variance posted automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COSTING_LAYERS.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div key={l.stage}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-surface border rounded-2xl p-5 flex flex-col gap-3"
                  style={{ borderColor: `${l.color}30` }}>
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center"
                    style={{ background: `${l.color}12`, borderColor: `${l.color}30` }}>
                    <Icon size={16} style={{ color: l.color }} />
                  </div>
                  <h3 className="text-foreground font-bold text-sm">{l.stage}</h3>
                  <p className="text-xs text-text-2 leading-relaxed">{l.desc}</p>
                  <div className="pt-2 border-t border-border-dim">
                    <p className="text-[9px] uppercase tracking-widest font-semibold mb-1" style={{ color: l.color }}>Captures</p>
                    <p className="text-[10px] text-text-2 font-mono leading-relaxed">{l.captures}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAMPLE INVOICE */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Sample Invoice</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">From SO to IRN to GSTR-1.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            A real invoice flow — sales order → invoice → IRN → e-Way bill → GSTR-1 register entry. Zero re-keying.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dim bg-background">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-text-3">INVOICE</span>
                <span className="text-sm font-bold text-foreground font-mono">INV-2026-04-2871</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">IRN GENERATED</span>
              </div>
              <div className="flex items-center gap-5 text-xs text-text-3">
                <span>GSTIN: <span className="text-foreground font-mono">29ABCDE1234F1Z5</span></span>
                <span>Date: <span className="text-foreground font-mono">12-Apr-2026</span></span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-6 border-b border-border-dim bg-[#0c0c0c]">
              {[
                { label: "Taxable value", value: "₹14,28,400", color: "#10B981" },
                { label: "CGST 9%", value: "₹1,28,556", color: "#34D399" },
                { label: "SGST 9%", value: "₹1,28,556", color: "#34D399" },
                { label: "Total invoice", value: "₹16,85,512", color: "#6EE7B7" },
                { label: "IRN status", value: "ACK 14:21", color: "#A7F3D0" },
              ].map((s) => (
                <div key={s.label} className="bg-background rounded-lg p-3 border border-border-dim">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1 font-semibold">{s.label}</p>
                  <p className="text-base font-black font-mono" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-text-3 mb-4">Document chain</p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {[
                  { label: "SO-2847", color: "#3B82F6" },
                  { label: "DC-1894", color: "#8B5CF6" },
                  { label: "INV-2026-04-2871", color: "#10B981" },
                  { label: "IRN: 35a1b…f2c8", color: "#34D399" },
                  { label: "QR ✓", color: "#6EE7B7" },
                  { label: "EWB: 7728…1140", color: "#A7F3D0" },
                  { label: "GSTR-1 Tbl 4A", color: "#FBBF24" },
                ].map((step, i) => (
                  <span key={step.label} className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded border" style={{ borderColor: `${step.color}40`, background: `${step.color}10`, color: step.color }}>{step.label}</span>
                    {i < 6 && <ArrowRight size={12} className="text-zinc-700" />}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border-dim grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: "Real-time margin", value: "+18.4%", desc: "Cost rolled up from pulp batch BAT-9817, PM-2 shift A, conversion stage." },
                  { title: "ITC implication", value: "₹84,256", desc: "Buyer's eligible ITC. Will appear in their GSTR-2B for April." },
                  { title: "FEMA flag", value: "N/A", desc: "Domestic invoice. No FEMA tracking required." },
                ].map((c) => (
                  <div key={c.title} className="bg-background rounded-lg p-3 border border-border-dim">
                    <p className="text-[10px] text-text-3 uppercase tracking-wider mb-0.5 font-semibold">{c.title}</p>
                    <p className="text-lg font-black font-mono text-emerald-300 mb-1">{c.value}</p>
                    <p className="text-[11px] text-text-3 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Capability Catalog</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            100+ capabilities. Six categories.
          </h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Every screen built around Indian compliance reality — not patched in via configuration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="bg-surface border border-border-dim rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{ background: `${cat.color}12`, borderColor: `${cat.color}30` }}>
                        <Icon size={16} style={{ color: cat.color }} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-bold text-base">{cat.category}</h3>
                        <p className="text-[10px] font-mono" style={{ color: cat.color }}>{cat.count}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-xs text-text-2 flex items-start gap-1.5 leading-relaxed">
                        <span style={{ color: cat.color }}>·</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Real finance team scenarios.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Four moments where the Finance module pays for itself.
          </p>

          <div className="space-y-12">
            {USE_CASES.map((uc, i) => (
              <motion.div key={uc.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-60 lg:h-auto border border-border-dim">
                  <Image src={uc.photo} alt={uc.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-emerald-300">Case {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-foreground text-xl font-black drop-shadow leading-tight">{uc.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-surface border border-border-dim rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Scenario</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-300 mb-2">Module Response</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.response}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-dim">
                    {Object.entries(uc.metrics).map(([k, v]) => (
                      <div key={k} className="bg-background rounded-lg p-3 border border-border-dim text-center">
                        <p className="text-[9px] uppercase tracking-wider text-text-3 mb-0.5 font-mono">{k.replace(/_/g, " ")}</p>
                        <p className="text-base font-black font-mono text-emerald-300">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Performance Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Legacy ERP vs Papyrus Finance.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Before/after on a 3-entity paper group, 6 months post-go-live.
          </p>

          <div className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-4 border-b border-border-dim bg-background text-[10px] uppercase tracking-widest font-semibold text-text-3">
              <span>Metric</span>
              <span className="text-center">Legacy / Generic ERP</span>
              <span className="text-center">With Module</span>
              <span className="text-right">Improvement</span>
            </div>
            {PERFORMANCE.map((row, i) => (
              <motion.div key={row.metric}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="grid grid-cols-4 px-6 py-4 border-b border-border-dim last:border-0 items-center">
                <span className="text-sm text-text-2">{row.metric}</span>
                <span className="text-sm text-text-3 font-mono text-center">{row.manual}</span>
                <span className="text-sm text-emerald-400 font-mono text-center font-bold">{row.deckle}</span>
                <span className="text-xs text-emerald-300 font-mono text-right">{row.improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">Implementation</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Live in one fiscal month.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Sequenced so the next GSTR-1 cycle runs on the module. Parallel run with legacy for one cycle, then cutover.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent hidden md:block" />
            <div className="space-y-5">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.week}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface border-2 border-emerald-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-emerald-300">
                    {step.week.replace("Week ", "W")}
                  </div>
                  <div className="bg-surface border border-border-dim rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-emerald-300 font-mono">{step.week}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-text-2 flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="mt-0.5 text-emerald-300 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureCardGrid eyebrow="Every Capability" title="Drill into any feature." cards={data.capabilities} accent={data.accent} moduleSlug={data.slug} />
      <IntegrationMap moduleName={data.name} integrations={data.integrations} accent={data.accent} />
      <CTABanner />
    </div>
  );
}
