"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const PERSONAS = [
  {
    id: "small-mill",
    size: "Small",
    title: "Small Paper Mill",
    profile: "1 machine · 25–100 TPD · 50–200 employees",
    pain: "Spreadsheet chaos. Manual GST returns. Customer chasing late payments. No visibility into actual production cost.",
    bundle: ["Sales & Orders", "Procurement", "Inventory", "Finance & GST", "Party Management", "Email Hub", "Mobile Apps"],
    photo: "https://images.unsplash.com/photo-1565793298495-4f3c61ee7ec1?auto=format&fit=crop&w=1200&q=80",
    accent: "#10B981",
    upgrade: "Add HR, Production Planning, and Quality Control as headcount grows.",
  },
  {
    id: "medium-mill",
    size: "Medium",
    title: "Medium Paper Mill",
    profile: "2–4 machines · 100–500 TPD · 200–500 employees",
    pain: "Production planning conflicts. Manual shift rosters. Inconsistent quality across machines. Multiple disconnected systems.",
    bundle: ["Everything in Small", "Production Planning (MPS/MRP/CRP)", "HR & Payroll", "Quality Control", "Machine Maintenance", "Notifications & Alerts"],
    photo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    accent: "#F59E0B",
    upgrade: "Switch on Deckle Optimizer and AI Analytics to squeeze the next 5% efficiency gain.",
  },
  {
    id: "large-mill",
    size: "Large",
    title: "Large Paper Mill",
    profile: "5+ machines · 500–2000 TPD · 500–2000 employees",
    pain: "Trim waste at the winder. Predictable downtime from reactive maintenance. Sluggish board reports. Compliance burden across multiple plants.",
    bundle: ["Everything in Medium", "Deckle Optimizer (3-tier)", "AI & Predictive Analytics", "Automations / RPA", "Project Management", "Advanced Document Management"],
    photo: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1200&q=80",
    accent: "#A855F7",
    upgrade: "Enable group-level consolidation when adding new plants or acquisitions.",
  },
  {
    id: "group",
    size: "Group",
    title: "Multi-Plant / Mill Group",
    profile: "Multi-plant · 2000+ TPD · 2000+ employees · Multiple legal entities",
    pain: "Consolidating P&L across entities. Inter-company transactions and pricing. Group treasury and cash management. Differing GSTINs per branch.",
    bundle: ["Everything in Large", "Multi-company consolidation", "Inter-company workflows", "Group analytics dashboard", "Custom integrations (SAP, BI tools)", "Dedicated Customer Success Manager"],
    photo: "https://images.unsplash.com/photo-1565793498704-9cb936e92524?auto=format&fit=crop&w=1200&q=80",
    accent: "#EF4444",
    upgrade: "Custom workflows + dedicated infrastructure + on-premise option available.",
  },
  {
    id: "integrated",
    size: "Integrated",
    title: "Integrated Paper Mills",
    profile: "Pulp + paper + chemical recovery · forest-to-finished-product · 500–5000 TPD",
    pain: "Pulp mill ↔ paper mill ↔ recovery ↔ effluent coordination. Wood yard inventory + chemical balances. Multi-stage costing across pulping, papermaking, finishing. Bark, black liquor, and white liquor flows.",
    bundle: ["Everything in Large bundle", "Pulp mill operations + recovery", "Wood yard + chip yard management", "Chemical balance + recovery boiler tracking", "Effluent + ETP monitoring", "Multi-stage product costing"],
    photo: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    accent: "#22C55E",
    upgrade: "AI-driven yield optimization across pulp + paper stages. Predictive maintenance on recovery boiler and digester.",
  },
  {
    id: "kraft",
    size: "Specialty",
    title: "Kraft Paper Mills",
    profile: "Specialty kraft · brown kraft, MG kraft, sack kraft",
    pain: "Kraft-specific quality parameters (Ring Crush, Burst Strength, COBB). FSC compliance for recycled content. Customer-spec variability across grades.",
    bundle: ["Core Operations bundle", "Quality Control with Kraft-specific tests", "Customer specification management", "FSC chain-of-custody tracking", "Reel-level traceability"],
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    accent: "#FB923C",
    upgrade: "Add converting modules if expanding into corrugated board or paper sacks.",
  },
  {
    id: "tissue",
    size: "Specialty",
    title: "Tissue & Towel Mills",
    profile: "Tissue · facial · napkin · toilet · kitchen towel",
    pain: "Conversion line scheduling. Wrapper/ply quality. Retailer-specific SKU packaging. Promotion-driven demand spikes.",
    bundle: ["Core Operations bundle", "Conversion module (tailored for tissue)", "Multi-SKU master per parent grade", "Retailer EDI integration", "Promotion/campaign planning"],
    photo: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    accent: "#06B6D4",
    upgrade: "Enable AI demand forecasting to handle promotion-driven demand swings.",
  },
  {
    id: "specialty",
    size: "Specialty",
    title: "Specialty / Board / Packaging",
    profile: "Decorative · board · packaging · coated · uncoated",
    pain: "Complex BOM with chemicals and coatings. Customer-specific quality specs. Sample-to-production workflow. Higher value, lower volume runs.",
    bundle: ["Core Operations bundle", "Chemistry-aware BOM", "Sample order workflow", "Customer specification library", "Cost per grade variance tracking"],
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    accent: "#EC4899",
    upgrade: "Add Project Management for capital expansion projects and new product launches.",
  },
  {
    id: "recycled",
    size: "Recycled",
    title: "Recycled / Waste Paper Mills",
    profile: "OCC · mixed waste · deinking · 100% recovered fiber",
    pain: "Raw material variability and contamination. Wood-yard logistics for sorting and storage. Deinking chemistry tracking. Yield reconciliation across pulp stages.",
    bundle: ["Core Operations bundle", "RM yard + contamination tracking", "Multi-grade waste paper inventory", "Pulp yield analytics", "Chemical consumption per grade"],
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    accent: "#0EA5E9",
    upgrade: "AI-driven RM mix optimization for cost vs quality trade-offs.",
  },
  {
    id: "coop",
    size: "Co-op",
    title: "Co-operative / Sahakari Mills",
    profile: "Member-owned · profit-sharing · multi-member supplier base",
    pain: "Member governance and bonus distribution. Member-supplier accounting and price differentials. Board reporting for member assemblies. Compliance with state co-op laws.",
    bundle: ["Core Operations bundle", "Member master + share ledger", "Bonus / dividend calculation", "Member-supplier accounting", "Governance reporting"],
    photo: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    accent: "#F472B6",
    upgrade: "Add Audit + Compliance for state co-op authority reporting.",
  },
  {
    id: "newsprint",
    size: "Newsprint",
    title: "Newsprint Mills",
    profile: "Newsprint · high-volume continuous runs · publisher customers",
    pain: "Long continuous runs with minimal grade changeovers. High-volume single-customer relationships. Diminishing demand patterns. Cost-per-tonne pressure.",
    bundle: ["Core Operations bundle", "Long-run scheduling", "Volume contract management", "Customer-specific dispatch", "Cost-per-tonne analytics"],
    photo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    accent: "#94A3B8",
    upgrade: "Diversification planning module if exploring kraft or specialty grades.",
  },
  {
    id: "trader",
    size: "Distribution",
    title: "Paper Traders & Distributors",
    profile: "Trading · stockist · distributor · no manufacturing",
    pain: "Inventory turnover. Credit exposure across hundreds of customers. Branch-wise stock visibility. Import compliance for global sourcing.",
    bundle: ["Sales · Procurement · Inventory", "Finance & GST · Party Management", "Trade finance (LC, FEMA, BoE)", "Multi-warehouse stock", "Credit limit + dunning automation"],
    photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    accent: "#8B5CF6",
    upgrade: "AI demand forecasting + automated reordering as catalog grows.",
  },
  {
    id: "converting",
    size: "Converting",
    title: "Converting Units",
    profile: "Corrugators · paper cups · bags · cartons · stationery",
    pain: "Raw material from multiple mills. Job-work and toll manufacturing. Per-customer artwork management. Short-run job costing.",
    bundle: ["Core Operations bundle", "Conversion module", "Toll manufacturing workflow", "Artwork & design library", "Job-level cost variance"],
    photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    accent: "#84CC16",
    upgrade: "Add Quality and Mobile apps for shop floor digitization.",
  },
  {
    id: "jobwork",
    size: "Job Work",
    title: "Pulp & Paper Job Workers",
    profile: "Toll manufacturing · slitting · packaging · specific-stage operators",
    pain: "Multi-principal accounting (different mills sending material). Stage-specific job costing. Material in-out reconciliation with principal. GST job-work workflow (challan, completion).",
    bundle: ["Sales · Inventory · Production", "Toll manufacturing workflow", "Multi-principal stock tracking", "Job-work GST challans", "Stage-wise cost allocation"],
    photo: "https://images.unsplash.com/photo-1565793298495-4f3c61ee7ec1?auto=format&fit=crop&w=1200&q=80",
    accent: "#FBBF24",
    upgrade: "Mobile job tracking + automated reconciliation reports per principal.",
  },
  {
    id: "oem",
    size: "OEM",
    title: "Paper Machinery / OEMs",
    profile: "Paper mill equipment makers · long-lead engineered products",
    pain: "Project-based manufacturing (each order is unique). Long lead times (months). FAT/SAT compliance. Spares inventory for installed base. Service contract management.",
    bundle: ["Project Management (primary)", "Engineering BOM + change orders", "Long-cycle production planning", "Spares inventory + service contracts", "FAT/SAT documentation"],
    photo: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1200&q=80",
    accent: "#F87171",
    upgrade: "Add IoT integration for installed-base predictive maintenance services.",
  },
  {
    id: "epc",
    size: "EPC",
    title: "EPCs / Mill Consultants",
    profile: "Engineering firms building or upgrading paper mills",
    pain: "Multi-client project portfolio. Resource allocation across simultaneous projects. Vendor management for procurement on behalf of clients. Client-specific billing milestones.",
    bundle: ["Project Management (primary)", "Multi-client portfolio dashboard", "Pass-through procurement", "Milestone-based client billing", "Resource utilization analytics"],
    photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    accent: "#A78BFA",
    upgrade: "Industry-specific templates + benchmarking data as you scale.",
  },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1920&q=80"
            alt="Paper mills" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8">
            Who Uses Papyrus BPApp
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl">
            One platform.<br /><span className="amber-text">Every paper business.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            From single-machine mills to multi-plant groups, kraft to tissue to packaging,
            traders to converters — the same platform adapts to your scale and your specialty.
            Built to grow with you, not be replaced.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Find the right fit <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/architecture" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all">
              ← Pluggable architecture
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SIZE-BASED PERSONAS */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">By Size</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">From small to group scale.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Start with what you need today. Add modules as you grow. No re-implementation, no data loss.
          </p>

          <div className="space-y-12">
            {PERSONAS.slice(0, 4).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                {/* Photo + size badge */}
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-60 lg:h-auto border border-[#1f1f1f]">
                  <Image src={p.photo} alt={p.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: p.accent, borderColor: `${p.accent}50`, background: `${p.accent}15` }}>
                    {p.size}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-2xl font-black mb-1 drop-shadow">{p.title}</h3>
                    <p className="text-xs text-zinc-300 font-mono">{p.profile}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-2">Pain Points</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{p.pain}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: p.accent }}>Recommended Bundle</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.bundle.map((b) => (
                        <span key={b}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-md border"
                          style={{ background: `${p.accent}10`, borderColor: `${p.accent}30`, color: p.accent }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1f1f1f]">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1.5">Upgrade Path</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{p.upgrade}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTY MILLS */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">By Specialty & Complexity</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Built for every mill type.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Integrated pulp-and-paper, kraft, tissue, specialty board — each has its own workflows, quality parameters, and complexity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERSONAS.slice(4, 11).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-amber-500/25 transition-colors">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.photo} alt={p.title} fill className="object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>{p.size}</p>
                    <h3 className="text-white text-lg font-black">{p.title}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-xs text-zinc-500 font-mono">{p.profile}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.pain}</p>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: p.accent }}>Tailored Modules</p>
                    <ul className="space-y-1">
                      {p.bundle.slice(0, 4).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRADERS + CONVERTERS */}
      <section className="py-20 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Beyond Mills</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">The entire paper value chain.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Traders, converters, job workers, machinery OEMs, EPCs — same platform, different workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERSONAS.slice(11).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/25 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: p.accent, borderColor: `${p.accent}50`, background: `${p.accent}15` }}>
                    {p.size}
                  </span>
                  <h3 className="text-2xl font-black text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-zinc-500 font-mono">{p.profile}</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{p.pain}</p>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: p.accent }}>Recommended Bundle</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.bundle.map((b) => (
                      <span key={b}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md border"
                        style={{ background: `${p.accent}10`, borderColor: `${p.accent}30`, color: p.accent }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-auto border-t border-[#1f1f1f]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1.5">Next step</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.upgrade}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PAPYRUS */}
      <section className="py-20 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">One Platform. Every Stage.</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-6 max-w-3xl mx-auto">
            The system that fits today is the same system that fits at 10× your scale.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            No re-implementation projects. No painful migrations. No replaced ERPs three years later.
            Activate modules as you need them; the data, the people, the workflows all stay continuous.
          </p>
          <Link href="/architecture" className="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm">
            See how it scales <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
