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

export type ExplanationDepth = "simple" | "practical" | "technical";
export type LessonDepthContent = Record<ExplanationDepth, string>;

/** Original explanations that change vocabulary, context, and mechanism - not just length. */
export const lessonDepthContent: Record<string, LessonDepthContent> = {
  "what-is-a-computer": {
    simple: "Think of a phone as a careful helper. It receives something, follows steps, remembers information for a while, and gives you a result. A photo starts as light entering the camera and ends as a picture on the screen.",
    practical: "When you take a photo, the camera receives light, the phone follows image-processing instructions, stores the picture, and shows it back to you. If the lens is covered, changing the instructions cannot recover the missing input.",
    technical: "A computer is a programmable information-processing system. Inputs change its state; instructions transform data in memory; outputs expose the resulting state. Separating input, processing, storage, and output helps you diagnose where a system failed.",
  },
  "what-is-data": {
    simple: "Data is a recorded observation. The number 18 is only a clue until we know 18 what, where, and when. Context helps us read an observation without guessing.",
    practical: "Imagine recording rainfall each morning. Keep the value, unit, date, and place together. Two readings can be compared carefully only when you know they were measured in a comparable way; a missing unit can change the story.",
    technical: "A useful dataset gives observations a schema: fields, units, labels, and collection context. Features describe an example, while a label names the category or outcome we are studying. Sampling and missing values limit which claims the data can support.",
  },
  "algorithms-and-instructions": {
    simple: "An algorithm is a set of steps for getting something done. The order matters, and another person should be able to follow the steps without reading your mind. Testing shows where a step is unclear.",
    practical: "For a route to a water tap, say where to put the cup, when to turn the tap on, and when to stop. Ask someone else to follow it. If they pause or choose a different step, revise the instruction instead of blaming the reader.",
    technical: "An algorithm defines a sequence of operations, decisions, and stopping conditions. Preconditions describe what must be true before a step; postconditions describe the expected result. Testing exposes hidden assumptions and supports iterative refinement.",
  },
  "what-is-ai": {
    simple: "Many AI systems use examples to notice patterns and make a prediction. A prediction can be useful, but it is not a person and it is not automatically true. Someone still needs to check whether the answer fits the situation.",
    practical: "Suppose a system groups sounds or images. Look at the examples it learned from, ask what pattern it may be using, and check a new result against the real situation. A useful output is a starting point for a decision, not the whole decision.",
    technical: "AI is a broad field that includes systems for recognition, prediction, search, and generation. A model maps inputs to outputs using a designed procedure or learned parameters. Its behavior depends on data, objective, context, and evaluation, so performance can fail outside its examples.",
  },
  "machine-learning-by-example": {
    simple: "A machine-learning model looks at labelled examples, finds a pattern, and uses that pattern to guess about a new example. When the guess is wrong, comparing it with the label gives a clue about what to improve.",
    practical: "In the toy leaf activity, moving the threshold changes which scores count as a leaf. A lower threshold may catch more leaves but also include more non-leaves. Compare the errors, not just the number, before choosing a setting.",
    technical: "Training uses labelled examples to fit a model; inference applies the learned rule to new inputs. A decision threshold changes false positives and false negatives. Testing on held-out or new examples helps reveal whether the model generalizes rather than memorizes.",
  },
  "classification-and-patterns": {
    simple: "Classification means choosing a label for something. A label is a useful decision, not a fact stamped onto the world. When an example does not fit clearly, pause and ask what evidence is missing.",
    practical: "If an AI-style answer calls a claim trustworthy, inspect the source, date, evidence, and uncertainty. Marking a claim as 'check first' is not failure; it is a responsible response when the evidence does not support confidence.",
    technical: "A classifier divides a feature space into categories using a decision boundary. Edge cases sit near or outside that boundary, where small changes in evidence can change the label. Evaluation should inspect error types and the evidence available for each decision, not only overall accuracy.",
  },
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

export function explanationAtDepth(slug: string, depth: ExplanationDepth) {
  return lessonDepthContent[slug]?.[depth] ?? "";
}

