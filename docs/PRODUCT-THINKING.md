# Product Thinking — Fomi Image Editing Workspace

## 1. What problem were you solving? What user did you design for?
Professional creatives (designers, digital artists, retouchers) spend several hours a day iterating on AI generations. The current problem with existing tools is the cognitive disconnect between the canvas and the control panels. Professionals are forced to move their mouse and eyes constantly between a sidebar form and the central image to make localized edits. I designed an **Image Editing Workspace** specifically for this returning power user, focusing on minimizing friction and maximizing direct canvas manipulation.

## 2. What are the three most important UX decisions you made, and why?
1. **"Brush-to-Prompt" Contextual Input:** Instead of a static sidebar, typing a prompt happens in a floating popover directly attached to the area the user just masked. This keeps their visual focus entirely on the image being edited.
2. **"Returning User" Default State:** The workspace loads immediately with a populated history sidebar (mocked via `/api/history`) and the most recent asset pre-loaded onto the canvas. There is no empty onboarding screen; the user lands ready to work.
3. **Floating Minimalist Toolbar:** By moving global tools (Select, Brush, Eraser, Compare) into a sleek, floating bottom toolbar, we maximize the canvas real estate, acknowledging that the image is the hero of the workspace.

## 3. Which features did you intentionally leave out, and why?
1. **Community/Social Feeds:** Professional tools need to focus on creation, not consumption. A social feed is a distraction for a user mid-project.
2. **Complex Node-Based UI:** While powerful, node graphs introduce a steep learning curve and high cognitive load. We opted for a linear, history-based direct manipulation approach instead to maintain a fluid editing experience.
3. **First-run Onboarding Tours:** Based on the assumption that this is a daily power user, tooltip tours and empty states were skipped in favor of an immediately productive default state.

## 4. Which existing products inspired your thinking? What did you like? What would you improve?
I drew inspiration from **Figma** (for its floating, unobtrusive toolbars that maximize canvas space) and **Krea** (for its real-time, low-latency feel). What I liked about Krea was the fluidity, but I wanted to improve the localized editing experience. Instead of splitting the screen into prompts and canvas, I merged them so the prompt lives *on* the canvas during active editing.

## 5. If you had another month, what would you improve?
1. **Layer Management:** I would introduce a robust layer system allowing users to blend multiple AI generations with different blend modes and opacity controls.
2. **Keyboard-First Workflow:** I would implement global keyboard shortcuts (e.g., `[ ]` for brush size, `Ctrl+Z` for undo) and a command palette (`Cmd+K`) to let power users execute actions without ever clicking a button.
3. **Local History/Versioning:** A proper branching history tree so users can explore multiple variations of an edit without losing their previous state.

## 6. What single feature/workflow differentiates your workspace from existing platforms?
The **Brush-to-Prompt Contextual Editing Workflow**. In standard platforms, you mask an area, then go back to the sidebar to type a prompt and hit generate. In this workspace, immediately after brushing an area, a contextual input pops up right at the cursor. The user types their change and hits Enter without their eyes or mouse ever leaving the canvas area. It creates a seamless, uninterrupted creative loop.
