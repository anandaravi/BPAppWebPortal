"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Scissors, Zap, Brain, Target, CheckCircle2, TrendingUp,
  TrendingDown, Activity, Cog, Layers, RefreshCw, GitBranch,
  Database, Workflow, Sparkles, AlertTriangle, BarChart3, Clock, ScrollText,
  Award, Lock,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";
import {} from "@/lib/modules/capability-helpers";

const TIERS = [
  {
    icon: Zap, name: "Instant Mode", time: "< 2 seconds", color: "#FBBF24", lightHex: "rgba(251,191,36,0.1)",
    use: "Mid-shift quick fixes",
    when: "Order changed. Reel rejected. Last-minute customer call.",
    method: "Greedy heuristics, pre-warmed cache, demand graph traversal",
    quality: "Good (~92% of optimal)",
    constraints: "Hard constraints only",
  },
  {
    icon: Brain, name: "Planning Mode", time: "5 – 30 seconds", color: "#60A5FA", lightHex: "rgba(96,165,250,0.1)",
    use: "Shift-level planning",
    when: "Morning planner meeting. Shift handover.",
    method: "Metaheuristic search with neighborhood exploration",
    quality: "Very good (~97% of optimal)",
    constraints: "Hard + soft preferences",
  },
  {
    icon: Target, name: "Full Optimization", time: "≤ 5 minutes", color: "#34D399", lightHex: "rgba(52,211,153,0.1)",
    use: "Daily / weekly plan",
    when: "Production planner builds the next-day master plan.",
    method: "Exact MILP solving with 180+ constraints",
    quality: "Provably optimal",
    constraints: "All hard, all soft, all preferences",
  },
];

const CONSTRAINTS = [
  {
    category: "Machine Constraints",
    icon: Cog, color: "#F59E0B",
    count: "32 constraints",
    items: [
      "Reel diameter min/max per machine",
      "Reel weight max",
      "Deckle width (active trim width)",
      "Speed limits by grade",
      "Knife position count + spacing",
      "Turret type (single, double, triple)",
      "Slitter arm reach limits",
      "Crepe ratio applicable",
      "OD-to-width compatibility per machine",
      "Cross-grain orientation",
    ],
  },
  {
    category: "Quality Constraints",
    icon: Award, color: "#10B981",
    count: "28 constraints",
    items: [
      "GSM tolerance per grade",
      "Brightness band per customer spec",
      "Moisture limits at winder",
      "Opacity floor per product",
      "Tensile strength minimums",
      "Smoothness range",
      "Air permeability bounds",
      "COBB value limits",
      "Burst strength minimums",
      "Ring Crush ratio thresholds",
    ],
  },
  {
    category: "Customer Constraints",
    icon: Target, color: "#A855F7",
    count: "24 constraints",
    items: [
      "Order-specific width tolerance",
      "Allowed pocket positions per customer",
      "Reel weight contracted range",
      "Grade substitution rules",
      "Quality grade-up acceptance",
      "Delivery-date binding constraints",
      "Customer-specific allowance percentages",
      "Approved deckle patterns",
      "Forbidden trim percentages",
      "Loyalty-grade priority bumps",
    ],
  },
  {
    category: "Cost & Recovery",
    icon: TrendingUp, color: "#EF4444",
    count: "22 constraints",
    items: [
      "Trim cost per metric tonne",
      "SWO recovery valuation (20× waste)",
      "Set-up changeover cost",
      "Reel rejection penalty",
      "Quality grade-down cost",
      "Storage cost (idle reels)",
      "Late delivery penalty",
      "Energy cost per machine-hour",
      "Operator overtime premium",
      "Conversion cost from reel to sheet",
    ],
  },
  {
    category: "Operational",
    icon: Workflow, color: "#06B6D4",
    count: "20 constraints",
    items: [
      "Shift-bound demand fulfillment",
      "Machine availability windows",
      "Maintenance lock periods",
      "Grade-changeover sequencing",
      "Chemistry change limits per shift",
      "Operator skill matrix",
      "Crew capacity per shift",
      "Concurrent run limits per type",
      "FIFO pulp consumption",
      "Roll handling capacity",
    ],
  },
  {
    category: "Process & Position",
    icon: Layers, color: "#EC4899",
    count: "18 constraints",
    items: [
      "Position-specific allowances",
      "OD grouping rules",
      "Pocket auto-detection logic",
      "Cutter routing dependencies",
      "Position constraint trees",
      "SWO position scoring",
      "Cross-machine balance limits",
      "Pattern rotation rules",
      "Edge-trim minimums",
      "Anti-stacking constraints",
    ],
  },
  {
    category: "Inventory & Allocation",
    icon: Database, color: "#8B5CF6",
    count: "16 constraints",
    items: [
      "FEFO batch ordering",
      "Reel availability windows",
      "Allocated stock vs free stock",
      "Customer reservation honoring",
      "Quality-hold stock exclusion",
      "Consignment stock rules",
      "Expiry-aware allocation",
      "Multi-warehouse availability",
    ],
  },
  {
    category: "Compliance & Audit",
    icon: ScrollText, color: "#64748B",
    count: "20 constraints",
    items: [
      "Approval-gate for high-cost changes",
      "Auditor-log every plan revision",
      "RBAC-bound configuration changes",
      "Customer-spec authority validation",
      "Grade-substitution authorization",
      "Pattern-library version locking",
      "Pre-flight regulatory check",
      "Plan-vs-actual tolerance triggers",
    ],
  },
];

