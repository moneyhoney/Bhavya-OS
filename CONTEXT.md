# Bhavya Foundation — CONTEXT.md

## What this repository is

This repository contains the digital platform for Bhavya Foundation's AI education mission.

The immediate product is a public website plus a free AI learning platform designed for students in rural Himachal Pradesh, connected over time to physical AI Labs.

## Core mission context

The product exists to reduce barriers to AI education, especially for students who do not have access to computers.

The intended learning journey is:

Discover → Register → Learn → Practice → Experiment → Build → Use AI Lab → Receive mentorship → Progress

## Major product areas

### 1. Public Website
Purpose: public entry point to Bhavya Foundation and its AI education mission.

Likely areas:
- Home
- About
- Learn AI
- AI Labs
- Programmes
- Knowledge/Library
- Impact
- Contact

Do not publish fictional locations, impact numbers, programme claims, or operational details.

### 2. Learning Platform
Purpose: structured free AI education.

Conceptual hierarchy:
Learning Path → Level → Course → Module → Lesson → Exercise → Experiment → Project

Proposed progression:
Foundation → Beginner → Intermediate → Advanced → Expert

These level names describe the intended product structure; exact curriculum is not yet established by the source documents.

### 3. Physical AI Labs
Purpose: provide computer access and practical experimentation for students who do not have computers.

The platform should eventually connect online learning with:
- lab access
- practical activities
- computers/equipment
- mentors
- projects

Exact lab locations, equipment, schedules, capacity, staffing, and booking rules are not yet established.

### 4. Knowledge / Digital Library
The Foundation's governance material identifies knowledge access, AI-enabled learning, copyright, archives, and library governance as institutional concerns.

### 5. Responsible AI
Responsible AI education, AI Labs, privacy, transparency, and governance are identified in the Foundation's governance material.

### 6. Governance
The software must implement approved institutional requirements without replacing or inventing them.

## Domain boundaries

Potential domains:
- identity
- students
- curriculum
- learning/progress
- exercises/experiments
- projects
- mentors
- AI labs
- knowledge/library
- governance
- documents
- audit
- responsible AI
- safeguarding
- analytics

Do not implement every domain at once. Establish boundaries and implement only what the current milestone requires.

## Source hierarchy

1. Approved Foundation governance documents
2. Foundation logo/approved brand assets
3. Approved product decisions and PRDs
4. Reviewed Foundation educational content
5. Reference/mockup images for visual inspiration only
6. Dummy data from reference images — never authoritative

## ICM workspace convention

When using staged AI-assisted workflows:
- stage folders are numbered by conceptual execution order;
- each stage has a CONTEXT.md;
- references/ contains stable guidance;
- output/ contains working artifacts;
- human review occurs at meaningful stage boundaries.

## Current product status

The public website foundation is implemented as a small Next.js App Router application.

Current public routes:
- `/`
- `/about`
- `/missions`
- `/learning`
- `/labs`
- `/knowledge`

The homepage is static-first, mobile-first, low-bandwidth-aware, and uses the authoritative logo. Unpublished learning, lab, knowledge, programme, and impact facts are represented as transparent informational states rather than fabricated data.

## Current application architecture

- `app/` contains the public website routes, root metadata, and shared CSS.
- `public/logo.png` is the copied authoritative logo used by the website.
- `references/source-material/` contains stable governance, brand, ICM, and visual reference inputs.
- The current app is a modular monolith with presentation boundaries prepared for future learning, labs, knowledge, governance, safeguarding, and analytics domains.
- `next.config.mjs` uses static export with project-site base-path handling for GitHub Pages.

## Deployment architecture

`.github/workflows/ci-pages.yml` is the intended remote execution path. On GitHub it installs with the lockfile, runs typecheck/lint/tests, creates the static export, uploads the Pages artifact, and deploys from `main`. The repository has not yet been connected to a GitHub remote in this environment.

## Unknowns

Treat these as open until explicitly decided:
- initial student age range
- supported languages
- exact curriculum
- connectivity/offline requirements
- first AI Lab location
- lab hardware
- mentor model
- safeguarding/consent implementation details
- quantitative success targets
- AI provider/model choices
- hosting/data-residency requirements
