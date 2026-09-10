export type LearningModule = {
  slug: string;
  number: string;
  title: string;
  objective: string;
  skill: string;
  prerequisite: string;
  explanation: string;
  example: string;
  visual: string;
  nextStep: string;
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
    skill: "Describe a system using input, instruction, memory, and output.",
    prerequisite: "No previous computing experience is needed.",
    explanation: "A computer is a system that receives input, follows instructions, keeps or changes information, and produces an output. This model helps you look past the screen: a phone camera receives light, follows image instructions, keeps a picture, and shows the result.",
    example: "When you ask a calculator for 7 + 5, the numbers are input, the addition rule is an instruction, and 12 is the output.",
    visual: "input → instructions → memory → output",
    nextStep: "Look for input, instructions, memory, and output in an everyday process.",
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
    skill: "Compare values, labels, and context before making a claim from data.",
    prerequisite: "Complete What is a computer? or be comfortable with input and output.",
    explanation: "Data is a recorded observation. A useful record joins a value to context: what was measured, when, how, and what label was attached. Grouping records can reveal a pattern, but the group is a question we choose, not a fact that appears by magic.",
    example: "The number 18 means little by itself. Eighteen what, measured where, and at what time? Adding those details changes how the observation can be understood.",
    visual: "value + context + label → interpretable observation → cautious claim",
    nextStep: "Ask what was included, left out, or labelled differently in a dataset.",
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
    skill: "Find an ambiguous instruction and improve it through testing.",
    prerequisite: "Understand that computers follow explicit instructions.",
    explanation: "An algorithm is a repeatable method for reaching an outcome. Good instructions make order, choices, and stopping points clear enough for another person or system to follow. Testing is part of the algorithmic work: another person exposes assumptions the writer cannot see.",
    example: "A route to the water tap can include a choice: if the cup is not under the tap, move it before turning the tap on.",
    visual: "start → step → decision → step → result",
    nextStep: "Test your instructions with someone who did not write them.",
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
    skill: "Separate a system's examples, pattern, prediction, and human check.",
    prerequisite: "Know the difference between observations and instructions.",
    explanation: "AI is a broad name for systems built to perform tasks associated with human reasoning, such as recognising patterns, making predictions, or generating language. The system is not a person: it follows a method designed by people and can fail when examples, labels, or questions do not fit.",
    example: "A pattern-finding system might group sounds or images using examples. The grouping is useful only if the examples and the rule fit the question.",
    visual: "examples → pattern → prediction → human check",
    nextStep: "When you see an AI output, ask what examples and pattern might be behind it.",
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
    skill: "Change a model boundary and compare predictions with labelled examples.",
    prerequisite: "Understand that an AI system can use examples to make a prediction.",
    explanation: "In a simple machine-learning system, labelled training examples help a model find a pattern. The model applies that pattern to new examples. Testing matters because a model can fit the examples it saw while performing poorly on new ones.",
    example: "If a toy classifier uses one score to identify leaves, moving its threshold changes which examples it calls leaves—and which examples become errors.",
    visual: "labelled examples → model rule → new example → prediction → error",
    nextStep: "Change one part of the model and record which predictions improve or worsen.",
    activity: "Change the examples and observe how the prediction changes.",
    project: "A labelled experiment log with a claim and evidence.",
    concepts: ["training", "testing", "prediction", "uncertainty"],
    evidence: "Compare a prediction with an observation and explain the difference.",
    sourceMode: "original",
  },
  {
    slug: "classification-and-patterns",
    number: "05",
    title: "Classification, boundaries & evidence",
    objective: "Explore categories, boundaries, edge cases, and the evidence behind a decision.",
    skill: "Spot a boundary case and decide what evidence is needed before trusting a label.",
    prerequisite: "Understand examples, labels, and the idea of a model boundary.",
    explanation: "Classification assigns an item to a category. Categories are choices people design; boundary cases reveal where a rule is unclear or where the available evidence is not enough. A label is a prompt for inspection, not a guarantee that the decision is fair or true.",
    example: "A system that sorts messages as safe or unsafe may encounter a new phrase it has not seen. A responsible response is to inspect the evidence instead of treating the label as certain.",
    visual: "examples + labels → categories → boundary cases → review",
    nextStep: "Document one case your rule cannot classify confidently and what evidence would help.",
    activity: "Compare confident claims with their evidence before accepting the label.",
    project: "A pattern classifier with a documented boundary case and evidence check.",
    concepts: ["categories", "boundaries", "edge cases", "fairness"],
    evidence: "Document a case your classifier gets wrong and why.",
    sourceMode: "original",
  },
];

export function getLearningModule(slug: string) {
  return learningModules.find((module) => module.slug === slug);
}

