@AGENTS.md

## Project Context

**What this is:** Public marketing website for Papyrus BPApp — enterprise ERP for Indian paper manufacturing.
**Live URL:** https://bpapperp.papyrus360.com (permanent custom domain)
**Vercel URL:** https://papyrusbpapp.vercel.app
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

### AI Image Generation (Cloudflare Workers AI)

Credentials in `.env` (two accounts, each 10k neurons/day free):
- `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` (primary)
- `CLOUDFLARE_ACCOUNT_ID2` + `CLOUDFLARE_API_TOKEN2` (fallback)

Endpoint:
```
POST https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/black-forest-labs/flux-1-schnell
Authorization: Bearer $API_TOKEN
Content-Type: application/json
Body: {"prompt":"<prompt>","steps":4}
```
Response: binary PNG. Save direct to `public/images/<module>/<asset>.png`.

Other available models: `@cf/stabilityai/stable-diffusion-xl-base-1.0`, `@cf/lykon/dreamshaper-8-lcm`.

Workflow:
1. Pick next `[ ]` asset from `docs/infographics/requirements.md`
2. Generate with flux-1-schnell (fastest, 4 steps)
3. If account1 returns HTTP 429 (quota), retry account2
4. Save to target path, mark `[x]` in requirements doc
5. Never overwrite `public/bp_app.png` or `public/papyrus360.png`

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
