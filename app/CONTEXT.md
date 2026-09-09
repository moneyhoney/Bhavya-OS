# Public Website Context

## Purpose

`app/` is the public Bhavya Foundation website: the institutional front door and navigation layer for future learning, labs, knowledge, and community work.

## Audience and quality bar

Communicate clearly to general visitors and prospective learners, including people using phones and constrained connections. The experience should be calm, evidence-based, accessible, premium, and truthful.

## Current state

- **Implemented:** static Next.js App Router routes for `/`, `/about`, `/missions`, `/learning`, `/labs`, and `/knowledge`; shared responsive styles; authoritative logo usage; GitHub Pages static export.
- **Partial:** `/learning` now contains interactive proposed modules, but accounts, server persistence, official curriculum, and lab integration do not exist.
- **Placeholder / truthful empty state:** operational lab, programme, impact, partner, and student information not supported by Foundation sources.
- **Not started:** backend services, authenticated public submissions, analytics, and production data integrations.

## Relevant files

- `app/page.tsx` — public homepage.
- `app/learning/` — learner-facing room; read its context before learning work.
- `app/globals.css` — shared visual system and responsive behavior.
- `public/logo.png` — authoritative Foundation logo.
- `references/source-material/foundation-constitution/` — brand and institutional authority.

## Workflow and validation

Inspect current routes before changing them. Use semantic HTML, visible focus, keyboard operation, reduced motion, touch-sized controls, meaningful alt text, and lightweight progressive enhancement. Run `pnpm routing:check`, `pnpm context:check`, typecheck, lint, tests, and the appropriate browser/production checks.

## Routed skills and references

- `skills/bhavya-ui/SKILL.md`
- `skills/bhavya-source-integrity/SKILL.md`
- `REFERENCE.md`
- `references/source-material/foundation-constitution/`
