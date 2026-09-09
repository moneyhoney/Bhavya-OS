# Bhavya Foundation — AGENTS.md

## Identity

Bhavya Foundation is building a free AI-education ecosystem for students in rural Himachal Pradesh. This repository contains its public website and the first learner-facing product foundations.

## This file is the map

Start here, then load only the room, references, and skills relevant to the task:

| Task | Read first | Load skills |
|---|---|---|
| Public website | `app/CONTEXT.md` | `bhavya-ui`, `bhavya-source-integrity` |
| Learning product | `app/learning/CONTEXT.md` | `bhavya-learning`, `bhavya-ui` |
| Curriculum/content | `curriculum/CONTEXT.md` | `bhavya-learning`, `bhavya-source-integrity` |
| Foundation/governance | `governance/CONTEXT.md` | `bhavya-source-integrity` |
| External research/assets | Relevant room context | `bhavya-source-integrity` |
| Staged workflow | `stages/CONTEXT.md` and the active stage | Relevant room skills |

`CONTEXT.md` files are rooms. `REFERENCE.md` and `references/` are stable sources. `skills/*/SKILL.md` files are selective specialist playbooks. Task-specific working artifacts belong in the relevant stage or room, not in stable references.

## Source boundary

Authoritative Foundation documents outrank product documents, external research, and visual references. The supplied logo is authoritative. Reference-image data is dummy data. Never invent Foundation facts, policy, legal requirements, locations, programmes, partnerships, statistics, impact, student data, or lab details. Original generic educational content is allowed, but it is not Foundation-approved curriculum until reviewed.

## Execution

A task request means execute: inspect reality, research when required, implement working behavior, and verify the actual application. Do not substitute plans, proposals, schemas, placeholders, or documentation for implementation. Normal research, refactoring, testing, browser QA, and dependency evaluation are autonomous. Human review is required only for genuine Foundation authority, governance, safeguarding, legal, or publication decisions.

## Verification

Use the repository's existing stack and preserve static GitHub Pages compatibility. Run applicable context/routing checks, typecheck, lint, tests, and build; inspect the diff and working tree. For user-facing changes, verify the actual application and distinguish verified results from unverified checks.

## Map maintenance

Update the narrowest relevant `CONTEXT.md` when implementation reality changes. Keep this file concise. Run `pnpm routing:check` after routing changes; it verifies required rooms, references, skills, and the global-map boundary.
