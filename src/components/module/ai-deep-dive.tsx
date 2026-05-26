"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Sparkles, Brain, MessageSquare, AlertTriangle, CheckCircle2,
  Eye, Database, Workflow, Zap, Target, Activity, BarChart3, Layers, Cpu, ShieldCheck,
  TrendingUp, GitBranch, Lock, FlaskConical, Wand2, Search, Bell,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";
import { ModuleData } from "@/lib/modules";
import { FeatureCardGrid } from "@/components/module/feature-grid";
import { IntegrationMap } from "@/components/module/integration-map";

const PROVIDERS = [
  {
    icon: Sparkles, name: "Anthropic Claude", color: "#D97706", lightHex: "rgba(217,119,6,0.1)",
    use: "Default for India deployments",
    strengths: "Strong reasoning, low hallucination, long context. Best for financial reconciliation, GST analysis, audit explanations.",
    models: "Claude Opus 4, Sonnet 4, Haiku 4",
    residency: "AWS Mumbai or Singapore",
  },
  {
    icon: Brain, name: "Google Gemini", color: "#4285F4", lightHex: "rgba(66,133,244,0.1)",
    use: "Multi-modal + Indic languages",
    strengths: "Image + document understanding (DOC AI), strong Hindi/regional language support, integrates with Workspace.",
    models: "Gemini 2.5 Pro, Flash, Nano",
    residency: "GCP Mumbai or Singapore",
  },
  {
    icon: Cpu, name: "OpenAI GPT-4", color: "#10A37F", lightHex: "rgba(16,163,127,0.1)",
    use: "Plugin-rich workflows",
    strengths: "Mature tool-use ecosystem, structured outputs, broadest integration library.",
    models: "GPT-4o, GPT-4 Turbo, GPT-4 Mini",
    residency: "Azure India Central or Asia",
  },
];

const AI_FEATURES = [
  {
    category: "Conversational AI", icon: MessageSquare, color: "#A78BFA", count: "22 capabilities",
    items: [
      "Natural-language queries across 44 modules",
      "Multi-turn context with conversation memory",
      "Cross-module joins ('top 10 customers Q3')",
      "Action commands ('create quote for ABC, 50t kraft')",
      "Human-in-loop preview before commit",
      "Citations linked to source data",
      "Rate limiting: 20 queries/minute/user",
      "Conversation export with audit signing",
      "Voice input (Hindi, English, regional)",
      "Slack / Teams / WhatsApp adapters",
    ],
  },
  {
    category: "Predictive Maintenance", icon: AlertTriangle, color: "#F59E0B", count: "16 capabilities",
    items: [
      "Vibration pattern analysis (bearings)",
      "Dryer cylinder thermal anomalies",
      "Refiner load drift detection",
      "Motor current spike prediction",
      "24–72 hour advance warning",
      "Confidence-scored alerts",
      "Auto-create maintenance work request",
      "Spare part availability check",
      "Component lifecycle modeling",
      "Maintenance cost-benefit ranking",
    ],
  },
  {
    category: "Quality Anomaly Detection", icon: FlaskConical, color: "#34D399", count: "14 capabilities",
    items: [
      "Multi-variate SPC with ML control limits",
      "Defect cluster detection across reels",
      "Pulp furnish drift correlation",
      "Customer complaint root-cause linking",
      "COA anomaly vs historical baseline",
      "Suspect batch auto-hold workflow",
      "Vision-based defect classification",
      "Cross-shift quality stability scoring",
    ],
  },
  {
    category: "Bulk AI Actions", icon: Wand2, color: "#60A5FA", count: "12 capabilities",
    items: [
      "Bulk quotation generation",
      "Bulk invoice creation from DC pool",
      "Bulk PO release with budget check",
      "Bulk GRN approval (low-risk)",
      "Bulk customer outreach (collections)",
      "Always preview → approve → commit",
      "Per-action confidence + reasoning",
      "Reversible with one click",
      "Audit log with diff capture",
    ],
  },
  {
    category: "Cross-Module Insights", icon: GitBranch, color: "#EC4899", count: "18 capabilities",
    items: [
      "Margin per customer × grade × shift",
      "Working capital trajectory",
      "Inventory ageing → cash impact",
      "Customer churn risk signals",
      "Supplier risk + MSME exposure",
      "Cash flow 13-week rolling forecast",
      "Order-to-cash bottleneck detection",
      "Energy cost anomaly across PMs",
      "Demand pattern shift detection",
    ],
  },
  {
    category: "Governance & Safety", icon: ShieldCheck, color: "#94A3B8", count: "12 capabilities",
    items: [
      "Per-user prompt + response logging",
      "PII redaction before LLM call",
      "Tool-use authorization matrix",
      "RBAC enforced on every query",
      "Data residency locked per tenant",
      "Hallucination flagging with citations",
      "Confidence threshold gating",
      "Auditor view of every AI action",
    ],
  },
];

