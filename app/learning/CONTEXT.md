# Learning Platform Context

## Purpose

`app/learning/` owns the actual learner-facing `/learning` experience: discovery, lesson choice, original explanations, differentiated interactions, feedback, local resume state, and truthful progress for the proposed Foundation path.

## Learner and constraints

Design for first-principles AI learning on phones, low bandwidth, intermittent connectivity, limited computing access, and future connection to physical AI Labs. Do not require an account or backend for the current static experience. Do not expose uncontrolled child communication.

## Learning architecture

The intended product hierarchy is Learning Path → Level → Course → Module → Lesson → Exercise → Experiment → Project. The current implementation is a proposed Foundation path of six topics. Each module should move through Understand → Observe → Try → Experiment → Build → Reflect and must give the learner something meaningful to do.

## Current state

- **Implemented:** `/learning` entry page, six module routes, six differentiated client-side interactions, explanatory feedback, activity-specific completion conditions, device-local resume state, a persisted learner reflection for each lesson, calculated module progress, and next-lesson navigation.
- **Implemented:** `/learning/coach` provides an offline-first local coach checkpoint. It reads the learner's optional name, goal, available minutes, and usual device; selects a next or due topic; offers simple/practical/technical explanations; evaluates a written response against the concept; gives a targeted hint before explanation; records misses; and schedules a three-day recall checkpoint.
- **Implemented:** local capability evidence records concepts encountered, attempts, hints/mistakes, recalls, applications, and demonstrations. The learning home surfaces concrete capability statements without claiming validated mastery.
- **Implemented:** optional `/learning/diagnostic` samples four concepts, with retryable feedback and an own-words prompt. Its result stores weak/strong concept signals locally and recommends targeted practice or a next challenge.
- **Implemented:** the final classification lesson includes a small evidence-brief project with an inspectable rubric. The project must pass before that lesson can be completed and its application signal is recorded locally.
- **Implemented:** `coachPolicy.ts` defines a provider-agnostic evaluator boundary. The current implementation is deterministic and local; it does not claim to be an AI model.
- **Partial:** progress, coach signals, and review dates are device-local only; they are not an account, synchronised record, official assessment, analytics system, or production AI model.
- **Proposed:** all current module content and progression; Foundation review is required before publication as official curriculum.
- **Not started:** accounts, server persistence, mentor workflows, AI Labs, moderated sharing, provider-backed AI assistance, and offline packaging. The current project milestone is a local guided practice brief, not cloud submission, human review, or a capstone system.

## Interaction expectations

Do not make six copies of a quiz. Match the interaction to the idea: sequence instructions, inspect/filter contextualised data, make algorithmic choices, classify examples, manipulate a model boundary, and verify evidence. The path should move from systems and instructions, through observations and patterns, into machine-learning decisions and evidence checking. Feedback must explain the consequence and offer a next move. Completion must persist across refresh on the same device and progress must be calculated from actual completion state. An attempt alone does not unlock completion: the sequence needs the correct order, a decision needs revision toward the reliable action, multi-item activities need complete and correct review, experiments need an observable manipulation, and every lesson needs a short learner reflection before it can be marked complete.

## Relevant files

- `page.tsx` — learning entry route.
- `LearningHome.tsx` — progress-aware path and discovery.
- `LearningDesk.tsx` — daily next-action, local profile signal, and review entry point.
- `CoachDesk.tsx` — focused local tutoring checkpoint with depth controls, hint/retry, explanation, and review scheduling.
- `learnerState.ts` — typed local learner profile, coach prompts, recommendation, and review helpers.
- `coach/page.tsx` — coach route.
- `data.ts` — typed proposed module metadata.
- `LessonLab.tsx` — differentiated interaction engine.
- `[module]/page.tsx` — static module route shell.
- `app/globals.css` — learning UI and mobile styles.
- `scripts/qa-learning-browser.mjs` — repeatable Chrome DevTools Protocol smoke test for the learner journey; run against a local dev server with Chrome remote debugging on port `9223`.
- `app/layout.tsx` — metadata icon path includes the GitHub Pages project base path during the production export.

## Workflow and validation

Read `curriculum/CONTEXT.md` before changing educational content. Use `skills/bhavya-learning/SKILL.md` and `skills/bhavya-ui/SKILL.md`. Keep generic educational explanations distinct from Foundation claims. Validate wrong answers, feedback, completion, refresh/resume, navigation, keyboard use, reduced motion, mobile layout, and static export behavior.

## Competency additions

- `CapabilityPanel.tsx` surfaces concrete capability statements from local evidence without claiming validated mastery.
- `Diagnostic.tsx` and `diagnostic/page.tsx` provide an optional four-question starting check with retryable feedback and targeted recommendation.
- `ProjectMilestone.tsx` adds a guided evidence brief and transparent application rubric to the final classification lesson.
- Project evidence is stored as a version-tolerant local record and is read consistently after refresh before the path recommends another project attempt.
- `coachPolicy.ts` defines a deterministic evaluator behind a future tutor/coach provider boundary.
- `learningState.ts` resolves the next learning action from due review, unfinished project work, unresolved attempts, unfinished lessons, diagnostic signals, and then the next appropriate challenge.
- The current project milestone is a local guided practice brief, not cloud submission, human review, or an official Foundation assignment.

## Routed references

- `REFERENCE.md`
- `curriculum/RESOURCE-MAP.md`
- `references/source-material/foundation-constitution/`
