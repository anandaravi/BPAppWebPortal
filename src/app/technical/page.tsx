"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Cloud, Server, Database, Shield, Cpu, HardDrive, Network,
  Lock, CheckCircle2, AlertTriangle, Activity, Smartphone, MapPin, Radio,
  CloudUpload, Key, Globe, Workflow, GitBranch, Layers, Gauge, Zap, RefreshCw,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

const DEPLOY_MODELS = [
  {
    icon: Cloud,
    title: "Cloud SaaS",
    color: "#10B981",
    tag: "Fastest start",
    desc: "Fully managed multi-tenant SaaS. Zero infrastructure. Auto-scaling, auto-patching, 99.5% SLA. Sign up Monday, transact Friday.",
    specs: [
      "Hosted on AWS / Azure / GCP",
      "Mumbai + Hyderabad regions",
      "Daily backups · 30-day retention",
      "Auto-scaling 10–2000+ concurrent users",
      "DDoS protection + WAF",
    ],
  },
  {
    icon: Server,
    title: "Private Cloud",
    color: "#3B82F6",
    tag: "Tenant isolation",
    desc: "Dedicated tenant in customer's preferred cloud (AWS, Azure, OCI). Your VPC, your IAM, your audit policies. Data never crosses tenant boundary.",
    specs: [
      "Customer VPC / VNet hosted",
      "Single-tenant database",
      "Region locked per regulation",
      "Customer-managed encryption keys (BYOK)",
      "Custom backup + DR policy",
    ],
  },
  {
    icon: HardDrive,
    title: "On-Premise",
    color: "#A855F7",
    tag: "Full control",
    desc: "Customer datacenter, customer hardware. Air-gapped or VPN-only access. Suited for mills with strict data residency or regulatory mandates.",
    specs: [
      "Customer hardware + datacenter",
      "Air-gap or VPN access models",
      "Customer-managed PKI",
      "Supported via secure remote tunnel",
      "Quarterly on-site reviews",
    ],
  },
  {
    icon: GitBranch,
    title: "Hybrid",
    color: "#F59E0B",
    tag: "Best of both",
    desc: "API + back-end in cloud, planner UI on-prem (or vice versa). Common for mills running Deckle Optimizer on-prem with reporting in cloud.",
    specs: [
      "Mixed deployment topology",
      "Site-to-site VPN connectivity",
      "Edge cache for shop floor",
      "Asynchronous data sync",
      "Custom failover policies",
    ],
  },
];

const TOPOLOGIES = [
  {
    name: "Standalone",
    tag: "Single node · Dev / Pilot / Small Mill",
    color: "#FBBF24",
    rto: "4 hours",
    rpo: "24 hours",
    sla: "99.0%",
    users: "Up to 100",
    desc: "All services on one server. Simplest topology, lowest cost. Suitable for pilots, single-mill operations, or non-critical environments.",
    components: [
      { name: "App Server", count: "1", node: "node1" },
      { name: "PostgreSQL", count: "1", node: "node1" },
      { name: "Redis", count: "1", node: "node1" },
      { name: "Background Workers", count: "1", node: "node1" },
    ],
  },
  {
    name: "High Availability (HA)",
    tag: "Multi-node · Production · Medium-Large Mill",
    color: "#34D399",
    rto: "< 5 min",
    rpo: "< 1 min",
    sla: "99.5%",
    users: "Up to 2000",
    desc: "Load-balanced app servers, primary/replica Postgres, Redis Sentinel, auto-failover. Survives single-node failures without service interruption.",
    components: [
      { name: "App Servers (Load Balanced)", count: "2-4", node: "cluster" },
      { name: "PostgreSQL Primary + Streaming Replica", count: "2", node: "cluster" },
      { name: "Redis Sentinel Cluster", count: "3", node: "cluster" },
      { name: "Background Worker Pool", count: "2+", node: "cluster" },
      { name: "Object Storage (S3 / MinIO)", count: "Redundant", node: "cluster" },
    ],
  },
  {
    name: "HADR (HA + Disaster Recovery)",
    tag: "Multi-region · Mission-critical · Mill Groups",
    color: "#60A5FA",
    rto: "< 15 min",
    rpo: "< 5 min",
    sla: "99.95%",
    users: "5000+",
    desc: "HA cluster in primary region + asynchronous replica cluster in secondary region. Survives region-wide outages. Required for mission-critical mill group operations.",
    components: [
      { name: "Primary Region (HA Cluster)", count: "Full", node: "region-A" },
      { name: "DR Region (Hot Standby)", count: "Full", node: "region-B" },
      { name: "Cross-region replication", count: "Async", node: "links" },
      { name: "Global DNS failover", count: "Automatic", node: "links" },
      { name: "Encrypted backup vault", count: "Multi-region", node: "vault" },
      { name: "Quarterly DR drills", count: "Mandatory", node: "ops" },
    ],
  },
];