const USE_CASES = [
  {
    title: "Plant manager asks: 'Why is margin down on KR-100?'",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    scenario: "Monthly review. Plant manager opens chat: 'Why is margin per tonne on KR-100 GSM kraft down 6.2% vs last quarter?' Expects to spend an afternoon pulling reports.",
    response: "AI joins Production, Finance, Procurement and Sales data. Replies in 14 seconds with: pulp cost up 4.1% (specific supplier batch), broke rate up 1.8 pts (PM-2 calendar bearing), one customer renegotiated price down 2.3%. Each claim cited with drill-down link. Manager raises 3 actions inside the chat.",
    metrics: { time_to_answer: "14s", sources_joined: "4 modules", actions_raised: "3" },
  },
  {
    title: "Predictive: Bearing fails in 38 hours",
    photo: "https://images.unsplash.com/photo-1581094488379-6c8b29a6e2d0?auto=format&fit=crop&w=1200&q=80",
    scenario: "PM-1 calendar bearing has been showing vibration drift over 11 days. Trend gradient steepening. Human eye on the dashboard would miss it for another shift or two.",
    response: "AI flags 'bearing failure predicted 38 hours ± 6 hrs, confidence 87%'. Auto-creates maintenance work request, checks spare availability (yes, in store), proposes preventive window (Sunday early shift, lowest production loss). Maintenance head approves with one click. Bearing swapped Sunday. No unplanned breakdown.",
    metrics: { advance_warning: "38 hrs", downtime_avoided: "~6 hrs", confidence: "87%" },
  },
  {
    title: "Bulk: Send dunning to 240 overdue accounts",
    photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    scenario: "AR clerk needs to send personalized collection emails to 240 overdue accounts before quarter-end. Manual: a full day of mail-merge and review.",
    response: "AI drafts 240 emails, each with customer-specific outstanding aging, last interaction notes, and tone calibrated to relationship history. Preview UI shows all 240 in a virtualized list with confidence per draft. Clerk reviews 18 flagged drafts (low confidence), edits 4, bulk approves the rest. 240 emails sent in 22 minutes.",
    metrics: { drafts: "240", review_time: "22 min", manual_baseline: "~7 hours" },
  },
  {
    title: "Quality anomaly: defect pattern across 14 reels",
    photo: "https://images.unsplash.com/photo-1565618722293-d3a51b3c5430?auto=format&fit=crop&w=1200&q=80",
    scenario: "PM-2 made 142 reels overnight. Operator-level defect logging shows nothing unusual. But customer complaint dashboard shows 3 complaints from different customers received this morning.",
    response: "AI runs cluster analysis. Finds 14 reels with subtle moisture profile shift (3.2% above grade target on edges). All 3 complaints trace back to those reels. AI auto-holds the remaining 9 reels still in stock, raises CAPA, links pulp furnish change from 02:14 AM, suggests dryer steam balance check. CAPA opens for engineering before lunch.",
    metrics: { reels_identified: "14", reels_held: "9", customers_protected: "3" },
  },
];

const PERFORMANCE = [
  { metric: "Time to answer mgmt question", manual: "Half day", deckle: "15 sec", improvement: "~1000× faster" },
  { metric: "Predictive maintenance lead time", manual: "None (reactive)", deckle: "24–72 hrs", improvement: "Proactive" },
  { metric: "Bulk action throughput", manual: "~30/hour", deckle: "240/hour", improvement: "8× higher" },
  { metric: "Defect cluster detection", manual: "After complaint", deckle: "Before dispatch", improvement: "Preventive" },
  { metric: "AI hallucination rate (with citations)", manual: "N/A", deckle: "< 0.4%", improvement: "Audit-grade" },
  { metric: "Per-query cost (rate-limited)", manual: "Analyst hour ₹500+", deckle: "₹0.20–₹2", improvement: "200× cheaper" },
];

