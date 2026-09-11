import { learningModules, LearningModule } from "./data";

export const learnerProfileKey = "bhavya-learner-profile";
export const learnerStateKey = "bhavya-learner-state";
export const diagnosticKey = "bhavya-diagnostic";
export const coachMissKey = (slug: string) => `bhavya-coach-misses:${slug}`;
export const coachCompleteKey = (slug: string) => `bhavya-coach:${slug}`;
export const reviewKey = (slug: string) => `bhavya-review:${slug}`;

export type LearnerProfile = {
  name: string;
  goal: "understand-ai" | "build-projects" | "prepare-for-lab";
  minutes: "10" | "20" | "30";
  device: "phone" | "computer" | "shared-computer";
};

export const defaultProfile: LearnerProfile = {
  name: "",
  goal: "understand-ai",
  minutes: "20",
  device: "phone",
};

export type EvidenceEvent = "encountered" | "attempted" | "hint" | "retry" | "demonstrated" | "recalled" | "applied";
export type CapabilityStage = "seen" | "attempted" | "understood" | "practiced" | "applied" | "demonstrated";

export type CapabilitySignal = {
  slug: string;
  encountered: number;
  attempts: number;
  hints: number;
  mistakes: number;
  successfulRetries: number;
  recalls: number;
  applications: number;
  demonstrations: number;
  lastEvidence: string;
  stage: CapabilityStage;
};

export type LearnerCapabilityState = {
  schemaVersion: 1;
  capabilities: Record<string, CapabilitySignal>;
};

function blankSignal(slug: string): CapabilitySignal {
  return { slug, encountered: 0, attempts: 0, hints: 0, mistakes: 0, successfulRetries: 0, recalls: 0, applications: 0, demonstrations: 0, lastEvidence: "", stage: "seen" };
}

export function readLearnerState(): LearnerCapabilityState {
  if (typeof window === "undefined") return { schemaVersion: 1, capabilities: {} };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(learnerStateKey) ?? "{}");
    return { schemaVersion: 1, capabilities: parsed.capabilities ?? {} };
  } catch {
    return { schemaVersion: 1, capabilities: {} };
  }
}

export function recordLearningEvidence(slug: string, event: EvidenceEvent): CapabilitySignal {
  const state = readLearnerState();
  const current = { ...blankSignal(slug), ...(state.capabilities[slug] ?? {}) };
  current.encountered = Math.max(current.encountered, 1);
  if (event === "attempted") current.attempts += 1;
  if (event === "hint") { current.hints += 1; current.mistakes += 1; }
  if (event === "retry") current.successfulRetries += 1;
  if (event === "demonstrated") current.demonstrations += 1;
  if (event === "recalled") current.recalls += 1;
  if (event === "applied") current.applications += 1;
  current.lastEvidence = event;
  current.stage = current.applications > 0 ? "applied" : current.demonstrations > 0 && current.recalls > 0 ? "demonstrated" : current.demonstrations > 0 || current.recalls > 0 ? "understood" : current.successfulRetries > 0 ? "practiced" : current.attempts > 0 ? "attempted" : "seen";
  state.capabilities[slug] = current;
  window.localStorage.setItem(learnerStateKey, JSON.stringify(state));
  return current;
}

export function capabilityFor(slug: string): CapabilitySignal {
  return readLearnerState().capabilities[slug] ?? blankSignal(slug);
}

export function capabilityStatements(): Array<{ slug: string; title: string; statement: string; stage: CapabilityStage }> {
  const state = readLearnerState();
  return learningModules.map((module) => {
    const signal = state.capabilities[module.slug] ?? blankSignal(module.slug);
    const statement = signal.stage === "applied" ? `You applied this: ${module.skill}` : signal.stage === "demonstrated" ? `You can now demonstrate: ${module.skill}` : signal.stage === "understood" ? `You have shown understanding of: ${module.skill}` : signal.stage === "attempted" ? `You are practicing: ${module.skill}` : `Next capability: ${module.skill}`;
    return { slug: module.slug, title: module.title, statement, stage: signal.stage };
  });
}

export function weakCapabilitySlugs(): string[] {
  const state = readLearnerState();
  return Object.values(state.capabilities).filter((signal) => signal.hints > 0 || signal.mistakes > 0).sort((a, b) => (b.hints + b.mistakes) - (a.hints + a.mistakes)).map((signal) => signal.slug);
}

export const goalLabels: Record<LearnerProfile["goal"], string> = {
  "understand-ai": "Understand how AI works",
  "build-projects": "Build useful projects",
  "prepare-for-lab": "Prepare for practical lab work",
};

type CoachPrompt = {
  question: string;
  simple: string;
  practical: string;
  technical: string;
  required: string[];
  hint: string;
  explain: string;
  next: string;
};

