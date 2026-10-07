# BuyLens AI — Style Guide

**Version:** 1.0
**Audience:** AI coding agent + human developers
**Companion document:** Master PRD / Engineering README
**Stack assumed:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React, Inter (or Geist)

> **Authority rule.** This file is the single source of truth for all visual styling. Where the PRD's older color section (§10) conflicts with this file, **this file wins**. Never hardcode a hex value, pixel value, shadow, or radius in a component; always use the tokens defined here.

---

## 0. Quick reference (read this first)

| Concept | Value |
|---|---|
| Brand feel | Premium fintech + AI research tool + editorial decision product. Calm, precise, trustworthy |
| Proportion | **80% neutral / 15% navy / 5% lime + status colors** |
| Primary | Deep Navy `#0B1220` (`primary-950`) |
| Secondary / accent | Electric Lime `#B8F34A` (`secondary-300`) |
| Page background | Warm off-white `#F7F8F5` |
| Surface (cards) | White `#FFFFFF` |
| Border | `#E4E7EC` |
| Primary text | `#101828` |
| Secondary text | `#667085` |
| Font | Inter (fallback Geist, system-ui) |
| Card radius | 14px (`rounded-card`) |
| Default card elevation | Border + background contrast, **no shadow**; shadow only on hover/elevated |
| Decision card | Dark navy, lime accent, the visual signature of the product |
| Motion | 150–250ms ease-out; no bounce, no confetti, no constant motion |
| Icons | Lucide React only, 16/18/20/24px |

**The one question every screen serves:** *"Should I buy this?"*

---

## 1. Design principles (styling-specific)

1. **Decision first.** The verdict and score are the largest, highest-contrast elements on any report screen.
2. **Calm over loud.** Most of the UI is neutral. Color is used to communicate meaning, not decorate.
3. **Lime is a signal, not a theme.** It appears on navy surfaces, active states, and key emphasis. It is never a large background on light surfaces.
4. **Green is not the brand.** Do not create green buttons, green cards, green charts, or green backgrounds. Green means "Buy / success" only.
5. **Never color alone.** Every verdict, risk level, and severity uses **icon + text label + color**.
6. **Restrained rounding, restrained shadow.** No pill-shaped cards, no heavy drop shadows, no glassmorphism, no neon glow.
7. **Editorial hierarchy.** Big numerals, generous whitespace, clear typographic scale.

**Forbidden:** purple/blue "AI" gradients, glassmorphism, neon glows, animated blobs, cartoon AI imagery, chatbot bubbles, bouncing cards, confetti, giant decorative icons, dashboard clutter, emojis in UI chrome.

---

## 2. Color system

### 2.1 Brand scales (add to `tailwind.config.ts`)

```ts
// tailwind.config.ts → theme.extend.colors
primary: {
  50:  '#f3f6fc',
  100: '#e6ecf8',
  200: '#c7d7f0',
  300: '#96b6e3',
  400: '#5e8fd2',
  500: '#3971be',
  600: '#2958a0',
  700: '#224682',
  800: '#203d6c',
  900: '#1f355b',
  950: '#0b1220', // Deep Navy — brand primary
},
secondary: {
  50:  '#f7fee7',
  100: '#edfdca',
  200: '#dbfb9b',
  300: '#b8f34a', // Electric Lime — brand accent
  400: '#a7e932',
  500: '#88cf13',
  600: '#68a60a',
  700: '#4f7e0d',
  800: '#416311',
  900: '#375413',
  950: '#1b2f04',
},
```

### 2.2 Neutral and surface tokens

| Token | Hex | Tailwind name | Use |
|---|---|---|---|
| Background | `#F7F8F5` | `bg-canvas` | Page background (warm off-white) |
| Surface | `#FFFFFF` | `bg-surface` | Cards, inputs, modals |
| Surface subtle | `#F2F4F0` | `bg-surface-subtle` | Nested blocks inside cards, table headers, skeleton base |
| Surface navy | `#0B1220` | `bg-primary-950` | Decision card, primary buttons, nav active, footer |
| Surface navy raised | `#111A2B` | `bg-navy-raised` | Elements sitting on navy (inner tiles, hover on navy) |
| Border | `#E4E7EC` | `border-line` | Default borders |
| Border strong | `#D0D5DD` | `border-line-strong` | Input borders, hover borders |
| Border on navy | `rgba(255,255,255,0.10)` | `border-navy-line` | Borders inside navy surfaces |
| Text primary | `#101828` | `text-ink` | Headings, key values |
| Text secondary | `#667085` | `text-ink-muted` | Body secondary, descriptions |
| Text tertiary | `#98A2B3` | `text-ink-faint` | Metadata, placeholders (large text only if contrast fails) |
| Text on navy | `#FFFFFF` | `text-on-navy` | Primary text on navy |
| Text on navy muted | `#A8B3C7` | `text-on-navy-muted` | Secondary text on navy |

```ts
// tailwind.config.ts → theme.extend.colors (continued)
canvas: '#F7F8F5',
surface: { DEFAULT: '#FFFFFF', subtle: '#F2F4F0' },
'navy-raised': '#111A2B',
line: { DEFAULT: '#E4E7EC', strong: '#D0D5DD' },
'navy-line': 'rgba(255,255,255,0.10)',
ink: { DEFAULT: '#101828', muted: '#667085', faint: '#98A2B3' },
'on-navy': { DEFAULT: '#FFFFFF', muted: '#A8B3C7' },
```

### 2.3 Semantic (status) colors

Each status has **four** variants. Use the right one for the job:

| Status | Solid (icons, bars, dots) | Text (on white/light bg) | Tint bg | Tint border |
|---|---|---|---|---|
| Success | `#16A34A` | `#15803D` | `#ECFDF3` | `#ABEFC6` |
| Lime (positive, "worth considering") | `#84CC16` | `#4D7C0F` | `#F7FEE7` | `#D9F99D` |
| Warning | `#F59E0B` | `#B45309` | `#FFFAEB` | `#FEDF89` |
| Danger | `#DC2626` | `#B42318` | `#FEF3F2` | `#FECDCA` |
| Neutral / info | `#64748B` | `#475467` | `#F2F4F7` | `#E4E7EC` |
| Info (rare) | `#3971be` | `#2958a0` | `#F3F6FC` | `#C7D7F0` |

```ts
status: {
  success: { DEFAULT: '#16A34A', text: '#15803D', bg: '#ECFDF3', border: '#ABEFC6' },
  consider:{ DEFAULT: '#84CC16', text: '#4D7C0F', bg: '#F7FEE7', border: '#D9F99D' },
  warning: { DEFAULT: '#F59E0B', text: '#B45309', bg: '#FFFAEB', border: '#FEDF89' },
  danger:  { DEFAULT: '#DC2626', text: '#B42318', bg: '#FEF3F2', border: '#FECDCA' },
  neutral: { DEFAULT: '#64748B', text: '#475467', bg: '#F2F4F7', border: '#E4E7EC' },
},
```

**Contrast rules (important):**

- **Never** put lime `#B8F34A` or `#84CC16` as *text* on white or off-white. It fails contrast. Lime text is allowed **only on navy** (`#0B1220`).
- Lime as a *background* requires **navy text** (`#0B1220`), never white.
- Amber `#F59E0B` as text on white fails. Use `status.warning.text` (`#B45309`).
- On white surfaces, status meaning is carried by: tinted background + `text` variant + icon.

