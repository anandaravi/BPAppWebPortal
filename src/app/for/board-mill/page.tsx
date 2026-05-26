import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { MillTypePage, type MillTypePageData } from "@/components/seo/mill-type-page";


const OG = ogImage({
  title: "ERP for Board / Paperboard Paper Mills",
  subtitle: "Multi-ply formers, food-grade compliance, FBB/SBS/CUK",
  tag: "By Mill Type",
  accent: "#A78BFA",
});
export const metadata: Metadata = {
  title: "ERP for Paperboard & Packaging Mills | Papyrus BPApp",
  description:
    "Paperboard and packaging mill ERP for India: multi-ply board, coating lines, FMCG buyer compliance, BIS/FSSAI certifications, deckle and GST.",
  alternates: { canonical: "/for/board-mill" },
  keywords: [
    "paperboard mill ERP",
    "duplex board software India",
    "coated board ERP",
    "packaging paper manufacturing",
    "FMCG packaging board",
  ],
  openGraph: {
    title: "ERP for Indian Paperboard & Packaging Mills",
    description: "Multi-ply board + coating + FMCG compliance + deckle for board mills.",
    url: "/for/board-mill",
    images: [OG],
  },
  twitter: { card: "summary_large_image", images: [OG] },
};

const data: MillTypePageData = {
  millType: "Paperboard & Packaging Mills",
  slug: "board-mill",
  hook: "Multi-ply board, coating lines, FMCG specs — all on one platform.",
  intro:
    "Paperboard and packaging mills face complexity unmatched by other paper segments: multi-ply construction (top liner + filler + back liner), coating and lamination lines, brand-specific specs from FMCG and pharma buyers, BIS and FSSAI certifications, intricate cost rollups across ply and coating stages. Papyrus BPApp's data model handles all of this natively.",
  pains: [
    { title: "Multi-ply BOMs with per-layer specs", desc: "Duplex board = top white liner + grey filler + back. Each layer has its own GSM, brightness, opacity. Excel-based BOMs fail to capture this." },
    { title: "Coating and finishing line cost rollup", desc: "After board, coating (clay, latex), calendering, lamination add cost. Without per-stage tracking, finished board cost is a guess." },
    { title: "FMCG buyer specs and audits", desc: "ITC, HUL, Nestlé, Britannia, P&G all have specific quality standards, audit requirements, and traceability. Manual QC documentation creates audit risk." },
    { title: "BIS, FSSAI, FDA, ISO certifications", desc: "Food-contact board requires FSSAI; pharma needs ISO 15378; export needs FDA. Multi-certification compliance with expiry tracking is overhead-heavy." },
    { title: "Sheet vs reel — both required", desc: "Some customers want reels for converters; others want sheets for offset printers. Two dispatch flows, two pricing structures." },
    { title: "Multi-customer batch traceability", desc: "Same board run serves 5+ FMCG customers. Complaint or recall must trace back through coating, board, and pulp." },
  ],
  solutions: [
    { title: "Multi-ply BOM with per-layer specs", desc: "Native multi-ply construction. Each layer has independent furnish, GSM, brightness, additives. Cost rolls up correctly through ply combinations.", module: "product-catalog" },
    { title: "Multi-stage cost accounting", desc: "Board production → coating → calendering → lamination → sheeting. Each stage has BOM, labour, energy. Finished SKU cost reflects all stages.", module: "finance" },
    { title: "Per-FMCG-buyer quality plans", desc: "Quality plans tied to buyer master. ITC plan ≠ HUL plan ≠ Nestlé plan. Lab auto-applies right specs per dispatch. Audit-ready COAs.", module: "quality" },
    { title: "Multi-certification document management", desc: "BIS, FSSAI, FDA, ISO 15378, BRC certs tracked with expiry alerts. Audit-ready document packs auto-generated.", module: "documents" },
    { title: "Reel + sheet dispatch in same system", desc: "Same product can dispatch as reel (for converters) or sheet (for printers) with different pricing, packaging, and SKU structures.", module: "product-catalog" },
    { title: "Customer-allocated batch traceability", desc: "From pulp to coating to packed carton, every batch links to source. FMCG audit query resolved in minutes.", module: "inventory" },
  ],
  caseSnapshot: {
    headline: "Cost transparency at a 90 TPD duplex board mill (Gujarat)",
    metric: "Full SKU cost in 1 hour",
    desc: "Previously, cost-per-SKU of coated board (3+ stage rollup) was calculated 20 days into next month. With Papyrus BPApp, full SKU costing (including ply, coating, calendering, packaging) is visible at shift end. Enabling same-day quoting and product-mix decisions.",
  },
  relevantModules: [
    { name: "Production Planning", slug: "production", why: "Multi-ply board + coating + finishing line scheduling, OEE per stage." },
    { name: "Product Catalog", slug: "product-catalog", why: "Multi-ply BOMs, sheet vs reel SKUs, FMCG-specific specs." },
    { name: "Quality Management", slug: "quality", why: "Per-buyer specs, BIS/FSSAI compliance tests, batch-level traceability." },
    { name: "Documents", slug: "documents", why: "BIS, FSSAI, FDA, ISO certs with expiry; artwork management for branded boards." },
    { name: "Finance & GST", slug: "finance", why: "Multi-stage costing, GST e-invoice, e-way bill, FMCG payment terms." },
    { name: "Inventory Management", slug: "inventory", why: "Reel + sheet stocks, FMCG batch genealogy, FIFO with quality holds." },
    { name: "Sales Management", slug: "sales", why: "FMCG order management, reel/sheet dispatch, modern trade compliance." },
    { name: "Deckle Optimizer", slug: "deckle", why: "Board slitting plan with customer-specific reel widths and edge trim." },
  ],
  faqs: [
    { q: "Does Papyrus BPApp handle coated and uncoated board on same machine?", a: "Yes. Production module tracks machine state including coating online/offline, with cost rollups distinguishing coated vs uncoated SKUs even on shared machine time." },
    { q: "Can we manage multiple FMCG brand specs simultaneously?", a: "Yes. Customer master holds brand-specific quality plans, packaging, dispatch labels, and pricing. Same physical board can be packed and labeled for 5+ brands; each dispatch correctly tagged." },
    { q: "BIS/FSSAI/FDA compliance tracking?", a: "Documents module tracks all certifications with expiry alerts. Quality module ties test parameters to compliance requirements. Audit packs (cert + test data + batch records) auto-generated for regulator queries." },
    { q: "Multi-mill board groups — multi-plant support?", a: "Yes. Native multi-plant. Each board mill operates independently with consolidated head-office reporting. Inter-plant transfers (semi-finished reels) with full traceability." },
    { q: "Implementation timeline for a 80 TPD coated board mill?", a: "8–12 weeks. Includes coating line and lamination integration if applicable." },
  ],
};

export default function Page() {
  return <MillTypePage data={data} />;
}
