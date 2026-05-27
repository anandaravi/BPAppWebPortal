#!/usr/bin/env node
// Generates dark-themed SVG flow diagrams for Papyrus BPApp
// Output: public/images/diagrams/*.svg

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/images/diagrams");
mkdirSync(OUT, { recursive: true });

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0a0a",
  bg2: "#141414",
  bg3: "#1a1a1a",
  border: "#2a2a2a",
  border2: "#333333",
  amber: "#F59E0B",
  amberDim: "#F59E0B22",
  emerald: "#10B981",
  emeraldDim: "#10B98122",
  red: "#EF4444",
  redDim: "#EF444422",
  blue: "#3B82F6",
  blueDim: "#3B82F622",
  orange: "#F97316",
  orangeDim: "#F9731622",
  purple: "#8B5CF6",
  purpleDim: "#8B5CF622",
  zinc: "#71717A",
  zincDim: "#71717A22",
  text1: "#FAFAFA",
  text2: "#A1A1AA",
  text3: "#71717A",
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function svg(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>text { font-family: ${T.font}; }</style>
  </defs>
  <rect width="${width}" height="${height}" fill="${T.bg}" rx="12"/>
  ${content}
</svg>`;
}

function label(x, y, text, opts = {}) {
  const { size = 13, fill = T.text1, weight = "600", anchor = "middle", mono = false } = opts;
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" font-family="${mono ? T.mono : T.font}">${text}</text>`;
}

function subLabel(x, y, text) {
  return label(x, y, text, { size: 10, fill: T.text3, weight: "500" });
}

function badge(x, y, w, h, text, sub, color, dimColor, rx = 10) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${dimColor}" stroke="${color}" stroke-width="1.5"/>
${label(x + w / 2, y + h / 2 - (sub ? 7 : 0), text, { size: 12, fill: color })}
${sub ? subLabel(x + w / 2, y + h / 2 + 10, sub) : ""}`;
}

function arrow(x1, y1, x2, y2, color = T.border2) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  const ax = x2 - ux * 8, ay = y2 - uy * 8;
  return `<line x1="${x1}" y1="${y1}" x2="${ax}" y2="${ay}" stroke="${color}" stroke-width="1.5" stroke-dasharray="none"/>
<polygon points="${x2},${y2} ${ax - uy * 4},${ay + ux * 4} ${ax + uy * 4},${ay - ux * 4}" fill="${color}"/>`;
}

function hArrow(x1, x2, y, color = T.border2) {
  return arrow(x1, y, x2, y, color);
}

function title(x, y, text, sub) {
  return `${label(x, y, text, { size: 15, weight: "700", anchor: "start" })}
