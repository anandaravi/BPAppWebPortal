"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Factory, Workflow, CalendarDays, Activity, Cog, AlertTriangle,
  CheckCircle2, Layers, GitBranch, ClipboardCheck, Smartphone, Gauge,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";


const PLANNING_LAYERS = [
  {
    icon: CalendarDays, name: "MPS", color: "#F97316",
    title: "Master Production Schedule",
    horizon: "Day · Week · Month · Quarter",
    purpose: "What to produce, when, on which machine.",
    method: "Bucket-based horizons with frozen periods. Net-change MPS — append demand without full re-plan. Demand consumption tracking against forecast.",
    inputs: "Confirmed SOs, forecasts, stock targets, machine calendars",
    outputs: "Time-phased production plan per PM, per grade",
  },
  {
    icon: GitBranch, name: "MRP", color: "#FB923C",
    title: "Material Requirements Planning",
    horizon: "Synchronous with MPS",
    purpose: "What raw material, when, in what quantity.",
    method: "Multi-level BOM explosion with scrap and yield factors. Lot sizing per item: LOT_FOR_LOT, EOQ, POQ, MIN_MAX. Safety-stock honored.",
    inputs: "MPS output, BOMs, on-hand stock, open POs, lead times",
    outputs: "Time-phased purchase requisitions + planned orders",
  },
  {
    icon: Gauge, name: "CRP", color: "#FDBA74",
    title: "Capacity Requirements Planning",
    horizon: "Same horizon as MPS",
    purpose: "Will the machines and crews actually handle it?",
    method: "Infinite + finite capacity simulation. Bottleneck identification. Shift-by-shift load profile. Maintenance windows respected.",
    inputs: "Routings, machine calendars, crew rosters, planned WOs",
    outputs: "Load chart, bottlenecks, capacity exceptions",
  },
];

const WO_STATES = [
  { state: "CREATED", desc: "Planner drafts WO from MPS or sales order. BOM + routing referenced but not yet exploded.", color: "#94A3B8" },
  { state: "RELEASED", desc: "BOM + routing exploded. Material reserved via FEFO. Blocked if no active BOM or routing version.", color: "#60A5FA" },
  { state: "IN_PROGRESS", desc: "Shop floor logs operations, material issues, labour entries, downtime, reel creation with quality readings.", color: "#F97316" },
  { state: "COMPLETED", desc: "All operations done. Reels created. Awaiting QC release.", color: "#FBBF24" },
  { state: "QC", desc: "Inspection at WO or reel level. Pass → FG receipt. Fail → auto-create rework WO, block FG.", color: "#A78BFA" },
  { state: "CLOSED", desc: "Cost variance settled. Material/labour/utility/overhead posted to GL. Audit trail locked.", color: "#34D399" },
  { state: "HELD / CANCELLED", desc: "Exception branches. Held WO can resume with reason; cancelled WO posts reverse entries.", color: "#EF4444" },
];