const SIZING = [
  { tier: "Small (≤ 100 users)", cpu: "8 vCPU", ram: "32 GB", storage: "500 GB SSD", db: "PostgreSQL 15", cache: "Redis 7", network: "100 Mbps" },
  { tier: "Medium (100–500)", cpu: "16 vCPU", ram: "64 GB", storage: "2 TB SSD", db: "PostgreSQL 15", cache: "Redis 7 (Sentinel)", network: "1 Gbps" },
  { tier: "Large (500–2000)", cpu: "32 vCPU", ram: "128 GB", storage: "5 TB SSD", db: "PostgreSQL 15 (HA)", cache: "Redis 7 (Cluster)", network: "10 Gbps" },
  { tier: "Group (2000+)", cpu: "64+ vCPU", ram: "256+ GB", storage: "10+ TB NVMe", db: "PostgreSQL 15 (HADR)", cache: "Redis 7 (Multi-region)", network: "10 Gbps redundant" },
];

const SOFTWARE_STACK = [
  { layer: "Operating System", items: ["Ubuntu 22.04 LTS", "RHEL 9", "Rocky Linux 9", "Amazon Linux 2023"] },
  { layer: "Runtime", items: ["Node.js 20 LTS", "Python 3.11+ (ML services)", "Docker 24+", "Kubernetes 1.28+ (optional)"] },
  { layer: "Database", items: ["PostgreSQL 15+", "Redis 7+", "Object storage (S3 / MinIO)", "Optional: TimescaleDB for IoT"] },
  { layer: "Web Layer", items: ["NGINX / HAProxy", "Cloudflare / AWS WAF", "TLS 1.3 mandatory", "HTTP/2 + HTTP/3"] },
  { layer: "Monitoring", items: ["Prometheus + Grafana", "Loki / ELK stack", "OpenTelemetry tracing", "PagerDuty / Opsgenie"] },
  { layer: "Backup", items: ["pg_basebackup + WAL archiving", "S3 cross-region replication", "MinIO multi-site", "Restic for filesystem snapshots"] },
];

