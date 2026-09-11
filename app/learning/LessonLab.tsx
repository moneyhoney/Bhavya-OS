"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { learningModules, type LearningModule } from "./data";
import ProjectMilestone from "./ProjectMilestone";
import { capabilityFor, recordLearningEvidence } from "./learnerState";

type LessonLabProps = { module: LearningModule };

const sequenceAnswer = ["place", "on", "wait", "off"];
const sequenceLabels: Record<string, string> = { place: "Place the cup under the tap", on: "Turn the tap on", wait: "Wait until the cup is full", off: "Turn the tap off" };
const examples = [
  { id: "a", label: "A weather station records rainfall each morning.", category: "data" },
  { id: "b", label: "A person follows a recipe step by step.", category: "instructions" },
  { id: "c", label: "A system finds patterns in labelled examples.", category: "ai" },
  { id: "d", label: "A book rests on a wooden table.", category: "not-ai" },
];
const datasetRows = [
  { id: "rain-1", observation: "Morning rainfall", value: 12, displayValue: "12 mm", context: "Monday", category: "rainfall" },
  { id: "rain-2", observation: "Morning rainfall", value: 4, displayValue: "4 mm", context: "Tuesday", category: "rainfall" },
  { id: "temp-1", observation: "Midday temperature", value: 18, displayValue: "18 °C", context: "Monday", category: "temperature" },
  { id: "temp-2", observation: "Midday temperature", value: 21, displayValue: "21 °C", context: "Tuesday", category: "temperature" },
  { id: "soil-1", observation: "Soil moisture", value: 63, displayValue: "63%", context: "Monday", category: "soil" },
];
const trustClaims = [
  { id: "temperature", claim: "The village will be exactly 24°C tomorrow.", evidence: "The output gives a precise number but names no source, date, or uncertainty.", answer: "check" },
  { id: "river", claim: "The river is flowing east in this photograph.", evidence: "The image shows a visible current and a compass direction is supplied by the observer.", answer: "trust" },
  { id: "history", claim: "This local tradition is more than 1,000 years old.", evidence: "The sentence gives no primary record or named historian to inspect.", answer: "check" },
];

