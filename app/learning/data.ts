export type LearningModule = {
  slug: string;
  number: string;
  title: string;
  objective: string;
  activity: string;
  project: string;
  concepts: string[];
  evidence: string;
  sourceMode: "original";
};

/** Proposed, original module metadata. Review is required before publication. */
export const learningModules: LearningModule[] = [
  {
    slug: "what-is-a-computer",
    number: "00",
    title: "What is a computer?",
    objective: "Notice how instructions, memory and inputs turn ideas into actions.",
    activity: "Teach a paper machine one precise instruction.",
    project: "A tiny instruction system for something you already know.",
    concepts: ["input", "instructions", "memory", "output"],
    evidence: "Explain one everyday system as input â†’ instructions â†’ output.",
    sourceMode: "original",
  },
  {
    slug: "what-is-data",
    number: "01",
    title: "What is data?",
    objective: "See data as observations with context, not just numbers on a screen.",
    activity: "Label a small set of everyday objects and question your labels.",
    project: "A data story that shows what was includedâ€”and what was missed.",
    concepts: ["observations", "labels", "context", "missing data"],
    evidence: "Show how changing a label or sample changes the story.",
    sourceMode: "original",
  },
  {
    slug: "algorithms-and-instructions",
    number: "02",
    title: "Algorithms & instructions",
    objective: "Break a task into steps, test them, and improve the sequence.",
    activity: "Write two routes to the same outcome and compare them.",
    project: "A reusable recipe a friend can follow without guessing.",
    concepts: ["sequence", "choice", "testing", "iteration"],
    evidence: "Record one failed step and the change that fixed it.",
    sourceMode: "original",
  },
  {
    slug: "what-is-ai",
    number: "03",
    title: "What is AI?",
    objective: "Build a clear mental model of systems that find patterns in examples.",
    activity: "Sort examples by rules, then notice where the rules break.",
    project: "A visual explanation of one AI system in your world.",
    concepts: ["patterns", "examples", "prediction", "limits"],
    evidence: "Name one useful prediction and one situation where it may fail.",
    sourceMode: "original",
  },
  {
    slug: "machine-learning-by-example",
    number: "04",
    title: "Machine learning by example",
    objective: "Understand training examples, patterns, predictions and uncertainty.",
    activity: "Change the examples and observe how the prediction changes.",
    project: "A labelled experiment log with a claim and evidence.",
    concepts: ["training", "testing", "prediction", "uncertainty"],
    evidence: "Compare a prediction with an observation and explain the difference.",
    sourceMode: "original",
  },
  {
    slug: "classification-and-patterns",
    number: "05",
    title: "Classification & patterns",
    objective: "Explore categories, boundaries, edge cases and better questions.",
    activity: "Design a fair sorting game and test it with a partner.",
    project: "A pattern classifier with a documented failure case.",
    concepts: ["categories", "boundaries", "edge cases", "fairness"],
    evidence: "Document a case your classifier gets wrong and why.",
    sourceMode: "original",
  },
];

export function getLearningModule(slug: string) {
  return learningModules.find((module) => module.slug === slug);
}