### 2.4 Verdict color map

| Verdict | Label | Icon (Lucide) | Solid | Text | Tint bg |
|---|---|---|---|---|---|
| `BUY` | Buy | `CheckCircle2` | `#16A34A` | `#15803D` | `#ECFDF3` |
| `WORTH_CONSIDERING` | Worth considering | `ThumbsUp` or `ScanSearch` | `#84CC16` | `#4D7C0F` | `#F7FEE7` |
| `WAIT` | Wait | `Clock` or `PauseCircle` | `#F59E0B` | `#B45309` | `#FFFAEB` |
| `AVOID` | Avoid | `ShieldAlert` or `XOctagon` | `#DC2626` | `#B42318` | `#FEF3F2` |
| `INSUFFICIENT_INFORMATION` | Need more info | `HelpCircle` | `#64748B` | `#475467` | `#F2F4F7` |

Implement in one place:

```ts
// src/lib/utils/verdict.ts
export const VERDICT_STYLES = {
  BUY: { label: 'Buy', icon: 'CheckCircle2', dot: 'bg-status-success', text: 'text-status-success-text', bg: 'bg-status-success-bg', border: 'border-status-success-border' },
  WORTH_CONSIDERING: { label: 'Worth considering', icon: 'ThumbsUp', dot: 'bg-status-consider', text: 'text-status-consider-text', bg: 'bg-status-consider-bg', border: 'border-status-consider-border' },
  WAIT: { label: 'Wait', icon: 'Clock', dot: 'bg-status-warning', text: 'text-status-warning-text', bg: 'bg-status-warning-bg', border: 'border-status-warning-border' },
  AVOID: { label: 'Avoid', icon: 'ShieldAlert', dot: 'bg-status-danger', text: 'text-status-danger-text', bg: 'bg-status-danger-bg', border: 'border-status-danger-border' },
  INSUFFICIENT_INFORMATION: { label: 'Need more info', icon: 'HelpCircle', dot: 'bg-status-neutral', text: 'text-status-neutral-text', bg: 'bg-status-neutral-bg', border: 'border-status-neutral-border' },
} as const;
```

### 2.5 Severity and risk maps

| Level | Label | Icon | Color family |
|---|---|---|---|
| `LOW` | Low | `CircleCheck` | success |
| `MEDIUM` | Medium | `AlertTriangle` | warning |
| `HIGH` | High | `AlertOctagon` | danger |
| `CRITICAL` | Critical | `ShieldAlert` (filled, bolder) | danger, solid bg `#DC2626` with white text |

Missing-info importance: `LOW` = neutral, `MEDIUM` = warning, `HIGH` = danger.

**Risk semantics:** display Risk as a **level** (Low / Medium / High / Critical), never as a 0–100 number. For Price and Value show `92 / 100`. For Information show `64%`.

### 2.6 Color usage budget

```
80% neutral  → canvas, surface, borders, ink text
15% navy     → buttons, nav active, decision card, headings, footer
 5% lime     → CTA emphasis on navy, score ring accent, active indicators
   + status  → only where meaning is communicated
```

If a screen looks green, it is wrong. If lime appears on a white card as text, it is wrong.

### 2.7 Where lime IS allowed

- Score ring progress stroke on the navy decision card
- Primary hero CTA arrow / small accent on navy
- Active nav indicator (2–3px bar or dot)
- Selected comparison dot/handle on trade-off sliders
- Focus ring accent on navy surfaces
- Small "live"/active pulse dot in progress steps
- The "BUY LENS RECOMMENDS" eyebrow label on the recommendation panel
- Lime button (`variant="accent"`) on navy surfaces only

### 2.8 Dark mode

Out of scope for MVP. The app is **light mode with a dark navy decision layer**. Do not add a theme toggle. Use CSS variables (below) so dark mode can be added later.

### 2.9 CSS variables (global.css)

```css
:root {
  --bg-canvas: #F7F8F5;
  --bg-surface: #FFFFFF;
  --bg-surface-subtle: #F2F4F0;
  --bg-navy: #0B1220;
  --bg-navy-raised: #111A2B;

  --border: #E4E7EC;
  --border-strong: #D0D5DD;
  --border-navy: rgba(255, 255, 255, 0.10);

  --text-primary: #101828;
  --text-secondary: #667085;
  --text-tertiary: #98A2B3;
  --text-on-navy: #FFFFFF;
  --text-on-navy-muted: #A8B3C7;

  --accent: #B8F34A;
  --accent-hover: #A7E932;

  --focus-ring: #3971be;
  --focus-ring-on-navy: #B8F34A;

  --radius-sm: 8px;
  --radius-input: 10px;
  --radius-card: 14px;
  --radius-panel: 18px;
  --radius-modal: 20px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

html { background: var(--bg-canvas); color: var(--text-primary); }
body { font-family: var(--font-inter), 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif; }
```

---

## 3. Typography

### 3.1 Font

- **Primary:** Inter via `next/font/google`, `variable: '--font-inter'`, `display: 'swap'`
- **Alternative:** Geist (only if the team switches; do not mix)
- **Mono (rare, for IDs/codes):** `ui-monospace, SFMono-Regular, Menlo, monospace`
- Enable `font-feature-settings: 'cv11', 'ss01'` (Inter single-storey a) optionally; always enable **tabular numerals** on money and scores: `font-variant-numeric: tabular-nums;`

### 3.2 Type scale

| Token | Desktop | Mobile | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|---|
| `display-xl` | 72px | 44px | 600 | 1.02 | -0.035em | Landing hero headline |
| `display` | 56px | 38px | 600 | 1.05 | -0.03em | Landing section hero, final decision verdict |
| `score` | 96px | 72px | 600 | 1.0 | -0.04em | Score numeral on decision card |
| `h1` | 44px | 32px | 600 | 1.1 | -0.025em | Page headings |
| `h2` | 30px | 24px | 600 | 1.2 | -0.02em | Section headings |
| `h3` | 22px | 20px | 600 | 1.3 | -0.01em | Card headings |
| `h4` | 18px | 17px | 600 | 1.35 | -0.005em | Sub-card headings |
| `body-lg` | 17px | 16px | 400 | 1.6 | 0 | Hero supporting text, summaries |
| `body` | 15px | 15px | 400 | 1.6 | 0 | Default body |
| `body-sm` | 14px | 14px | 400 | 1.55 | 0 | Secondary text |
| `caption` | 13px | 13px | 500 | 1.45 | 0.005em | Helper text, metadata |
| `eyebrow` | 12px | 12px | 600 | 1.3 | 0.08em, UPPERCASE | Section labels ("BUY SCORE") |
| `button` | 15px | 15px | 500 | 1 | 0 | Buttons |

```ts
// tailwind.config.ts → theme.extend.fontSize
fontSize: {
  'display-xl': ['72px', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '600' }],
  display:      ['56px', { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '600' }],
  score:        ['96px', { lineHeight: '1',    letterSpacing: '-0.04em',  fontWeight: '600' }],
  h1:           ['44px', { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '600' }],
  h2:           ['30px', { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '600' }],
  h3:           ['22px', { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '600' }],
  h4:           ['18px', { lineHeight: '1.35', fontWeight: '600' }],
  'body-lg':    ['17px', { lineHeight: '1.6' }],
  body:         ['15px', { lineHeight: '1.6' }],
  'body-sm':    ['14px', { lineHeight: '1.55' }],
  caption:      ['13px', { lineHeight: '1.45', fontWeight: '500' }],
  eyebrow:      ['12px', { lineHeight: '1.3',  letterSpacing: '0.08em', fontWeight: '600' }],
},
```

