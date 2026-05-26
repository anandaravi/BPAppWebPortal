"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  X,
  Users,
} from "lucide-react";
import { CTABanner } from "@/components/sections/cta-banner";

type Tab = "videos" | "guides" | "presentations" | "webinars";

interface VideoItem {
  id: string;
  youtubeId?: string;
  title: string;
  duration: string;
  description: string;
  category: "Customer Story" | "Product";
}

const TABS: { id: Tab; label: string }[] = [
  { id: "videos", label: "Videos" },
  { id: "guides", label: "Guides" },
  { id: "presentations", label: "Presentations" },
  { id: "webinars", label: "Webinars" },
];

const VIDEOS: VideoItem[] = [
  {
    id: "chaos-to-control",
    youtubeId: "gqEkPQKPIX0",
    title: "From Chaos to Control: A 50 MT Paper Mill's Digital Journey",
    duration: "Watch",
    description:
      "How a 50 MT paper mill transformed operations with Papyrus BPApp — from scattered spreadsheets to a unified ERP across production, finance, and compliance.",
    category: "Customer Story",
  },
  {
    id: "ai-engine",
    youtubeId: "MgMQ6hb3mWc",
    title: "AI-Powered Paper Mill ERP — Predict, Detect & Automate",
    duration: "Watch",
    description:
      "BPApp's AI engine predicts machine failures, detects quality anomalies, and automates production scheduling end-to-end.",
    category: "Product",
  },
  {
    id: "deckle-optimizer",
    youtubeId: "3ap2joVrCyc",
    title: "Stop Wasting ₹3 Crore/Year on Paper Trim",
    duration: "Watch",
    description:
      "The Deckle Optimizer cuts trim waste using a proprietary optimization engine — live demo for Indian paper mills.",
    category: "Product",
  },
  {
    id: "production-planning",
    youtubeId: "3RNCZiXB30E",
    title: "Paper Mill Production Planning End-to-End",
    duration: "Watch",
    description:
      "Schedule, capacity planning, and shop-floor orders — from master production plan to shift execution.",
    category: "Product",
  },
  {
    id: "order-to-cash",
    youtubeId: "mqfprm6OFMY",
    title: "Order to Cash for Indian Paper Mills",
    duration: "Watch",
    description:
      "Sales order to e-invoice in one system — inquiry, order, dispatch, GST compliance, and collection.",
    category: "Product",
  },
  {
    id: "hr-payroll",
    youtubeId: "LX-lT7caC4s",
    title: "HR & Payroll for Indian Paper Mills",
    duration: "Watch",
    description:
      "Attendance to statutory compliance — PF, ESI, PT, LWF, and payroll automation built for the paper industry.",
    category: "Product",
  },
  {
    id: "gst-compliance",
    title: "GST Compliance Workflow",
    duration: "11 min",
    description: "E-invoice, GSTR-1, GSTR-3B auto-population walkthrough.",
    category: "Product",
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
    description:
      "How to calculate ROI from trim savings, reduced waste, automation.",
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
  if (name === "BookOpen")
    return <BookOpen size={22} className="text-amber-400" />;
  return <FileText size={22} className="text-amber-400" />;
}

function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/92"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 gap-4">
          <p className="text-white font-semibold text-sm leading-snug line-clamp-1">
            {video.title}
          </p>
          <button
            onClick={onClose}
            className="flex-shrink-0 flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold"
          >
            <X size={14} /> Close
          </button>
        </div>
        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="mt-3 text-xs text-zinc-500 text-center">
          Click outside or press Esc to close
        </p>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({
  video,
  index,
  onPlay,
  featured,
}: {
  video: VideoItem;
  index: number;
  onPlay: (v: VideoItem) => void;
  featured?: boolean;
}) {
  const hasYoutube = !!video.youtubeId;
  const thumbUrl = hasYoutube
    ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : null;

  const isCustomerStory = video.category === "Customer Story";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`bg-[#0f0f0f] border rounded-2xl overflow-hidden flex flex-col group transition-colors ${
        isCustomerStory
          ? "border-amber-500/30 hover:border-amber-500/50"
          : "border-[#1f1f1f] hover:border-amber-500/25"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative bg-[#0a0a0a] border-b border-[#1a1a1a] overflow-hidden ${
          featured ? "h-56 md:h-64" : "h-44"
        } ${hasYoutube ? "cursor-pointer" : ""}`}
        onClick={() => hasYoutube && onPlay(video)}
      >
        {thumbUrl ? (
          <>
            <Image
              src={thumbUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/90 hover:bg-amber-400 transition-colors flex items-center justify-center shadow-xl backdrop-blur-sm">
                <Play
                  size={22}
                  className="text-black translate-x-0.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Play
                  size={22}
                  className="text-amber-400 translate-x-0.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          {isCustomerStory ? (
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-500 text-black">
              <Users size={10} />
              Customer Story
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#080808]/80 border border-[#2a2a2a] text-zinc-400">
              Product
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className={`text-white font-bold leading-snug ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {video.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed flex-1">
          {video.description}
        </p>
        {hasYoutube ? (
          <button
            onClick={() => onPlay(video)}
            className="group/btn mt-1 inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
          >
            <Play size={13} fill="currentColor" />
            Watch Now
          </button>
        ) : (
          <Link
            href="/contact"
            className="group/btn mt-1 inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm font-semibold transition-colors"
          >
            Coming Soon
            <ChevronRight
              size={14}
              className="group-hover/btn:translate-x-0.5 transition-transform"
            />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const handlePlay = useCallback((video: VideoItem) => {
    setActiveVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const featuredVideo = VIDEOS.find((v) => v.category === "Customer Story");
  const productVideos = VIDEOS.filter((v) => v.category === "Product");

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && activeVideo.youtubeId && (
          <VideoModal video={activeVideo} onClose={handleClose} />
        )}
      </AnimatePresence>

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
                className="space-y-10"
              >
                {/* Featured customer story */}
                {featuredVideo && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
                        Customer Story
                      </p>
                      <div className="h-px flex-1 bg-[#1f1f1f]" />
                    </div>
                    <VideoCard
                      video={featuredVideo}
                      index={0}
                      onPlay={handlePlay}
                      featured
                    />
                  </div>
                )}

                {/* Product videos */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                      Product Videos
                    </p>
                    <div className="h-px flex-1 bg-[#1f1f1f]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productVideos.map((video, i) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        index={i}
                        onPlay={handlePlay}
                      />
                    ))}
                  </div>
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
