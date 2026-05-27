"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MODULE_GROUPS } from "@/lib/modules";
import { Logo } from "@/components/ui/logo";
import { SearchDialog } from "@/components/search/search-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WidthToggle } from "@/components/dev/width-toggle";

type DropdownKey = "product" | "solutions" | "resources" | null;

const SOLUTIONS_LINKS = [
  { label: "Who It's For", href: "/customers", desc: "Mills by size, integration, ownership" },
  { label: "By Role", href: "/solutions", desc: "MD, Plant Head, CFO, IT, Sales" },
  { label: "By Mill Type", href: "/for", desc: "Kraft, Duplex, W&P, Newsprint, Tissue" },
  { label: "Clients", href: "/clients", desc: "38 mills across India + Gulf" },
  { label: "Case Studies", href: "/case-studies", desc: "Outcomes by deployment" },
  { label: "Implementation", href: "/implementation", desc: "Rollout playbook" },
];

const RESOURCES_LINKS = [
  { label: "Architecture", href: "/architecture", desc: "Stack, data, deployment topology" },
  { label: "Technical", href: "/technical", desc: "APIs, integrations, security" },
  { label: "Features", href: "/features", desc: "396 capabilities across modules" },
  { label: "ROI Calculator", href: "/roi-calculator", desc: "Estimate savings + payback" },
  { label: "Resources", href: "/resources", desc: "Whitepapers, briefs, decks" },
  { label: "Blog", href: "/blog", desc: "Product + industry posts" },
  { label: "FAQ", href: "/faq", desc: "Common questions" },
  { label: "Glossary", href: "/glossary", desc: "Paper-industry terms" },
];

const PRODUCT_PATHS = ["/product", "/features"];
const SOLUTIONS_PATHS = ["/customers", "/solutions", "/for", "/clients", "/case-studies", "/implementation"];
const RESOURCES_PATHS = ["/architecture", "/technical", "/roi-calculator", "/resources", "/blog", "/faq", "/glossary"];

