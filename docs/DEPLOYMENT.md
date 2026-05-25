# Deployment Guide

## Platform: Vercel

Zero-config Next.js deployment. Automatic preview URLs per branch.

---

## Initial Setup

### 1. Initialize Next.js 15 project

```bash
cd ~/development/webportal
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack  # enable manually in next.config.ts if desired
```

### 2. Install dependencies

```bash
npm install framer-motion lucide-react
npm install react-hook-form @hookform/resolvers zod
npm install clsx tailwind-merge
npx shadcn@latest init
```

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Next.js 15 webportal scaffold"
git remote add origin git@github.com:YOUR_ORG/papyrus-webportal.git
git push -u origin main
```

### 4. Deploy to Vercel

Option A — Vercel CLI:
```bash
npm i -g vercel
vercel
```

Option B — Vercel Dashboard:
1. Go to vercel.com → New Project
2. Import GitHub repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

---

## Environment Variables

### Contact Form (Resend)

```bash
# .env.local (never commit)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=contact@papyrusbpapp.com
```

Set in Vercel: Project Settings → Environment Variables

### Optional

```bash
NEXT_PUBLIC_SITE_URL=https://papyrusbpapp.com
```

---

## Vercel Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| Node.js Version | 20.x |

### Analytics

Enable in Vercel Dashboard → Analytics tab (free tier: 2500 events/month)

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';
// <Analytics /> in root layout
```

---

## Domain Setup

1. Buy domain (e.g., papyrusbpapp.com via Namecheap/GoDaddy)
2. Vercel → Project → Settings → Domains → Add Domain
3. Follow DNS instructions (CNAME or A record)
4. SSL auto-provisioned by Vercel

---

## Branches / Preview

| Branch | URL |
|--------|-----|
| `main` | production domain |
| `dev` / PRs | `papyrus-webportal-git-branch.vercel.app` |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |
| Bundle size (initial JS) | < 150KB gzipped |

Strategies:
- `next/image` for all images (WebP, lazy load)
- `next/font` for zero-CLS font loading
- Static export for all marketing pages (no SSR needed)
- Minimize client components — prefer React Server Components
