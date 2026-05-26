"use client";

import dynamic from "next/dynamic";
import type { Client } from "@/lib/clients";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] flex items-center justify-center"
      style={{ height: 560 }}
    >
      <p className="text-zinc-500 text-sm font-mono">Loading map…</p>
    </div>
  ),
});

export function MapLoader({ clients }: { clients: Client[] }) {
  return <LeafletMap clients={clients} />;
}
