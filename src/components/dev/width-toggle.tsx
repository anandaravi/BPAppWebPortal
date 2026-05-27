"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = [
  { label: "Narrow", value: "1280px", hint: "Original" },
  { label: "Default", value: "1440px", hint: "Current" },
  { label: "Wide", value: "1600px", hint: "Modern SaaS" },
  { label: "X-Wide", value: "1720px", hint: "Near full" },
  { label: "Full", value: "100%", hint: "No max" },
] as const;

const STORAGE_KEY = "bpapp:container-max";

export function WidthToggle({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("1440px");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      document.documentElement.style.setProperty("--container-max", saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(saved);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const apply = (v: string) => {
    document.documentElement.style.setProperty("--container-max", v);
    localStorage.setItem(STORAGE_KEY, v);
    setCurrent(v);
  };

  const reset = () => {
    document.documentElement.style.removeProperty("--container-max");
    localStorage.removeItem(STORAGE_KEY);
    setCurrent("1440px");
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Layout width"
        aria-expanded={open}
        title="Layout width"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-text-2 hover:text-foreground hover:bg-amber-500/10 transition-colors"
      >
        <Monitor size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-background border border-border-dim rounded-xl shadow-2xl shadow-black/70 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Layout Width
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-text-4 hover:text-foreground"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-2">
            {PRESETS.map((p) => {
              const active = current === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => apply(p.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-amber-500/15 border border-amber-500/40 text-amber-300"
                      : "border border-transparent text-text-2 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        active ? "bg-amber-400" : "bg-zinc-700"
                      }`}
                    />
                    <div className="text-left">
                      <p className="font-semibold leading-tight">{p.label}</p>
                      <p className="text-[10px] text-text-4 font-mono leading-tight">
                        {p.hint}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-3">
                    {p.value}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2.5 border-t border-border-dim flex items-center justify-between">
            <button
              onClick={reset}
              className="text-[10px] text-text-3 hover:text-amber-400 font-mono"
            >
              Reset
            </button>
            <span className="text-[10px] font-mono text-zinc-700">
              persists per browser
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