${sub ? label(x, y + 18, sub, { size: 11, fill: T.text3, weight: "400", anchor: "start" }) : ""}`;
}

function watermark(w, h) {
  return label(w / 2, h - 14, "Papyrus BPApp · papyrus360.com", { size: 10, fill: T.text3, weight: "400" });
}

// ─── Linear Flow Diagram (horizontal nodes + arrows) ──────────────────────────
function linearFlow({ filename, titleText, subtitle, nodes, width = 1200, height = 200, accent = T.amber }) {
  const padL = 40, padR = 40, padTop = 60;
  const usableW = width - padL - padR;
  const nodeW = 130, nodeH = 64;
  const gap = (usableW - nodes.length * nodeW) / (nodes.length - 1);
  const nodeY = padTop + (height - padTop - 40 - nodeH) / 2;

  let parts = [title(padL, 32, titleText, subtitle)];

  nodes.forEach((n, i) => {
    const x = padL + i * (nodeW + gap);
    const cx = x + nodeW / 2;
    const color = i === 0 ? T.emerald : i === nodes.length - 1 ? accent : n.active ? accent : T.zinc;
    const dimColor = i === 0 ? T.emeraldDim : i === nodes.length - 1 ? T.amberDim : n.active ? T.amberDim : T.zincDim;
    parts.push(badge(x, nodeY, nodeW, nodeH, n.label, n.sub, color, dimColor));
    if (i < nodes.length - 1) {
      parts.push(hArrow(x + nodeW + 4, x + nodeW + gap - 4, nodeY + nodeH / 2, T.border2));
    }
  });

  parts.push(watermark(width, height));
  writeFileSync(join(OUT, filename), svg(width, height, parts.join("\n  ")));
  console.log("✓", filename);
}

// ─── All Diagrams ─────────────────────────────────────────────────────────────

// S-02: Order Lifecycle
linearFlow({
  filename: "order-lifecycle.svg",
  titleText: "Order Lifecycle",
  subtitle: "Sales & Order Management",
  nodes: [
    { label: "Enquiry", sub: "captured" },
    { label: "Quotation", sub: "margin check", active: true },
    { label: "Sales Order", sub: "credit check" },
    { label: "Production", sub: "work order" },
    { label: "Dispatch", sub: "e-Way Bill" },
    { label: "Invoice", sub: "IRN + QR" },
    { label: "Payment", sub: "reconciled" },
  ],
  accent: T.emerald,
});

// PR-02: Purchase Flow
linearFlow({
  filename: "pr-po-grn-flow.svg",
  titleText: "Purchase Flow",
  subtitle: "Procurement",
  nodes: [
    { label: "PR", sub: "auto / manual" },
    { label: "RFQ", sub: "supplier quote", active: true },
    { label: "PO", sub: "approved" },
    { label: "GRN", sub: "QC check" },
    { label: "Invoice", sub: "3-way match" },
    { label: "Payment", sub: "NEFT / RTGS" },
  ],
  accent: T.blue,
});

// P-03: Work Order State Machine
linearFlow({
  filename: "work-order-states.svg",
  titleText: "Work Order Lifecycle",
  subtitle: "Production Planning",
  nodes: [
    { label: "CREATED", sub: "MRP triggered" },
    { label: "RELEASED", sub: "to shop floor", active: true },
    { label: "IN PROGRESS", sub: "executing" },
    { label: "COMPLETED", sub: "qty produced" },
    { label: "QC", sub: "inspection" },
    { label: "CLOSED", sub: "costed" },
  ],
  accent: T.orange,
});

// I-02: Stock Ledger Flow
linearFlow({
  filename: "stock-ledger-flow.svg",
  titleText: "Stock Ledger Flow",
  subtitle: "Inventory Management",
  nodes: [
    { label: "GRN", sub: "goods receipt" },
    { label: "Inspection", sub: "QC hold", active: true },
    { label: "Goods Issue", sub: "to production" },
    { label: "Transfer", sub: "inter-store" },
    { label: "Adjustment", sub: "variance" },
    { label: "Stock Take", sub: "reconciled" },
  ],
  accent: T.purple,
});

// F-02: Accounting Flow
linearFlow({
  filename: "accounting-flow.svg",
  titleText: "Accounting Flow",
  subtitle: "Finance & GST",
  nodes: [
    { label: "Journal", sub: "auto + manual" },
    { label: "Ledger", sub: "real-time", active: true },
    { label: "Trial Balance", sub: "closing" },
    { label: "P & L", sub: "by cost center" },
    { label: "Balance Sheet", sub: "auditable" },
  ],
  accent: T.emerald,
});

// HR-02: Payroll Flow
linearFlow({
  filename: "payroll-flow.svg",
  titleText: "Payroll Flow",
  subtitle: "Human Resources",
  nodes: [
    { label: "Attendance", sub: "shift + leave" },
    { label: "Overtime", sub: "approved", active: true },
    { label: "Deductions", sub: "PF / ESI / TDS" },
    { label: "Net Pay", sub: "CTC preview" },
    { label: "Bank Transfer", sub: "NEFT advice" },
    { label: "Payslip", sub: "PDF + portal" },
  ],
  accent: T.purple,
});

// M-02: Maintenance Work Order
linearFlow({
  filename: "maintenance-wo-flow.svg",
  titleText: "Maintenance Work Order",
  subtitle: "Maintenance Management",
  nodes: [
    { label: "Breakdown", sub: "detected" },
    { label: "Work Request", sub: "raised", active: true },
    { label: "Work Order", sub: "approved" },
    { label: "Technician", sub: "assigned" },
    { label: "Execute", sub: "parts + time" },
    { label: "Close", sub: "MTTR logged" },
  ],
  accent: T.amber,
});

// Q-02: QC Flow
linearFlow({
  filename: "qc-flow.svg",
  titleText: "Quality Control Flow",
  subtitle: "Quality Management",
  nodes: [
    { label: "Inspection", sub: "sampling plan" },
    { label: "Lab Test", sub: "parameters", active: true },
    { label: "Pass / Fail", sub: "vs tolerances" },
    { label: "COA", sub: "certificate" },
    { label: "NCR / CAPA", sub: "on failure" },
  ],
  accent: T.blue,
});

// SP-02: Furnish Flow
linearFlow({
  filename: "furnish-flow.svg",
  titleText: "Stock Preparation Flow",
  subtitle: "Stock Preparation",
  nodes: [
    { label: "Pulp", sub: "raw input" },
    { label: "Chest", sub: "consistency", active: true },
    { label: "Refiner", sub: "freeness" },
    { label: "Chemistry", sub: "dose" },
    { label: "Blend Chest", sub: "recipe" },
    { label: "Headbox", sub: "to wire" },
  ],
  accent: T.orange,
});

// CF-02: Converting Flow
linearFlow({
  filename: "converting-flow.svg",
  titleText: "Converting & Finishing Flow",
  subtitle: "Converting",
  nodes: [
    { label: "Mother Reel", sub: "input" },
    { label: "Slit", sub: "deckle plan", active: true },
    { label: "Sheet", sub: "to size" },
    { label: "Pack", sub: "+ label" },
    { label: "Pallet", sub: "shrink wrap" },
    { label: "Dispatch", sub: "ready" },
  ],
  accent: T.orange,
});

// B-02: Broke Recovery
linearFlow({
  filename: "broke-recovery-flow.svg",
  titleText: "Broke Recovery Flow",
  subtitle: "Broke Management",
  nodes: [
    { label: "Broke Occurs", sub: "shop floor" },
    { label: "Classify", sub: "wet / dry", active: true },
    { label: "Weigh", sub: "% tracked" },
    { label: "Repulp", sub: "chest route" },
    { label: "Recover", sub: "blend back" },
    { label: "Analyze", sub: "Pareto" },
  ],
  accent: T.red,
});

// CRM-02: Pipeline Flow
linearFlow({
  filename: "crm-pipeline-flow.svg",
  titleText: "CRM Pipeline Flow",
  subtitle: "Customer Relationship Management",
  nodes: [
    { label: "Lead", sub: "captured" },
    { label: "Qualified", sub: "fit + budget", active: true },
    { label: "Proposal", sub: "quote sent" },
    { label: "Negotiation", sub: "iterate" },
    { label: "Won / Lost", sub: "loss reason" },
  ],
  accent: T.emerald,
});

// L-02: Dispatch Flow
linearFlow({
  filename: "dispatch-flow.svg",
  titleText: "Dispatch Flow",
  subtitle: "Logistics & Delivery",
  nodes: [
    { label: "SO Confirmed", sub: "ready" },
    { label: "Pick List", sub: "generated", active: true },
    { label: "Loading", sub: "weighbridge" },
    { label: "e-Way Bill", sub: "auto GST" },
    { label: "In Transit", sub: "GPS tracked" },
    { label: "POD", sub: "delivered" },
  ],
  accent: T.blue,
});

// RD-02: Trial to Commercial
linearFlow({
  filename: "trial-to-commercial-flow.svg",
  titleText: "Recipe: Trial to Commercial",
  subtitle: "Recipe Development",
  nodes: [
    { label: "Lab Trial", sub: "small scale" },
    { label: "Mill Trial", sub: "production", active: true },
    { label: "Customer Sample", sub: "feedback" },
    { label: "Approval", sub: "sign-off" },
    { label: "Commercial", sub: "released" },
  ],
  accent: T.amber,
});

// SW-09: How It Works (wide)
linearFlow({
  filename: "how-it-works.svg",
  titleText: "How Papyrus BPApp Works",
  subtitle: "End-to-end paper mill operations",
  width: 1200,
  height: 220,
  nodes: [
    { label: "Order", sub: "enquiry → SO" },
    { label: "Planning", sub: "MRP + deckle", active: true },
    { label: "Production", sub: "shop floor" },
    { label: "Quality", sub: "QC + COA" },
    { label: "Dispatch", sub: "e-Way Bill" },
    { label: "Invoice", sub: "e-invoice" },
    { label: "Payment", sub: "GST cleared" },
  ],
  accent: T.amber,
});

// ─── Architecture / Complex Diagrams ─────────────────────────────────────────

// D-02: 3-Tier Optimization
function threeTierDiagram() {
  const W = 1200, H = 420;
  const tiers = [
    { label: "Tier 1 — Instant", sub: "< 2 seconds", desc: "Shop floor adjustments\nPocket changes\nSingle reel decisions", color: T.emerald, dim: T.emeraldDim, x: 80 },
    { label: "Tier 2 — Balanced", sub: "5 – 30 seconds", desc: "Shift planning\nMulti-order batching\nPattern matching", color: T.amber, dim: T.amberDim, x: 440 },
    { label: "Tier 3 — Full Optimize", sub: "≤ 5 minutes", desc: "Daily / weekly planning\n180+ constraints\nPattern learning", color: T.red, dim: T.redDim, x: 800 },
  ];
  const tW = 320, tH = 260, tY = 110;

  let parts = [title(40, 36, "3-Tier Deckle Optimization Engine", "Papyrus BPApp Deckle Optimizer")];

  tiers.forEach((t) => {
    parts.push(`<rect x="${t.x}" y="${tY}" width="${tW}" height="${tH}" rx="12" fill="${t.dim}" stroke="${t.color}" stroke-width="1.5"/>`);
    parts.push(label(t.x + tW / 2, tY + 30, t.label, { size: 14, fill: t.color, weight: "700" }));
    parts.push(label(t.x + tW / 2, tY + 50, t.sub, { size: 11, fill: T.text3, weight: "500" }));
    // separator
    parts.push(`<line x1="${t.x + 20}" y1="${tY + 64}" x2="${t.x + tW - 20}" y2="${tY + 64}" stroke="${t.color}44" stroke-width="1"/>`);
    // desc lines
    t.desc.split("\n").forEach((line, i) => {
      parts.push(label(t.x + tW / 2, tY + 92 + i * 22, line, { size: 12, fill: T.text2, weight: "400" }));
    });
    // bottom badge
    const badge_labels = t.label.includes("Instant") ? "Immediate feedback" : t.label.includes("Balanced") ? "Operator-guided" : "Autonomous + learning";
    parts.push(`<rect x="${t.x + 20}" y="${tY + tH - 44}" width="${tW - 40}" height="28" rx="6" fill="${t.color}22" stroke="${t.color}44" stroke-width="1"/>`);
    parts.push(label(t.x + tW / 2, tY + tH - 24, badge_labels, { size: 11, fill: t.color, weight: "600" }));
  });

  // arrows between tiers
  parts.push(hArrow(tiers[0].x + tW + 4, tiers[1].x - 4, tY + tH / 2, T.border2));
  parts.push(hArrow(tiers[1].x + tW + 4, tiers[2].x - 4, tY + tH / 2, T.border2));

  // bottom note
  parts.push(label(W / 2, H - 28, "All tiers share the same constraint model — escalate automatically based on time available", { size: 11, fill: T.text3, weight: "400" }));
  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "3-tier-optimization.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ 3-tier-optimization.svg");
}
threeTierDiagram();

// P-02: MPS/MRP/CRP
function mrpDiagram() {
  const W = 1200, H = 460;
  const layers = [
    { label: "MPS", full: "Master Production Schedule", desc: "Demand forecast + customer orders → production plan", color: T.amber, y: 80 },
    { label: "MRP", full: "Material Requirements Planning", desc: "BOM explosion → purchase requisitions + work orders", color: T.orange, y: 200 },
    { label: "CRP", full: "Capacity Requirements Planning", desc: "Load vs capacity → schedule feasibility + leveling", color: T.blue, y: 320 },
  ];

  let parts = [title(40, 36, "MPS / MRP / CRP Planning Stack", "Production Planning — Papyrus BPApp")];

  layers.forEach((l, i) => {
    const bW = 900, bH = 72, bX = (W - bW) / 2;
    parts.push(`<rect x="${bX}" y="${l.y}" width="${bW}" height="${bH}" rx="10" fill="${l.color}18" stroke="${l.color}" stroke-width="1.5"/>`);
    parts.push(`<rect x="${bX}" y="${l.y}" width="90" height="${bH}" rx="10" fill="${l.color}33" stroke="${l.color}" stroke-width="1.5"/>`);
    parts.push(label(bX + 45, l.y + bH / 2 + 5, l.label, { size: 16, fill: l.color, weight: "800" }));
    parts.push(label(bX + 120, l.y + 26, l.full, { size: 13, fill: T.text1, weight: "700", anchor: "start" }));
    parts.push(label(bX + 120, l.y + 48, l.desc, { size: 11, fill: T.text2, weight: "400", anchor: "start" }));
    if (i < layers.length - 1) {
      parts.push(arrow(W / 2, l.y + bH + 2, W / 2, layers[i + 1].y - 2, T.border2));
    }
  });

  // inputs/outputs
  parts.push(label(40, 116, "Demand signals", { size: 11, fill: T.text3, anchor: "start" }));
  parts.push(label(40, 236, "PR + WO signals", { size: 11, fill: T.text3, anchor: "start" }));
  parts.push(label(40, 356, "Capacity load", { size: 11, fill: T.text3, anchor: "start" }));

  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "mps-mrp-crp-diagram.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ mps-mrp-crp-diagram.svg");
}
mrpDiagram();

// IOT-02: IoT Architecture
function iotArchDiagram() {
  const W = 1200, H = 440;
  const cols = [
    { label: "Sensors", sub: "Edge devices", items: ["Flow meter", "Temperature", "Pressure", "Consistency", "Speed"], color: T.orange, x: 60 },
    { label: "Gateway", sub: "Edge compute", items: ["MQTT broker", "OPC-UA server", "Buffer + filter", "Local ML"], color: T.amber, x: 280 },
    { label: "Stream", sub: "Transport", items: ["MQTT / HTTP", "TLS encrypted", "Retry + QoS", "Schema validation"], color: T.blue, x: 500 },
    { label: "TimescaleDB", sub: "Time-series store", items: ["Raw telemetry", "Downsampled", "Retention policy", "Hypertables"], color: T.purple, x: 720 },
    { label: "BPApp", sub: "ERP layer", items: ["Alerts engine", "OEE calc", "Predictive AI", "Dashboard"], color: T.emerald, x: 940 },
  ];
  const cW = 180, cH = 320, cY = 80;

  let parts = [title(40, 36, "IoT Architecture", "Papyrus BPApp IoT & Device Integration")];

  cols.forEach((c, i) => {
    parts.push(`<rect x="${c.x}" y="${cY}" width="${cW}" height="${cH}" rx="10" fill="${c.color}14" stroke="${c.color}55" stroke-width="1.5"/>`);
    parts.push(label(c.x + cW / 2, cY + 24, c.label, { size: 13, fill: c.color, weight: "700" }));
    parts.push(label(c.x + cW / 2, cY + 40, c.sub, { size: 10, fill: T.text3, weight: "400" }));
    parts.push(`<line x1="${c.x + 16}" y1="${cY + 52}" x2="${c.x + cW - 16}" y2="${cY + 52}" stroke="${c.color}33" stroke-width="1"/>`);
    c.items.forEach((item, j) => {
      parts.push(`<rect x="${c.x + 12}" y="${cY + 64 + j * 44}" width="${cW - 24}" height="30" rx="5" fill="${T.bg3}" stroke="${T.border}" stroke-width="1"/>`);
      parts.push(label(c.x + cW / 2, cY + 84 + j * 44, item, { size: 11, fill: T.text2, weight: "500" }));
    });
    if (i < cols.length - 1) {
      const ax = c.x + cW + 4, ax2 = cols[i + 1].x - 4, ay = cY + cH / 2;
      parts.push(hArrow(ax, ax2, ay, c.color + "88"));
    }
  });

  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "iot-architecture.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ iot-architecture.svg");
}
iotArchDiagram();

// DT-02: Digital Twin Architecture
function digitalTwinDiagram() {
  const W = 1200, H = 420;

  let parts = [title(40, 36, "Digital Twin Architecture", "Papyrus BPApp Digital Twin")];

  // Three layers horizontal
  const layers = [
    { label: "Physical Mill", sub: "Real-world assets", items: ["Paper machines", "Refiners / chests", "Sensors + PLCs", "Control systems"], color: T.orange, x: 80 },
    { label: "Digital Model", sub: "Live virtual copy", items: ["3D mill model", "Real-time sync", "State mirror", "Event stream"], color: T.amber, x: 460 },
    { label: "Simulation Layer", sub: "Scenario engine", items: ["What-if analysis", "Grade change sim", "Predictive ops", "Optimization"], color: T.blue, x: 840 },
  ];
  const lW = 260, lH = 280, lY = 90;

  layers.forEach((l, i) => {
    parts.push(`<rect x="${l.x}" y="${lY}" width="${lW}" height="${lH}" rx="12" fill="${l.color}14" stroke="${l.color}" stroke-width="1.5"/>`);
    parts.push(label(l.x + lW / 2, lY + 28, l.label, { size: 14, fill: l.color, weight: "700" }));
    parts.push(label(l.x + lW / 2, lY + 46, l.sub, { size: 10, fill: T.text3 }));
    parts.push(`<line x1="${l.x + 20}" y1="${lY + 58}" x2="${l.x + lW - 20}" y2="${lY + 58}" stroke="${l.color}33" stroke-width="1"/>`);
    l.items.forEach((item, j) => {
      parts.push(`<rect x="${l.x + 16}" y="${lY + 72 + j * 46}" width="${lW - 32}" height="32" rx="6" fill="${T.bg3}" stroke="${T.border}" stroke-width="1"/>`);
      parts.push(label(l.x + lW / 2, lY + 94 + j * 46, item, { size: 12, fill: T.text2, weight: "500" }));
    });
    if (i < layers.length - 1) {
      // bidirectional arrows
      const ax = l.x + lW + 8, ax2 = layers[i + 1].x - 8, ay = lY + lH / 2;
      parts.push(`<line x1="${ax}" y1="${ay - 8}" x2="${ax2}" y2="${ay - 8}" stroke="${l.color}88" stroke-width="1.5" marker-end="url(#arr)"/>`);
      parts.push(`<line x1="${ax2}" y1="${ay + 8}" x2="${ax}" y2="${ay + 8}" stroke="${layers[i + 1].color}88" stroke-width="1.5"/>`);
      // draw arrow heads manually
      parts.push(`<polygon points="${ax2},${ay - 8} ${ax2 - 8},${ay - 13} ${ax2 - 8},${ay - 3}" fill="${l.color}88"/>`);
      parts.push(`<polygon points="${ax},${ay + 8} ${ax + 8},${ay + 3} ${ax + 8},${ay + 13}" fill="${layers[i + 1].color}88"/>`);
    }
  });

  // bottom label
  parts.push(label(W / 2, lY + lH + 36, "Bidirectional sync — physical state drives model; simulation results guide physical operations", { size: 11, fill: T.text3 }));
  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "digital-twin-architecture.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ digital-twin-architecture.svg");
}
digitalTwinDiagram();

// P-05: OEE Waterfall
function oeeWaterfallDiagram() {
  const W = 1000, H = 420;
  const bars = [
    { label: "Planned Time", value: 100, color: T.zinc, start: 0 },
    { label: "Availability Loss", value: -12, color: T.red, start: 88, sub: "Downtime / breakdowns" },
    { label: "Performance Loss", value: -8, color: T.amber, start: 80, sub: "Speed reduction" },
    { label: "Quality Loss", value: -5, color: T.orange, start: 75, sub: "Defects / rework" },
    { label: "OEE", value: 75, color: T.emerald, start: 0 },
  ];

  const padL = 180, padR = 60, padTop = 80, barH = 220;
  const usableW = W - padL - padR;
  const barW = usableW / bars.length - 16;
  const scale = barH / 100;

  let parts = [title(40, 36, "OEE Waterfall Chart", "Overall Equipment Effectiveness — Production")];

  // grid lines
  [25, 50, 75, 100].forEach((pct) => {
    const gy = padTop + barH - pct * scale;
    parts.push(`<line x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}" stroke="${T.border}" stroke-width="1" stroke-dasharray="4,4"/>`);
    parts.push(label(padL - 10, gy + 4, `${pct}%`, { size: 10, fill: T.text3, anchor: "end" }));
  });

  // baseline
  parts.push(`<line x1="${padL}" y1="${padTop + barH}" x2="${W - padR}" y2="${padTop + barH}" stroke="${T.border2}" stroke-width="1.5"/>`);

  bars.forEach((b, i) => {
    const x = padL + i * (barW + 16);
    const isLoss = b.value < 0;
    const bH = Math.abs(b.value) * scale;
    const bY = isLoss ? padTop + barH - b.start * scale : padTop + barH - b.value * scale;

    parts.push(`<rect x="${x}" y="${bY}" width="${barW}" height="${bH}" rx="4" fill="${b.color}${isLoss ? "33" : "22"}" stroke="${b.color}" stroke-width="1.5"/>`);

    // value label
    const valY = isLoss ? bY + bH / 2 + 5 : bY - 10;
    const valText = isLoss ? `-${Math.abs(b.value)}%` : `${b.value}%`;
    parts.push(label(x + barW / 2, valY, valText, { size: 13, fill: b.color, weight: "700" }));

    // bar label
    parts.push(label(x + barW / 2, padTop + barH + 20, b.label, { size: 11, fill: T.text2, weight: "600" }));
    if (b.sub) parts.push(label(x + barW / 2, padTop + barH + 34, b.sub, { size: 9, fill: T.text3 }));
  });

  // OEE formula
  parts.push(label(W / 2, H - 28, "OEE = Availability × Performance × Quality  ·  World-class target: ≥ 85%", { size: 11, fill: T.text3 }));
  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "oee-waterfall.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ oee-waterfall.svg");
}
oeeWaterfallDiagram();

