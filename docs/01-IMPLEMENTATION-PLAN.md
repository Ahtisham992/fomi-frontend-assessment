# Implementation Plan — Fomi Frontend Assessment

> Use this as your working checklist. Work top to bottom. Each phase has a clear "done" definition so you always know whether to move on or keep polishing.

---

## Phase 0 — Setup & Foundations
**Goal:** A working, deployed skeleton before any real UI work begins.

- [ ] Init Next.js (App Router, JavaScript, no TypeScript)
- [ ] Install Tailwind CSS, configure `tailwind.config.js` with custom tokens (see DESIGN-DOCUMENT.md)
- [ ] Set up folder structure (see PROJECT-SPECIFICATION.md §Architecture)
- [ ] Install: `framer-motion`, `clsx`, `lucide-react` (icons)
- [ ] Push to GitHub, connect repo to Vercel
- [ ] Deploy an empty placeholder page — confirm CI/CD pipeline works end to end
- [ ] Add root `layout.js` with font loading (`next/font`), global styles, metadata

**Done when:** Empty Next.js app is live on a Vercel URL, pushed to GitHub with clean initial commit.

---

## Phase 1 — Design Tokens & Shared Primitives
**Goal:** A small design system both Part A and Part B will draw from, so nothing gets rebuilt twice.

- [ ] Define color tokens (background, surface, border, text, accent, states) in Tailwind config
- [ ] Define type scale (font sizes, weights, line-heights) as Tailwind theme extensions
- [ ] Define spacing/radius/shadow scale
- [ ] Build shared primitives in `components/ui/`:
  - [ ] `Button` (variants: primary, secondary, ghost, icon; states: default, hover, active, disabled, loading)
  - [ ] `Input` / `Textarea` (with label, helper text, error state)
  - [ ] `Slider` (for parameters like strength, steps)
  - [ ] `Select` / `Dropdown`
  - [ ] `Modal` / `Dialog`
  - [ ] `Toast` (success/error notifications)
  - [ ] `Skeleton` (loading placeholder)
  - [ ] `Card`
  - [ ] `Tooltip`
- [ ] Verify every primitive has visible keyboard focus states

**Done when:** You have a mini component library you can compose Part A and Part B from without writing new base styles.

---

## Phase 2 — Mock Backend
**Goal:** A believable async API that forces you to build real loading/error/empty states.

- [ ] `app/api/generate/route.js` — `POST` accepting `{ prompt, model, aspectRatio, style }`
  - [ ] Simulate 1.5–4s latency with random jitter (`setTimeout`)
  - [ ] Return mock asset: `{ id, url, thumbnailUrl, prompt, model, aspectRatio, createdAt, status: "completed" }`
  - [ ] Occasionally (e.g. 1 in 15 calls) return a simulated failure to test error UI
- [ ] `app/api/history/route.js` — `GET` returns a static list of prior "generations" (10–20 seeded mock items)
- [ ] Seed `/public/mock-assets/` with placeholder images (can use free stock/AI-placeholder images)
- [ ] `lib/mock-data/` — JSON files backing both routes

**Done when:** Calling `/api/generate` from the browser console returns a realistic delayed response; `/api/history` returns seeded data.

---

## Phase 3 — Part A: Mockup Implementation
**Goal:** Pixel-faithful, fully responsive implementation of the provided design.

- [ ] Break the mockup into a component tree (list every distinct section/component before coding)
- [ ] Build desktop layout first, matching spacing/typography/colors precisely
- [ ] Wire up the mock API: prompt input → loading state → generated result rendered
- [ ] Add responsive behavior:
  - [ ] Mobile (< 640px)
  - [ ] Tablet (640–1024px)
  - [ ] Desktop (1024–1440px)
  - [ ] Large display (> 1440px)
- [ ] Add interaction polish: hover states, button feedback, transitions, focus rings
- [ ] Add loading state (skeleton or spinner) during mock generation
- [ ] Add empty state (before first generation)
- [ ] Add error state (failed generation) with retry
- [ ] Accessibility pass: semantic tags, alt text, aria-labels on icon-only buttons, tab order

**Done when:** The page matches the mockup closely at all breakpoints, no horizontal scroll anywhere, all interactive elements are keyboard-operable, and a real generation round-trip (loading → result) works.

