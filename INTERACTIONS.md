# BuyLens AI — Interactions Spec

**Version:** 1.0
**Audience:** AI coding agent + human developers
**Companion documents:** Master PRD, `STYLE_GUIDE.md`

> **How to use this file.** `STYLE_GUIDE.md` defines what things look like and the reusable motion tokens. This file defines **what happens, in what order, when the user does something**. Read the style guide for every UI task. Read the relevant section here when building a specific screen or flow.
>
> **Token rule.** Never repeat raw values here. Timings reference the style guide tokens:
> `fast` = 150ms, `base` = 200ms, `slow` = 250–350ms, `enter` = 400–600ms, `score` = 900ms, `ease-out` = `cubic-bezier(0.22, 1, 0.36, 1)`, stagger = 80ms unless stated.
>
> **Entry format.** Every interaction lists: **Trigger → Sequence → End state → Fallbacks** (error, reduced motion, mobile).
>
> **North star.** Every interaction must help answer *"Should I buy this?"*. If an animation does not communicate progression, hierarchy, state change, or feedback, remove it.

---

## 0. Global rules

### 0.1 Principles
1. Feedback within 100ms of any user action (pressed state, spinner, or label change).
2. Motion communicates **progression, hierarchy, state change, feedback**. Nothing else.
3. Animate only `opacity`, `transform`, `background-color`, `border-color`, `box-shadow`, `stroke-dashoffset`. Never animate `width/height/top/left` of layout-affecting elements (exception: metric bar fill, using `transform: scaleX` or clip where possible).
4. No bounce, overshoot, confetti, parallax, spinning, blobs, or looping animation (only the active-step pulse and skeleton shimmer loop).
5. Every async action has: idle → pending → success | error states, all designed.
6. Never block the user with fake delays. Real backend state drives progress; minimum visual display time for a progress step is 400ms so it is readable.
7. Entrance animations run **once** per mount/visit. Do not replay when the user returns to the same report in the same session.

### 0.2 Reduced motion (applies to every section)
When `prefers-reduced-motion: reduce`:
- Remove translate/scale entrance animations; keep instant render or a 150ms opacity fade.
- Score and ring render at their final value immediately.
- Disable the progress-step pulse (show a static dot) and skeleton shimmer (static `#F2F4F0`).
- Keep color/border state changes (they carry meaning) at ≤150ms.
- Disable scroll-reveal; content is visible on load.

