"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { projectKey, recordLearningEvidence } from "./learnerState";

const rubric = [
  { id: "claim", label: "Names the claim or label being checked.", test: (text: string) => /claim|label|statement|forecast/i.test(text) },
  { id: "evidence", label: "Names evidence, a source, or a comparison.", test: (text: string) => /evidence|source|compare|photograph|date|record/i.test(text) },
  { id: "uncertainty", label: "States uncertainty or a responsible next check.", test: (text: string) => /uncertain|check|verify|would not trust|need more/i.test(text) },
];

export default function ProjectMilestone({ onComplete }: { onComplete: () => void }) {
  const [draft, setDraft] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(projectKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { draft?: string; complete?: boolean };
      setDraft(parsed.draft ?? "");
      setComplete(Boolean(parsed.complete));
    } catch {
      window.localStorage.removeItem(projectKey);
    }
  }, []);

  const evaluate = () => {
    const result = rubric.map((item) => ({ ...item, passed: item.test(draft) }));
    const passed = result.filter((item) => item.passed).length;
    setEvaluated(true);
    if (passed === rubric.length) {
      setComplete(true);
      setFeedback("Your brief connects a claim to evidence and names a responsible next check. That is applied evidence, not just a correct answer.");
      window.localStorage.setItem(projectKey, JSON.stringify({ draft, complete: true, rubric: result.map(({ id, passed }) => ({ id, passed })) }));
      recordLearningEvidence("classification-and-patterns", "applied");
      onComplete();
    } else {
      setComplete(false);
      setFeedback(`${passed} of ${rubric.length} criteria are present. Add the missing reasoning, then evaluate again.`);
      window.localStorage.setItem(projectKey, JSON.stringify({ draft, complete: false, rubric: result.map(({ id, passed }) => ({ id, passed })) }));
    }
  };

  return <section className="project-milestone" aria-labelledby="project-title"><div className="project-heading"><div><p className="eyebrow">Build · a small evidence brief</p><h2 id="project-title">Can you apply the rule to a new claim?</h2></div>{complete && <span className="project-complete"><Check aria-hidden="true" size={15} /> Demonstrated</span>}</div><p className="project-scenario"><strong>Scenario:</strong> Someone shares an AI-style forecast with a confident label. Write a short evidence brief that says what the claim is, what evidence you would inspect, and what you would do if the evidence is incomplete.</p><div className="project-spec"><div><strong>Deliverable</strong><span>2–4 sentences in your own words.</span></div><div><strong>Constraint</strong><span>Do not invent a source or treat confidence as proof.</span></div><div><strong>Optional challenge</strong><span>Name an edge case that could change your decision.</span></div></div><label htmlFor="project-draft">Your evidence brief</label><textarea id="project-draft" value={draft} onChange={(event) => { setDraft(event.target.value); setEvaluated(false); setComplete(false); }} rows={5} placeholder="The claim is… I would inspect… If the evidence is incomplete, I would…" /><button className="button" type="button" onClick={evaluate}>{complete ? "Recheck my brief" : "Evaluate my brief"}</button>{evaluated && <div className={`project-feedback ${complete ? "success" : "needs-work"}`} role="status"><strong>{complete ? "Capability demonstrated." : "Keep building the evidence."}</strong><p>{feedback}</p><ul>{rubric.map((item) => <li key={item.id} className={item.test(draft) ? "passed" : "missing"}>{item.test(draft) ? "✓" : "○"} {item.label}</li>)}</ul></div>}<p className="activity-hint">This is a proposed practice project, not an official Foundation assignment or external client brief.</p></section>;
}
