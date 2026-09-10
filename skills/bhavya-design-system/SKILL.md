---
name: bhavya-design-system
description: Bhavya frontend design-system quality workflow for tokens, responsive components, accessible interaction states, educational UX, motion, performance, dependency evaluation, and browser QA.
---

# Bhavya Design System

## Purpose

Keep Bhavya's public website and learning platform visually coherent, editorial, accessible, lightweight, and recognisably Bhavya while allowing learning interactions to remain concept-specific.

## Trigger

Load this skill for design-system work, reusable UI components, visual refinement, responsive behavior, icons, animation, accessibility review, performance review, or evaluation of a frontend dependency.

Do not load it for curriculum authoring without a UI change, governance interpretation, or backend work that does not affect the interface.

## Inputs

- Relevant route and scoped `CONTEXT.md`.
- `REFERENCE.md` and the authoritative Brand Constitution when brand decisions are involved.
- Existing component and CSS implementation.
- Target learner journey, device constraints, and browser/deployment constraints.
- Candidate dependency source and license when adoption is being considered.

## Design-system owners

- **Brand assets:** supplied Foundation logo and approved source material. Never replace the logo with a generic icon.
- **Tokens and typography:** `app/globals.css` and the existing Bhavya editorial system.
- **Layout:** semantic HTML plus the existing shell/grid conventions.
- **Icons:** `lucide-react` for small interface controls only; import individual icons. Use text alongside an icon when the action is not self-evident.
- **Motion:** CSS and browser-native transitions first. Use one animation system only when a real interaction requires coordinated animation.
- **Learning visuals:** native HTML/SVG first; introduce a visualization library only when the native implementation cannot express the educational model clearly.

Do not introduce Tailwind, a global shadcn system, a second icon library, or a second animation library to solve a local styling problem.

## Tokens and visual language

Use the existing forest, deep green, sage, gold, ivory, mist, line, serif, sans, and mono tokens. Add a token only when at least two components need the same value.

Preserve the editorial hierarchy:

- one clear primary subject per screen;
- serif display type for important conceptual headings;
- sans-serif body copy for reading and controls;
- mono text for metadata, steps, and small labels;
- restrained borders, fields, and color contrast;
- no generic SaaS gradients, decorative blobs, or dashboard repetition.

Use spacing to separate learning phases and information hierarchy. Do not compress explanatory content to make a screen look denser.

## Workflow

1. Inspect the existing route, component boundaries, CSS, assets, and current git diff.
2. Identify the user task and the one primary action or learning purpose of the screen.
3. Reuse existing tokens, layout rules, and components before adding a new abstraction.
4. Define desktop, narrow phone, touch, keyboard, loading, empty, error, and completed states before implementation.
5. Implement semantic HTML with the smallest useful component change.
6. Give every interactive state a visible response: default, hover where useful, focus, pressed/selected, disabled, success, error, and saved/resumed.
7. For learning UI, ensure the visual or motion change teaches a relationship, consequence, sequence, or state---not decoration.
8. Run automated checks, then inspect the real application at desktop and phone widths.
9. Review the diff for unnecessary dependencies, invented Foundation claims, copied assets, and unrelated changes.

## Accessibility checks

- Use native buttons, links, inputs, selects, ranges, and headings before custom widgets.
- Every control has an accessible name; icon-only controls need an explicit label.
- Keep heading order meaningful and landmarks discoverable.
- Preserve visible `:focus-visible` treatment with sufficient contrast.
- Keep interactive targets comfortable for touch and keyboard use.
- Use `aria-live` only for feedback that changes and matters to the learner.
- Do not communicate state by color alone.
- Ensure feedback remains understandable when styles, hover, or motion are unavailable.
- Test keyboard order, focus after state changes, and reduced motion.

## Responsive and low-bandwidth checks

- Start with the narrowest supported phone layout, then expand.
- Prevent horizontal overflow; long lesson copy, labels, tables, and control groups must wrap or scroll intentionally.
- Keep primary actions reachable without hover or precision pointing.
- Prefer CSS, HTML, and small inline SVG over large images or runtime effects.
- Avoid autoplay media, heavy canvases, scroll-jacking, and interaction-critical network requests.
- Keep static export and GitHub Pages compatibility intact.
- Do not imply that an AI Lab, account, or synchronized progress exists when it does not.

## Motion rules

Use motion only for hierarchy, continuity, feedback, progress, cause/effect, or restrained delight. Prefer opacity/transform and short transitions. Do not animate large areas continuously.

Every motion change must have a `prefers-reduced-motion: reduce` behavior. The reduced version must preserve meaning and task completion, not merely hide the animation. Never make a learning concept understandable only through motion.

## Dependency evaluation

Before adding a package, record the decision in the task work or relevant decision document:

1. What current user problem is unsolved?
2. Why native HTML/CSS or the existing code is insufficient?
3. Does an existing dependency already solve it?
4. What are the package's license, maintenance signal, browser support, bundle cost, accessibility behavior, and mobile implications?
5. Does it introduce a competing styling, primitive, icon, animation, chart, or AI system?
6. Can the capability be copied as an original local pattern without copying protected code or assets?

Reject packages that add a second owner for an existing responsibility, require an unnecessary service, obscure licensing, or add runtime cost without learner value. Preserve license notices and provenance for adopted code.

## Browser QA

For user-facing changes, run the application and test the primary journey, not only the route shell:

- enter from the public website;
- open the relevant learning or public route;
- use the primary interaction with keyboard and touch-sized controls;
- submit an incorrect or incomplete state and inspect feedback;
- test completion, navigation, refresh, and resume where relevant;
- resize to a realistic phone viewport;
- check focus visibility, reduced motion, overflow, and console errors.

If a real browser is unavailable, report browser QA as unverified rather than inferring it from typecheck or screenshots.

## Completion criteria

The design-system task is complete when:

- the change uses existing Bhavya tokens and ownership boundaries;
- the interface has semantic, keyboard-accessible, labelled controls;
- narrow layouts do not overflow and retain the primary task;
- motion is purposeful and has a reduced-motion path;
- performance and static-export constraints are preserved;
- license/provenance decisions are recorded for external material;
- relevant routing, context, typecheck, lint, tests, build, and browser checks have actual results;
- the diff contains no unrelated redesign or dependency playground.

## Common failure modes

- Installing a component library to solve one button or card.
- Mixing Lucide, another icon set, text glyphs, and custom SVG without a reason.
- Adding GSAP, Motion, or continuous scroll effects for visual novelty.
- Treating shadcn/Tremor examples as the Bhavya design system.
- Designing a dashboard when the learner needs a lesson, decision, or reflection.
- Making mobile technically responsive but difficult to read or operate.
- Hiding state in color, hover, animation, or an inaccessible custom control.
- Treating ---open source--- or ---on GitHub--- as a sufficient license decision.
- Presenting proposed curriculum or future Foundation systems as approved or implemented.

