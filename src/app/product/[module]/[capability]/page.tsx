import { CapabilityDetailTemplate } from "@/components/module/capability-detail";
import { getCapability, getAllCapabilityParams } from "@/lib/modules/capability-helpers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllCapabilityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ module: string; capability: string }> }): Promise<Metadata> {
  const { module, capability } = await params;
  const detail = getCapability(module, capability);
  if (!detail) return { title: "Capability not found" };
  return {
    title: `${detail.capability.title} — ${detail.module.tag} — Papyrus BPApp`,
    description: detail.capability.desc,
  };
}

export default async function Page({ params }: { params: Promise<{ module: string; capability: string }> }) {
  const { module, capability } = await params;
  const detail = getCapability(module, capability);
  if (!detail) notFound();
  return <CapabilityDetailTemplate detail={detail} />;
}