const CAPABILITIES_GRID = [
  {
    category: "Planning & Scheduling", icon: Workflow, color: "#F97316", count: "18 capabilities",
    items: [
      "Bucket-based MPS (DAY/WEEK/MONTH/QUARTER)",
      "Net-change MPS append",
      "Multi-level BOM explosion",
      "Lot sizing: LOT_FOR_LOT, EOQ, POQ, MIN_MAX",
      "CRP finite + infinite capacity",
      "Demand forecast: moving avg, exp smoothing, seasonal",
      "Forecast-to-demand consumption",
      "Schedule lifecycle DRAFT → COMPLETED",
      "Drag-drop Gantt run sequencing",
    ],
  },
  {
    category: "Grade-Change Optimization", icon: Cog, color: "#FB923C", count: "12 capabilities",
    items: [
      "Penalty matrix per transition type",
      "WITHIN_FAMILY transitions",
      "CROSS_FAMILY transitions",
      "COLOR_CHANGE handling",
      "FULL_WASH sequencing",
      "Confidence-scored predictions",
      "Actual vs predicted reconciliation",
      "Conflict detection: overlap, capacity, maintenance",
      "Freeze-window protection",
    ],
  },
  {
    category: "Work Order Execution", icon: ClipboardCheck, color: "#FDBA74", count: "20 capabilities",
    items: [
      "7-state WO lifecycle",
      "Material reservation FEFO",
      "Goods Issue (bulk or line-by-line)",
      "Labour: PRIMARY/SECONDARY/HELPER/SUPERVISOR",
      "Machine transition logging",
      "Real-time WO costing",
      "Rework WO auto-creation on QC fail",
      "Split WO, bulk release/cancel",
      "Cost variance settlement",
    ],
  },
  {
    category: "Shop Floor & Mobile", icon: Smartphone, color: "#FCD34D", count: "16 capabilities",
    items: [
      "Live machine status dashboard",
      "Per-shift production entries",
      "Reel creation with quality readings",
      "Grades: a_grade, b_grade, c_grade, waste",
      "Defect severity + position tracking",
      "Utility consumption tracking",
      "Shift allotment + crew assignment",
      "Mobile shift report submit → approve",
      "Biometric crew login",
    ],
  },
  {
    category: "OEE & Analytics", icon: Activity, color: "#34D399", count: "14 capabilities",
    items: [
      "Live OEE per machine",
      "OEE loss waterfall",
      "Cost per tonne by grade/machine/shift",
      "Yield Sankey: raw → FG",
      "Defect Pareto with drill-down",
      "SPC with Western Electric rules",
      "Energy: kWh/t, steam/t benchmarks",
      "Custom report builder",
      "Scheduled report distribution",
    ],
  },
  {
    category: "Multi-PM & Integrated Mills", icon: Layers, color: "#60A5FA", count: "10 capabilities",
    items: [
      "Per-PM independent schedules",
      "Cross-PM pulp allocation",
      "Integrated mill stock-prep linkage",
      "Pulp inventory FEFO across PMs",
      "Cross-machine routing chains",
      "Shared utility cost allocation",
      "Plant-level OEE rollup",
      "Inter-PM transfer orders",
    ],
  },
];

const USE_CASES = [
  {
    title: "Mid-shift breakdown on PM-2",
    photo: "/images/pages/production-breakdown.jpg",
    scenario: "PM-2 trips at 14:20. Forecasted 4-hour breakdown. Three confirmed SOs were scheduled to run on PM-2 in Shift B with delivery commit tomorrow morning.",
    response: "Planner triggers re-schedule. System checks PM-1 capacity, validates grade compatibility, recommends moving SO-2847 (1200mm kraft 100 GSM) to PM-1 at 16:00 with 8-minute grade-change. Two SOs auto-reslot to next available window. Customer service notified, no missed commits.",
    metrics: { time: "3 min", missed_orders: "0", overtime: "+4 hrs PM-1" },
  },
  {
    title: "Daily plan with grade-change minimization",
    photo: "/images/pages/production-daily-plan.jpg",
    scenario: "Tomorrow's MPS has 14 grade runs across 2 PMs covering 28 SOs. Manual sequencing produces 9 grade changes (~6 hours of penalty waste).",
    response: "Grade-change optimizer runs penalty matrix across all permutations. Recommended sequence: 5 grade changes, mostly WITHIN_FAMILY. Predicted waste 1.4t vs manual 3.8t. Predicted downtime 1h 12m vs 3h 50m. Planner approves with one override (customer priority).",
    metrics: { changes: "9 → 5", waste_saved: "2.4 t", time_saved: "2h 38m" },
  },
  {
    title: "OEE dropped 7 pts. Find it.",
    photo: "/images/pages/production-oee-drop.jpg",
    scenario: "PM-1 OEE down from 81% to 74% over 3 days. Plant manager wants root cause before next ops review.",
    response: "Loss waterfall: Availability -3.2 pts (unplanned breakdowns up), Performance -2.1 pts (speed drift on 80 GSM grade), Quality -1.7 pts (defect rate at the calendar). Drill into defect Pareto: edge crack on Reels 4823–4891. Cross-ref with maintenance: bearing replaced on calendar 6 days ago. Predictive alert was issued at install — operator missed acknowledgement.",
    metrics: { time_to_RCA: "11 min", root_cause: "calendar bearing", actions_raised: "3" },
  },
  {
    title: "Integrated mill: stock-prep starves PM-3",
    photo: "/images/pages/production-stock-prep.jpg",
    scenario: "Integrated mill, 3 PMs, single pulping line. PM-3 about to start 120 GSM run, but pulp tower at 38% — below the 45% safety threshold for grade-change.",
    response: "CRP detects upstream constraint, recommends delaying PM-3 grade-change by 22 minutes or pulling SO-2891 (compatible grade) forward. Planner picks pull-forward. PM-3 stays running, pulp builds back to 52% by handover. No downtime, no broke spike.",
    metrics: { downtime_avoided: "22 min", broke_avoided: "~1.8 t", planner_clicks: "2" },
  },
];

