# BuyLens AI

## Master Product Requirements Document / Engineering README

**Version:** 1.0  
**Product:** BuyLens AI  
**Type:** Responsive AI-powered web application  
**Primary platform:** Web  
**Primary target:** Desktop  
**Responsive target:** Tablet + mobile  
**Primary market for MVP:** Nigeria  
**Primary MVP category:** High-value purchases, initially focused on solar/power products  
**Core promise:** Help users make a more informed purchase decision before spending significant money.

---

# 1. PRODUCT DEFINITION

## 1.1 Product name

**BuyLens AI**

### Brand statement

> **Know what you're buying before you pay.**

### Product description

BuyLens AI is an AI-powered purchase intelligence platform.

A user provides information about a product they are considering purchasing. BuyLens analyzes the available information and produces a structured decision report containing:

- purchase score
- overall verdict
- price assessment
- value assessment
- risk assessment
- information completeness
- positive findings
- concerns
- missing information
- questions the buyer should ask the seller
- alternative options where available
- final recommendation

The product is designed to reduce uncertainty before high-value purchases.

---

# 2. CORE PRODUCT PHILOSOPHY

BuyLens is NOT:

- a marketplace
- an e-commerce store
- a payment platform
- a seller marketplace
- a generic chatbot
- a generic AI wrapper
- a product review website
- a social network
- a price scraper in the MVP
- an accounting application

BuyLens IS:

> A decision-support product that turns messy product information into a clear purchasing decision.

The central UX question is:

> **"Should I buy this?"**

Every major design decision should help answer that question.

---

# 3. CORE USER JOURNEY

The primary user journey is:

```text
LANDING / HOME
      ↓
ANALYZE PURCHASE
      ↓
PROVIDE PRODUCT INFORMATION
      ↓
AI ANALYSIS
      ↓
DECISION REPORT
      ↓
INVESTIGATE
 ┌────┼─────────────┐
 ↓    ↓             ↓
GOOD  RISKS      COMPARE
      ↓             ↓
      QUESTIONS ────┘
             ↓
       FINAL DECISION
             ↓
      SAVE / SHARE REPORT
```

The product must feel like one continuous journey, not a collection of unrelated dashboard pages.

---

# 4. MVP SCOPE

## 4.1 Required MVP capabilities

The MVP must support:

1. Landing page
2. User dashboard
3. Purchase analysis creation
4. Product information input
5. Optional image upload
6. AI analysis
7. Structured AI result
8. Decision score
9. Verdict
10. Price analysis
11. Value analysis
12. Risk analysis
13. Information completeness
14. Positive findings
15. Concerns
16. Missing information
17. Seller questions
18. Alternative comparison
19. Final recommendation
20. Analysis history
21. Saved reports
22. Responsive interface
23. Loading/progress states
24. Error states
25. Empty states
26. Authentication

---

# 5. NON-MVP FEATURES

Do NOT build these unless explicitly requested later:

- real-time marketplace
- seller accounts
- seller verification
- payments
- subscriptions
- browser extension
- mobile native app
- automatic web crawling
- large-scale price scraping
- social/community features
- user reviews marketplace
- payment escrow
- live seller chat
- complex recommendation engine
- custom-trained AI model
- multi-agent AI architecture
- complex admin dashboard

The coding agent must not introduce these features simply because they appear technically interesting.

---

# 6. TARGET USER

## Primary persona

A Nigerian consumer considering a relatively expensive purchase.

Examples:

- solar/inverter system
- laptop
- smartphone
- generator
- appliance
- camera
- vehicle-related product

For the competition MVP, prioritize **solar/power products**.

---

# 7. PRIMARY USER PROBLEM

Users often receive product information through:

- WhatsApp
- Instagram
- Jiji
- Facebook Marketplace
- direct seller messages
- physical stores
- screenshots
- product descriptions

The information is often incomplete.

Users may not know:

- whether the price is reasonable
- which specifications actually matter
- what information is missing
- what questions to ask
- what risks exist
- whether another option offers better value

BuyLens converts this uncertainty into structured decision support.

---

# 8. DESIGN PRINCIPLES

## Principle 1 — Decision first

The user should understand the recommendation quickly.

Do not bury the verdict below excessive AI text.

---

## Principle 2 — Explain, don't dictate

BuyLens should never behave like:

> "BUY THIS."

Instead:

> "Worth considering because X, Y and Z. However, verify A and B before paying."

The user remains responsible for the final decision.

---

## Principle 3 — Evidence over AI theater

Do not create unnecessary chatbot UI.

The AI should produce useful structured information.

---

## Principle 4 — Premium, calm and trustworthy

The product should feel:

- intelligent
- premium
- calm
- trustworthy
- precise
- modern
- editorial
- technical without feeling intimidating

