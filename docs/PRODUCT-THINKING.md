# Product Thinking — Fomi Image Editing Workspace

## 1. What problem were you trying to solve? What user did you design for?

I designed this workspace for a professional creator or editor who spends hours a day inside the tool, actively iterating on a project. I assumed they are already signed in and actively working, rather than a first-time visitor needing a tour.

The core problem in most AI editing workflows is the physical and cognitive separation between "identifying the region to edit" and "describing the edit." Users typically select a region on the canvas, then move their cursor and eyes away to a side panel or separate modal to type their prompt. For someone making dozens of micro-edits daily, this continuous context-switching adds significant friction. The goal was to eliminate this indirection and keep the user's focus entirely locked on the canvas.

## 2. What are the three most important UX decisions you made? Why?

1. **Freehand Mask-to-Prompt:** Rather than relying on a fixed side panel, the prompt input spawns dynamically directly below the region the user just masked. This turns selecting and describing into a single, continuous interaction, removing the need for the user's eyes to leave the target area.
2. **Canvas-First Layout with Floating Controls:** I moved global tool selection to a minimalist floating bottom bar and kept advanced parameters (like brush strength and model selection) in a secondary panel. This progressive disclosure ensures the image remains the functional center of the screen, providing maximum capability without clutter.
3. **Persistent, Unobtrusive History:** I built a dedicated history panel on the left side that is always reachable without eating up the central canvas space. A professional editing for hours needs to constantly reference and revert to prior iterations, so history is treated as a core part of the workspace rather than a buried feature.

## 3. Which features did you intentionally leave out? Why?

- **First-run onboarding tours:** Since the target user is an experienced professional returning to their mid-project workflow, tooltip tours and empty states add friction rather than value.
- **Social feeds and template galleries:** The workspace contains no marketing-style inspiration galleries. Screen space in an active editing environment is reserved strictly for the user's own work, not for browsing examples.
- **Node-based editing graphs:** While powerful for procedural generation, node graphs introduce a steep learning curve and high visual complexity. I opted for a linear, history-based direct manipulation approach to maintain a fluid, immediate editing feel.

## 4. Which existing products inspired your thinking? What did you like? What would you improve?

I reviewed Fomi's current live Image Studio workspace. It effectively groups prompt, model, resolution, and cost into a predictable left-side rail, and the clear generation-cost indicator sets excellent expectations before committing to an action.

However, I built this assessment to specifically improve upon a few areas:
1. **Redundant empty states:** The current Fomi workspace signals an empty history in a top bar while also displaying a decorative example gallery below it. This creates a scattered hierarchy rather than solving the emptiness.
2. **Decorative vs. Functional space:** The gallery in the main canvas area displays generic examples. For a professional mid-project, the highest-value central real estate should be reserved for their own active canvas, not marketing-style inspiration.
3. **Control vs. Canvas imbalance:** Most of the functional weight is compressed into a narrow side rail, while the majority of the screen is dedicated to a one-time browsing experience rather than the ongoing working surface.

I drew broader inspiration from Figma's canvas-first philosophy and Cursor's inline, contextual interaction models, which directly informed why the Mask-to-Prompt popover exists as an alternative to a fixed side-panel prompt.

## 5. If you had another month, what would you improve?

- **Multi-region batch editing:** Allowing users to paint multiple unconnected masks and queue them into a single generative pass.
- **Non-destructive version branching:** Implementing a true branching history tree so users can explore multiple variations of an edit without overwriting their previous lineage.
- **Keyboard-first accessibility:** Adding a full keyboard-only equivalent for the Mask-to-Prompt workflow (e.g., using directional arrows to place a bounding box) for users who cannot use precise freehand drag interactions.
- **Performance optimizations:** Implementing a virtualized history list and aggressive image caching strategy for handling massive project libraries smoothly.

## 6. What single feature/workflow differentiates your workspace from existing AI creative platforms?

The core differentiator is the **Freehand Mask-to-Prompt Contextual Workflow**. 

Region-based inpainting isn't new—tools like Photoshop generative fill or Krea have had it for a while. The difference here is the interaction continuity. Instead of the standard "inpainting mask + side-panel prompt" pattern, this workspace collapses "paint a mask" and "describe the edit" into a single, anchored flow. The prompt box appears directly below your brush stroke immediately after lifting the pointer, allowing you to execute an edit without your mouse or eyes ever leaving the canvas.

---
*Note: The visual language (colors, typography, spacing) was adapted to match Fomi's actual brand identity, while the workspace architecture and interaction paradigms were deliberately built as an alternative to Fomi's existing product.*
