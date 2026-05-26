"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Users, ShieldCheck, Fingerprint, Smartphone, FileCheck, Clock,
  Calendar, AlertTriangle, CheckCircle2, BarChart3, Calculator, Wallet, HardHat,
  ClipboardCheck, ScrollText, UserCheck, Briefcase,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";

const STATUTORY = [
  {
    icon: ShieldCheck, name: "PF (EPFO)", color: "#EC4899", lightHex: "rgba(236,72,153,0.1)",
    title: "Provident Fund",
    desc: "Employee + employer contributions calculated per UAN. Monthly ECR file generation, EPFO portal integration, PF transfer-out on separation, retirement payouts. Per-state minimum wage compliance.",
    coverage: "ECR · UAN · EPS · EDLI · KYC sync",
  },
  {
    icon: ShieldCheck, name: "ESI", color: "#F472B6", lightHex: "rgba(244,114,182,0.1)",
    title: "Employee State Insurance",
    desc: "Wage-ceiling tracking (₹21K threshold), contribution computation, monthly challan, dispensary linkage. Auto-enrol new joiners, exit on threshold breach.",
    coverage: "Contributions · Challan · IP card · Dispensary",
  },
  {
    icon: ScrollText, name: "PT", color: "#F9A8D4", lightHex: "rgba(249,168,212,0.1)",
    title: "Professional Tax",
    desc: "State-specific PT slabs (Maharashtra, Karnataka, WB, TN, Gujarat all differ). Auto-apply right slab per work location. Monthly + annual returns with state portal exports.",
    coverage: "All PT states · slab auto-apply · returns",
  },
  {
    icon: HardHat, name: "LWF", color: "#FBCFE8", lightHex: "rgba(251,207,232,0.1)",
    title: "Labour Welfare Fund",
    desc: "State LWF contributions where applicable (Maharashtra, Karnataka, TN, etc.). Periodic deduction, statutory remittance, balance reconciliation. Critical for contract-heavy paper mills.",
    coverage: "State-specific · contract workforce · annual remittance",
  },
  {
    icon: Wallet, name: "Gratuity", color: "#EC4899", lightHex: "rgba(236,72,153,0.1)",
    title: "Gratuity (Payment of Gratuity Act)",
    desc: "Eligibility tracking (5-yr service), accrual calculation per current wage, liability provision in books, payout on separation. Trust-deed accounting if applicable.",
    coverage: "Accrual · liability provision · payout · trust accounting",
  },
  {
    icon: Calculator, name: "TDS + Form 16", color: "#F472B6", lightHex: "rgba(244,114,182,0.1)",
    title: "Income Tax (Salaries)",
    desc: "Old vs new regime per employee, declarations + proofs workflow, monthly TDS computation, Form 24Q quarterly returns, Form 16 generation post year-end. Direct income-tax portal handshake.",
    coverage: "Old/new regime · 24Q · Form 16 · proof workflow",
  },
];

const SHIFT_MODEL = [
  { title: "Multi-shift roster", desc: "A/B/C 8-hour or 2x12 shift patterns. Mill-week (Sun rotation) supported. Crew assignment per shift with skill matrix. Roster planning lookahead up to 12 weeks.", icon: Calendar },
  { title: "Biometric attendance", desc: "Integrate with major biometric vendors (eSSL, Realtime, Matrix, ZKTeco). IN/OUT punches stream live. Auto-mark absent, half-day, late. Manual correction with approval workflow.", icon: Fingerprint },
  { title: "Gap 2.1 compliance", desc: "Shift-gap rule (min hours between shifts) validated automatically. Block roster assignment that violates. Required for paper mill statutory compliance + crew safety.", icon: ShieldCheck },
  { title: "Overtime governance", desc: "Configurable OT policy per role + grade. Request workflow with department approval. Cap enforcement (weekly + monthly hours). Premium rate per shift type (day/night/holiday).", icon: Clock },
  { title: "Contract labour", desc: "Contractor master with PF/ESI registration check, principal-employer compliance, gate-pass workflow, contract-worker headcount cap per CLRA. Wages disbursed through contractor with audit visibility.", icon: HardHat },
  { title: "ESS + MSS mobile", desc: "Employee self-service for leave, attendance regularization, payslip, declarations, expense claims. Manager self-service for approvals. Built mobile-first for shop floor.", icon: Smartphone },
];