Avoid:

- excessive gradients
- excessive glassmorphism
- excessive neon
- cartoon AI imagery
- generic chatbot aesthetics
- excessive rounded cards
- dashboard clutter

---

## Principle 5 — Information hierarchy

Important information:

1. Verdict
2. Score
3. Why
4. Risks
5. Missing information
6. Questions
7. Alternatives
8. Detailed evidence

---

# 9. VISUAL DIRECTION

## General aesthetic

Reference mental model:

**Premium fintech + AI research product + editorial decision tool.**

The interface should feel more like a serious intelligence product than a SaaS admin dashboard.

---

# 10. COLOR SYSTEM

Use a restrained neutral foundation.

## Light theme

```text
Background:       #F7F8FA
Surface:          #FFFFFF
Primary text:     #111318
Secondary text:   #626A73
Muted text:       #8B929B
Border:           #E5E7EB
Primary accent:   #111827
Success:          #16834B
Warning:          #B7791F
Danger:           #C0392B
Info:             #356AE6
```

Do not use all colors simultaneously.

Success/warning/danger should communicate semantic status, not decoration.

---

# 11. TYPOGRAPHY

Use a modern sans-serif.

Preferred:

**Inter**

Alternative:

**Geist**

Typography hierarchy:

```text
Display:
56–72px

Page heading:
36–48px

Section heading:
24–32px

Card heading:
18–22px

Body:
15–17px

Secondary:
13–14px

Metadata:
12–13px
```

Use large typography for important scores and verdicts.

---

# 12. SPACING SYSTEM

Use a consistent 4px base system.

Examples:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Do not randomly assign spacing values.

---

# 13. BORDER RADIUS

Use restrained rounding.

```text
Small controls: 8px
Inputs: 10px
Cards: 14px
Large panels: 18px
Modal: 20px
Pills: 999px
```

Avoid making every component excessively rounded.

---

# 14. SHADOWS

Use subtle shadows only where elevation is necessary.

Default cards should primarily use:

- background contrast
- border
- spacing

rather than heavy shadows.

---

# 15. RESPONSIVE BREAKPOINTS

```text
Mobile:
< 640px

Tablet:
640–1023px

Desktop:
1024px+

Large desktop:
1440px+
```

Primary competition presentation target:

**1440 × 900**

Mobile target:

**390 × 844**

---

# 16. APPLICATION STRUCTURE

Suggested routes:

```text
/
 /login
 /signup
 /app
 /app/analyze
 /app/analyze/loading
 /app/report/[id]
 /app/report/[id]/compare
 /app/report/[id]/questions
 /app/history
 /app/settings
```

The report's detailed sections may be implemented as sections/drawers rather than separate routes where appropriate.

---

# 17. GLOBAL APPLICATION SHELL

Authenticated pages use:

```text
┌─────────────────────────────────────────────┐
│ BuyLens                    Notifications     │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Home         │                              │
│ Analyze      │       PAGE CONTENT           │
│ History      │                              │
│              │                              │
│ Settings     │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

Desktop:

- left navigation
- main content
- top utility bar

Mobile:

- top header
- bottom navigation OR compact navigation drawer

Do not show a permanent desktop sidebar on mobile.

---

# 18. SCREEN 01 — LANDING PAGE

## Purpose

Explain the product immediately and encourage the visitor to analyze a purchase.

---

## Hero

Headline:

> **Know what you're buying before you pay.**

Supporting text:

> BuyLens AI analyzes product information, highlights risks, and helps you make a more informed purchase decision.

Primary CTA:

**Analyze a purchase**

Secondary CTA:

**See how it works**

---

## Hero interaction

The main visual should be an example analysis card.

Example:

```text
Solar Power System

₦850,000

BUY SCORE
82 / 100

Worth considering

Price       92
Value       84
Risk        34
Information 64
```

This demonstrates the product immediately.

---

## Animation

On page load:

1. Headline fades in + moves upward 16px.
2. Supporting copy follows after 80ms.
3. CTA follows after another 80ms.
4. Analysis card fades + scales from 0.98 to 1.
5. Score animates from 0 to 82.
6. Individual metrics animate sequentially.

Duration:

- 400–700ms
- ease-out

Do not use bounce animations.

---

# 19. LANDING PAGE — HOW IT WORKS

Three steps:

### 01

**Give us the listing**

Paste information or upload an image.

### 02

**BuyLens analyzes it**

AI evaluates price, value, risks and missing information.

### 03

**Make a smarter decision**

Understand what to verify before paying.

Animation:

On scroll, cards reveal sequentially.

Use:

```text
opacity: 0 → 1
transform: translateY(20px) → 0
```

---

# 20. LANDING PAGE — EXAMPLE REPORT

Show an interactive report preview.

Sections:

- Score
- Verdict
- Strengths
- Risks
- Questions

Allow the user to click example sections.

Do not build actual analysis here.

Use seeded demo data.

---

# 21. LANDING PAGE — FINAL CTA

Headline:

> **Don't just buy. Understand first.**

CTA:

**Analyze a purchase**

---

# 22. SCREEN 02 — AUTHENTICATION

Routes:

```text
/login
/signup
```

Minimal design.

Login:

- email
- password
- continue

Signup:

- name
- email
- password

Optional:

Google sign-in if available.

Do not make authentication visually complex.

Animation:

Form container:

```text
opacity 0 → 1
translateY 12px → 0
```

---

# 23. SCREEN 03 — APP HOME

Header:

> Good afternoon.

Main prompt:

> **What are you considering buying?**

Primary action:

**Analyze a purchase**

Recent analyses:

```text
Solar System
₦850,000
82 — Worth considering

