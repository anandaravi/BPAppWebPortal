import { PRINCIPLES, PRINCIPLE_SLUGS } from "@/lib/principles-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrincipleDetailClient } from "./client";

export function generateStaticParams() {
  return PRINCIPLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRINCIPLES[slug];
  if (!p) return { title: "Principle not found" };
  return {
    title: `${p.title} — Architecture · Papyrus BPApp`,
    description: p.short,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRINCIPLES[slug];
  if (!p) notFound();
  return <PrincipleDetailClient slug={slug} />;
}