const CONFIG_AREAS = [
  { code: "CFG-01", title: "Constraint Profiles", desc: "Speed, capacity, quality, material profiles. Switch instantly between production scenarios." },
  { code: "CFG-02", title: "Optimization Profiles", desc: "Clone, customize, set defaults. Different profiles for different shifts or product mixes." },
  { code: "CFG-03", title: "Priority Profiles", desc: "Weighted scoring across cost, recovery, customer priority, delivery date. Tune the trade-off." },
  { code: "CFG-04", title: "SWO Configuration", desc: "Stock Without Order parameters. Set valuation, position scoring, recovery targets." },
  { code: "CFG-05", title: "Machine Chains", desc: "Serial machine setup, grade matrix, cross-machine routing." },
  { code: "CFG-06", title: "Solver Settings", desc: "Tier selection rules, time budgets, gap targets, warm-start sources." },
  { code: "CFG-07", title: "Cutter Routing", desc: "Pocket and slit priority, blade reordering, knife position constraints." },
  { code: "CFG-08", title: "Allowance Rules", desc: "Pocket allowances, reel allowances, machine-specific tolerances." },
  { code: "CFG-09", title: "Position Constraints", desc: "OD grouping, position-specific limits, edge constraints." },
  { code: "CFG-10", title: "Auto-Exclusion", desc: "Product group configs, automatic exclusion rules for incompatible items." },
  { code: "CFG-12", title: "Product Group Fields", desc: "Custom fields per product group, grouping logic, substitution rules." },
  { code: "CFG-COST", title: "Cost Configuration", desc: "Per-company cost models, per-grade overrides, currency handling." },
  { code: "BATCH-I", title: "Batch I Tolerances", desc: "Customer tolerance bands, BF compatibility, grade-substitution rules." },
  { code: "CFG-PATT", title: "Pattern Library", desc: "Captured patterns, effectiveness scoring, pattern-bias weighting." },
  { code: "CFG-AUDIT", title: "Audit Configuration", desc: "What gets logged, who can see, retention policy, signature requirements." },
];

const USE_CASES = [
  {
    title: "Reactive: Customer Cancels at 11am",
    photo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    scenario: "Order for 4,800 kg of 42 GSM is cancelled at 11am. Mill has already produced 1,200 kg. Operator has 30 minutes before next changeover.",
    response: "Operator triggers Instant Mode. In 1.4 seconds, engine generates new plan: convert remaining production to nearest-grade SWO at valid pocket positions, reassign 800 kg to backlog order at acceptable substitution width. Operator approves and executes.",
    metrics: { time: "1.4s", recovery: "95%", waste_avoided: "2,800 kg" },
    accent: "#FBBF24",
  },
  {
    title: "Planning: Tomorrow's Master Plan",
    photo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    scenario: "Production planner needs daily plan for tomorrow. 47 confirmed orders, 12 pending priority calls. Two machines, three grade families, 180+ constraints active.",
    response: "Full Optimization mode runs at 4:30 PM. In 3 minutes 42 seconds, engine produces optimized plan with explainability. Planner reviews active constraints, alternate patterns, recovery analysis. Drag-drop two manual overrides, approve, lock plan for production.",
    metrics: { time: "3m 42s", coverage: "100%", trim_pct: "1.8%" },
    accent: "#34D399",
  },
  {
    title: "Strategic: Quoting a New Customer",
    photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    scenario: "New customer wants 8 standard widths over 14 days. Need to quote tight margin without committing to losses. Sales asks production planning for trim implications.",
    response: "Planning Mode runs scenarios. Compare 4 acceptance patterns. Trim curve plotted across volumes. Margin floor validated. Quote sent with confidence.",
    metrics: { scenarios: "4", quote_margin: "+2.8%", risk: "Low" },
    accent: "#60A5FA",
  },
  {
    title: "Learning: Pattern Becomes Standard",
    photo: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
    scenario: "Planner has approved the same 6-slit pattern for medium-GSM kraft 14 times. Engine has been logging it.",
    response: "After 10 approved runs with consistent outcomes, engine adds pattern to library with effectiveness score. Future similar demand auto-biases toward this pattern. Operator's expertise compounds into the system.",
    metrics: { approvals: "14", confidence: "High", time_saved: "~2 hours/wk" },
    accent: "#A78BFA",
  },
];