function matches(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() ?? "/";

  const isHome = pathname === "/";
  const isProduct = matches(pathname, PRODUCT_PATHS);
  const isSolutions = matches(pathname, SOLUTIONS_PATHS);
  const isResources = matches(pathname, RESOURCES_PATHS);
  const isPricing = pathname === "/pricing" || pathname.startsWith("/pricing/");

  const topLink = (active: boolean) =>
    cn(
      "relative text-sm transition-colors",
      active
        ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-amber-500 after:rounded-full"
        : "text-text-2 hover:text-foreground"
    );
  const dropdownTrigger = (active: boolean) =>
    cn(
      "relative flex items-center gap-1 text-sm transition-colors",
      active
        ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-amber-500 after:rounded-full"
        : "text-text-2 hover:text-foreground"
    );
  const mobileLink = (active: boolean) =>
    cn(
      "py-1 transition-colors",
      active ? "text-amber-400 font-semibold" : "text-text-2 hover:text-foreground"
    );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const closeAll = () => setActiveDropdown(null);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled || activeDropdown
        ? "bg-background/95 backdrop-blur-xl border-b border-border"
        : "dark:bg-transparent bg-background/95 dark:border-0 border-b border-border backdrop-blur-xl"
    )}>
      <nav className="max-w-[var(--container-max)] mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size="sm" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <Link href="/" className={topLink(isHome)} aria-current={isHome ? "page" : undefined}>Home</Link>
          {/* PRODUCT */}
          <div className="relative" onMouseEnter={() => openDropdown("product")} onMouseLeave={closeDropdown}>
            <button className={dropdownTrigger(isProduct)} aria-current={isProduct ? "page" : undefined}>
              Product <ChevronDown size={14} className={cn("transition-transform", activeDropdown === "product" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {activeDropdown === "product" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] bg-surface border border-border rounded-2xl shadow-2xl shadow-black/50 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {MODULE_GROUPS.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/product#${g.slug}`}
                        onClick={closeAll}
                        className="group flex items-start justify-between gap-3 p-3 rounded-lg border border-transparent hover:border-amber-500/20 hover:bg-amber-500/5 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors">{g.title}</p>
                            <span className="text-[10px] text-text-4 font-mono">{g.slugs.length}</span>
                          </div>
                          <p className="text-xs text-text-3 leading-snug line-clamp-2">{g.tagline}</p>
                        </div>
                        <ChevronDown size={12} className="text-text-4 group-hover:text-amber-400 -rotate-90 mt-1 flex-shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border-dim flex items-center justify-between">
                    <Link href="/product" onClick={closeAll}
                      className="text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium">
                      View all 44 modules →
                    </Link>
                    <Link href="/features" onClick={closeAll}
                      className="text-xs text-text-3 hover:text-amber-300 transition-colors">
                      Browse 396 capabilities →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SOLUTIONS */}
          <div className="relative" onMouseEnter={() => openDropdown("solutions")} onMouseLeave={closeDropdown}>
            <button className={dropdownTrigger(isSolutions)} aria-current={isSolutions ? "page" : undefined}>
              Solutions <ChevronDown size={14} className={cn("transition-transform", activeDropdown === "solutions" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[560px] bg-surface border border-border rounded-2xl shadow-2xl shadow-black/50 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {SOLUTIONS_LINKS.map((l) => (
                      <Link key={l.href} href={l.href} onClick={closeAll}
                        className="group p-3 rounded-lg border border-transparent hover:border-amber-500/20 hover:bg-amber-500/5 transition-colors">
                        <p className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors mb-1">{l.label}</p>
                        <p className="text-xs text-text-3 leading-snug">{l.desc}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RESOURCES */}
          <div className="relative" onMouseEnter={() => openDropdown("resources")} onMouseLeave={closeDropdown}>
            <button className={dropdownTrigger(isResources)} aria-current={isResources ? "page" : undefined}>
              Resources <ChevronDown size={14} className={cn("transition-transform", activeDropdown === "resources" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {activeDropdown === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] bg-surface border border-border rounded-2xl shadow-2xl shadow-black/50 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {RESOURCES_LINKS.map((l) => (
                      <Link key={l.href} href={l.href} onClick={closeAll}
                        className="group p-3 rounded-lg border border-transparent hover:border-amber-500/20 hover:bg-amber-500/5 transition-colors">
                        <p className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors mb-1">{l.label}</p>
                        <p className="text-xs text-text-3 leading-snug">{l.desc}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/pricing" className={topLink(isPricing)} aria-current={isPricing ? "page" : undefined}>Pricing</Link>
          <SearchDialog />
          <ThemeToggle />
          <WidthToggle />
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors">
            Request Demo
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <WidthToggle />
          <SearchDialog />
          <button className="text-text-2 hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="lg:hidden bg-surface border-b border-border px-6 py-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <Link href="/" className={cn("text-sm", mobileLink(isHome))} onClick={() => setMenuOpen(false)} aria-current={isHome ? "page" : undefined}>Home</Link>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-1 mt-2">Product</p>
          {MODULE_GROUPS.map((g) => (
            <Link
              key={g.slug}
              href={`/product#${g.slug}`}
              className="flex items-center justify-between text-sm text-text-2 hover:text-foreground py-1.5 pl-2"
              onClick={() => setMenuOpen(false)}
            >
              <span>{g.title}</span>
              <span className="text-[10px] text-text-4 font-mono">{g.slugs.length}</span>
            </Link>
          ))}
          <Link href="/product" className="text-xs text-amber-400 hover:text-amber-300 pl-2 py-1" onClick={() => setMenuOpen(false)}>
            View all 44 modules →
          </Link>

          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-1 mt-3">Solutions</p>
          {SOLUTIONS_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} className={cn("text-sm pl-2", mobileLink(active))} onClick={() => setMenuOpen(false)} aria-current={active ? "page" : undefined}>{l.label}</Link>
            );
          })}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-1 mt-3">Resources</p>
          {RESOURCES_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} className={cn("text-sm pl-2", mobileLink(active))} onClick={() => setMenuOpen(false)} aria-current={active ? "page" : undefined}>{l.label}</Link>
            );
          })}

          <div className="border-t border-border-dim mt-3 pt-3 flex flex-col gap-2">
            <Link href="/pricing" className={cn("text-sm", mobileLink(isPricing))} onClick={() => setMenuOpen(false)} aria-current={isPricing ? "page" : undefined}>Pricing</Link>
            <Link href="/contact" className={cn("text-sm", mobileLink(pathname.startsWith("/contact")))} onClick={() => setMenuOpen(false)} aria-current={pathname.startsWith("/contact") ? "page" : undefined}>Contact</Link>
          </div>

          <Link href="/contact"
            className="px-4 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-semibold text-center mt-2"
            onClick={() => setMenuOpen(false)}>Request Demo</Link>
        </div>
      )}
    </header>
  );
}