const SAFETY_PILLARS = [
  { title: "Human-in-the-loop by default", desc: "Any action that creates or modifies data shows a preview with diff and confidence score. Nothing commits without explicit user click. No autopilot for financial or compliance impact.", icon: Eye },
  { title: "Citations, not assertions", desc: "Every AI answer ties claims back to source records — invoice ID, batch number, GRN line. Click to drill. If AI can't cite, it says so.", icon: Search },
  { title: "PII redaction before LLM", desc: "PAN, Aadhaar, contact details masked before any prompt leaves the deployment region. Redaction is reversible only inside the audit boundary.", icon: Lock },
  { title: "Per-tenant data residency", desc: "Each deployment locked to a single region. Indian customer data never crosses the border without explicit consent. Pre-flight checks enforced.", icon: ShieldCheck },
  { title: "Rate-limited + cost-capped", desc: "20 queries/minute/user by default. Monthly cost ceiling per tenant; soft alert at 80%, hard cap at 100%. No surprise bills, no runaway loops.", icon: Bell },
  { title: "Full audit log", desc: "Prompt, redacted prompt, model, response, citations, user action — every exchange logged immutably. Auditor view shows complete AI history for any user or any action.", icon: Activity },
];

const TIMELINE = [
  { week: "Week 1", title: "LLM provider + residency", items: ["Provider selection (Claude/Gemini/GPT)", "Residency region locked", "API keys + rotation policy", "Cost ceiling + alerts configured"] },
  { week: "Week 2", title: "Data wiring + RBAC", items: ["Module data sources mapped", "PII redaction rules tuned", "RBAC enforced on AI tool-use", "Per-user rate limits set"] },
  { week: "Week 3", title: "Predictive + anomaly models", items: ["Vibration + thermal models trained", "Quality SPC baseline locked", "Defect cluster thresholds tuned", "Cross-module joins validated"] },
  { week: "Week 4", title: "Go-live + shadow mode", items: ["Conversational chat open to power users", "Predictive alerts visible (no auto-action)", "Hallucination + citation audit weekly", "User feedback loop active"] },
  { week: "Week 5+", title: "Expand cautiously", items: ["Bulk actions opened by area", "Auto-actions promoted with proven confidence", "Custom skills added per role", "Cost vs value reviewed monthly"] },
];

