// Module relevance matrix per mill type + tier inclusion.
// "core"/"recommended"/"optional" — relevance, not licensing.
// Tier: which deployment tier includes it (Essential / Growth / Enterprise).

export type Relevance = "core" | "recommended" | "optional" | "n/a";
export type Tier = "essential" | "growth" | "enterprise";

export const MILL_TYPES = [
  { slug: "kraft", label: "Kraft" },
  { slug: "duplex", label: "Duplex Board" },
  { slug: "writing", label: "Writing & Printing" },
  { slug: "newsprint", label: "Newsprint" },
  { slug: "tissue", label: "Tissue" },
  { slug: "specialty", label: "Specialty" },
] as const;

export type MillTypeSlug = (typeof MILL_TYPES)[number]["slug"];

// Default: core for all mill types
const ALL_CORE: Record<MillTypeSlug, Relevance> = {
  kraft: "core",
  duplex: "core",
  writing: "core",
  newsprint: "core",
  tissue: "core",
  specialty: "core",
};

const REC = (overrides: Partial<Record<MillTypeSlug, Relevance>>): Record<MillTypeSlug, Relevance> => ({
  ...{
    kraft: "recommended",
    duplex: "recommended",
    writing: "recommended",
    newsprint: "recommended",
    tissue: "recommended",
    specialty: "recommended",
  },
  ...overrides,
});

const OPT = (overrides: Partial<Record<MillTypeSlug, Relevance>>): Record<MillTypeSlug, Relevance> => ({
  ...{
    kraft: "optional",
    duplex: "optional",
    writing: "optional",
    newsprint: "optional",
    tissue: "optional",
    specialty: "optional",
  },
  ...overrides,
});

export type MatrixEntry = {
  slug: string;
  category: "Core Ops" | "Customer" | "Finance/People" | "Platform" | "Intelligence";
  relevance: Record<MillTypeSlug, Relevance>;
  tier: Tier;
};

// 44 entries
export const MODULE_MATRIX: MatrixEntry[] = [
  // CORE OPERATIONS
  { slug: "sales", category: "Core Ops", relevance: ALL_CORE, tier: "essential" },
  { slug: "procurement", category: "Core Ops", relevance: ALL_CORE, tier: "essential" },
  { slug: "production", category: "Core Ops", relevance: ALL_CORE, tier: "essential" },
  { slug: "stock-preparation", category: "Core Ops", relevance: REC({ tissue: "core", writing: "core", duplex: "core" }), tier: "growth" },
  { slug: "deckle", category: "Core Ops", relevance: REC({ kraft: "core", duplex: "core", writing: "core", specialty: "core", newsprint: "optional", tissue: "optional" }), tier: "growth" },
  { slug: "converting-finishing", category: "Core Ops", relevance: REC({ tissue: "core", writing: "core", specialty: "core" }), tier: "growth" },
  { slug: "broke-management", category: "Core Ops", relevance: REC({ writing: "core", duplex: "core" }), tier: "growth" },
  { slug: "inventory", category: "Core Ops", relevance: ALL_CORE, tier: "essential" },
  { slug: "quality", category: "Core Ops", relevance: ALL_CORE, tier: "essential" },
  { slug: "maintenance", category: "Core Ops", relevance: REC({}), tier: "growth" },
  { slug: "lab-master", category: "Core Ops", relevance: REC({ writing: "core", specialty: "core", duplex: "core" }), tier: "growth" },
  { slug: "recipe-development", category: "Core Ops", relevance: OPT({ specialty: "core", writing: "recommended" }), tier: "enterprise" },

  // CUSTOMER EXPERIENCE
  { slug: "crm", category: "Customer", relevance: REC({}), tier: "growth" },
  { slug: "helpdesk", category: "Customer", relevance: OPT({}), tier: "growth" },
  { slug: "marketing-automation", category: "Customer", relevance: OPT({}), tier: "enterprise" },
  { slug: "field-service", category: "Customer", relevance: OPT({ specialty: "recommended" }), tier: "enterprise" },

  // FINANCE & PEOPLE
  { slug: "finance", category: "Finance/People", relevance: ALL_CORE, tier: "essential" },
  { slug: "hr", category: "Finance/People", relevance: ALL_CORE, tier: "essential" },
  { slug: "party", category: "Finance/People", relevance: ALL_CORE, tier: "essential" },
  { slug: "pricing", category: "Finance/People", relevance: REC({}), tier: "growth" },

  // PLATFORM
  { slug: "administration", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "rbac", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "audit", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "approvals", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "email-hub", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "notifications", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "monitoring", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "documents", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "mobile", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "product-catalog", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "lookups", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "number-series", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "business-profile", category: "Platform", relevance: ALL_CORE, tier: "essential" },
  { slug: "automations", category: "Platform", relevance: REC({}), tier: "growth" },
  { slug: "projects", category: "Platform", relevance: OPT({}), tier: "enterprise" },
  { slug: "engineering-change", category: "Platform", relevance: OPT({ specialty: "recommended" }), tier: "enterprise" },

  // INTELLIGENCE / FUTURE
  { slug: "ai", category: "Intelligence", relevance: REC({}), tier: "growth" },
  { slug: "iot-devices", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
  { slug: "digital-twin", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
  { slug: "sustainability", category: "Intelligence", relevance: OPT({ writing: "recommended", duplex: "recommended" }), tier: "enterprise" },
  { slug: "edge-computing", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
  { slug: "rpa", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
  { slug: "voice", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
  { slug: "document-intelligence", category: "Intelligence", relevance: OPT({}), tier: "enterprise" },
];
