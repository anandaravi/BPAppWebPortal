"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  FileText,
  BookOpen,
  Presentation,
  Calendar,
  Clock,
  Video,
  ChevronRight,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

type Tab = "videos" | "guides" | "presentations" | "webinars";

const TABS: { id: Tab; label: string }[] = [
  { id: "videos", label: "Videos" },
  { id: "guides", label: "Guides" },
  { id: "presentations", label: "Presentations" },
  { id: "webinars", label: "Webinars" },
];

const VIDEOS = [
  {
    id: "platform-overview",
    title: "BPApp Platform Overview",
    duration: "18 min",
    description: "Full walkthrough of the platform from login to reports.",
  },
  {
    id: "deckle-deep-dive",
    title: "Deckle Optimizer Deep Dive",
    duration: "14 min",
    description: "How the 3-tier optimization engine plans trim patterns.",
  },
  {
    id: "production-planning",
    title: "Production Planning: MPS to Shop Floor",
    duration: "22 min",
    description: "From master production schedule to shift orders.",
  },
  {
    id: "gst-compliance",
    title: "GST Compliance Workflow",
    duration: "11 min",
    description: "E-invoice, GSTR-1, GSTR-3B auto-population walkthrough.",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps for Shop Floor",
    duration: "8 min",
    description: "Field sync, offline mode, quality checks on mobile.",
  },
  {
    id: "hr-payroll",
    title: "HR & Payroll: India Compliance",
    duration: "16 min",
    description: "PF, ESI, PT, LWF setup and monthly processing.",
  },
];

const GUIDES = [
  {
    id: "quick-start",
    title: "Quick Start Guide",
    pages: "24 pages",
    description: "Get your first module live in under a week.",
    icon: "BookOpen" as const,
  },
  {
    id: "gst-fema",
    title: "GST & FEMA Configuration Manual",
    pages: "48 pages",
    description: "Complete setup for Indian tax compliance.",
    icon: "FileText" as const,
  },
  {
    id: "deckle-manual",
    title: "Deckle Optimizer User Manual",
    pages: "32 pages",
    description: "Pattern entry, machine config, optimization runs.",
    icon: "FileText" as const,
  },
  {
    id: "multi-plant",
    title: "Multi-Plant Setup Guide",
    pages: "28 pages",
    description: "Configuring group entities, inter-company workflows.",
    icon: "BookOpen" as const,
  },
  {
    id: "api-handbook",
    title: "API Integration Handbook",
    pages: "56 pages",
    description: "REST API reference for connecting third-party systems.",
    icon: "FileText" as const,
  },
  {
    id: "data-migration",
    title: "Data Migration Checklist",
    pages: "18 pages",
    description: "Moving from Tally, Excel, or legacy ERP to BPApp.",
    icon: "BookOpen" as const,
  },
];

const PRESENTATIONS = [
  {
    id: "exec-overview",
    title: "Executive Overview",
    slides: "18 slides",
    description: "Board-level overview of BPApp for decision makers.",
  },
  {
    id: "production-deep-dive",
    title: "Production Module Deep Dive",
    slides: "34 slides",
    description: "MPS, MRP, CRP, shift planning in detail.",
  },
  {
    id: "finance-gst",
    title: "Finance & GST Module",
    slides: "28 slides",
    description: "Accounts, compliance, reporting for CFOs.",
  },
  {
    id: "ai-analytics",
    title: "AI & Analytics Platform",
    slides: "22 slides",
    description: "Predictive analytics, anomaly detection, dashboards.",
  },
  {
    id: "implementation-roadmap",
    title: "Implementation Roadmap",
    slides: "16 slides",
    description: "12-week go-live plan, phases, milestones.",
  },
  {
    id: "roi-framework",
    title: "ROI Framework",
    slides: "20 slides",
    description: "How to calculate ROI from trim savings, reduced waste, automation.",
  },
];

const WEBINARS_UPCOMING = [
  {
    id: "deckle-demo",
    title: "Live Demo: Deckle Optimizer",
    dateLabel: "Register for next slot",
    duration: "60 min",
    description: "Live product demo with Q&A.",
  },
  {
    id: "gst-readiness",
    title: "GST Season Readiness with BPApp",
    dateLabel: "Quarterly session",
    duration: "45 min",
    description: "Prep your mill for GST filing season.",
  },
];

