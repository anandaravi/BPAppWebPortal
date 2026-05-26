import type { Metadata } from "next";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";

export const metadata: Metadata = {
  title: "ERP for Tissue Paper Mills | Papyrus BPApp",
  description:
    "Tissue and towel paper mill ERP for Indian manufacturers. Manage softness/absorbency specs, parent reel to converted SKU traceability, deckle optimization, and FMCG buyer compliance.",
  alternates: { canonical: "/for/tissue-mill" },
  keywords: [
    "tissue paper mill ERP",
    "tissue mill software India",
    "toilet paper manufacturing ERP",
    "facial tissue ERP",
    "tissue paper deckle optimization",
    "parent reel traceability",
  ],
  openGraph: {
    title: "ERP for Indian Tissue & Towel Paper Mills",
    description: "From parent reel to converted SKU. One platform for tissue mills.",
    url: "/for/tissue-mill",
  },
};

const data: MillTypePageData = {
  millType: "Tissue Paper Mills",
  slug: "tissue-mill",
  hook: "Tissue & towel mill ERP — from parent reel to retail-ready SKU.",
  intro:
    "Tissue and towel paper mills operate on a fundamentally different rhythm: hundreds of consumer SKUs derived from a handful of parent reels, FMCG buyers with strict quality and traceability demands, brand label converters needing batch genealogy for returns, and converting lines that run 24/7. Papyrus BPApp covers the full flow — parent reel production, slitting and rewinding, embossing, perforation, packaging, and final SKU dispatch — all under one platform with full lot traceability.",
  pains: [
    {
      title: "Parent reel → 50+ SKUs with batch genealogy",
      desc: "One parent reel becomes toilet tissue, facial tissue, and kitchen towel SKUs across multiple ply counts and pack sizes. Tracing a complaint back to the parent reel through 4 conversion stages is impossible in Excel.",
    },
    {
      title: "Softness, absorbency, brightness specs vary per buyer",
      desc: "Brand A wants higher softness; Brand B prioritizes absorbency. Lab tests must validate per-buyer specs, not generic limits, with COA per dispatch.",
    },
    {
      title: "Converting line OEE buried in shift reports",
      desc: "Rewinder, embosser, and packing machines each have their own OEE. Without integrated tracking, root cause analysis takes a week and the next shift repeats the same mistakes.",
    },
    {
      title: "FMCG/retail buyers demand barcode + batch + expiry on every carton",
      desc: "Modern trade and e-commerce require GTIN, batch, MFG, EXP, MRP on every secondary pack. Manual labeling slows dispatch and creates compliance risk.",
    },
    {
      title: "Brand label / private label complexity",
      desc: "Same product, multiple labels for different retailers. Artwork management, label approval workflows, and per-label costing are messy without proper master data.",
    },
    {
      title: "Returns and credit notes from organized retail",
      desc: "Modern trade chains reject cartons for label damage, ply mismatches, or batch issues. Without batch traceability, debit note disputes drag on for months.",
    },
  ],
  solutions: [
    {
      title: "Full parent-reel-to-SKU lot traceability",
      desc: "Every parent reel gets a batch ID that follows through slitting, rewinding, embossing, packing, and dispatch. Any complaint or recall traces back to source furnish, machine, shift, and operator in seconds.",
      module: "inventory",
    },
    {
      title: "Per-buyer quality plans",
      desc: "Quality plans are tied to customer master. The lab automatically applies the right spec set per dispatch. Out-of-spec reels are held with full visibility — not buried in a paper register.",
      module: "quality",
    },
    {
      title: "Integrated OEE across converting line",
      desc: "Rewinder, embosser, packing — each machine reports availability, performance, quality losses in real time. Root cause boards run during morning meetings on live data.",
      module: "production",
    },
    {
      title: "Auto barcode/batch/expiry per carton",
      desc: "Product master holds GTIN, MRP, shelf life. Dispatch auto-generates carton labels with batch, MFG, EXP, and lot codes. Compatible with FMCG and modern trade carton-level scanning.",
      module: "product-catalog",
    },
    {
      title: "Multi-label / private label as same product, different SKU",
      desc: "One physical product can have N branded SKUs with separate pricing, packaging, and artwork. Per-SKU costing rolls up artwork, packaging, and labour separately. Artwork approval workflow built into the document module.",
      module: "documents",
    },
    {
      title: "Returns, credit notes, complaint workflow",
      desc: "Customer returns logged with reason codes (damage, label, ply, expiry). Auto-generates credit note with traceability link to original dispatch batch. Helpdesk tickets connect customer complaints to QC investigations.",
      module: "helpdesk",
    },
  ],
  caseSnapshot: {
    headline: "Converting line OEE at a 40 TPD tissue mill (Gujarat)",
    metric: "+18% throughput",
    desc: "Manual shift reports masked persistent embosser downtime patterns. With integrated OEE on Papyrus BPApp, root causes surfaced and were resolved in 8 weeks. Net throughput on the converting line up 18% with no capex.",
  },
  relevantModules: [
    { name: "Production Planning", slug: "production", why: "Parent reel scheduling, multi-stage conversion planning, OEE per machine." },
    { name: "Quality Management", slug: "quality", why: "Per-buyer specs, COA per dispatch, softness/absorbency/brightness tests." },
    { name: "Inventory Management", slug: "inventory", why: "Parent reel to SKU genealogy, batch traceability across 4+ conversion stages." },
    { name: "Product Catalog", slug: "product-catalog", why: "Multi-brand/multi-label SKUs, GTIN, MRP, artwork management, BOM per label." },
    { name: "Deckle Optimizer", slug: "deckle", why: "Slitting plan from parent reel to converting widths with minimum trim." },
    { name: "Sales Management", slug: "sales", why: "Modern trade + GT order management, multi-warehouse dispatch, SKU-level pricing." },
    { name: "Helpdesk", slug: "helpdesk", why: "Complaint logging, credit note workflow, traceability link to QC." },
    { name: "Documents", slug: "documents", why: "Artwork management, label approval workflow, ISO/FSSAI/FDA cert tracking." },
  ],
  faqs: [
    {
      q: "Can Papyrus BPApp handle different ply counts (1-ply, 2-ply, 3-ply) under one product?",
      a: "Yes. Each ply count is a separate SKU under a product family, sharing the parent reel as raw material but with its own BOM, conversion route, and cost. The product catalog supports product → variant → SKU hierarchy natively.",
    },
    {
      q: "How does the system handle modern trade barcode requirements (GS1, EAN-13, ITF-14)?",
      a: "GTIN management at product level supports EAN-13 (consumer pack), ITF-14 (carton), and SSCC (pallet). Carton labels auto-generate at packing with batch + MFG + EXP + MRP. Compatible with major retailer requirements (D-Mart, Reliance, BigBasket, Amazon).",
    },
    {
      q: "We sell through distributors. Each distributor wants different MRP and margin structures.",
      a: "Yes — the Pricing module supports multi-tier pricing (channel-wise, region-wise, distributor-tier-wise) with effective dating. Scheme management (volume rebates, target-based discounts) is built in. Each invoice picks the right price + scheme automatically.",
    },
    {
      q: "Do you support FSSAI / FDA compliance for tissue products that contact skin/food?",
      a: "Yes. Documents module tracks FSSAI, FDA, BIS, ISO certificates with expiry alerts. Quality module ties test parameters to compliance requirements. Audit trail per batch provides regulator-ready traceability.",
    },
    {
      q: "What about the high-speed converting lines that produce 200+ logs/minute? Can the system keep up?",
      a: "Yes. The Production module is event-driven and built for high-frequency event ingestion. Machine PLCs can stream output counts in real time via the IoT module. We've tested with synthetic loads at 500+ events/sec per machine.",
    },
    {
      q: "How long is implementation for a 40 TPD tissue mill with 2 converting lines and 80 SKUs?",
      a: "Typically 6–10 weeks. Week 1–2: masters (SKUs, BOMs, customers, distributors, prices). Week 3–4: parent reel production + quality go live. Week 5–6: converting lines + barcode + dispatch. Week 7–8: finance + GST + e-invoice. Week 9–10: HR + payroll + analytics. We've seen aggressive timelines of 4 weeks with full customer commitment.",
    },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
