import Link from "next/link";
import { ArrowRight, Home, Calculator, ShoppingCart, Factory, Scissors, Sparkles, IndianRupee, MessageCircle, FileQuestion } from "lucide-react";

const POPULAR = [
  { label: "Product overview", href: "/product", Icon: Factory, desc: "All 44 modules" },
  { label: "Deckle Optimizer", href: "/product/deckle", Icon: Scissors, desc: "Trim waste eliminator" },
  { label: "Production", href: "/product/production", Icon: Factory, desc: "MES + planning" },
  { label: "Sales", href: "/product/sales", Icon: ShoppingCart, desc: "Quote to e-invoice" },
  { label: "Finance & GST", href: "/product/finance", Icon: IndianRupee, desc: "Indian compliance" },
  { label: "AI & Analytics", href: "/product/ai", Icon: Sparkles, desc: "Natural language" },
  { label: "ROI Calculator", href: "/roi-calculator", Icon: Calculator, desc: "Estimate savings" },
  { label: "FAQ", href: "/faq", Icon: FileQuestion, desc: "Common questions" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
            Error 404
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-text-2 text-lg max-w-xl mx-auto leading-relaxed">
            Page moved, renamed, or never existed. Try search (top-right{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-border-light text-xs font-mono">⌘K</kbd>
            ) or pick from below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
          >
            <Home size={14} />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border-light text-foreground hover:border-amber-500/40 hover:bg-amber-500/5 text-sm font-medium transition-colors"
          >
            <MessageCircle size={14} />
            Talk to us
          </Link>
        </div>

        <div className="border-t border-border-dim pt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-5 text-center">
            Popular destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR.map(({ label, href, Icon, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-amber-500/30 hover:bg-amber-500/5 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-amber-300 transition-colors">
                    {label}
                  </p>
                  <p className="text-xs text-text-3 mt-0.5">{desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-text-4 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
