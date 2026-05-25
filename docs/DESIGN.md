# Design System

## Theme: Modern SaaS Dark

Reference sites: Linear, Vercel, Resend, Raycast

---

## Color Palette

```css
/* Background */
--bg-base:        #0a0a0a   /* near-black */
--bg-surface:     #111111   /* card backgrounds */
--bg-elevated:    #1a1a1a   /* hover states, modals */
--bg-border:      #2a2a2a   /* dividers, card borders */

/* Accent — Papyrus teal/green (paper mill → natural feel) */
--accent-primary: #10b981   /* emerald-500 — primary CTA */
--accent-hover:   #059669   /* emerald-600 */
--accent-muted:   #064e3b   /* emerald-900 — subtle backgrounds */
--accent-glow:    rgba(16, 185, 129, 0.15)

/* Text */
--text-primary:   #f9fafb   /* gray-50 */
--text-secondary: #9ca3af   /* gray-400 */
--text-muted:     #6b7280   /* gray-500 */

/* Highlight (yellow for Deckle Optimizer / AI sections) */
--highlight:      #f59e0b   /* amber-500 */
```

**Rationale:** Emerald green evokes paper/nature while feeling premium. Matches production-tech positioning.

---

## Typography

```css
/* Heading */
font-family: 'Geist', system-ui, sans-serif;  /* via next/font */

/* Monospace (code blocks, stats) */
font-family: 'Geist Mono', monospace;

/* Scale */
--text-hero:    clamp(2.5rem, 6vw, 4.5rem)   /* Hero headline */
--text-h1:      clamp(2rem, 4vw, 3rem)
--text-h2:      clamp(1.5rem, 3vw, 2rem)
--text-h3:      1.25rem
--text-body:    1rem
--text-small:   0.875rem
--text-xs:      0.75rem
```

---

## Layout

```
Max content width:  1280px  (7xl)
Horizontal padding: 1.5rem (mobile) → 2rem (tablet) → 4rem (desktop)
Section padding:    5rem top/bottom (py-20)
Card radius:        0.75rem (rounded-xl)
```

---

## Component Patterns

### Buttons
```
Primary:   bg-emerald-500 text-white hover:bg-emerald-600, rounded-lg px-6 py-2.5
Secondary: border border-white/10 text-white hover:bg-white/5, rounded-lg px-6 py-2.5
Ghost:     text-gray-400 hover:text-white, no border
```

### Cards (Feature cards)
```
bg-[#111] border border-white/5 rounded-xl p-6
hover: border-emerald-500/30, shadow-[0_0_30px_rgba(16,185,129,0.05)]
transition: all 200ms ease
```

### Section Header
```
- Eyebrow label: text-emerald-500 text-sm font-medium uppercase tracking-wider
- Title: text-white text-3xl font-bold
- Subtitle: text-gray-400 text-lg max-w-2xl mx-auto
```

### Gradient Hero Background
```css
background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.15), transparent),
            linear-gradient(to bottom, #0a0a0a, #111111);
```

### Grid overlay (subtle texture)
```css
background-image: url("data:image/svg+xml,...");  /* 40px grid lines at 3% opacity */
```

---

## Motion (Framer Motion)

```
Page sections: fadeInUp (y: 20 → 0, opacity: 0 → 1, duration: 0.5s)
Cards:         stagger 0.1s per card
Hover states:  scale(1.02) on card hover
Reduce motion: respect prefers-reduced-motion
```

---

## Icons

Library: `lucide-react`

| Section | Icons |
|---------|-------|
| Sales | `ShoppingCart`, `FileText`, `TrendingUp` |
| Procurement | `Package`, `Truck`, `ClipboardList` |
| Production | `Factory`, `Cog`, `BarChart2` |
| Inventory | `Boxes`, `Layers`, `QrCode` |
| Finance | `Calculator`, `Receipt`, `IndianRupee` |
| HR | `Users`, `Clock`, `Award` |
| AI | `Sparkles`, `MessageSquare`, `Zap` |
| Deckle | `Scissors`, `BarChart`, `Target` |

---

## Responsive Breakpoints

```
sm:   640px  (phablet)
md:   768px  (tablet)
lg:   1024px (laptop)
xl:   1280px (desktop)
2xl:  1536px (wide)
```

Feature grid: 1 col (mobile) → 2 col (md) → 3 col (lg)
