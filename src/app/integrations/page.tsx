"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe,
  IndianRupee,
  Receipt,
  Truck,
  Building2,
  Database,
  Mail,
  MessageSquare,
  Bell,
  BarChart2,
  Cpu,
  Activity,
  Zap,
  Server,
  GitBranch,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

type StatusType = "Native" | "Pre-built" | "Via API" | "On Request";

interface IntegrationCard {
  icon: LucideIcon;
  name: string;
  description: string;
  status: StatusType;
}

interface IntegrationCategory {
  id: string;
  label: string;
  accent: string;
  cards: IntegrationCard[];
}

const STATUS_STYLES: Record<StatusType, { bg: string; text: string; border: string }> = {
  Native: { bg: "#10B98115", text: "#10B981", border: "#10B98140" },
  "Pre-built": { bg: "#F59E0B15", text: "#F59E0B", border: "#F59E0B40" },
  "Via API": { bg: "#3B82F615", text: "#3B82F6", border: "#3B82F640" },
  "On Request": { bg: "#52525215", text: "#A1A1AA", border: "#52525240" },
};

const CATEGORIES: IntegrationCategory[] = [
  {
    id: "gov-tax",
    label: "Government & Tax Portals",
    accent: "#10B981",
    cards: [
      {
        icon: FileText,
        name: "GST Portal (IRP)",
        description: "E-invoice submission, IRN generation, QR code embedding via Invoice Registration Portal.",
        status: "Native",
      },
      {
        icon: Receipt,
        name: "GSTN",
        description: "GSTR-1 and GSTR-3B data push, ITC reconciliation against GSTR-2B.",
        status: "Native",
      },
      {
        icon: Truck,
        name: "E-Way Bill Portal",
        description: "Auto-generation on dispatch, bulk upload, and cancellation via NIC e-way bill API.",
        status: "Native",
      },
      {
        icon: IndianRupee,
        name: "TDS / TRACES",
        description: "Form 26Q data submission, TDS certificate generation, and TRACES reconciliation.",
        status: "Native",
      },
      {
        icon: Globe,
        name: "EDPMS / IDPMS",
        description: "FEMA reporting for import and export transactions via RBI's data portals.",
        status: "Native",
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting & ERP Migration",
    accent: "#F59E0B",
    cards: [
      {
        icon: Database,
        name: "Tally Prime / ERP 9",
        description: "Live sync or one-time migration with voucher-level ledger mapping and reconciliation.",
        status: "Pre-built",
      },
      {
        icon: Layers,
        name: "Microsoft Excel",
        description: "Bulk import and export via structured templates for masters, transactions, and reports.",
        status: "Pre-built",
      },
      {
        icon: Building2,
        name: "SAP (Migration)",
        description: "Master data and opening balance migration from SAP ECC or S/4HANA.",
        status: "On Request",
      },
      {
        icon: Server,
        name: "Oracle (Migration)",
        description: "Data migration from Oracle E-Business Suite including financials and inventory.",
        status: "On Request",
      },
      {
        icon: GitBranch,
        name: "Custom ERP",
        description: "API-based integration with any existing ERP via REST and webhook events.",
        status: "Via API",
      },
    ],
  },
  {
    id: "banking",
    label: "Banking & Payments",
    accent: "#3B82F6",
    cards: [
      {
        icon: IndianRupee,
        name: "HDFC Bank",
        description: "Bank statement auto-import, RTGS/NEFT payment initiation via HDFC API.",
        status: "Pre-built",
      },
      {
        icon: IndianRupee,
        name: "ICICI Bank",
        description: "Bank reconciliation, RTGS and NEFT payment initiation through ICICI CIB.",
        status: "Pre-built",
      },
      {
        icon: IndianRupee,
        name: "SBI / State Banks",
        description: "Statement import via SFTP and auto-reconciliation for SBI and state bank accounts.",
        status: "Pre-built",
      },
      {
        icon: Receipt,
        name: "Payment Gateways",
        description: "Razorpay and PayU integration for customer payment links and automated receipting.",
        status: "Pre-built",
      },
      {
        icon: GitBranch,
        name: "Bank API (Generic)",
        description: "Any bank with ISO 20022-compliant API or SFTP-based statement feeds.",
        status: "Via API",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    accent: "#A855F7",
    cards: [
      {
        icon: Mail,
        name: "Email (SMTP)",
        description: "Transactional emails — order confirmations, dispatch advices, outstanding statements.",
        status: "Native",
      },
      {
        icon: MessageSquare,
        name: "WhatsApp Business API",
        description: "Order alerts, dispatch notifications, and approval requests via WhatsApp Business.",
        status: "Pre-built",
      },
      {
        icon: Bell,
        name: "SMS (Multi-provider)",
        description: "OTP, dispatch alerts, and reminders via MSG91 and Twilio SMS providers.",
        status: "Pre-built",
      },
      {
        icon: MessageSquare,
        name: "Slack / Teams",
        description: "System alerts, exception notifications, and workflow approvals to channels.",
        status: "Pre-built",
      },
    ],
  },
  {
    id: "bi",
    label: "Business Intelligence",
    accent: "#EC4899",
    cards: [
      {
        icon: BarChart2,
        name: "Power BI",
        description: "Pre-built BPApp datasets with live DirectQuery connector for real-time dashboards.",
        status: "Pre-built",
      },
      {
        icon: BarChart2,
        name: "Tableau",
        description: "Data connector via BPApp REST API for custom Tableau workbooks and dashboards.",
        status: "Via API",
      },
      {
        icon: BarChart2,
        name: "Google Looker Studio",
        description: "Google Sheets export and dedicated Looker Studio connector for BI reporting.",
        status: "Pre-built",
      },
      {
        icon: Database,
        name: "Custom BI Tools",
        description: "OData endpoint and REST API for connecting any BI tool or data warehouse.",
        status: "Via API",
      },
    ],
  },
  {
    id: "industry-iot",
    label: "Industry & IoT",
    accent: "#F97316",
    cards: [
      {
        icon: Cpu,
        name: "SCADA Systems",
        description: "OPC-UA and Modbus protocol adapters for machine data ingestion from SCADA.",
        status: "Pre-built",
      },
      {
        icon: Activity,
        name: "IoT Devices (MQTT)",
        description: "Sensor data ingestion via MQTT broker integration for real-time equipment monitoring.",
        status: "Pre-built",
      },
      {
        icon: Zap,
        name: "Lab Equipment",
        description: "Instrument data import via CSV upload or direct API for quality lab results.",
        status: "Pre-built",
      },
      {
        icon: Server,
        name: "DCS Systems",
        description: "Distributed Control System data feeds for process parameter tracking and alerts.",
        status: "On Request",
      },
    ],
  },
];

const STATUS_LEGEND: { status: StatusType; meaning: string }[] = [
  { status: "Native", meaning: "Built into BPApp core — no setup needed." },
  { status: "Pre-built", meaning: "Connector available — configure in Settings." },
  { status: "Via API", meaning: "Use BPApp's REST API + webhooks to build." },
  { status: "On Request", meaning: "Available as a scoped implementation item." },
];

function StatusBadge({ status }: { status: StatusType }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border whitespace-nowrap"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {status}
    </span>
  );
}

function IntegrationCardItem({ card, index }: { card: IntegrationCard; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-surface border border-border-dim hover:border-amber-500/25 rounded-xl p-5 flex flex-col gap-3 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-3 border border-border-light flex items-center justify-center flex-shrink-0">
            <Icon size={16} className="text-text-2" />
          </div>
          <p className="text-foreground font-bold text-sm leading-tight">{card.name}</p>
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <StatusBadge status={card.status} />
        </div>
      </div>
      <p className="text-xs text-text-2 leading-relaxed">{card.description}</p>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden grain on-photo">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#0a0a0a] to-[#080808]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 75% 20%, #3B82F6 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            Integrations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 max-w-4xl"
          >
            Fits into your stack.<br />
            <span className="amber-text">Connects to everything.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-2 max-w-2xl mb-10 leading-relaxed"
          >
            REST API, webhooks, and pre-built connectors for government portals, accounting tools,
            communication platforms, and BI systems. BPApp fits into your existing tech stack —
            not the other way around.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/technical"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              View API Docs <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 text-sm font-medium transition-all"
            >
              Request Integration
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INTEGRATION CATEGORIES */}
      <section className="py-20 border-t border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6 space-y-20">
          {CATEGORIES.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: cat.accent }}
                />
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                    style={{ color: cat.accent }}
                  >
                    Category {catIndex + 1}
                  </p>
                  <h2 className="text-2xl font-black text-foreground">{cat.label}</h2>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.cards.map((card, i) => (
                  <IntegrationCardItem key={card.name} card={card} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATUS LEGEND */}
      <section className="py-16 bg-background border-y border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Status Guide</p>
            <h2 className="text-2xl font-black text-foreground tracking-tight mb-8">What the badges mean</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATUS_LEGEND.map(({ status, meaning }, i) => {
                return (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="bg-surface border border-border-dim rounded-xl p-5 space-y-3"
                  >
                    <StatusBadge status={status} />
                    <p className="text-sm text-text-2 leading-relaxed">{meaning}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OPEN API SECTION */}
      <section className="py-20 border-b border-border-dim">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Open API</p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5 leading-tight">
                Open API for<br /><span className="amber-text">everything else.</span>
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-8">
                Every business event, every entity, every workflow in BPApp is accessible through a
                documented REST API. Build the integration you need — or use the pre-built connectors
                and be live in minutes.
              </p>
              <Link
                href="/technical"
                className="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm"
              >
                See API docs <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {[
                {
                  icon: FileText,
                  title: "OpenAPI 3.0 Specification",
                  description: "Full machine-readable spec. Import into Postman, Insomnia, or generate SDKs automatically.",
                },
                {
                  icon: Zap,
                  title: "Webhook Events",
                  description: "Subscribe to any business event — order created, invoice posted, payment received, shipment dispatched.",
                },
                {
                  icon: Globe,
                  title: "SDKs Available",
                  description: "Official JavaScript/TypeScript and Python SDKs with TypeScript types generated from the OpenAPI spec.",
                },
                {
                  icon: Server,
                  title: "Sandbox Environment",
                  description: "Isolated sandbox with seeded test data. Build and test integrations without touching production.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-start gap-4 bg-surface border border-border-dim hover:border-amber-500/25 rounded-xl p-4 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-foreground font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-text-2 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