export const coachPrompts: Record<string, CoachPrompt> = {
  "what-is-a-computer": {
    question: "In your own words, what enters a computer and what comes out after it follows instructions?",
    simple: "Think about a phone camera: something arrives, the phone follows steps, and you see a result.",
    practical: "Use one everyday example and name the input and the output.",
    technical: "A useful explanation separates input, instructions or processing, memory, and output.",
    required: ["input", "output"],
    hint: "Start with the two ends of the process: what the system receives and what it produces.",
    explain: "Your answer connects an input to an output. Instructions explain the change between them; memory can hold the information while the system works.",
    next: "Find one input and one output in an everyday system before opening the first lesson.",
  },
  "what-is-data": {
    question: "Why is a value more useful when it has context? Give one detail that should travel with an observation.",
    simple: "The number 18 is incomplete until we know 18 what, where, or when.",
    practical: "Mention a value and one label, time, place, or measurement detail.",
    technical: "Useful data joins an observation or value to context and a label so a later claim can be checked.",
    required: ["context", "value"],
    hint: "Use the words value and context, then name the missing detail that makes the value interpretable.",
    explain: "A value without context can be misunderstood. Context lets another person inspect what was measured and how a claim was formed.",
    next: "When you return to the data lesson, compare one group with the full set and name what the grouping hides.",
  },
  "algorithms-and-instructions": {
    question: "What should you do when another person cannot follow your instructions, and why?",
    simple: "A method needs to work for someone who did not write it.",
    practical: "Name testing and describe the unclear step it could reveal.",
    technical: "Testing exposes ambiguous sequence, choice, or stopping conditions before an algorithm is shared.",
    required: ["test", "step"],
    hint: "Think about asking another person to follow the steps without extra explanation.",
    explain: "Testing turns an assumption into evidence. The failed step tells you what to clarify or reorder.",
    next: "Rewrite one vague instruction so another person can follow it without guessing.",
  },
  "what-is-ai": {
    question: "How can an AI system turn examples into a prediction, and what should a person still check?",
    simple: "Examples help a system notice a pattern, but a person should check whether the prediction fits.",
    practical: "Include examples, a pattern, a prediction, and a human check.",
    technical: "A model uses examples to represent a pattern and applies it to new input; evaluation checks where that representation fails.",
    required: ["example", "pattern"],
    hint: "Describe the middle of the chain: examples help find a pattern, which is then used for a prediction.",
    explain: "AI is not a magic answer source. Its output depends on examples, the pattern it found, and the question; people still inspect limits and evidence.",
    next: "Return to the classification activity and explain the rule behind one label at its boundary.",
  },
  "machine-learning-by-example": {
    question: "What changes when a model makes a prediction from labelled examples, and how do you find an error?",
    simple: "The model uses examples to make a guess. Compare the guess with the known label to find an error.",
    practical: "Mention an example, a prediction, and a comparison with the label.",
    technical: "Training examples shape a decision rule; testing compares predictions with labels and reveals misclassification.",
    required: ["example", "prediction"],
    hint: "Use the sequence examples → model pattern → prediction, then compare the prediction with a label.",
    explain: "A model can be useful and still be wrong. Testing makes the error visible so the rule can be questioned or improved.",
    next: "Move the model threshold and record which example improves and which becomes worse.",
  },
  "classification-and-patterns": {
    question: "Why should a classification label be checked against evidence, especially near a boundary?",
    simple: "A label is a decision, not proof. A boundary case may not fit the rule clearly.",
    practical: "Name evidence and explain what you would do with an uncertain case.",
    technical: "Evaluation should inspect evidence, uncertainty, and edge cases where a classifier's boundary is weak.",
    required: ["evidence", "boundary"],
    hint: "Think about a case that sits between two categories and what information would make the decision safer.",
    explain: "Evidence makes a classification inspectable. Boundary cases show where confidence should slow down rather than hide uncertainty.",
    next: "Document one case your rule cannot classify confidently and what evidence would help.",
  },
};

export function readProfile(): LearnerProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    return { ...defaultProfile, ...JSON.parse(window.localStorage.getItem(learnerProfileKey) ?? "{}") };
  } catch {
    return defaultProfile;
  }
}

export function recommendedModule(): LearningModule {
  if (typeof window === "undefined") return learningModules[0];
  const now = Date.now();
  const due = learningModules.find((module) => Number(window.localStorage.getItem(reviewKey(module.slug)) ?? 0) <= now && Number(window.localStorage.getItem(reviewKey(module.slug)) ?? 0) > 0);
  if (due) return due;
  const weak = learningModules
    .filter((module) => window.localStorage.getItem(coachCompleteKey(module.slug)) !== "complete")
    .sort((a, b) => Number(window.localStorage.getItem(coachMissKey(b.slug)) ?? 0) - Number(window.localStorage.getItem(coachMissKey(a.slug)) ?? 0))[0];
  return weak ?? learningModules.find((module) => window.localStorage.getItem(`bhavya-lesson:${module.slug}`) !== "complete") ?? learningModules[0];
}

export function dueReviewCount(): number {
  if (typeof window === "undefined") return 0;
  const now = Date.now();
  return learningModules.filter((module) => { const dueAt = Number(window.localStorage.getItem(reviewKey(module.slug)) ?? 0); return dueAt > 0 && dueAt <= now; }).length;
}
