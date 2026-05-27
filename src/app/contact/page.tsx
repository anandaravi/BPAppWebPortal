"use client";

import { useState, useId, cloneElement, isValidElement, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";

type Status = "idle" | "loading" | "success" | "error";
type Step = 1 | 2;

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<Step>(1);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const toggleInterest = (slug: string) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const toggleAllInGroup = (slugs: string[], allSelected: boolean) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (allSelected) slugs.forEach((s) => next.delete(s));
      else slugs.forEach((s) => next.add(s));
      return next;
    });
  };

  const goStep2 = async () => {
    const ok = await trigger(["name", "company", "email", "phone"]);
    if (ok) setStep(2);
  };

  const submit = async (data: ContactFormData, minimal: boolean) => {
    setStatus("loading");
    try {
      const interestNames = minimal
        ? []
        : Array.from(interests).map((slug) => ALL_MODULES[slug]?.name || slug);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interests: interestNames }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const onSubmitFull = (data: ContactFormData) => submit(data, false);
  const onSubmitQuick = handleSubmit((data) => submit(data, true));

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Get Started
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">Request a Demo</h1>
          <p className="text-gray-400 text-lg">
            We&apos;ll walk you through the modules relevant to your mill.
            Response within 1 business day.
          </p>
        </motion.div>

        {status !== "success" && (
          <StepIndicator step={step} />
        )}

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-amber-500/20 rounded-2xl p-10 text-center"
          >
            <CheckCircle2 size={40} className="text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Thank you!</h2>
            <p className="text-gray-400">
              We&apos;ll reach out within 1 business day to schedule your demo.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmitFull)}
            className="bg-surface border border-border-dim rounded-2xl p-8 space-y-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none"
              {...register("honeypot")}
            />

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" error={errors.name?.message}>
                      <input
                        type="text"
                        placeholder="Ravi Sharma"
                        autoComplete="name"
                        className={inputCls(!!errors.name)}
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Company Name" error={errors.company?.message}>
                      <input
                        type="text"
                        placeholder="ABC Paper Mills Pvt Ltd"
                        autoComplete="organization"
                        className={inputCls(!!errors.company)}
                        {...register("company")}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        type="email"
                        placeholder="you@yourmill.com"
                        autoComplete="email"
                        className={inputCls(!!errors.email)}
                        {...register("email")}
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        className={inputCls(false)}
                        {...register("phone")}
                      />
                    </Field>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={goStep2}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-amber-500/40 hover:border-amber-500 hover:bg-amber-500/5 text-foreground text-sm font-semibold transition-colors"
                    >
                      Continue — add details
                      <ArrowRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={onSubmitQuick}
                      disabled={status === "loading"}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black text-sm font-bold transition-colors"
                    >
                      {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                      {status === "loading" ? "Sending..." : "Submit now"}
                    </button>
                  </div>
                  <p className="text-xs text-text-3 text-center">
                    Submit now — we follow up within 1 business day. Or add details for a tailored demo.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your Role (optional)" error={errors.role?.message}>
                      <select className={inputCls(!!errors.role)} {...register("role")}>
                        <option value="">Select role</option>
                        <option value="owner">Owner / Director</option>
                        <option value="gm">General Manager</option>
                        <option value="finance">Finance Controller</option>
                        <option value="it">IT Manager</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label="Company Size (optional)">
                      <select className={inputCls(false)} {...register("companySize")}>
                        <option value="">Select size</option>
                        <option value="1-50">1 – 50 employees</option>
                        <option value="51-200">51 – 200 employees</option>
                        <option value="201-500">201 – 500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </Field>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <label className="text-sm font-medium text-gray-300">
                        Modules you&apos;re interested in{" "}
                        <span className="text-text-3 font-normal">(optional)</span>
                      </label>
                      {interests.size > 0 && (
                        <span className="text-xs text-amber-400 font-mono">
                          {interests.size} selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-3 mb-1">
                      Tap a group to expand. Use &quot;All&quot; to select the whole group.
                    </p>
                    <div className="space-y-2">
                      {MODULE_GROUPS.map((group) => {
                        const groupSlugs = group.slugs.filter((s) => ALL_MODULES[s]);
                        const selectedCount = groupSlugs.filter((s) => interests.has(s)).length;
                        const allSelected = selectedCount === groupSlugs.length && groupSlugs.length > 0;
                        const expanded = expandedGroups.has(group.title);
                        return (
                          <div
                            key={group.title}
                            className="border border-border rounded-lg overflow-hidden bg-background"
                          >
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => toggleGroup(group.title)}
                                className="flex-1 flex items-center justify-between px-4 py-3 text-left hover:bg-surface transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <ChevronDown
                                    size={14}
                                    className={cn(
                                      "text-text-3 transition-transform",
                                      expanded && "rotate-180"
                                    )}
                                  />
                                  <span className="text-sm font-medium text-foreground">
                                    {group.title}
                                  </span>
                                  <span className="text-xs text-text-3 font-mono">
                                    {groupSlugs.length}
                                  </span>
                                </div>
                                {selectedCount > 0 && (
                                  <span className="text-xs text-amber-400 font-mono">
                                    {selectedCount} selected
                                  </span>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleAllInGroup(groupSlugs, allSelected)}
                                className="px-3 py-3 text-xs text-text-2 hover:text-amber-400 border-l border-border transition-colors"
                                title={allSelected ? "Deselect all" : "Select all"}
                              >
                                {allSelected ? "Clear" : "All"}
                              </button>
                            </div>
                            {expanded && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-3 pt-1 border-t border-border-dim bg-background">
                                {groupSlugs.map((slug) => {
                                  const m = ALL_MODULES[slug];
                                  const checked = interests.has(slug);
                                  return (
                                    <label
                                      key={slug}
                                      className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-surface cursor-pointer text-sm transition-colors"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleInterest(slug)}
                                        className="w-4 h-4 rounded border-border-light bg-background text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0 cursor-pointer"
                                      />
                                      <span
                                        className={cn(
                                          "transition-colors",
                                          checked ? "text-foreground" : "text-text-2"
                                        )}
                                      >
                                        {m.name}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Tell us about your specific requirements (optional)">
                    <textarea
                      rows={5}
                      placeholder="Pain points, mill size, integration needs, timeline, anything specific..."
                      className={cn(inputCls(false), "resize-none")}
                      {...register("message")}
                    />
                  </Field>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-border-light hover:border-amber-500/40 text-text-2 hover:text-foreground text-sm font-medium transition-colors"
                    >
                      <ArrowLeft size={14} />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm transition-colors"
                    >
                      {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                      {status === "loading" ? "Sending..." : "Request Demo"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <AlertCircle size={14} />
                Something went wrong. Email us at{" "}
                <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
              </div>
            )}
          </motion.form>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <Dot active={step >= 1} label="1" />
      <span className="w-10 h-px bg-border" />
      <Dot active={step >= 2} label="2" />
      <span className="text-xs text-text-3 ml-2">
        {step === 1 ? "Basics" : "Tailor your demo"}
      </span>
    </div>
  );
}

function Dot({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
        active ? "bg-amber-500 text-black" : "bg-surface border border-border text-text-3"
      )}
    >
      {label}
    </span>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-text-4 outline-none transition-colors",
    hasError
      ? "border-red-500/50 focus:border-red-500"
      : "border-border focus:border-amber-500/50"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const enhanced = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })
    : children;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
      {enhanced}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