// D-04: Trim Savings Infographic
function trimSavingsInfographic() {
  const W = 900, H = 320;

  let parts = [title(40, 36, "Deckle Optimizer — Trim Savings", "Before vs After Papyrus BPApp")];

  // Before
  parts.push(`<rect x="60" y="80" width="340" height="180" rx="12" fill="${T.red}14" stroke="${T.red}55" stroke-width="1.5"/>`);
  parts.push(label(230, 108, "BEFORE", { size: 11, fill: T.red, weight: "700" }));
  parts.push(label(230, 148, "8.2%", { size: 52, fill: T.red, weight: "800" }));
  parts.push(label(230, 178, "trim waste", { size: 13, fill: T.text2 }));
  parts.push(label(230, 202, "Manual deckle planning", { size: 11, fill: T.text3 }));
  parts.push(label(230, 220, "Spreadsheet + guesswork", { size: 11, fill: T.text3 }));
  parts.push(label(230, 242, "₹8–12L / month waste", { size: 12, fill: T.red, weight: "600" }));

  // Arrow
  parts.push(hArrow(420, 500, 230, T.amber));
  parts.push(label(460, 222, "BPApp", { size: 11, fill: T.amber, weight: "700" }));
  parts.push(label(460, 238, "Deckle", { size: 11, fill: T.amber, weight: "700" }));

  // After
  parts.push(`<rect x="500" y="80" width="340" height="180" rx="12" fill="${T.emerald}14" stroke="${T.emerald}55" stroke-width="1.5"/>`);
  parts.push(label(670, 108, "AFTER", { size: 11, fill: T.emerald, weight: "700" }));
  parts.push(label(670, 148, "3.1%", { size: 52, fill: T.emerald, weight: "800" }));
  parts.push(label(670, 178, "trim waste", { size: 13, fill: T.text2 }));
  parts.push(label(670, 202, "3-tier optimization engine", { size: 11, fill: T.text3 }));
  parts.push(label(670, 220, "180+ constraints, pattern learning", { size: 11, fill: T.text3 }));
  parts.push(label(670, 242, "₹2–3 Cr / year savings", { size: 12, fill: T.emerald, weight: "600" }));

  // Savings badge
  parts.push(`<rect x="330" y="286" width="240" height="24" rx="6" fill="${T.amber}22" stroke="${T.amber}55" stroke-width="1"/>`);
  parts.push(label(450, 302, "62% reduction in trim waste", { size: 11, fill: T.amber, weight: "600" }));

  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "trim-savings.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ trim-savings.svg");
}
trimSavingsInfographic();

