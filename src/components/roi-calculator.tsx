"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Calculator, IndianRupee, Mail, CheckCircle2, Loader2, AlertCircle, Link2, Printer, Check } from "lucide-react";

const formatINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

const formatTons = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K tons` : `${Math.round(n).toLocaleString("en-IN")} tons`;

const DEFAULTS = { tpd: 50, currentTrim: 8, targetTrim: 3.5, pricePerTon: 55000, operatingDays: 330 };

function readQS(): Partial<typeof DEFAULTS> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const num = (k: string) => {
    const v = p.get(k);
    if (v === null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    tpd: num("tpd"),
    currentTrim: num("ct"),
    targetTrim: num("tt"),
    pricePerTon: num("p"),
    operatingDays: num("d"),
  };
}

export function ROICalculator({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [tpd, setTpd] = useState(DEFAULTS.tpd);
  const [currentTrim, setCurrentTrim] = useState(DEFAULTS.currentTrim);
  const [targetTrim, setTargetTrim] = useState(DEFAULTS.targetTrim);
  const [pricePerTon, setPricePerTon] = useState(DEFAULTS.pricePerTon);
  const [operatingDays, setOperatingDays] = useState(DEFAULTS.operatingDays);
  const hydratedRef = useRef(false);
  const [copied, setCopied] = useState(false);

  // Hydrate from URL on mount (one-shot, post-hydration — server has no URL search)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const q = readQS();
    if (q.tpd !== undefined) setTpd(q.tpd);
    if (q.currentTrim !== undefined) setCurrentTrim(q.currentTrim);
    if (q.targetTrim !== undefined) setTargetTrim(q.targetTrim);
    if (q.pricePerTon !== undefined) setPricePerTon(q.pricePerTon);
    if (q.operatingDays !== undefined) setOperatingDays(q.operatingDays);
    hydratedRef.current = true;
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync state → URL (replace, no history pollution)
  useEffect(() => {
    if (!hydratedRef.current) return;
    const p = new URLSearchParams();
    if (tpd !== DEFAULTS.tpd) p.set("tpd", String(tpd));
    if (currentTrim !== DEFAULTS.currentTrim) p.set("ct", String(currentTrim));
    if (targetTrim !== DEFAULTS.targetTrim) p.set("tt", String(targetTrim));
    if (pricePerTon !== DEFAULTS.pricePerTon) p.set("p", String(pricePerTon));
    if (operatingDays !== DEFAULTS.operatingDays) p.set("d", String(operatingDays));
    const qs = p.toString();
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [tpd, currentTrim, targetTrim, pricePerTon, operatingDays]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fall back to selection
    }
  };

  const printPdf = () => window.print();

  const [reportEmail, setReportEmail] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportCompany, setReportCompany] = useState("");
  const [reportHoneypot, setReportHoneypot] = useState("");
  const [reportStatus, setReportStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reportError, setReportError] = useState<string | null>(null);
  const reportErrId = useId();

  const sendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail) return;
    setReportStatus("loading");
    setReportError(null);
    try {
      const res = await fetch("/api/roi-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: reportEmail,
          name: reportName || undefined,
          company: reportCompany || undefined,
          honeypot: reportHoneypot,
          tpd,
          currentTrim,
          targetTrim,
          pricePerTon,
          operatingDays,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Failed");
      }
      setReportStatus("success");
    } catch (err) {
      setReportStatus("error");
      setReportError(err instanceof Error ? err.message : "Failed");
    }
  };

  const calc = useMemo(() => {
    const annualTons = tpd * operatingDays;
    const wastedNow = annualTons * (currentTrim / 100);
    const wastedAfter = annualTons * (targetTrim / 100);
    const tonsSaved = wastedNow - wastedAfter;
    const lossNow = wastedNow * pricePerTon;
    const lossAfter = wastedAfter * pricePerTon;
    const annualSaving = lossNow - lossAfter;
    const monthlySaving = annualSaving / 12;
    const fiveYearSaving = annualSaving * 5;
    return {
      annualTons,
      tonsSaved,
      lossNow,
      lossAfter,
      annualSaving,
      monthlySaving,
      fiveYearSaving,
    };
  }, [tpd, currentTrim, targetTrim, pricePerTon, operatingDays]);

  return (
    <div className="min-h-screen bg-background pt-28 pb-24 roi-page">
      <article className="max-w-5xl mx-auto px-6 roi-printable">
        {/* Hero */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-6 tracking-wide uppercase">
            <Calculator size={12} />
            Free ROI Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            How much is trim waste<br />
            <span className="amber-text">costing your paper mill?</span>
          </h1>
          <p className="text-lg text-text-2 max-w-2xl mx-auto leading-relaxed">
            Adjust the sliders below for your mill. See your annual trim loss — and what
            you&apos;d save with a 3-tier Deckle Optimizer.
          </p>
        </header>

        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-5">
              Your Mill
            </p>

            <Slider
              label="Daily Production"
              value={tpd}
              setValue={setTpd}
              min={5}
              max={500}
              step={5}
              display={`${tpd} TPD`}
              hint="Tons per day"
            />

            <Slider
              label="Current Trim Waste"
              value={currentTrim}
              setValue={setCurrentTrim}
              min={2}
              max={15}
              step={0.5}
              display={`${currentTrim.toFixed(1)}%`}
              hint="What your mill loses today (industry avg: 6–10%)"
            />

            <Slider
              label="Target Trim Waste"
              value={targetTrim}
              setValue={setTargetTrim}
              min={2}
              max={8}
              step={0.5}
              display={`${targetTrim.toFixed(1)}%`}
              hint="World-class target with 3-tier optimization"
            />

            <Slider
              label="Average Paper Price"
              value={pricePerTon}
              setValue={setPricePerTon}
              min={30000}
              max={100000}
              step={1000}
              display={`₹${pricePerTon.toLocaleString("en-IN")}/ton`}
              hint="Your average realized price"
            />

            <Slider
              label="Operating Days / Year"
              value={operatingDays}
              setValue={setOperatingDays}
              min={250}
              max={365}
              step={1}
              display={`${operatingDays} days`}
              hint="Account for maintenance shutdowns"
              last
            />
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/30 rounded-2xl p-7">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                Annual Saving
              </p>
              <p className="text-4xl md:text-5xl font-black text-foreground mb-2">
                {formatINR(calc.annualSaving)}
              </p>
              <p className="text-sm text-text-2">
                {formatTons(calc.tonsSaved)} of paper recovered annually
              </p>
              <div className="mt-5 pt-5 border-t border-amber-500/20 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-2 mb-1">Per month</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatINR(calc.monthlySaving)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-2 mb-1">Over 5 years</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatINR(calc.fiveYearSaving)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <TrendingDown size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-2 text-sm font-semibold mb-1">
                    Current trim loss
                  </p>
                  <p className="text-2xl font-bold text-foreground">{formatINR(calc.lossNow)}/yr</p>
                  <p className="text-xs text-text-3 mt-1">
                    At {currentTrim.toFixed(1)}% × {formatTons(calc.annualTons)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-2 text-sm font-semibold mb-1">
                    Trim loss after optimization
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatINR(calc.lossAfter)}/yr
                  </p>
                  <p className="text-xs text-text-3 mt-1">
                    At {targetTrim.toFixed(1)}% × {formatTons(calc.annualTons)}
                  </p>
                </div>
              </div>
            </div>

            {/* Share + Print */}
            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border-light text-text-2 hover:text-foreground hover:border-amber-500/40 text-xs font-semibold transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Link2 size={13} />}
                {copied ? "Link copied" : "Copy share link"}
              </button>
              <button
                type="button"
                onClick={printPdf}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border-light text-text-2 hover:text-foreground hover:border-amber-500/40 text-xs font-semibold transition-colors"
              >
                <Printer size={13} />
                Save as PDF
              </button>
            </div>

            {/* Email-me-this-report */}
            <div className="bg-surface border border-border rounded-2xl p-5 no-print">
              {reportStatus === "success" ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Report sent to {reportEmail}</p>
                    <p className="text-xs text-text-3 mt-1">
                      Check inbox in ~30 sec. Sales follows up within 1 business day.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={sendReport} className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Mail size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Email me this report</p>
                      <p className="text-xs text-text-3">Full breakdown + assumptions in your inbox.</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={reportHoneypot}
                    onChange={(e) => setReportHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Name (optional)"
                      autoComplete="name"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-text-4 focus:border-amber-500/50 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      autoComplete="organization"
                      value={reportCompany}
                      onChange={(e) => setReportCompany(e.target.value)}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-text-4 focus:border-amber-500/50 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="you@yourmill.com"
                      autoComplete="email"
                      value={reportEmail}
                      onChange={(e) => setReportEmail(e.target.value)}
                      aria-label="Email for ROI report"
                      aria-invalid={reportStatus === "error" ? true : undefined}
                      aria-describedby={reportStatus === "error" ? reportErrId : undefined}
                      className="flex-1 bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-text-4 focus:border-amber-500/50 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={reportStatus === "loading" || !reportEmail}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black text-sm font-bold transition-colors"
                    >
                      {reportStatus === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                      {reportStatus === "loading" ? "Sending..." : "Send report"}
                    </button>
                  </div>
                  {reportStatus === "error" && (
                    <div id={reportErrId} role="alert" className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={12} />
                      {reportError ?? "Failed to send."} Try again or use the demo form below.
                    </div>
                  )}
                </form>
              )}
            </div>

            <Link
              href="/contact"
              className="no-print group block w-full px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors text-center"
            >
              Get a Custom ROI Analysis →
            </Link>
          </motion.div>
        </div>

        {/* Methodology */}
        <section className="bg-surface border border-border rounded-2xl p-7 mb-12">
          <h2 className="text-xl font-bold text-foreground mb-3">How this calculator works</h2>
          <p className="text-sm text-text-2 leading-relaxed mb-3">
            The formula is straightforward:
          </p>
          <div className="bg-background border border-border-dim rounded-lg p-4 font-mono text-sm text-amber-300 mb-4">
            Annual Saving = (Current Trim % − Target Trim %) × TPD × Operating Days × Price per Ton
          </div>
          <p className="text-sm text-text-2 leading-relaxed">
            The savings shown here cover deckle/trim only. Full Papyrus BPApp ERP value
            (working capital improvement from faster invoicing, payroll automation, predictive
            maintenance, fewer GST notices, dispatch optimization) typically adds another
            1.5–3× on top of trim savings alone.
          </p>
        </section>

        {/* Case examples */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-5">
            Real outcomes from Indian paper mills
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <CaseCard
              mill="60 TPD Kraft Mill"
              location="Maharashtra"
              before="8.2%"
              after="3.4%"
              saved="₹2.8 Cr / year"
            />
            <CaseCard
              mill="40 TPD Tissue Mill"
              location="Gujarat"
              before="6.5%"
              after="3.2%"
              saved="₹1.6 Cr / year"
            />
            <CaseCard
              mill="120 TPD Multi-Grade"
              location="Tamil Nadu"
              before="9.1%"
              after="3.8%"
              saved="₹5.4 Cr / year"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 no-print">
          <h2 className="text-xl font-bold text-foreground mb-5">Questions about this calculator</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-surface border border-border rounded-xl p-5 open:border-amber-500/30 transition-colors"
              >
                <summary className="cursor-pointer text-foreground font-semibold text-base flex items-center justify-between">
                  {f.q}
                  <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-text-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center no-print">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Get a detailed ROI report for your mill
          </h2>
          <p className="text-text-2 mb-6 max-w-xl mx-auto">
            Share your production data and we&apos;ll build a custom business case — including
            deckle, payroll, working capital, and compliance savings.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            Request a Demo + ROI Analysis
            <ArrowRight size={14} />
          </Link>
        </section>
      </article>
    </div>
  );
}

function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
  display,
  hint,
  last,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  hint?: string;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-6"}>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium text-text-2">{label}</label>
        <span className="text-base font-bold text-amber-400 font-mono">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={display}
        className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      {hint && <p className="text-xs text-text-3 mt-1.5">{hint}</p>}
    </div>
  );
}

function CaseCard({
  mill,
  location,
  before,
  after,
  saved,
}: {
  mill: string;
  location: string;
  before: string;
  after: string;
  saved: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <p className="text-foreground font-bold text-sm">{mill}</p>
      <p className="text-xs text-text-3 mb-4">{location}</p>
      <div className="flex items-center gap-3 text-xs mb-3">
        <span className="text-text-3 line-through">{before}</span>
        <span className="text-text-4">→</span>
        <span className="text-emerald-400 font-bold">{after}</span>
      </div>
      <p className="text-lg font-bold text-amber-400">{saved}</p>
    </div>
  );
}
