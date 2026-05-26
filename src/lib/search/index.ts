import { ALL_MODULES } from "@/lib/modules";
import { slugify } from "@/lib/modules/capability-helpers";
import { ARTICLES } from "@/lib/blog/articles";
import { CITIES } from "@/lib/cities";
import { STATES } from "@/lib/states";
import { CASE_STUDIES } from "@/lib/case-studies";

export type SearchEntry = {
  title: string;
  subtitle: string;
  url: string;
  type:
    | "Page"
    | "Module"
    | "Capability"
    | "Compare"
    | "Mill Type"
    | "City"
    | "State"
    | "Blog"
    | "Case Study"
    | "Glossary";
  keywords: string;
};

const STATIC_PAGES: SearchEntry[] = [
  { title: "Home", subtitle: "Papyrus BPApp overview", url: "/", type: "Page", keywords: "home overview landing" },
  { title: "Product", subtitle: "All 44 modules", url: "/product", type: "Page", keywords: "modules product 44" },
  { title: "Features", subtitle: "Browse 396 capabilities", url: "/features", type: "Page", keywords: "features capabilities" },
  { title: "Architecture", subtitle: "Cloud-native multi-tenant architecture", url: "/architecture", type: "Page", keywords: "architecture cloud postgres node redis" },
  { title: "Technical", subtitle: "Stack and engineering details", url: "/technical", type: "Page", keywords: "technical stack postgres nodejs nextjs" },
  { title: "Integrations", subtitle: "ERP connectors and APIs", url: "/integrations", type: "Page", keywords: "integrations connectors api rest sap oracle tally" },
  { title: "Pricing", subtitle: "Indicative annual cost · ₹4–12L small mill", url: "/pricing", type: "Page", keywords: "pricing cost lakh tco annual subscription" },
  { title: "Compare", subtitle: "vs Greycon, SAP, Tally + 10 more", url: "/compare", type: "Page", keywords: "compare versus vs competitor alternative" },
  { title: "By Mill Type", subtitle: "Kraft, Tissue, Newsprint, Board, Recycled, Integrated", url: "/for", type: "Page", keywords: "mill type kraft tissue newsprint board recycled integrated" },
  { title: "Who It's For", subtitle: "Customer profiles", url: "/customers", type: "Page", keywords: "customers buyers profiles" },
  { title: "By Role", subtitle: "Solutions per role", url: "/solutions", type: "Page", keywords: "solutions role cfo planner cto plant manager" },
  { title: "Resources", subtitle: "Videos, guides, presentations", url: "/resources", type: "Page", keywords: "resources videos guides webinars" },
  { title: "Blog", subtitle: "Articles and reference guides", url: "/blog", type: "Page", keywords: "blog articles" },
  { title: "Case Studies", subtitle: "Real mill outcomes", url: "/case-studies", type: "Page", keywords: "case studies outcomes customers" },
  { title: "Glossary", subtitle: "Paper mill + ERP terms", url: "/glossary", type: "Page", keywords: "glossary terms definitions" },
  { title: "FAQ", subtitle: "Common questions", url: "/faq", type: "Page", keywords: "faq questions answers" },
  { title: "Implementation", subtitle: "4–12 week rollout plan", url: "/implementation", type: "Page", keywords: "implementation rollout onboarding go-live" },
  { title: "ROI Calculator", subtitle: "Estimate trim waste savings", url: "/roi-calculator", type: "Page", keywords: "roi calculator savings deckle trim" },
  { title: "ERP by City", subtitle: "15 paper mill hubs", url: "/erp-for-paper-mills", type: "Page", keywords: "city hubs vapi coimbatore yamunanagar" },
  { title: "About", subtitle: "Built by Netique Infotech · Papyrus360", url: "/about", type: "Page", keywords: "about netique papyrus360 heritage company" },
  { title: "Contact", subtitle: "Request a demo", url: "/contact", type: "Page", keywords: "contact demo email request" },
];

