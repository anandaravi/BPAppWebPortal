# Papyrus BPApp — Web Portal

Public marketing website for **Papyrus BPApp**, an enterprise ERP purpose-built for Indian paper manufacturing. Showcases 44 integrated modules, 396+ capabilities, and the proprietary Deckle Optimizer across a fully animated dark-theme site.

**Live URL:** https://papyrusbpapp.vercel.app
**GitHub:** https://github.com/anandaravi/BPAppWebPortal

---

## What This Is

A standalone public marketing site — not the BPApp admin frontend, not a customer portal, no authentication. Goals:

- Lead generation and demo requests
- Full product feature showcase (44 modules, 396+ capabilities)
- Per-module deep-dive pages with workflow diagrams and capability grids
- Architecture and technical documentation for evaluators
- Industry/role-based solutions pages

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | 1.x |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| Email | Resend | 6.x |
| Runtime | React | 19.2.4 |
| Dev server | Turbopack (built-in) | — |
| Deploy | Vercel | — |
| Fonts | Geist Sans + Geist Mono | via next/font |

---

## Project Structure

```
webportal/
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # Root layout — fonts, navbar, footer, page transitions
│   │   ├── page.tsx                          # Home / landing page
│   │   ├── features/page.tsx                 # All 44 modules + 396 capabilities (searchable)
│   │   ├── product/
│   │   │   ├── page.tsx                      # Module directory grid
│   │   │   ├── [module]/page.tsx             # Per-module deep-dive (template or custom)
│   │   │   └── [module]/[capability]/page.tsx # Per-capability detail page
│   │   ├── architecture/
│   │   │   ├── page.tsx                      # System architecture overview
│   │   │   └── principles/[slug]/page.tsx    # Architectural principle detail
│   │   ├── technical/page.tsx                # Technical specs for IT evaluators
│   │   ├── customers/page.tsx                # Who it's for (industry segments)
│   │   ├── solutions/page.tsx                # By role (Owner, Finance, Operations, etc.)
│   │   ├── contact/page.tsx                  # Demo request form
│   │   └── api/contact/route.ts             # Contact form → Resend email delivery
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx                    # Fixed navbar with mega-menu (all 44 modules)
│   │   │   └── footer.tsx
│   │   ├── sections/                         # Home page section components
│   │   │   ├── hero.tsx
│   │   │   ├── features-grid.tsx
│   │   │   ├── module-showcase.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── pillars.tsx
│   │   │   ├── platform-strip.tsx
│   │   │   ├── ai-spotlight.tsx
│   │   │   ├── deckle-spotlight.tsx
│   │   │   └── cta-banner.tsx
│   │   ├── module/                           # Module page building blocks
│   │   │   ├── module-template.tsx           # Generic module page layout
│   │   │   ├── module-hero.tsx
│   │   │   ├── feature-section.tsx           # Feature strip (photo + bullets)
│   │   │   ├── feature-grid.tsx              # Capability card grid
│   │   │   ├── workflow-diagram.tsx          # State machine diagram
│   │   │   ├── document-flow.tsx             # Doc flow diagram
│   │   │   ├── integration-map.tsx           # Integration cards
│   │   │   ├── capability-detail.tsx         # Full capability detail view
│   │   │   └── deckle-deep-dive.tsx          # Custom Deckle Optimizer page
│   │   ├── page-transition.tsx               # Framer Motion route transition wrapper
│   │   └── providers.tsx                     # Client provider boundary
│   └── lib/
│       ├── modules/
│       │   ├── data.ts                       # Core module data (production, sales, deckle, etc.)
│       │   ├── extra-data.ts                 # Additional module data
│       │   ├── platform-data.ts              # Platform / infrastructure module data
│       │   ├── index.ts                      # ALL_MODULES, ALL_SLUGS exports
│       │   └── capability-helpers.ts         # slugify and capability utilities
│       ├── principles-data.ts                # Architecture principles content
│       ├── icons.ts                          # Lucide icon registry (getIcon helper)
│       ├── constants.ts                      # SITE config (name, url, tagline)
│       ├── schemas/contact.ts                # Zod schema for contact form
│       └── utils.ts                          # cn() and shared utilities
├── public/
│   └── logo.png
├── docs/                                     # Extended documentation
│   ├── PROJECT.md
│   ├── TECH-STACK.md
│   ├── PAGES.md
│   ├── DESIGN.md
│   ├── FEATURES.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
├── AGENTS.md                                 # Claude Code / AI agent instructions
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, stats, module showcase, Deckle spotlight, CTA |
| `/features` | Searchable directory of all 44 modules and 396+ capabilities |
| `/product` | Module grid — all 44 modules with icon, tag, capability count |
| `/product/[module]` | Per-module deep-dive — hero, workflow, feature sections, capability grid, integrations |
| `/product/[module]/[capability]` | Per-capability detail — description, workflow, related capabilities |
| `/product/deckle` | Custom deep-dive for the Deckle Optimizer (bespoke layout) |
| `/architecture` | System architecture overview and design principles |
| `/architecture/principles/[slug]` | Individual architectural principle detail |
| `/technical` | Technical specifications — stack, APIs, deployment, compliance |
| `/customers` | Who it's for — industry segments (Integrated Mills, Converting, Trading) |
| `/solutions` | By role — Owner/Director, Finance, Operations, IT |
| `/contact` | Demo request form → Resend email |

---

## Module Coverage

44 modules across 5 groups:

**Core Operations**
Production Planning & Execution · Deckle Optimizer · Stock Preparation · Converting & Finishing · Broke Management · Recipe Development & R&D

**Commercial**
Sales & Order Management · CRM · Customer Service & Helpdesk · Marketing Automation · Field Service Management

**Supply Chain**
Procurement · Inventory Management · Logistics & Dispatch · Vendor Management

**Finance & Compliance**
Finance & Accounting · GST & Tax Compliance · Payroll & HR · Asset Management · Budgeting & MIS

**Platform**
AI & Analytics · Product Catalog · Quality Management · Maintenance & CMMS · Document Management · IoT Device Management · Digital Twin · API & Integrations · Security & RBAC · …and more

---

## Adding or Updating Module Content

All module data lives in `src/lib/modules/`. Each module entry follows this shape:

```ts
{
  slug: string,           // URL slug, e.g. "production"
  tag: string,            // Short category label
  name: string,           // Display name
  title: string,          // Hero headline
  highlight: string,      // Hero accent line
  blurb: string,          // Hero subtext
  photo: string,          // Hero background image URL
  accent: string,         // Brand colour for this module (hex)
  icon: string,           // Lucide icon name (must exist in src/lib/icons.ts)
  metrics: [              // 4 stat chips shown in hero
    { value: string, label: string }
  ],
  features: [             // Feature strip sections
    {
      tag: string,        // Section label
      title: string,      // Section headline
      body: string,       // Paragraph description
      points: string[],   // Bullet points (6–8)
      photo?: string,     // Section photo URL
      flip?: boolean,     // Flip photo/text layout
    }
  ],
  workflow: {             // State machine / flow diagram
    title: string,
    nodes: [{ id, label, sub?, variant? }]
  },
  capabilities: [         // Capability card grid
    { icon: string, title: string, desc: string }
  ],
  integrations: [         // Integration cards at bottom
    { module: string, action: string, effect: string }
  ]
}
```

To add a new icon, import it from `lucide-react` and register it in `src/lib/icons.ts`.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
cd webportal
npm install
```

