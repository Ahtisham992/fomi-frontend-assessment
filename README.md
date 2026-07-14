# Fomi Frontend Assessment

A pixel-accurate, premium, and fully responsive AI generation platform built as part of the Fomi Frontend Developer assessment. This repository contains both Part A (Mockup Implementation) and Part B (Original Creative Workspace).

## 🚀 Live Deployment
- **Part A (Generate Page):** [Insert Live URL]
- **Part B (Workspace):** [Insert Live URL /workspace]
*(Note: As the author of this codebase, please connect this repository to Vercel to generate the live deployment links above.)*

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS (using CSS variables in `@theme` for design tokens)
- **Animation:** Framer Motion
- **Icons:** Lucide React

## 📦 Running Locally

Running the project locally takes less than 2 minutes.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ahtisham992/fomi-frontend-assessment.git
   cd fomi-frontend-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   - Open [http://localhost:3000](http://localhost:3000) to view the Part A Generate page.
   - Open [http://localhost:3000/workspace](http://localhost:3000/workspace) to view the Part B Workspace.

## 🏗 Architecture Overview

The codebase is structured to maximize reusability while keeping feature logic isolated:

```text
app/
├── (part-a)/generate/     # Part A route and its specific components
├── (part-b)/workspace/    # Part B route and its specific components
├── api/
│   ├── generate/route.js  # Mock POST endpoint for AI generation
│   └── history/route.js   # Mock GET endpoint returning past work
components/
└── ui/                    # Shared design system primitives (Button, Input, Select, etc.)
lib/
└── mock-data/             # JSON data powering the mock API
public/mock-assets/        # Premium AI-generated placeholder images
```

## 🧠 Key Decisions
1. **Separation of Concerns:** Shared UI primitives (`components/ui/`) strictly contain no business logic. All feature-specific logic (like the "Freehand Mask-to-Prompt" workflow) is contained exclusively within the `app/(part-b)` and `app/(part-a)` directories.
2. **Design Tokens:** Instead of hardcoding hex values throughout the app, I mapped a comprehensive set of semantic design tokens (e.g., `--color-surface-default`, `--color-text-primary`) in `globals.css` using Tailwind v4's new `@theme` configuration. This ensures effortless theming and perfect consistency.
3. **Simulated Realism:** The mock `/api/generate` endpoint purposefully introduces a randomized 1.5–4 second latency and a 7% failure rate. This guarantees that the UI's loading, empty, and error states are rigorously tested in realistic conditions.
4. **Product Thinking (Part B):** I designed an original "Image Editing Workspace" centered around a "Freehand Mask-to-Prompt" workflow, deliberately excluding social feeds or onboarding flows to prioritize the needs of returning power users. (See `docs/PRODUCT-THINKING.md` for full details).

## 📄 Documentation
- [Implementation Plan & Rules](docs/)
- [Product Thinking Document](docs/PRODUCT-THINKING.md)
