# Bhavya Foundation — CONTEXT.md

## Workspace identity

This is the Bhavya Foundation digital-platform repository. It contains the public institutional website, the first learner-facing AI-education experience, authoritative source material, curriculum proposals, staged ICM workflow context, and small project skills.

## Product context

Bhavya's institutional purpose is governed by the supplied Foundation source material. The product direction is a free AI-education ecosystem for students in rural Himachal Pradesh, with future connections to practical learning, physical AI Labs, projects, mentorship, knowledge access, and continued learning. Future domains are boundaries, not proof that systems exist.

## Room map

- `app/CONTEXT.md` — public website, routes, brand presentation, accessibility, performance, and truthful public states.
- `app/learning/CONTEXT.md` — actual learner-facing product and its current functionality.
- `curriculum/CONTEXT.md` — authoring, progression, review status, and provenance.
- `governance/CONTEXT.md` — institutional facts and authoritative-source routing.
- `references/CONTEXT.md` — stable source bundle and reference boundaries.
- `stages/CONTEXT.md` — ICM stage map and stage contracts.
- `skills/CONTEXT.md` — available Bhavya specialist playbooks.
- `docs/decisions/` — durable architectural decisions.

## Stable references

Read `REFERENCE.md` for source hierarchy, logo rules, ICM principles, licensing boundaries, and missing-information rules. The authoritative governance/brand files live in `references/source-material/foundation-constitution/`; the supplied logo is `references/source-material/logo.png` and the website copy is `public/logo.png`.

## Current repository state

The Next.js App Router application exports a static GitHub Pages site. Public routes include `/`, `/about`, `/missions`, `/learning`, `/labs`, and `/knowledge`. The learning room contains a proposed six-topic Foundation path with device-local progress and interaction work in progress; it is not approved curriculum, a student-account system, or a backend platform. Operational lab facts, impact data, partnerships, student data, and institutional metrics are intentionally absent unless supported by authority.

## Execution model

Use the smallest relevant room and skill set. Keep stable references separate from task artifacts. For sequential work, use the numbered `stages/` rooms and explicit handoffs. Normal engineering work is autonomous; Foundation governance, safeguarding, legal, publication, and official-curriculum decisions require human review.

## Verification

Validate both the artifact and the actual behavior. Use `pnpm routing:check` for routing integrity and `pnpm context:check` for recursive coverage. For code changes also run typecheck, lint, tests, and build as appropriate. For user-facing changes, perform browser and deployment checks when available and report unverified checks honestly.

## Unknowns

Student age range, languages, offline requirements, AI Lab locations/equipment, mentor model, safeguarding implementation details, data residency, providers, and quantitative targets remain open unless approved elsewhere.
