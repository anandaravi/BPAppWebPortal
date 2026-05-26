import { MODULES_DATA, ModuleData } from "./data";
import { PLATFORM_MODULES } from "./platform-data";
import { EXTRA_MODULES } from "./extra-data";

export type { ModuleData };

export const ALL_MODULES: Record<string, ModuleData> = {
  ...MODULES_DATA,
  ...PLATFORM_MODULES,
  ...EXTRA_MODULES,
};

export const CORE_SLUGS = ["sales", "procurement", "production", "deckle", "inventory", "finance", "hr", "ai", "party"];

export const PLATFORM_SLUGS_ORDERED = [
  "administration", "rbac", "email-hub", "notifications", "monitoring",
  "maintenance", "quality", "projects", "automations", "mobile", "documents",
  "product-catalog", "pricing", "lookups", "number-series", "business-profile",
  "approvals", "audit", "lab-master",
];

export const EXTRA_SLUGS = [
  "stock-preparation", "converting-finishing", "broke-management", "recipe-development",
  "crm", "helpdesk", "marketing-automation", "field-service",
  "iot-devices", "digital-twin", "sustainability", "edge-computing",
  "rpa", "voice", "document-intelligence", "engineering-change",
];

export const ALL_SLUGS = [...CORE_SLUGS, ...PLATFORM_SLUGS_ORDERED, ...EXTRA_SLUGS];

export const MODULE_GROUPS = [
  {
    slug: "core-operations",
    title: "Core Operations",
    tagline: "Production, deckle, inventory, quality — the mill floor.",
    slugs: [
      "sales", "procurement", "production", "stock-preparation", "deckle",
      "converting-finishing", "broke-management", "inventory", "quality",
      "maintenance", "lab-master", "recipe-development",
    ],
  },
  {
    slug: "customer-experience",
    title: "Customer Experience",
    tagline: "CRM, helpdesk, marketing, field service.",
    slugs: ["crm", "helpdesk", "marketing-automation", "field-service"],
  },
  {
    slug: "finance-people",
    title: "Finance & People",
    tagline: "GST-native finance and India-compliant HR/payroll.",
    slugs: ["finance", "hr"],
  },
  {
    slug: "master-data",
    title: "Master Data & Documents",
    tagline: "Single source of truth for parties, products, pricing.",
    slugs: [
      "party", "product-catalog", "pricing", "lookups", "number-series",
      "documents", "engineering-change",
    ],
  },
  {
    slug: "intelligence-automation",
    title: "Intelligence & Automation",
    tagline: "AI, RPA, approvals, voice, document intelligence.",
    slugs: ["ai", "automations", "approvals", "rpa", "voice", "document-intelligence", "mobile"],
  },
  {
    slug: "platform",
    title: "Platform & Industry 4.0",
    tagline: "Admin, RBAC, audit, IoT, digital twin, edge.",
    slugs: [
      "administration", "rbac", "audit", "email-hub", "notifications",
      "monitoring", "projects", "business-profile",
      "iot-devices", "digital-twin", "sustainability", "edge-computing",
    ],
  },
];
