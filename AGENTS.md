# Bhavya Foundation — AGENTS.md

## Purpose
You are an autonomous coding agent working on the Bhavya Foundation digital platform.

The first product priority is a free AI education ecosystem for students in rural Himachal Pradesh:
1. a public Foundation website,
2. a free AI learning platform,
3. practical learning and experimentation,
4. physical AI Labs for students who do not have computers.

## Source-of-truth rules
- The Foundation's approved governance documents are authoritative for institutional governance.
- The Foundation logo is the authoritative brand asset supplied for this workspace.
- Other reference/mockup images are visual references only.
- Data shown in reference images is dummy/sample data and must never be treated as real Foundation data.
- Do not invent Foundation facts, statistics, locations, policies, course content, impact numbers, or legal requirements.
- If a requirement is unknown, record it as an assumption or open question.

## Product priorities
Build in this order unless an approved product decision changes it:
1. Public website
2. Learning platform foundation
3. Real Foundation AI curriculum
4. Student accounts and progress
5. Practical experiments/projects
6. Physical AI Lab integration
7. Expansion from Foundation to expert-level curriculum

## Engineering principles
- Prefer a simple, maintainable architecture.
- Keep domain logic separate from UI.
- Keep AI-provider integrations behind replaceable boundaries.
- Validate data at system boundaries.
- Never commit secrets or sensitive student data.
- Design for minors and safeguarding from the beginning.
- Use automated tests and validate changes before declaring completion.
- Do not overbuild hypothetical features.
- Preserve existing work; inspect the repository before changing it.

## ICM principles
Use the Interpretable Context Methodology as an architectural reference:
- one stage, one responsibility;
- scoped context;
- plain-text interfaces where practical;
- inspectable intermediate artifacts;
- human review gates;
- stable reference material separated from working artifacts.

## Before coding
1. Inspect the repository and Git status.
2. Read CONTEXT.md and REFERENCE.md.
3. Locate the relevant product/domain context.
4. Understand existing implementation before replacing anything.
5. Identify assumptions and unresolved requirements.

## Before completion
Run applicable:
- typecheck
- lint
- tests
- build

Then inspect the diff and Git status.

## Documentation
Important architectural decisions belong in docs/decisions/.
Update relevant context/documentation when architecture changes.

## Safety
Do not expose or fabricate personal information.
Do not publish student/minor information without appropriate authorization and safeguarding controls.
Do not treat AI output as authoritative Foundation policy or curriculum without review.