MacBook Pro
₦2,400,000
91 — Good deal

Generator
₦650,000
68 — Investigate
```

---

## Empty state

If no analyses:

> **Your purchase intelligence starts here.**

CTA:

**Analyze your first purchase**

---

# 24. SCREEN 04 — ANALYZE PURCHASE

This is a critical screen.

Title:

> **Analyze a purchase**

Supporting text:

> Give BuyLens enough information to understand what you're considering.

---

## Input methods

Primary:

### Describe it

Large textarea.

Placeholder:

> "Paste the product description, specifications, price, or anything the seller sent you..."

Secondary:

### Upload listing

Drag/drop area.

Accept:

- JPG
- PNG
- WEBP

Optional:

### Product URL

URL input.

For MVP, the URL may be stored but does not need to be automatically scraped.

---

# 25. ANALYSIS FORM VALIDATION

Require enough information to perform useful analysis.

Minimum:

- product name or meaningful description
- price OR clear indication that price is unknown

Errors:

> Add a product description before continuing.

or:

> Add the product price so BuyLens can evaluate the deal.

Do not allow the agent to silently submit incomplete data.

---

# 26. ANALYZE BUTTON

Button:

**Analyze with BuyLens**

Button states:

Default:

> Analyze with BuyLens

Loading:

> Preparing analysis...

Disabled when required fields are incomplete.

Hover:

- slight elevation
- subtle background transition

Click:

- scale 0.98 for 100ms
- then route to analysis loading state

---

# 27. SCREEN 05 — ANALYSIS PROGRESS

Purpose:

Make AI processing feel transparent.

Heading:

> **Analyzing your purchase**

Subheading:

> BuyLens is reviewing the information you provided.

Progress steps:

```text
✓ Understanding the product
✓ Extracting specifications
● Evaluating price
○ Identifying risks
○ Preparing recommendation
```

The active step uses a subtle animated indicator.

---

## Animation

Each completed item:

- checkmark fades in
- text changes from muted to normal
- line fills

Active item:

- small pulsing dot
- 1.5s infinite animation

Avoid fake progress that takes unnecessarily long.

The backend should drive the actual state where possible.

---

# 28. SCREEN 06 — DECISION REPORT

THIS IS THE MOST IMPORTANT SCREEN IN THE PRODUCT.

The page should feel like the result of an intelligent investigation.

Header:

```text
← Back

Solar Power System
Analyzed just now
```

---

## Hero decision card

Large:

# 82

**BUY SCORE**

### Worth considering

Supporting statement:

> The price appears competitive, but important information about the battery warranty and cycle life is missing.

---

# 29. SCORE DESIGN

Use a circular or semi-circular visual.

Do not make it look like a gaming score.

The score should communicate confidence and decision quality.

Animation:

Initial:

```text
0
```

Animate to:

```text
82
```

Duration:

900ms.

Use easing:

ease-out.

Do not animate indefinitely.

---

# 30. SCORE BREAKDOWN

Four metrics:

### Price

92

### Value

84

### Risk

34

### Information

64

Important:

For Risk, higher score should mean **lower risk** OR clearly label it as a risk level.

Do not create confusing semantics.

Recommended:

```text
Price: 92 / 100
Value: 84 / 100
Risk: Low–Medium
Information completeness: 64%
```

---

# 31. VERDICT TYPES

The system supports:

### BUY

Strong recommendation.

### WORTH CONSIDERING

Generally positive but requires verification.

### WAIT

Important unanswered questions.

### AVOID

Significant concerns.

### INSUFFICIENT INFORMATION

Not enough evidence.

Each verdict has:

- label
- semantic color
- icon
- explanation

Never use color alone to communicate verdict.

---

# 32. REPORT — WHY IT LOOKS GOOD

Section:

> **Why this looks promising**

Example:

```text
✓ Competitive price

The listed price sits within the expected range.