const PERFORMANCE = [
  { metric: "Trim waste %", manual: "5.2%", deckle: "1.8%", improvement: "65% reduction" },
  { metric: "Planning time per shift", manual: "90 min", deckle: "8 min", improvement: "91% faster" },
  { metric: "SWO recovery", manual: "62%", deckle: "94%", improvement: "+32 pts" },
  { metric: "Re-plan after change", manual: "45 min", deckle: "2 sec", improvement: "1,350× faster" },
  { metric: "Constraints honored", manual: "~30 reliably", deckle: "180+ guaranteed", improvement: "6× coverage" },
  { metric: "Plan explainability", manual: "Tribal knowledge", deckle: "Full reasoning", improvement: "Auditable" },
];

const DEPLOYMENTS = [
  { mode: "Embedded", desc: "Bundled with the Papyrus platform. Single login, shared data, native integration with Sales, Inventory, Production.", icon: Sparkles, accent: "#F59E0B" },
  { mode: "Standalone", desc: "Deployed as independent product. Plugs into your existing ERP (SAP, Oracle, Tally, Microsoft Dynamics, custom).", icon: Cog, accent: "#10B981" },
  { mode: "API-Only", desc: "Headless integration. Send demand via REST, receive plans as JSON. Build your own UI or embed in existing dashboards.", icon: GitBranch, accent: "#3B82F6" },
];

const HOSTING = [
  { type: "Cloud SaaS", desc: "Fully managed, Vercel/AWS hosted, auto-scaling, 99.5% SLA." },
  { type: "Private Cloud", desc: "Dedicated cloud tenant, customer VPC, region-locked data." },
  { type: "On-Premise", desc: "Customer datacenter, full control, supported via VPN." },
  { type: "Hybrid", desc: "API in cloud, planner UI on-prem, or vice versa." },
];

const TIMELINE = [
  { week: "Week 1", title: "Data discovery & onboarding", items: ["Machine master setup", "Grade and product catalog import", "Customer specifications import", "Initial constraint profile"] },
  { week: "Week 2", title: "Configuration & calibration", items: ["15+ config areas set up", "Cost model tuning", "Allowance rules per machine", "Pattern library seeded with historical data"] },
  { week: "Week 3", title: "Shadow mode parallel run", items: ["Engine runs alongside manual planning", "Daily plan comparison", "Operator training", "Edge cases flagged and configured"] },
  { week: "Week 4", title: "Go-live", items: ["Cutover to Deckle-generated plans", "On-site planner support", "Pattern learning activated", "Performance baseline locked"] },
  { week: "Week 5+", title: "Continuous improvement", items: ["Weekly review cadence", "Pattern library grows with approvals", "Configuration refinements", "ROI tracking against baseline"] },
];