// B-03: Broke Pareto Chart
function brokePareto() {
  const W = 900, H = 380;
  const bars = [
    { label: "Wet-end", pct: 42, color: T.red },
    { label: "Dry-end", pct: 28, color: T.orange },
    { label: "Converting", pct: 18, color: T.amber },
    { label: "Other", pct: 12, color: T.zinc },
  ];

  const padL = 100, padR = 160, padTop = 80, barH = 220;
  const usableW = W - padL - padR;
  const barW = usableW / bars.length - 20;
  const scale = barH / 100;

  let parts = [title(40, 36, "Broke Loss — Pareto Analysis", "Broke Management · Papyrus BPApp")];

  // grid
  [25, 50, 75, 100].forEach((pct) => {
    const gy = padTop + barH - pct * scale;
    parts.push(`<line x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}" stroke="${T.border}" stroke-width="1" stroke-dasharray="4,4"/>`);
    parts.push(label(padL - 10, gy + 4, `${pct}%`, { size: 10, fill: T.text3, anchor: "end" }));
  });
  parts.push(`<line x1="${padL}" y1="${padTop + barH}" x2="${W - padR}" y2="${padTop + barH}" stroke="${T.border2}" stroke-width="1.5"/>`);

  // cumulative line points
  let cumulative = 0;
  const cPoints = bars.map((b, i) => {
    cumulative += b.pct;
    const cx = padL + i * (barW + 20) + barW / 2;
    const cy = padTop + barH - cumulative * scale;
    return { cx, cy, cumulative };
  });

  // bars
  bars.forEach((b, i) => {
    const x = padL + i * (barW + 20);
    const bH = b.pct * scale;
    const bY = padTop + barH - bH;
    parts.push(`<rect x="${x}" y="${bY}" width="${barW}" height="${bH}" rx="4" fill="${b.color}22" stroke="${b.color}" stroke-width="1.5"/>`);
    parts.push(label(x + barW / 2, bY - 8, `${b.pct}%`, { size: 13, fill: b.color, weight: "700" }));
    parts.push(label(x + barW / 2, padTop + barH + 20, b.label, { size: 12, fill: T.text2, weight: "600" }));
  });

  // cumulative line
  const linePoints = cPoints.map(p => `${p.cx},${p.cy}`).join(" ");
  parts.push(`<polyline points="${cPoints[0].cx},${padTop + barH} ${linePoints}" fill="none" stroke="${T.amber}" stroke-width="2" stroke-dasharray="5,3"/>`);
  cPoints.forEach(p => {
    parts.push(`<circle cx="${p.cx}" cy="${p.cy}" r="5" fill="${T.amber}" stroke="${T.bg}" stroke-width="2"/>`);
    parts.push(label(p.cx + 10, p.cy - 6, `${p.cumulative}%`, { size: 10, fill: T.amber, weight: "600", anchor: "start" }));
  });

  // legend
  parts.push(`<rect x="${W - padR + 20}" y="90" width="12" height="12" rx="2" fill="${T.amber}" stroke="${T.amber}"/>`);
  parts.push(label(W - padR + 38, 101, "Cumulative", { size: 11, fill: T.text2, anchor: "start" }));

  parts.push(label(W / 2, H - 16, "Top 2 causes (wet-end + dry-end) account for 70% of broke loss", { size: 11, fill: T.text3 }));
  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "broke-pareto.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ broke-pareto.svg");
}
brokePareto();