const PERFORMANCE = [
  { metric: "Schedule build time", manual: "3 hours", deckle: "12 min", improvement: "94% faster" },
  { metric: "Grade changes per day", manual: "9", deckle: "5", improvement: "44% fewer" },
  { metric: "OEE root-cause time", manual: "Half day", deckle: "11 min", improvement: "30× faster" },
  { metric: "WO cost-close lag", manual: "5 days", deckle: "Same day", improvement: "Real-time" },
  { metric: "Shift report submission", manual: "Paper, 2-hr delay", deckle: "Mobile, instant", improvement: "100% digital" },
  { metric: "Plan-vs-actual variance", manual: "±8%", deckle: "±1.5%", improvement: "5× tighter" },
];

const TIMELINE = [
  { week: "Week 1", title: "Machine + BOM master", items: ["PM and ancillary machines setup", "Active BOM and routing versions", "Operator and crew master", "Shift calendars + maintenance windows"] },
  { week: "Week 2", title: "Planning calibration", items: ["MPS bucket configuration", "Lot-sizing rules per item", "Grade-change penalty matrix seeding", "CRP capacity profiles per machine"] },
  { week: "Week 3", title: "Shop floor rollout", items: ["Mobile app rollout to crews", "Reel quality reading SOP", "Downtime reason library", "QC parameter master per grade"] },
  { week: "Week 4", title: "Go-live", items: ["First live MPS run", "WO lifecycle activated", "OEE dashboards live", "Daily standup with planner"] },
  { week: "Week 5+", title: "Continuous tuning", items: ["Grade-change matrix self-refines", "OEE benchmark locked", "Optimization recommendations active", "What-if scenario library grows"] },
];

