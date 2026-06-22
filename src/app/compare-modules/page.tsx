import type { Metadata } from "next";
import { ModuleMatrix } from "@/components/sections/module-matrix";

export const metadata: Metadata = {
  title: "Module Matrix — which modules fit your mill",
  description:
    "Filterable comparison of all 45 Papyrus BPApp modules — relevance by mill type (Kraft, Duplex, W&P, Newsprint, Tissue, Specialty) and tier inclusion (Essential, Growth, Enterprise).",
  alternates: { canonical: "/compare-modules" },
};

export default function CompareModulesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        <header className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
            Module Matrix
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Which modules fit your mill?
          </h1>
          <p className="text-lg text-text-2 leading-relaxed">
            All 45 modules · mapped to mill type + tier · click a module for details.
          </p>
        </header>
        <ModuleMatrix />
      </div>
    </div>
  );
}
