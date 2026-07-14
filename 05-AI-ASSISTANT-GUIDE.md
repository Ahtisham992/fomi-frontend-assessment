# AI Assistant Guide (CLAUDE.md)

> Purpose: this file is meant to be read by an AI coding assistant (Claude Code, Cursor, etc.) at the start of every session working on this project. Keep it in the repo root as `CLAUDE.md` (or equivalent). It tells the assistant what this project is, how to behave, and what "good" looks like — so it doesn't need to be re-explained every session.

---

## 1. Project Context

This repo is a job-application assessment for a Frontend Developer role at Tarum (building Fomi, an AI image/video generation platform). It has two independent parts:

- **Part A** (`app/(part-a)/generate`): faithful, responsive implementation of a given design mockup.
- **Part B** (`app/(part-b)/workspace`): an original, self-designed AI creative workspace (image/video/editing — pick one), NOT a clone of Higgsfield/Krea/Leonardo.ai/OpenArt/Magnific.

Full detail lives in these companion documents (read them before making architectural decisions):
- `02-PROJECT-SPECIFICATION.md` — what we're building and why
- `03-DESIGN-DOCUMENT.md` — design tokens, UX principles, component inventory
- `04-RULES.md` — hard constraints and do's/don'ts
- `01-IMPLEMENTATION-PLAN.md` — the phase-by-phase build order

**When asked to build something in this project, check these docs first rather than assuming defaults.**

---

## 2. Non-Negotiable Technical Constraints

- Next.js App Router, **JavaScript only** (never suggest or scaffold TypeScript).
- Tailwind CSS as the default styling approach. CSS Modules only for complex keyframe animation that's awkward in Tailwind.
- No real backend, no real AI API calls, no external API keys — mock data and Next.js API routes only, with artificial latency to simulate real generation.
- Everything must remain fully responsive with no horizontal scroll at mobile/tablet/desktop/large-display widths.
- Deployment target is Vercel.

If a suggestion would violate any of these, don't make it — flag the tension instead and propose the compliant alternative.

---

## 3. How to Behave When Assisting on This Project

- **Prefer composing existing shared primitives** (`components/ui/`) over creating new one-off styled elements. Before writing a new Button/Input/Modal, check if one already exists.
- **Always implement all relevant states** for anything async: loading, success, error, and empty where applicable. Don't stop at the happy path.
- **Don't invent features not in the spec.** If something seems missing, ask or flag it rather than silently adding scope — the rubric penalizes unnecessary features.
- **Match existing naming and folder conventions** rather than introducing a new pattern per file.
- **Keep feature-specific logic inside route-local `components/` folders**; only truly cross-cutting things belong in `components/ui` or `components/shared`.
- **Accessibility is not optional** — semantic HTML, labels, alt text, and visible focus states should be present the first time code is written, not added in a later pass.
- **When implementing Part B, actively avoid mirroring named competitor products.** If a suggested layout/flow closely resembles Krea/Higgsfield/Leonardo/OpenArt/Magnific, propose a different structural approach instead.
- **Use realistic mock latency** for any generation/API simulation — don't make mock endpoints resolve instantly.

---

## 4. Working Style / Session Flow

When picking up work in this repo, follow this order unless told otherwise:

1. Check `01-IMPLEMENTATION-PLAN.md` for the current phase and its checklist.
2. Implement only what's in scope for that phase — resist pulling in later-phase work early.
3. After completing a checklist item, note it as done and move to the next undone item.
4. If a design decision isn't specified in `03-DESIGN-DOCUMENT.md`, make the most minimal, professional choice and note the assumption inline (comment or PR description) rather than leaving it ambiguous.
5. Prefer small, reviewable commits over large batched changes — commit after each meaningful checklist item, not once per session.

---

## 5. Code Quality Bar

- Reusable, composable components — no copy-pasted near-duplicates.
- Meaningful, role-based naming (`GenerationCard`, not `Box1`).
- No dead code, no commented-out blocks left in, no leftover console.logs in final commits.
- Prefer clarity over cleverness — this is a code-quality-scored assessment, not a golf exercise.
- Use `next/image` for all image rendering; lazy-load below-the-fold content where sensible.

---

## 6. Self-Check Before Marking Anything "Done"

Before considering a component/feature complete, verify:
- [ ] Works at mobile, tablet, desktop, and large-display widths — no horizontal scroll
- [ ] Has loading/error/empty states if it touches the mock API
- [ ] Keyboard accessible (tab order, visible focus, operable without a mouse)
- [ ] Uses existing shared primitives rather than duplicating styles
- [ ] Matches the token system in `03-DESIGN-DOCUMENT.md` (spacing, color, radius, motion timing)
- [ ] No console errors or warnings introduced

---

## 7. Product Thinking Document Support

When helping draft or refine `docs/PRODUCT-THINKING.md`, the assistant should:
- Ground every answer in what was actually implemented — never describe aspirational or unbuilt features as if they exist.
- Push for specificity over generic statements (e.g. "reduces the number of clicks between prompt and result from 5 to 2" rather than "improves UX").
- Help identify genuine trade-offs made (what was simplified/cut and why), since the rubric explicitly rewards knowing what NOT to build.

---

## 8. Reminders for High-Stakes Sections (highest rubric weight)

- **Product Thinking (20 pts)**: the single differentiating feature must be visibly demonstrable in the UI, not just described in prose.
- **Frontend Engineering (20 pts)**: clean, responsive, no console errors — this is checked directly, not inferred.
- **Attention to Detail**: hover/focus/loading/empty states and consistent spacing are explicitly called out as heavily weighted — do not treat these as "polish for later," build them in from the start.