Responsive sizes: use `text-[44px] md:text-h1` style or define fluid values with `clamp()`. Example: `font-size: clamp(2.75rem, 5vw + 1rem, 4.5rem)` for `display-xl`.

### 3.3 Typography rules

- Headings: `text-ink`, weight 600, tight tracking. **No weight 800/900.**
- Body paragraphs: max width **65ch** (`max-w-prose` or `max-w-[65ch]`).
- Money: `₦850,000` with tabular numerals, weight 600, never abbreviated in primary positions. Abbreviations (`₦850k`, `₦1.15m`) are allowed only inside compact comparison tiles and always with a tooltip/aria-label of the full figure.
- Always use the Naira symbol `₦`. Format with `Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })`.
- Eyebrows are always uppercase, 12px, `text-ink-muted` (or `text-on-navy-muted` on navy).
- No italic except for quoted seller text.
- No underlines except links in body copy (underline offset 3px, 1px thickness).
- Never center-align paragraphs longer than 2 lines.

---

## 4. Spacing, layout and grid

### 4.1 Spacing scale (4px base)

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`
Tailwind: `1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32`.
**Do not use arbitrary spacing values** like `13px` or `27px`.

### 4.2 Component spacing standards

| Context | Value |
|---|---|
| Card padding (standard) | 24px (`p-6`); mobile 20px (`p-5`) |
| Card padding (compact) | 16px (`p-4`) |
| Card padding (decision/hero) | 40px desktop (`p-10`); 24px mobile |
| Gap between cards in a grid | 20px (`gap-5`) |
| Gap between report sections | 48px desktop (`space-y-12`); 32px mobile (`space-y-8`) |
| Gap between label and value | 4–8px |
| Gap between icon and text | 8px (12px in large rows) |
| Form field vertical gap | 20px |
| Section padding (landing) | 96px desktop / 64px mobile vertical |
| Page horizontal padding | 24px desktop / 16px mobile |

### 4.3 Containers

| Container | Max width |
|---|---|
| App content | 1200px (`max-w-[1200px]`), centered |
| Landing content | 1280px |
| Reading column (summaries) | 720px |
| Auth card | 440px |
| Modal (default) | 520px |
| Drawer (desktop) | 480px |

Never stretch body text across the full 1440px viewport.

### 4.4 App shell

- **Desktop (≥1024px):** left sidebar **256px** wide, white surface, right border `#E4E7EC`. Top utility bar **64px** tall, `bg-canvas/90` with `backdrop-blur-sm` (blur subtle, 8px max) and bottom border. Content area padded 32px.
- **Tablet (640–1023px):** collapsed icon sidebar (72px) or top header + drawer.
- **Mobile (<640px):** top header 56px + **bottom navigation 64px** (+ safe-area inset). No permanent sidebar.

### 4.5 Grid

- 12-column grid on desktop, 8 on tablet, 4 on mobile; gutter 20px (24px on landing).
- Report desktop layout: `grid-cols-12`. Hero decision card `col-span-7`, product snapshot `col-span-5`. Strengths / Concerns `col-span-6` each. Full-width rows for breakdown, missing info, questions.

### 4.6 Breakpoints

```
sm: 640px   md: 768px   lg: 1024px   xl: 1280px   2xl: 1440px
```
Design targets: **1440×900** (competition presentation) and **390×844** (mobile).

---

## 5. Radius, borders, shadows

### 5.1 Radius tokens

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `sm` | 8px | `rounded-sm` (override) | Small controls, tags, icon buttons, chips |
| `input` | 10px | `rounded-input` | Inputs, selects, textareas, buttons (default) |
| `card` | 14px | `rounded-card` | Standard cards |
| `panel` | 18px | `rounded-panel` | Large panels, decision card, recommendation panel |
| `modal` | 20px | `rounded-modal` | Modals, drawers (top-left/top-right corners) |
| `full` | 999px | `rounded-full` | Badges/pills, avatars, score dots, toggle |

```ts
borderRadius: { sm: '8px', input: '10px', card: '14px', panel: '18px', modal: '20px' },
```

Nested radius rule: inner radius = outer radius − padding (min 6px). Example: a 14px card with 16px padding containing a nested tile uses 10px.

### 5.2 Border

- Default: `1px solid #E4E7EC`.
- Hover (interactive): `#D0D5DD`.
- Selected: `1.5px solid #0B1220` (navy) with no additional shadow, or `ring-2 ring-primary-950/10`.
- Never use colored borders on neutral cards except status-tinted cards (use status `border` tint).
- Dividers: `1px #E4E7EC`; inside navy: `1px rgba(255,255,255,0.10)`.

### 5.3 Shadow tokens

Shadows are **subtle, cool-tinted (navy-based), and used sparingly.** Default cards have **no shadow**.

| Token | Value | Use |
|---|---|---|
| `shadow-none` | none | Default cards, inputs, nav |
| `shadow-xs` | `0 1px 2px rgba(11,18,32,0.04)` | Inputs on focus-within (with ring), buttons (secondary) |
| `shadow-sm` | `0 1px 3px rgba(11,18,32,0.06), 0 1px 2px rgba(11,18,32,0.04)` | Card hover |
| `shadow-md` | `0 4px 12px -2px rgba(11,18,32,0.08), 0 2px 4px -2px rgba(11,18,32,0.04)` | Elevated cards (selected comparison card), dropdowns, toasts |
| `shadow-lg` | `0 12px 24px -6px rgba(11,18,32,0.12), 0 4px 8px -4px rgba(11,18,32,0.06)` | Popovers, drawers |
| `shadow-xl` | `0 24px 48px -12px rgba(11,18,32,0.18)` | Modals |
| `shadow-decision` | `0 20px 40px -16px rgba(11,18,32,0.35), inset 0 1px 0 rgba(255,255,255,0.06)` | Navy decision card only |
| `shadow-focus` | `0 0 0 3px rgba(57,113,190,0.25)` | Focus ring halo (light surfaces) |
| `shadow-focus-navy` | `0 0 0 3px rgba(184,243,74,0.35)` | Focus halo on navy surfaces |

```ts
boxShadow: {
  xs: '0 1px 2px rgba(11,18,32,0.04)',
  sm: '0 1px 3px rgba(11,18,32,0.06), 0 1px 2px rgba(11,18,32,0.04)',
  md: '0 4px 12px -2px rgba(11,18,32,0.08), 0 2px 4px -2px rgba(11,18,32,0.04)',
  lg: '0 12px 24px -6px rgba(11,18,32,0.12), 0 4px 8px -4px rgba(11,18,32,0.06)',
  xl: '0 24px 48px -12px rgba(11,18,32,0.18)',
  decision: '0 20px 40px -16px rgba(11,18,32,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
  focus: '0 0 0 3px rgba(57,113,190,0.25)',
  'focus-navy': '0 0 0 3px rgba(184,243,74,0.35)',
},
```

---

## 6. Cards (complete specification)

All cards are built from one base `<Card>` component with variants. **Do not create one-off card styles.**

### 6.1 Base `Card`

```tsx
<Card variant="default" | "subtle" | "interactive" | "selected" | "status" | "decision" | "recommendation" | "ghost" padding="sm|md|lg" />
```