✓ Strong capacity

The stated capacity appears suitable for the described use.

✓ Installation included

This may reduce additional setup costs.
```

Each item:

- icon
- title
- explanation
- optional evidence

Animation:

Items reveal sequentially on scroll.

---

# 33. REPORT — CONCERNS

Section:

> **What concerns us**

Example:

```text
⚠ Warranty details unclear

The listing does not specify warranty duration.

Risk: Medium

→ What to ask
```

Each concern has:

- severity
- explanation
- action

Severity:

```text
Low
Medium
High
Critical
```

---

# 34. REPORT — MISSING INFORMATION

Section:

> **What's missing**

Examples:

- battery cycle life
- inverter model
- warranty terms
- installation scope

Use a checklist.

Each item:

```text
○ Battery cycle life
   Not provided

[Ask seller]
```

---

# 35. REPORT — QUESTIONS

Section:

> **Questions to ask the seller**

Example:

### 01

What is the battery's cycle life?

**Copy**

### 02

What exactly does the warranty cover?

**Copy**

### 03

Is installation included in the quoted price?

**Copy**

---

## Copy interaction

Clicking Copy:

Button becomes:

**Copied ✓**

Duration:

1200ms.

Then returns to:

**Copy**

---

# 36. SCREEN 07 — COMPARE ALTERNATIVES

Purpose:

Help users understand tradeoffs.

Title:

> **Is there a better deal?**

Comparison table/cards:

```text
CURRENT
Solar System A

₦850,000
82

Alternative
Solar System B

₦790,000
86

Alternative
Solar System C

₦920,000
89
```

Comparison dimensions:

- price
- capacity
- warranty
- value
- risk
- score

---

# 37. COMPARISON UX

Do not simply highlight the highest score.

Explain tradeoffs.

Example:

> **Option C scores higher because it offers a longer warranty and larger battery capacity, but costs ₦70,000 more.**

This is critical to the product's credibility.

---

# 38. COMPARISON ANIMATION

When alternative is selected:

- selected card scales to 1.01
- border emphasis transitions over 200ms
- comparison details slide/fade in
- values update smoothly

No dramatic animations.

---

# 39. SCREEN 08 — QUESTIONS FOR SELLER

Dedicated question screen or drawer.

Title:

> **Ask before you pay**

Questions generated from identified gaps.

Each question:

```text
What is the battery cycle life?

[Copy]
[Share]
```

Optional:

**Copy all questions**

This creates a practical bridge from AI analysis to real-world action.

---

# 40. SCREEN 09 — FINAL DECISION

This is the end of the primary journey.

Example:

# WAIT

### Don't pay yet.

BuyLens identified **3 things worth verifying first.**

Checklist:

```text
✓ Price appears reasonable
✓ Product capacity looks suitable

⚠ Warranty needs verification
⚠ Battery cycle life missing
⚠ Exact inverter model missing
```

Primary:

**Ask seller**

Secondary:

**Compare alternatives**

Tertiary:

**Save report**

---

# 41. FINAL DECISION ANIMATION

When the page loads:

1. Score/verdict enters.
2. Supporting explanation fades in.
3. Checklist items appear one by one.
4. Primary CTA enters last.

Do not use confetti.

This is a serious decision tool.

---

# 42. SCREEN 10 — HISTORY

Title:

> **Your analyses**

Filters:

- All
- Buy
- Worth considering
- Wait
- Avoid

Each item:

```text
Solar System
₦850,000

82
Worth considering

