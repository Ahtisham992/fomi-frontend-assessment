# Rules & Constraints — Fomi Frontend Assessment

Hard rules first, then guardrails mapped to what's actually being scored. If a decision during the build feels ambiguous, come back to this file before improvising.

---

## 1. Hard Requirements (non-negotiable)

1. **Framework**: Next.js, App Router. No Vite/CRA/Remix substitutions.
2. **Language**: JavaScript only. No TypeScript, even partially.
3. **Styling**: Tailwind CSS as primary. CSS Modules allowed only for cases Tailwind genuinely can't express cleanly (complex keyframe animations). Never inline `style={{}}` as a substitute for either.
4. **Backend**: Mocked only. No real database, no real AI model calls, no third-party API keys. Mock JSON + Next.js API routes only.
5. **Deployment**: Must be live on Vercel. A local-only project is an incomplete submission.
6. **Version control**: Git history must exist and look intentional — commit in phases, not as one giant "final" commit.
7. **Part B originality**: Must not replicate the layout, flow, or feature set of Higgsfield, Krea, Leonardo.ai, OpenArt, or Magnific. These are reference points, not templates.
8. **Part B scope**: Must choose exactly one workspace type (Image Generation / Video Generation / Image Editing) — not a hybrid of all three.
9. **No marketing/landing page for Part B** — the deliverable is the working professional's workspace, assuming they're already signed in and mid-project.

---

## 2. Do Not

- Do NOT copy an existing product's UI 1:1 and call it "inspired by."
- Do NOT add a feature just because it's technically impressive if it doesn't serve the stated user/problem — the rubric explicitly penalizes "adding unnecessary features."
- Do NOT ship empty minimalism (a beautiful but empty screen) as a substitute for real UX thinking — the rubric explicitly penalizes this too.
- Do NOT leave any interactive element without a visible focus state.
- Do NOT use color as the only signal for state (error/success) — pair with icon/text for colorblind accessibility.
- Do NOT let any layout break into horizontal scroll at any breakpoint.
- Do NOT fake the mock API as instant (no delay) — realistic latency is required to justify real loading-state engineering.
- Do NOT write the Product Thinking doc from imagination after the fact — it should describe what was actually built and decided, not aspirational features.
- Do NOT duplicate the same primitive (e.g. two different Button implementations) between Part A and Part B.

---

## 3. Always Do

- Always give every async action three states: loading, success, error (and empty, where relevant).
- Always use `next/image` for any image content, generated or static.
- Always use semantic HTML elements before reaching for generic `div`/`span` + ARIA.
- Always name components by role, not by appearance (`PrimaryButton`, not `BlueButton`).
- Always keep feature-specific components local to their route; only truly shared things live in `components/ui` or `components/shared`.
- Always test both routes at 4 breakpoints minimum: ~375px (mobile), ~768px (tablet), ~1280px (desktop), ~1920px (large display).
- Always run a Lighthouse pass (Performance + Accessibility) before final submission.
- Always write commit messages that describe intent ("Add generation loading state", not "update").

---

## 4. Rubric-Mapped Guardrails

Use this table to self-check before submission — for each row, ask "can I point to exactly where this shows up in my code/UI?"

| Rubric category | What to verify before submitting |
|---|---|
| Product Thinking (20) | Problem statement is specific to one user type; differentiating feature is clearly identifiable in the UI, not just described in the doc |
| Frontend Engineering (20) | No console errors/warnings; components are composed, not copy-pasted; responsive at all 4 breakpoints |
| Code Quality & Architecture (15) | No duplicated primitives; clear folder separation; meaningful names throughout; no dead/commented-out code |
| UX & Interaction (15) | Every async action has loading/error/empty states; keyboard navigation works for primary flows |
| Visual Polish (10) | Consistent spacing/radius/shadow system; hover and focus states everywhere; typography hierarchy is scannable |
| Originality (10) | Part B layout/flow is not traceable to any single named competitor |
| Product Thinking Doc (10) | All 6 required questions answered directly and specifically, consistent with the actual build |

---

## 5. Decision-Making Rule of Thumb

When unsure whether to add something, ask in this order:
1. Does the brief explicitly require it? → Do it.
2. Does it serve the stated user (professional, hours/day, mid-project)? → Consider it.
3. Is it just "cool" or "AI-generated-looking"? → Leave it out, and note it in "features intentionally left out."

When unsure about a design choice for Part A (ambiguous mockup detail), make the most professional, minimal-complexity choice and document it as a deliberate decision rather than leaving it inconsistent.
