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
const MAP_W = 900;
const MAP_H = 480;
function project(lat: number, lon: number) {
  const { minLon, maxLon, minLat, maxLat } = INDIA_BBOX;
  const x = ((lon - minLon) / (maxLon - minLon)) * MAP_W;
  const y = MAP_H - ((lat - minLat) / (maxLat - minLat)) * MAP_H;
  return { x, y };
}

// Build SVG path string from array of [lat, lon] waypoints
function poly(points: [number, number][]) {
  return points
    .map(([lat, lon], i) => {
      const { x, y } = project(lat, lon);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ") + " Z";
}

// India mainland outline (~80 waypoints, clockwise from J&K)
// Schematic but recognizable — projected via shared project()
const INDIA_OUTLINE: [number, number][] = [
  // North (J&K → Himachal → Uttarakhand)
  [35.5, 74.5], [35.0, 76.0], [34.5, 77.5], [34.0, 78.5],
  [33.0, 79.0], [32.5, 78.5], [31.5, 78.5], [30.5, 80.0],
  // Nepal border (sub-himalayan curve)
  [29.5, 80.5], [28.5, 81.5], [28.0, 83.5], [27.5, 85.5],
  [27.0, 87.0], [27.0, 88.0],
  // Sikkim → Bhutan → Arunachal
  [27.5, 88.5], [27.0, 89.5], [27.0, 91.0], [27.5, 92.5],
  [28.0, 94.0], [28.5, 95.5], [29.0, 96.5], [28.0, 97.0],
  [27.0, 97.0], [26.5, 96.0],
  // Northeast (Nagaland → Mizoram)
  [25.5, 95.0], [24.5, 94.5], [23.5, 94.0], [22.5, 93.5],
  [22.0, 93.0], [22.0, 92.5], [23.0, 92.0], [24.0, 92.5],
  [25.0, 92.0],
  // Bangladesh border + Bengal
  [25.0, 90.5], [24.5, 89.5], [23.0, 88.5], [22.0, 88.5],
  // East coast — Odisha
  [21.5, 87.5], [20.5, 86.5], [19.0, 85.0],
  // Andhra coast
  [17.0, 82.5], [15.5, 80.5], [14.0, 80.0], [13.0, 80.3],
  // Tamil Nadu coast
  [11.5, 79.8], [10.5, 79.5], [9.5, 79.0], [8.5, 78.0],
  [8.0, 77.5],
  // Kerala coast
  [8.5, 76.5], [9.5, 76.3], [10.5, 76.0], [12.0, 75.0],
  [13.5, 74.5],
  // Karnataka + Maharashtra coast
  [14.5, 74.0], [15.0, 73.8], [16.5, 73.0], [18.0, 72.8],
  [19.0, 72.5], [20.0, 72.7], [20.5, 72.8],
  // Gujarat coast (Daman → Surat → Saurashtra)
  [21.0, 72.5], [21.5, 72.0], [22.0, 70.0], [22.5, 69.5],
  [22.0, 69.0], [21.5, 68.5], [22.0, 68.5],
  // Kutch + west
  [22.5, 68.5], [23.0, 68.5], [23.5, 68.5], [23.5, 70.0],
  [24.5, 70.5], [25.0, 70.0], [25.5, 70.5], [26.5, 70.5],
  // Rajasthan/Punjab
  [27.5, 70.0], [28.5, 70.5], [29.5, 73.0], [30.5, 74.5],
  [31.5, 74.5], [32.5, 75.5],
  // Back to J&K
  [33.5, 74.5], [34.0, 74.0], [34.5, 73.5], [35.0, 74.0],
  [35.5, 74.5],
];

// Saudi Arabia rough outline (clockwise)
const SAUDI_OUTLINE: [number, number][] = [
  [32, 39], [32, 47], [29, 48], [26, 50], [22, 52], [19, 52], [17, 51],
  [16, 47], [17, 43], [21, 39], [25, 36], [29, 35], [31, 36], [32, 39],
];

// UAE rough outline
const UAE_OUTLINE: [number, number][] = [
  [26, 51], [26, 56], [25, 56], [23, 56], [22, 55], [22, 51], [24, 51], [26, 51],
];

// Bangalore HQ
const HQ = { lat: 12.9716, lon: 77.5946, name: "Bangalore", label: "Netique HQ" };

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
              style={{ maxHeight: 560 }}
            >
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff05" strokeWidth="1" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" opacity="0.5" />
                </marker>
              </defs>
              <rect width={MAP_W} height={MAP_H} fill="url(#grid)" />

              {/* Country bodies */}
              <path d={poly(INDIA_OUTLINE)} fill="#10B98114" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d={poly(SAUDI_OUTLINE)} fill="#FBBF2412" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d={poly(UAE_OUTLINE)} fill="#F9731612" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Country labels */}
              {(() => {
                const i = project(22, 79);
                const s = project(24, 44);
                const u = project(24.5, 54.5);
                return (
                  <g>
                    <text x={i.x} y={i.y} fontSize="22" fontWeight="900" fill="#10B981" opacity="0.5" letterSpacing="6">INDIA</text>
                    <text x={s.x} y={s.y} fontSize="13" fontWeight="700" fill="#FBBF24" opacity="0.55" letterSpacing="2.5">SAUDI ARABIA</text>
                    <text x={u.x - 18} y={u.y + 24} fontSize="10" fontWeight="700" fill="#F97316" opacity="0.7" letterSpacing="2">UAE</text>
                  </g>
                );
              })()}

              {/* HQ → City connection lines (one per city, not per client) */}
              {(() => {
                const hq = project(HQ.lat, HQ.lon);
                return Array.from(byCity.entries()).map(([key, group]) => {
                  const c = group[0];
                  const p = project(c.lat, c.lon);
                  return (
                    <line
                      key={`line-${key}`}
                      x1={hq.x}
                      y1={hq.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="#F59E0B"
                      strokeWidth="0.7"
                      strokeOpacity="0.35"
                      strokeDasharray="2 3"
                    />
                  );
                });
              })()}

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

              {/* HQ marker (Bangalore) */}
              {(() => {
                const hq = project(HQ.lat, HQ.lon);
                return (
                  <g>
                    <circle cx={hq.x} cy={hq.y} r="18" fill="#F59E0B12" />
                    <circle cx={hq.x} cy={hq.y} r="12" fill="#F59E0B25" />
                    <circle cx={hq.x} cy={hq.y} r="7" fill="#F59E0B" stroke="#0a0a0a" strokeWidth="2.5" />
                    <text x={hq.x + 12} y={hq.y - 8} fontSize="11" fontWeight="800" fill="#FBBF24" letterSpacing="1">
                      NETIQUE HQ
                    </text>
                    <text x={hq.x + 12} y={hq.y + 5} fontSize="10" fontWeight="600" fill="#a1a1aa">
                      Bangalore
                    </text>
                  </g>
                );
              })()}
            </svg>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                <span className="text-zinc-400 font-semibold">Bangalore HQ</span>
              </span>
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
                dotted lines = HQ to client cities
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
                  { region: "East India", states: ["Odisha", "West Bengal"], color: "#A7F3D0" },
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