Oct 6, 2026
```

Clicking opens the report.

---

# 43. SCREEN 11 — SETTINGS

Keep extremely simple.

Sections:

### Account

Name  
Email

### Preferences

Notifications  
Default currency

### Data

Delete account

No need for complex settings in MVP.

---

# 44. MOBILE NAVIGATION

Mobile navigation:

```text
Home
Analyze
History
Settings
```

Use bottom navigation.

The Analyze button may be visually emphasized.

---

# 45. RESPONSIVE REPORT

Desktop:

Use two-column layout where appropriate.

Example:

```text
┌────────────────────────────────────────────┐
│ Product header                             │
├───────────────────────┬────────────────────┤
│                       │                    │
│ BUY SCORE             │ Product snapshot  │
│                       │                    │
│ 82                    │ ₦850,000          │
│                       │                    │
├───────────────────────┴────────────────────┤
│ Score breakdown                            │
├─────────────────────────┬──────────────────┤
│ Why we like it          │ Concerns         │
├─────────────────────────┴──────────────────┤
│ Missing information                        │
├────────────────────────────────────────────┤
│ Questions to ask                           │
└────────────────────────────────────────────┘
```

Mobile:

Everything becomes a vertical flow.

---

# 46. AI ARCHITECTURE

The AI must NOT return arbitrary prose as the main application data.

Use structured output.

Conceptual schema:

```typescript
type AnalysisResult = {
  score: number;

  verdict:
    | "BUY"
    | "WORTH_CONSIDERING"
    | "WAIT"
    | "AVOID"
    | "INSUFFICIENT_INFORMATION";

  summary: string;

  product: {
    name: string;
    category: string;
    price?: number;
    currency: string;
  };

  metrics: {
    priceScore?: number;
    valueScore?: number;
    informationCompleteness: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  };

  strengths: Array<{
    title: string;
    explanation: string;
  }>;

  concerns: Array<{
    title: string;
    explanation: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }>;

  missingInformation: Array<{
    item: string;
    importance: "LOW" | "MEDIUM" | "HIGH";
  }>;

  questions: Array<{
    question: string;
    reason?: string;
  }>;

  alternatives?: Array<{
    name: string;
    price?: number;
    score?: number;
    explanation: string;
  }>;
};
```

The UI must render from this structure.

---

# 47. AI PROMPT REQUIREMENTS

The AI system prompt should establish:

You are BuyLens AI, a purchase decision-support assistant.

Your job is NOT to blindly recommend purchases.

Your job is to:

1. Understand the product.
2. Identify available information.
3. Separate known facts from assumptions.
4. Evaluate the stated price where enough information exists.
5. Identify important missing information.
6. Identify potential risks.
7. Explain strengths.
8. Generate useful questions for the seller.
9. Produce a cautious recommendation.

Never invent product specifications.

Never claim to have verified live market prices unless actual verified data has been supplied.

If information is insufficient, return:

`INSUFFICIENT_INFORMATION`

Do not fabricate evidence.

---

# 48. AI SAFETY / TRUST RULES

The UI must include a subtle disclaimer:

> BuyLens provides AI-assisted decision support, not professional financial, technical, legal, or safety advice. Verify important information independently before purchasing.

For high-risk categories, this warning becomes more prominent.

Do not claim:

> "This product is definitely safe."

Do not claim:

> "This is definitely the cheapest price."

Unless the system has actual verified data.

---

# 49. IMAGE INPUT

MVP supports:

- PNG
- JPG
- WEBP

Maximum recommended size:

10MB.

When uploaded:

Show preview.

Controls:

**Replace**

**Remove**

AI can analyze visible text/specifications if vision capability is available.

If image analysis fails:

> We couldn't reliably read this image. Try uploading a clearer image or paste the product details.

---

# 50. DATABASE

Use Supabase PostgreSQL.

Suggested tables:

## profiles

```text
id
user_id
name
created_at
updated_at
```

## analyses

```text
id
user_id
product_name
category
input_text
input_url
image_url
status
created_at
updated_at
```

## reports

```text
id
analysis_id
score
verdict
summary
result_json
created_at
```

The full structured AI response can initially be stored as JSON.

Do not over-normalize the MVP.

---

# 51. AUTHORIZATION

Users can only access their own analyses/reports.

Supabase Row Level Security must be enabled.

Never expose another user's analysis.

---

# 52. API ARCHITECTURE

Suggested:

```text
POST /api/analyze
```

Request:

```json
{
  "productName": "...",
  "description": "...",
  "price": 850000,
  "currency": "NGN"
}
```

Backend:

1. Validate input.
2. Create analysis record.
3. Call AI provider.
4. Validate structured response.
5. Save report.
6. Return report ID/result.

---

# 53. ERROR HANDLING

Possible errors:

### AI unavailable

> BuyLens is temporarily unavailable. Please try again.

### Invalid input

> Add more product information to continue.

### Image unreadable

> We couldn't read this image clearly.

### Rate limit

> You've reached the current analysis limit. Try again later.

### Network error

> Something went wrong while connecting. Please retry.

Never show raw API errors to users.

---

# 54. LOADING STATES

Every async operation must have a meaningful state.

Never leave a blank screen.

Required loading states:

- authentication
- dashboard loading
- analysis creation
- AI processing
- report loading
- comparison loading
- image upload
- save operation

---

# 55. MICRO-INTERACTION SYSTEM

All animations should feel intentional.

## Default transition

```text
150–250ms
ease-out
```

## Page entrance

```text
350–600ms
```

## Score animation

```text
700–1000ms
```

## Modal/drawer

```text
250–350ms
```

## Hover

```text
150ms
```

---

# 56. BUTTON ANIMATIONS

Default:

- background transition

Hover:

- subtle color shift
- optional translateY(-1px)

Pressed:

```text
scale(0.98)
```

Duration:

100ms.

Loading:

Spinner replaces icon or text appropriately.

Do not animate buttons excessively.

---

# 57. CARD ANIMATIONS

Cards should not constantly float.

On hover:

```text
translateY(-2px)
```

Border/shadow transition:

150–200ms.

For important report cards, use subtle reveal animations only when first entering viewport.

---

# 58. SCORE ANIMATION

Score:

```text
0 → finalScore
```

Use requestAnimationFrame or a motion library.

Duration:

900ms.

Do not animate when navigating back to the same report repeatedly if it becomes annoying.

---

# 59. RISK INDICATOR

Risk should visually communicate severity.

Use:

- icon
- text
- restrained semantic color

Example:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Never communicate risk through color alone.

---

# 60. ACCESSIBILITY

Required:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- alt text
- labels for form controls
- aria labels where required
- buttons must be actual buttons
- links must be actual links
- dialogs must trap focus
- Escape closes dialogs
- reduced-motion support

If:

```css
prefers-reduced-motion: reduce;
```

is enabled:

- disable large entrance animations
- disable score animation
- keep state transitions minimal

---

# 61. DESIGN SYSTEM COMPONENTS

Create reusable components.

Suggested:

```text
Button
IconButton
Input
Textarea
Select
UploadDropzone
Badge
StatusBadge
ScoreRing
MetricCard
AnalysisCard
ReportCard
RiskCard
StrengthCard
QuestionCard
ComparisonCard
ProgressSteps
Skeleton
Modal
Drawer
Toast
Tooltip
EmptyState
ErrorState
Navigation
Header
Sidebar
MobileNav
```

Do not duplicate component logic across pages.

---

# 62. COMPONENT RULE

Before creating a new component, check whether an existing component can be reused.

Use variants rather than duplicating components.

Example:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
<Button variant="danger" />
```

