# Bhavya Foundation — CONTEXT.md

## What this workspace is for

This repository is the Bhavya Foundation digital-platform workspace. Bhavya Foundation is building a long-term ecosystem that expands access to free AI education and practical learning.

The immediate product is a public Foundation website and a learner-facing AI-learning foundation. The larger direction connects public information, free learning, practice, experimentation, physical AI Labs, projects, mentorship, advanced learning, research, and continued learning.

The learner problem is access. A student may have a phone but not a computer, fast connectivity, private storage, or advanced digital confidence. The product must let a learner begin with clear concepts on a basic device, understand what requires computing resources, eventually use an AI Lab, build something meaningful, and continue learning.

This file is project/workspace context. `AGENTS.md` is the repository map and global routing layer. `REFERENCE.md` is stable/deep background knowledge. Scoped `CONTEXT.md` files are room-specific. `SKILL.md` files are selective specialist procedures.

## What this workspace contains

The repository is a Next.js App Router application with static GitHub Pages deployment and a filesystem-based ICM context system.

Important actual paths:

- `AGENTS.md` — concise identity, routing table, global boundaries, execution, and verification rules.
- `CONTEXT.md` — this project-level workspace context.
- `REFERENCE.md` — durable product, educational, technical, source-integrity, research, and quality knowledge.
- `PRD.md` — product definition and requirements.
- `app/` — public application routes, layout, and shared CSS; see `app/CONTEXT.md`.
- `app/page.tsx` — public homepage.
- `app/about/page.tsx` — public about route.
- `app/missions/page.tsx` — public missions route.
- `app/labs/page.tsx` — truthful AI-Lab information state.
- `app/knowledge/page.tsx` — knowledge route.
- `app/learning/` — learner-facing learning product; see `app/learning/CONTEXT.md`.
- `app/learning/data.ts` — typed proposed learning-module metadata.
- `app/learning/LearningHome.tsx` — learning discovery and local progress presentation.
- `app/learning/LessonLab.tsx` — differentiated learning interactions.
- `app/globals.css` — shared visual system and responsive styles.
- `public/` — public assets; `public/logo.png` is the website copy of the supplied authoritative logo.
- `curriculum/` — proposed curriculum architecture and resource provenance; see `curriculum/CONTEXT.md`.
- `curriculum/RESOURCE-MAP.md` — external learning-resource and license treatment.
- `governance/` — institutional/source-routing room; see `governance/CONTEXT.md`.
- `references/` — stable source-material boundary; see `references/CONTEXT.md`.
- `references/source-material/` — supplied Foundation materials, ICM paper, authoritative logo, and visual references.
- `references/source-material/foundation-constitution/` — extracted Foundation source Markdown files.
- `skills/` — selective Bhavya specialist playbooks; see `skills/CONTEXT.md`.
- `skills/bhavya-ui/SKILL.md` — UI, responsive, accessibility, motion, and visual review.
- `skills/bhavya-learning/SKILL.md` — learning, curriculum, exercise, and education UX work.
- `skills/bhavya-source-integrity/SKILL.md` — institutional facts, licensing, provenance, and attribution.
- `stages/` — numbered ICM execution rooms; see `stages/CONTEXT.md` and the active stage context.
- `docs/decisions/` — durable architecture decisions, including ICM routing and static Pages boundaries.
- `scripts/` — deterministic repository checks, including `check-context-coverage.mjs` and `check-routing.mjs`.
- `.github/workflows/ci-pages.yml` — GitHub Actions typecheck, lint, tests, static build, and Pages deployment workflow.
- `next.config.mjs`, `package.json`, and `pnpm-lock.yaml` — application and dependency configuration.

The important relationship is:

`AGENTS.md` → scoped `CONTEXT.md` → `REFERENCE.md` / `references/` → relevant `SKILL.md` → implementation and validation.

## How work should flow

1. Read `AGENTS.md`.
2. Identify the task and room from its routing table.
3. Read the relevant scoped `CONTEXT.md`.
4. Load `REFERENCE.md` when deeper project, product, source, or research context is relevant.
5. Load only the specialist `SKILL.md` files needed for the task.
6. Inspect the actual implementation and git state before making assumptions.
7. Research current external examples, GitHub repositories, official documentation, open educational resources, MCPs, or tools when they materially improve the work.
8. Prefer existing project capability, browser-native features, free/open-source, self-hosted, or local approaches before paid APIs.
9. Implement the smallest complete real solution that fits the current scope.
10. Test the actual user experience; use browser QA for user-facing work when available.
11. Run applicable routing, context, typecheck, lint, test, build, and deployment checks.
12. Update the narrowest relevant context when implementation reality changes.

This process is execution-oriented. A plan, architecture document, schema, route, card, placeholder, or TODO is not a substitute for working behavior when the task requests implementation. An MVP may be limited in scope, but the behavior it claims to provide must be real.

## Product vision

Bhavya is building free AI education for learners who may be in rural Himachal Pradesh and may not own a computer. The product direction is:

Public Website → Free AI Learning → Practice → Experimentation → Physical AI Labs → Projects → Mentorship → Advanced Learning → Continued Learning.

Physical AI Labs are intended as a bridge to computing access, not as a disconnected future feature. Do not invent their locations, equipment, capacity, opening dates, staffing, partnerships, or student numbers.