---

## Phase 4 — Part B: Concept Definition
**Goal:** Lock the idea before writing code, so implementation time isn't spent re-deciding the concept.

- [ ] Choose one: Image Generation / Video Generation / Image Editing workspace
- [ ] Write a one-paragraph problem statement (who is this for, what's broken about existing tools)
- [ ] List the 3–5 core user flows the workspace must support
- [ ] Sketch (even in text/ASCII or a quick Figma/paper sketch) the layout regions: canvas, controls, history, navigation
- [ ] Identify the ONE differentiating feature/workflow (rubric explicitly asks for this)
- [ ] Explicitly list 3+ features you are deliberately NOT building, and why
- [ ] Start `docs/PRODUCT-THINKING.md` now — capture reasoning as you decide, not after

**Done when:** You can describe the workspace in 60 seconds without hesitating, and you know exactly what you're deliberately leaving out.

---

## Phase 5 — Part B: Implementation
**Goal:** Build the original workspace with the same engineering bar as Part A, plus stronger product thinking.

- [ ] Build static layout shell (navigation, canvas area, side panel, history/gallery) responsive from the start
- [ ] Wire the differentiating feature first — it's the highest-leverage thing to get right
- [ ] Wire up remaining core flows to the mock API/history endpoint
- [ ] Add the "returning user" feel: pre-populated history/project state on load (per the design assumptions)
- [ ] Micro-interactions and transitions (this is bonus-weighted — invest real time here)
- [ ] Full responsive pass across breakpoints
- [ ] Loading, empty, and error states for every async action
- [ ] Accessibility pass

**Done when:** The workspace feels like a real, opinionated product — not a mockup clone — and works cleanly on mobile through large displays.

---

## Phase 6 — Product Thinking Document
**Goal:** A concise, well-reasoned answer to every required question.

- [ ] Finalize `docs/PRODUCT-THINKING.md` answering all 6 required questions (see PROJECT-SPECIFICATION.md §Deliverables)
- [ ] Keep each answer tight — reasoning quality over length
- [ ] Cross-check answers against what you actually built (don't describe features that don't exist in the code)

**Done when:** Every required question is answered, and answers are consistent with the actual implementation.

---

## Phase 7 — Cross-Cutting Polish Pass
**Goal:** Catch the "attention to detail" items that are easy to skip under deadline pressure.

- [ ] Consistent spacing rhythm across both Part A and Part B
- [ ] Consistent animation timing/easing (define once, reuse — don't hand-tune each transition)
- [ ] All images use `next/image` with proper `alt` text
- [ ] Lazy-load below-the-fold content where relevant
- [ ] Check color contrast (WCAG AA minimum) on text over backgrounds/gradients
- [ ] Remove console errors/warnings
- [ ] Remove dead code, unused components, commented-out blocks
- [ ] Run Lighthouse (Performance, Accessibility, Best Practices) on both pages — fix anything glaring

**Done when:** Lighthouse scores are respectable (aim 90+ where feasible), no console errors, no visual inconsistency between sections.

---

## Phase 8 — Deployment & Submission
**Goal:** Ship it cleanly.

- [ ] Final deploy to Vercel, verify both `/generate` (Part A) and `/workspace` (Part B) routes work in production
- [ ] Test production build on an actual mobile device, not just devtools responsive mode
- [ ] Write `README.md`: setup instructions, architecture overview, tech decisions, link to live deploy, link to product thinking doc
- [ ] Final GitHub push, verify commit history looks intentional (not one giant commit)
- [ ] Proofread `PRODUCT-THINKING.md` one more time
- [ ] Submit

**Done when:** A stranger could clone the repo, read the README, run it locally, and understand the project in under 5 minutes — and the live Vercel link works.

---

## Suggested Time Allocation

| Phase | % of total time |
|---|---|
| 0 – Setup | 5% |
| 1 – Tokens/Primitives | 10% |
| 2 – Mock Backend | 8% |
| 3 – Part A | 27% |
| 4 – Part B Concept | 5% |
| 5 – Part B Implementation | 27% |
| 6 – Product Doc | 8% |
| 7 – Polish Pass | 7% |
| 8 – Deployment | 3% |
