"use client";

import Link from "next/link";
import { ArrowRight, Compass, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { capabilityStatements, learningDecision, type LearningDecision, weakCapabilitySlugs } from "./learnerState";

const stageLabels = { seen: "Not started", attempted: "Practicing", understood: "Understood", practiced: "Practiced", applied: "Applied", demonstrated: "Demonstrated" } as const;

export default function CapabilityPanel() {
  const [statements, setStatements] = useState<ReturnType<typeof capabilityStatements>>([]);
  const [weak, setWeak] = useState<string[]>([]);
  const [decision, setDecision] = useState<LearningDecision>(learningDecision());
  useEffect(() => { setStatements(capabilityStatements()); setWeak(weakCapabilitySlugs()); setDecision(learningDecision()); }, []);
  const visible = statements.filter((item) => item.stage !== "seen").slice(0, 3);
  return <section className="capability-panel shell" aria-labelledby="capability-title"><div className="capability-heading"><div><p className="eyebrow">Evidence of capability</p><h2 id="capability-title">What you can do is more useful than a score.</h2><p>These statements come from actual attempts, hints, recalls, and applications on this device. They are learning signals, not validated mastery claims.</p></div><Target aria-hidden="true" size={27} /></div><div className="capability-grid"><div className="capability-list">{visible.length > 0 ? visible.map((item) => <div className="capability-item" key={item.slug}><span>{stageLabels[item.stage]}</span><strong>{item.statement}</strong></div>) : <div className="capability-empty"><Compass aria-hidden="true" size={20} /><strong>Your first capability evidence will appear here.</strong><p>Start a lesson or take the optional diagnostic to create a useful signal.</p></div>}</div><div className="capability-next"><p className="eyebrow">Recommended evidence</p><h3>{weak.length > 0 ? "Strengthen a weak concept" : decision.heading}</h3><p>{weak.length > 0 ? "A hint or missed checkpoint is a reason for targeted practice, not a permanent label." : decision.description}</p><Link className="button" href={weak.length > 0 ? "/learning/coach/" : decision.href}>{weak.length > 0 ? "Target the weak spot" : decision.action} <ArrowRight aria-hidden="true" size={15} /></Link></div></div></section>;
}
