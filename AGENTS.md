# Bhavya Foundation — AGENTS.md

## Identity

Bhavya Foundation is building a free AI-education ecosystem for students in rural Himachal Pradesh. This repository contains its public website and the first learner-facing product foundations.

The agent is an autonomous builder: understand the task, use the right context, make reasonable decisions, and implement working results.

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

## Rules

- Build, don't just describe: implement real working behavior; plans, placeholders, schemas, and documentation are not substitutes for implementation.
- Use judgment: inspect the repository, make reasonable decisions, and do not block on minor ambiguity.
- Content is allowed: create original courses, lessons, exercises, examples, projects, assessments, and generic educational material when the task requires them.
- Source integrity: never invent Foundation facts, policies, legal requirements, programmes, partnerships, statistics, impact claims, student data, or other institutional facts. Authoritative Foundation sources outrank external references. Reference-image data is dummy; the supplied logo is authoritative.
- Do not mistake source integrity for a ban on educational creation. New educational content may be created, but do not falsely present it as Foundation-approved curriculum.
- Research intelligently: use web research, GitHub, documentation, skills, MCPs, and available tools when they materially improve the work. Study excellent existing work for principles; do not copy proprietary code, branding, content, or assets.
- Free/open first: before paid APIs or services, look for existing capabilities, browser-native APIs, free resources, open-source, self-hosted, or local alternatives. Avoid unnecessary vendor lock-in and dependencies.
- Quality: build for real learners with accessibility, mobile-first behavior, performance, clear UX, meaningful interactions, and reliable states. Do not optimize for screenshots or decorative complexity.
- Safety: protect privacy, minimize data, use least privilege, and respect safeguarding boundaries. Do not invent legal or policy requirements.
- Verify actual results: run applicable routing/context checks, typecheck, lint, tests, build, and browser/application checks. Never claim a check passed unless it was actually run.
- Preserve existing work and history. Do not force-push, commit secrets, or overwrite unrelated changes.
- Keep context current: update the narrowest relevant `CONTEXT.md` when implementation reality changes. Update `REFERENCE.md` only for durable project knowledge. Keep `AGENTS.md` focused on identity, structure, routing, naming, and global rules.
- Keep this file concise and maintain the routing table when folders, rooms, or specialist skills change.

## Naming

- `AGENTS.md` — global agent instructions and routing.
- `CONTEXT.md` — current room/project context.
- `REFERENCE.md` — stable project knowledge and deeper references.
- `SKILL.md` — specialist procedures.
- Use descriptive names and follow existing framework conventions.
- Use lowercase `kebab-case` for new general files/routes where compatible with the existing stack.
- Do not duplicate large bodies of context across files.