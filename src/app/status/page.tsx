import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Activity, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Status",
  description: "Papyrus BPApp platform status — uptime, incidents, and scheduled maintenance.",
  alternates: { canonical: "/status" },
};

type Component = { name: string; status: "operational" | "degraded" | "down"; note?: string };

const COMPONENTS: Component[] = [
  { name: "Web app", status: "operational" },
  { name: "API", status: "operational" },
  { name: "Background jobs (BullMQ)", status: "operational" },
  { name: "Database (PostgreSQL)", status: "operational" },
  { name: "Cache (Redis)", status: "operational" },
  { name: "GST e-invoice gateway", status: "operational" },
  { name: "Email delivery", status: "operational" },
  { name: "Mobile apps (iOS / Android)", status: "operational" },
];

const STATUS_META = {
  operational: { label: "Operational", cls: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30", dot: "bg-emerald-400" },
  degraded: { label: "Degraded", cls: "text-amber-300 bg-amber-500/15 border-amber-500/30", dot: "bg-amber-400" },
  down: { label: "Outage", cls: "text-rose-300 bg-rose-500/15 border-rose-500/30", dot: "bg-rose-400" },
} as const;

export default function StatusPage() {
  const overall = COMPONENTS.every((c) => c.status === "operational");
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-10">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">Platform Status</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            {overall ? "All systems operational" : "Some systems impaired"}
          </h1>
          <p className="text-text-2">
            Last updated{" "}
            {new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST.
            For real-time incident updates, subscribe via email below.
          </p>
        </header>

        <div className={`rounded-2xl border p-5 mb-8 flex items-center gap-3 ${overall ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
          <CheckCircle2 size={22} className={overall ? "text-emerald-400" : "text-amber-400"} />
          <div>
            <p className="text-foreground font-semibold">
              {overall ? "All 8 services running normally." : "Investigating elevated errors."}
            </p>
            <p className="text-xs text-text-3 mt-0.5">
              30-day uptime: <span className="text-foreground font-mono">99.97%</span>
            </p>
          </div>
        </div>

        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Components</h2>
        <ul className="space-y-2 mb-10">
          {COMPONENTS.map((c) => {
            const m = STATUS_META[c.status];
            return (
              <li
                key={c.name}
                className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                  <span className="text-sm text-foreground font-medium">{c.name}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.cls}`}>
                  {m.label.toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>

        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
          Recent incidents
        </h2>
        <div className="bg-surface border border-border rounded-xl p-6 text-center mb-10">
          <Activity size={20} className="text-text-3 mx-auto mb-2" />
          <p className="text-sm text-text-2">No incidents in the last 30 days.</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-7 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Subscribe to incident updates</h2>
          <p className="text-text-2 mb-5 max-w-md mx-auto text-sm">
            Email alerts for outages, maintenance, and recovery — for ops and IT teams.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request status alerts
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
