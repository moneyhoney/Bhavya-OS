"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { learningModules } from "./data";
import LearningDesk from "./LearningDesk";

function readCompleted() {
  return learningModules.filter((module) => window.localStorage.getItem(`bhavya-lesson:${module.slug}`) === "complete").map((module) => module.slug);
}

export default function LearningHome() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => setCompleted(readCompleted()), []);
  const percentage = Math.round((completed.length / learningModules.length) * 100);
  const next = learningModules.find((module) => !completed.includes(module.slug)) ?? learningModules[learningModules.length - 1];
  const byConcept = useMemo(() => ["Instructions", "Data", "Patterns", "Evidence"], []);

  return <>
    <LearningDesk />
    <section className="learning-progress shell" aria-labelledby="progress-title"><div><p className="eyebrow">Your local learning path</p><h2 id="progress-title">{completed.length === 0 ? "Begin with one clear idea." : `${completed.length} of ${learningModules.length} modules explored.`}</h2><p>This progress is stored only on this device. It is calculated from completed activities, not from a decorative percentage.</p></div><div className="progress-meter"><strong>{percentage}%</strong><span><i style={{ width: `${percentage}%` }} /></span><small>{completed.length === learningModules.length ? "Foundation path complete" : `Next: ${next.title}`}</small></div></section>
    <section className="learning-path shell" aria-labelledby="path-title"><div className="learning-section-head"><div><p className="eyebrow">A map, not a race</p><h2 id="path-title">Start with the foundations.</h2></div><p>Every module has a different action: arrange, inspect, choose, classify, model, and verify.</p></div><div className="path-levels" aria-label="Proposed progression"><span className="active">Foundation</span><span>Beginner</span><span>Intermediate</span><span>Advanced</span><span>Expert</span></div><div className="module-grid">{learningModules.map((module, index) => { const isDone = completed.includes(module.slug); const isNext = module.slug === next.slug; return <article className={`module-card ${isDone ? "is-complete" : ""}`} key={module.slug}><div className="module-top"><span>Module {module.number}</span><span className="module-dot" aria-hidden="true" /></div><h3>{module.title}</h3><p className="module-objective">{module.objective}</p><div className="module-steps"><span><b>Do</b>{["Arrange instructions", "Explore a dataset", "Choose a next step", "Classify examples", "Change a model", "Verify an output"][index]}</span><span><b>Concepts</b>{module.concepts.join(" · ")}</span></div><div className="module-card-footer"><span className="proposed-tag">{isDone ? "Complete on this device" : isNext ? "Next lesson" : "Proposed · review required"}</span><Link className="card-link" href={`/learning/${module.slug}`}>{isDone ? "Return" : "Open lesson"} <ArrowRight aria-hidden="true" size={14} /></Link></div></article>; })}</div></section>
    <section className="learning-principles shell" aria-labelledby="principles-title"><div><p className="eyebrow">How learning feels</p><h2 id="principles-title">Understand enough to make a move.</h2></div><div className="principle-list"><div><span>01</span><strong>Make it visible</strong><p>Examples become tables, sequences, boundaries, and evidence you can inspect.</p></div><div><span>02</span><strong>Make it yours</strong><p>Change a decision, observe a consequence, and leave a small trail of thinking.</p></div><div><span>03</span><strong>Make it safe</strong><p>Learn to question confident outputs before they become decisions about people or places.</p></div></div></section><section className="learning-concepts shell" aria-label="Concept map"><p className="eyebrow">The thread through the path</p><div>{byConcept.map((concept, index) => <span key={concept}><b>0{index + 1}</b>{concept}</span>)}</div></section>
  </>;
}




