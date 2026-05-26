import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Quote, Globe, CheckCircle2 } from "lucide-react";
import { CLIENTS, INDIA_BBOX, type Client } from "@/lib/clients";
import { CTABanner } from "@/components/sections/cta-banner";
import { ogImage } from "@/lib/og";

const OG = ogImage({
  title: "Trusted by paper mills since 2000.",
  subtitle: "Indian + international mills running Netique / Papyrus360 software.",
  tag: "Clients",
  accent: "#10B981",
});

export const metadata: Metadata = {
  title: "Clients | Papyrus360 — Indian Paper Mill Customers",
  description:
    "Paper mills running Netique Infotech / Papyrus360 software — JK Paper, Emami Paper, Khanna Papers, Lemit Papers, Sripathi, Waraq Paper (Saudi Arabia), and more.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients — Papyrus360",
    description: "Paper mills using OPTRIM + Papyrus BPApp across India and overseas.",
    url: "/clients",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

// Project lat/lon to SVG coords for India + Gulf map
// Map viewBox: 0 0 900 480 (wider aspect to fit Gulf + India)
const MAP_W = 900;
const MAP_H = 480;
function project(lat: number, lon: number) {
  const { minLon, maxLon, minLat, maxLat } = INDIA_BBOX;
  const x = ((lon - minLon) / (maxLon - minLon)) * MAP_W;
  const y = MAP_H - ((lat - minLat) / (maxLat - minLat)) * MAP_H;
  return { x, y };
}

export default function ClientsPage() {
  const indianClients = CLIENTS.filter((c) => c.country === "India");
  const intlClients = CLIENTS.filter((c) => c.country !== "India");

  // Group ALL clients (India + Gulf) by city for marker stacking
  const byCity = new Map<string, Client[]>();
  for (const c of CLIENTS) {
    const key = `${c.city}-${c.country}`;
    const arr = byCity.get(key) || [];
    arr.push(c);
    byCity.set(key, arr);
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <section className="pt-32 pb-12 px-6 max-w-[var(--container-max)] mx-auto">
        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Clients
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6">
          Trusted by paper mills<br />
          <span style={{ background: "linear-gradient(135deg, #10B981, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            since 2000.
          </span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          {indianClients.length}+ Indian paper mills and {intlClients.length} international
          customer{intlClients.length !== 1 ? "s" : ""} run Netique / Papyrus360 software —
          spanning kraft, board, newsprint, tissue, and writing &amp; printing grades.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mb-12">
          {[
            { value: `${CLIENTS.length}+`, label: "Active mill deployments", color: "#10B981" },
            { value: "25+ yrs", label: "Since 2000", color: "#34D399" },
            { value: "Multi", label: "Country footprint", color: "#6EE7B7" },
            { value: "0.5–1.7%", label: "Typical trim saved", color: "#A7F3D0" },
          ].map((m) => (
            <div key={m.label} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-2xl font-black font-mono mb-1" style={{ color: m.color }}>
                {m.value}
              </p>
              <p className="text-xs text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP + LEGEND */}
      <section className="pb-20 px-6 max-w-[var(--container-max)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 relative">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-400 mb-4">
              India + Gulf · {CLIENTS.length} mill deployments
            </p>

            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="w-full h-auto"
              style={{ maxHeight: 540 }}
            >
              <defs>
                <radialGradient id="indiaGlow" cx="70%" cy="50%" r="42%">
                  <stop offset="0%" stopColor="#10B98118" />
                  <stop offset="100%" stopColor="#10B98103" />
                </radialGradient>
                <radialGradient id="gulfGlow" cx="12%" cy="42%" r="20%">
                  <stop offset="0%" stopColor="#FBBF2418" />
                  <stop offset="100%" stopColor="#FBBF2402" />
                </radialGradient>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff05" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={MAP_W} height={MAP_H} fill="url(#grid)" />
              <rect width={MAP_W} height={MAP_H} fill="url(#indiaGlow)" />
              <rect width={MAP_W} height={MAP_H} fill="url(#gulfGlow)" />

              {/* Region labels */}
              <text x={(((46 - 44) / (100 - 44)) * MAP_W)} y={MAP_H - (((24 - 6) / (36 - 6)) * MAP_H) - 32} fontSize="13" fontWeight="700" fill="#FBBF24" letterSpacing="2">
                SAUDI ARABIA
              </text>
              <text x={(((54 - 44) / (100 - 44)) * MAP_W)} y={MAP_H - (((26 - 6) / (36 - 6)) * MAP_H) - 32} fontSize="11" fontWeight="600" fill="#FBBF24" letterSpacing="1.5">
                UAE
              </text>
              <text x={(((75 - 44) / (100 - 44)) * MAP_W)} y={MAP_H - (((22 - 6) / (36 - 6)) * MAP_H) - 32} fontSize="16" fontWeight="800" fill="#10B981" letterSpacing="3">
                INDIA
              </text>

              {/* Connector line India ↔ Gulf */}
              <line
                x1={(((48 - 44) / (100 - 44)) * MAP_W)}
                y1={MAP_H - (((24.7 - 6) / (36 - 6)) * MAP_H)}
                x2={(((72 - 44) / (100 - 44)) * MAP_W)}
                y2={MAP_H - (((20 - 6) / (36 - 6)) * MAP_H)}
                stroke="#FBBF2425"
                strokeWidth="1"
                strokeDasharray="3 4"
              />

              {/* Markers */}
              {Array.from(byCity.entries()).map(([key, group]) => {
                const c = group[0];
                const p = project(c.lat, c.lon);
                const size = 6 + Math.min(group.length * 2, 8);
                const color = c.country === "India" ? "#10B981" : "#FBBF24";
                const pulseColor = c.country === "India" ? "#10B98115" : "#FBBF2418";
                return (
                  <g key={key}>
                    {/* pulse */}
                    <circle cx={p.x} cy={p.y} r={size + 6} fill={pulseColor} />
                    <circle cx={p.x} cy={p.y} r={size} fill={color} stroke="#0a0a0a" strokeWidth="2" />
                    {group.length > 1 && (
                      <text
                        x={p.x}
                        y={p.y + 3}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill="#0a0a0a"
                      >
                        {group.length}
                      </text>
                    )}
                    <text
                      x={p.x + size + 6}
                      y={p.y + 4}
                      fontSize="11"
                      fontWeight="600"
                      fill="#a1a1aa"
                    >
                      {c.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center gap-4 mt-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-500">India · {indianClients.length}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-zinc-500">Gulf · {intlClients.length}</span>
              </span>
              <span className="text-zinc-700">·</span>
              <span className="text-zinc-600">
                markers sized by deployment count
              </span>
            </div>
          </div>

          {/* Side legend */}
          <div className="space-y-4">
            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={14} className="text-amber-400" />
                <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">
                  International ({intlClients.length})
                </p>
              </div>
              <ul className="space-y-3">
                {intlClients.map((c) => (
                  <li key={c.slug} className="flex items-start gap-3">
                    <MapPin size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {c.short}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {c.city}, {c.country}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">
                Coverage by Region
              </p>
              <div className="space-y-2 text-xs">
                {[
                  { region: "West India", states: ["Gujarat", "Maharashtra"], color: "#10B981" },
                  { region: "North India", states: ["Punjab", "Uttar Pradesh"], color: "#34D399" },
                  { region: "South India", states: ["Tamil Nadu", "Andhra Pradesh", "Karnataka"], color: "#6EE7B7" },
                  { region: "East India", states: ["Odisha"], color: "#A7F3D0" },
                  { region: "Gulf", states: ["Riyadh", "Sharjah"], color: "#FBBF24" },
                ].map((r) => {
                  const count = CLIENTS.filter((c) =>
                    r.states.includes(c.state),
                  ).length;
                  if (count === 0) return null;
                  return (
                    <div key={r.region} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: r.color }}
                        />
                        <span className="text-zinc-300">{r.region}</span>
                      </div>
                      <span className="font-mono text-zinc-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT GRID */}
      <section className="pb-20 px-6 max-w-[var(--container-max)] mx-auto">
        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
          The Roster
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-10">
          {CLIENTS.length} mills. One platform partner.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLIENTS.map((c) => (
            <div
              key={c.slug}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {c.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {c.city}, {c.state}
                    {c.country !== "India" && ` · ${c.country}`}
                  </p>
                </div>
                {c.verified && (
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-1" />
                )}
              </div>
              {c.grade && (
                <p className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 inline-block mb-3">
                  {c.grade}
                </p>
              )}
              {c.testimonial && (
                <blockquote className="text-xs text-zinc-400 italic leading-relaxed border-l-2 border-emerald-500/40 pl-3 mb-2">
                  <Quote size={10} className="inline text-emerald-400 mr-1" />
                  {c.testimonial}
                </blockquote>
              )}
              {c.product && (
                <p className="text-[10px] text-zinc-600 font-mono mt-2">
                  Using: {c.product}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-zinc-600 mt-8 font-mono">
          Sources: papyrus360.com/360/success-stories/ and homepage logo wall. Some locations
          approximated and pending confirmation.
        </p>
      </section>

      <CTABanner />
    </div>
  );
}