---

# 63. ICONOGRAPHY

Use one consistent icon library.

Recommended:

**Lucide React**

Do not mix multiple icon styles.

Icons should generally be:

- 16px
- 18px
- 20px
- 24px

Avoid giant decorative icons.

---

# 64. TOAST SYSTEM

Use toast notifications for:

- copied
- saved
- deleted
- error
- successful analysis

Example:

> Question copied to clipboard.

Duration:

2–3 seconds.

---

# 65. DEMO DATA

The application must include seeded demo analysis data.

Primary demo:

## Solar Power System

```text
Product:
5kVA Hybrid Inverter + 5kWh Lithium Battery

Price:
₦850,000

Score:
82

Verdict:
WORTH_CONSIDERING

Risk:
MEDIUM
```

Strengths:

- competitive price
- useful capacity
- installation included

Concerns:

- warranty unclear
- battery cycle life missing
- exact inverter model missing

Questions:

- What is the battery cycle life?
- What does the warranty cover?
- What exact inverter model is included?
- Is installation included?

---

# 66. DEMO FLOW

The competition demo must work even if the AI API is unavailable.

Provide a demo mode.

Example:

Landing:

**Try a sample analysis**

Click.

Automatically loads the solar analysis report.

This prevents a live API failure from destroying the presentation.

---

# 67. AI FALLBACK

If the AI request fails:

Do not show a broken page.

Use:

> We couldn't complete a live analysis right now.

Then:

**View sample analysis**

This keeps the application usable during judging.

---

# 68. PERFORMANCE

Target:

- fast initial load
- optimized images
- lazy-load non-critical content
- avoid unnecessary client-side JavaScript
- use server components where appropriate
- use client components only for interactive areas

Do not build the entire app as one giant client component.

---

# 69. SEO / LANDING

Landing page metadata:

Title:

> BuyLens AI — Know What You're Buying Before You Pay

Description:

> BuyLens AI analyzes product information, highlights risks and missing details, and helps you make more informed purchase decisions.

---

# 70. SECURITY

Never expose:

- AI API keys
- Supabase service role key
- private database credentials

AI requests must go through server-side code.

Validate all user input.

Do not trust client-provided scores or verdicts.

---

# 71. ENVIRONMENT VARIABLES

Expected:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
AI_API_KEY
```

Never commit `.env` files.

Provide:

```text
.env.example
```

---

# 72. FOLDER STRUCTURE

Suggested:

```text
src/
  app/
    page.tsx
    login/
    signup/
    app/
    analyze/
    report/
    history/
    settings/
    api/
      analyze/

  components/
    ui/
    layout/
    analysis/
    report/
    comparison/

  lib/
    supabase/
    ai/
    validation/
    utils/

  types/
    analysis.ts
    report.ts

  data/
    demo.ts
```

Exact structure can vary, but separation of concerns must remain clear.

---

# 73. STATE MANAGEMENT

Do not introduce Redux unless genuinely necessary.

Prefer:

- React state
- server state
- URL state
- server actions/API routes

Use a dedicated state library only if complexity actually requires it.

---

# 74. FORM VALIDATION

Use:

**Zod**

Validate:

- product name
- description
- price
- URL
- image metadata

Do not rely only on frontend validation.

---

# 75. DATA FLOW

Exact expected flow:

```text
User
 ↓