export default function LessonLab({ module }: LessonLabProps) {
  const [done, setDone] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [activityComplete, setActivityComplete] = useState(false);
  const [reflection, setReflection] = useState("");
  const [projectComplete, setProjectComplete] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setDone(window.localStorage.getItem(`bhavya-lesson:${module.slug}`) === "complete");
    setAttempted(window.localStorage.getItem(`bhavya-attempt:${module.slug}`) === "started");
    setActivityComplete(window.localStorage.getItem(`bhavya-activity:${module.slug}`) === "complete");
    setReflection(window.localStorage.getItem(`bhavya-reflection:${module.slug}`) ?? "");
    setProjectComplete(module.slug !== "classification-and-patterns" || window.localStorage.getItem("bhavya-project:classification-and-patterns") === "complete");
    setHydrated(true);
  }, [module.slug]);
  const markAttempted = () => {
    window.localStorage.setItem(`bhavya-attempt:${module.slug}`, "started");
    const prior = capabilityFor(module.slug);
    recordLearningEvidence(module.slug, prior.attempts > 0 && prior.demonstrations === 0 ? "hint" : "attempted");
    setAttempted(true);
  };
  const finish = () => {
    if (!activityComplete || reflection.trim().length < 12 || !projectComplete) return;
    window.localStorage.setItem(`bhavya-lesson:${module.slug}`, "complete");
    recordLearningEvidence(module.slug, "demonstrated");
    setDone(true);
  };
  const reflectionReady = reflection.trim().length >= 12;

  const nextModule = learningModules.find((candidate) => candidate.number === String(Number(module.number) + 1).padStart(2, "0"));
  return <div className="lesson-lab" data-learning-hydrated={hydrated ? "true" : "false"}>
    <div className="lesson-flow" aria-label="Lesson flow"><span>Understand</span><span>Observe</span><span>Try</span><span>Experiment</span><span>Reflect</span></div>
    <section className="lesson-intro"><p className="eyebrow">Why this matters</p><h2>{module.objective}</h2><p>{module.explanation}</p><div className="lesson-context"><div><strong>Before you begin</strong><span>{module.prerequisite}</span></div><div><strong>Example</strong><span>{module.example}</span></div><div><strong>Model</strong><span>{module.visual}</span></div></div></section>
    <Interaction module={module} onAttempt={markAttempted} onComplete={() => {
      window.localStorage.setItem(`bhavya-activity:${module.slug}`, "complete");
      recordLearningEvidence(module.slug, "demonstrated");
      setActivityComplete(true);
    }} />
    {module.slug === "classification-and-patterns" && <ProjectMilestone onComplete={() => setProjectComplete(true)} />}
    <section className="lesson-reflection"><p className="eyebrow">Reflect · leave a trail</p><h2>What would you test next?</h2><p>Write one thing you would change, measure, or verify if you continued this investigation. This note stays on this device and helps you remember your reasoning.</p><label htmlFor="lesson-reflection">Your reflection <span>(at least 12 characters)</span></label><textarea id="lesson-reflection" value={reflection} onChange={(event) => { setReflection(event.target.value); window.localStorage.setItem(`bhavya-reflection:${module.slug}`, event.target.value); }} rows={4} placeholder={module.nextStep} /><p className="reflection-status" role="status">{reflectionReady ? "Reflection saved. You can complete this lesson." : `${Math.max(0, 12 - reflection.trim().length)} more characters to unlock completion.`}</p></section>
    <div className="lesson-completion"><div><p className="eyebrow">Completion</p><strong>{done ? "Lesson complete on this device" : !projectComplete ? "Apply the evidence rule in the project" : activityComplete && reflectionReady ? "Activity, application, and reflection complete" : activityComplete ? "Add a short reflection to finish" : attempted ? "Keep working until the activity is complete" : "Start the activity to begin"}</strong><p>{done ? "Your progress is saved locally. You can return or continue to the next topic." : !projectComplete ? "Your lesson evidence is ready; now demonstrate the rule in a new claim." : activityComplete && reflectionReady ? `Ready to continue: ${module.nextStep}` : activityComplete ? `One last step: ${module.nextStep}` : attempted ? "Use the feedback to revise your thinking. Completion unlocks after you meet this activity's learning condition." : "There is no score to chase. Make a choice, inspect the feedback, and leave evidence of your thinking."}</p></div><div className="completion-actions"><button className="button" type="button" onClick={finish} disabled={done || !activityComplete || !reflectionReady || !projectComplete}>{done ? "Completed" : "Mark complete"}</button>{nextModule && <Link className="button light" href={`/learning/${nextModule.slug}`}>Next lesson →</Link>}</div></div>
  </div>;
}

function Interaction({ module, onAttempt, onComplete }: { module: LearningModule; onAttempt: () => void; onComplete: () => void }) {
  switch (module.slug) {
    case "what-is-a-computer": return <SequenceActivity onAttempt={onAttempt} onComplete={onComplete} />;
    case "what-is-data": return <DatasetActivity onAttempt={onAttempt} onComplete={onComplete} />;
    case "algorithms-and-instructions": return <DecisionActivity onAttempt={onAttempt} onComplete={onComplete} />;
    case "what-is-ai": return <ClassificationActivity onAttempt={onAttempt} onComplete={onComplete} />;
    case "machine-learning-by-example": return <ModelActivity onAttempt={onAttempt} onComplete={onComplete} />;
    case "classification-and-patterns": return <VerificationActivity onAttempt={onAttempt} onComplete={onComplete} />;
    default: return null;
  }
}

function ActivityFrame({ eyebrow, title, children, feedback }: { eyebrow: string; title: string; children: React.ReactNode; feedback?: string }) {
  return <section className="activity-frame"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}{feedback && <p className="activity-feedback" role="status">{feedback}</p>}</section>;
}

function SequenceActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [items, setItems] = useState(["on", "place", "off", "wait"]);
  const [feedback, setFeedback] = useState("");
  const move = (index: number, direction: -1 | 1) => { const next = [...items]; const target = index + direction; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; setItems(next); setFeedback(""); };
  const check = () => { onAttempt(); const correct = items.every((item, index) => item === sequenceAnswer[index]); if (correct) onComplete(); setFeedback(correct ? "The sequence works: the cup is in place before water flows, and the tap is turned off after the cup is full. You used order to express cause and effect." : "Not yet. Water cannot fill the cup until the cup is under the tap, and leaving the tap on wastes water. Move the steps, then test again."); };
  return <ActivityFrame eyebrow="Try it · arrange instructions" title="Can you make a cup-filling instruction sequence?" feedback={feedback}><p>Move each instruction up or down. A computer follows the order you give it; it does not fill in missing steps by itself.</p><div className="sequence-list">{items.map((item, index) => <div className="sequence-row" key={item}><span className="sequence-index">{index + 1}</span><span>{sequenceLabels[item]}</span><button type="button" aria-label={`Move step ${index + 1} up`} onClick={() => move(index, -1)}>↑</button><button type="button" aria-label={`Move step ${index + 1} down`} onClick={() => move(index, 1)}>↓</button></div>)}</div><button className="button" type="button" onClick={check}>Test the sequence</button></ActivityFrame>;
}

function DatasetActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [group, setGroup] = useState<"all" | "rainfall" | "temperature" | "soil">("all");
  const [sortHigh, setSortHigh] = useState(false);
  const visible = useMemo(() => {
    const grouped = group === "all" ? datasetRows : datasetRows.filter((row) => row.category === group);
    return [...grouped].sort((a, b) => sortHigh ? b.value - a.value : a.value - b.value);
  }, [group, sortHigh]);
  const counts = useMemo(() => datasetRows.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.category]: (acc[row.category] ?? 0) + 1 }), {}), []);
  const explore = (nextGroup: typeof group) => { onAttempt(); if (nextGroup !== "all") onComplete(); setGroup(nextGroup); };
  return <ActivityFrame eyebrow="Observe · explore a small dataset" title="What changes when you group observations?" ><p>This is a small invented dataset for practice, not Foundation data. A value becomes more useful when you can see its context. Filter by a category, then sort the values and describe one pattern you notice.</p><div className="filter-row" aria-label="Group observations">{["all", "rainfall", "temperature", "soil"].map((value) => <button className={group === value ? "is-active" : ""} type="button" key={value} onClick={() => explore(value as typeof group)}>{value}</button>)}<button type="button" onClick={() => { onAttempt(); onComplete(); setSortHigh((current) => !current); }}>{sortHigh ? "Sort low → high" : "Sort high → low"}</button></div><div className="dataset-table" role="table" aria-label="Example observations"><div className="dataset-row dataset-head" role="row"><span>Observation</span><span>Value · context</span></div>{visible.map((row) => <div className="dataset-row" role="row" key={row.id}><span>{row.observation}</span><strong>{row.displayValue} · {row.context}</strong></div>)}</div><p className="dataset-summary">Showing {visible.length} of {datasetRows.length} observations. Groups: {counts.rainfall} rainfall · {counts.temperature} temperature · {counts.soil} soil moisture.</p><p className="activity-hint">Completion condition: filter at least one named group and compare its values and context with the full set.</p></ActivityFrame>;
}

function DecisionActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  const feedback = choice === "test" ? "Good algorithmic thinking: testing before sharing catches an unclear step." : choice === "share" ? "Pause first. An algorithm is only useful when another person can follow it reliably." : "";
  return <ActivityFrame eyebrow="Try it · choose a next step" title="Your instructions confuse a friend. What should happen next?" feedback={feedback}><p>The recipe has a step that says “prepare the thing.” Your friend cannot tell what that means.</p><div className="choice-grid"><button className={choice === "test" ? "is-selected" : ""} type="button" onClick={() => { onAttempt(); onComplete(); setChoice("test"); }}>Test it with another person</button><button className={choice === "share" ? "is-selected" : ""} type="button" onClick={() => { onAttempt(); setChoice("share"); }}>Share it and hope they understand</button></div></ActivityFrame>;
}

function ClassificationActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const submit = () => { onAttempt(); const correct = examples.filter((example) => answers[example.id] === example.category).length; const answered = examples.filter((example) => answers[example.id]).length; if (answered === examples.length && correct === examples.length) onComplete(); setFeedback(answered < examples.length ? `You have classified ${answered} of ${examples.length}. Make a choice for every example, then compare the rule.` : correct === examples.length ? `All ${examples.length} classifications match the concept. The useful part is the rule: a person can inspect why each example belongs, especially at the boundary.` : `${correct} of ${examples.length} classifications match. Check the example labels again: a weather station collects data, a recipe is an instruction, pattern-finding from labelled examples is AI, and a book resting on a table is neither.`); };
  return <ActivityFrame eyebrow="Try it · classify examples" title="Which examples involve an AI system?" feedback={feedback}><p>Choose a label for each example. The aim is not to guess a magic answer; it is to explain the rule you used.</p><div className="classification-list">{examples.map((example) => <div key={example.id}><span>{example.label}</span><select aria-label={`Classify ${example.label}`} value={answers[example.id] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [example.id]: event.target.value }))}><option value="">Choose…</option><option value="ai">AI or pattern finding</option><option value="not-ai">Not AI</option><option value="data">Data collection</option><option value="instructions">Instructions</option></select></div>)}</div><button className="button" type="button" onClick={submit}>Compare my rule</button></ActivityFrame>;
}

function ModelActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [threshold, setThreshold] = useState(50);
  const points = [{ score: 22, actual: "not leaf" }, { score: 41, actual: "leaf" }, { score: 63, actual: "leaf" }, { score: 78, actual: "leaf" }, { score: 88, actual: "not leaf" }];
  const results = points.map((point) => ({ ...point, prediction: point.score >= threshold ? "leaf" : "not leaf" }));
  const errors = results.filter((point) => point.prediction !== point.actual).length;
  return <ActivityFrame eyebrow="Experiment · change the model" title="Move the decision boundary and watch errors change."><p>A toy model gives each example a pattern score. It predicts “leaf” when the score reaches your threshold. This is a simulation, not a real plant-recognition model.</p><label className="range-label" htmlFor="threshold">Leaf threshold: <strong>{threshold}</strong><input id="threshold" type="range" min="10" max="90" value={threshold} onChange={(event) => { onAttempt(); onComplete(); setThreshold(Number(event.target.value)); }} /></label><div className="prediction-plot" aria-label={`Model has ${errors} errors`}><span className="plot-line" style={{ left: `${threshold}%` }} />{results.map((point, index) => <span className={`plot-point ${point.prediction === point.actual ? "right" : "wrong"}`} style={{ left: `${point.score}%`, bottom: `${30 + index * 12}%` }} key={`${point.score}-${point.actual}`} title={`${point.actual}; predicted ${point.prediction}`} />)}</div><p className="dataset-summary">{errors} of {points.length} examples are misclassified at this threshold. Try moving the slider: a change that helps one example can harm another.</p><p className="activity-hint">Green points match the labelled examples; rust points are errors. A lower error count is not the same as a trustworthy model: inspect which examples are wrong.</p></ActivityFrame>;
}

function VerificationActivity({ onAttempt, onComplete }: { onAttempt: () => void; onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const submit = () => { onAttempt(); const correct = trustClaims.filter((claim) => answers[claim.id] === claim.answer).length; const answered = trustClaims.filter((claim) => answers[claim.id]).length; if (answered === trustClaims.length && correct === trustClaims.length) onComplete(); setFeedback(answered < trustClaims.length ? `Review all ${trustClaims.length} claims before submitting. Evidence checking is a complete comparison, not a guess.` : correct === trustClaims.length ? `All ${trustClaims.length} decisions match the evidence. The questionable claims lack a source, date, or uncertainty; the photograph claim has evidence that supports it. Confidence is not proof.` : `${correct} of ${trustClaims.length} decisions match. Recheck the evidence: a precise forecast and an old-tradition claim need sources, dates, or uncertainty before trust.`); };
  return <ActivityFrame eyebrow="Reflect · verify an output" title="Should you trust this statement yet?" feedback={feedback}><p>An AI-style answer can sound certain and still need checking. Compare each claim with its evidence before deciding.</p><div className="verification-list">{trustClaims.map((claim) => <div key={claim.id}><strong>“{claim.claim}”</strong><p>{claim.evidence}</p><div className="choice-grid"><button className={answers[claim.id] === "trust" ? "is-selected" : ""} type="button" onClick={() => setAnswers((current) => ({ ...current, [claim.id]: "trust" }))}>Trust for now</button><button className={answers[claim.id] === "check" ? "is-selected" : ""} type="button" onClick={() => setAnswers((current) => ({ ...current, [claim.id]: "check" }))}>Check first</button></div></div>)}</div><button className="button" type="button" onClick={submit}>Review my decisions</button></ActivityFrame>;
}