export function DeckleDeepDive({ data }: { data: ModuleData }) {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
            alt="Paper reels" fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20 min-h-[88vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <Scissors size={12} /> Flagship · Deckle Optimizer
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tight mb-6 max-w-5xl">
            Slit smarter.<br />
            <span style={{ background: "linear-gradient(135deg, #EF4444, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Recover everything.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-2 max-w-2xl mb-10 leading-relaxed">
            The most advanced deckle and slitting optimization engine built for paper mills.
            Three intelligent tiers. 180+ constraints. Continuous pattern learning.
            Saves ₹100K+ per month at the winder.
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

          {/* Live metric tiles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {[
              { value: "3-Tier", label: "Engine", color: "#F59E0B" },
              { value: "180+", label: "Constraints", color: "#EF4444" },
              { value: "<2s", label: "Instant Mode", color: "#FBBF24" },
              { value: "₹100K+", label: "Saved / month", color: "#34D399" },
            ].map((m) => (
              <div key={m.label} className="bg-surface/85 backdrop-blur border border-border-dim rounded-xl p-4">
                <p className="text-2xl font-black font-mono mb-1" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs text-text-3">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEM / CRISIS */}
      <section className="py-20 border-y border-border-dim bg-background">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> The hidden cost
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6 leading-tight">
                Every kilo of trim is a kilo of <span className="text-red-400">money in the bin</span>.
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-6">
                A typical paper mill loses 4–6% of production to trim waste at the winder.
                For a 2,000 TPD mill at ₹70,000/tonne pulp + conversion cost, that&apos;s
                <span className="text-amber-400 font-semibold"> ₹56–84 crore burned every year</span>
                — turning premium paper into recycled fiber at a fraction of value.
              </p>
              <p className="text-text-3 text-sm leading-relaxed">
                Manual deckle planning makes it worse: planners hand-build cut patterns using
                spreadsheets, can&apos;t evaluate alternatives, and re-plan takes 30–45 minutes
                whenever an order changes.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-surface border border-border-dim rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-mono text-text-4 mb-5">Trim waste impact · 2000 TPD mill</p>
              <div className="space-y-4">
                {[
                  { label: "Wasted production", value: "82,000 t/yr", bar: 100, color: "#EF4444" },
                  { label: "Material + conversion cost", value: "₹57 Cr", bar: 90, color: "#F59E0B" },
                  { label: "Lost margin opportunity", value: "₹38 Cr", bar: 75, color: "#FBBF24" },
                  { label: "After Deckle Optimizer", value: "₹68 Cr saved", bar: 88, color: "#34D399" },
                ].map((row, i) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-text-2">{row.label}</span>
                      <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                    </div>
                    <div className="h-2.5 bg-surface-3 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-text-4 mt-5 font-mono leading-relaxed">
                * Based on ₹70K/t pulp+conversion, 5% trim, 95% recovery improvement target. Actual savings depend on mill configuration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-TIER COMPARISON */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">The 3-Tier Engine</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Right algorithm. Right time budget.
          </h2>
          <p className="text-text-2 text-lg max-w-3xl mb-14 leading-relaxed">
            Three modes for three planning horizons. The engine auto-selects based on problem
            complexity and available time, or you can force a mode for specific scenarios.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {TIERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface border rounded-2xl p-6 flex flex-col gap-5"
                  style={{ borderColor: `${t.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: t.lightHex, borderColor: `${t.color}40` }}>
                      <Icon size={20} style={{ color: t.color }} />
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: t.color }}>{t.time}</span>
                  </div>

                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1">{t.name}</h3>
                    <p className="text-xs text-text-3 font-mono">{t.use}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: t.color }}>When to use</p>
                      <p className="text-text-2 text-[13px] leading-relaxed">{t.when}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: t.color }}>Method</p>
                      <p className="text-text-2 text-[12px] leading-relaxed">{t.method}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-dim">
                      <div>
                        <p className="text-[10px] text-text-4 font-mono">QUALITY</p>
                        <p className="text-xs text-text-2">{t.quality}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-text-4 font-mono">CONSTRAINTS</p>
                        <p className="text-xs text-text-2">{t.constraints}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAMPLE PLAN VISUAL */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Sample Output</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">A real optimization plan.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            What you actually see after a Full Optimization run. Every slit, every position, every reel — with reasoning.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            {/* Plan header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dim bg-background">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-text-3">PLAN ID</span>
                <span className="text-sm font-bold text-foreground font-mono">PLN-2026-0124-MC2</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">APPROVED</span>
              </div>
              <div className="flex items-center gap-5 text-xs text-text-3">
                <span>Machine: <span className="text-foreground font-mono">PM-2</span></span>
                <span>Shift: <span className="text-foreground font-mono">A</span></span>
                <span>Date: <span className="text-foreground font-mono">24-Jan-2026</span></span>
              </div>
            </div>

            {/* Plan summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-6 border-b border-border-dim bg-[#0c0c0c]">
              {[
                { label: "Deckle width", value: "5,260 mm", color: "#F59E0B" },
                { label: "Trim", value: "1.4%", color: "#34D399" },
                { label: "Recovery", value: "98.6%", color: "#34D399" },
                { label: "SWO value", value: "₹4.2L", color: "#FBBF24" },
                { label: "Solver", value: "MILP · 3m42s", color: "#60A5FA" },
              ].map((s) => (
                <div key={s.label} className="bg-background rounded-lg p-3 border border-border-dim">
                  <p className="text-[10px] text-text-3 uppercase tracking-wider mb-1 font-semibold">{s.label}</p>
                  <p className="text-lg font-black font-mono" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Slit pattern visualization */}
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-text-3 mb-4">Slitting Pattern — Deckle 5,260 mm</p>

              <div className="relative h-20 rounded-lg overflow-hidden flex items-stretch font-mono">
                {[
                  { width: 1200, label: "1200mm", customer: "ABC", color: "#3B82F6" },
                  { width: 1100, label: "1100mm", customer: "GHI", color: "#A855F7" },
                  { width: 950, label: "950mm", customer: "ABC", color: "#3B82F6" },
                  { width: 800, label: "800mm", customer: "XYZ", color: "#10B981" },
                  { width: 850, label: "850mm", customer: "GHI", color: "#A855F7" },
                  { width: 285, label: "SWO", customer: "Stock", color: "#F59E0B" },
                  { width: 75, label: "trim", customer: "—", color: "#EF4444" },
                ].map((slit, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: `${(slit.width / 5260) * 100}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                    className="flex flex-col items-center justify-center border-r border-black/40 px-1 overflow-hidden"
                    style={{ background: `linear-gradient(180deg, ${slit.color}30, ${slit.color}15)` }}>
                    <span className="text-[10px] font-bold text-foreground truncate">{slit.label}</span>
                    <span className="text-[9px] text-text-2 truncate">{slit.customer}</span>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 mt-3 text-center">
                {["Pos 1", "Pos 2", "Pos 3", "Pos 4", "Pos 5", "Pos 6", "Edge"].map((p) => (
                  <span key={p} className="text-[9px] text-text-4 font-mono">{p}</span>
                ))}
              </div>

              {/* Active constraints */}
              <div className="mt-6 pt-5 border-t border-border-dim">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-text-3 mb-3">Active constraints honored (12 of 180+)</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Deckle ≤ 5260mm", "ABC order priority", "FEFO batch C-4821",
                    "Pos 6 SWO eligible", "Trim < 2.5%", "Knife count ≤ 8",
                    "GSM tolerance ±2", "Reel weight max 2.4t", "Maint window respected",
                    "Customer XYZ delivery", "Pattern PT-447 (learned)", "Recovery ≥ 96%",
                  ].map((c) => (
                    <span key={c} className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 180+ CONSTRAINTS CATALOG */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Constraints Catalog</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            180+ constraints. Eight categories.
          </h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Every rule of your mill — hard limits and soft preferences — codified, configurable, and honored on every plan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONSTRAINTS.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="bg-surface border border-border-dim rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
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

      {/* CONFIG AREAS */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Configuration</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">15+ tunable areas.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Configure once, then keep refining. Every knob exposed through admin UI, all changes versioned and audit-logged.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CONFIG_AREAS.map((c, i) => (
              <motion.div key={c.code}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                className="bg-surface border border-border-dim rounded-xl p-4 hover:border-amber-500/25 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded">{c.code}</span>
                  <h3 className="text-foreground font-bold text-sm">{c.title}</h3>
                </div>
                <p className="text-xs text-text-3 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Real mill scenarios.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Four typical situations where Deckle Optimizer changes the outcome.
          </p>

          <div className="space-y-12">
            {USE_CASES.map((uc, i) => (
              <motion.div key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-60 lg:h-auto border border-border-dim">
                  <Image src={uc.photo} alt={uc.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: uc.accent }}>Case {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-foreground text-xl font-black drop-shadow leading-tight">{uc.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-surface border border-border-dim rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Scenario</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: uc.accent }}>Deckle Response</p>
                    <p className="text-sm text-text-2 leading-relaxed">{uc.response}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-dim">
                    {Object.entries(uc.metrics).map(([k, v]) => (
                      <div key={k} className="bg-background rounded-lg p-3 border border-border-dim text-center">
                        <p className="text-[9px] uppercase tracking-wider text-text-3 mb-0.5 font-mono">{k.replace(/_/g, " ")}</p>
                        <p className="text-base font-black font-mono" style={{ color: uc.accent }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE COMPARISON */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Performance Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Manual vs Deckle.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Before/after numbers from a representative 2,000 TPD mill running Deckle for 90 days.
          </p>

          <div className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-4 border-b border-border-dim bg-background text-[10px] uppercase tracking-widest font-semibold text-text-3">
              <span>Metric</span>
              <span className="text-center">Manual Planning</span>
              <span className="text-center">With Deckle</span>
              <span className="text-right">Improvement</span>
            </div>
            {PERFORMANCE.map((row, i) => (
              <motion.div key={row.metric}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="grid grid-cols-4 px-6 py-4 border-b border-border-dim last:border-0 items-center">
                <span className="text-sm text-text-2">{row.metric}</span>
                <span className="text-sm text-text-3 font-mono text-center">{row.manual}</span>
                <span className="text-sm text-emerald-400 font-mono text-center font-bold">{row.deckle}</span>
                <span className="text-xs text-amber-400 font-mono text-right">{row.improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE REPORTS */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Reports & Analytics</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">What you get out.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Recovery analysis, pattern effectiveness, plan-vs-actual reconciliation, trim trends. Reports that turn data into decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Report 1: Trim trend */}
            <div className="bg-surface border border-border-dim rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Trim % Trend</p>
                <BarChart3 size={14} className="text-amber-400" />
              </div>
              <div className="h-32 flex items-end gap-1.5">
                {[5.2, 4.8, 4.3, 3.6, 3.1, 2.7, 2.3, 2.0, 1.8, 1.8, 1.7, 1.6].map((v, i) => (
                  <motion.div key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / 6) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="flex-1 rounded-t"
                    style={{ background: i >= 7 ? "#34D399" : "#EF4444" }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-text-4 font-mono mt-2">
                <span>Wk1</span><span>Wk12</span>
              </div>
              <p className="text-xs text-text-3 mt-3 leading-relaxed">
                Trim % dropped from 5.2% to 1.6% over 12 weeks after Deckle go-live.
              </p>
            </div>

            {/* Report 2: Recovery breakdown */}
            <div className="bg-surface border border-border-dim rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Recovery Breakdown</p>
                <Activity size={14} className="text-emerald-400" />
              </div>
              <div className="space-y-3">
                {[
                  { label: "Customer orders", pct: 87.2, color: "#34D399" },
                  { label: "SWO (sellable)", pct: 11.4, color: "#FBBF24" },
                  { label: "Trim (waste)", pct: 1.4, color: "#EF4444" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-2">{r.label}</span>
                      <span className="font-mono font-bold" style={{ color: r.color }}>{r.pct}%</span>
                    </div>
                    <div className="h-2 bg-surface-3 rounded overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${r.pct}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded" style={{ background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-3 mt-4 leading-relaxed">
                SWO valued at 20× waste. Highly tuned recovery drops trim near theoretical minimum.
              </p>
            </div>

            {/* Report 3: Pattern effectiveness */}
            <div className="bg-surface border border-border-dim rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Pattern Library</p>
                <Layers size={14} className="text-blue-400" />
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                {[
                  { id: "PT-447", uses: 142, score: 96 },
                  { id: "PT-389", uses: 98, score: 94 },
                  { id: "PT-512", uses: 76, score: 91 },
                  { id: "PT-228", uses: 54, score: 88 },
                  { id: "PT-661", uses: 31, score: 82 },
                ].map((p) => (
                  <div key={p.id} className="flex items-center gap-3 py-1 border-b border-border-dim last:border-0">
                    <span className="text-blue-400 font-bold">{p.id}</span>
                    <span className="text-text-3 text-[10px] flex-1">{p.uses} uses</span>
                    <span className="text-emerald-400 font-bold">{p.score}/100</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-3 mt-3 leading-relaxed">
                Top 5 learned patterns. Engine biases toward high-score patterns when demand matches.
              </p>
            </div>

            {/* Report 4: Solver time */}
            <div className="bg-surface border border-border-dim rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Solver Time Distribution</p>
                <Clock size={14} className="text-purple-400" />
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { mode: "Instant Mode", count: 1247, time: "1.2s avg", color: "#FBBF24" },
                  { mode: "Planning Mode", count: 318, time: "18s avg", color: "#60A5FA" },
                  { mode: "Full Optimization", count: 47, time: "3m 21s avg", color: "#34D399" },
                ].map((s) => (
                  <div key={s.mode} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-text-2 flex-1">{s.mode}</span>
                    <span className="font-mono text-text-3">{s.count}</span>
                    <span className="font-mono" style={{ color: s.color }}>{s.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-3 mt-3 leading-relaxed">
                Last 30 days. 96% of optimizations are Instant or Planning mode — 4% need Full.
              </p>
            </div>

            {/* Report 5: Plan vs actual */}
            <div className="bg-surface border border-border-dim rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Plan vs Actual (last 7 days)</p>
                <RefreshCw size={14} className="text-pink-400" />
              </div>
              <div className="space-y-2 text-xs font-mono">
                {[
                  { day: "Mon", planned: "98.4%", actual: "97.8%", delta: "-0.6", ok: true },
                  { day: "Tue", planned: "97.9%", actual: "97.2%", delta: "-0.7", ok: true },
                  { day: "Wed", planned: "98.6%", actual: "98.9%", delta: "+0.3", ok: true },
                  { day: "Thu", planned: "97.5%", actual: "96.1%", delta: "-1.4", ok: false },
                  { day: "Fri", planned: "98.2%", actual: "98.4%", delta: "+0.2", ok: true },
                  { day: "Sat", planned: "97.8%", actual: "97.5%", delta: "-0.3", ok: true },
                  { day: "Sun", planned: "98.1%", actual: "98.0%", delta: "-0.1", ok: true },
                ].map((row) => (
                  <div key={row.day} className="grid grid-cols-4 gap-2 items-center py-1 border-b border-border-dim last:border-0">
                    <span className="text-text-2">{row.day}</span>
                    <span className="text-text-3 text-right">{row.planned}</span>
                    <span className="text-foreground text-right">{row.actual}</span>
                    <span className={`text-right ${row.ok ? "text-emerald-400" : "text-amber-400"}`}>{row.delta}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-3 mt-3 leading-relaxed">
                Plan accuracy &gt; ±1% on 6 of 7 days. Thursday investigated and root cause identified.
              </p>
            </div>

            {/* Report 6: Savings */}
            <div className="bg-surface border border-emerald-500/25 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-foreground font-bold text-sm">Monthly Savings</p>
                <TrendingDown size={14} className="text-emerald-400" />
              </div>
              <p className="text-3xl font-black font-mono text-emerald-400 mb-1">₹4.82 Cr</p>
              <p className="text-xs text-text-3 mb-4">Last 6 months, cumulative</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-text-2">Reduced trim</span><span className="font-mono text-emerald-300">₹3.21 Cr</span></div>
                <div className="flex justify-between"><span className="text-text-2">SWO recovery uplift</span><span className="font-mono text-emerald-300">₹1.18 Cr</span></div>
                <div className="flex justify-between"><span className="text-text-2">Planning time saved</span><span className="font-mono text-emerald-300">₹0.28 Cr</span></div>
                <div className="flex justify-between"><span className="text-text-2">Faster re-plans</span><span className="font-mono text-emerald-300">₹0.15 Cr</span></div>
              </div>
              <p className="text-xs text-text-3 mt-3 leading-relaxed">
                Realized savings ROI: 9.2× annualized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION MODES */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Integration Modes</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Embedded. Standalone. API.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-14">
            Choose how Deckle fits into your stack. Use it embedded in Papyrus BPApp, plug it into your existing ERP, or call it API-only.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {DEPLOYMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.mode}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface border rounded-2xl p-6"
                  style={{ borderColor: `${d.accent}30` }}>
                  <div className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4"
                    style={{ background: `${d.accent}12`, borderColor: `${d.accent}30` }}>
                    <Icon size={18} style={{ color: d.accent }} />
                  </div>
                  <h3 className="text-foreground font-black text-lg mb-2">{d.mode}</h3>
                  <p className="text-sm text-text-2 leading-relaxed">{d.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-500 mb-4">Hosting Options</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HOSTING.map((h) => (
              <div key={h.type} className="bg-surface border border-border-dim rounded-xl p-4">
                <p className="text-foreground font-bold text-sm mb-1.5">{h.type}</p>
                <p className="text-xs text-text-3 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-surface border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Lock size={18} className="text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-foreground font-bold text-base mb-1">Pre-built ERP Connectors</p>
                <p className="text-sm text-text-2 leading-relaxed mb-3">
                  Connect to your existing ERP in days — not months. Standard connectors ship with mapping templates for paper-industry data models.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SAP S/4HANA", "SAP ECC", "Oracle ERP", "Tally Prime", "Microsoft Dynamics 365", "ERPNext", "Custom REST"].map((c) => (
                    <span key={c} className="text-xs font-semibold px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION TIMELINE */}
      <section className="py-24 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Implementation</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">From contract to ROI in 30 days.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Typical rollout. Faster for API-only integration, longer for full embedded with custom integrations.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent hidden md:block" />

            <div className="space-y-5">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.week}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface border-2 border-amber-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-amber-400">
                    {step.week.replace("Week ", "W").replace("+", "+")}
                  </div>
                  <div className="bg-surface border border-border-dim rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-amber-400 font-mono">{step.week}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-text-2 flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="mt-0.5 text-amber-400 flex-shrink-0" /> {item}
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

      {/* PLANNER UI MOCKUP */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Planner Workspace</p>
          <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Built for planners, not data scientists.</h2>
          <p className="text-text-2 text-lg max-w-2xl mb-12">
            Interactive planner UI with drag-drop adjustments, live constraint feedback, alternative pattern explorer, and one-click approval.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-surface border border-border-dim rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border-dim bg-background">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-text-3 font-mono">Deckle Planner · PM-2 · Shift A</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Auto-saving
              </span>
            </div>

            <div className="grid grid-cols-12 gap-3 p-4 text-xs">
              {/* Left: Demand pool */}
              <div className="col-span-3 bg-background rounded-lg border border-border-dim p-3 max-h-96 overflow-hidden">
                <p className="text-[10px] uppercase tracking-wider text-text-3 mb-3 font-semibold">Demand Pool</p>
                <div className="space-y-1.5">
                  {[
                    { order: "SO-2847", customer: "ABC Paper", width: "1200mm", qty: "4.2t" },
                    { order: "SO-2851", customer: "GHI Mills", width: "1100mm", qty: "3.8t" },
                    { order: "SO-2855", customer: "XYZ Pack", width: "800mm", qty: "2.4t" },
                    { order: "SO-2861", customer: "ABC Paper", width: "950mm", qty: "1.9t" },
                    { order: "SO-2867", customer: "GHI Mills", width: "850mm", qty: "2.1t" },
                  ].map((o) => (
                    <div key={o.order} className="bg-surface border border-border-dim rounded p-2 text-[10px]">
                      <p className="font-mono text-blue-400">{o.order}</p>
                      <p className="text-text-2 truncate">{o.customer}</p>
                      <p className="text-text-3 font-mono mt-0.5">{o.width} · {o.qty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center: Slit canvas */}
              <div className="col-span-6 bg-background rounded-lg border border-border-dim p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-text-3 font-semibold">Slitting Canvas · 5260mm deckle</p>
                  <span className="text-[10px] font-mono text-emerald-400">Trim 1.4% · Recovery 98.6%</span>
                </div>

                <div className="h-16 flex items-stretch rounded overflow-hidden mb-3">
                  {[
                    { w: 1200, color: "#3B82F6", label: "ABC" },
                    { w: 1100, color: "#A855F7", label: "GHI" },
                    { w: 950, color: "#3B82F6", label: "ABC" },
                    { w: 800, color: "#10B981", label: "XYZ" },
                    { w: 850, color: "#A855F7", label: "GHI" },
                    { w: 285, color: "#F59E0B", label: "SWO" },
                    { w: 75, color: "#EF4444", label: "T" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-center border-r border-black/40 text-[10px] font-bold text-foreground"
                      style={{ width: `${(s.w / 5260) * 100}%`, background: `linear-gradient(180deg, ${s.color}40, ${s.color}20)` }}>
                      {s.label}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-3">
                  <button className="text-[10px] px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">Drag positions</button>
                  <button className="text-[10px] px-2 py-1 rounded bg-surface border border-border-dim text-text-2">Try alternative</button>
                  <button className="text-[10px] px-2 py-1 rounded bg-surface border border-border-dim text-text-2">Lock slit</button>
                  <button className="text-[10px] px-2 py-1 rounded bg-emerald-500 text-black font-bold ml-auto">Approve</button>
                </div>

                <p className="text-[10px] text-emerald-400 font-mono">✓ All 12 active constraints satisfied. Plan ready for release.</p>
              </div>

              {/* Right: Constraints panel */}
              <div className="col-span-3 bg-background rounded-lg border border-border-dim p-3 max-h-96 overflow-hidden">
                <p className="text-[10px] uppercase tracking-wider text-text-3 mb-3 font-semibold">Live Constraints</p>
                <div className="space-y-1.5">
                  {[
                    "Deckle width", "Trim limit", "Knife count", "FEFO honor",
                    "Customer specs", "SWO eligible", "Recovery", "Reel weight",
                    "GSM tolerance", "Pattern bias",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-[10px]">
                      <CheckCircle2 size={10} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-text-2 truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES MATRIX */}
      <FeatureCardGrid
        eyebrow="Every Capability"
        title="Drill into any feature."
        cards={data.capabilities}
        accent={data.accent}
        moduleSlug={data.slug}
      />

      {/* INTEGRATIONS */}
      <IntegrationMap moduleName={data.name} integrations={data.integrations} accent={data.accent} />

      {/* CTA */}
      <CTABanner />
    </div>
  );
}