const WEBINARS_RECORDED = [
  {
    id: "trim-waste",
    title: "How Paper Mills Cut Trim Waste by 15%",
    duration: "58 min",
    description: "Customer story + Deckle demo.",
  },
  {
    id: "migration-story",
    title: "From Spreadsheets to BPApp: A Migration Story",
    duration: "45 min",
    description: "Real implementation walkthrough.",
  },
  {
    id: "multi-plant-mgmt",
    title: "Multi-Plant Management on One Platform",
    duration: "52 min",
    description: "Group entity setup and inter-company flows.",
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance for Paper Mills",
    duration: "40 min",
    description: "IoT + AI combo for zero unplanned downtime.",
  },
];

function GuideIcon({ name }: { name: "FileText" | "BookOpen" }) {
  if (name === "BookOpen") return <BookOpen size={22} className="text-amber-400" />;
  return <FileText size={22} className="text-amber-400" />;
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            Learning Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl"
          >
            Everything you need to{" "}
            <span className="amber-text">get up and running.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            Quick links to videos, guides, presentations, and webinars to help
            your team onboard faster and get the most out of every BPApp module.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
            >
              Request a Demo{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TAB NAV + CONTENT */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-12 border-b border-[#1a1a1a] overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "videos" && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {VIDEOS.map((video, i) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-amber-500/25 transition-colors flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-44 bg-[#0a0a0a] flex items-center justify-center border-b border-[#1a1a1a]">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                        <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                          <Play
                            size={22}
                            className="text-amber-400 translate-x-0.5"
                            fill="currentColor"
                          />
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#080808]/80 border border-[#2a2a2a] text-[10px] font-semibold text-zinc-400">
                          <Clock size={10} />
                          {video.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            Video
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-base leading-snug">
                          {video.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                          {video.description}
                        </p>
                        <Link
                          href="/contact"
                          className="group mt-1 inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                        >
                          Watch Now
                          <ChevronRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "guides" && (
              <motion.div
                key="guides"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GUIDES.map((guide, i) => (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex flex-col gap-4 hover:border-amber-500/25 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <GuideIcon name={guide.icon} />
                        </div>
                        <span className="text-[10px] font-semibold text-zinc-500 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md mt-1">
                          {guide.pages}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          PDF Guide
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-bold text-base leading-snug mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {guide.description}
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors mt-1"
                      >
                        Download
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "presentations" && (
              <motion.div
                key="presentations"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRESENTATIONS.map((deck, i) => (
                    <motion.div
                      key={deck.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 flex flex-col gap-4 hover:border-amber-500/25 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <Presentation size={22} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] font-semibold text-zinc-500 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md mt-1">
                          {deck.slides}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          Slide Deck
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-bold text-base leading-snug mb-2">
                          {deck.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {deck.description}
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors mt-1"
                      >
                        Request Access
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "webinars" && (
              <motion.div
                key="webinars"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-14"
              >
                {/* Upcoming */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
                      Upcoming
                    </p>
                    <div className="h-px flex-1 bg-[#1f1f1f]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {WEBINARS_UPCOMING.map((w, i) => (
                      <motion.div
                        key={w.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="bg-[#0f0f0f] border border-amber-500/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                            <Calendar size={11} />
                            {w.dateLabel}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md">
                            <Clock size={10} />
                            {w.duration}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg leading-snug mb-1.5">
                            {w.title}
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {w.description}
                          </p>
                        </div>
                        <Link
                          href="/contact"
                          className="group mt-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all w-fit"
                        >
                          Register Now
                          <ArrowRight
                            size={13}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recorded */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                      Recorded
                    </p>
                    <div className="h-px flex-1 bg-[#1f1f1f]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {WEBINARS_RECORDED.map((w, i) => (
                      <motion.div
                        key={w.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/25 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md">
                            <Video size={10} />
                            Recorded
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md">
                            <Clock size={10} />
                            {w.duration}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base leading-snug mb-1.5">
                            {w.title}
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {w.description}
                          </p>
                        </div>
                        <Link
                          href="/contact"
                          className="group inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors mt-auto"
                        >
                          Watch Now
                          <ChevronRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