const FEATURE_CATEGORIES = [
  {
    category: "Workforce & Roster", icon: Users, color: "#EC4899", count: "20 capabilities",
    items: [
      "Employee master with full lifecycle",
      "Multi-shift roster (A/B/C or 2x12)",
      "Shift-gap rule enforcement",
      "Biometric integration (all major vendors)",
      "Manual attendance with approval",
      "Crew assignment per shift",
      "Skill matrix per role",
      "Contractor + contract-worker tracking",
      "CLRA headcount + compliance",
      "Trainee + apprentice categories",
    ],
  },
  {
    category: "Attendance & Leave", icon: ClipboardCheck, color: "#F472B6", count: "16 capabilities",
    items: [
      "Biometric IN/OUT streaming",
      "Late/half-day auto-mark",
      "Regularization request workflow",
      "Leave types (EL, CL, SL, ML, COMP-OFF, LOP)",
      "Leave balance accrual per policy",
      "Comp-off auto-grant on overtime",
      "Holiday calendars per location",
      "Year-end leave carry-forward",
      "Leave encashment on separation",
    ],
  },
  {
    category: "Payroll & Statutory", icon: Calculator, color: "#F9A8D4", count: "24 capabilities",
    items: [
      "Monthly payroll run with lock + unlock",
      "PF (ECR generation, UAN sync)",
      "ESI (wage ceiling, monthly challan)",
      "PT (all states, slab auto-apply)",
      "LWF (state-specific)",
      "Gratuity accrual + payout",
      "Bonus calculation (Payment of Bonus Act)",
      "TDS old vs new regime per employee",
      "Form 24Q quarterly returns",
      "Form 16 generation",
      "Loan + advance recovery",
      "Reimbursement workflow",
    ],
  },
  {
    category: "Self-Service (ESS/MSS)", icon: Smartphone, color: "#FBCFE8", count: "18 capabilities",
    items: [
      "Mobile ESS app (Android + iOS)",
      "Leave apply + balance check",
      "Attendance regularization",
      "Payslip download (current + history)",
      "Form 16 download",
      "Tax declarations + proof upload",
      "Manager approvals on mobile",
      "Expense claims with photo",
      "Profile + KYC self-update",
      "Push notifications for approvals",
    ],
  },
  {
    category: "Recruitment & Onboarding", icon: UserCheck, color: "#EC4899", count: "12 capabilities",
    items: [
      "Requisition → approval → offer pipeline",
      "Candidate database",
      "Interview scheduling + feedback",
      "Offer letter with e-signature",
      "Onboarding checklist (multi-dept)",
      "Document collection + KYC",
      "PF/ESI auto-enrolment on join",
      "Asset issuance tracking",
    ],
  },
  {
    category: "Separation & Compliance", icon: Briefcase, color: "#F472B6", count: "12 capabilities",
    items: [
      "Resignation → notice → exit workflow",
      "F&F (Full & Final) calculation",
      "Gratuity payout",
      "Leave encashment",
      "PF transfer-out / withdrawal",
      "Asset return checklist",
      "Experience letter + relieving",
      "Compliance archive (7-year retention)",
    ],
  },
];

