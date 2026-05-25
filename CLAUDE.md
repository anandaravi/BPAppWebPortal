@AGENTS.md

## Project Context

**What this is:** Public marketing website for Papyrus BPApp — enterprise ERP for Indian paper manufacturing.
**Live URL:** https://papyrusbpapp.vercel.app
**GitHub:** https://github.com/anandaravi/BPAppWebPortal
**Deploy:** Vercel — auto-deploys on every push to `main`

## Source App

All feature content derived from the real BPApp product:
- **Location:** `~/development/PapyrusBPApp`
- Backend: Express.js + PostgreSQL + Redis + BullMQ
- Frontend: Next.js + Expo React Native
- 44 modules, multi-tenant, RBAC
- GST / TDS / FEMA / PF / ESI compliant
- When updating module content, read the actual source at `~/development/PapyrusBPApp/api/modules/` and `~/development/PapyrusBPApp/frontend/modules/` — don't guess features

## Module Data

All 44 module definitions live in `src/lib/modules/`:
- `data.ts` — core modules (sales, procurement, production, deckle, inventory, finance, hr, ai, party)
- `extra-data.ts` — additional modules (stock-prep, converting, broke, recipe, crm, helpdesk, marketing, field-service, iot, digital-twin, sustainability, edge, rpa, voice, doc-intel, ecm)
- `platform-data.ts` — platform modules (administration, rbac, email-hub, notifications, monitoring, maintenance, quality, projects, automations, mobile, documents, product-catalog, pricing, lookups, number-series, business-profile, approvals, audit, lab-master)

To add a new icon: import from `lucide-react`, add to `src/lib/icons.ts` ICONS map.

## Design System

- **Theme:** Dark (`#080808` base), amber accent `#F59E0B`, zinc grays
- **Module accents:** Each module has its own hex colour (e.g. Production `#F97316`, Deckle `#EF4444`)
- **Fonts:** Geist Sans + Geist Mono via next/font
- **Animations:** Framer Motion — `whileInView` on scroll, `AnimatePresence` in `page-transition.tsx`
- Do NOT put `AnimatePresence` in `providers.tsx` — it wraps multiple static children and generates empty keys

## Infographics

Requirements doc: `docs/infographics/requirements.md`
- 127 total visual assets needed across all modules
- Status tracked in that doc — update `[ ]` → `[x]` when an asset is generated/downloaded
- Photos: 1920×1080 hero, 1200×800 feature sections
- Tools: Figma (mockups), Excalidraw (diagrams), Canva (infographics), BPApp screenshots (UI mockups)
- For UI mockups: run BPApp locally at `~/development/PapyrusBPApp` and capture actual screens

## Vercel Project

- Project name: `papyrusbpapp`
- Project ID: `prj_EARZkYWZ4HcnHejkahBxpcQgahJD`
- Team ID: `team_VflvNszTOBhmWkw8mJpmYekV`
- Token in `.vercel/` — use `npx vercel` CLI for deployments

## Logo

- **File:** `public/bp_app.png` — the official app logo. **DO NOT replace, regenerate, or overwrite this file.**
- Component: `src/components/ui/logo.tsx` — renders the PNG at 3 sizes (sm/md/lg). Do not rewrite to SVG or other format.
- Any script that generates or moves images must explicitly exclude `public/bp_app.png`.

## Key Decisions

- No auth — public marketing site only
- Contact form uses Resend (`src/app/api/contact/route.ts`) — needs `RESEND_API_KEY` env var on Vercel
- Images currently use Unsplash placeholders — replace with real BPApp-specific assets from `docs/infographics/requirements.md`
- Never mention CPLEX/HiGHS/MILP/metaheuristic/greedy — use "proprietary optimization engine"
