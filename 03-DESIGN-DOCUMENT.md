# Design Document — Fomi Frontend Assessment

## 1. Design Philosophy (given, must be honored)

- Maximum capability. Minimum complexity.
- Every pixel should have a purpose.
- Design for professionals, not beginners.
- Beautiful software should feel effortless.
- The workspace is the hero — not the marketing page.

Every design decision below should be traceable back to one of these principles.

---

## 2. Design Tokens

> Fill in exact values once you've inspected the provided mockup — these are placeholder structures to keep the system consistent. Part B may extend/adjust the palette, but should stay in the same visual family as Part A unless there's a clear reason to diverge (document it in the product thinking doc if so).

### 2.1 Color
Define semantic tokens, not just raw hex values, so both parts reuse the same names:

```js
colors: {
  background: { DEFAULT: '#...', subtle: '#...', elevated: '#...' },
  surface: { DEFAULT: '#...', hover: '#...', active: '#...' },
  border: { DEFAULT: '#...', subtle: '#...', strong: '#...' },
  text: { primary: '#...', secondary: '#...', muted: '#...', inverse: '#...' },
  accent: { DEFAULT: '#...', hover: '#...', muted: '#...' },
  state: { success: '#...', error: '#...', warning: '#...', info: '#...' },
}
```

Rationale: naming by role (not color) means dark/light theme changes or rebrands only touch the token file, not every component.

### 2.2 Typography
- One primary typeface (loaded via `next/font` for performance), one monospace fallback only if needed for technical/numeric UI (e.g. parameter values).
- Type scale (example structure — tune to mockup):
  - Display / H1 / H2 / H3 / Body-lg / Body / Body-sm / Caption
- Line-height and letter-spacing tuned per size, not a single global value.
- Consistent vertical rhythm: pick a base spacing unit (e.g. 4px) and keep all margins/paddings multiples of it.

### 2.3 Spacing & Radius
- Base unit: 4px (Tailwind default spacing scale works well here — avoid inventing an incompatible custom scale).
- Radius scale: small (inputs/buttons), medium (cards), large (modals/panels) — 2–3 values max, used consistently.
- Shadow scale: subtle elevation only where it communicates hierarchy (raised card, modal, dropdown) — avoid decorative shadows.

### 2.4 Motion
- Define once, reuse everywhere (do not hand-tune per-component):
  - Duration: fast (~120–150ms) for hover/press feedback, medium (~200–300ms) for panel/modal transitions, slow (~400ms+) only for page-level transitions.
  - Easing: a single standard ease (e.g. `cubic-bezier(0.4, 0, 0.2, 1)`) for most UI motion; a spring only for a small number of "delight" moments (e.g. result reveal after generation).
- Motion should communicate state change (loading → complete, closed → open), not decorate.

---

## 3. Part A — Design Notes

- Match the mockup's layout structure first; treat spacing/type/color fidelity as high priority since this is explicitly what's being evaluated.
- Where the mockup is ambiguous (e.g. exact hover behavior, exact mobile stacking order), make a decision and note it as a deliberate choice — don't leave it undefined.
- Responsive strategy: design for genuine reflow at each breakpoint, not naive scaling.
  - Mobile: single column, primary action (prompt/generate) always reachable without excess scrolling.
  - Tablet: consider a 2-column split (controls + canvas) once there's room.
  - Desktop/Large: full layout as per mockup, with a max-content-width so large displays don't just stretch everything — center and add breathing room instead.

---

## 4. Part B — Design Notes

### 4.1 Information Architecture (to be finalized in Phase 4 of the implementation plan)
A professional workspace generally needs three functional zones — decide how they relate spatially for your chosen workspace type:
- **Canvas / output area** — where the current image/video/edit lives; should be the visual focus (largest, most central).
- **Controls / parameters** — prompt, model settings, sliders, style options; should be reachable without obscuring the canvas.
- **History / project context** — prior generations, versions, or project assets; supports the "returning user, hours-a-day" assumption.

### 4.2 UX Principles to Apply
- **Progressive disclosure**: show common controls by default, advanced parameters behind an expandable section — supports "maximum capability, minimum complexity."
- **Non-destructive by default**: for an editing workspace especially, prefer versioning/undo over destructive overwrites — professionals need to experiment without fear.
- **Keyboard-first where it matters**: power users doing this for hours a day benefit from shortcuts (e.g. regenerate, undo, toggle panel) — even a small, well-chosen set beats none.
- **State should never be silently lost**: in-progress work, current parameters, and scroll/selection state should persist through navigation within the workspace.

### 4.3 What Not to Design
Explicitly avoid, per the brief:
- A marketing/landing page — the workspace is the hero.
- A first-time-user onboarding flow — assume an experienced returning user.
- A literal clone of Higgsfield/Krea/Leonardo/OpenArt/Magnific's layout or flow.

---

## 5. Component Inventory (shared)

| Component | Used in | Key states to design |
|---|---|---|
| Button | A & B | default, hover, active, disabled, loading |
| Input/Textarea | A & B | default, focus, error, disabled |
| Slider | A & B | default, dragging, disabled |
| Select/Dropdown | A & B | closed, open, selected, disabled |
| Modal | A & B | entering, open, exiting |
| Toast | A & B | success, error, info |
| Skeleton | A & B | loading placeholder matching final content shape |
| Card | A & B | default, hover, selected |
| Tooltip | A & B | shown on hover/focus, positioned to avoid clipping |

Design each state before implementing — don't discover states while coding.

---

## 6. Accessibility Requirements (baseline, non-negotiable)

- Semantic HTML first (`button`, `nav`, `main`, `label`, headings in order) — don't reach for `div` + `onClick` when a native element exists.
- Every icon-only control has an `aria-label`.
- Every image (including generated content) has meaningful `alt` text.
- Visible focus states on every interactive element — never `outline: none` without a replacement.
- Color contrast: body text ≥ 4.5:1, large text/UI components ≥ 3:1 (WCAG AA).
- All primary flows (prompt → generate → view result) must be operable via keyboard alone.

---

## 7. Visual QA Checklist (run before submission)

- [ ] Consistent spacing rhythm across every section (no "close enough" gaps)
- [ ] Consistent corner radius usage (no mixed radius values on similar components)
- [ ] Consistent shadow/elevation logic
- [ ] All interactive elements have a hover AND a focus state, and they look intentional
- [ ] Loading state visually previews the shape of the real content (skeleton, not just a spinner, where appropriate)
- [ ] Empty states have a clear next action, not just blank space
- [ ] Error states explain what happened and offer a retry, not a dead end
- [ ] Type hierarchy is scannable at a glance (you can tell what's primary/secondary/tertiary text without reading it)