const USE_CASES = [
  {
    title: "500-employee mill, monthly payroll closed in 1 day",
    photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    scenario: "Integrated paper mill with 540 employees across permanent, contract, trainee. Monthly payroll cycle traditionally takes 4 working days with 2 finance + 2 HR staff.",
    response: "Biometric data streams live. Day-1 of cycle: HR runs payroll. Module computes PF/ESI/PT/LWF/Gratuity accruals + TDS automatically per employee. Exceptions list 14 items (reimbursements, OT cap breach). HR clears in 3 hours. Payslips published, PF ECR + ESI challan generated, salaries credited same day.",
    metrics: { cycle: "4 days → 1 day", exceptions: "14", headcount: "540" },
  },
  {
    title: "Audit-ready records for 500+ employees, 7-year history",
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    scenario: "Labour audit notice. Auditor wants attendance, payroll, PF, ESI records for the last 24 months, including contract workers. Legacy system stores partial data across 3 places.",
    response: "Audit view pulls everything: per-employee attendance + payroll + statutory contribution history. Contract worker records linked to contractor master. Form 16, Form 24Q, ECR files all retrievable by date. Auditor closes review in 2 days with no findings.",
    metrics: { audit_findings: "0", days_to_close: "2", records_pulled: "Full 24 mo" },
  },
  {
    title: "Shift-gap violation caught before roster goes live",
    photo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    scenario: "Roster supervisor schedules a tight handover — operator finishes night shift at 6am Sunday, scheduled for day shift at 2pm Sunday. Less than 8-hour gap, breaches Gap 2.1.",
    response: "System blocks save with explicit violation message. Recommends two alternatives — assign different operator, or push the day-shift start to 6pm. Supervisor picks first option. Operator gets full rest. Compliance preserved. Issue would have been a labour-inspector finding if it had gone live.",
    metrics: { gap_required: "8 hrs", attempted: "8 hrs gap fail", blocked: "Yes" },
  },
  {
    title: "Mobile ESS adoption → 80% drop in HR walk-ins",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
    scenario: "HR team of 3 spends 60% of their time on payslip downloads, leave applications, attendance regularization requests — paper forms walked in by employees throughout the day.",
    response: "ESS app rolled out. Within 6 weeks: 78% of employees self-serve. HR walk-ins drop from ~40/day to 8/day. Leave applications close in hours not days. Payslip queries near zero. HR team shifts focus to development + grievance.",
    metrics: { walk_ins: "40/day → 8/day", esS_adoption: "78%", hr_time_freed: "60%" },
  },
];

const PERFORMANCE = [
  { metric: "Monthly payroll cycle", manual: "4 days", deckle: "1 day", improvement: "4× faster" },
  { metric: "Statutory error rate", manual: "~3% records", deckle: "< 0.1%", improvement: "30× cleaner" },
  { metric: "HR walk-ins per day", manual: "~40", deckle: "~8", improvement: "80% drop" },
  { metric: "Leave-apply turnaround", manual: "2-3 days", deckle: "Same day", improvement: "Faster TAT" },
  { metric: "Audit prep time", manual: "2 weeks", deckle: "1 day", improvement: "10× faster" },
  { metric: "Shift-gap violations escaping", manual: "Periodic", deckle: "Blocked at entry", improvement: "Zero" },
];

const TIMELINE = [
  { week: "Week 1", title: "Employee master + structure", items: ["Headcount data migration", "Org structure + department tree", "Grade + role master", "Location + cost-centre mapping"] },
  { week: "Week 2", title: "Statutory + payroll config", items: ["PF/ESI/PT/LWF rules per location", "Gratuity trust setup", "Earnings + deductions structure", "Tax regime defaults"] },
  { week: "Week 3", title: "Attendance + biometric", items: ["Biometric devices integrated", "Shift patterns + roster rules", "Leave policy configuration", "Holiday calendars per location"] },
  { week: "Week 4", title: "Parallel payroll run", items: ["Run payroll alongside legacy", "Reconcile to last rupee", "Statutory file diff vs legacy", "Issue resolution + sign-off"] },
  { week: "Week 5+", title: "Cutover + mobile rollout", items: ["First live payroll cycle", "Legacy frozen for new entries", "ESS app rolled out by department", "Audit trail validated"] },
];