Analyze form
 ↓
Frontend validation
 ↓
POST /api/analyze
 ↓
Server validation
 ↓
Create analysis record
 ↓
Prepare AI prompt
 ↓
AI provider
 ↓
Structured JSON
 ↓
Validate AI output
 ↓
Save report
 ↓
Return report ID
 ↓
Redirect to /report/[id]
 ↓
Render report
```

---

# 76. AI OUTPUT VALIDATION

The backend must validate AI output against the expected schema.

If invalid:

1. Attempt one structured retry.
2. If still invalid, return an error.
3. Never render arbitrary malformed AI output.

---

# 77. REPORT UX PRINCIPLE

The report must answer these questions in order:

### 1. What is the verdict?

> Worth considering.

### 2. Why?

> Price is competitive and capacity is appropriate.

### 3. What could go wrong?

> Warranty and battery cycle information are missing.

### 4. What should I do?

> Ask the seller these three questions.

### 5. Is there a better option?

> Compare alternatives.

---

# 78. DO NOT OVERLOAD THE USER

Avoid:

- giant AI paragraphs
- huge tables
- excessive charts
- 20 metrics
- unnecessary terminology

Every piece of information must answer:

> Does this help the buyer make a decision?

If not, remove it.

---

# 79. EMPTY STATES

Every list must have an empty state.

Example:

History:

> **No analyses yet.**

> Analyze your first purchase to start building your purchase history.

CTA:

**Analyze a purchase**

---

# 80. SKELETON STATES

Use skeletons for:

- report
- history
- comparison

Skeletons should approximately match final layout.

Do not use a generic full-page spinner.

---

# 81. MOBILE UX RULES

On mobile:

- no horizontal scrolling
- cards stack
- tables become cards
- buttons remain reachable
- CTA can become sticky where appropriate
- report sections collapse into accordions
- score remains visually prominent

The final decision CTA may use:

```text
position: sticky
bottom: 0
```

with safe-area spacing.

---

# 82. DESKTOP UX RULES

Use maximum content width:

```text
1200–1280px
```

Do not stretch text across the entire 1440px viewport.

For reports:

Use controlled columns.

---

# 83. ANIMATION PHILOSOPHY

Animation should communicate:

- progression
- hierarchy
- state change
- feedback

Never use animation merely because it looks cool.

Avoid:

- excessive parallax
- bouncing cards
- spinning objects
- constant background motion
- excessive gradients
- animated blobs

---

# 84. FINAL DECISION STATES

## BUY

Headline:

> **Looks like a strong purchase.**

Supporting:

> The available information suggests good value with relatively low risk.

CTA:

**Save decision**

---

## WORTH CONSIDERING

Headline:

> **Worth considering, but verify a few details.**

CTA:

**See what to verify**

---

## WAIT

Headline:

> **Don't pay yet.**

Supporting:

> Important information is still missing.

CTA:

**See questions to ask**

---

## AVOID

Headline:

> **There are significant concerns.**

Supporting:

> The current information suggests you should investigate alternatives before purchasing.

CTA:

**Compare alternatives**

---

## INSUFFICIENT INFORMATION

Headline:

> **We need more information.**

CTA:

**Add more details**

---

# 85. DEMO SCENARIO

For the competition, use this exact narrative:

### User sees an Instagram/WhatsApp seller listing:

```text
5KVA Solar System
5KVA Hybrid Inverter
5KWh Lithium Battery
Installation included
₦850,000
```

User screenshots/pastes it into BuyLens.

BuyLens analyzes it.

Result:

# 82 / 100

## Worth considering

### Why?

- competitive price
- suitable capacity
- installation included

### Concerns

- battery cycle life missing
- warranty unclear
- exact inverter model missing

### Before paying

BuyLens generates:

1. What is the battery cycle life?
2. What is the exact inverter model?
3. What does the warranty cover?
4. Is installation fully included?

Then user compares alternatives.

Final:

# WAIT

> Verify these three details before paying.

That is the complete demo story.

---

# 86. WHAT MAKES THIS COMPETITION-WORTHY

The product should demonstrate:

### UX

- problem framing
- information architecture
- decision flow
- progressive disclosure
- uncertainty communication
- trust design

### UI

- typography
- layout
- spacing
- data visualization
- visual hierarchy
- responsive design
- interaction states

### Engineering

- Next.js
- TypeScript
- Supabase
- API integration
- AI integration
- structured data
- authentication
- persistence
- responsive implementation

### Product thinking

The key insight:

> People don't need more product information. They need help understanding what the information means before they spend money.

---

# 87. DEVELOPMENT ORDER

The coding agent must build in this order.

## Phase 1 — Foundation

1. Next.js setup
2. TypeScript
3. Tailwind
4. Fonts
5. Design tokens
6. Global styles
7. Component system
8. Layout
9. Responsive foundation

---

## Phase 2 — Static UX

Build:

1. Landing
2. Login
3. Signup
4. Home
5. Analyze
6. Loading
7. Report
8. Compare
9. Questions
10. Decision
11. History
12. Settings

Use mock data initially.

Do NOT connect AI yet.

---

## Phase 3 — Backend

1. Supabase
2. Auth
3. Database
4. Storage
5. RLS
6. Analysis API

---

## Phase 4 — AI

1. Prompt
2. Structured output
3. Schema validation
4. API integration
5. Save report
6. Error handling

---

## Phase 5 — Polish

1. Motion
2. Loading states
3. Empty states
4. Error states
5. Mobile
6. Accessibility
7. Performance
8. Demo mode

---

# 88. DEFINITION OF DONE

The project is NOT complete simply because the pages exist.

It is complete when:

- landing works
- auth works
- analysis input works
- AI analysis works
- report renders from real structured data
- report is saved
- history works
- comparison works
- questions can be copied
- final decision works
- mobile layout works
- loading states work
- errors work
- demo mode works
- no broken routes
- no console errors
- no exposed API secrets
- accessibility basics work
- animations are polished
- UI is consistent

---

# 89. CODING AGENT RULES

The coding agent MUST:

1. Read this entire document before implementing.
2. Do not invent additional product features.
3. Do not change the core product concept.
4. Do not replace the design direction with generic SaaS UI.
5. Do not create unnecessary screens.
6. Reuse components.
7. Use TypeScript strictly.
8. Avoid `any` unless unavoidable.
9. Validate AI output.
10. Never expose API secrets.
11. Build responsive layouts.
12. Implement loading/error/empty states.
13. Keep animations subtle.
14. Follow accessibility requirements.
15. Use realistic demo data.
16. Keep the primary user journey intact.
17. Do not introduce a new dependency without a reason.
18. Do not build features outside MVP scope.
19. Keep the code maintainable.
20. Test the complete user journey before considering the project finished.

---

# 90. MOST IMPORTANT AGENT INSTRUCTION

When there is a conflict between:

**more features**

and

**better execution of the core journey**

always choose:

> **better execution of the core journey.**

The goal is not to build the largest application.

The goal is to build the **most polished purchase-decision experience possible within the competition deadline.**

---

# 91. FINAL PRODUCT MAP

```text
                         BUYLENS AI
                             │
                             ↓
                        LANDING PAGE
                             │
                             ↓
                          SIGN IN
                             │
                             ↓
                           HOME
                             │
                             ↓
                     ANALYZE PURCHASE
                             │
                  ┌──────────┼──────────┐
                  ↓          ↓          ↓
               TEXT       IMAGE       URL
                  └──────────┼──────────┘
                             ↓
                       ANALYSIS STATE
                             │
                             ↓
                      AI PROCESSING
                             │
                             ↓
                     DECISION REPORT
                             │
          ┌──────────────────┼──────────────────┐
          ↓                  ↓                  ↓
      WHY GOOD            CONCERNS          COMPARE
          │                  │                  │
          │                  ↓                  │
          │             MISSING INFO            │
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ↓
                    QUESTIONS TO ASK
                             │
                             ↓
                      FINAL DECISION
                             │
                  ┌──────────┼──────────┐
                  ↓          ↓          ↓
                 BUY       WAIT       AVOID
                             │
                             ↓
                       SAVE REPORT
                             │
                             ↓
                          HISTORY
```

---

# 92. SUCCESS CRITERIA FOR THE COMPETITION

A judge should be able to understand the product in less than 30 seconds.

They should immediately understand:

**Problem:**

> Buying expensive products with incomplete information is risky.

**Solution:**

> BuyLens analyzes the information and helps you decide.

**Experience:**

> Give it a listing → get a decision report → investigate → decide.

**Technical achievement:**

> The product actually works.

**Design achievement:**

> The interface makes complex information easy to understand.

The final impression should be:

> **"This isn't just an AI wrapper. Someone actually designed a product around a real decision problem."**

---

# 93. NORTH STAR

Every feature, component, animation, AI response and screen must ultimately serve one question:

# **"Should I buy this?"**

If a feature does not help the user answer that question:

**Do not build it.**

If an animation distracts from that question:

**Remove it.**

If an AI response makes the decision less clear:

**Simplify it.**

If a screen exists only because "most SaaS apps have one":

**Remove it.**

The product succeeds when the user finishes the experience feeling:

> **"I understand this purchase much better than I did five minutes ago."**
