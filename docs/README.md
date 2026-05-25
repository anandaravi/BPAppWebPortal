# Papyrus BPApp — Web Portal Docs

Public marketing website for Papyrus BPApp ERP.

## Documents

| Doc | Contents |
|-----|---------|
| [PROJECT.md](./PROJECT.md) | What this is, decisions log, target audience |
| [TECH-STACK.md](./TECH-STACK.md) | Framework choices, project structure, tooling |
| [PAGES.md](./PAGES.md) | Sitemap, page layouts, sections, SEO metadata |
| [FEATURES.md](./FEATURES.md) | All 9 ERP modules — taglines, capabilities, differentiators |
| [DESIGN.md](./DESIGN.md) | Color palette, typography, component patterns, motion |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Dev setup, commands, code style, content updates |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel setup, env vars, domain, performance targets |

## Quick Summary

- **What:** Public marketing site for Papyrus BPApp (paper manufacturing ERP)
- **Stack:** Next.js 15 + Tailwind CSS + shadcn/ui
- **Theme:** Modern SaaS dark (emerald accent)
- **Pages:** `/` (home), `/features`, `/contact`
- **Deploy:** Vercel (auto-deploy from GitHub)
- **Auth:** None — fully public

## Next Step

```bash
cd ~/development/webportal
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Then scaffold components per [PAGES.md](./PAGES.md) and [TECH-STACK.md](./TECH-STACK.md).
