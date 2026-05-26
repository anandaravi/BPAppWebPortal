"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { getSearchIndex, searchEntries, type SearchEntry } from "@/lib/search";

const TYPE_COLOR: Record<SearchEntry["type"], string> = {
  Page: "#71717a",
  Module: "#F59E0B",
  Capability: "#FBBF24",
  Compare: "#EF4444",
  "Mill Type": "#A78BFA",
  City: "#10B981",
  State: "#34D399",
  Blog: "#60A5FA",
  "Case Study": "#EC4899",
  Glossary: "#94A3B8",
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(
    () => (query ? searchEntries(query, index, 20) : []),
    [query, index],
  );

  // Featured entries when no query
  const featured = useMemo(
    () =>
      index.filter((e) =>
        [
          "/product/deckle",
          "/product/production",
          "/product/ai",
          "/product/finance",
          "/pricing",
          "/compare",
          "/case-studies",
          "/blog",
        ].includes(e.url),
      ),
    [index],
  );

  const displayed = query ? results : featured;

  // Open via ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus + reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Keep highlight in bounds
  useEffect(() => {
    if (highlight >= displayed.length) setHighlight(Math.max(0, displayed.length - 1));
  }, [displayed.length, highlight]);

  const close = useCallback(() => setOpen(false), []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, displayed.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = displayed[highlight];
      if (sel) {
        close();
        router.push(sel.url);
      }
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${highlight}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222] bg-[#0f0f0f]/80 hover:border-amber-500/30 hover:bg-amber-500/5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
        aria-label="Search site"
      >
        <Search size={13} />
        <span>Search…</span>
        <span className="ml-2 px-1.5 py-0.5 rounded border border-[#262626] text-[10px] font-mono text-zinc-600">⌘K</span>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#222] bg-[#0f0f0f]/80 text-zinc-400"
        aria-label="Search site"
      >
        <Search size={15} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1f1f1f]">
              <Search size={18} className="text-amber-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlight(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search modules, capabilities, blog, cities, comparisons…"
                className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-600 outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded border border-[#262626] text-[10px] font-mono text-zinc-500">
                ESC
              </kbd>
              <button
                onClick={close}
                className="sm:hidden text-zinc-500 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
              {!query && (
                <p className="px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-600 font-mono border-b border-[#1f1f1f]">
                  Suggested
                </p>
              )}
              {displayed.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-zinc-500">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-zinc-600 mt-2">
                    Try: deckle, GST, kraft, Vapi, Greycon, payroll
                  </p>
                </div>
              ) : (
                <div className="py-1">
                  {displayed.map((e, i) => (
                    <Link
                      key={`${e.url}-${i}`}
                      href={e.url}
                      onClick={close}
                      data-idx={i}
                      className={`flex items-center gap-3 px-5 py-2.5 transition-colors ${
                        highlight === i
                          ? "bg-amber-500/10 border-l-2 border-amber-500"
                          : "border-l-2 border-transparent hover:bg-[#0f0f0f]"
                      }`}
                      onMouseEnter={() => setHighlight(i)}
                    >
                      <span
                        className="text-[9px] font-mono uppercase tracking-widest font-bold px-1.5 py-0.5 rounded flex-shrink-0 w-[78px] text-center"
                        style={{
                          background: `${TYPE_COLOR[e.type]}15`,
                          border: `1px solid ${TYPE_COLOR[e.type]}30`,
                          color: TYPE_COLOR[e.type],
                        }}
                      >
                        {e.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${
                            highlight === i ? "text-amber-300" : "text-white"
                          }`}
                        >
                          {e.title}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">{e.subtitle}</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono truncate hidden sm:inline max-w-[160px]">
                        {e.url}
                      </span>
                      {highlight === i ? (
                        <CornerDownLeft size={14} className="text-amber-400 flex-shrink-0" />
                      ) : (
                        <ArrowRight size={14} className="text-zinc-700 flex-shrink-0" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#1f1f1f] px-5 py-3 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1 py-0.5 rounded border border-[#262626] mr-1">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="px-1 py-0.5 rounded border border-[#262626] mr-1">↵</kbd> open
                </span>
                <span>
                  <kbd className="px-1 py-0.5 rounded border border-[#262626] mr-1">esc</kbd> close
                </span>
              </div>
              <span>{displayed.length} result{displayed.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
