"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MODULE_GROUPS } from "@/lib/modules";
import { Logo } from "@/components/ui/logo";
import { SearchDialog } from "@/components/search/search-dialog";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setProductOpen(false), 200);
  };

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled || productOpen
        ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#222]"
        : "bg-transparent"
    )}>
      <nav className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size="sm" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</Link>
          <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
            <button className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
              Product <ChevronDown size={14} className={cn("transition-transform", productOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {productOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] bg-[#0f0f0f] border border-[#222] rounded-2xl shadow-2xl shadow-black/50 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {MODULE_GROUPS.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/product#${g.slug}`}
                        onClick={() => setProductOpen(false)}
                        className="group flex items-start justify-between gap-3 p-3 rounded-lg border border-transparent hover:border-amber-500/20 hover:bg-amber-500/5 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">{g.title}</p>
                            <span className="text-[10px] text-zinc-600 font-mono">{g.slugs.length}</span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-snug line-clamp-2">{g.tagline}</p>
                        </div>
                        <ChevronDown size={12} className="text-zinc-600 group-hover:text-amber-400 -rotate-90 mt-1 flex-shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#1f1f1f] flex items-center justify-between">
                    <Link href="/product"
                      onClick={() => setProductOpen(false)}
                      className="text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium">
                      View all 44 modules →
                    </Link>
                    <Link href="/features"
                      onClick={() => setProductOpen(false)}
                      className="text-xs text-zinc-500 hover:text-amber-300 transition-colors">
                      Browse 396 capabilities →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/architecture" className="text-sm text-zinc-400 hover:text-white transition-colors">Architecture</Link>
          <Link href="/technical" className="text-sm text-zinc-400 hover:text-white transition-colors">Technical</Link>
          <Link href="/customers" className="text-sm text-zinc-400 hover:text-white transition-colors">Who It&apos;s For</Link>
          <Link href="/solutions" className="text-sm text-zinc-400 hover:text-white transition-colors">By Role</Link>
          <Link href="/features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
          <Link href="/resources" className="text-sm text-zinc-400 hover:text-white transition-colors">Resources</Link>
          <Link href="/roi-calculator" className="text-sm text-zinc-400 hover:text-white transition-colors">ROI</Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link>
          <SearchDialog />
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors">
            Request Demo
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <SearchDialog />
          <button className="text-zinc-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-b border-[#222] px-6 py-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white py-1" onClick={() => setMenuOpen(false)}>Home</Link>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-1 mt-2">Product</p>
          {MODULE_GROUPS.map((g) => (
            <Link
              key={g.slug}
              href={`/product#${g.slug}`}
              className="flex items-center justify-between text-sm text-zinc-300 hover:text-white py-1.5 pl-2"
              onClick={() => setMenuOpen(false)}
            >
              <span>{g.title}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{g.slugs.length}</span>
            </Link>
          ))}
          <Link href="/product" className="text-xs text-amber-400 hover:text-amber-300 pl-2 py-1" onClick={() => setMenuOpen(false)}>
            View all 44 modules →
          </Link>
          <div className="border-t border-[#1f1f1f] mt-3 pt-3 flex flex-col gap-2" />
          <Link href="/architecture" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Architecture</Link>
          <Link href="/technical" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Technical</Link>
          <Link href="/customers" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Who It&apos;s For</Link>
          <Link href="/solutions" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>By Role</Link>
          <Link href="/features" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/resources" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link href="/roi-calculator" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>ROI Calculator</Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/contact" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/contact"
            className="px-4 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-semibold text-center mt-2"
            onClick={() => setMenuOpen(false)}>Request Demo</Link>
        </div>
      )}
    </header>
  );
}