### 6.2 Variant specs

#### A. `default` — standard surface card (most common)
```
background: #FFFFFF
border: 1px solid #E4E7EC
radius: 14px
padding: 24px (mobile 20px)
shadow: none
```
Used for: metric cards, report sections, form panels, settings groups, history rows (as list container).

#### B. `subtle` — nested block
```
background: #F2F4F0
border: 1px solid transparent (or #E4E7EC at 60%)
radius: 10px (nested) or 14px
padding: 16px
shadow: none
```
Used for: blocks inside a card (product snapshot rows, evidence quotes, key-value groups).

#### C. `interactive` — clickable card (analysis cards, history items, compare picker)
```
base: same as default
hover: border #D0D5DD, translateY(-2px), shadow-sm   (150ms ease-out)
active/pressed: translateY(0), scale(0.995) (100ms)
focus-visible: ring 2px #3971be, offset 2px
cursor: pointer
```
Whole card is the link/button target (use a real `<a>`/`<button>`; do not put `onClick` on a div).

#### D. `selected` — chosen state (compare option, selected analysis)
```
border: 1.5px solid #0B1220
background: #FFFFFF
shadow: shadow-md
transform: scale(1.01) (200ms ease-out)
indicator: 20px navy circle with lime check at top-right (Check icon 12px, color #B8F34A on #0B1220)
```

#### E. `status` — tinted semantic card (strength, concern, risk)
```
background: status.bg tint
border: 1px solid status.border
radius: 14px
padding: 20px
shadow: none
icon: 20px in status solid color, inside a 32px rounded-sm tile of white at 70% opacity
title: text-ink, h4
body: text-ink-muted, body-sm
```
- **StrengthCard:** success tint (`#ECFDF3`/`#ABEFC6`) with `CheckCircle2`.
- **ConcernCard:** tint by severity (Low=success, Medium=warning, High/Critical=danger) with severity badge in top-right.
- On white-surface sections, you may use the lighter variant: white background + 3px left accent border in the status solid color. Choose **one** approach per section and keep it consistent within a screen.

#### F. `decision` — the signature card (dark navy)
```
background: #0B1220
border: 1px solid rgba(255,255,255,0.08)
radius: 18px
padding: 40px desktop / 24px mobile
shadow: shadow-decision
text: #FFFFFF; secondary #A8B3C7
accent: lime #B8F34A (score ring stroke, small highlights)
top hairline: 1px linear-gradient(90deg, transparent, rgba(184,243,74,0.5), transparent) positioned at top edge (decorative, optional)
background detail (optional, very subtle): radial-gradient(600px 240px at 0% 0%, rgba(184,243,74,0.07), transparent 60%)
```
Contents (in order): eyebrow `BUY SCORE` (12px, uppercase, `#A8B3C7`) → score numeral (`score` size, white) with `/ 100` (24px, `#A8B3C7`) → ScoreRing (lime stroke on `rgba(255,255,255,0.10)` track) → verdict pill → one-sentence summary (`body-lg`, `#E4E9F2`).
Verdict pill on navy: pill background `rgba(255,255,255,0.08)`, border `rgba(255,255,255,0.14)`, dot + icon in verdict solid color, text white.
**Only one decision card per screen.** Never use navy cards for ordinary content.

#### G. `recommendation` — "BuyLens recommends" panel (compare footer, final decision)
Same as `decision` but:
```
eyebrow: "BUYLENS RECOMMENDS" in lime #B8F34A
product name: h1 white
supporting text: body-lg #E4E9F2
"Choose Product A if…" block: subtle navy-raised tile (#111A2B), 1px rgba(255,255,255,0.08), radius 12px, padding 16px
CTA: lime accent button
```

#### H. `ghost` — borderless group (landing steps)
```
background: transparent; border: none; padding: 0
```

### 6.3 Specific card components

| Component | Variant | Details |
|---|---|---|
| `MetricCard` (Price, Value, Risk, Information) | `default` | 20px padding. Eyebrow label (12px uppercase muted) → value (h2 or `score`-lite 40px, tabular) → 4px-high progress bar (track `#E4E7EC`, fill navy; Risk uses level chip instead of bar) → caption. Min height 120px |
| `AnalysisCard` (home recent, history) | `interactive` | Row layout: product name (h4) + price (body-sm muted) on left; score numeral (24px, 600) + verdict badge on right; date in caption. Height ≥ 72px |
| `ReportCard` (section wrapper) | `default` | 28px padding desktop. Section header (h3) + optional right-aligned action |
| `StrengthCard` | `status` (success) | See E |
| `RiskCard` / `ConcernCard` | `status` by severity | See E. Footer row: `→ What to ask` text button (ghost, navy) |
| `MissingInfoRow` | `subtle` or plain list row | Hollow circle icon (`Circle` 18px, `#98A2B3`), item (body, 500), "Not provided" caption, trailing `Ask seller` ghost button, importance badge |
| `QuestionCard` | `default` | Numeral `01` (eyebrow style, lime-on-navy chip 28px: bg `#0B1220`, text `#B8F34A`) + question (body-lg, 500) + optional reason (body-sm muted) + `Copy` ghost button right |
| `ComparisonCard` | `interactive` → `selected` | See §10 |
| `ProductSnapshotCard` | `default` | Product name (h3), category chip, price (h2), key-value list of extracted specs in `subtle` rows (max 6 rows) |
| `EmptyState` | `default`, dashed border `1.5px dashed #D0D5DD`, background transparent | Centered, 48px icon in 56px `subtle` circle, h3, body muted, one primary CTA. Padding 48px |
| `ErrorState` | `status` (danger tint) | Icon, title, calm message, `Try again` secondary button + `View sample analysis` ghost button |
| `SkeletonCard` | `default` | Same dimensions as target card; shimmer lines, see §13 |
| `SampleCard` (landing hero) | `default` with elevation | White card, `shadow-lg`, radius 18px; same internal layout as the decision card but light |

### 6.4 Card rules

- Max **one** visual emphasis per card (a badge OR an accent bar, not both).
- Never put a card inside a card inside a card. Max nesting: card → subtle block.
- Never apply `backdrop-blur`, gradients (other than the optional decision-card detail), or colored shadows to cards.
- Cards in a row must have equal heights (`items-stretch`) and aligned baselines.
- Do not apply hover lift to non-interactive cards.
- Card titles: h3 (22px) for section cards, h4 (18px) for item cards.

---

## 7. Buttons

### 7.1 Variants

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `#0B1220` | `#FFFFFF` | none | Main CTA on light surfaces |
| `accent` | `#B8F34A` | `#0B1220` | none | Primary CTA **on navy surfaces only** (decision card, recommendation, hero navy band) |
| `secondary` | `#FFFFFF` | `#101828` | `1px #D0D5DD` | Secondary actions |
| `ghost` | transparent | `#101828` (or `#224682` for inline links) | none | Tertiary actions (Copy, Share, Ask seller) |
| `ghost-on-navy` | transparent | `#FFFFFF` | none | Tertiary on navy |
| `outline-on-navy` | transparent | `#FFFFFF` | `1px rgba(255,255,255,0.24)` | Secondary on navy |
| `danger` | `#DC2626` | `#FFFFFF` | none | Destructive (delete account) only |
| `link` | transparent | `#224682` | none, underline on hover | Inline text actions |

### 7.2 States

