"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQGroup {
  label: string;
  accent: string;
  items: FAQItem[];
}

const FAQ_GROUPS: FAQGroup[] = [
  {
    label: "Product",
    accent: "#F59E0B",
    items: [
      {
        q: "Does BPApp work for small mills (1–2 machines)?",
        a: "Yes. BPApp is modular — a small mill can start with just Sales, Procurement, Inventory, Finance, and GST. You only pay for and configure what you need. There is no minimum module count.",
      },
      {
        q: "Can we add modules later without re-implementation?",
        a: "Yes. Adding a module means activating it and configuring it — your existing data, users, and workflows stay intact. There is no data migration or re-implementation when you expand.",
      },
      {
        q: "Does it support multiple paper grades and machines?",
        a: "Yes. BPApp supports unlimited machines and grades. The Deckle Optimizer, for example, plans trim patterns per machine per grade. Quality parameters, process variables, and cost tracking are all per machine and grade.",
      },
      {
        q: "Is there a mobile app?",
        a: "Yes. BPApp includes mobile apps for Android and iOS. The mobile companion supports offline-first field sync, shift reporting, quality checks, and approval workflows. It works in low-connectivity environments like shop floors.",
      },
    ],
  },
  {
    label: "Implementation",
    accent: "#10B981",
    items: [
      {
        q: "How long does implementation take?",
        a: "Typically 10–14 weeks for a full go-live. A focused single-plant deployment with core modules (Sales, Procurement, Finance) can go live in 6–8 weeks. We've never missed a committed go-live date.",
      },
      {
        q: "Do we need a systems integrator or implementation partner?",
        a: "No. Our team handles implementation directly. You get a dedicated implementation manager from day one, not a third-party SI billing by the hour.",
      },
      {
        q: "How is data migrated from Tally or Excel?",
        a: "We provide structured migration templates for master data (customers, vendors, products, machines) and opening balances. Our team validates the migrated data before go-live. You don't need to do this yourself.",
      },
      {
        q: "What does training look like?",
        a: "Role-based training — Finance team gets Finance + GST training, Production team gets Production + Quality + Maintenance, Management gets dashboards and reports. Super-user training is included so your team can train future joiners.",
      },
    ],
  },
  {
    label: "Pricing",
    accent: "#F59E0B",
    items: [
      {
        q: "How is BPApp priced?",
        a: "BPApp uses a pluggable pricing model — you pay for the modules you deploy, not a fixed bundle. Pricing depends on module selection, user count, plant count, and deployment model. Contact us for a custom quote.",
      },
      {
        q: "Is there a minimum contract duration?",
        a: "Typically 1-year contracts for SaaS deployment, with multi-year options available at preferred rates. On-premise deployments use perpetual licensing with annual maintenance.",
      },
      {
        q: "Are implementation and training included in the price?",
        a: "Implementation is quoted separately based on scope. Standard training is included. Ongoing support is included in the annual subscription. No surprise fees.",
      },
    ],
  },
  {
    label: "Technical",
    accent: "#3B82F6",
    items: [
      {
        q: "What deployment options are available?",
        a: "Cloud SaaS (Vercel + managed database), Private Cloud (your VPC on AWS/Azure/GCP), or On-Premise (your servers). All three options are fully supported with identical features.",
      },
      {
        q: "What is the uptime SLA?",
        a: "99.9% uptime SLA for Cloud SaaS deployments, measured monthly. That's < 44 minutes of downtime per month. We publish a status page.",
      },
      {
        q: "Does BPApp integrate with Tally, SAP, or BI tools?",
        a: "Yes. BPApp has a REST API + webhook system. Pre-built connectors exist for Tally (migration and live sync), GST portal (e-invoice, e-way bill), banking systems, and major BI tools. Custom integrations are built during implementation.",
      },
      {
        q: "Where is data stored? Is it India-hosted?",
        a: "For Cloud SaaS, data is hosted in India (Mumbai region) by default. For Private Cloud and On-Premise, data stays on your infrastructure. All data is encrypted at rest and in transit.",
      },
    ],
  },
  {
    label: "Compliance",
    accent: "#EC4899",
    items: [
      {
        q: "How does BPApp handle GST?",
        a: "GST is native — not an add-on. E-invoicing with IRP, GSTR-1 auto-population, GSTR-3B reconciliation, e-way bill generation, ITC tracking, and RCM handling are all built in. Your CA or finance team configures rules once; the system handles it automatically.",
      },
      {
        q: "What about TDS / TCS compliance?",
        a: "TDS and TCS are handled end-to-end: vendor-wise TDS rates, auto deduction at payment, TDS certificates, Form 26Q filing data, and reconciliation with 26AS.",
      },
      {
        q: "Is FEMA compliance included?",
        a: "Yes. For import/export transactions — LC management, bank realization certificates, FEMA coding, EDPMS/IDPMS tracking — all covered. This is especially relevant for mills importing pulp, chemicals, or machinery.",
      },
    ],
  },
];

function FAQAccordion({ group }: { group: FAQGroup }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="rounded-2xl border border-border-dim overflow-hidden">
      {/* Group header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ background: `${group.accent}0d`, borderBottom: `1px solid ${group.accent}20` }}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.accent }} />
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: group.accent }}>
          {group.label}
        </p>
      </div>

      {/* Items */}
      <div className="divide-y divide-[#1a1a1a]">
        {group.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="bg-surface">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors leading-snug">
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  className="flex-shrink-0 transition-transform duration-200 text-text-3"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: isOpen ? group.accent : undefined,
                  }}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-text-2 leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-background" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            FAQ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 max-w-4xl"
          >
            Questions before<br />
            <span className="amber-text">you commit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-2 max-w-2xl mb-10 leading-relaxed"
          >
            Honest answers to what every mill asks before going live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              Still have questions?{" "}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/implementation"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all"
            >
              How implementation works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDIONS */}
      <section className="py-24 border-y border-border-dim">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {FAQ_GROUPS.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <FAQAccordion group={group} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="py-24 bg-background border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Not finding what you need?
            </p>
            <h2 className="text-4xl font-black text-foreground tracking-tight mb-4 max-w-2xl mx-auto">
              Talk to someone who knows paper mills.
            </h2>
            <p className="text-text-2 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Our team has worked inside paper mills. Ask any question — about process, compliance,
              data migration, or integration.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              Contact Us{" "}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
