"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, AlertCircle } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const ROLES = [
  {
    id: "cfo",
    title: "CFO / Finance Controller",
    blurb: "GST, FEMA, ITC, AR aging, cost variance, period-close. Compliance without spreadsheet panic.",
    photo: "/images/pages/solutions-cfo.jpg",
    accent: "#10B981",
    kpis: ["DSO < 45 days", "GSTR-1/3B on time, every month", "ITC realization > 95%", "Cost variance within ±3%", "FX gain/loss tracked + posted"],
    modules: ["Finance & GST", "Sales (AR + Dunning)", "Procurement (3-way match)", "Party Management", "Documents", "Notifications (Tax calendar)"],
    pain: "Closing books while waiting for GST data. ITC mismatches with supplier filings. Forex exposure unaccounted. Credit risk across hundreds of customers.",
    outcome: "GSTR-1 auto-populates from e-invoices the moment they're issued. AR aging surfaces before customers go silent. Period-close runs to checklist, not chaos.",
  },
  {
    id: "plant-head",
    title: "Plant Head / Production Director",
    blurb: "OEE, downtime, broke recovery, schedule compliance, quality first-pass yield. The shop floor on one screen.",
    photo: "/images/pages/solutions-plant-head.jpg",
    accent: "#F59E0B",
    kpis: ["OEE > 85% per machine", "Broke < 4% of production", "Schedule adherence > 92%", "First-pass yield > 96%", "Mean Time To Repair < 2 hours"],
    modules: ["Production (MPS/MRP/CRP)", "Deckle Optimizer", "Quality Control", "Maintenance", "Mobile Apps (shop floor)", "Monitoring (live metrics)"],
    pain: "Yesterday's OEE buried in spreadsheets. Broke piling up without root-cause visibility. Maintenance reacting to breakdowns. Trim waste eating margins.",
    outcome: "Live OEE per machine. Broke Pareto by source. Predictive maintenance schedules running. Deckle optimizer saving ₹100K+/month at the winder.",
  },
  {
    id: "ops-head",
    title: "Operations Manager / GM",
    blurb: "Order-to-dispatch SLA, customer satisfaction, inventory turns, working capital. The business view.",
    photo: "/images/pages/solutions-ops-manager.jpg",
    accent: "#A855F7",
    kpis: ["Order-to-dispatch < 14 days avg", "On-time delivery > 95%", "Inventory turns > 8/year", "Customer complaint rate < 0.5%", "Working capital days < 60"],
    modules: ["Sales (Order management)", "Inventory (FEFO)", "Production planning", "Dispatch Control Tower", "AI & Analytics", "Approvals"],
    pain: "Orders stuck in approval queues. Inventory imbalances — wrong grades in stock. Dispatch chaos near month-end. No single view of business health.",
    outcome: "Live dashboard across order pipeline, mill utilization, dispatch queue, and cash position. Approvals routed automatically. AI surfaces anomalies before they cost money.",
  },
  {
    id: "it-head",
    title: "IT Head / CIO",
    blurb: "Uptime, security, integration, compliance, total cost of ownership. The platform view.",
    photo: "/images/pages/solutions-it-head.jpg",
    accent: "#3B82F6",
    kpis: ["System uptime > 99.5%", "API p95 latency < 200ms", "Security audit pass rate 100%", "Integration SLA met", "User satisfaction > 4.2/5"],
    modules: ["Administration", "RBAC & Security", "Monitoring", "Automations", "Documents", "Email Hub"],
    pain: "Patchwork of point tools. RBAC inconsistencies across systems. Audit prep eating quarters. Integration brittleness slowing the business.",
    outcome: "One platform, one RBAC, one audit trail. SOC 2 / ISO 27001 evidence exports. Pre-built connectors for SAP, Oracle, Tally. Self-service onboarding and offboarding.",
  },
  {
    id: "sales-head",
    title: "Sales / Commercial Head",
    blurb: "Pipeline, win rate, customer LTV, margin, exposure. Sell more, sell smarter.",
    photo: "/images/pages/solutions-sales-head.jpg",
    accent: "#EC4899",
    kpis: ["Quotation-to-order > 35%", "Average margin > target by grade", "Pipeline coverage 3× quota", "Customer churn < 5% annual", "Credit exposure within limits"],
    modules: ["Sales (Inquiries → Orders)", "Party Management", "AI (lead scoring, churn)", "Email Hub", "Analytics", "Approvals"],
    pain: "Reps quoting from memory. Lost deals without loss reason. Credit exposure invisible until it's too late. Repeat customers receiving inconsistent service.",
    outcome: "Lead scoring focuses reps on high-conversion inquiries. Margin engine prevents discount giveaway. Credit checks before order entry. AI predicts churn early.",
  },
  {
    id: "hr-head",
    title: "HR Head / People Director",
    blurb: "Headcount, attendance, payroll accuracy, statutory compliance, attrition. The workforce view.",
    photo: "/images/pages/solutions-hr-head.jpg",
    accent: "#F472B6",
    kpis: ["Payroll error rate < 0.1%", "Statutory filings 100% on time", "Attrition < industry benchmark", "Engagement score > 4.0", "PII access incidents = 0"],
    modules: ["HR & Payroll", "ESS / MSS", "Documents (employee records)", "Notifications", "Mobile Apps", "RBAC (PII gates)"],
    pain: "Payroll surprises from missed attendance. PF ECR rejections at the portal. Shift compliance grey zones. PII access without audit trail.",
    outcome: "Attendance flows direct to payroll. Statutory deductions auto-calculated. ECR-ready exports for the PF portal. Every PII access audit-logged per Aadhaar Act.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <Image src="/images/pages/solutions-hero.jpg"
            alt="Solutions" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Target size={12} /> Solutions by Role
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 max-w-4xl">
            Built for the<br /><span className="amber-text">people who run the mill.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-2 max-w-2xl mb-10 leading-relaxed">
            Whether you own the P&amp;L, the shop floor, the IT stack, or the people, Papyrus BPApp
            gives you the KPIs, dashboards, and workflows your role actually needs — without the
            ones it doesn&apos;t.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Find your role <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/customers" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all">
              ← By company type
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-20 border-y border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6 space-y-12">
          {ROLES.map((r, i) => (
            <motion.div key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Photo + role */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-72 lg:h-auto border border-border-dim">
                <Image src={r.photo} alt={r.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <span className="self-start px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: r.accent, borderColor: `${r.accent}50`, background: `${r.accent}15` }}>
                    Role
                  </span>
                  <div>
                    <h3 className="text-foreground text-2xl font-black mb-2 drop-shadow leading-tight">{r.title}</h3>
                    <p className="text-xs text-text-2 leading-relaxed">{r.blurb}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 bg-surface border border-border-dim rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={13} className="text-red-400" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400">Daily Pain</p>
                  </div>
                  <p className="text-sm text-text-2 leading-relaxed">{r.pain}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={13} style={{ color: r.accent }} />
                    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: r.accent }}>KPIs Tracked</p>
                  </div>
                  <ul className="space-y-1">
                    {r.kpis.map((k) => (
                      <li key={k} className="text-xs text-text-2 flex items-start gap-1.5">
                        <span style={{ color: r.accent }}>·</span> {k}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={13} className="text-amber-400" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">Modules That Help</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.modules.map((m) => (
                      <span key={m}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-md border"
                        style={{ background: `${r.accent}10`, borderColor: `${r.accent}30`, color: r.accent }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 pt-3 border-t border-border-dim">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400 mb-1.5">What changes</p>
                  <p className="text-xs text-text-2 leading-relaxed">{r.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
