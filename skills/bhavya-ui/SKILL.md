---
name: bhavya-ui
description: Bhavya UI workflow for public website and learning interfaces; use for visual, responsive, motion, imagery, accessibility, and browser review tasks.
---

# Bhavya UI

## Purpose
Design or review accessible, premium Bhavya interfaces using the authoritative logo and Brand Constitution.

## Trigger
Use for route/page redesigns, component work, responsive behavior, motion, imagery, or visual QA.

## Inputs
Relevant route context, Brand Constitution, current assets, user journey, and bandwidth/accessibility constraints.

## Workflow
1. Inspect existing route, assets, and local context.
2. Define the content hierarchy and responsive states before styling.
3. Use forest, earth, sage, gold, and ivory tokens with editorial typography; prefer real or clearly labelled imagery.
4. Implement semantic HTML, keyboard-visible focus, touch-sized controls, reduced-motion behavior, and non-hover alternatives.
5. Review mobile, desktop, and low-bandwidth fallbacks.

## Outputs
Small reusable React/CSS primitives, route changes, and an inspectable design rationale in the relevant context file when architecture changes.

## Validation
Run typecheck, lint, tests, context coverage, and browser review when available. Check alt text, heading order, focus, contrast, and `prefers-reduced-motion`.

## Failure conditions
Stop and flag invented Foundation facts, unlicensed assets, inaccessible controls, heavy dependencies, or a design that requires unsupported backend data.
