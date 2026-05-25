# Development Guide

## Prerequisites

- Node.js 20 LTS
- npm 10+
- Git

---

## Getting Started

```bash
cd ~/development/webportal
npm install
npm run dev        # starts at http://localhost:3000
```

## Commands

```bash
npm run dev        # dev server (Turbopack)
npm run build      # production build
npm run start      # production server
npm run lint       # ESLint
npm run type-check # tsc --noEmit
```

---

## Adding a New Page

1. Create `src/app/[pagename]/page.tsx`
2. Add metadata export:
   ```tsx
   export const metadata: Metadata = {
     title: 'Page Title — Papyrus BPApp',
     description: '...',
   }
   ```
3. Add nav link in `src/lib/constants.ts`

---

## Adding a New Feature Section

1. Create `src/components/sections/[section-name].tsx`
2. Mark `'use client'` only if it needs interactivity
3. Import in the relevant page
4. Wrap with `<motion.section>` for scroll animations

---

## Contact Form Server Action

File: `src/app/api/contact/route.ts`

```ts
// POST handler validates with Zod, sends via Resend
// Never expose RESEND_API_KEY to client
```

Form validation schema: `src/lib/schemas/contact.ts`

---

## Code Style

- No comments unless WHY is non-obvious
- No default exports on components (`export function Hero()`)
- Tailwind only — no inline styles
- `cn()` from `src/lib/utils.ts` for conditional classes
- Server Components by default; `'use client'` only when needed

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | Site name, nav links, social links, feature data |
| `src/lib/utils.ts` | `cn()` utility + helpers |
| `src/app/layout.tsx` | Root layout: fonts, metadata, analytics |
| `src/components/layout/navbar.tsx` | Top nav with mobile menu |
| `src/components/layout/footer.tsx` | Footer |
| `src/components/sections/hero.tsx` | Hero section |
| `src/components/sections/features-grid.tsx` | 6-module feature cards |

---

## Content Updates

All feature content lives in `src/lib/constants.ts` as typed arrays:

```ts
export const MODULES = [
  {
    id: 'sales',
    name: 'Sales Management',
    tagline: '...',
    icon: 'ShoppingCart',
    capabilities: ['...', '...', '...', '...'],
    differentiator: '...',
  },
  // ...
]
```

Update `MODULES` to change feature content without touching components.

---

## Fonts

Using Geist via `next/font/google` — zero layout shift, auto-optimized.

```tsx
// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'
```

---

## Images / Assets

- Place in `public/` directory
- Use `next/image` `<Image>` component — never `<img>`
- Format: WebP preferred, SVG for logos/icons
- OG image: `public/og-image.png` (1200×630)
