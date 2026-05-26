"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
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

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const interestNames = Array.from(interests)
        .map((slug) => ALL_MODULES[slug]?.name || slug);
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

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Get Started
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Request a Demo</h1>
          <p className="text-gray-400 text-lg">
            We&apos;ll walk you through the modules relevant to your mill.
            Response within 1 business day.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f0f0f] border border-amber-500/20 rounded-2xl p-10 text-center"
          >
            <CheckCircle2 size={40} className="text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Thank you!</h2>
            <p className="text-gray-400">
              We&apos;ll reach out within 1 business day to schedule your demo.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-8 space-y-5"
          >
            {/* Honeypot — hidden from humans */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none"
              {...register("honeypot")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" error={errors.name?.message}>
                <input
                  type="text"
                  placeholder="Ravi Sharma"
                  className={inputCls(!!errors.name)}
                  {...register("name")}
                />
              </Field>
              <Field label="Company Name" error={errors.company?.message}>
                <input
                  type="text"
                  placeholder="ABC Paper Mills Pvt Ltd"
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
                  className={inputCls(!!errors.email)}
                  {...register("email")}
                />
              </Field>
              <Field label="Phone (optional)">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputCls(false)}
                  {...register("phone")}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Your Role" error={errors.role?.message}>
                <select className={inputCls(!!errors.role)} {...register("role")}>
                  <option value="">Select role</option>
                  <option value="owner">Owner / Director</option>
                  <option value="gm">General Manager</option>
                  <option value="finance">Finance Controller</option>
                  <option value="it">IT Manager</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Company Size">
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
                  <span className="text-zinc-500 font-normal">(optional)</span>
                </label>
                {interests.size > 0 && (
                  <span className="text-xs text-amber-400 font-mono">
                    {interests.size} selected
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mb-1">
                Tap a group to expand. Select all by tapping the group header twice.
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
                      className="border border-[#222] rounded-lg overflow-hidden bg-[#080808]"
                    >
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.title)}
                          className="flex-1 flex items-center justify-between px-4 py-3 text-left hover:bg-[#0f0f0f] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <ChevronDown
                              size={14}
                              className={cn(
                                "text-zinc-500 transition-transform",
                                expanded && "rotate-180"
                              )}
                            />
                            <span className="text-sm font-medium text-white">
                              {group.title}
                            </span>
                            <span className="text-xs text-zinc-500 font-mono">
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
                          className="px-3 py-3 text-xs text-zinc-400 hover:text-amber-400 border-l border-[#222] transition-colors"
                          title={allSelected ? "Deselect all" : "Select all"}
                        >
                          {allSelected ? "Clear" : "All"}
                        </button>
                      </div>
                      {expanded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-3 pt-1 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                          {groupSlugs.map((slug) => {
                            const m = ALL_MODULES[slug];
                            const checked = interests.has(slug);
                            return (
                              <label
                                key={slug}
                                className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-[#111] cursor-pointer text-sm transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleInterest(slug)}
                                  className="w-4 h-4 rounded border-[#333] bg-[#080808] text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0 cursor-pointer"
                                />
                                <span
                                  className={cn(
                                    "transition-colors",
                                    checked ? "text-white" : "text-zinc-400"
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
                placeholder="Pain points, mill size, integration needs, timeline, anything specific you want to see in the demo..."
                className={cn(inputCls(false), "resize-none")}
                {...register("message")}
              />
            </Field>

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <AlertCircle size={14} />
                Something went wrong. Email us at{" "}
                <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm transition-colors"
            >
              {status === "loading" && <Loader2 size={16} className="animate-spin" />}
              {status === "loading" ? "Sending..." : "Request Demo"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full bg-[#080808] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors",
    hasError
      ? "border-red-500/50 focus:border-red-500"
      : "border-[#222] focus:border-amber-500/50"
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
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