// P-14: SPC Control Chart
function spcChart() {
  const W = 1000, H = 360;
  const padL = 80, padR = 60, padTop = 80, chartH = 220;
  const usableW = W - padL - padR;

  const TARGET = 75, UCL = 78, LCL = 72;
  const data = [74.2, 75.1, 74.8, 75.3, 76.1, 74.9, 75.5, 74.7, 75.2, 78.4, 75.0, 74.6, 75.8, 71.8, 75.3, 74.9, 75.4, 75.1, 74.8, 76.0];
  const minV = 70, maxV = 80, range = maxV - minV;
  const scale = chartH / range;
  const stepX = usableW / (data.length - 1);

  const toY = (v) => padTop + chartH - (v - minV) * scale;

  let parts = [title(40, 36, "GSM Control Chart (SPC)", "Production Quality — Papyrus BPApp")];

  // UCL / LCL / Target lines
  const lineY = (v, color, lbl) => {
    const y = toY(v);
    return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${color}" stroke-width="1" stroke-dasharray="6,3"/>
${label(W - padR + 8, y + 4, lbl, { size: 10, fill: color, anchor: "start" })}`;
  };
  parts.push(lineY(UCL, T.red, "UCL"));
  parts.push(lineY(TARGET, T.emerald, "Target"));
  parts.push(lineY(LCL, T.red, "LCL"));

  // shaded zone
  parts.push(`<rect x="${padL}" y="${toY(UCL)}" width="${usableW}" height="${(UCL - LCL) * scale}" fill="${T.emerald}0a"/>`);

  // data line
  const points = data.map((v, i) => `${padL + i * stepX},${toY(v)}`).join(" ");
  parts.push(`<polyline points="${points}" fill="none" stroke="${T.blue}" stroke-width="2"/>`);

  // data points (violations in red)
  data.forEach((v, i) => {
    const isViolation = v > UCL || v < LCL;
    const cx = padL + i * stepX, cy = toY(v);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${isViolation ? 6 : 4}" fill="${isViolation ? T.red : T.blue}" stroke="${T.bg}" stroke-width="2"/>`);
    if (isViolation) {
      parts.push(`<text x="${cx}" y="${cy - 12}" font-size="9" fill="${T.red}" text-anchor="middle" font-family="${T.font}">⚠ ${v}</text>`);
    }
  });

  // axes labels
  [minV, minV + 2, minV + 4, minV + 6, minV + 8, maxV].forEach((v) => {
    parts.push(label(padL - 10, toY(v) + 4, `${v}`, { size: 10, fill: T.text3, anchor: "end" }));
  });
  parts.push(label(W / 2, padTop + chartH + 20, "Sample number →", { size: 11, fill: T.text3 }));
  parts.push(label(20, padTop + chartH / 2, "GSM", { size: 11, fill: T.text3 }));

  parts.push(label(W / 2, H - 16, "2 violations detected (samples 10 and 14) → auto NCR raised in BPApp", { size: 11, fill: T.text3 }));
  parts.push(watermark(W, H));
  writeFileSync(join(OUT, "spc-control-chart.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ spc-control-chart.svg");
}
spcChart();