| State | `primary` | `accent` | `secondary` |
|---|---|---|---|
| Default | `#0B1220` | `#B8F34A` | white / border `#D0D5DD` |
| Hover | `#1F355B` (primary-900), `translateY(-1px)`, `shadow-sm` | `#A7E932`, `translateY(-1px)` | bg `#F2F4F0`, border `#98A2B3` |
| Pressed | `scale(0.98)`, `#0B1220` (100ms) | `scale(0.98)`, `#88CF13` | `scale(0.98)` |
| Focus-visible | `outline 2px #3971be, offset 2px` | `outline 2px #FFFFFF, offset 2px` (on navy) | same as primary |
| Disabled | bg `#E4E7EC`, text `#98A2B3`, no hover, `cursor-not-allowed` | bg `rgba(184,243,74,0.35)`, text `rgba(11,18,32,0.5)` | text `#98A2B3`, bg `#F2F4F0` |
| Loading | label swapped (e.g. "Preparing analysis…"), 16px spinner on left, `aria-busy="true"`, disabled interaction | same | same |

Transition: `background-color, border-color, transform, box-shadow 150ms ease-out`.

### 7.3 Sizes

| Size | Height | Padding X | Font | Icon | Radius |
|---|---|---|---|---|---|
| `sm` | 36px | 12px | 14px | 16px | 8px |
| `md` (default) | 44px | 18px | 15px | 18px | 10px |
| `lg` | 52px | 24px | 16px | 20px | 12px |
| `icon` | 40×40 (min 44×44 hit area on touch) | – | – | 20px | 10px |

- Font weight 500, no uppercase, no letter-spacing.
- Icon gap 8px. Trailing arrow icon (`ArrowRight`) on primary CTAs nudges 2px right on hover.
- Full-width on mobile for primary form/CTA actions.
- Sticky mobile CTA bar: `position: sticky; bottom: 0; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: #F7F8F5 at 92%; border-top: 1px solid #E4E7EC; backdrop-blur 8px`.

### 7.4 Copy button behavior
Default label `Copy` + `Copy` icon → on click: label `Copied ✓` (use `Check` icon, text color `#15803D`) for **1200ms** → revert. Trigger toast "Question copied to clipboard." Announce via `aria-live="polite"`.

---

## 8. Form controls

### 8.1 Input / Select / Textarea
```
height: 44px (input/select), min-height 160px (main description textarea; 96px elsewhere)
background: #FFFFFF
border: 1px solid #D0D5DD
radius: 10px
padding: 0 14px (textarea 14px)
font: 15px, text-ink; placeholder #98A2B3
shadow: shadow-xs
hover: border #98A2B3
focus: border #0B1220 + ring 3px rgba(57,113,190,0.25) (shadow-focus), no outline jump
error: border #DC2626, ring rgba(220,38,38,0.18), helper text #B42318 with AlertCircle 16px
disabled: bg #F2F4F0, text #98A2B3
```
- Labels: 14px, weight 500, `text-ink`, 6px above field. Optional hint in `caption` muted.
- Helper/error text: 13px, 6px below field. Errors use the exact PRD copy (e.g. "Add a product description before continuing.").
- Currency input: `₦` prefix inside a 40px `subtle` segment on the left, tabular numerals.
- The **main description textarea** on Analyze is the hero of that screen: 18px padding, 16px font, radius 14px, min-height 200px, subtle character counter bottom-right (caption).

### 8.2 UploadDropzone
```
border: 1.5px dashed #D0D5DD, radius 14px, padding 32px, bg #FFFFFF
icon: UploadCloud 24px, #667085
text: "Drag and drop a listing screenshot, or browse" (body-sm), formats caption "JPG, PNG or WEBP · up to 10MB"
hover/drag-over: border #0B1220, bg #F7F8F5, icon navy (150ms)
uploaded: preview thumbnail (max 160px tall, radius 10px, border #E4E7EC) + file name + size + "Replace" (secondary sm) + "Remove" (ghost sm)
error: border #DC2626 dashed, message from PRD §49
```

### 8.3 Checkbox / radio / toggle
- Checkbox 18px, radius 5px, checked bg `#0B1220` with white check; focus ring shadow-focus.
- Radio 18px, checked: navy 6px inner dot on white with navy border.
- Toggle 40×24px, off `#D0D5DD`, on `#0B1220`, thumb white 18px (with lime thumb ring optional—prefer none).
- Compare picker option rows (`Previous analysis` / `Analyze new product`) use `interactive`/`selected` card variants with a radio.

### 8.4 Segmented filter (History: All / Buy / Worth considering / Wait / Avoid)
- Container: `subtle` bg, radius 10px, padding 4px. Item: 36px tall, radius 8px, 14px/500. Active item: white bg, `shadow-xs`, `text-ink`. Inactive: `text-ink-muted`. Horizontally scrollable on mobile with hidden scrollbar.

---

## 9. Badges, chips, indicators

### 9.1 `StatusBadge` (verdict)
```
height: 28px; padding: 0 10px 0 8px; radius: 999px
font: 13px / 600; icon 14px; gap 6px
style (light surface): bg = verdict tint bg, border = verdict tint border, text = verdict text color, icon = verdict solid
style (on navy): bg rgba(255,255,255,0.08), border rgba(255,255,255,0.14), text #FFFFFF, icon = verdict solid
```
Large variant (`lg`): height 36px, 14px text — used in the decision card and final decision.

### 9.2 `SeverityBadge` / `RiskBadge`
Same geometry as StatusBadge, label text (`Low`, `Medium`, `High`, `Critical`) + icon. `Critical` = solid `#DC2626` bg, white text.

### 9.3 Category chip
`subtle` bg, 1px `#E4E7EC`, radius 8px, 12px/500 text, `text-ink-muted`, height 24px.

### 9.4 Score pill (history)
Numeral 20px/600 tabular + verdict badge. Do not color the numeral; keep it `text-ink`.

### 9.5 Progress bar (metric)
Height 4px (6px on large), radius 999px, track `#E4E7EC`, fill `#0B1220`. On navy: track `rgba(255,255,255,0.12)`, fill `#B8F34A`. Animate width over 700ms ease-out on first view.

---

## 10. Score, report and Compare components

### 10.1 `ScoreRing`
- Semi-circular (180°) **or** full-circle; choose full circle at 200px (desktop) / 160px (mobile) inside the decision card.
- Stroke width 10px, `stroke-linecap: round`.
- Track: `rgba(255,255,255,0.10)`. Progress: `#B8F34A`. No gradient, no glow.
- Center: score numeral (`score` size reduced to 64px inside ring) + `/ 100` caption in `#A8B3C7`.
- Animate stroke-dashoffset and the counter from 0 → score over **900ms ease-out**, once on first view. Reduced motion: render final state instantly.
- `role="img"` with `aria-label="BuyLens score 82 out of 100"`.
- Do not make it look like a gaming meter: no ticks, no needle, no color change by score.

### 10.2 Score breakdown row
Four `MetricCard`s: Price `92 / 100`, Value `84 / 100`, Risk `Medium` (level badge), Information `64%`. Grid `grid-cols-2 lg:grid-cols-4`, gap 16px.

