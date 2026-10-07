# BuyLens AI

> **Know what you're buying before you pay.**

BuyLens AI is an AI-powered purchase intelligence web app. A user gives it a product listing (pasted text, a screenshot, an optional link, and a price), and BuyLens returns a structured **decision report**: a score, a verdict, what looks good, what could go wrong, what information is missing, and the exact questions to ask the seller before paying. Users can then compare two options and get a trade-off-based recommendation.

**Primary market (MVP):** Nigeria
**Primary category (MVP):** High-value purchases, starting with solar and power products
**Platform:** Responsive web (desktop-first, tablet and mobile supported)

BuyLens is **not** a marketplace, a store, a payment platform, a review site, a price scraper, or a generic chatbot. It is a decision-support product that turns messy product information into a clear purchasing decision.

> The one question every screen answers: **"Should I buy this?"**

---

## Table of contents

1. [Documentation map](#documentation-map)
2. [Core user journey](#core-user-journey)
3. [MVP scope](#mvp-scope)
4. [Tech stack](#tech-stack)
5. [Getting started](#getting-started)
6. [Environment variables](#environment-variables)
7. [Project structure](#project-structure)
8. [Routes](#routes)
9. [Data model](#data-model)
10. [API](#api)
11. [AI architecture](#ai-architecture)
12. [Compare feature](#compare-feature)
13. [Demo mode](#demo-mode)
14. [Design system summary](#design-system-summary)
15. [Security and privacy](#security-and-privacy)
16. [Accessibility and performance](#accessibility-and-performance)
17. [Development phases](#development-phases)
18. [Rules for contributors and coding agents](#rules-for-contributors-and-coding-agents)
19. [Definition of done](#definition-of-done)
20. [Disclaimer](#disclaimer)

---

## Documentation map

Read these in this order. Together they are the full specification.

| Document | What it defines | When to read it |
|---|---|---|
| **README.md** (this file) | Overview, setup, architecture, rules | First, always |
| **PRD** (`docs/PRD.md`) | Product definition, screens, copy, AI schema, scope, demo story | Before building any feature |
| **STYLE_GUIDE.md** (`docs/STYLE_GUIDE.md`) | Colors, typography, spacing, cards, shadows, buttons, forms, badges, tokens, Tailwind config | Before **every** UI task |
| **INTERACTIONS.md** (`docs/INTERACTIONS.md`) | Screen-by-screen behavior, motion sequences, states, keyboard and screen-reader behavior | When building a specific screen or flow |

**Precedence when documents disagree:**
1. `STYLE_GUIDE.md` wins on anything visual (including the color section of the PRD).
2. `INTERACTIONS.md` wins on behavior and motion.
3. The PRD wins on product scope, copy, and the AI schema.

---

## Core user journey

```text
LANDING
   ↓
ANALYZE PURCHASE  (text · image · URL)
   ↓
AI ANALYSIS  (transparent progress)
   ↓
DECISION REPORT  (verdict → why → risks → missing info → questions)
   ↓
INVESTIGATE  (good · risks · compare)
   ↓
FINAL DECISION  (Buy · Worth considering · Wait · Avoid · Need more info)
   ↓
SAVE / SHARE → HISTORY
```

The product must feel like one continuous journey, not a collection of dashboard pages.

### Report reading order

1. **What is the verdict?** (for example, "Worth considering")
2. **Why?** (price competitive, capacity appropriate)
3. **What could go wrong?** (warranty and battery cycle life missing)
4. **What should I do?** (ask the seller these questions)
5. **Is there a better option?** (compare)

---

## MVP scope

### Included

Landing page · authentication · dashboard · purchase analysis creation · text, optional image, and optional URL input · AI analysis with structured output · score and verdict · price, value, and risk analysis · information completeness · strengths · concerns · missing information · seller questions · two-product comparison · final recommendation · analysis history · saved reports · loading, error, and empty states · responsive UI · demo mode.

### Explicitly excluded

Real-time marketplace · seller accounts or verification · payments or escrow · subscriptions · browser extension · native mobile app · automatic web crawling or large-scale price scraping · social or community features · user review marketplace · live seller chat · complex recommendation engine · custom-trained model · multi-agent AI architecture · complex admin dashboard.

> If a feature does not help the user answer *"Should I buy this?"*, do not build it.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS, with tokens from `STYLE_GUIDE.md` |
| Icons | Lucide React (only) |
| Font | Inter (alternative: Geist; do not mix) |
| Backend and database | Supabase (Auth, PostgreSQL, Storage, Row Level Security) |
| Validation | Zod (client and server) |
| AI | Server-side calls to an LLM provider with structured JSON output (provider configured via `AI_API_KEY`) |
| Motion | CSS transitions and keyframes; a lightweight motion library only for the score count-up and orchestrated reveals |
| State | React state, server state, URL state. **No Redux** unless genuinely required |

Adding a new dependency requires a stated reason.

---

## Getting started

### Prerequisites

- Node.js 20 or later
- A package manager (`npm`, `pnpm`, or `yarn`; use one consistently)
- A Supabase project
- An API key for your chosen AI provider

### Install and run

```bash
# 1. Clone
git clone <your-repo-url> buylens-ai
cd buylens-ai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# fill in the values (see "Environment variables")

# 4. Run the database migrations / SQL (see "Data model")

# 5. Start the dev server
npm run dev
# open http://localhost:3000
```

### Scripts (expected)

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
| `npm run typecheck` | `tsc --noEmit` |

---

## Environment variables

Provide a committed `.env.example` and never commit real `.env` files.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server only, never exposed to the client

# AI provider
AI_API_KEY=                     # server only

# Optional
NEXT_PUBLIC_DEMO_MODE=false     # true forces demo behavior for all analyses
```

**Rules:** the AI key and the Supabase service role key are used **only in server-side code** (route handlers, server actions). Anything prefixed `NEXT_PUBLIC_` is visible to the browser, so never put a secret there.

---

## Project structure

```text
src/
  app/
    page.tsx                      # Landing
    login/
    signup/
    app/                          # Authenticated shell
      page.tsx                    # App home
      analyze/
        page.tsx
        loading/
      report/[id]/
        page.tsx
        compare/
        questions/
      history/
      settings/
    api/
      analyze/                    # POST /api/analyze

  components/
    ui/                           # Button, Input, Card, Badge, Toast, Modal, Drawer, Skeleton…
    layout/                       # Sidebar, Header, MobileNav, Shell
    analysis/                     # Analyze form, UploadDropzone, ProgressSteps
    report/                       # ScoreRing, MetricCard, StrengthCard, RiskCard, QuestionCard…
    comparison/                   # ComparisonCard, TradeoffSlider, RecommendationPanel

  lib/
    supabase/                     # clients (browser, server), helpers
    ai/                           # prompt, schema, provider client, retry logic
    validation/                   # Zod schemas
    utils/                        # formatters (₦), verdict map, helpers

  types/
    analysis.ts
    report.ts

  data/
    demo.ts                       # Seeded demo analyses

docs/
  PRD.md
  STYLE_GUIDE.md
  INTERACTIONS.md
```

The exact layout may vary, but separation of concerns must stay clear. Reuse components with variants instead of duplicating them.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing |
| `/login`, `/signup` | Authentication |
| `/app` | Home and recent analyses |
| `/app/analyze` | Create an analysis |
| `/app/analyze/loading` | Transparent AI progress |
| `/app/report/[id]` | Decision report |
| `/app/report/[id]/compare` | Compare with a second product |
| `/app/report/[id]/questions` | Questions to ask the seller |
| `/app/history` | All analyses with verdict filters |
| `/app/settings` | Account, preferences, delete account |

Report detail sections may be sections or drawers instead of separate routes where that works better.

---

## Data model

Use Supabase PostgreSQL. Keep it simple; store the full AI result as JSON.

```text
profiles   id · user_id · name · created_at · updated_at
analyses   id · user_id · product_name · category · input_text · input_url
           · image_url · status · created_at · updated_at
reports    id · analysis_id · score · verdict · summary · result_json · created_at
```

Add a boolean or timestamp for **saved** state on the report (bookmarking), and a field for the comparison result if you persist comparisons.

### Authorization

- **Row Level Security must be enabled on every table.**
- Users can read and write only their own rows.
- Never reveal whether another user's report exists (return a generic not-found).

Example policy shape:

```sql
alter table analyses enable row level security;

create policy "own analyses"
on analyses for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Reports are scoped through their parent analysis. Image storage buckets must also be private with per-user access rules.

---

## API

### `POST /api/analyze`

**Request**

```json
{
  "productName": "5kVA Hybrid Inverter + 5kWh Lithium Battery",
  "description": "Installation included…",
  "price": 850000,
  "currency": "NGN"
}
```

**Server flow**

```text
Validate input (Zod)
  → create analysis record
  → build AI prompt
  → call AI provider
  → validate structured output against schema
  → (one structured retry if invalid)
  → save report
  → return report id
```

The frontend then redirects to `/app/report/[id]`. Never trust client-provided scores or verdicts; they come only from validated server-side output.

### Error handling

Never show raw API errors. Use the calm, specific messages in the PRD (AI unavailable, invalid input, unreadable image, rate limit, network error). When a live analysis fails, always offer **View sample analysis**.

---

## AI architecture

The AI returns **structured JSON**, never free-form prose, and the UI renders strictly from that structure.

```ts
type AnalysisResult = {
  score: number;
  verdict:
    | "BUY"
    | "WORTH_CONSIDERING"
    | "WAIT"
    | "AVOID"
    | "INSUFFICIENT_INFORMATION";
  summary: string;
  product: { name: string; category: string; price?: number; currency: string };
  metrics: {
    priceScore?: number;
    valueScore?: number;
    informationCompleteness: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  };
  strengths: Array<{ title: string; explanation: string }>;
  concerns: Array<{
    title: string;
    explanation: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }>;
  missingInformation: Array<{ item: string; importance: "LOW" | "MEDIUM" | "HIGH" }>;
  questions: Array<{ question: string; reason?: string }>;
  alternatives?: Array<{
    name: string;
    price?: number;
    score?: number;
    explanation: string;
  }>;
};
```

### Prompt requirements

The system prompt establishes that BuyLens AI is a purchase decision-support assistant whose job is **not** to blindly recommend purchases. It must:

1. Understand the product.
2. Identify available information.
3. Separate known facts from assumptions.
4. Evaluate the stated price only where enough information exists.
5. Identify important missing information.
6. Identify potential risks.
7. Explain strengths.
8. Generate useful seller questions.
9. Produce a cautious recommendation.

### Trust rules

- Never invent product specifications.
- Never claim live or verified market prices unless verified data was supplied.
- Return `INSUFFICIENT_INFORMATION` when evidence is not enough.
- Never say a product is "definitely safe" or "definitely the cheapest."
- Explain, don't dictate: "Worth considering because X, Y, Z. Verify A and B before paying."

### Output validation

Validate every response against the Zod schema. If invalid, retry once with a structured-repair prompt. If still invalid, return an error. **Never render malformed AI output.**

### Score semantics

- Price and Value display as `n / 100`.
- Information completeness displays as a percentage.
- **Risk displays as a level** (Low, Medium, High, Critical), never a 0 to 100 number.

---

## Compare feature

Compare supports **exactly two products** in the MVP. It is a decision tool, not an e-commerce spec table.

It answers: *"Given what we know about these options, which one makes more sense for me?"*

**Flow:** from a report, choose **Compare with another product**, then either select a previous analysis or analyze a new product. BuyLens compares the **two saved structured analyses** (the AI does not re-invent data) and returns:

- which option is stronger overall
- where A wins and where B wins
- the biggest trade-off
- which user scenario favors each option
- a final recommendation, including "Choose A if…"

**Key UX rules:**

- Prioritize decision-relevant dimensions (price, capacity, warranty, value, risk, information, score), not 30 specifications.
- Show trade-offs (for example "A saves you ₦300,000; B gives you 2× the capacity and a clearer warranty") before crowning a recommendation.
- Never just highlight the higher score.

See `INTERACTIONS.md` for the full Compare behavior.

---

## Demo mode

The competition demo must work even if the AI provider is down.

- **Try a sample analysis** on the landing page loads the seeded report without auth or network.
- Failed live analyses offer **View sample analysis**.
- Seeded data lives in `src/data/demo.ts`.

**Demo story (exact narrative):**

```text
Seller listing:
5KVA Solar System · 5KVA Hybrid Inverter · 5KWh Lithium Battery
Installation included · ₦850,000

Result: 82 / 100 · Worth considering
Why:      competitive price · suitable capacity · installation included
Concerns: battery cycle life missing · warranty unclear · exact inverter model missing
Questions generated → Compare alternatives → Final verdict: WAIT
"Verify these three details before paying."
```

Demo reports carry a subtle "Sample analysis" label so they are never mistaken for live results.

---

## Design system summary

Full details are in `STYLE_GUIDE.md`. The essentials:

| Item | Value |
|---|---|
| Feel | Premium fintech + AI research product + editorial decision tool. Calm, precise, trustworthy |
| Primary | Deep Navy `#0B1220` |
| Secondary / accent | Electric Lime `#B8F34A` (on navy surfaces and active states only; never as text on light backgrounds) |
| Background / surface | Warm off-white `#F7F8F5` / white `#FFFFFF` |
| Proportion | ~80% neutral, ~15% navy, ~5% lime and status colors |
| Verdict colors | Buy `#16A34A` · Worth considering `#84CC16` · Wait `#F59E0B` · Avoid `#DC2626` · Need more info `#64748B` |
| Rule | Never convey status by color alone: always icon + label + color |
| Cards | White, 1px `#E4E7EC` border, 14px radius, no default shadow. The navy **decision card** is the visual signature (one per screen) |
| Motion | 150 to 250ms ease-out, no bounce, no confetti, no constant motion; full reduced-motion support |

**Avoid:** purple or blue "AI" gradients, glassmorphism, neon glows, green-everything fintech styling, chatbot UI, cartoon AI imagery, dashboard clutter.

---

## Security and privacy

- Never expose AI keys, the Supabase service role key, or database credentials to the client.
- All AI calls go through server-side code.
- Validate all input on the server (Zod), not only the client.
- Enforce Row Level Security on every table and storage bucket.
- Do not trust client-provided scores, verdicts, or user ids.
- Rate-limit the analysis endpoint and dedupe submissions (idempotency key).
- Uploaded images: allow JPG, PNG, WEBP up to 10MB; validate type and size on the server.
- Sharing sends text only and never includes the user's name or email.
- Never commit `.env` files.

---

## Accessibility and performance

**Accessibility (required):** semantic HTML, full keyboard navigation, visible focus states, AA contrast, labeled controls, real buttons and links, focus-trapped dialogs that close on `Escape`, `aria-live` announcements for progress and copy actions, text alternatives for the score ring and trade-off sliders, and `prefers-reduced-motion` support.

**Performance:**

- Server components by default; client components only for interactive pieces (score ring, forms, filters, compare picker, toasts).
- Optimized and lazy-loaded images.
- Skeletons that match final layouts (no full-page spinners).
- Fast initial load for the landing page.

---

## Development phases

Build in this order. Do not skip ahead.

1. **Foundation:** Next.js, TypeScript, Tailwind with tokens, fonts, global styles, component system, layout, responsive base.
2. **Static UX with mock data:** landing, login, signup, home, analyze, loading, report, compare, questions, final decision, history, settings. **No AI yet.**
3. **Backend:** Supabase, auth, database, storage, RLS, analysis API.
4. **AI:** prompt, structured output, schema validation, provider integration, save report, error handling.
5. **Polish:** motion, loading, empty, and error states, mobile, accessibility, performance, demo mode.

---

## Rules for contributors and coding agents

1. Read this README, the PRD, `STYLE_GUIDE.md`, and the relevant parts of `INTERACTIONS.md` before implementing.
2. Do not invent product features or change the core concept.
3. Do not replace the design direction with generic SaaS UI.
4. Do not create unnecessary screens.
5. Use TypeScript strictly; avoid `any` unless unavoidable.
6. Reuse components; use variants instead of duplicating.
7. Use only tokens from `STYLE_GUIDE.md` (no stray hex values, shadows, or radii).
8. Validate all AI output; never expose secrets.
9. Build responsive layouts; implement loading, error, and empty states everywhere.
10. Keep animations subtle and purposeful; follow accessibility requirements.
11. Use realistic Nigerian demo data and Naira formatting (`₦`).
12. Do not add a dependency without a reason.
13. Do not build anything outside the MVP scope.
14. Test the complete user journey before calling work finished.

**Tie-breaker:** when *more features* conflicts with *better execution of the core journey*, always choose better execution of the core journey.

---

## Definition of done

The project is complete only when all of these are true:

- [ ] Landing page works, including demo mode
- [ ] Authentication works
- [ ] Analysis input works (text, image, URL) with validation
- [ ] AI analysis works and the report renders from real structured data
- [ ] Reports are saved; History works with filters
- [ ] Compare works for two products and explains trade-offs
- [ ] Questions can be copied individually and all at once
- [ ] Final decision screen works for all five verdicts
- [ ] Mobile layout works at 390×844; desktop is polished at 1440×900
- [ ] Loading, empty, and error states exist for every async view
- [ ] Demo mode completes the full story with the network off
- [ ] No broken routes, no console errors, no exposed secrets
- [ ] Accessibility basics pass (keyboard, focus, contrast, reduced motion)
- [ ] UI is consistent with `STYLE_GUIDE.md`

---

## Disclaimer

BuyLens provides AI-assisted decision support, not professional financial, technical, legal, or safety advice. Verify important information independently before purchasing. For higher-risk categories such as electrical and solar equipment, the in-app warning is more prominent and cannot be dismissed.

---

## North star

Every feature, component, animation, AI response, and screen must serve one question:

### **"Should I buy this?"**

The product succeeds when the user finishes the experience feeling: *"I understand this purchase much better than I did five minutes ago."*
