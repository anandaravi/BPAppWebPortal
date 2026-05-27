export type ChangelogTag = "feature" | "improvement" | "fix" | "module" | "compliance";

export type ChangelogEntry = {
  date: string;
  version?: string;
  title: string;
  summary: string;
  tags: ChangelogTag[];
  highlights?: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-05-15",
    version: "4.2",
    title: "Deckle Optimizer pattern-learning GA",
    summary:
      "Auto-captures approved plans and learns proven slitting patterns after 10 runs. Plan vs actual reconciliation now ships by default.",
    tags: ["feature", "module"],
    highlights: [
      "Pattern learning auto-enabled after 10 approved plans",
      "Plan-vs-actual reconciliation dashboard",
      "Cutter feasibility check on pocket auto-detection",
    ],
  },
  {
    date: "2026-04-02",
    version: "4.1",
    title: "GSTR-1 auto-filing validator",
    summary:
      "Pre-flight validation catches HSN, taxable-value, and rate mismatches before pushing to GSTN. Reduces rejections to near zero.",
    tags: ["compliance", "improvement"],
  },
  {
    date: "2026-02-18",
    version: "4.0",
    title: "AI Chat — cross-module insights",
    summary:
      "Ask anything across sales, production, and finance in one natural-language query. Auditable history. Configurable per deployment (Claude / Gemini / OpenAI).",
    tags: ["feature", "module"],
  },
  {
    date: "2025-12-10",
    version: "3.9",
    title: "Mobile shop-floor app — ESS/MSS shipped",
    summary:
      "iOS + Android apps for shift handover, attendance, leave, payslip. Works offline; syncs on reconnect.",
    tags: ["feature"],
  },
  {
    date: "2025-10-22",
    version: "3.8",
    title: "Three-way match — auto-approval for low-risk POs",
    summary:
      "PO ↔ GRN ↔ invoice matched within tolerance now auto-approves. Human-in-the-loop preview for exceptions.",
    tags: ["improvement"],
  },
  {
    date: "2025-08-04",
    version: "3.7",
    title: "Trade finance module",
    summary:
      "LC management, invoice discounting, packing credit, ECGC tracking — integrated into AR/AP.",
    tags: ["feature", "module"],
  },
];