### Environment Variables

Create `.env.local`:

```env
RESEND_API_KEY=re_...          # Resend API key for contact form emails
CONTACT_TO_EMAIL=you@example.com
```

### Dev Server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot reload.

### Build

```bash
npm run build
npm run start
```

---

## Contact Form

- Client-side validation via React Hook Form + Zod (`src/lib/schemas/contact.ts`)
- Server-side delivery via Resend (`src/app/api/contact/route.ts`)
- Honeypot field for spam protection — no CAPTCHA
- Success / error states handled in form component

---

## Deployment

The site is designed for one-click Vercel deployment:

1. Push to GitHub (already done)
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Set environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`)
4. Vercel auto-detects Next.js — no build config needed
5. Every push to `main` triggers a production deploy
6. Every PR gets a preview URL

See `docs/DEPLOYMENT.md` for custom domain, analytics, and environment setup.

---

## Design System

- **Theme:** Dark (`#080808` base), amber accent (`#F59E0B`), zinc grays
- **Grain overlay:** CSS noise texture on hero sections (`.grain` class)
- **Photo overlays:** Gradient overlays on Unsplash background images
- **Animations:** Framer Motion — enter animations on scroll (`whileInView`), page transitions via `AnimatePresence`
- **Typography:** Geist Sans (body), Geist Mono (numbers, code, labels)
- **Module accents:** Each module has its own hex accent colour used for borders, icons, and labels

See `docs/DESIGN.md` for full design decisions.

---

## Source App

All feature content is derived from the production BPApp codebase at `~/development/PapyrusBPApp`:

- Backend: Express.js + PostgreSQL + Redis + BullMQ
- Frontend: Next.js + Expo React Native
- 44 modules, multi-tenant, RBAC
- GST / TDS / FEMA / PF / ESI compliant

Do not copy code from BPApp into this repo. This site contains only public marketing content.

---

## Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # ESLint
```
