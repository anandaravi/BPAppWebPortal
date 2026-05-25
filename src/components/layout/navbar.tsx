"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ALL_MODULES, MODULE_GROUPS } from "@/lib/modules";
import { getIcon } from "@/lib/icons";

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
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="BPApp"
            width={92}
            height={36}
            className="h-9 object-contain"
            style={{ width: "auto" }}
            priority
          />
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
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[920px] bg-[#0f0f0f] border border-[#222] rounded-2xl shadow-2xl shadow-black/50 p-5">
                  <div className="grid grid-cols-5 gap-x-4 gap-y-5">
                    {MODULE_GROUPS.map((g) => (
                      <div key={g.title}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-2">{g.title}</p>
                        <div className="space-y-0.5">
                          {g.slugs.map((slug) => {
                            const m = ALL_MODULES[slug];
                            if (!m) return null;
                            const Icon = getIcon(m.icon);
                            return (
                              <Link key={slug} href={`/product/${slug}`}
                                onClick={() => setProductOpen(false)}
                                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-amber-500/5 transition-colors group">
                                <Icon size={11} style={{ color: m.accent }} className="flex-shrink-0" />
                                <span className="text-xs text-zinc-300 group-hover:text-white transition-colors truncate">{m.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center justify-between">
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
          <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link>
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors">
            Request Demo
          </Link>
        </div>

        <button className="lg:hidden text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-b border-[#222] px-6 py-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white py-1" onClick={() => setMenuOpen(false)}>Home</Link>
          {MODULE_GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-2 mt-3">{g.title}</p>
              {g.slugs.map((slug) => {
                const m = ALL_MODULES[slug];
                if (!m) return null;
                return (
                  <Link key={slug} href={`/product/${slug}`}
                    className="block text-sm text-zinc-400 hover:text-white transition-colors py-1"
                    onClick={() => setMenuOpen(false)}>{m.name}</Link>
                );
              })}
            </div>
          ))}
          <div className="border-t border-[#1f1f1f] mt-3 pt-3 flex flex-col gap-2" />
          <Link href="/architecture" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Architecture</Link>
          <Link href="/technical" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Technical</Link>
          <Link href="/customers" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Who It&apos;s For</Link>
          <Link href="/solutions" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>By Role</Link>
          <Link href="/features" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/contact" className="text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/contact"
            className="px-4 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-semibold text-center mt-2"
            onClick={() => setMenuOpen(false)}>Request Demo</Link>
        </div>
      )}
    </header>
  );
}
