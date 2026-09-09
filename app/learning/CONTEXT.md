# Learning Platform Context

## Purpose

`app/learning/` owns the actual learner-facing `/learning` experience: discovery, lesson choice, original explanations, differentiated interactions, feedback, local resume state, and truthful progress for the proposed Foundation path.

## Learner and constraints

Design for first-principles AI learning on phones, low bandwidth, intermittent connectivity, limited computing access, and future connection to physical AI Labs. Do not require an account or backend for the current static experience. Do not expose uncontrolled child communication.

## Learning architecture

The intended product hierarchy is Learning Path → Level → Course → Module → Lesson → Exercise → Experiment → Project. The current implementation is a proposed Foundation path of six topics. Each module should move through Understand → Observe → Try → Experiment → Build → Reflect and must give the learner something meaningful to do.

## Current state

- **Implemented:** `/learning` entry page, six module routes, six differentiated client-side interactions, explanatory feedback, completion controls, local resume state, calculated module progress, and next-lesson navigation.
- **Partial:** progress is device-local only; it is not an account, synchronised record, official assessment, analytics system, or mastery model.
- **Proposed:** all current module content and progression; Foundation review is required before publication as official curriculum.
- **Not started:** accounts, server persistence, mentor workflows, AI Labs, project submission, moderated sharing, adaptive AI assistance, and offline packaging.

## Interaction expectations

Do not make six copies of a quiz. Match the interaction to the idea: sequence instructions, inspect/filter data, make algorithmic choices, classify examples, manipulate a model boundary, and verify evidence. Feedback must explain the consequence and offer a next move. Completion must persist across refresh on the same device and progress must be calculated from actual completion state.

## Relevant files

- `page.tsx` — learning entry route.
- `LearningHome.tsx` — progress-aware path and discovery.
- `data.ts` — typed proposed module metadata.
- `LessonLab.tsx` — differentiated interaction engine.
- `[module]/page.tsx` — static module route shell.
- `app/globals.css` — learning UI and mobile styles.

## Workflow and validation

Read `curriculum/CONTEXT.md` before changing educational content. Use `skills/bhavya-learning/SKILL.md` and `skills/bhavya-ui/SKILL.md`. Keep generic educational explanations distinct from Foundation claims. Validate wrong answers, feedback, completion, refresh/resume, navigation, keyboard use, reduced motion, mobile layout, and static export behavior.

## Routed references

- `REFERENCE.md`
- `curriculum/RESOURCE-MAP.md`
- `references/source-material/foundation-constitution/`