### 10.3 Report section styling
- Section header: eyebrow (optional) + h2 + optional one-line description (body, muted).
- "Why this looks promising": grid of StrengthCards (1 col mobile, 2 col desktop; or stacked list).
- "What concerns us": ConcernCards sorted by severity desc.
- "What's missing": a single `default` card containing divided rows (`divide-y divide-line`).
- "Questions to ask": stack of QuestionCards with `Copy all questions` secondary button in header.
- Disclaimer (subtle): `caption`, `text-ink-faint`→ use `#667085` for contrast, preceded by `Info` icon 14px; placed at the report footer. For high-risk categories (electrical/solar), use a `status` warning-tint card with `AlertTriangle` instead.

### 10.4 Compare (2 products only)

**Header:** h1 "Is there a better deal?" + body muted.

**Picker step:** two `interactive` option cards ("Previous analysis" / "Analyze new product"); choosing the first reveals a list of `AnalysisCard`s with radio selection (`selected` variant).

**Side-by-side product header (two `default` cards, equal width):**
- Product A label chip `CURRENT` (navy outline chip) / Product B label chip `ALTERNATIVE`.
- Name (h3), price (h2, tabular), score numeral 32px, verdict badge.
- The recommended product's card gets `selected` styling (navy border + check indicator) **after** the recommendation is shown — never before the user can read why.

**Comparison table (desktop):** `default` card, no outer padding on rows. Header row `subtle` bg. Columns: Dimension (40%) | Product A (30%) | Product B (30%). Rows: BuyLens score, Price, Value, Risk, Information, Capacity, Warranty. Row height 56px, divider `#E4E7EC`. The better value in each row is **weight 600 + `text-ink`**; the other is `text-ink-muted`. Do **not** highlight with green/red. A tiny navy dot (6px) may mark the winner of a row. Mobile: each dimension becomes a stacked card with A and B values side-by-side.

**Trade-off sliders (centerpiece):** each row = label (left, 14px/500), then a 6px track (`#E4E7EC`, radius 999) spanning the width with a **navy 14px handle** at the position favoring A (left) or B (right); neutral rows center. Handle: navy `#0B1220` fill, 3px white ring, `shadow-sm`. Product labels `A` / `B` at the track ends. Rows: Lower cost, More capacity, Lower risk, Better warranty, Better budget fit. Handle slides in with 400ms ease-out on first view. Add `aria-label` text, e.g. "Favors Product B".

**Trade-off summary:** `subtle` card with two columns: "A saves you ₦300,000" and "B gives you 2× the battery capacity and a clearer warranty." Eyebrow `THE TRADE-OFF`.

**Recommendation panel:** `recommendation` card (see 6.2G). Contains: eyebrow `BUYLENS RECOMMENDS`, product name, one-sentence reason, "Choose Product A if…" tile, `accent` CTA `View Product B`, `outline-on-navy` secondary `View Product A`.

**Selected alternative interaction:** selected card `scale(1.01)`, border transition 200ms, detail panel fades/slides (opacity 0→1, translateY 8px→0, 250ms). Numbers tween smoothly. No dramatic motion.

### 10.5 Final decision screen
- Full-width `decision`-style navy panel with the verdict as `display` text (white), verdict badge, headline per PRD §84, supporting copy.
- Checklist beneath on a white `default` card: ✓ items use `CheckCircle2` success; ⚠ items use `AlertTriangle` warning.
- CTAs: primary `accent` (on navy) / secondary `secondary` / tertiary `ghost`. On mobile the primary CTA is sticky (see 7.3).

### 10.6 Progress steps (analysis loading)
- Vertical list in a `default` card (max 560px wide, centered).
- Step row: 24px indicator + 16px label, 16px gap, 40px row height; connector line 2px `#E4E7EC` that fills `#0B1220` as steps complete.
- Done: navy circle with white `Check` (fades in 200ms), label `text-ink`.
- Active: 24px ring with 8px lime dot (`#88CF13` on white surfaces for visibility) pulsing (scale 1→1.25, opacity 1→0.6, 1.5s infinite ease-in-out), label `text-ink` 500.
- Pending: hollow `#D0D5DD` circle, label `text-ink-faint`/`#98A2B3`.
- Reduced motion: no pulse, show static dot.

---

## 11. Navigation and chrome

### 11.1 Sidebar (desktop)
- Width 256px, bg `#FFFFFF`, right border `#E4E7EC`, padding 16px.
- Logo block: 32px navy rounded-sm square with lime lens dot + wordmark "BuyLens" (18px/600). Top padding 8px, bottom margin 24px.
- Nav item: height 40px, radius 10px, padding 0 12px, icon 18px, gap 12px, 14px/500, `text-ink-muted`. Hover: bg `#F2F4F0`, `text-ink`. **Active:** bg `#0B1220`, text white, icon white, plus 4px lime dot (`#B8F34A`) at right edge. Focus ring per spec.
- Bottom area: user avatar (32px circle, navy bg + white initials), name, email truncated.

### 11.2 Top utility bar
Height 64px, bg `rgba(247,248,245,0.9)` + `backdrop-blur-sm`, bottom border. Left: page title (mobile only) / breadcrumb. Right: Notifications `IconButton` (secondary, 40px) + avatar.

### 11.3 Mobile bottom nav
Height 64px + safe-area, white bg, top border `#E4E7EC`. Four items (Home, Analyze, History, Settings): icon 22px + label 11px/500. Active: navy icon/label + 3px lime bar above the icon (24px wide, radius 999). The **Analyze** item may be emphasized with a 44px navy circle containing a lime `Plus`/`ScanSearch` icon, raised 8px above the bar (`shadow-md`).

### 11.4 Landing header
Sticky, height 72px, transparent over hero → white with bottom border after 8px scroll. Right side: `Log in` ghost + `Analyze a purchase` primary (sm).

---

## 12. Motion

### 12.1 Tokens
```
--duration-fast: 150ms     (hover, color, focus)
--duration-base: 200ms     (selection, border, small reveals)
--duration-slow: 250–350ms (drawers, modals)
--duration-enter: 400–600ms (page entrance)
--duration-score: 900ms    (score/ring count-up)
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```
No `spring`/bounce/overshoot easing anywhere.

### 12.2 Standard animations
| Interaction | Spec |
|---|---|
| Page entrance | opacity 0→1, translateY 16px→0, 450ms ease-out; children staggered **80ms** |
| Scroll reveal | opacity 0→1, translateY 20px→0, 500ms ease-out, trigger once at 15% in view, stagger 80ms |
| Button press | scale 0.98, 100ms |
| Button hover | translateY(-1px), 150ms |
| Card hover (interactive only) | translateY(-2px) + shadow-sm + border `#D0D5DD`, 150–200ms |
| Landing hero | headline (0ms) → copy (+80ms) → CTA (+160ms) → sample card scale 0.98→1 + fade (+240ms), score 0→82, then each metric sequentially (150ms apart) |
| Modal | fade + translateY 8px→0, 250ms; backdrop `rgba(11,18,32,0.5)` fades 200ms |
| Drawer | translateX 100%→0, 300ms ease-out |
| Toast | slide up 12px + fade, 250ms; auto-dismiss 2.5s; bottom-center desktop & above bottom nav on mobile |
| Copy feedback | label swap, 1200ms |
| Skeleton shimmer | 1.6s linear infinite, gradient `#F2F4F0 → #E9ECE6 → #F2F4F0` |
| Final decision | verdict → explanation → checklist items (80ms stagger) → CTA last |