The proposed learning hierarchy is:

Learning Path → Level → Course → Module → Lesson → Exercise → Experiment → Project.

The proposed progression is Foundation → Beginner → Intermediate → Advanced → Expert. These are product-direction structures, not proof that every level or course exists or has been approved.

The learning philosophy is:

Understand → Observe → Try → Experiment → Build → Reflect.

A real lesson should give the learner a reason to act. Where appropriate, it should define the learner, prerequisite, objective, explanation, example, visual representation, interaction, practice, feedback, assessment, reflection, completion condition, and next step.

## What good looks like

Good work in this repository produces genuinely useful learner and public experiences, not impressive-looking shells.

The quality bar is:

- real behavior: user action produces processing, feedback, state change, and correct navigation or persistence;
- strong educational value: explanations, examples, interactions, mistakes, and feedback help the learner understand;
- excellent UX: clear entry points, hierarchy, orientation, next steps, and truthful states;
- mobile-first access: comfortable on phones and shared or low-powered devices;
- accessibility: semantic HTML, keyboard operation, visible focus, labels, contrast, touch targets, screen-reader meaning, and reduced motion;
- low-bandwidth awareness: lightweight assets, restrained JavaScript, readable content, progressive enhancement, and resumable work;
- trustworthy Foundation information: institutional claims are supported and unknowns are expressed honestly;
- meaningful interaction: sorting, sequencing, classification, simulation, verification, and reflection should teach something;
- maintainable engineering: typed boundaries, small components, simple architecture, and clear context ownership;
- appropriate simplicity: avoid dependencies and systems that do not solve a current problem;
- real verification: inspect the application and distinguish verified from unverified checks;
- growth readiness: current work should leave a clean path toward accounts, progress, Labs, projects, mentorship, and continued learning without pretending those systems already exist.

## Research and tools

Use web research, GitHub, official documentation, available skills, MCPs, and local tools when they materially improve a decision. Study excellent products and open-source projects for pedagogy, information architecture, feedback, accessibility, component boundaries, content workflows, and implementation principles.

Relevant reference ecosystems already established for this project include Raspberry Pi Foundation learning resources, Experience AI, Scratch, CS50, Teachable Machine, Blockly, and strong open-source learning platforms. Research is for understanding and comparison. Do not copy proprietary code, branding, course text, illustrations, datasets, or assets. Inspect licenses before reuse and preserve attribution or restrictions.

## Source integrity

Authoritative Foundation source material outranks external research and visual references. The supplied Foundation logo is authoritative. Reference/mockup images are visual inspiration only; their names, numbers, locations, student data, metrics, course data, and other factual-looking content are dummy/sample data.

Do not invent Foundation-specific facts, legal requirements, programmes, partnerships, impact, locations, Labs, students, staff, donors, policies, testimonials, statistics, or institutional achievements. Support Foundation claims with authoritative source material or use a truthful empty state/open question.

The agent may write original generic educational content, proposed courses, lessons, exercises, projects, assessments, and simulations when the task requires curriculum development. That content must be clearly proposed or in review and must not be presented as officially approved Foundation curriculum without human approval.

## Rural learner requirements

Assume some learners use phones instead of computers, limited bandwidth, intermittent connectivity, low-powered devices, shared devices, limited storage, and limited technical confidence.

Prefer mobile-first layouts, lightweight pages, readable typography, accessible controls, progressive enhancement, local or resumable state where appropriate, clear navigation, and activities that can be completed on a phone when possible. Clearly distinguish activities that need a computer or may later belong in an AI Lab. Premium quality must not require premium hardware.

## AI and safety

AI may eventually assist with explanations, hints, examples, practice, debugging, alternative explanations, and adaptive learning. It must not silently become authoritative Foundation curriculum, policy, governance, safeguarding, or a replacement for teachers and mentors.

Prefer free, open, local, browser-native, or self-hosted AI approaches before paid APIs. Protect secrets. Use privacy-aware data minimization, least privilege, safe rendering, moderation, controlled student publication, and safeguarding boundaries because learners may include minors. Never invent legal compliance requirements.

## What to avoid

Avoid architecture theatre, documentation theatre, placeholder theatre, fake AI, fake progress, dead buttons, unsupported Foundation claims, future systems presented as implemented, generic dashboard UX, unnecessary paid APIs, unnecessary dependencies, inaccessible interfaces, heavy experiences that ignore rural connectivity, copied external products, overengineering, unrelated changes, and blocking on minor ambiguity.

Do not claim typecheck, lint, tests, build, browser QA, deployment, or production verification without actually performing the relevant check.

## Context maintenance

`AGENTS.md` remains the global identity, routing, naming, and non-negotiable-rules layer. This project-level `CONTEXT.md` explains the current repository and product workspace. Scoped `CONTEXT.md` files explain individual rooms. `REFERENCE.md` holds durable/deep project knowledge. `SKILL.md` files hold specialist procedures.

Update the narrowest context when architecture, routes, product status, dependencies, workflows, design, curriculum, research, or deployment reality changes. Do not turn context files into activity logs, task reports, or duplicates of the entire reference corpus. Preserve existing naming and folder structure. If a path is not present in the filesystem, do not document it as an existing implementation.