export function AIDeepDive({ data }: { data: ModuleData }) {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden grain">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80"
            alt="AI for paper manufacturing" fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20 min-h-[88vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <Sparkles size={12} /> Intelligence Layer · AI & Analytics
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6 max-w-5xl">
            Ask the ERP.<br />
            <span style={{ background: "linear-gradient(135deg, #A78BFA, #60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Act in seconds.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Conversational AI across all 44 modules. Claude, Gemini or GPT — configurable per
            deployment. Predictive maintenance with 24–72 hour warning. Bulk actions with
            human-in-loop preview. Citations on every answer.
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
              { value: "Multi-LLM", label: "Claude · Gemini · GPT", color: "#A78BFA" },
              { value: "24–72h", label: "Predictive warning", color: "#F59E0B" },
              { value: "44", label: "Modules covered", color: "#34D399" },
              { value: "0.4%", label: "Hallucination rate", color: "#60A5FA" },
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
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> The reporting tax
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                Decisions wait on <span className="text-violet-300">someone pulling a report</span>.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                A mill produces data 24×7 but answers crawl. Plant manager wants a margin breakdown
                — analyst takes a day. CFO wants working capital trajectory — finance team takes a week.
                Maintenance head wants impending failure list — there isn&apos;t one until something breaks.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Every delay between question and answer is a decision deferred. AI isn&apos;t a chatbot —
                it&apos;s removing the analyst bottleneck between operational data and operational action.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-mono text-zinc-600 mb-5">Question → answer lag · before vs after</p>
              <div className="space-y-4">
                {[
                  { label: "'Why is margin down?'", before: "Half day", after: "15 sec", bar: 99, color: "#A78BFA" },
                  { label: "'Which machine is failing?'", before: "After breakdown", after: "38 hrs ahead", bar: 95, color: "#F59E0B" },
                  { label: "'Working capital next 13 wks?'", before: "Week", after: "Live", bar: 90, color: "#60A5FA" },
                  { label: "'Send dunning to 240 accounts'", before: "Full day", after: "22 min", bar: 80, color: "#34D399" },
                ].map((row, i) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-400">{row.label}</span>
                      <span className="font-mono"><span className="text-zinc-600">{row.before}</span> <span className="text-zinc-600">→</span> <span className="font-bold" style={{ color: row.color }}>{row.after}</span></span>
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
                * Production deployment, 90-day rolling baseline.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROVIDERS */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">LLM Providers</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Pick your engine. Lock your region.
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mb-14 leading-relaxed">
            Claude, Gemini and GPT — all wired in. Customer chooses based on residency, cost,
            and capability profile. Switch providers without re-doing your integration.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PROVIDERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0f0f0f] border rounded-2xl p-6 flex flex-col gap-4"
                  style={{ borderColor: `${t.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: t.lightHex, borderColor: `${t.color}40` }}>
                      <Icon size={20} style={{ color: t.color }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl mb-1">{t.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono">{t.use}</p>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{t.strengths}</p>
                  <div className="pt-3 border-t border-[#1f1f1f] space-y-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: t.color }}>Models available</p>
                      <p className="text-[11px] text-zinc-300 font-mono">{t.models}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: t.color }}>Data residency</p>
                      <p className="text-[11px] text-zinc-300 font-mono">{t.residency}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHAT MOCKUP */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Conversational Example</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">A real query, end to end.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            What the plant manager sees when asking a question that cuts across Production, Finance, Procurement and Sales.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[#1f1f1f] bg-[#080808]">
              <Sparkles size={14} className="text-violet-300" />
              <span className="text-xs text-zinc-500 font-mono">BPApp Chat · Claude Opus · Mumbai</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Streaming
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-white">Why is margin per tonne on KR-100 GSM kraft down 6.2% vs last quarter?</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-[#080808] border border-[#1f1f1f] rounded-2xl rounded-bl-sm px-4 py-3 max-w-2xl space-y-3">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Three drivers, ranked by impact:
                  </p>
                  <ol className="space-y-2 text-sm text-zinc-300 list-decimal list-inside">
                    <li><span className="font-semibold text-white">Pulp cost up 4.1%</span> — supplier batch BAT-9821 priced ₹2,847/t higher than contract. <span className="text-violet-300 underline">PO-4471 ↗</span></li>
                    <li><span className="font-semibold text-white">Broke rate up 1.8 pts</span> — PM-2 calendar bearing showed thermal drift starting 14-Nov. <span className="text-violet-300 underline">Maint-2391 ↗</span></li>
                    <li><span className="font-semibold text-white">Price renegotiated</span> — customer ABC dropped from ₹68,400/t to ₹66,820/t. <span className="text-violet-300 underline">SO-2847 ↗</span></li>
                  </ol>
                  <p className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-[#1f1f1f]">
                    Total reconciled: -6.2% (≈ -₹4,140/t). Sources: Production OEE, Procurement PO ledger, Finance margin report, Sales price log.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button className="text-[10px] px-2 py-1 rounded bg-violet-500/10 border border-violet-500/30 text-violet-300 font-semibold">Raise action</button>
                    <button className="text-[10px] px-2 py-1 rounded bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-400">Show full reasoning</button>
                    <button className="text-[10px] px-2 py-1 rounded bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-400">Export to deck</button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
                <CheckCircle2 size={11} className="text-emerald-400" /> 4 modules joined · 14s · 3 citations · confidence 0.92
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Capability Catalog</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            90+ AI capabilities. Six categories.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Conversation. Prediction. Anomaly. Bulk action. Insight. Safety. Every category gated by human review where it matters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_FEATURES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-violet-500/20 transition-colors">
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

      {/* SAFETY PILLARS */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Safety & Governance</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Six pillars. No surprises.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Enterprise AI fails when it&apos;s too autonomous. We engineer for trust — preview, citation, redaction, residency, rate limit, audit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAFETY_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 hover:border-violet-500/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg border border-violet-500/30 bg-violet-500/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-violet-300" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Real mill scenarios.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Four operational moments where AI saves hours, money, or both.
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
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-violet-300">Case {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-white text-xl font-black drop-shadow leading-tight">{uc.title}</h3>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Scenario</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-300 mb-2">AI Response</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{uc.response}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#1f1f1f]">
                    {Object.entries(uc.metrics).map(([k, v]) => (
                      <div key={k} className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f] text-center">
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5 font-mono">{k.replace(/_/g, " ")}</p>
                        <p className="text-base font-black font-mono text-violet-300">{v}</p>
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
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Performance Comparison</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Analyst-led vs AI-augmented.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Before/after numbers from a 90-day production deployment.
          </p>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-4 border-b border-[#1f1f1f] bg-[#080808] text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
              <span>Metric</span>
              <span className="text-center">Analyst-led</span>
              <span className="text-center">AI-augmented</span>
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
                <span className="text-xs text-violet-300 font-mono text-right">{row.improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">Implementation</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Live in 30 days. Expand cautiously.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            AI rollout sequenced for trust. Start with read-only chat; promote bulk actions only after proven confidence.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent hidden md:block" />
            <div className="space-y-5">
              {TIMELINE.map((step, i) => (
                <motion.div key={step.week}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0f0f0f] border-2 border-violet-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-violet-300">
                    {step.week.replace("Week ", "W")}
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-violet-300 font-mono">{step.week}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="mt-0.5 text-violet-300 flex-shrink-0" /> {item}
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
