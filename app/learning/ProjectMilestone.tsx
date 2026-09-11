"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { projectKey, readProjectEvidence, recordLearningEvidence, type ProjectEvidenceRecord } from "./learnerState";

const rubric = [
  { id: "claim", label: "Names the claim or label being checked.", missing: "Name the forecast, label, or statement you are checking.", test: (text: string) => /claim|label|statement|forecast/i.test(text) },
  { id: "evidence", label: "Names evidence, a source, or a comparison.", missing: "Name the evidence, source, date, record, or comparison you would inspect.", test: (text: string) => /evidence|source|compare|photograph|date|record/i.test(text) },
  { id: "uncertainty", label: "States uncertainty or a responsible next check.", missing: "Say what you would verify or do if the evidence is incomplete.", test: (text: string) => /uncertain|check|verify|would not trust|need more/i.test(text) },
];

const decisions = {
  check: "Check the evidence before trusting the output",
  ask: "Ask for more context before deciding",
  share: "Share the output as a fact",
} as const;

type ProjectDecision = keyof typeof decisions;

function decisionIsResponsible(decision: ProjectDecision) {
  return decision !== "share";
}

export default function ProjectMilestone({ onComplete }: { onComplete: () => void }) {
  const [draft, setDraft] = useState("");
  const [decision, setDecision] = useState<ProjectDecision>("check");
  const [evaluated, setEvaluated] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const saved = readProjectEvidence();
    if (!saved) return;
    setDraft(saved.draft);
    setDecision(saved.decision);
    setComplete(saved.complete);
  }, []);

  const evaluate = () => {
    const result = rubric.map((item) => ({ id: item.id, passed: item.test(draft) }));
    const decisionPassed = decisionIsResponsible(decision);
    const passed = result.filter((item) => item.passed).length + (decisionPassed ? 1 : 0);
    const record: ProjectEvidenceRecord = {
      schemaVersion: 1,
      draft,
      decision,
      complete: passed === rubric.length + 1,
      rubric: [...result, { id: "decision", passed: decisionPassed }],
      updatedAt: new Date().toISOString(),
    };
    setEvaluated(true);
    setComplete(record.complete);
    window.localStorage.setItem(projectKey, JSON.stringify(record));
    if (record.complete) {
      setFeedback("Your brief connects a claim to evidence, makes a cautious decision, and names a responsible next check. That is applied evidence, not just a correct answer.");
      recordLearningEvidence("classification-and-patterns", "applied");
      onComplete();
    } else {
      setFeedback(`${passed} of ${rubric.length + 1} criteria are present. Use the missing guidance below, then evaluate again.`);
    }
  };

  return <section className="project-milestone" aria-labelledby="project-title">
    <div className="project-heading"><div><p className="eyebrow">Build · a small evidence brief</p><h2 id="project-title">Can you apply the rule to a new claim?</h2></div>{complete && <span className="project-complete"><Check aria-hidden="true" size={15} /> Demonstrated</span>}</div>
    <p className="project-scenario"><strong>Scenario:</strong> Someone shares an AI-style forecast with a confident label. Build a short evidence brief: identify the claim, choose a responsible decision, name what you would inspect, and say what happens if the evidence is incomplete.</p>
    <div className="project-spec"><div><strong>Deliverable</strong><span>2–4 sentences in your own words.</span></div><div><strong>Constraint</strong><span>Do not invent a source or treat confidence as proof.</span></div><div><strong>Optional challenge</strong><span>Name an edge case that could change your decision.</span></div></div>
    <label htmlFor="project-decision">Your decision</label>
    <select id="project-decision" value={decision} onChange={(event) => { setDecision(event.target.value as ProjectDecision); setEvaluated(false); setComplete(false); }}><option value="check">{decisions.check}</option><option value="ask">{decisions.ask}</option><option value="share">{decisions.share}</option></select>
    <p className="project-guidance">A confident output is not proof. Your decision should leave room for evidence and uncertainty.</p>
    <label htmlFor="project-draft">Your evidence brief</label>
    <textarea id="project-draft" value={draft} onChange={(event) => { setDraft(event.target.value); setEvaluated(false); setComplete(false); }} rows={5} placeholder="The claim is… I would inspect… If the evidence is incomplete, I would…" />
    <button className="button" type="button" onClick={evaluate}>{complete ? "Recheck my brief" : "Evaluate my brief"}</button>
    {evaluated && <div className={`project-feedback ${complete ? "success" : "needs-work"}`} role="status"><strong>{complete ? "Capability demonstrated." : "Keep building the evidence."}</strong><p>{feedback}</p><ul>{rubric.map((item) => { const passed = item.test(draft); return <li key={item.id} className={passed ? "passed" : "missing"}>{passed ? "✓" : "○"} {item.label}{!passed && <small> — {item.missing}</small>}</li>; })}<li className={decisionIsResponsible(decision) ? "passed" : "missing"}>{decisionIsResponsible(decision) ? "✓" : "○"} Makes a responsible decision{!decisionIsResponsible(decision) && <small> — choose checking or asking for context</small>}</li></ul></div>}
    <p className="activity-hint">This is a proposed practice project, not an official Foundation assignment or external client brief.</p>
  </section>;
}