Implementation: a `useReducedMotion()` hook (or `motion`'s equivalent) read once and passed to animated components. Components must render correctly with motion disabled.

### 0.3 Standard interaction primitives (reuse, do not reinvent)

| Primitive | Behavior |
|---|---|
| **Press** | `scale(0.98)` for 100ms on buttons; `scale(0.995)` on interactive cards |
| **Hover lift** | Interactive cards only: `translateY(-2px)` + `shadow-sm` + border `line-strong`, `fast` |
| **Focus** | `:focus-visible` outline per style guide (navy-surface variant on navy). Never remove |
| **Scroll reveal** | `opacity 0→1`, `translateY 20px→0`, `enter`, trigger once at 15% in view, 80ms stagger within a group |
| **Toast** | See §13 |
| **Loading button** | Label swaps, spinner appears, width locked, `aria-busy="true"`, clicks ignored |
| **Skeleton → content** | Skeleton fades out as content fades in over `base` (no layout shift; skeleton dimensions match content) |

### 0.4 Keyboard baseline
- All interactive elements are native `button`/`a`/`input`. Tab order follows visual order.
- `Enter`/`Space` activate buttons; `Enter` activates links.
- `Escape` closes the topmost modal, drawer, or popover and returns focus to its trigger.
- Visible focus on every focusable element.
- Skip-to-content link at the top of every page (visible on focus).

---

## 1. Landing page (`/`)

### 1.1 Hero load sequence
**Trigger:** page load (or hydration complete).
**Sequence (all `ease-out`, 400–700ms each):**
1. `0ms` — headline: opacity 0→1, translateY 16px→0.
2. `+80ms` — supporting text, same animation.
3. `+160ms` — CTA group (primary + secondary), same animation.
4. `+240ms` — sample analysis card: opacity 0→1, scale 0.98→1.
5. `+400ms` — score counts 0→82 over `score` (900ms) while the ring stroke fills in sync.
6. `+700ms` onward — four metrics reveal one at a time, 150ms apart: label + value fade in; progress bar fills over 700ms.

**End state:** everything static. Nothing loops.
**Fallbacks:** reduced motion renders all final values immediately. If JS fails, the content must still be visible (render final state in server HTML; animate via client enhancement).
**Performance:** hero must be server-rendered; only the sample card is a client component.

### 1.2 Hero CTAs
- **Analyze a purchase** (primary): hover → `translateY(-1px)`, arrow icon shifts 2px right; press → `scale(0.98)`. Click → route to `/signup` if signed out, otherwise `/app/analyze`.
- **See how it works** (secondary): smooth scroll to the How It Works section (`scroll-behavior: smooth` only when motion allowed); moves focus to that section's heading afterwards.
- **Try a sample analysis**: loads the demo report directly (see §15), no auth required.

### 1.3 How it works
**Trigger:** section enters viewport.
**Sequence:** three step cards reveal with scroll-reveal primitive, 80ms stagger. Numerals `01–03` appear with their card (no separate animation).
**End state:** static.

### 1.4 Interactive example report
**Purpose:** let visitors explore seeded demo data. No real analysis.
**Controls:** a tab/segmented row — Score, Verdict, Strengths, Risks, Questions.
**Trigger:** click or keyboard select (arrow keys move between tabs, `Home`/`End` jump to first/last).
**Sequence:** active tab indicator slides (200ms); panel content cross-fades (opacity, 200ms) with an 8px upward settle. Height changes must not cause layout jump: reserve the tallest panel's height, or animate container height over 250ms.
**End state:** selected tab shown with navy text and underline; panel content visible.
**Accessibility:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.

### 1.5 Final CTA band
Scroll-reveal; CTA hover/press as in 1.2. No additional motion.

### 1.6 Header
- Transparent over hero; after 8px scroll, background becomes white with a bottom border (transition `base`).
- Mobile: menu button opens a drawer (§14.2).

---

## 2. Authentication (`/login`, `/signup`)

### 2.1 Entrance
Form container: opacity 0→1, translateY 12px→0, `enter`. No other animation.

### 2.2 Submit
**Trigger:** click the button or press `Enter` in any field.
**Sequence:**
1. Run client validation (Zod). On failure → §2.3, stop.
2. Button → loading state: label "Continuing…" (login) / "Creating account…" (signup), spinner left, fields set `readonly` (not disabled, to preserve focus), button width locked.
3. On success → route to `/app` (new users) or the page they came from (`?next=` param validated against an allowlist of internal routes).
4. On failure → loading ends, error shown (§2.3), focus moves to the first invalid field or the error summary.

### 2.3 Validation and errors
- Validate on blur for the first time, then on change after a field has been touched. Never show errors on an untouched, focused field.
- Field error: border → danger, helper text fades in below (`fast`) with `AlertCircle`; `aria-invalid="true"` and `aria-describedby` linked.
- Form-level error (wrong credentials, network): inline `ErrorState` banner above the button, `role="alert"`. Copy is calm and non-specific for credentials: "That email and password don't match. Please try again."
- Never reveal whether an email exists.

### 2.4 Optional Google sign-in
Secondary button with provider icon. Click → button loading state; redirect handled by the provider. On return failure → banner "We couldn't sign you in. Please try again."

### 2.5 Password field
Show/hide toggle (`Eye`/`EyeOff`) as an icon button inside the input; `aria-pressed`, `aria-label="Show password"`. Does not shift layout.

---

## 3. App shell and navigation

### 3.1 Route transitions
- Page content fades in (opacity 0→1, 150ms). No slide between app routes (avoids disorientation in a tool UI).
- Shell (sidebar, top bar) never re-animates between routes.
- Show the route-level skeleton for that page immediately while data loads.

### 3.2 Sidebar (desktop)
- Hover: item background → subtle (`fast`).
- Active: navy background, white text, small lime dot at the right. The active state changes instantly on click (optimistic), not after route load.
- Keyboard: arrow keys are **not** required; standard tab order. `aria-current="page"` on the active item.

### 3.3 Mobile bottom navigation
- Tap: item shows pressed state (`scale(0.96)`, 100ms), active indicator (lime bar) transitions to the new item over `base`.
- Analyze item is visually emphasized; same tap behavior.
- Hidden when the on-screen keyboard is open on form screens (to avoid covering inputs).
- Safe-area padding always applied.

### 3.4 Notifications
Icon button in the top bar opens a popover (desktop) or drawer (mobile) — see §14. MVP content may be an empty state: "You're all caught up." No unread badge animation.

---

## 4. App home (`/app`)

### 4.1 Load
**Sequence:**
1. Shell visible immediately.
2. Greeting + prompt render from server data (no skeleton needed; name is known).
3. "Recent analyses" shows 3 `AnalysisCard` skeletons while loading.
4. Cards replace skeletons (cross-fade `base`), then stagger-reveal 80ms apart if they were not already in view.

**Greeting:** "Good morning/afternoon/evening" computed on the **client** using the user's local time (avoid server/client hydration mismatch by rendering a neutral "Welcome back." on the server or using `suppressHydrationWarning` on that node).

### 4.2 Primary CTA
"Analyze a purchase" → press feedback → route to `/app/analyze`.

### 4.3 Recent analysis card
- Whole card is one link to `/app/report/[id]`.
- Hover lift, press, focus per primitives.
- Score numeral and verdict badge are static (no re-animation).

### 4.4 Empty state
If no analyses: show `EmptyState` with CTA "Analyze your first purchase". No skeletons are shown once the empty result is confirmed.

### 4.5 Error state
If the list fails to load: inline `ErrorState` inside the list area with `Try again` (re-fetch, button loading state) and `View sample analysis`. The greeting and CTA remain usable.

---

## 5. Analyze purchase (`/app/analyze`)

### 5.1 Form behavior
**Fields:** product description (primary textarea), price (currency input with "I don't know the price" checkbox), listing image (optional dropzone), product URL (optional).

**Rules:**
- Textarea autofocus on desktop; not on mobile (avoids keyboard pop-up on arrival).
- Textarea grows with content up to a max height (≈ 320px), then scrolls internally.
- Price: formats with thousands separators as the user types (`850000` → `850,000`), caret position preserved; stores a number. "I don't know the price" checkbox disables the field and clears errors for it (field shows "Price unknown").
- URL: validated on blur; stored but not scraped in the MVP. Helper text: "We'll save this link with your analysis."

### 5.2 Validation
Use Zod on the client **and** the server.
- Minimum to submit: meaningful description (or product name) **and** (price **or** price-unknown checked).
- Errors (exact copy):
  - "Add a product description before continuing."
  - "Add the product price so BuyLens can evaluate the deal."
- Timing: show errors after the user attempts to submit, or on blur of a touched field. On submit failure, focus moves to the first invalid field and the page scrolls it into view (smooth if motion allowed).
- The submit button is disabled while required fields are incomplete (per PRD §26), **but** a disabled button must still be explainable: show a muted helper line beneath the button listing what is missing ("Add a description and price to continue"), `aria-describedby` linked to the button.

### 5.3 Image upload
**Trigger:** drag-over, drop, or click "browse".
**Sequence:**
1. **Drag-over:** dropzone border → navy, background → `#F7F8F5` (`fast`), icon → navy.
2. **Drop/select:** validate type (JPG/PNG/WEBP) and size (≤10MB) client-side first.
3. **Invalid:** dropzone shows danger border and message; nothing uploads. Copy: "Upload a JPG, PNG or WEBP under 10MB."
4. **Valid:** thumbnail preview appears (fade `base`) with a progress bar while uploading to storage; file name and size shown.
5. **Success:** progress bar completes and fades; `Replace` and `Remove` controls appear.
6. **Upload failure:** inline error with `Try again`; the preview stays so the user does not lose context.

**Replace:** opens the file picker; the new image swaps in with a cross-fade (`base`).
**Remove:** immediately removes the preview (`base` fade-out) and shows a toast "Image removed." No confirm dialog (low-stakes, reversible by re-uploading).
**Keyboard:** the dropzone is a real `button` that opens the file picker with `Enter`/`Space`.
**Mobile:** "browse" opens the camera/library chooser.

### 5.4 Submit
**Trigger:** click "Analyze with BuyLens" or press `Cmd/Ctrl+Enter` inside the textarea.
**Sequence:**
1. Click → `scale(0.98)` for 100ms.
2. Run client validation. On failure → §5.2, stop.
3. Button label → "Preparing analysis…", spinner left, all fields `readonly`.
4. `POST /api/analyze` (see PRD §52). On receiving an analysis id → route to `/app/analyze/loading?id=…`.
5. On failure → button returns to default, fields editable, `ErrorState` banner above the button with calm copy (PRD §53) and `View sample analysis`.

**Double-submit protection:** the button ignores further clicks while pending; the server must also dedupe by idempotency key.
**Draft preservation:** if the user navigates away or an error occurs, field values persist (keep in component state; on route leave, optionally store a draft in `sessionStorage` and restore on return).

---

## 6. Analysis progress (`/app/analyze/loading`)

### 6.1 Principles
- Progress is **truthful**: each step reflects real backend state where possible (status events or polling `analyses.status`).
- If the backend cannot report granular steps, advance steps by real milestones (request accepted, AI responded, validation passed, report saved), not by a timer pretending to be work. Cosmetic pacing is allowed only to keep each step visible for ≥400ms.

### 6.2 Steps
```
Understanding the product → Extracting specifications → Evaluating price → Identifying risks → Preparing recommendation
```

### 6.3 Step state transitions
| Transition | Animation |
|---|---|
| pending → active | label color muted → normal (`fast`), pulsing lime dot appears (1.5s loop) |
| active → done | dot → navy circle with white check (check fades in `base`), connector line fills navy (`slow`), label stays normal weight |
| error | active step shows danger icon; remaining steps freeze |

### 6.4 Completion
**Trigger:** report saved and validated.
**Sequence:** last step completes → 300ms pause → route to `/app/report/[id]` (the report's own entrance sequence begins).
**Heading** changes from "Analyzing your purchase" only on error.

### 6.5 Failure
- Show `ErrorState` in place of the steps with PRD §53 copy and two actions: `Try again` (re-submits, reusing stored input) and `View sample analysis`.
- If the failure is "invalid AI output" after the one retry (PRD §76), do not display partial results.

### 6.6 Navigation and refresh
- Closing the tab or refreshing: the analysis continues server-side; reopening the loading URL resumes from the current status.
- `Back` is allowed; show a toast "We'll keep analyzing in the background. Find it in History." if the user leaves mid-run.
- If the user lands on this URL with an unknown/foreign id → generic "not found" state (never leak existence).

### 6.7 Accessibility
Container has `aria-live="polite"`; announce each step as it becomes active ("Evaluating price"). Do not announce every pulse.

---

## 7. Decision report (`/app/report/[id]`)

### 7.1 Load and entrance
**Trigger:** route load.
**Sequence:**
1. Page skeleton matching the final layout (decision card block, snapshot block, 4 metric blocks, section blocks).
2. When data arrives, skeleton cross-fades to content (`base`).
3. Entrance (first view only):
   - Decision card: opacity 0→1, translateY 16px→0, `enter`.
   - `+80ms` product snapshot.
   - Score and ring count 0→score over `score` (900ms) starting with the card.
   - `+300ms` breakdown metrics reveal in sequence (150ms apart); bars fill.
4. Below-the-fold sections use scroll reveal when first reaching 15% of viewport; items within a section stagger by 80ms.

**Repeat visits:** if the report was already viewed this session, render the final state with a 150ms opacity fade only.
**Mobile:** same order, vertical flow; score ring 160px.

### 7.2 Decision card interactions
- The verdict badge is **not** interactive.
- "Why this score?" is not a separate feature (do not add). Detail lives in the sections below.
- Primary actions in the card or beneath it: `Ask seller` (scrolls to Questions and moves focus), `Compare with another product`, `Save report`.

### 7.3 Section navigation (desktop)
Optional sticky mini-nav (anchor links: Score · Strengths · Concerns · Missing · Questions). Active link updates as sections scroll into view (IntersectionObserver, 200ms color transition). Clicking scrolls smoothly (if motion allowed), then moves focus to the section heading. Do not build this if it adds clutter; the report is short enough to scroll.

### 7.4 Strengths
Scroll reveal, 80ms stagger. Cards are non-interactive (no hover lift).

### 7.5 Concerns
- Scroll reveal, 80ms stagger, ordered by severity (Critical → Low).
- Each concern has `→ What to ask`. **Click:** scrolls to the matching question in the Questions section, moves focus to it, and briefly highlights it (background tint `#F7FEE7`→transparent over 1200ms; with reduced motion, a static 2px navy outline for 1200ms instead).
- If no matching question exists, open the Questions drawer/section anyway and show a toast "We've added this to your questions." only if one is actually generated; otherwise do nothing silently (never imply an action that did not happen).

### 7.6 Missing information
- Each row: hollow circle, item, "Not provided", importance badge, `Ask seller`.
- **`Ask seller` click:** copies the corresponding question to the clipboard, button shows `Copied ✓` for 1200ms, toast "Question copied to clipboard." (same behavior as §10.2).
- Rows are static otherwise; no checkbox toggling in the MVP (do not add persistence for ticking items off unless requested).

### 7.7 Questions section
See §10.

### 7.8 Disclaimer
Always visible at the report footer. For high-risk categories (solar/power electrical, safety-related), show the prominent warning variant near the top of the Concerns section **and** at the footer. Not dismissible.

### 7.9 Report actions
| Action | Behavior |
|---|---|
| **Save report** | See §11 |
| **Share** | See §12 |
| **Compare with another product** | See §8 |
| **Back** | `ArrowLeft` returns to the previous app route (history/home). If none, go to `/app` |

### 7.10 Error and not-found
- Report fails to load: `ErrorState` with `Try again` + `Back to history`.
- Report not found or not owned by the user: generic "We couldn't find this report." with a link to History. Never confirm that another user's report exists.

---

## 8. Compare (`/app/report/[id]/compare`)

**Scope:** exactly two products in the MVP (current + one alternative). Never show a third slot.

### 8.1 Entry
**Trigger:** "Compare with another product" on the report.
**Presentation:** route to the compare page (or open as a full-height drawer on mobile). Header: "Is there a better deal?"

### 8.2 Choose the second product
Two option cards: **Previous analysis** and **Analyze new product**.

**Option card behavior:**
- Hover/press per interactive card.
- Select → card becomes `selected` (navy border, `scale(1.01)`, check indicator; `base` 200ms). Only one can be selected.
- The related panel appears below: opacity 0→1, translateY 8px→0, `slow`.

**A. Previous analysis**
- Shows the user's other analyses as selectable `AnalysisCard`s (radio semantics, `role="radiogroup"`).
- Excludes the current report.
- Empty (user has only this one analysis): show a calm empty state "You don't have another analysis yet." with `Analyze new product` as the action.
- Selecting an item shows `selected` styling; a sticky/inline `Compare` primary button enables.

**B. Analyze new product**
- Reuses the Analyze form (same validation and image handling as §5) inline or in a drawer.
- Submit runs the full analysis (§6 progress, shown inline in the drawer), and on completion returns to the compare page with the new analysis preselected. Do **not** navigate the user away from the compare context.
- If the user cancels mid-analysis, the analysis continues and appears in History.

### 8.3 Generating the comparison
**Trigger:** click `Compare`.
**Sequence:**
1. Button → loading ("Comparing…").
2. Show the comparison skeleton (two header cards, table rows, slider rows, recommendation panel).
3. Backend compares the **two saved structured analyses** (no re-analysis of raw input, no invented data) and returns structured comparison JSON: stronger overall, where A wins, where B wins, biggest trade-off, scenario fit for each, final recommendation.
4. Validate output against schema; one retry on invalid; else error state.
5. Skeleton cross-fades to content.

### 8.4 Reveal order (first view)
Order matters; it teaches the user how to read the result:
1. Two product header cards (fade, 80ms apart).
2. Comparison table rows reveal top→bottom (60ms stagger).
3. Trade-off sliders: handles slide from the center to their positions over 400ms ease-out, 80ms stagger.
4. "The trade-off" summary card fades in.
5. Recommendation panel fades in last (`enter`).

The recommended product is **not** visually crowned until step 5. The `selected` styling on its header card (navy border + check) applies when the recommendation panel appears.

### 8.5 Comparison table
- The better value in each row is bolder and `text-ink`; the other is muted. A 6px navy dot marks the row winner. **No green/red.**
- Ties show neither marker.
- Rows where data is missing for one product show "Not provided" in muted italics (quoted seller text is the only other italic use) and are excluded from "wins" counts.
- Mobile: each dimension becomes a stacked card with A and B side by side.

### 8.6 Trade-off sliders
- Non-interactive visualization (not draggable). Handle position derives from comparison data.
- Hover/focus on a row (or tap on mobile) shows a tooltip with the exact basis: e.g. "Product B has 10kWh vs 5kWh."
- Each row has `aria-label` like "More capacity: favors Product B" and the same text visible in the tooltip.

### 8.7 Switching the alternative
- A "Change product" ghost button re-opens the picker. Choosing a new alternative re-runs §8.3 with the same skeleton and reveal.
- The previous result fades out (`base`) before the skeleton shows.

### 8.8 Recommendation panel actions
- `View Product B` (accent): routes to B's report.
- `View Product A` (outline on navy): routes to A's report.
- A "Choose Product A if…" tile is always present when the model returned a scenario for the non-recommended option.

### 8.9 Edge cases
- Both products have identical overall scores: the recommendation panel says "These two are closely matched." and leads with the trade-off; no single product is crowned.
- Products from different categories: show a gentle notice at the top "These products are in different categories, so some comparisons may not apply." and hide non-comparable rows.
- Comparison fails: `ErrorState` with `Try again` and `Back to report`.

---

## 9. Final decision (`/app/report/[id]` end section or dedicated view)

### 9.1 Entry
Reached from the report (final section or CTA) or the Compare recommendation. Present as the closing section of the report (preferred) or a focused view.

### 9.2 Entrance sequence (on first view)
Per PRD §41, in order:
1. Verdict (display type) + badge enter: opacity 0→1, translateY 16px→0, `enter`.
2. `+80ms` supporting explanation fades in.
3. `+160ms` checklist items appear one by one, 80ms stagger. ✓ items first, then ⚠ items.
4. Primary CTA enters last (fade + 8px rise, `slow`).
No confetti, no sound, no celebratory effects, regardless of verdict.

### 9.3 CTA mapping by verdict (PRD §84)
| Verdict | Primary | Secondary | Tertiary |
|---|---|---|---|
| BUY | Save decision | Compare alternatives | Share |
| WORTH_CONSIDERING | See what to verify | Ask seller | Save report |
| WAIT | See questions to ask | Compare alternatives | Save report |
| AVOID | Compare alternatives | See questions to ask | Save report |
| INSUFFICIENT_INFORMATION | Add more details | Save report | – |

- "See what to verify" / "See questions to ask": scroll to Questions and move focus to its heading.
- "Add more details": routes to Analyze with the existing input prefilled for editing; on resubmit, creates a **new** analysis (never mutates a saved report).
- Mobile: primary CTA is sticky at the bottom with safe-area padding; it does not overlap the last checklist item (add bottom padding equal to the bar height).

### 9.4 Checklist behavior
Static display (no toggling in the MVP). Counts are derived from the data ("3 things worth verifying first") and must match the number of ⚠ items.

---

## 10. Questions to ask

### 10.1 Presentation
Report section **and** an optional dedicated route/drawer (`/app/report/[id]/questions`, "Ask before you pay"). Both use the same `QuestionCard` and share state.

### 10.2 Copy a question
**Trigger:** click `Copy` on a card.
**Sequence:**
1. Write the question text to the clipboard (`navigator.clipboard.writeText`).
2. Button label → `Copied ✓` (check icon, success text color) for **1200ms**, then reverts. Announce "Copied" via `aria-live="polite"`.
3. Toast: "Question copied to clipboard." (2–3s).
**Fallback:** if the Clipboard API is unavailable or rejected (e.g. insecure context), select the text in a hidden textarea and use `document.execCommand('copy')`; if that also fails, show the error toast "Couldn't copy. Select the text and copy manually." and keep the text selected.
**Multiple clicks:** clicking again during the 1200ms window restarts the timer; never stacks toasts (replace the existing toast).

### 10.3 Copy all questions
- Copies a numbered plain-text list suitable for WhatsApp:
  ```
  Questions for the seller — [Product name]
  1. …
  2. …
  ```
- Button feedback and toast as in 10.2 ("All questions copied to clipboard.").

### 10.4 Share
- Uses the Web Share API when available (mobile): shares the same formatted text.
- Desktop fallback: a small popover with `Copy text` and `Open WhatsApp` (a `wa.me` link with the encoded text). No other social targets.
- Cancelling the native share sheet is not an error; show nothing.

### 10.5 Ordering and content
- Questions are ordered by the importance of the gap they address (High-importance missing items first).
- The optional "reason" line is collapsed by default on mobile (tap the card chevron to expand, `base` height transition) and always visible on desktop.

---

## 11. Save report

**Clarification:** every analysis is persisted automatically on creation (it appears in History). "Save report" marks the report as **saved** (bookmarked) so the user can find it quickly. Do not build folders or tags.

**Trigger:** click `Save report` / `Save decision`.
**Sequence:**
1. Optimistic update: icon `Bookmark` → filled, label → `Saved ✓`, immediately.
2. Request persists the flag.
3. Success: toast "Report saved."
4. Failure: revert icon/label with `base` transition, toast "Couldn't save this report. Please try again."

**Toggle:** clicking `Saved` again un-saves with toast "Removed from saved." (no confirmation).
**State:** `aria-pressed` reflects saved state. The label change is announced via `aria-live`.
**History:** saved reports show a small `Bookmark` icon on their `AnalysisCard`. A "Saved" filter may be added to History only if it does not clutter the filter bar (default: do not add).

---

## 12. Share report

- **MVP scope:** share the **seller questions** (see §10.4) and a plain-text summary. Do not build public report links or social/community features (PRD §5 non-goals).
- If a "Share report" action is shown on the report, it shares text: product name, score, verdict, one-line summary, and "Analyzed with BuyLens". No private data (no user name or email).
- If public links are ever added later, they require explicit opt-in and unguessable tokens; out of scope now.

---

## 13. Toasts

| Property | Spec |
|---|---|
| Position | Bottom-center on desktop; bottom-center above the bottom nav (+ safe area) on mobile |
| Entrance | opacity 0→1 + translateY 12px→0, `slow` |
| Exit | opacity 1→0, `base` |
| Duration | 2.5s success/info; 4s error; pauses on hover/focus; swipe-down dismiss on mobile |
| Stacking | Max 1 visible; a new toast replaces the current one (cross-fade) |
| Content | One short sentence; optional single action (e.g. `Undo`, `View sample analysis`) |
| Accessibility | Container `aria-live="polite"` (`assertive` + `role="alert"` for errors); never the only way to learn an outcome that matters (also reflect state in the UI) |

Standard copy: "Question copied to clipboard." · "All questions copied to clipboard." · "Report saved." · "Removed from saved." · "Image removed." · "Report deleted." · "Something went wrong while connecting. Please retry."

---

## 14. Modals, drawers, popovers

### 14.1 Modal (e.g. delete confirmation)
- **Open:** backdrop fades in (`base`), panel fades + rises 8px (`slow`). Focus moves to the first focusable element (or the dialog title for destructive confirms, with the **cancel** button focused first).
- **Behavior:** focus trapped inside; `Escape` and backdrop click close (except destructive confirms in a pending state); body scroll locked; background `inert`.
- **Close:** reverse animation (`base`); focus returns to the trigger.
- **A11y:** `role="dialog"` (or `alertdialog` for destructive), `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.

### 14.2 Drawer
- Desktop: right-side, 480px, slides in over `slow` ease-out. Mobile: bottom sheet (max 90vh) rising over `slow`, with a drag handle; swipe down (>80px) dismisses.
- Same focus, scroll-lock, and `Escape` rules as modals.
- Used for: mobile navigation menu, notifications, questions (if not a route), analyze-new-product in Compare.

### 14.3 Popover / tooltip
- Tooltips: appear after 300ms hover or on focus; disappear on blur/leave/`Escape`; never contain interactive content; `role="tooltip"` with `aria-describedby`.
- On touch devices tooltips appear on tap and dismiss on the next tap elsewhere.
- Popovers (share fallback): open on click, close on outside click or `Escape`, focus managed.

---

## 15. Demo mode and AI fallback

**Why:** the competition demo must work even if the AI provider is down (PRD §66–67).

### 15.1 Entry points
- Landing: "Try a sample analysis".
- Any `ErrorState` after a failed live analysis: `View sample analysis`.
- Optional environment flag `NEXT_PUBLIC_DEMO_MODE=true` forces demo behavior for all analyses.

### 15.2 Behavior
- Loads the seeded solar report (5kVA Hybrid Inverter + 5kWh Lithium Battery, ₦850,000, 82, WORTH_CONSIDERING, risk MEDIUM) from local seed data; **no network or auth required**.
- The demo plays the normal progress sequence (§6) compressed to ≈3s total so the demo story stays intact, then opens the report. This pacing is allowed because the data is seeded; label the page with a subtle "Sample analysis" badge so it is never mistaken for a live result.
- Compare in demo mode uses seeded alternatives (Solar System B and C) and the seeded trade-off narrative (PRD §36–37).
- Final decision in the demo narrative shows **WAIT** after the user has reviewed the missing information, per the PRD demo story (§85).
- Demo reports are not written to the database for signed-out users. For signed-in users, they are labeled and may be saved only if the user clicks `Save report`.

### 15.3 Live failure handling
1. Live request fails (AI unavailable, invalid output after one retry, timeout at 45s).
2. Show: "We couldn't complete a live analysis right now." with `Try again` and `View sample analysis`.
3. Never show a blank screen, partial JSON, or raw error text.

---

## 16. History (`/app/history`)

### 16.1 Load
Skeleton rows matching `AnalysisCard` layout → cross-fade to content → stagger reveal for the first 8 rows only (later rows render without animation for performance).

### 16.2 Filters
Segmented control: All · Buy · Worth considering · Wait · Avoid.
- **Select:** active pill slides (200ms) or swaps instantly with reduced motion; list updates **without** a full skeleton (cross-fade `fast`).
- Filter is reflected in the URL (`?verdict=WAIT`) so back/forward work and it can be restored.
- Insufficient-information analyses appear under "All" only (do not add a sixth filter).
- Count shown inline only if useful ("Wait · 3"); skip if cluttered.
- Keyboard: arrow keys move among options (`role="tablist"` or `radiogroup` semantics), `Enter`/`Space` selects.

### 16.3 Rows
- Click/Enter opens the report. Hover lift per primitives.
- Overflow menu (`MoreHorizontal`) per row **only if** delete is needed: Delete → confirm modal (§14.1) → optimistic removal (`base` fade/collapse 200ms) → toast "Report deleted." with `Undo` for 5s (soft delete). If undo is not implemented, keep the confirm modal and omit the toast action.

### 16.4 Empty and filtered-empty
- No analyses at all: "No analyses yet." + CTA "Analyze a purchase".
- Filter has no results: "No analyses match this filter." + `Clear filter` ghost button.

### 16.5 Pagination
Load 20 at first; an `IntersectionObserver` sentinel loads the next page when near the bottom, showing 2–3 skeleton rows. A manual `Load more` button remains as a fallback (and for keyboard/assistive users). Never use jarring layout shifts.

---

## 17. Settings (`/app/settings`)

### 17.1 Account
- Name editable inline: `Edit` ghost → input + `Save`/`Cancel`. Save → loading → toast "Name updated." Email is read-only.
- Validation errors per §2.3.

### 17.2 Preferences
- Notifications toggle and Default currency select save **on change** (optimistic) with a subtle "Saved" caption fading in next to the control for 1500ms; on failure revert and toast an error.
- Default currency affects display of new analyses only; existing reports keep their currency.

### 17.3 Delete account (destructive)
1. `Delete account` (danger, secondary-weight until hovered) opens an `alertdialog`.
2. The dialog explains what will be deleted (profile, analyses, reports, uploaded images) and requires typing `DELETE` to enable the confirm button.
3. Confirm → loading ("Deleting…") → sign out → redirect to `/` with toast "Your account has been deleted."
4. Failure: dialog stays open with an inline error and `Try again`.
No countdown tricks, no dark patterns.

---

## 18. Global error, offline and edge states

| Situation | Behavior |
|---|---|
| **Offline** | Persistent slim banner at the top of the content area: "You're offline. Some actions are unavailable." (`role="status"`). Actions that need the network show their normal error toast. Banner disappears with a `base` fade on reconnect and shows a brief "Back online." toast |
| **Session expired** | On a 401, show a modal "Your session has expired. Sign in to continue." with a `Sign in` button that returns the user to the same route afterward; preserve in-progress form drafts |
| **Rate limit** | Inline `ErrorState`: "You've reached the current analysis limit. Try again later." No retry button for a minute; show remaining wait time only if the server provides it |
| **Image unreadable** | Message from PRD §49 on the dropzone/preview; keep the text fields intact; allow submit without the image |
| **404 route** | Calm full-page state: "This page doesn't exist." + `Go home` |
| **Unexpected exception** | Error boundary renders `ErrorState` with `Try again` (reload the segment) and a link home; log the error server-side; never show stack traces |

All error and empty states reuse the shared `ErrorState` / `EmptyState` components.

---

## 19. Mobile-specific behaviors

- **Bottom nav** and **sticky CTA** coexist: the sticky CTA sits **above** the bottom nav (stack with correct safe-area math) or replaces the nav on the final decision screen; never overlap.
- **Report sections** collapse into accordions below 640px except the decision card, Questions (open by default), and Missing information (open by default). Accordion: header is a button with `aria-expanded`, chevron rotates 180° (`base`), content height animates (`slow`) or toggles instantly under reduced motion.
- **Tap targets** ≥ 44×44px; spacing between adjacent targets ≥ 8px.
- **Keyboard open:** the viewport shrinks; the focused input scrolls into view with 16px margin; bottom nav and sticky CTA hide while a text input is focused.
- **Pull-to-refresh** is not custom-implemented; rely on the native behavior.
- **Hover-only affordances** (tooltips, card lift) have tap equivalents or are unnecessary.
- **Share** uses the native share sheet (§10.4).
- **Orientation/resize:** layouts reflow without losing state (scroll position, form drafts, selected comparison option).

---

## 20. Accessibility announcements summary

| Event | Announcement |
|---|---|
| Analysis step changes | "Evaluating price" (polite) |
| Analysis complete | "Analysis complete. Opening your report." (polite) |
| Analysis error | Error message (assertive) |
| Copy success | "Copied" (polite) |
| Save toggled | "Report saved" / "Removed from saved" (polite) |
| Filter changed | "Showing 3 results for Wait" (polite) |
| Comparison ready | "Comparison ready. BuyLens recommends Product B." (polite) |
| Dialog opens | Title read by dialog semantics |
| Form error on submit | Focus the first invalid field; error summary `role="alert"` if multiple |

Focus management rules:
- After a route change, move focus to the page `h1` (set `tabIndex={-1}`).
- After actions that scroll (e.g. "See questions to ask"), move focus to the destination heading.
- After a destructive removal, move focus to the next logical item or the list heading.

---

## 21. Implementation notes for the agent

1. **Components, not one-offs.** Implement shared hooks/components: `useReducedMotion`, `useInView` (once), `useCountUp`, `useCopyToClipboard`, `Reveal` (scroll reveal wrapper), `Toast` provider (single instance), `Dialog`/`Drawer` primitives (use a headless library such as Radix UI for focus trapping rather than hand-rolling, with a stated reason when adding the dependency).
2. **Server vs client.** Keep pages server components; make only interactive pieces client components (ScoreRing, Reveal, CopyButton, forms, filters, compare picker, toasts).
3. **Counting score:** use `requestAnimationFrame` or a motion library; ease-out cubic; round to integers; ensure the final frame equals the exact score; set the accessible label to the **final** value from the first render.
4. **State.** Prefer URL state for filters and compare selection (`?with=<analysisId>`), React state for transient UI, server data for everything persisted. No global state library.
5. **Optimistic updates** are used only for low-risk toggles (save, preferences). Analysis creation and deletion are confirmed by the server.
6. **Idempotency and races.** Cancel/ignore stale responses when the user changes inputs quickly (filters, compare selection); use request ids or `AbortController`.
7. **Testing the journey.** Before marking work done, manually run: Landing → Sign up → Analyze (text + image) → Progress → Report → Concern → Ask seller → Copy → Compare (existing + new) → Final decision → Save → History → Reopen. Repeat in demo mode with the network disabled, and once with `prefers-reduced-motion` enabled, at 1440×900 and 390×844.
8. **Do not add** features outside this spec (no ticking off checklists, public report links, comments, chat UI, draggable sliders, more than two compared products).

---

## 22. Interaction checklist (before marking any flow done)

1. Every action gives feedback within 100ms and has pending, success, and error states.
2. Entrance animations run once, in the specified order, with the specified timings and tokens.
3. Reduced-motion mode renders all final states without large animations.
4. Keyboard-only run-through works, including `Escape` on overlays, focus return, and focus on destination headings.
5. Screen reader announcements exist for progress, copy, save, filter, and comparison results.
6. Skeletons match the final layout; no layout shift on swap.
7. Empty, error, offline, and session-expired states are implemented and reuse shared components.
8. Demo mode completes the full story with the network off.
9. Compare supports exactly two products and explains trade-offs before crowning a recommendation.
10. No confetti, bounce, parallax, or looping motion beyond the allowed pulse and shimmer.
11. The flow still answers: **"Should I buy this?"**

---

*End of BuyLens AI Interactions Spec v1.0*
