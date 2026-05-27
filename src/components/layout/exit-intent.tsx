"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, ArrowRight } from "lucide-react";

const STORAGE_KEY = "bpapp:exit-intent-seen";
const MIN_DWELL_MS = 8000;
const SCROLL_TRIGGER_RATIO = 0.7;
const HIDE_ON = new Set<string>(["/contact", "/roi-calculator"]);

export function ExitIntent() {
  const pathname = usePathname() ?? "/";
  const [show, setShow] = useState(false);
  const [armed, setArmed] = useState(false);
  const dismissedRef = useRef(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    dismissedRef.current = true;
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setShow(false);
  }, []);

  useEffect(() => {
    if (HIDE_ON.has(pathname)) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) {
      dismissedRef.current = true;
      return;
    }
    const t = setTimeout(() => setArmed(true), MIN_DWELL_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!armed || show || dismissedRef.current) return;
    if (HIDE_ON.has(pathname)) return;

    const trigger = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShow(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled > SCROLL_TRIGGER_RATIO) trigger();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [armed, show, pathname]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);

    // Body scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into modal
    const prevActive = document.activeElement as HTMLElement | null;
    const focusT = setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(focusT);
      prevActive?.focus?.();
    };
  }, [show, close]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background border border-amber-500/30 rounded-2xl shadow-2xl shadow-black/80 p-8"
          >
            <button
              ref={closeBtnRef}
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 rounded-md flex items-center justify-center text-text-3 hover:text-foreground hover:bg-surface transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-5">
              <Calculator size={22} className="text-amber-400" />
            </div>

            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
              Before you go
            </p>
            <h2 id="exit-intent-title" className="text-2xl font-bold text-foreground leading-tight mb-3">
              See your mill&apos;s ROI in 60 seconds
            </h2>
            <p className="text-sm text-text-2 leading-relaxed mb-6">
              Drag 5 sliders → get annual trim-waste savings + 5-year projection.
              Email the report to yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/roi-calculator"
                onClick={close}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
              >
                Open Calculator
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={close}
                className="px-5 py-3 rounded-lg border border-border-light text-text-2 hover:text-foreground hover:border-amber-500/40 text-sm transition-colors"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
