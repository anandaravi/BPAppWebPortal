"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
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

            <Field label="What are you looking for? (optional)">
              <textarea
                rows={4}
                placeholder="Tell us about your mill — number of machines, current pain points, modules you're most interested in..."
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
