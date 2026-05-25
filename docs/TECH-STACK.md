# Tech Stack

## Core

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 15 (App Router) |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | latest |
| Icons | Lucide React | latest |
| Animations | Framer Motion | latest |
| Forms | React Hook Form + Zod | latest |

## Content

| Purpose | Choice |
|---------|--------|
| Blog/docs (optional) | MDX via `@next/mdx` |
| Images | Next.js `<Image>` with WebP |
| Fonts | Geist (variable) via `next/font` |

## Contact Form

| Purpose | Choice |
|---------|--------|
| Form backend | Resend (email delivery) OR Formspree |
| Validation | Zod schema, server action |
| Spam | Honeypot field (no CAPTCHA friction) |

## Dev Tooling

| Tool | Purpose |
|------|---------|
| ESLint + Prettier | Linting/formatting |
| Husky + lint-staged | Pre-commit hooks |
| Turbopack | Dev server (built into Next.js 15) |

## Deployment

| Stage | Platform |
|-------|----------|
| Hosting | Vercel |
| CI/CD | Vercel Git integration (auto-deploy on push) |
| Preview | Vercel Preview URLs per PR/branch |
| Analytics | Vercel Analytics (free tier) |
| OG Images | `@vercel/og` / next/og |

---

## Project Structure

```
webportal/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (font, theme, metadata)
│   │   ├── page.tsx                # Home / landing page
│   │   ├── features/
│   │   │   └── page.tsx            # Full features showcase
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact / demo request form
│   │   ├── about/
│   │   │   └── page.tsx            # About Papyrus (optional)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # Server action for contact form
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── sections/               # Page sections (reusable)
│   │   │   ├── hero.tsx
│   │   │   ├── features-grid.tsx
│   │   │   ├── module-spotlight.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── testimonials.tsx    # (optional)
│   │   │   └── cta-banner.tsx
│   │   └── ui/                     # shadcn/ui primitives
│   ├── lib/
│   │   ├── constants.ts            # Site metadata, nav links
│   │   └── utils.ts                # cn() and helpers
│   └── styles/
│       └── globals.css
├── public/
│   ├── logo.svg
│   └── og-image.png
├── docs/                           # This folder
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
