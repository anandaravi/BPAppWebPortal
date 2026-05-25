"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";
import { getIcon } from "@/lib/icons";
import { slugify } from "@/lib/modules/capability-helpers";

export default function FeaturesPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const totalCaps = Object.values(ALL_MODULES).reduce((sum, m) => sum + m.capabilities.length, 0);

  // Build flat capability list with module context
  const allCaps = Object.values(ALL_MODULES).flatMap((m) =>
    m.capabilities.map((c) => ({ ...c, module: m, capSlug: slugify(c.title) }))
  );

  const visibleGroups = activeGroup === "all"
    ? MODULE_GROUPS
    : MODULE_GROUPS.filter((g) => g.title === activeGroup);

  const filteredCaps = search
    ? allCaps.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase()) ||
        c.module.name.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* HERO */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Browse All Features
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6">
          <span className="font-mono text-amber-400">{totalCaps}+</span> capabilities.<br />
          <span className="amber-text">44 modules.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-lg max-w-2xl mb-10">
          Search any feature, browse by module group, or drill into a specific capability for workflows, screens, and integration details.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-2xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search 396 capabilities — try 'GST', 'OEE', 'shift', 'audit'…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-amber-500/40 transition-colors"
          />
        </motion.div>
      </section>

      {/* GROUP FILTER PILLS */}
      {!search && (
        <section className="px-6 max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGroup("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeGroup === "all"
                  ? "bg-amber-500 text-black"
                  : "bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-400 hover:text-white hover:border-amber-500/30"
              }`}>
              All Groups
            </button>
            {MODULE_GROUPS.map((g) => (
              <button key={g.title}
                onClick={() => setActiveGroup(g.title)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeGroup === g.title
                    ? "bg-amber-500 text-black"
                    : "bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-400 hover:text-white hover:border-amber-500/30"
                }`}>
                {g.title}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS / GROUPS */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <AnimatePresence mode="wait">
          {search && filteredCaps ? (
            // SEARCH RESULTS VIEW
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6 font-mono">
                {filteredCaps.length} {filteredCaps.length === 1 ? "result" : "results"} for &ldquo;{search}&rdquo;
              </p>

              {filteredCaps.length === 0 ? (
                <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-10 text-center">
                  <p className="text-zinc-500">No capabilities match your search. Try a broader term.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCaps.slice(0, 60).map((cap, i) => {
                    const Icon = getIcon(cap.icon);
                    return (
                      <motion.div key={`${cap.module.slug}-${cap.capSlug}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.3) }}>
                        <Link href={`/product/${cap.module.slug}/${cap.capSlug}`}
                          className="block h-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 hover:border-amber-500/30 hover:bg-[#121212] transition-all group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: `${cap.module.accent}12`, border: `1px solid ${cap.module.accent}25` }}>
                              <Icon size={15} style={{ color: cap.module.accent }} />
                            </div>
                            <div className="flex items-center gap-1.5">
                              {cap.status === "preview" && (
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">Preview</span>
                              )}
                              {cap.status === "roadmap" && (
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">Roadmap</span>
                              )}
                              <span className="text-[10px] font-semibold uppercase tracking-wider"
                                style={{ color: cap.module.accent }}>
                                {cap.module.name}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-white font-bold mb-1.5 text-sm leading-tight group-hover:text-amber-400 transition-colors">{cap.title}</h3>
                          <p className="text-zinc-500 text-[12px] leading-relaxed line-clamp-3">{cap.desc}</p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            // GROUPED MODULE VIEW
            <motion.div
              key="grouped"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-14">
              {visibleGroups.map((group, gi) => (
                <div key={group.title}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.05 }}
                    className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-6 bg-amber-500 rounded-full" />
                    <h2 className="text-2xl font-black text-white">{group.title}</h2>
                    <span className="text-zinc-600 font-mono text-xs">{group.slugs.length} modules</span>
                  </motion.div>

                  <div className="space-y-4">
                    {group.slugs.map((slug, mi) => {
                      const m = ALL_MODULES[slug];
                      if (!m) return null;
                      const ModuleIcon = getIcon(m.icon);
                      return (
                        <motion.div key={slug}
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: Math.min(mi * 0.05, 0.3) }}
                          className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-amber-500/20 transition-colors">
                          <Link href={`/product/${slug}`} className="block p-5 border-b border-[#1f1f1f] hover:bg-[#121212] transition-colors group">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}30` }}>
                                <ModuleIcon size={18} style={{ color: m.accent }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h3 className="text-white font-bold text-lg">{m.name}</h3>
                                  <span className="text-[10px] font-mono text-zinc-600">{m.capabilities.length} capabilities</span>
                                </div>
                                <p className="text-sm text-zinc-500 line-clamp-1">{m.tag}</p>
                              </div>
                              <ArrowRight size={16} className="text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>

                          {/* Capability list inside module card */}
                          <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            {m.capabilities.map((cap, ci) => {
                              const CapIcon = getIcon(cap.icon);
                              return (
                                <Link key={cap.title || ci}
                                  href={`/product/${slug}/${slugify(cap.title)}`}
                                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-amber-500/5 transition-colors group">
                                  <CapIcon size={12} className="mt-0.5 flex-shrink-0" style={{ color: m.accent }} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <p className="text-xs font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors leading-tight truncate">{cap.title}</p>
                                      {cap.status === "preview" && (
                                        <span className="flex-shrink-0 px-1 py-0 rounded text-[8px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25">Preview</span>
                                      )}
                                      {cap.status === "roadmap" && (
                                        <span className="flex-shrink-0 px-1 py-0 rounded text-[8px] font-bold uppercase bg-zinc-800 text-zinc-500 border border-zinc-700">Roadmap</span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-zinc-600 line-clamp-1 mt-0.5">{cap.desc}</p>
                                  </div>
                                  <ArrowRight size={10} className="text-zinc-700 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