export function getSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [...STATIC_PAGES];

  // Modules
  for (const m of Object.values(ALL_MODULES)) {
    entries.push({
      title: m.name,
      subtitle: m.tag,
      url: `/product/${m.slug}`,
      type: "Module",
      keywords: `${m.name} ${m.tag} ${m.blurb} module`,
    });
    // Capabilities
    for (const c of m.capabilities) {
      entries.push({
        title: c.title,
        subtitle: `${m.name} · capability`,
        url: `/product/${m.slug}/${slugify(c.title)}`,
        type: "Capability",
        keywords: `${c.title} ${c.desc} ${m.name}`,
      });
    }
  }

  // /vs/* — derive from competitor data; static list since shape varies
  const VS: { slug: string; name: string; tagline: string }[] = [
    { slug: "greycon", name: "Greycon", tagline: "Global trim optimization specialist" },
    { slug: "sap-mill-products", name: "SAP S/4HANA Mill Products", tagline: "Enterprise-scale global ERP" },
    { slug: "tally", name: "Tally", tagline: "India's most popular accounting software" },
    { slug: "dataman", name: "Dataman", tagline: "European paper mill execution specialist" },
    { slug: "optivision", name: "Optivision", tagline: "Enterprise paper mill MES (Honeywell)" },
    { slug: "infor-ln", name: "Infor LN", tagline: "Mid-market manufacturing ERP" },
    { slug: "oracle-jde", name: "Oracle JDE", tagline: "Mid-large enterprise ERP" },
    { slug: "marg", name: "Marg", tagline: "Popular Indian SMB ERP" },
    { slug: "microsoft-dynamics", name: "Microsoft Dynamics 365", tagline: "Microsoft's cloud ERP" },
    { slug: "sap-business-one", name: "SAP Business One", tagline: "SAP's SMB ERP suite" },
    { slug: "netsuite", name: "NetSuite", tagline: "Cloud ERP for SMB to mid-market" },
    { slug: "epicor", name: "Epicor", tagline: "Mid-market manufacturing ERP" },
    { slug: "processpro", name: "ProcessPro", tagline: "Process manufacturing ERP" },
  ];
  for (const v of VS) {
    entries.push({
      title: `vs ${v.name}`,
      subtitle: v.tagline,
      url: `/vs/${v.slug}`,
      type: "Compare",
      keywords: `${v.name} alternative compare vs versus ${v.tagline}`,
    });
  }

  // Mill types
  const MILLS: { slug: string; name: string; tagline: string }[] = [
    { slug: "kraft-mill", name: "Kraft Mill", tagline: "BF/BS quality, packaging buyers" },
    { slug: "tissue-mill", name: "Tissue Mill", tagline: "Soft furnish, hygiene converters" },
    { slug: "integrated-mill", name: "Integrated Mill", tagline: "Pulping + papermaking on one campus" },
    { slug: "newsprint-mill", name: "Newsprint Mill", tagline: "High-speed PMs, DIP furnish" },
    { slug: "board-mill", name: "Board Mill", tagline: "Multi-ply, food-grade, FBB/SBS/CUK" },
    { slug: "recycled-mill", name: "Recycled Mill", tagline: "Waste-paper procurement, RCM transport" },
  ];
  for (const m of MILLS) {
    entries.push({
      title: m.name,
      subtitle: m.tagline,
      url: `/for/${m.slug}`,
      type: "Mill Type",
      keywords: `${m.name} ${m.tagline} mill type`,
    });
  }

  // Cities
  for (const c of Object.values(CITIES)) {
    entries.push({
      title: `${c.name} paper mills`,
      subtitle: `${c.state} · ${c.region} India · ${c.primaryGrades.slice(0, 2).join(", ")}`,
      url: `/erp-for-paper-mills/${c.slug}`,
      type: "City",
      keywords: `${c.name} ${c.state} ${c.region} ${c.primaryGrades.join(" ")} paper mill cluster`,
    });
  }

  // States
  for (const s of Object.values(STATES)) {
    entries.push({
      title: `${s.name} paper mills`,
      subtitle: `${s.cities.length} hubs · ${s.region} India`,
      url: `/erp-for-paper-mills/by-state/${s.slug}`,
      type: "State",
      keywords: `${s.name} ${s.region} ${s.cities.map((c) => c.name).join(" ")} state paper mill`,
    });
  }

  // Blog articles
  for (const a of Object.values(ARTICLES)) {
    entries.push({
      title: a.title,
      subtitle: a.subtitle || a.description,
      url: `/blog/${a.slug}`,
      type: "Blog",
      keywords: `${a.title} ${a.subtitle || ""} ${(a.tags || []).join(" ")} ${a.description}`,
    });
  }

  // Case studies (published only)
  for (const c of Object.values(CASE_STUDIES)) {
    if (c.status !== "published") continue;
    entries.push({
      title: c.title,
      subtitle: `${c.millType} · ${c.location}`,
      url: `/case-studies/${c.slug}`,
      type: "Case Study",
      keywords: `${c.title} ${c.subtitle} ${c.millType} ${c.location} ${c.modules.join(" ")}`,
    });
  }

  return entries;
}

export function searchEntries(query: string, entries: SearchEntry[], limit = 20): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  type Scored = { entry: SearchEntry; score: number };
  const scored: Scored[] = [];

  for (const e of entries) {
    const haystack = `${e.title} ${e.subtitle} ${e.keywords} ${e.type}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (e.title.toLowerCase() === t) score += 100;
      if (e.title.toLowerCase().startsWith(t)) score += 40;
      if (e.title.toLowerCase().includes(t)) score += 20;
      if (e.subtitle.toLowerCase().includes(t)) score += 8;
      if (haystack.includes(t)) score += 3;
    }
    if (score > 0) scored.push({ entry: e, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