const EXTENSIONS = [
  {
    icon: Radio,
    title: "IoT / SCADA Integration",
    color: "#06B6D4",
    desc: "Connect mill machine sensors, SCADA systems, and PLCs for real-time data ingestion.",
    items: [
      "Protocol support: OPC-UA, Modbus TCP, MQTT, REST",
      "Time-series storage (TimescaleDB extension)",
      "Edge gateway for offline buffering",
      "Real-time stream into OEE, Maintenance, Quality",
      "Predictive maintenance ML pipelines",
    ],
  },
  {
    icon: MapPin,
    title: "GPS / Vehicle Tracking",
    color: "#10B981",
    desc: "Track dispatch vehicles, field service technicians, and inter-warehouse transfers in real time.",
    items: [
      "Driver mobile app with continuous GPS",
      "Geo-fencing for plant entry/exit",
      "ETA prediction with traffic data",
      "Route optimization (TSP solver)",
      "Customer auto-notification on arrival window",
    ],
  },
  {
    icon: CloudUpload,
    title: "Cloud Backup & DR",
    color: "#A855F7",
    desc: "Encrypted backups to cloud object storage with cross-region replication.",
    items: [
      "Continuous WAL streaming to S3 / Azure Blob",
      "Point-in-Time Recovery (PITR) to any minute",
      "Cross-region async replication",
      "Encrypted at rest (AES-256) + in transit (TLS 1.3)",
      "Quarterly DR drill validation",
    ],
  },
  {
    icon: Network,
    title: "VPN / Secure Access",
    color: "#F59E0B",
    desc: "Restrict platform access to corporate network or trusted endpoints.",
    items: [
      "Site-to-site IPsec / WireGuard VPN",
      "Client VPN (OpenVPN, WireGuard)",
      "IP allowlisting at WAF layer",
      "Zero Trust Network Access (ZTNA) supported",
      "Bastion / jump host for admin access",
    ],
  },
  {
    icon: Key,
    title: "SSO / Identity",
    color: "#EF4444",
    desc: "Federate authentication with corporate identity providers.",
    items: [
      "SAML 2.0 (Okta, OneLogin, Azure AD)",
      "OAuth 2.0 / OIDC",
      "LDAP / Active Directory sync",
      "MFA enforcement per role",
      "SCIM provisioning + auto-deprovisioning",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Device Management",
    color: "#EC4899",
    desc: "Manage company-issued mobiles + tablets used on shop floor and field.",
    items: [
      "MDM integration (Jamf, Intune, AirWatch)",
      "Remote wipe on device loss",
      "App distribution + version control",
      "Per-device certificate auth",
      "Compliance policies enforced before app login",
    ],
  },
  {
    icon: Workflow,
    title: "ERP Integration",
    color: "#8B5CF6",
    desc: "Pre-built and custom connectors to existing business systems.",
    items: [
      "SAP S/4HANA · SAP ECC",
      "Oracle ERP Cloud",
      "Microsoft Dynamics 365",
      "Tally Prime · Tally ERP 9",
      "Custom REST / SOAP / webhook",
    ],
  },
  {
    icon: Globe,
    title: "Statutory Portals",
    color: "#22C55E",
    desc: "Direct integration with Indian government portals for compliance filings.",
    items: [
      "GSTN (e-invoice IRN generation)",
      "NIC (e-Way Bill)",
      "EPFO (PF ECR upload)",
      "ESIC return submission",
      "Income Tax (TDS / Form 24Q)",
    ],
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    color: "#3B82F6",
    desc: "External monitoring tools and observability stack.",
    items: [
      "Datadog · New Relic · Dynatrace",
      "Sentry for error tracking",
      "Custom Prometheus exporters",
      "OpenTelemetry distributed tracing",
      "Slack / Teams / Opsgenie alert routing",
    ],
  },
];

const SECURITY = [
  { icon: Lock, label: "Encryption at rest (AES-256)" },
  { icon: Shield, label: "TLS 1.3 in transit" },
  { icon: Key, label: "BYOK (Bring Your Own Key) supported" },
  { icon: CheckCircle2, label: "SOC 2 Type II ready" },
  { icon: CheckCircle2, label: "ISO 27001 controls" },
  { icon: CheckCircle2, label: "GDPR + DPDP Act compliant" },
  { icon: CheckCircle2, label: "Aadhaar Act §29 audit logs" },
  { icon: CheckCircle2, label: "IT Act §43A sensitive data handling" },
];

const INSTALL_STEPS = [
  { phase: "Day 1", title: "Infra provisioning", items: ["Servers / VPC / VNet setup", "DNS + TLS certificates", "Storage allocation", "Network rules + firewall"] },
  { phase: "Day 2", title: "Stack installation", items: ["OS hardening", "Docker / Kubernetes setup", "Postgres + Redis install", "Object storage configuration"] },
  { phase: "Day 3", title: "Platform deployment", items: ["Papyrus BPApp services deploy", "Database schema migration", "Cache warm-up", "Health check validation"] },
  { phase: "Day 4-5", title: "Configuration", items: ["Company / branch / plant setup", "RBAC roles + users", "Integration endpoints", "Feature toggles per company"] },
  { phase: "Day 6-7", title: "Data migration + UAT", items: ["Master data import", "Opening balances", "User acceptance testing", "Mock cutover dry run"] },
  { phase: "Week 2", title: "Go-live", items: ["Production cutover", "On-site support", "Monitoring dashboards live", "Hypercare period begins"] },
];

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
            alt="Technical infrastructure" fill className="object-cover opacity-30" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-[var(--container-max)] mx-auto px-6 pt-36 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8 max-w-max">
            <Server size={12} /> Technical & Deployment
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-4xl">
            Deploy anywhere.<br /><span className="amber-text">Scale everywhere.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Cloud SaaS, private cloud, on-premise, or hybrid. Standalone, HA, or HADR.
            Extensible with IoT, GPS, VPN, SSO, MDM. Designed for paper mill IT teams who care about
            uptime, security, and total cost of ownership.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all">
              Talk to solutions engineering <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/architecture" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#333] text-white hover:border-amber-500/40 text-sm font-medium transition-all">
              ← Pluggable architecture
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DEPLOYMENT MODELS */}
      <section className="py-24 border-y border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Deployment Models</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Four ways to deploy.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Pick the model that matches your data residency, control, and operating model preferences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DEPLOY_MODELS.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#0f0f0f] border rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
                  style={{ borderColor: `${m.color}25` }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: `${m.color}12`, borderColor: `${m.color}30` }}>
                      <Icon size={20} style={{ color: m.color }} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded border"
                      style={{ background: `${m.color}10`, borderColor: `${m.color}30`, color: m.color }}>
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">{m.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">{m.desc}</p>
                  <ul className="space-y-1.5">
                    {m.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: m.color }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOPOLOGIES — Standalone / HA / HADR */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Environment Topologies</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Standalone, HA, HADR.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            Match topology to business criticality. Upgrade later without re-implementation.
          </p>

          <div className="space-y-6">
            {TOPOLOGIES.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0f0f0f] border rounded-2xl overflow-hidden"
                style={{ borderColor: `${t.color}30` }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Left: Description */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-6 rounded-full" style={{ background: t.color }} />
                      <h3 className="text-2xl font-black text-white">{t.name}</h3>
                    </div>
                    <p className="text-xs font-mono mb-4" style={{ color: t.color }}>{t.tag}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">{t.desc}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f]">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">RTO</p>
                        <p className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.rto}</p>
                      </div>
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f]">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">RPO</p>
                        <p className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.rpo}</p>
                      </div>
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f]">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">SLA</p>
                        <p className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.sla}</p>
                      </div>
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#1f1f1f]">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Users</p>
                        <p className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.users}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Component diagram */}
                  <div className="lg:col-span-2 bg-[#080808] rounded-xl border border-[#1f1f1f] p-5">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-4">Topology Components</p>
                    {i === 0 && (
                      // Standalone — single node
                      <div className="flex flex-col items-center">
                        <div className="px-6 py-4 rounded-xl border-2"
                          style={{ background: `${t.color}10`, borderColor: `${t.color}50` }}>
                          <p className="text-xs font-mono mb-2 text-center" style={{ color: t.color }}>Single Server</p>
                          <div className="grid grid-cols-2 gap-2">
                            {t.components.map((c) => (
                              <div key={c.name} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded p-2 text-center">
                                <p className="text-[10px] text-zinc-300">{c.name}</p>
                                <p className="text-[9px] font-mono" style={{ color: t.color }}>x{c.count}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      // HA — cluster
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-600 w-20">Load Balancer</span>
                          <div className="flex-1 px-3 py-1.5 rounded border bg-[#0f0f0f] border-[#1f1f1f] text-center text-[10px] text-zinc-300">HAProxy / NGINX</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-600 w-20">App Tier</span>
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="px-2 py-1.5 rounded border text-center text-[10px]"
                                style={{ background: `${t.color}10`, borderColor: `${t.color}30`, color: t.color }}>
                                Node-{n}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-600 w-20">Database</span>
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div className="px-2 py-1.5 rounded border text-center text-[10px]"
                              style={{ background: `${t.color}15`, borderColor: `${t.color}40`, color: t.color }}>
                              Primary
                            </div>
                            <div className="px-2 py-1.5 rounded border text-center text-[10px] text-zinc-300 bg-[#0f0f0f] border-[#1f1f1f]">
                              Replica (sync)
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-600 w-20">Cache</span>
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            {["Sentinel-1", "Sentinel-2", "Sentinel-3"].map((s) => (
                              <div key={s} className="px-2 py-1.5 rounded border text-center text-[10px] text-zinc-300 bg-[#0f0f0f] border-[#1f1f1f]">{s}</div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-zinc-600 w-20">Workers</span>
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            {["Worker Pool A", "Worker Pool B"].map((w) => (
                              <div key={w} className="px-2 py-1.5 rounded border text-center text-[10px] text-zinc-300 bg-[#0f0f0f] border-[#1f1f1f]">{w}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      // HADR — two regions
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Region A */}
                          <div className="p-3 rounded-lg border" style={{ background: `${t.color}10`, borderColor: `${t.color}40` }}>
                            <p className="text-[10px] font-mono mb-2 text-center" style={{ color: t.color }}>Primary Region (Mumbai)</p>
                            <div className="space-y-1.5">
                              {["LB + App x3", "Postgres HA", "Redis Cluster", "Workers"].map((c) => (
                                <div key={c} className="px-2 py-1 rounded bg-[#0f0f0f] border border-[#1f1f1f] text-[9px] text-zinc-300 text-center">{c}</div>
                              ))}
                            </div>
                          </div>
                          {/* Region B */}
                          <div className="p-3 rounded-lg border bg-[#0f0f0f] border-[#1f1f1f]">
                            <p className="text-[10px] font-mono mb-2 text-center text-zinc-400">DR Region (Hyderabad)</p>
                            <div className="space-y-1.5">
                              {["LB + App x2 (warm)", "Postgres replica", "Redis (async)", "Workers (idle)"].map((c) => (
                                <div key={c} className="px-2 py-1 rounded bg-[#080808] border border-[#1f1f1f] text-[9px] text-zinc-500 text-center">{c}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.color }} />
                          <p className="text-[10px] text-zinc-400 font-mono">↔ Async replication · Global DNS failover · Encrypted vault</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1f1f1f]">
                          {[
                            { label: "Failover", value: "Automatic" },
                            { label: "Drill", value: "Quarterly" },
                            { label: "Backup", value: "Multi-region" },
                          ].map((m) => (
                            <div key={m.label} className="text-center">
                              <p className="text-[9px] text-zinc-600 uppercase">{m.label}</p>
                              <p className="text-[10px] font-mono" style={{ color: t.color }}>{m.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIZING */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Sizing Reference</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Hardware by scale.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Reference sizing for typical paper-mill deployments. Solutions Engineering tailors per actual workload.
          </p>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#080808] border-b border-[#1f1f1f]">
                <tr>
                  {["Tier", "vCPU", "RAM", "Storage", "Database", "Cache", "Network"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZING.map((row, i) => (
                  <motion.tr key={row.tier}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-5 py-3 text-white font-semibold">{row.tier}</td>
                    <td className="px-5 py-3 font-mono text-amber-400">{row.cpu}</td>
                    <td className="px-5 py-3 font-mono text-zinc-300">{row.ram}</td>
                    <td className="px-5 py-3 font-mono text-zinc-300">{row.storage}</td>
                    <td className="px-5 py-3 font-mono text-zinc-400 text-xs">{row.db}</td>
                    <td className="px-5 py-3 font-mono text-zinc-400 text-xs">{row.cache}</td>
                    <td className="px-5 py-3 font-mono text-zinc-400 text-xs">{row.network}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SOFTWARE STACK */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Software Stack</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Open, standard, supported.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Built on proven open-source components. No vendor lock-in on the infrastructure layer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOFTWARE_STACK.map((s, i) => (
              <motion.div key={s.layer}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 hover:border-amber-500/20 transition-colors">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-500 mb-3">{s.layer}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-xs text-zinc-300 flex items-start gap-1.5">
                      <span className="text-amber-500/60">·</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTENSIONS */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Extensions & Integrations</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Plugs into your ecosystem.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-14">
            IoT, GPS, VPN, SSO, MDM, ERP, statutory portals — Papyrus BPApp connects to what you already run.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXTENSIONS.map((ext, i) => {
              const Icon = ext.icon;
              return (
                <motion.div key={ext.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 hover:border-amber-500/25 transition-colors">
                  <div className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4"
                    style={{ background: `${ext.color}12`, borderColor: `${ext.color}30` }}>
                    <Icon size={18} style={{ color: ext.color }} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{ext.title}</h3>
                  <p className="text-zinc-400 text-[13px] leading-relaxed mb-4">{ext.desc}</p>
                  <ul className="space-y-1.5">
                    {ext.items.map((item) => (
                      <li key={item} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span style={{ color: ext.color }}>·</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-24 border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Security & Compliance</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Encrypted. Audited. Compliant.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Security built into every layer. Audit-ready evidence trails for SOC 2, ISO 27001, GDPR, and Indian regulatory requirements.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SECURITY.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                  className="bg-[#0f0f0f] border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                  <Icon size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-zinc-300 leading-snug font-semibold">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSTALLATION TIMELINE */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">Installation Plan</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">From kickoff to go-live in 2 weeks.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mb-12">
            Standard timeline for cloud or on-prem deployment. Solutions engineering tailors based on integration scope.
          </p>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent hidden md:block" />
            <div className="space-y-5">
              {INSTALL_STEPS.map((step, i) => (
                <motion.div key={step.phase}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0f0f0f] border-2 border-amber-500/50 flex items-center justify-center font-mono text-[10px] font-bold text-amber-400 text-center">
                    {step.phase.replace("Day ", "D").replace("Week ", "W")}
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-amber-400 font-mono">{step.phase}</span>
                      <span className="text-zinc-700">·</span>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {step.items.map((item) => (
                        <li key={item} className="text-xs text-zinc-400 flex items-start gap-1.5">
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

      <CTABanner />
    </div>
  );
}