Use CSS transitions/keyframes where possible; a lightweight motion library (e.g. `motion`) only for score count-up and orchestrated reveals. Run score animation **once** per mount; skip when returning to the same report within a session.

### 12.3 Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Additionally: disable entrance translations, render the score at its final value, keep only opacity/color state changes.

### 12.4 Never
Parallax, bouncing, spinning objects, constant background motion, animated blobs, confetti, looping attention animations (other than the single active-step pulse and skeleton shimmer).

---

## 13. States

### 13.1 Loading / skeletons
- Skeletons mirror final layouts (report hero, metric row, list rows, comparison table). **No full-page spinner.**
- Skeleton block: bg `#F2F4F0`, radius equal to the element it stands in for, shimmer overlay. Text lines: 12–16px high, radius 6px, varied widths (100%, 80%, 60%).
- Buttons in loading state keep their width (no layout shift).
- Required loading states: auth, dashboard, analysis creation, AI processing, report load, compare load, image upload, save.

### 13.2 Empty states
Use `EmptyState` (6.3). Copy from PRD §23 and §79. Illustration: none; use a single 24px Lucide icon in a 56px `subtle` circle. Exactly one primary CTA.

### 13.3 Error states
- Inline field errors (8.1), toast errors (below), and page-level `ErrorState`.
- Tone: calm, specific, actionable; never show raw API errors. Use copy from PRD §53 and §67 (always offer `View sample analysis` when live analysis fails).
- Toast variants: `success` (CheckCircle2, success icon), `error` (AlertCircle, danger icon), `info`. Toast surface is **navy** (`#0B1220`, white text, radius 12px, `shadow-lg`) for all variants; only the 18px icon takes the semantic color. Max width 420px.

### 13.4 Hover/focus/active summary
- Hover: subtle (bg tint or 1–2px lift); never color-flip to a different hue.
- Focus-visible (all interactive): `outline: 2px solid #3971be; outline-offset: 2px;` On navy: `#B8F34A`. Never remove outlines without replacement. Use `:focus-visible`, not `:focus`.
- Disabled: reduce contrast per spec, `aria-disabled`, no hover motion.

---

## 14. Iconography

- **Lucide React** only. Stroke width **1.75** (default 2 for 16px). Sizes: 16 / 18 / 20 / 24px.
- Icon color follows text color unless it represents status (use the status solid color).
- Decorative icons: `aria-hidden="true"`. Meaningful icon-only buttons: `aria-label`.
- Suggested icons: Home (`LayoutDashboard`/`Home`), Analyze (`ScanSearch`), History (`History`), Settings (`Settings`), Copy (`Copy`/`Check`), Share (`Share2`), Upload (`UploadCloud`), Link (`Link2`), Strength (`CheckCircle2`), Concern (`AlertTriangle`), Missing (`Circle`), Compare (`GitCompareArrows`/`Scale`), Questions (`MessageSquareText`), Info (`Info`), Save (`Bookmark`), Delete (`Trash2`), Back (`ArrowLeft`), Forward (`ArrowRight`).
- No emoji in the product UI (the `✓`/`⚠` in the PRD are represented by Lucide icons).

---

## 15. Imagery and branding

- **Logo mark:** 32px rounded-sm square, navy, containing a lime circular "lens" (ring + center dot). Wordmark "BuyLens" in Inter 600, `-0.02em`. On navy: white wordmark.
- **Favicon:** navy square with lime lens.
- Uploaded listing images: radius 10px, 1px `#E4E7EC` border, `object-fit: cover` for thumbnails and `contain` in previews, always with alt text.
- No stock photography or illustrations of robots/brains/sparkles. Landing visuals = real product UI (the sample analysis card).
- Landing hero background: flat `#F7F8F5`; optionally a very subtle 1px dot/grid pattern at 4% navy opacity. A navy band section (e.g. final CTA) uses `#0B1220` with `accent` button.

---

## 16. Page-level layout notes

| Page | Key styling |
|---|---|
| **Landing** | Hero: left copy (display-xl) + right sample analysis card (`SampleCard`). Steps: 3 `ghost`/`default` cards with eyebrow numerals `01–03`. Example report: interactive tabbed card. Final CTA: navy band, white `display` headline, `accent` CTA |
| **Auth** | Centered `default` card (440px), canvas bg, logo above, h2 title, 20px field gap, full-width `primary` button, entrance fade+12px |
| **App Home** | Greeting (h1) + prompt "What are you considering buying?" + hero `primary` CTA (lg) → "Recent analyses" list of `AnalysisCard`s |
| **Analyze** | Single column (max 760px) form card; textarea first; upload + URL as secondary `default` cards below; sticky submit area on mobile |
| **Loading** | Centered ProgressSteps card |
| **Report** | 12-col grid; `decision` card + product snapshot; breakdown; strengths/concerns; missing; questions; disclaimer; sticky action bar on mobile (Ask seller / Compare) |
| **Compare** | Section 10.4 |
| **Questions** | h1 "Ask before you pay"; QuestionCards; `Copy all questions` |
| **Final decision** | Section 10.5 |
| **History** | Segmented filter + list card of `AnalysisCard` rows with date; empty state |
| **Settings** | Max 640px; three grouped `default` cards (Account, Preferences, Data). Delete account: `danger` button, confirm modal |

---

## 17. Responsive rules

- **No horizontal scroll** at any width (except intentionally scrollable segmented filters/tables inside `overflow-x-auto`).
- Cards stack to a single column below 768px; two-column report layouts collapse in order: Decision → Snapshot → Breakdown → Strengths → Concerns → Missing → Questions.
- Tables become stacked cards on mobile.
- Report sections may collapse into accordions on mobile (header row 56px, chevron 18px rotates 180° over 200ms; the score/decision card is **never** collapsed).
- Touch targets ≥ **44×44px**.
- Typography scales per §3.2 (mobile column).
- Safe-area insets respected for sticky bars and bottom nav.
- Decision card padding 24px, ring 160px, score numeral 72px on mobile.

---

## 18. Accessibility

- WCAG AA contrast minimum: body text `#101828`/`#667085` on `#FFFFFF`/`#F7F8F5` passes; **do not use `#98A2B3` for essential text on white** (use only for placeholders/disabled/decorative metadata). Navy `#0B1220` vs white and lime-on-navy both pass.
- Never convey meaning by color alone: verdict/severity/risk always with icon + label.
- Semantic HTML (`header`, `nav`, `main`, `section`, `button`, `a`), one `h1` per page, logical heading order.
- All form controls labelled; errors linked via `aria-describedby` and `aria-invalid`.
- Dialogs/drawers: focus trap, `Escape` closes, return focus to trigger, `role="dialog"` + `aria-modal="true"` + labelled title.
- Live regions: toasts `aria-live="polite"` (errors `assertive`); progress steps announce the active step.
- Score ring and trade-off sliders have text alternatives.
- Visible `:focus-visible` on everything interactive.
- Respect `prefers-reduced-motion` (see 12.3).
- Images have meaningful `alt`; decorative images `alt=""`.

---

