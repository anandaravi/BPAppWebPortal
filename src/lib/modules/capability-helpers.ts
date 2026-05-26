import { ALL_MODULES, ModuleData } from "./index";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type CapabilityDetail = {
  moduleSlug: string;
  capabilitySlug: string;
  module: ModuleData;
  capability: { icon: string; title: string; desc: string };
  capabilityIndex: number;
};

export function getCapability(moduleSlug: string, capabilitySlug: string): CapabilityDetail | null {
  const mod = ALL_MODULES[moduleSlug];
  if (!mod) return null;
  const idx = mod.capabilities.findIndex((c) => slugify(c.title) === capabilitySlug);
  if (idx === -1) return null;
  return {
    moduleSlug,
    capabilitySlug,
    module: mod,
    capability: mod.capabilities[idx],
    capabilityIndex: idx,
  };
}

export function getAllCapabilityParams(): { module: string; capability: string }[] {
  const params: { module: string; capability: string }[] = [];
  for (const [moduleSlug, mod] of Object.entries(ALL_MODULES)) {
    for (const cap of mod.capabilities) {
      params.push({ module: moduleSlug, capability: slugify(cap.title) });
    }
  }
  return params;
}

/**
 * Generate a deeper blurb based on capability + module context.
 * Heuristic: combine module name + capability desc into a 2-sentence detail.
 */
export function getCapabilityBlurb(capability: { title: string; desc: string }, module: ModuleData): string {
  return `${capability.desc}. Part of the ${module.name} module — purpose-built for paper manufacturing operations and integrated with the rest of the Papyrus platform.`;
}

/**
 * Generate a generic process flow for any capability.
 * Tailored by detecting common patterns in the title/desc.
 */
export function getProcessFlow(capability: { title: string; desc: string }): { label: string; sub?: string }[] {
  const title = capability.title.toLowerCase();
  const desc = capability.desc.toLowerCase();
  const text = title + " " + desc;

  // Workflow/state-machine pattern
  if (text.includes("workflow") || text.includes("approval") || text.includes("matrix")) {
    return [
      { label: "Trigger", sub: "event" },
      { label: "Route", sub: "by rule" },
      { label: "Approve", sub: "multi-tier" },
      { label: "Execute", sub: "action" },
      { label: "Audit", sub: "logged" },
    ];
  }

  // Tracking/monitoring pattern
  if (text.includes("track") || text.includes("monitor") || text.includes("audit") || text.includes("log")) {
    return [
      { label: "Capture", sub: "event" },
      { label: "Validate", sub: "rules" },
      { label: "Record", sub: "tamper-proof" },
      { label: "Index", sub: "searchable" },
      { label: "Report", sub: "compliance" },
    ];
  }

  // Generation/creation pattern (PDF, reports)
  if (text.includes("generation") || text.includes("auto") || text.includes("template")) {
    return [
      { label: "Configure", sub: "template" },
      { label: "Trigger", sub: "event" },
      { label: "Generate", sub: "from data" },
      { label: "Validate", sub: "rules" },
      { label: "Deliver", sub: "channels" },
    ];
  }

  // Integration/sync pattern
  if (text.includes("integration") || text.includes("sync") || text.includes("hub") || text.includes("api")) {
    return [
      { label: "Connect", sub: "endpoint" },
      { label: "Authenticate", sub: "tokens" },
      { label: "Sync", sub: "scheduled" },
      { label: "Map", sub: "transform" },
      { label: "Persist", sub: "with audit" },
    ];
  }

  // Reporting/analytics pattern
  if (text.includes("report") || text.includes("analytic") || text.includes("dashboard") || text.includes("chart")) {
    return [
      { label: "Collect", sub: "data" },
      { label: "Aggregate", sub: "windows" },
      { label: "Analyze", sub: "rules + ML" },
      { label: "Visualize", sub: "dashboard" },
      { label: "Export", sub: "PDF / CSV" },
    ];
  }

  // Validation/check pattern
  if (text.includes("check") || text.includes("validation") || text.includes("verification") || text.includes("compliance")) {
    return [
      { label: "Define", sub: "rules" },
      { label: "Apply", sub: "to record" },
      { label: "Validate", sub: "real-time" },
      { label: "Block", sub: "if fail" },
      { label: "Log", sub: "outcome" },
    ];
  }

  // Default CRUD-like
  return [
    { label: "Configure", sub: "setup" },
    { label: "Initiate", sub: "action" },
    { label: "Process", sub: "engine" },
    { label: "Review", sub: "approve" },
    { label: "Complete", sub: "audited" },
  ];
}

/**
 * Auto-derive 4-6 key feature points from capability context.
 */
export function getCapabilityFeatures(capability: { title: string; desc: string }, module: ModuleData): string[] {
  // Mine the module's feature sections for any points that mention this capability's keywords
  const titleWords = capability.title.toLowerCase().split(/\s+/);
  const matches: string[] = [];

  for (const feat of module.features) {
    for (const point of feat.points) {
      const lower = point.toLowerCase();
      if (titleWords.some((w) => w.length > 3 && lower.includes(w))) {
        matches.push(point);
      }
    }
  }

  // If we found 4+, return up to 6
  if (matches.length >= 4) return matches.slice(0, 6);

  // Fallback: enrich with generic statements per common patterns
  const baseFeatures = [
    `${capability.desc}`,
    `Audit-logged across every state transition with user, timestamp, and delta`,
    `Multi-tenant aware — scoped per company and branch`,
    `RBAC-protected with field-level access control`,
    `Mobile and desktop interfaces with offline capability`,
    `Notification triggers and SLA monitoring`,
  ];

  return [...matches, ...baseFeatures].slice(0, 6);
}

/**
 * Get related capabilities (siblings within same module).
 */
export function getRelatedCapabilities(detail: CapabilityDetail): { slug: string; icon: string; title: string }[] {
  return detail.module.capabilities
    .filter((_, i) => i !== detail.capabilityIndex)
    .slice(0, 6)
    .map((c) => ({
      slug: slugify(c.title),
      icon: c.icon,
      title: c.title,
    }));
}