export function ProductionDeepDive({ data }: { data: ModuleData }) {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <Image src="/images/pages/production-deepdive-hero.jpg"
            alt="Paper mill production floor" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20 min-h-[88vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <Factory size={12} /> Manufacturing Core · Production
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tight mb-6 max-w-5xl">
            Plan the mill.<br />
            <span style={{ background: "linear-gradient(135deg, #F97316, #FBBF24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Run every reel.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-2 max-w-2xl mb-10 leading-relaxed">
            Full production stack for Indian paper mills. MPS, MRP, CRP planning. 7-state work
            order lifecycle. Live OEE per machine. Shop floor mobile. Multi-PM scheduling for
            integrated mills. Every reel accounted for, every shift settled.
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
              { value: "3-Layer", label: "MPS + MRP + CRP", color: "#F97316" },
              { value: "7-State", label: "WO lifecycle", color: "#FBBF24" },
              { value: "Live", label: "OEE per machine", color: "#34D399" },
              { value: "Multi-PM", label: "integrated mills", color: "#60A5FA" },
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
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> Mills run blind
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6 leading-tight">
                Spreadsheet planning is <span className="text-orange-400">8% hidden cost</span>.
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-6">
                Most Indian paper mills still plan in Excel — schedules built shift by shift,
                grade changes guessed, OEE calculated days later, work orders settled a week
                in arrears. The cost shows up everywhere:
                <span className="text-amber-400 font-semibold"> excess broke, missed deliveries, untracked downtime, surprise variances</span>.
              </p>
              <p className="text-text-3 text-sm leading-relaxed">
                On a 200 TPD mill, an 8% gap between plan and actual is ₹4–6 crore/year of margin
                eroded by problems no one can pinpoint. Production deserves the same rigour as
                Finance — and the same tooling.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-surface border border-border-dim rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-mono text-text-4 mb-5">Where the 8% goes · 200 TPD mill</p>
              <div className="space-y-4">
                {[
                  { label: "Excess grade-change waste", value: "₹1.4 Cr/yr", bar: 95, color: "#EF4444" },
                  { label: "Untracked unplanned downtime", value: "₹1.2 Cr/yr", bar: 82, color: "#F97316" },
                  { label: "Late delivery penalties", value: "₹0.9 Cr/yr", bar: 65, color: "#FBBF24" },
                  { label: "Cost-close lag (5 days)", value: "₹0.7 Cr/yr", bar: 50, color: "#FDBA74" },
                  { label: "After Production module", value: "₹3.6 Cr saved", bar: 88, color: "#34D399" },
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
                * Indicative figures, 200 TPD kraft mill at ₹70K/t. Realized savings vary with maturity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 PLANNING LAYERS */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Planning Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            MPS. MRP. CRP. Connected.
          </h2>
          <p className="text-text-2 text-lg max-w-3xl mb-14 leading-relaxed">
            Three planning layers that talk to each other. Change demand in MPS and MRP re-explodes,
            CRP re-validates capacity. No siloed spreadsheets, no reconciliation pain.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PLANNING_LAYERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface border rounded-2xl p-6 flex flex-col gap-4"
                  style={{ borderColor: `${t.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: `${t.color}15`, borderColor: `${t.color}40` }}>
                      <Icon size={20} style={{ color: t.color }} />
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: t.color }}>{t.name}</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1">{t.title}</h3>
                    <p className="text-xs text-text-3 font-mono">{t.horizon}</p>
                  </div>
                  <p className="text-sm text-text-2 leading-relaxed">{t.purpose}</p>
                  <p className="text-xs text-text-2 leading-relaxed">{t.method}</p>
                  <div className="pt-3 border-t border-border-dim space-y-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: t.color }}>Inputs</p>
                      <p className="text-[11px] text-text-2">{t.inputs}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: t.color }}>Outputs</p>
                      <p className="text-[11px] text-text-2">{t.outputs}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WO LIFECYCLE */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Work Order Lifecycle</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Seven states. Zero gaps.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Every WO moves through a defined state machine with audit-grade transitions. BOM, material, labour, QC, cost — all hang off this lifecycle.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/60 via-orange-500/20 to-transparent hidden md:block" />
            <div className="space-y-4">
              {WO_STATES.map((s, i) => (
                <motion.div key={s.state}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface border-2 flex items-center justify-center font-mono text-[10px] font-bold"
                    style={{ borderColor: `${s.color}80`, color: s.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="bg-surface border border-border-dim rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}40` }}>{s.state}</span>
                    </div>
                    <p className="text-sm text-text-2 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OEE EXAMPLE */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Live OEE — Real Example</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">PM-2, Shift A, today.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            What you actually see on the floor dashboard. Live components, live losses, live actions.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dim bg-background">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-text-3">MACHINE</span>
                <span className="text-sm font-bold text-foreground font-mono">PM-2</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/15 border border-orange-500/30 text-orange-300">RUNNING</span>
              </div>
              <div className="flex items-center gap-5 text-xs text-text-3">
                <span>Grade: <span className="text-foreground font-mono">KR-100GSM</span></span>
                <span>Crew: <span className="text-foreground font-mono">Shift A</span></span>
                <span>Updated: <span className="text-foreground font-mono">14:32</span></span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6 border-b border-border-dim bg-[#0c0c0c]">
              {[
                { label: "OEE", value: "78.4%", color: "#FBBF24" },
                { label: "Availability", value: "92.1%", color: "#34D399" },
                { label: "Performance", value: "89.3%", color: "#34D399" },
                { label: "Quality", value: "95.4%", color: "#34D399" },
              ].map((s) => (
                <div key={s.label} className="bg-background rounded-lg p-3 border border-border-dim">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1 font-semibold">{s.label}</p>
                  <p className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-text-3 mb-4">OEE Loss Waterfall · 480 min shift</p>
              <div className="space-y-2.5">
                {[
                  { label: "Available time", value: 480, bar: 100, color: "#0EA5E9", note: "Planned shift" },
                  { label: "− Unplanned downtime", value: 22, bar: 4.6, color: "#EF4444", note: "Wire change 18m + sheet break 4m" },
                  { label: "− Planned stops", value: 16, bar: 3.3, color: "#F59E0B", note: "Grade-change KR-80 → KR-100" },
                  { label: "= Operating time", value: 442, bar: 92.1, color: "#34D399", note: "Availability 92.1%" },
                  { label: "− Speed loss", value: 47, bar: 9.8, color: "#FBBF24", note: "Avg 720 m/min vs target 780" },
                  { label: "= Net operating time", value: 395, bar: 82.3, color: "#34D399", note: "Performance 89.3%" },
                  { label: "− Quality loss (broke)", value: 18, bar: 3.8, color: "#EF4444", note: "Edge crack on Reels 4823-4828" },
                  { label: "= Productive time", value: 377, bar: 78.5, color: "#34D399", note: "OEE 78.4%" },
                ].map((row, i) => (
                  <div key={row.label} className="grid grid-cols-12 gap-3 items-center text-xs">
                    <span className="col-span-3 text-text-2 font-mono">{row.label}</span>
                    <span className="col-span-1 font-mono font-bold text-right" style={{ color: row.color }}>{row.value}m</span>
                    <div className="col-span-5 h-2 bg-surface-3 rounded overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.07 }}
                        className="h-full rounded" style={{ background: row.color }} />
                    </div>
                    <span className="col-span-3 text-[10px] text-text-3 font-mono">{row.note}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border-dim">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-text-3 mb-3">Auto-actions raised this shift</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "RCA: edge crack on R4823-R4828", "Speed drift > 7% on KR-100", "Wire change overran by 4m",
                    "Calendar bearing temp +8°C trending", "Pulp tower at 41% — below threshold",
                  ].map((c) => (
                    <span key={c} className="text-[10px] font-mono px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-300">
                      ⚠ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITY CATEGORIES */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Capability Catalog</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            90+ capabilities. Six categories.
          </h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Every screen, every workflow, every report — engineered for paper mill operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAPABILITIES_GRID.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="bg-surface border border-border-dim rounded-2xl p-6 hover:border-orange-500/20 transition-colors">
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
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Real shop floor scenarios.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Four typical mill situations where the Production module changes the outcome.
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
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-orange-400">Case {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-foreground text-xl font-black drop-shadow leading-tight">{uc.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-surface border border-border-dim rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Scenario</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-400 mb-2">Module Response</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.response}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-dim">
                    {Object.entries(uc.metrics).map(([k, v]) => (
                      <div key={k} className="bg-background rounded-lg p-3 border border-border-dim text-center">
                        <p className="text-[9px] uppercase tracking-wider text-text-3 mb-0.5 font-mono">{k.replace(/_/g, " ")}</p>
                        <p className="text-base font-black font-mono text-orange-400">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE TABLE */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Performance Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Manual vs Production module.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Before/after numbers from a representative 200 TPD mill running 90 days post go-live.
          </p>

          <div className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-4 border-b border-border-dim bg-background text-[10px] uppercase tracking-widest font-semibold text-text-3">
              <span>Metric</span>
              <span className="text-center">Manual / Excel</span>
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
                <span className="text-xs text-orange-400 font-mono text-right">{row.improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Implementation</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Live in 30 days.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Typical paper mill rollout. Longer for greenfield integrated mills, shorter for single-PM units.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/60 via-orange-500/20 to-transparent hidden md:block" />
            <div className="space-y-5">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.week}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface border-2 border-orange-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-orange-400">
                    {step.week.replace("Week ", "W")}
                  </div>
                  <div className="bg-surface border border-border-dim rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-orange-400 font-mono">{step.week}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-text-2 flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="mt-0.5 text-orange-400 flex-shrink-0" /> {item}
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

      {/* CAPABILITIES + INTEGRATIONS + CTA */}
      <FeatureCardGrid eyebrow="Every Capability" title="Drill into any feature." cards={data.capabilities} accent={data.accent} moduleSlug={data.slug} />
      <IntegrationMap moduleName={data.name} integrations={data.integrations} accent={data.accent} />
      <CTABanner />
    </div>
  );
}
