import type { Metadata } from "next";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";

export const metadata: Metadata = {
  title: "ERP for Newsprint Mills | Papyrus BPApp",
  description:
    "Newsprint mill ERP for India: high-speed paper machine OEE, FTA import competition handling, large-roll dispatch, GST compliance.",
  alternates: { canonical: "/for/newsprint-mill" },
  keywords: [
    "newsprint mill ERP",
    "newsprint software India",
    "newspaper paper manufacturing",
    "newsprint deckle optimization",
    "high-speed paper machine ERP",
  ],
  openGraph: {
    title: "ERP for Indian Newsprint Mills",
    description: "High-speed machine OEE + FTA import handling + GST for newsprint mills.",
    url: "/for/newsprint-mill",
  },
};

const data: MillTypePageData = {
  millType: "Newsprint Mills",
  slug: "newsprint-mill",
  hook: "Newsprint mill ERP — built for high-speed machines and razor-thin margins.",
  intro:
    "Newsprint mills run the fastest paper machines in India (1200–1800 m/min) on razor-thin margins, competing with imports under SAFTA/AIFTA agreements. Every percent of OEE matters; every kg of trim matters; every rupee of working capital matters. Papyrus BPApp gives newsprint mill owners the operational visibility and cost discipline this segment demands.",
  pains: [
    { title: "FTA import competition kills margins", desc: "Bangladesh, Indonesia, ASEAN newsprint imports under FTA undercut Indian prices. Even ₹500/ton matters. Working capital, OEE, and trim losses become survival metrics." },
    { title: "High-speed machine downtime is expensive", desc: "At 1500 m/min on a 6m deckle, 10 minutes downtime = 6+ tons lost. Most mills don't know real-time why machines stop." },
    { title: "Bulky reel logistics for newspaper publishers", desc: "Newspaper customers want consistent 700-900 mm reels with tight tolerances. Misaligned slits mean rejections at press." },
    { title: "Recycled fibre quality variability", desc: "ONP/OMG waste paper quality swings hurt brightness and printability. Without batch-level tracking, complaints take days to root-cause." },
    { title: "Newsprint excise + GST + customs duties", desc: "Newsprint has specific duty/GST rules; pulp imports often via FTA. Compliance complexity is high." },
    { title: "Publisher payment cycles and credit risk", desc: "Newspaper publishers often pay 60-90 days. Credit limits, dunning, and bad debt management are critical." },
  ],
  solutions: [
    { title: "Real-time OEE per machine, per shift", desc: "Availability × Performance × Quality tracked on shop floor dashboards. Downtime reason codes captured at the machine. Root cause boards run on live data, not yesterday's spreadsheet.", module: "production" },
    { title: "Deckle optimization for newspaper widths", desc: "Reel-width specs from publisher master flow into the deckle plan. Minimum-trim plans respect press machine compatibility.", module: "deckle" },
    { title: "Recycled fibre quality tracking", desc: "ONP/OMG/mixed waste paper logged at receipt with quality readings. Brightness and printability tracked per batch, linked to finished reel quality.", module: "quality" },
    { title: "Publisher master with credit + payment terms", desc: "Newspaper customer master holds reel specs, packaging requirements, credit limits, payment terms. Receivables aging visible in real time.", module: "sales" },
    { title: "FTA-aware procurement and costing", desc: "Pulp imports tracked with FTA/non-FTA pricing. Customs duty, IGST on imports calculated. Cost rollup reflects true landed cost.", module: "procurement" },
    { title: "Energy-aware cost per ton", desc: "Energy is 25-35% of newsprint cost. Energy meters integrated. Cost per ton tracked daily for pricing and benchmarking.", module: "sustainability" },
  ],
  caseSnapshot: {
    headline: "OEE improvement at a North Indian newsprint mill",
    metric: "+9.2 OEE points in 90 days",
    desc: "From 58% to 67.2% OEE on the main newsprint machine within 3 months of go-live. Achieved through downtime visibility + faster shift handover + machine speed monitoring. Net +14 TPD output on same machine with zero capex.",
  },
  relevantModules: [
    { name: "Production Planning", slug: "production", why: "Real-time OEE, downtime, shift handover for high-speed machines." },
    { name: "Deckle Optimizer", slug: "deckle", why: "Newspaper width optimization with press-machine compatibility." },
    { name: "Quality Management", slug: "quality", why: "Brightness, printability, ash content tracking; recycled fibre quality." },
    { name: "Procurement", slug: "procurement", why: "FTA-aware pulp imports, customs duty handling, waste paper procurement." },
    { name: "Sales Management", slug: "sales", why: "Publisher master, credit management, reel-spec compliance." },
    { name: "Sustainability & ESG", slug: "sustainability", why: "Energy tracking per ton; biomass/recycled fibre footprint reporting." },
    { name: "Maintenance", slug: "maintenance", why: "PM and predictive maintenance for high-speed machine bearings, dryer cylinders, calenders." },
    { name: "Inventory Management", slug: "inventory", why: "Bulky reel storage, FIFO dispatch, publisher allocation." },
  ],
  faqs: [
    { q: "Can the system handle 1500+ m/min machine telemetry?", a: "Yes. The IoT module is event-driven with PostgreSQL + Redis + BullMQ stack — designed for high-frequency event ingestion. Tested at 1000+ events/sec per machine in synthetic loads." },
    { q: "How does it handle pulp imports under SAFTA/AIFTA?", a: "Procurement module supports country-of-origin tracking, FTA preferential duty rates, customs duty calculation, and IGST on imports. Documentation (BOE, BL, COO) attached at item-level for audit." },
    { q: "What about newspaper publisher specific dispatch tracking?", a: "Sales module tracks reel-spec per publisher, dispatch by truck/rail, weighbridge integration, e-way bill, and timely delivery KPIs (newspaper publishers require dawn deliveries)." },
    { q: "Can we run newsprint and writing paper on same platform?", a: "Yes. Grade master supports multiple paper categories. Production planning, deckle, and quality all handle grade transitions on the same machine." },
    { q: "Implementation timeline for a 200 TPD newsprint mill?", a: "8–14 weeks. Phase 1 (4 weeks): finance + sales + procurement. Phase 2 (4 weeks): production + OEE + deckle + quality. Phase 3 (4–6 weeks): IoT integration + advanced analytics + AI." },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
