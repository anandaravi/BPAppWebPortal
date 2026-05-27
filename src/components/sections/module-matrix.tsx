"use client";

import { useState, useMemo, Fragment } from "react";
import Link from "next/link";
import { Check, Minus, Circle, Search } from "lucide-react";
import { MODULE_MATRIX, MILL_TYPES, type Tier, type MillTypeSlug, type Relevance } from "@/lib/modules/matrix";
import { ALL_MODULES } from "@/lib/modules";

const TIERS: { value: Tier | "all"; label: string }[] = [
  { value: "all", label: "All tiers" },
  { value: "essential", label: "Essential" },
  { value: "growth", label: "Growth" },
  { value: "enterprise", label: "Enterprise" },
];

const CATEGORIES = ["Core Ops", "Customer", "Finance/People", "Platform", "Intelligence"] as const;

const TIER_COLOR: Record<Tier, string> = {
  essential: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
  growth: "text-amber-300 bg-amber-500/15 border-amber-500/30",
  enterprise: "text-violet-300 bg-violet-500/15 border-violet-500/30",
};

function RelevanceCell({ r }: { r: Relevance }) {
  if (r === "core") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30" title="Core">
        <Check size={12} className="text-emerald-400" />
      </span>
    );
  }
  if (r === "recommended") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/25" title="Recommended">
        <Circle size={8} className="text-amber-400" fill="currentColor" />
      </span>
    );
  }
  if (r === "optional") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border-light" title="Optional">
        <Circle size={6} className="text-text-4" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" title="N/A">
      <Minus size={10} className="text-text-4" />
    </span>
  );
}

export function ModuleMatrix() {
  const [millType, setMillType] = useState<MillTypeSlug | "all">("all");
  const [tier, setTier] = useState<Tier | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MODULE_MATRIX.filter((e) => {
      if (tier !== "all" && e.tier !== tier) return false;
      if (millType !== "all") {
        const r = e.relevance[millType];
        if (r === "n/a" || r === "optional") {
          // when filtering by mill type, keep core + recommended only
          if (r === "optional") return false;
        }
      }
      if (q) {
        const m = ALL_MODULES[e.slug];
        const name = m?.name?.toLowerCase() ?? e.slug;
        if (!name.includes(q) && !e.slug.includes(q)) return false;
      }
      return true;
    });
  }, [millType, tier, query]);

  const grouped = useMemo(() => {
    const byCat = new Map<string, typeof filtered>();
    for (const e of filtered) {
      const arr = byCat.get(e.category) ?? [];
      arr.push(e);
      byCat.set(e.category, arr);
    }
    return CATEGORIES.map((cat) => ({ cat, entries: byCat.get(cat) ?? [] })).filter((g) => g.entries.length > 0);
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2 block">
              Mill type
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setMillType("all")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  millType === "all"
                    ? "bg-amber-500 text-black"
                    : "border border-border text-text-2 hover:text-foreground"
                }`}
              >
                All
              </button>
              {MILL_TYPES.map((m) => (
                <button
                  key={m.slug}
                  onClick={() => setMillType(m.slug)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    millType === m.slug
                      ? "bg-amber-500 text-black"
                      : "border border-border text-text-2 hover:text-foreground"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2 block">
              Tier
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TIERS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTier(t.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    tier === t.value
                      ? "bg-amber-500 text-black"
                      : "border border-border text-text-2 hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2 block">
              Search
            </label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-4" />
              <input
                type="search"
                placeholder="Filter by module name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-text-4 focus:border-amber-500/50 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2 border-t border-border-dim text-xs text-text-3">
          <span className="flex items-center gap-1.5"><RelevanceCell r="core" /> Core</span>
          <span className="flex items-center gap-1.5"><RelevanceCell r="recommended" /> Recommended</span>
          <span className="flex items-center gap-1.5"><RelevanceCell r="optional" /> Optional</span>
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-text-3">
        <span className="text-foreground font-semibold">{filtered.length}</span> module{filtered.length === 1 ? "" : "s"} match
      </p>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-2xl">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-3 px-4 py-3 sticky left-0 bg-surface z-10">
                Module
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-3 px-3 py-3">
                Tier
              </th>
              {MILL_TYPES.map((m) => (
                <th
                  key={m.slug}
                  className="text-center text-xs font-semibold uppercase tracking-widest text-text-3 px-2 py-3 whitespace-nowrap"
                >
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grouped.map(({ cat, entries }) => (
              <Fragment key={cat}>
                <tr className="bg-background">
                  <td colSpan={2 + MILL_TYPES.length} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-amber-500 border-t border-border-dim">
                    {cat}
                  </td>
                </tr>
                {entries.map((e) => {
                  const m = ALL_MODULES[e.slug];
                  if (!m) return null;
                  return (
                    <tr key={e.slug} className="border-t border-border-dim hover:bg-surface/60 transition-colors">
                      <td className="px-4 py-3 sticky left-0 bg-background hover:bg-surface/60 z-10">
                        <Link
                          href={`/product/${e.slug}`}
                          className="text-foreground font-medium hover:text-amber-400 transition-colors"
                        >
                          {m.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${TIER_COLOR[e.tier]}`}>
                          {e.tier.toUpperCase()}
                        </span>
                      </td>
                      {MILL_TYPES.map((mt) => (
                        <td key={mt.slug} className="px-2 py-3 text-center">
                          <RelevanceCell r={e.relevance[mt.slug]} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 border border-border rounded-2xl bg-surface">
          <p className="text-text-2 mb-4">No modules match your filters.</p>
          <button
            onClick={() => { setMillType("all"); setTier("all"); setQuery(""); }}
            className="text-sm text-amber-400 hover:text-amber-300 font-semibold"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-7 text-center mt-8">
        <h2 className="text-xl font-bold text-foreground mb-2">Want a tailored module selection?</h2>
        <p className="text-text-2 mb-5 max-w-lg mx-auto text-sm">
          Share your mill profile — we&apos;ll recommend the right modules + tier for your operation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
        >
          Request a Demo
        </Link>
      </div>
    </div>
  );
}
