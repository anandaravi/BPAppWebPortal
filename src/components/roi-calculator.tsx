"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Calculator, IndianRupee } from "lucide-react";

const formatINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

const formatTons = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K tons` : `${Math.round(n).toLocaleString("en-IN")} tons`;

export function ROICalculator({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [tpd, setTpd] = useState(50);
  const [currentTrim, setCurrentTrim] = useState(8);
  const [targetTrim, setTargetTrim] = useState(3.5);
  const [pricePerTon, setPricePerTon] = useState(55000);
  const [operatingDays, setOperatingDays] = useState(330);

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
    <div className="min-h-screen bg-[#080808] pt-28 pb-24">
      <article className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-6 tracking-wide uppercase">
            <Calculator size={12} />
            Free ROI Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            How much is trim waste<br />
            <span className="amber-text">costing your paper mill?</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Adjust the sliders below for your mill. See your annual trim loss — and what
            you'd save with a 3-tier Deckle Optimizer.
          </p>
        </header>

        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-7"
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
              <p className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatINR(calc.annualSaving)}
              </p>
              <p className="text-sm text-zinc-300">
                {formatTons(calc.tonsSaved)} of paper recovered annually
              </p>
              <div className="mt-5 pt-5 border-t border-amber-500/20 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Per month</p>
                  <p className="text-xl font-bold text-white">
                    {formatINR(calc.monthlySaving)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Over 5 years</p>
                  <p className="text-xl font-bold text-white">
                    {formatINR(calc.fiveYearSaving)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <TrendingDown size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-300 text-sm font-semibold mb-1">
                    Current trim loss
                  </p>
                  <p className="text-2xl font-bold text-white">{formatINR(calc.lossNow)}/yr</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    At {currentTrim.toFixed(1)}% × {formatTons(calc.annualTons)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-300 text-sm font-semibold mb-1">
                    Trim loss after optimization
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {formatINR(calc.lossAfter)}/yr
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    At {targetTrim.toFixed(1)}% × {formatTons(calc.annualTons)}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="group block w-full px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors text-center"
            >
              Get a Custom ROI Analysis →
            </Link>
          </motion.div>
        </div>

        {/* Methodology */}
        <section className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-7 mb-12">
          <h2 className="text-xl font-bold text-white mb-3">How this calculator works</h2>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">
            The formula is straightforward:
          </p>
          <div className="bg-[#080808] border border-[#1a1a1a] rounded-lg p-4 font-mono text-sm text-amber-300 mb-4">
            Annual Saving = (Current Trim % − Target Trim %) × TPD × Operating Days × Price per Ton
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The savings shown here cover deckle/trim only. Full Papyrus BPApp ERP value
            (working capital improvement from faster invoicing, payroll automation, predictive
            maintenance, fewer GST notices, dispatch optimization) typically adds another
            1.5–3× on top of trim savings alone.
          </p>
        </section>

        {/* Case examples */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5">
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
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5">Questions about this calculator</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-[#0f0f0f] border border-[#222] rounded-xl p-5 open:border-amber-500/30 transition-colors"
              >
                <summary className="cursor-pointer text-white font-semibold text-base flex items-center justify-between">
                  {f.q}
                  <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Get a detailed ROI report for your mill
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Share your production data and we'll build a custom business case — including
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
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        <span className="text-base font-bold text-amber-400 font-mono">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      {hint && <p className="text-xs text-zinc-500 mt-1.5">{hint}</p>}
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
    <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-5">
      <p className="text-white font-bold text-sm">{mill}</p>
      <p className="text-xs text-zinc-500 mb-4">{location}</p>
      <div className="flex items-center gap-3 text-xs mb-3">
        <span className="text-zinc-500 line-through">{before}</span>
        <span className="text-zinc-600">→</span>
        <span className="text-emerald-400 font-bold">{after}</span>
      </div>
      <p className="text-lg font-bold text-amber-400">{saved}</p>
    </div>
  );
}
