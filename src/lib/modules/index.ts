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
    title: "Core Operations",
    slugs: [
      "sales", "procurement", "production", "stock-preparation", "deckle",
      "converting-finishing", "broke-management", "inventory", "quality",
      "maintenance", "lab-master", "recipe-development",
    ],
  },
  {
    title: "Customer Experience",
    slugs: ["crm", "helpdesk", "marketing-automation", "field-service"],
  },
  {
    title: "Finance & People",
    slugs: ["finance", "hr"],
  },
  {
    title: "Master Data & Documents",
    slugs: [
      "party", "product-catalog", "pricing", "lookups", "number-series",
      "documents", "engineering-change",
    ],
  },
  {
    title: "Intelligence & Automation",
    slugs: ["ai", "automations", "approvals", "rpa", "voice", "document-intelligence", "mobile"],
  },
  {
    title: "Platform & Industry 4.0",
    slugs: [
      "administration", "rbac", "audit", "email-hub", "notifications",
      "monitoring", "projects", "business-profile",
      "iot-devices", "digital-twin", "sustainability", "edge-computing",
    ],
  },
];