// SW-10: Compliance Badges
function complianceBadges() {
  const W = 1000, H = 140;
  const badges = [
    { label: "GST", sub: "GSTR-1 / 3B / e-invoice", color: T.emerald },
    { label: "FEMA", sub: "Export / import compliance", color: T.blue },
    { label: "PF / ESI", sub: "Statutory deductions", color: T.purple },
    { label: "TDS / TCS", sub: "Section 194C / 206C", color: T.amber },
    { label: "Aadhaar Act", sub: "Data privacy", color: T.orange },
  ];

  const bW = 168, bH = 80, gap = (W - badges.length * bW) / (badges.length + 1);
  let parts = [];

  badges.forEach((b, i) => {
    const x = gap + i * (bW + gap);
    const y = (H - bH) / 2;
    parts.push(`<rect x="${x}" y="${y}" width="${bW}" height="${bH}" rx="10" fill="${b.color}18" stroke="${b.color}" stroke-width="1.5"/>`);
    parts.push(`<rect x="${x}" y="${y}" width="${bW}" height="${bH / 2.5}" rx="10 10 0 0" fill="${b.color}28"/>`);
    parts.push(label(x + bW / 2, y + 26, b.label, { size: 16, fill: b.color, weight: "800" }));
    parts.push(label(x + bW / 2, y + 56, b.sub, { size: 10, fill: T.text3, weight: "500" }));
  });

  writeFileSync(join(OUT, "compliance-badges.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ compliance-badges.svg");
}
complianceBadges();

// SW-11: Stats Bar
function statsBar() {
  const W = 1200, H = 140;
  const stats = [
    { value: "44", label: "Integrated Modules", color: T.amber },
    { value: "396+", label: "Documented Capabilities", color: T.orange },
    { value: "35+", label: "Years Domain Expertise", color: T.blue },
    { value: "GST-native", label: "India Compliance Built-in", color: T.emerald },
    { value: "AI-powered", label: "Anthropic · Gemini · OpenAI", color: T.purple },
  ];

  const bW = W / stats.length;
  let parts = [];

  stats.forEach((s, i) => {
    const x = i * bW;
    if (i > 0) parts.push(`<line x1="${x}" y1="20" x2="${x}" y2="${H - 20}" stroke="${T.border}" stroke-width="1"/>`);
    parts.push(label(x + bW / 2, 58, s.value, { size: 28, fill: s.color, weight: "800" }));
    parts.push(label(x + bW / 2, 82, s.label, { size: 11, fill: T.text2, weight: "500" }));
  });

  writeFileSync(join(OUT, "stats-bar.svg"), svg(W, H, parts.join("\n  ")));
  console.log("✓ stats-bar.svg");
}
statsBar();

console.log("\nDone! All SVGs in public/images/diagrams/");
