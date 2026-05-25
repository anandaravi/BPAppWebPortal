# Papyrus BPApp — Web Portal

## What This Is

Public marketing website for Papyrus BPApp — an enterprise ERP purpose-built for the Indian paper manufacturing industry.

**Goals:**
- Lead generation & demo requests
- Product feature showcase
- Company information
- Public product documentation

**Not this:**
- Internal admin app (that's `PapyrusBPApp/frontend/apps/web`)
- Customer/vendor portal (no auth)
- Mobile app (that's `PapyrusBPApp/frontend/apps/mobile`)

---

## Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 15 + Tailwind CSS | Matches existing monorepo stack; Vercel-native |
| Repo | Standalone (`~/development/webportal`) | Independent deployments; no monorepo entanglement |
| Auth | None | Public marketing site |
| Theme | Modern SaaS dark | Brand positioning — tech-forward, modern |
| Deploy | Vercel | Zero-config Next.js; free tier |
| Domain | TBD | Configure in Vercel after first deploy |

---

## Target Audience

Anyone evaluating paper mill ERP software:
- Mill owners / operations directors
- Finance controllers (GST compliance focus)
- IT managers (integration, deployment)
- Procurement & production heads

---

## Source App

All feature content derived from: `~/development/PapyrusBPApp`

- Backend: Express.js + PostgreSQL + Redis + BullMQ
- Frontend: Next.js 14, Expo React Native
- 19 modules, 50+ DB migrations
- GST/TDS/FEMA compliant, multi-tenant, RBAC