export function HRDeepDive({ data }: { data: ModuleData }) {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden grain">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
            alt="Mill workforce" fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 min-h-[88vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <Users size={12} /> People Core · HR & Payroll
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6 max-w-5xl">
            Roster to payroll.<br />
            <span style={{ background: "linear-gradient(135deg, #EC4899, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Statutory by default.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            HR + payroll engineered for 500+ employee Indian paper mills. PF, ESI, PT, LWF,
            gratuity, TDS — all native. Multi-shift roster with biometric attendance, Gap 2.1
            compliance, contract labour, ESS/MSS mobile. Audit-ready every day.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Get a live demo <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/product" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all">
              <ArrowLeft size={14} /> All Modules
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[
              { value: "PF+ESI", label: "+ PT/LWF/TDS", color: "#EC4899" },
              { value: "Form 16", label: "auto-gen", color: "#F472B6" },
              { value: "500+", label: "employee scale", color: "#F9A8D4" },
              { value: "Gap 2.1", label: "shift compliant", color: "#FBCFE8" },
            ].map((m) => (
              <div key={m.label} className="bg-[#0f0f0f]/85 backdrop-blur border border-[#1f1f1f] rounded-xl p-4">
                <p className="text-2xl font-black font-mono mb-1" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs text-zinc-500">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 border-y border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> The HR tax
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Indian mill HR runs on <span className="text-pink-300">three Excel files and hope</span>.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Permanent + contract + trainee — 500+ people. PF, ESI, PT, LWF, gratuity rules
                change by state. Shift gap rules are statutory. Form 16 deadlines don&apos;t move.
                And then the labour inspector visits.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Generic HR systems built for IT services miss most of this. Manufacturing-aware
                HR isn&apos;t a payroll tool — it&apos;s an integrated workforce + compliance system that
                ties to the shop floor, the contractor master, and the statutory portals.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-mono text-zinc-600 mb-5">HR overhead · 500-employee mill</p>
              <div className="space-y-4">
                {[
                  { label: "Payroll cycle (legacy)", value: "4 days", bar: 100, color: "#EF4444" },
                  { label: "Statutory error rate", value: "~3%", bar: 70, color: "#F59E0B" },
                  { label: "HR walk-ins/day", value: "~40", bar: 60, color: "#FBBF24" },
                  { label: "After module", value: "1 day · <0.1% errors", bar: 92, color: "#34D399" },
                ].map((row, i) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-400">{row.label}</span>
                      <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                    </div>
                    <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full" style={{ background: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-600 mt-5 font-mono leading-relaxed">
                * 500-employee mill, mixed permanent + contract. Numbers from post-deployment baseline.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATUTORY */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Statutory Coverage</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Six statutory engines. One payroll run.
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mb-14 leading-relaxed">
            PF, ESI, PT, LWF, gratuity, TDS — each with its own state rules, formats, deadlines, and portal integrations. All applied per employee, every month, with audit trail.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATUTORY.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                  className="bg-[#0f0f0f] border rounded-2xl p-5 flex flex-col gap-3"
                  style={{ borderColor: `${p.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl border flex items-center justify-center"
                      style={{ background: p.lightHex, borderColor: `${p.color}40` }}>
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.name}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{p.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                  <div className="pt-2 border-t border-[#1f1f1f]">
                    <p className="text-[9px] uppercase tracking-widest font-semibold mb-1" style={{ color: p.color }}>Coverage</p>
                    <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">{p.coverage}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHIFT MODEL */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Multi-Shift Workforce</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Built for the mill, not the office.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Continuous-shift operations need different HR primitives. Six engineered for paper-mill reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHIFT_MODEL.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 hover:border-pink-500/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg border border-pink-500/30 bg-pink-500/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-pink-300" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAMPLE PAYSLIP */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Sample Payslip</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">One run. Every statutory line.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            What the system computes per employee — earnings, deductions, statutory contributions, net pay, audit trail.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] bg-[#080808]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-500">PAYSLIP</span>
                <span className="text-sm font-bold text-white font-mono">EMP-1241 · APR-2026</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/15 border border-pink-500/30 text-pink-300">FINALIZED</span>
              </div>
              <div className="flex items-center gap-5 text-xs text-zinc-500">
                <span>UAN: <span className="text-white font-mono">100847291</span></span>
                <span>Regime: <span className="text-white font-mono">New</span></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-[#1f1f1f]">
              <div className="p-6 space-y-2.5">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-300 mb-3">Earnings</p>
                {[
                  { label: "Basic", value: "₹28,500" },
                  { label: "HRA", value: "₹14,250" },
                  { label: "Conveyance", value: "₹1,600" },
                  { label: "Special allowance", value: "₹8,200" },
                  { label: "Shift premium (Night × 12)", value: "₹4,800" },
                  { label: "Overtime (8 hrs × 1.5x)", value: "₹2,640" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs">
                    <span className="text-zinc-400">{r.label}</span>
                    <span className="font-mono text-zinc-200">{r.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-[#1f1f1f] text-sm">
                  <span className="font-bold text-white">Gross</span>
                  <span className="font-mono font-bold text-emerald-300">₹59,990</span>
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-red-400 mb-3">Deductions + Statutory</p>
                {[
                  { label: "PF (12% of basic)", value: "₹3,420" },
                  { label: "ESI (0.75%)", value: "₹450" },
                  { label: "PT (Maharashtra)", value: "₹200" },
                  { label: "LWF (state)", value: "₹25" },
                  { label: "TDS (new regime)", value: "₹2,840" },
                  { label: "Loan EMI", value: "₹1,500" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs">
                    <span className="text-zinc-400">{r.label}</span>
                    <span className="font-mono text-zinc-200">{r.value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-[#1f1f1f] text-sm">
                  <span className="font-bold text-white">Total deductions</span>
                  <span className="font-mono font-bold text-red-400">₹8,435</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#1f1f1f] bg-[#0c0c0c] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Net Pay (credited)</p>
                <p className="text-3xl font-black font-mono text-pink-300">₹51,555</p>
              </div>
              <div className="text-right space-y-1 text-[11px] text-zinc-500">
                <p>Employer PF: <span className="text-zinc-300 font-mono">₹3,420</span></p>
                <p>Employer ESI: <span className="text-zinc-300 font-mono">₹1,950</span></p>
                <p>Gratuity accrual: <span className="text-zinc-300 font-mono">₹1,372</span></p>
                <p>Total CTC for period: <span className="text-zinc-300 font-mono">₹66,732</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Capability Catalog</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            100+ HR capabilities. Six categories.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Every workflow that a paper-mill HR + payroll team needs, engineered into the platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{ background: `${cat.color}12`, borderColor: `${cat.color}30` }}>
                        <Icon size={16} style={{ color: cat.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">{cat.category}</h3>
                        <p className="text-[10px] font-mono" style={{ color: cat.color }}>{cat.count}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed">
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
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Real HR team scenarios.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Four moments where the HR module proves itself.
          </p>

          <div className="space-y-12">
            {USE_CASES.map((uc, i) => (
              <motion.div key={uc.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-60 lg:h-auto border border-[#1f1f1f]">
                  <Image src={uc.photo} alt={uc.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-pink-300">Case {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-white text-xl font-black drop-shadow leading-tight">{uc.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Scenario</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-pink-300 mb-2">Module Response</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{uc.response}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#1f1f1f]">
                    {Object.entries(uc.metrics).map(([k, v]) => (
                      <div key={k} className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f] text-center">
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5 font-mono">{k.replace(/_/g, " ")}</p>
                        <p className="text-base font-black font-mono text-pink-300">{v}</p>
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
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Performance Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Legacy HR vs Papyrus HR.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Before/after on a 500-employee mill with mixed permanent + contract workforce.
          </p>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-4 border-b border-[#1f1f1f] bg-[#080808] text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
              <span>Metric</span>
              <span className="text-center">Legacy / Excel</span>
              <span className="text-center">With Module</span>
              <span className="text-right">Improvement</span>
            </div>
            {PERFORMANCE.map((row, i) => (
              <motion.div key={row.metric}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                className="grid grid-cols-4 px-6 py-4 border-b border-[#1a1a1a] last:border-0 items-center">
                <span className="text-sm text-zinc-300">{row.metric}</span>
                <span className="text-sm text-zinc-500 font-mono text-center">{row.manual}</span>
                <span className="text-sm text-emerald-400 font-mono text-center font-bold">{row.deckle}</span>
                <span className="text-xs text-pink-300 font-mono text-right">{row.improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">Implementation</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Cutover in one payroll cycle.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Parallel run with legacy for one cycle to validate, then go live. Five-week sequence engineered for paper-mill HR teams.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-pink-500/60 via-pink-500/20 to-transparent hidden md:block" />
            <div className="space-y-5">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.week}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0f0f0f] border-2 border-pink-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-pink-300">
                    {step.week.replace("Week ", "W")}
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-pink-300 font-mono">{step.week}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="mt-0.5 text-pink-300 flex-shrink-0" /> {item}
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