## 19. Tailwind config summary (copy-ready)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#f3f6fc',100:'#e6ecf8',200:'#c7d7f0',300:'#96b6e3',400:'#5e8fd2',500:'#3971be',600:'#2958a0',700:'#224682',800:'#203d6c',900:'#1f355b',950:'#0b1220' },
        secondary: { 50:'#f7fee7',100:'#edfdca',200:'#dbfb9b',300:'#b8f34a',400:'#a7e932',500:'#88cf13',600:'#68a60a',700:'#4f7e0d',800:'#416311',900:'#375413',950:'#1b2f04' },
        canvas: '#F7F8F5',
        surface: { DEFAULT: '#FFFFFF', subtle: '#F2F4F0' },
        'navy-raised': '#111A2B',
        line: { DEFAULT: '#E4E7EC', strong: '#D0D5DD' },
        'navy-line': 'rgba(255,255,255,0.10)',
        ink: { DEFAULT: '#101828', muted: '#667085', faint: '#98A2B3' },
        'on-navy': { DEFAULT: '#FFFFFF', muted: '#A8B3C7' },
        status: {
          success:  { DEFAULT: '#16A34A', text: '#15803D', bg: '#ECFDF3', border: '#ABEFC6' },
          consider: { DEFAULT: '#84CC16', text: '#4D7C0F', bg: '#F7FEE7', border: '#D9F99D' },
          warning:  { DEFAULT: '#F59E0B', text: '#B45309', bg: '#FFFAEB', border: '#FEDF89' },
          danger:   { DEFAULT: '#DC2626', text: '#B42318', bg: '#FEF3F2', border: '#FECDCA' },
          neutral:  { DEFAULT: '#64748B', text: '#475467', bg: '#F2F4F7', border: '#E4E7EC' },
        },
      },
      fontFamily: { sans: ['var(--font-inter)', 'Geist', 'system-ui', 'sans-serif'] },
      borderRadius: { sm: '8px', input: '10px', card: '14px', panel: '18px', modal: '20px' },
      boxShadow: {
        xs: '0 1px 2px rgba(11,18,32,0.04)',
        sm: '0 1px 3px rgba(11,18,32,0.06), 0 1px 2px rgba(11,18,32,0.04)',
        md: '0 4px 12px -2px rgba(11,18,32,0.08), 0 2px 4px -2px rgba(11,18,32,0.04)',
        lg: '0 12px 24px -6px rgba(11,18,32,0.12), 0 4px 8px -4px rgba(11,18,32,0.06)',
        xl: '0 24px 48px -12px rgba(11,18,32,0.18)',
        decision: '0 20px 40px -16px rgba(11,18,32,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        focus: '0 0 0 3px rgba(57,113,190,0.25)',
        'focus-navy': '0 0 0 3px rgba(184,243,74,0.35)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.25)', opacity: '0.6' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-up': 'fade-up 450ms cubic-bezier(0.22,1,0.36,1) both',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
      maxWidth: { app: '1200px', landing: '1280px' },
    },
  },
  plugins: [],
};
export default config;
```

---

## 20. Component class recipes (reference implementations)

```tsx
// Card variants (cva)
const card = cva('rounded-card transition-all duration-150 ease-out', {
  variants: {
    variant: {
      default: 'bg-surface border border-line',
      subtle: 'bg-surface-subtle border border-line/60 rounded-input',
      interactive: 'bg-surface border border-line hover:border-line-strong hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
      selected: 'bg-surface border-[1.5px] border-primary-950 shadow-md scale-[1.01]',
      status: 'border', // + status bg/border classes
      decision: 'bg-primary-950 text-on-navy border border-white/10 rounded-panel shadow-decision',
      recommendation: 'bg-primary-950 text-on-navy border border-white/10 rounded-panel shadow-decision',
      ghost: 'bg-transparent border-0 p-0',
    },
    padding: { sm: 'p-4', md: 'p-5 md:p-6', lg: 'p-6 md:p-10' },
  },
  defaultVariants: { variant: 'default', padding: 'md' },
});

// Buttons
const button = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-input transition-all duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-950 text-white hover:bg-primary-900 hover:-translate-y-px hover:shadow-sm focus-visible:outline-primary-500 disabled:bg-line disabled:text-ink-faint',
        accent: 'bg-secondary-300 text-primary-950 hover:bg-secondary-400 hover:-translate-y-px focus-visible:outline-white disabled:bg-secondary-300/35 disabled:text-primary-950/50',
        secondary: 'bg-white text-ink border border-line-strong hover:bg-surface-subtle hover:border-ink-faint focus-visible:outline-primary-500 disabled:text-ink-faint disabled:bg-surface-subtle',
        ghost: 'bg-transparent text-ink hover:bg-surface-subtle focus-visible:outline-primary-500',
        'outline-on-navy': 'bg-transparent text-white border border-white/25 hover:bg-white/10 focus-visible:outline-secondary-300',
        'ghost-on-navy': 'bg-transparent text-white hover:bg-white/10 focus-visible:outline-secondary-300',
        danger: 'bg-status-danger text-white hover:bg-[#B91C1C] focus-visible:outline-status-danger',
      },
      size: { sm: 'h-9 px-3 text-sm', md: 'h-11 px-[18px] text-[15px]', lg: 'h-[52px] px-6 text-base rounded-[12px]', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

// Input
const inputClass =
  'h-11 w-full rounded-input border border-line-strong bg-white px-3.5 text-[15px] text-ink placeholder:text-ink-faint shadow-xs transition hover:border-ink-faint focus:border-primary-950 focus:outline-none focus:shadow-focus disabled:bg-surface-subtle disabled:text-ink-faint aria-[invalid=true]:border-status-danger';
```

---

## 21. Do / Don't cheat sheet

| Do | Don't |
|---|---|
| Use navy for primary buttons, nav active, the decision card | Make buttons or cards green |
| Use lime on navy as the accent | Use lime text on white |
| Use border + spacing to define cards | Add heavy shadows to every card |
| Show verdict as icon + label + tint | Rely on color alone |
| Use one navy decision card per screen | Create multiple dark cards on a page |
| Explain trade-offs in Compare | Crown a "winner" with a trophy |
| Keep animation 150–250ms ease-out | Use bounce, confetti, parallax, blobs |
| Use Lucide at 16–24px | Mix icon libraries or use emoji |
| Use tokens and the shared `Card`/`Button` | Hardcode hex values or duplicate components |
| Display Risk as Low/Medium/High/Critical | Show risk as a 0–100 number |
| Keep text ≤ 65ch, content ≤ 1200px | Stretch content across 1440px |
| Provide skeletons, empty and error states | Show blank screens or raw API errors |

---

## 22. Agent checklist (before marking any UI task done)

1. Colors come only from tokens (no stray hex values; no new colors).
2. Lime appears only on navy surfaces / active indicators; never as text on light backgrounds.
3. Cards use the shared `Card` with an approved variant, radius, border, and shadow from this file.
4. Hover lift only on interactive cards; shadows match tokens.
5. Verdict, severity, and risk show icon + text + color.
6. Typography uses the defined scale; money and scores use tabular numerals; Naira formatted correctly.
7. Spacing uses the 4px scale; containers respect max widths.
8. Buttons use approved variants/sizes and all states (hover, pressed, focus, disabled, loading).
9. Motion follows §12 and respects `prefers-reduced-motion`.
10. Loading skeletons, empty, and error states exist for every async view and list.
11. Layout verified at 1440×900 and 390×844; no horizontal scroll; touch targets ≥ 44px.
12. Accessibility basics pass: labels, focus states, keyboard navigation, dialog focus trap, aria on score ring/sliders.
13. No new dependencies or visual features outside this guide without a stated reason.
14. The screen still answers: **"Should I buy this?"**

---

*End of BuyLens AI Style Guide v1.0*
