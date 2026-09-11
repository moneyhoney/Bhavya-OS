import { coachPrompts } from "./learnerState";

export type CoachRequest = {
  slug: string;
  response: string;
  attempt: number;
};

export type CoachEvaluation = {
  correct: boolean;
  missing: string[];
  hint: string;
  explanation: string;
};

/** Provider boundary: deterministic evaluation is the honest current implementation. */
export interface CoachEvaluator {
  evaluate(request: CoachRequest): CoachEvaluation;
}

export const deterministicCoachEvaluator: CoachEvaluator = {
  evaluate({ slug, response }) {
    const prompt = coachPrompts[slug];
    const normalized = response.toLowerCase();
    const missing = prompt.required.filter((term) => !normalized.includes(term));
    return { correct: missing.length === 0, missing, hint: prompt.hint, explanation: prompt.explain };
  },
};
