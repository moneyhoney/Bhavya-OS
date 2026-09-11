# Coach Route Context

`app/learning/coach/` owns the static route shell for the local learning coach. The interactive implementation lives in the sibling `CoachDesk.tsx` component so the route remains a thin App Router boundary.

The route provides offline-first tutoring behavior, not a network AI provider: a learner chooses an explanation depth, writes an answer, receives a targeted hint after a miss, retries, receives an explanation after a match, and gets a local review date. It reads only the learner profile and learning signals stored by the browser.

Keep this route honest about its limits. It must not imply account sync, Foundation-approved curriculum, human mentorship, or model-generated answers. Changes to coach prompts are original proposed educational content and should be reviewed through `curriculum/CONTEXT.md` and `skills/bhavya-source-integrity/SKILL.md`.
