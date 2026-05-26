"use client";

import { useEffect, useState } from "react";
import { Monitor, X } from "lucide-react";

const PRESETS = [
  { label: "Narrow", value: "1280px", hint: "Original" },
  { label: "Default", value: "1440px", hint: "Current" },
  { label: "Wide", value: "1600px", hint: "Modern SaaS" },
  { label: "X-Wide", value: "1720px", hint: "Near full" },
  { label: "Full", value: "100%", hint: "No max" },
] as const;

const STORAGE_KEY = "bpapp:container-max";

export function WidthToggle() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("1440px");

  // Load saved on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      document.documentElement.style.setProperty("--container-max", saved);
      setCurrent(saved);
    }
  }, []);

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
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[90] w-11 h-11 rounded-full bg-[#0f0f0f] border border-[#222] hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 flex items-center justify-center shadow-xl shadow-black/60 transition-colors"
        aria-label="Toggle layout width"
        title="Layout width"
      >
        <Monitor size={16} />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-[91] w-64 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl shadow-2xl shadow-black/70 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Layout Width
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-600 hover:text-white"
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
                      : "border border-transparent text-zinc-300 hover:bg-[#0f0f0f]"
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
                      <p className="text-[10px] text-zinc-600 font-mono leading-tight">
                        {p.hint}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {p.value}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2.5 border-t border-[#1f1f1f] flex items-center justify-between">
            <button
              onClick={reset}
              className="text-[10px] text-zinc-500 hover:text-amber-400 font-mono"
            >
              Reset
            </button>
            <span className="text-[10px] font-mono text-zinc-700">
              persists per browser
            </span>
          </div>
        </div>
      )}
    </>
  );
}
