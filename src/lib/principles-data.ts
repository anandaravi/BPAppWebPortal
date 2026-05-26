export type Principle = {
  slug: string;
  title: string;
  iconName: string;
  short: string;
  blurb: string;
  accent: string;
  photo: string;
  whatItMeans: string[];
  howItWorks: { step: string; desc: string }[];
  example: { title: string; before: string; after: string };
  diagramType: "layers" | "flow" | "matrix" | "scale";
};

export const PRINCIPLES: Record<string, Principle> = {
  "modular-by-design": {
    slug: "modular-by-design",
    title: "Modular by Design",
    iconName: "Layers",
    short: "Activate only the modules you need today. Add more as you grow. No code changes, no migration projects.",
    blurb: "Modules are independently deployable and independently activatable. Every module ships with its own database schema, its own service tier, and its own UI surface — but shares the common platform foundation.",
    accent: "#10B981",
    photo: "/images/pages/principles-modular.jpg",
    whatItMeans: [
      "Activate Sales, Inventory, Finance on Day 1; add Production later without re-implementing",
      "Each module has its own version lifecycle — upgrade Finance to v2.5 without touching Sales",
      "Modules can be disabled per company via feature toggles — no zombie data or broken links",
      "Custom modules can be built and dropped in via the platform plugin API",
    ],
    howItWorks: [
      { step: "Schema isolation", desc: "Each module owns its database schema. Sales tables don't know about Production tables." },
      { step: "Service tier", desc: "Each module exposes its own REST API. Internal calls go through API, never directly to another module's DB." },
      { step: "Feature flag gating", desc: "Module activation controlled by feature toggles in Administration. Toggle off = module disappears from UI." },
      { step: "Graceful degradation", desc: "If a module is disabled, dependent modules handle absence cleanly — no crashes, no broken workflows." },
    ],
    example: {
      title: "Real-world: Mill adds HR after 6 months",
      before: "Customer initially activated Sales, Procurement, Inventory, Finance. After 6 months, ready to bring HR onto the platform.",
      after: "HR module activated via toggle. Salary structures imported via CSV in 2 days. Payroll runs same week — no re-implementation of other modules, no downtime.",
    },
    diagramType: "layers",
  },
  "api-first": {
    slug: "api-first",
    title: "API-First",
    iconName: "GitMerge",
    short: "Every module exposes REST + webhook APIs. Other modules consume them; external systems integrate the same way.",
    blurb: "If a feature exists in the UI, it exists in the API. External integrations are not afterthoughts — they use the same interfaces internal modules use.",
    accent: "#3B82F6",
    photo: "/images/pages/principles-api-first.jpg",
    whatItMeans: [
      "Every action available in the UI is also available as an API call",
      "External systems (SAP, Salesforce, custom apps) integrate as first-class consumers",
      "Internal modules cannot bypass the API — no hidden coupling, no shortcuts",
      "OpenAPI 3.0 specs published for every endpoint; auto-generated SDKs available",
    ],
    howItWorks: [
      { step: "Contract-first", desc: "Every endpoint defined in OpenAPI spec before implementation. Spec is the source of truth." },
      { step: "Versioned", desc: "Breaking changes require new API version. Old versions deprecated with 12-month notice." },
      { step: "Auth + RBAC", desc: "Every API call goes through authentication + permission check. No internal back-doors." },
      { step: "Webhooks", desc: "Outbound webhooks for state changes — order created, invoice paid, batch produced. Subscribers configure their own listeners." },
    ],
    example: {
      title: "Real-world: SAP integration in 5 days",
      before: "Customer wanted to push approved POs from SAP into Papyrus for execution.",
      after: "Used the standard POST /procurement/purchase-orders endpoint. SAP connector configured in 3 days, tested in 1, live in 5. Zero custom code on Papyrus side.",
    },
    diagramType: "flow",
  },
  "multi-tenancy-native": {
    slug: "multi-tenancy-native",
    title: "Multi-tenancy Native",
    iconName: "Lock",
    short: "One deployment serves multiple companies, plants, and branches. Data isolation enforced at the query layer.",
    blurb: "Multi-tenancy is built into the data model and the query layer — not bolted on at the application layer. Tenant A literally cannot see Tenant B's data, even if a developer makes a mistake.",
    accent: "#A855F7",
    photo: "/images/pages/principles-multitenancy.jpg",
    whatItMeans: [
      "Mill Group with 5 subsidiaries runs on one deployment with strict data isolation",
      "Users see only the companies and branches they're authorized for",
      "Cross-company transactions (inter-company sales) handled with proper journals on both sides",
      "Per-company feature toggles, branding, currency, and fiscal calendar",
    ],
    howItWorks: [
      { step: "Tenant column", desc: "Every business table has company_id and branch_id columns. Indexes ensure efficient filtering." },
      { step: "Query interceptor", desc: "Every query auto-injected with WHERE company_id = $user_company. Developers cannot forget — it's enforced." },
      { step: "Row-level security", desc: "PostgreSQL RLS policies provide defense-in-depth at the database layer." },
      { step: "Tenant context", desc: "JWT tokens carry tenant context. Switching companies requires re-authentication or explicit elevation." },
    ],
    example: {
      title: "Real-world: 3-company group, 12 branches",
      before: "Mill group had separate ERP installations per subsidiary. Consolidating P&L took 5 days post month-close.",
      after: "All 3 companies on one Papyrus deployment with strict isolation. Group dashboard shows consolidated P&L live. Month-close takes 1 day.",
    },
    diagramType: "matrix",
  },
  "audit-everywhere": {
    slug: "audit-everywhere",
    title: "Audit Everywhere",
    iconName: "ShieldCheck",
    short: "Every action, every state transition, every read — logged. Built once at the platform, inherited by every module.",
    blurb: "Audit isn't a feature you turn on. It's the default state. Every create, update, delete, and sensitive read operation produces an immutable audit entry with user, timestamp, IP, before/after values, and reason.",
    accent: "#F59E0B",
    photo: "/images/pages/principles-audit.jpg",
    whatItMeans: [
      "Tamper-proof log of every CRUD operation across every module",
      "Sensitive reads logged separately (Aadhaar, PAN, salary, contracts)",
      "Audit log immutable — cannot be edited, only appended",
      "Compliance-ready exports for SOC 2, ISO 27001, GDPR, Aadhaar Act audits",
    ],
    howItWorks: [
      { step: "Centralized middleware", desc: "Audit logging implemented in platform middleware. Modules can't bypass; new modules inherit automatically." },
      { step: "Append-only", desc: "Audit log uses append-only PostgreSQL tablespace. No UPDATE or DELETE allowed at DB level." },
      { step: "Structured payload", desc: "Each entry includes user, IP, action, entity type, entity ID, before JSON, after JSON, reason, request ID." },
      { step: "Retention + indexing", desc: "Configurable retention per category. Indexed for fast search by user, entity, date range." },
    ],
    example: {
      title: "Real-world: GST audit query in 30 seconds",
      before: "Auditor asked who modified a specific invoice 8 months ago. IT team spent 2 days digging through logs and database backups.",
      after: "Filter audit log by entity_id. 30 seconds to find user, timestamp, and exact field-level changes. Auditor signed off the same day.",
    },
    diagramType: "flow",
  },
  "feature-toggles": {
    slug: "feature-toggles",
    title: "Feature Toggles",
    iconName: "Cog",
    short: "Turn features on or off per company. Gradual rollout, A/B testing, emergency shutoff — all from the admin console.",
    blurb: "Toggles control every feature independently, per company and per role. Roll out new functionality to one mill before all five. Disable a problematic feature in 10 seconds without a code deploy.",
    accent: "#06B6D4",
    photo: "/images/pages/principles-feature-flags.jpg",
    whatItMeans: [
      "Activate new modules or features per company without code deploys",
      "Gradual rollout: enable a feature for 10% of users, watch metrics, then ramp up",
      "Emergency shutoff: kill a bad feature in seconds without rollback",
      "Per-role and per-company targeting — fine-grained control",
    ],
    howItWorks: [
      { step: "Toggle registry", desc: "Every feature gets a toggle name. Code checks 'if (toggle.enabled(name, context))' before executing." },
      { step: "Admin UI", desc: "Toggle state managed in Administration module. Changes audit-logged." },
      { step: "Context evaluation", desc: "Toggle decisions evaluated per-request with user + company + role context. Decisions cached for performance." },
      { step: "Kill switch", desc: "Critical toggles can be flipped globally in <10s without deploy. For dead-code scenarios." },
    ],
    example: {
      title: "Real-world: Beta feature rolled out safely",
      before: "New AI-assisted quotation pricing feature ready for testing. Risky to enable for all customers.",
      after: "Enabled for 2 pilot mills via toggle. Monitored for 2 weeks. No issues. Ramped to 100% over the next month. One mill that had issues got toggle disabled in 30 seconds while we investigated.",
    },
    diagramType: "scale",
  },
  "ai-ready": {
    slug: "ai-ready",
    title: "AI-Ready",
    iconName: "Sparkles",
    short: "Every module exposes data to the AI layer through structured contracts. New AI insights work day one across all modules.",
    blurb: "Modules don't need to be AI-aware. They emit structured events and expose query contracts. The AI layer consumes them — adding intelligence without forcing modules to know they're being consumed.",
    accent: "#EAB308",
    photo: "/images/pages/principles-ai-ready.jpg",
    whatItMeans: [
      "AI features can be added without touching individual module code",
      "Same data model powers natural language chat, predictions, and bulk actions",
      "Multi-model architecture — switch between Claude, GPT, Gemini per deployment",
      "AI access governed by same RBAC as humans — no permission elevation through AI",
    ],
    howItWorks: [
      { step: "Module contracts", desc: "Each module publishes its data schema as a structured contract (JSON Schema)." },
      { step: "Tool registry", desc: "AI layer registers tools that map natural language requests to module API calls." },
      { step: "RBAC inheritance", desc: "AI executes calls under user's identity. If user can't access data, AI can't either." },
      { step: "Audit trail", desc: "Every AI-driven action audit-logged separately with original prompt + reasoning." },
    ],
    example: {
      title: "Real-world: New analytics with no module changes",
      before: "Customer asked for 'predict which orders are at risk of late delivery'.",
      after: "AI team trained the model using existing order, dispatch, and production data. No changes to Sales or Production modules. Deployed in 2 weeks. Predictions accessible via chat and dashboard.",
    },
    diagramType: "flow",
  },
  "configurable-workflows": {
    slug: "configurable-workflows",
    title: "Configurable Workflows",
    iconName: "RefreshCw",
    short: "Approval matrix, escalation rules, document templates — all editable without deployments. Business changes don't need engineering.",
    blurb: "Business logic lives in configuration, not code. Approval thresholds, escalation paths, email templates, and workflow rules change with a UI edit — not a code deploy.",
    accent: "#EC4899",
    photo: "/images/pages/principles-workflows.jpg",
    whatItMeans: [
      "Approval matrix changes via admin UI — no developer time",
      "Email templates editable with Handlebars variables and preview",
      "Workflow steps reorderable, addable, removable per company",
      "Versioned configuration — rollback if a change breaks something",
    ],
    howItWorks: [
      { step: "Rule engine", desc: "Workflow steps defined in configuration database. Engine executes steps in order, evaluating conditions per step." },
      { step: "Template engine", desc: "Email and document templates use Handlebars. Variables auto-populated from workflow context." },
      { step: "Version control", desc: "Every configuration change creates new version. Rollback restores previous version + invalidates active runs." },
      { step: "Audit + preview", desc: "Changes audit-logged. Preview mode lets admins test changes before activating." },
    ],
    example: {
      title: "Real-world: Approval threshold changed at 4 PM",
      before: "Finance team needed to raise the auto-approval limit from ₹5L to ₹10L due to new policy. Engineering ticket would have taken 2-3 days.",
      after: "Admin changed config at 4 PM. Tested with sample order at 4:05 PM. Live for all users at 4:10 PM. Audit log shows who made the change and why.",
    },
    diagramType: "flow",
  },
  "event-driven": {
    slug: "event-driven",
    title: "Event-Driven",
    iconName: "Zap",
    short: "Events flow on a shared bus. Subscribe a workflow, alert, or integration to any business event without modifying source modules.",
    blurb: "Every state change publishes an event to the platform event bus. Subscribers add new behavior — workflows, alerts, integrations, analytics — without modifying the source module.",
    accent: "#EF4444",
    photo: "/images/pages/principles-event-driven.jpg",
    whatItMeans: [
      "Adding a new alert or workflow doesn't require changing the module that triggers it",
      "Multiple subscribers can listen to the same event independently",
      "Async event processing means slow subscribers don't block fast ones",
      "Replay events for debugging or backfilling new subscribers",
    ],
    howItWorks: [
      { step: "Event taxonomy", desc: "Every business event has a name (sales.order.confirmed), payload schema, and emitting module." },
      { step: "Message bus", desc: "Events flow through BullMQ on Redis. Persistent, ordered, durable." },
      { step: "Subscriber registration", desc: "Workflows, automations, integrations, and notifications register interest in specific events." },
      { step: "Failure isolation", desc: "If one subscriber fails, others continue. Failed deliveries retried with exponential backoff." },
    ],
    example: {
      title: "Real-world: New compliance alert without code change",
      before: "Compliance team needed alerts when exports above ₹10 Cr were filed — to validate FEMA paperwork.",
      after: "Configured automation: subscribed to invoice.finalized event, filtered by type=export and amount > 10000000, action=send Slack alert. Live in 20 minutes. No code change, no deploy.",
    },
    diagramType: "flow",
  },
  "horizontally-scalable": {
    slug: "horizontally-scalable",
    title: "Horizontally Scalable",
    iconName: "Server",
    short: "Stateless services, queue-driven background jobs, Redis-cached lookups. Add capacity by adding nodes — never by re-architecting.",
    blurb: "The platform was designed to scale horizontally from day one. Services are stateless. State lives in databases. Capacity grows by adding nodes — not by rewriting code or migrating data.",
    accent: "#8B5CF6",
    photo: "/images/pages/principles-scalable.jpg",
    whatItMeans: [
      "Same architecture supports 50-user mill and 5000-user mill group",
      "Add capacity by adding nodes — no need to re-architect or re-platform",
      "Background jobs distributed across worker pool — heavy jobs don't slow UI",
      "Connection pooling and caching reduce database load proportionally",
    ],
    howItWorks: [
      { step: "Stateless app tier", desc: "App servers hold no state between requests. Any request can be served by any server." },
      { step: "Queue-driven jobs", desc: "Heavy work (reports, exports, bulk imports) queued in BullMQ. Worker pool processes async." },
      { step: "Database replicas", desc: "Read queries can route to replicas. Write throughput scaled via connection pooling + partitioning." },
      { step: "CDN + edge cache", desc: "Static assets served from CDN. Heavy reads cached at edge for global distribution." },
    ],
    example: {
      title: "Real-world: From 1 plant to 5 plants in 8 months",
      before: "Customer started with 1 plant, 200 users. Grew to 5 plants, 1200 users in 8 months.",
      after: "No architectural change. Added 2 more app server nodes, 1 more worker pool, scaled Postgres to bigger instance. All transparent to users. No downtime, no migration.",
    },
    diagramType: "scale",
  },
};

export const PRINCIPLE_SLUGS = Object.keys(PRINCIPLES);
