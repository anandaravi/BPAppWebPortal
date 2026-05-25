# Site Pages & Structure

## Sitemap

```
/                   Home (landing page)
/features           Full features showcase
/contact            Contact / Demo request
```

Optional (Phase 2):
```
/about              Company / team
/blog               Articles (MDX)
/docs               Public documentation
/pricing            Pricing / contact-for-pricing
```

---

## Page: `/` — Home

### Sections (top to bottom)

1. **Navbar**
   - Logo (Papyrus BPApp)
   - Nav links: Features, Contact, [Request Demo CTA button]

2. **Hero**
   - Headline: "The ERP Built for Paper Mills"
   - Sub-headline: GST-native, AI-powered, built for Indian paper manufacturing
   - Primary CTA: "Request a Demo"
   - Secondary CTA: "See Features"
   - Background: gradient dark with subtle grid/noise texture
   - Visual: product screenshot / mockup (dashboard)

3. **Stats Bar**
   - 19+ Modules
   - 50+ Database migrations
   - 3 Languages (EN, HI, TA)
   - AI-powered optimization
   - GST/FEMA/TDS compliant

4. **Features Grid**
   - 6-card grid — top 6 modules with icon, name, 1-line description
   - Hover: expand to 3 bullet points
   - Modules: Sales, Production, Procurement, Inventory, Finance, HR

5. **Module Spotlight — Deckle Optimizer**
   - Full-width section
   - Headline: "AI-Powered Trim Optimization"
   - 3-tier optimization engine explanation
   - Key stat: "Minimize waste, maximize reel recovery"
   - Visual: optimization diagram or screenshot

6. **Module Spotlight — AI Analytics**
   - Chat interface visual
   - "Ask your ERP anything" positioning

7. **Industries / Use Cases**
   - Paper Mills, Converting Units, Trading Houses

8. **CTA Banner**
   - "Ready to optimize your mill?"
   - "Request Demo" button

9. **Footer**
   - Logo, tagline
   - Nav links
   - Contact email/phone (TBD)
   - © Papyrus BPApp

---

## Page: `/features` — Features

### Layout

- Page header with title
- Tab or anchor nav: Sales | Procurement | Production | Inventory | Finance | HR | AI | Deckle Optimizer | Party
- Each module section:
  - Icon + Name
  - Tagline
  - 4 capability bullet points
  - Differentiator callout (highlighted box)

---

## Page: `/contact` — Contact / Demo

### Form Fields

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | yes |
| Company Name | text | yes |
| Email | email | yes |
| Phone | tel | no |
| Role | select (Owner/GM/Finance/IT/Other) | yes |
| Company Size | select (1-50 / 51-200 / 201-500 / 500+) | no |
| Message / What are you looking for? | textarea | no |
| Honeypot (hidden) | text | — |

### After Submit
- Success state: "Thank you! We'll reach out within 1 business day."
- Error state: "Something went wrong. Email us directly at [email]."
- Form submission → Resend API (server action, no client-side secrets)

---

## SEO Metadata

| Page | Title | Description |
|------|-------|-------------|
| `/` | Papyrus BPApp — ERP for Paper Mills | Enterprise ERP built for Indian paper manufacturing. GST-native, AI-powered, complete from orders to payroll. |
| `/features` | Features — Papyrus BPApp | Explore 19 modules: Sales, Production, Finance, HR, AI analytics, and the proprietary Deckle Optimizer. |
| `/contact` | Request a Demo — Papyrus BPApp | See Papyrus BPApp in action. Request a personalized demo for your paper mill. |

### OG Image
- Size: 1200×630
- Style: dark background, logo, tagline
- Generated via `next/og`
