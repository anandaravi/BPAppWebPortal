"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

type Answer = { value: string; label: string; hint?: string };
type Question = { id: string; prompt: string; options: Answer[] };

const QUESTIONS: Question[] = [
  {
    id: "size",
    prompt: "How big is your mill?",
    options: [
      { value: "small", label: "Under 50 TPD", hint: "Single machine, lean team" },
      { value: "mid", label: "50–150 TPD", hint: "2–3 machines" },
      { value: "large", label: "150+ TPD", hint: "Multi-plant, multi-grade" },
    ],
  },
  {
    id: "type",
    prompt: "What grade do you make?",
    options: [
      { value: "kraft", label: "Kraft / Packaging" },
      { value: "writing", label: "Writing & Printing" },
      { value: "duplex", label: "Duplex / Board" },
      { value: "tissue", label: "Tissue" },
      { value: "newsprint", label: "Newsprint" },
      { value: "specialty", label: "Specialty" },
    ],
  },
  {
    id: "pain",
    prompt: "Biggest pain right now?",
    options: [
      { value: "trim", label: "Trim / deckle waste", hint: "Slitting losses, paper saved" },
      { value: "gst", label: "GST + compliance burden", hint: "Filings, ITC, notices" },
      { value: "planning", label: "Production planning chaos", hint: "OEE, schedule, downtime" },
      { value: "visibility", label: "No real-time visibility", hint: "Dispatch, finance, stock" },
      { value: "people", label: "HR / shift / payroll mess" },
    ],
  },
];

type Answers = Record<string, string>;

function recommend(a: Answers): { href: string; label: string; reason: string } {
  if (a.pain === "trim") return { href: "/product/deckle", label: "Deckle Optimizer", reason: "3-tier optimization typically recovers 3–6% of paper. Start here." };
  if (a.pain === "gst") return { href: "/product/finance", label: "Finance & GST", reason: "GSTR-1/3B auto-filing, ITC ledger, RCM/TCS/TDS — built-in." };
  if (a.pain === "planning") return { href: "/product/production", label: "Production Management", reason: "Capacity planning, OEE, downtime root-cause." };
  if (a.pain === "visibility") return { href: "/product/ai", label: "AI & Analytics", reason: "Ask anything across sales, production, finance." };
  if (a.pain === "people") return { href: "/product/hr", label: "HR & Payroll", reason: "Shift, attendance, PF/ESI/PT, ESS/MSS." };
  return { href: "/product", label: "Product Overview", reason: "Explore all 44 modules." };
}

const SIZE_LABEL: Record<string, string> = { small: "Under 50 TPD", mid: "50–150 TPD", large: "150+ TPD" };
const TYPE_LABEL: Record<string, string> = {
  kraft: "Kraft", writing: "Writing & Printing", duplex: "Duplex / Board",
  tissue: "Tissue", newsprint: "Newsprint", specialty: "Specialty",
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];

  const pick = (val: string) => {
    setAnswers((a) => ({ ...a, [q.id]: val }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const rec = done ? recommend(answers) : null;

  return (
    <section className="relative py-20 border-y border-border bg-gradient-to-b from-background via-background to-amber-500/[0.02]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="inline-flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={11} />
            60-second match
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">
            Which module fits your mill?
          </h2>
          <p className="text-text-2 max-w-xl mx-auto">
            Answer 3 questions → we&apos;ll point you at the right starting module.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-amber-500" : i === step ? "bg-amber-500/40" : "bg-surface-3"
                }`}
              />
            ))}
            <span className="text-xs text-text-3 font-mono ml-2">
              {Math.min(step + 1, QUESTIONS.length)} / {QUESTIONS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-5">
                  {q.prompt}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => pick(opt.value)}
                      className="group text-left p-4 rounded-xl border border-border bg-background hover:border-amber-500/40 hover:bg-amber-500/5 transition-colors"
                    >
                      <p className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors">
                        {opt.label}
                      </p>
                      {opt.hint && (
                        <p className="text-xs text-text-3 mt-1">{opt.hint}</p>
                      )}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs text-text-3 hover:text-amber-400 transition-colors"
                  >
                    <ArrowLeft size={12} />
                    Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle2 size={22} className="text-emerald-400" />
                  <p className="text-sm text-text-3">
                    For a{" "}
                    <span className="text-foreground font-semibold">
                      {SIZE_LABEL[answers.size]}
                    </span>{" "}
                    <span className="text-foreground font-semibold">
                      {TYPE_LABEL[answers.type]}
                    </span>{" "}
                    mill →
                  </p>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Start with <span className="amber-text">{rec!.label}</span>
                </h3>
                <p className="text-text-2 mb-6 leading-relaxed">{rec!.reason}</p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href={rec!.href}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
                  >
                    Explore {rec!.label}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-border-light text-text-2 hover:text-foreground hover:border-amber-500/40 text-sm font-medium transition-colors"
                  >
                    Talk to us
                  </Link>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-text-3 hover:text-amber-400 text-sm transition-colors"
                  >
                    Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
