import { ModuleTemplate } from "@/components/module/module-template";
import { DeckleDeepDive } from "@/components/module/deckle-deep-dive";
import { ALL_MODULES, ALL_SLUGS } from "@/lib/modules";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ALL_SLUGS.map((module) => ({ module }));
}

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const { module } = await params;
  const data = ALL_MODULES[module];
  if (!data) return { title: "Module not found" };
  return {
    title: `${data.tag} — Papyrus BPApp`,
    description: data.blurb,
  };
}

export default async function Page({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const data = ALL_MODULES[module];
  if (!data) notFound();

  // Deckle gets a custom deep-dive page; all other modules use generic template
  if (module === "deckle") {
    return <DeckleDeepDive data={data} />;
  }

  return <ModuleTemplate data={data} />;
}
