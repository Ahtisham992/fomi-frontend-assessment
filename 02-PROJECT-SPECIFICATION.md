# Project Specification — Fomi Frontend Developer Assessment

## 1. Context

Tarum is a startup building **Fomi**, an AI-powered creative platform (Fomi.art) for image and video generation, editing, transformation, enhancement, and upscaling. The product targets creators, designers, marketers, filmmakers, agencies, and social media users. It's currently in beta.

This assessment is being completed as a **job application task** for a Frontend Developer role. It is evaluated on frontend engineering quality, product thinking, code quality, UX, visual polish, and originality — not just "does it look like the mockup."

---

## 2. What We Are Building

Two independent deliverables in a single repository:

### Part A — Product Implementation
A pixel-accurate, fully responsive implementation of a **given design mockup** of an AI content generation web page. This tests faithful translation of a spec into production-quality frontend code.

### Part B — Product Thinking Challenge
An **original**, self-designed AI creative workspace (choosing one of: Image Generation Workspace, Video Generation Workspace, or Image Editing Workspace) for a professional user who spends hours a day in the tool. This must NOT copy existing products (Higgsfield, Krea, Leonardo.ai, OpenArt, Magnific, ImagineArt) — those are inspiration only. This tests original product thinking, UX judgment, and the ability to design (not just build).

Both parts share the same tech stack, a common design system, and a shared mock backend pattern.

---

## 3. Tech Stack (Required)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS (primary), CSS Modules (only where Tailwind is awkward, e.g. complex keyframes) |
| Animation | Framer Motion |
| Version control | GitHub |
| Deployment | Vercel |
| Backend | Mocked only — API routes with static/mock JSON data, no real database or AI model calls |

---

## 4. Architecture

```
fomi-assessment/
├── app/
│   ├── (part-a)/generate/          # Part A route
│   ├── (part-b)/workspace/         # Part B route
│   ├── api/
│   │   ├── generate/route.js       # POST — mock generation endpoint
│   │   └── history/route.js        # GET — mock prior-generations endpoint
│   └── layout.js
├── components/
│   ├── ui/                         # shared primitives (Button, Input, Modal, etc.)
│   └── shared/                     # cross-app shared components (Navbar, etc.)
├── lib/
│   ├── mock-data/                  # JSON seed data
│   └── utils.js
├── public/mock-assets/             # placeholder generated images
├── docs/
│   └── PRODUCT-THINKING.md
└── README.md
```

**Principles:**
- Shared primitives live in one place; Part A and Part B compose them, never duplicate them.
- Each route (`/generate`, `/workspace`) owns its own feature-specific components in a local `components/` subfolder.
- No feature logic inside `page.js` files beyond composition — logic lives in components/hooks.

---

## 5. Mock Backend Behavior

The backend exists to demonstrate realistic frontend architecture, not backend engineering.

**`POST /api/generate`**
- Input: `{ prompt: string, model: string, aspectRatio: string, style?: string }`
- Simulates real latency: random delay between 1.5s–4s
- ~1-in-15 requests should simulate failure (to force building real error UI)
- Output (success): `{ id, url, thumbnailUrl, prompt, model, aspectRatio, createdAt, status: "completed" }`
- Output (failure): appropriate error status + message

**`GET /api/history`**
- Returns 10–20 seeded mock generation records
- Used to populate the workspace as if the user is returning to existing work (per Part B design assumptions)

---

## 6. Part A — Detailed Requirements

- Implement the provided mockup as closely as possible: layout, spacing, typography, hierarchy, color, responsiveness, animation, interaction.
- Minor creative deviations are allowed and encouraged where they demonstrate craftsmanship — but the core layout and intent of the mockup must be preserved.
- Must work without horizontal scrolling, overlapping layouts, or broken interactions at all breakpoints (mobile, tablet, desktop, large display).
- Must connect to the mock `/api/generate` endpoint for its core generation action, with real loading/empty/error states.
- Must be deployed live on Vercel.

---

## 7. Part B — Detailed Requirements

### 7.1 Design Assumptions (given)
The user for this workspace:
- Is already signed in.
- Is returning to continue an existing project (not a first-time visitor).
- Creates visual content professionally.
- Spends several hours a day in the app.

This means: **no marketing page, no onboarding flow, no empty first-run state as the default view.** Design the actual workspace a power user lives in.

### 7.2 Constraints
- Must choose exactly ONE: Image Generation, Video Generation, or Image Editing workspace.
- Must NOT replicate the layout/flows of Higgsfield, Krea, Leonardo.ai, OpenArt, or Magnific. Inspiration yes, cloning no.
- Should balance the simplicity of consumer apps (Instagram, Pinterest) with the depth of professional creative tools (Figma, Cursor, Krea, Magnific).

### 7.3 Required elements
- A clear information architecture: how canvas/output, controls/parameters, and history/navigation relate to each other on screen.
- At least one clearly identifiable **differentiating feature or workflow** — something not just "another prompt box + generate button."
- Full responsiveness.
- Loading, empty, and error states for all async actions.
- Populated "returning user" state on load (seeded from `/api/history`).

---

## 8. Required Deliverables

1. **Frontend implementation** — both Part A and Part B, deployed and working.
2. **Product Thinking Document** (`docs/PRODUCT-THINKING.md`) answering:
   1. What problem were you solving? What user did you design for?
   2. What are the three most important UX decisions you made, and why?
   3. Which features did you intentionally leave out, and why?
   4. Which existing products inspired your thinking? What did you like? What would you improve?
   5. If you had another month, what would you improve?
   6. What single feature/workflow differentiates your workspace from existing platforms?
3. **README.md** — setup instructions, architecture overview, key decisions, live deploy link.
4. **GitHub repository** with meaningful commit history.
5. **Live Vercel deployment** of both routes.

---

## 9. Evaluation Criteria (as given)

| Category | Points |
|---|---|
| Product Thinking | 20 |
| Frontend Engineering | 20 |
| Code Quality & Architecture | 15 |
| UX & Interaction | 15 |
| Visual Polish & Attention to Detail | 10 |
| Originality | 10 |
| Product Thinking Document | 10 |
| **Base total** | **100** |

**Bonus (+40 max):**
- Interactive (+10): beautiful micro-interactions, meaningful transitions.
- Exceptional Product Thinking (+15): a creative workspace that demonstrates strong UX thinking.
- Original Creative Direction (+15): a genuinely unique vision of AI creative software.

---

## 10. Explicit Non-Goals

- Not building a real AI model integration — mock only.
- Not building a real backend/database — mock API routes and static JSON only.
- Not designing a marketing/landing page for Part B — workspace only.
- Not cloning any named competitor product.
- Not adding features "because they look impressive" if they don't serve the stated user/problem (rubric explicitly penalizes this).

---

## 11. Definition of "Done" for the Whole Assessment

- Both routes deployed and functioning on Vercel with no console errors.
- No horizontal scroll, no broken layout at any breakpoint, on both routes.
- Every async action (Part A and B) has a real loading, error, and empty state.
- Product Thinking doc fully answers all 6 questions, consistent with what was actually built.
- README allows a stranger to run the project locally in under 5 minutes.
- Codebase shows clear separation of shared UI vs. feature-specific components, no duplicated primitives.
