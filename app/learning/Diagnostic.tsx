"use client";

import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { learningModules } from "./data";
import { diagnosticKey, readProfile, recordLearningEvidence } from "./learnerState";

type DiagnosticQuestion = { id: string; slug: string; label: string; prompt: string; type: "choice" | "short"; options?: Array<{ value: string; label: string }>; correct?: string; required?: string[]; hint: string; explanation: string };

const questions: DiagnosticQuestion[] = [
  { id: "system", slug: "what-is-a-computer", label: "Concept", prompt: "Which pair best describes the ends of a computer system?", type: "choice", options: [{ value: "input-output", label: "Input and output" }, { value: "screen-keyboard", label: "Screen and keyboard" }, { value: "memory-internet", label: "Memory and internet" }], correct: "input-output", hint: "Think about what a system receives and what it produces.", explanation: "Input is received by the system; output is the result after instructions work on information." },
  { id: "context", slug: "what-is-data", label: "Scenario", prompt: "A record says only “18”. What would make this observation more useful?", type: "choice", options: [{ value: "context", label: "Add what was measured, where, or when" }, { value: "bigger", label: "Make the number larger" }, { value: "guess", label: "Choose the most likely meaning" }], correct: "context", hint: "A value needs details that another person can inspect.", explanation: "Context turns a bare value into an observation that can be interpreted and checked." },
  { id: "algorithm", slug: "algorithms-and-instructions", label: "Decision", prompt: "A friend cannot follow your instructions. What is the best next move?", type: "choice", options: [{ value: "test", label: "Test the steps with them and revise the unclear step" }, { value: "share", label: "Share it anyway" }, { value: "hide", label: "Remove the instructions" }], correct: "test", hint: "Testing reveals assumptions that the writer may not notice.", explanation: "A repeatable method improves when another person exposes an ambiguous sequence or missing decision." },
  { id: "model", slug: "machine-learning-by-example", label: "Explain", prompt: "In one sentence, how can labelled examples help a model make a prediction?", type: "short", required: ["example", "prediction"], hint: "Use the chain: examples help find a pattern, then the pattern is used on something new.", explanation: "Training examples help a model form a pattern or rule; testing compares its prediction with a known label." },
];

export default function Diagnostic() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [weak, setWeak] = useState<string[]>([]);
  const [strong, setStrong] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("Learner");
  const [completed, setCompleted] = useState(false);
  useEffect(() => setName(readProfile().name.trim() || "Learner"), []);

  const question = questions[index];
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = answer.toLowerCase();
    const isCorrect = question.type === "choice" ? answer === question.correct : (question.required ?? []).every((term) => normalized.includes(term));
    setSubmitted(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      setScore((value) => value + 1);
      setStrong((values) => values.includes(question.slug) ? values : [...values, question.slug]);
      recordLearningEvidence(question.slug, weak.includes(question.slug) ? "retry" : "recalled");
      if (weak.includes(question.slug)) recordLearningEvidence(question.slug, "recalled");
    } else {
      setWeak((values) => values.includes(question.slug) ? values : [...values, question.slug]);
      recordLearningEvidence(question.slug, "hint");
    }
  };

  const next = () => {
    if (index === questions.length - 1) {
      const finalWeak = !correct && !weak.includes(question.slug) ? [...weak, question.slug] : weak;
      const finalStrong = correct && !strong.includes(question.slug) ? [...strong, question.slug] : strong;
      const nextWeak = finalWeak.length > 0 ? finalWeak : questions.filter((item) => !finalStrong.includes(item.slug)).map((item) => item.slug);
      window.localStorage.setItem(diagnosticKey, JSON.stringify({ completedAt: new Date().toISOString(), score: score + (correct ? 1 : 0), total: questions.length, weakSlugs: nextWeak, strongSlugs: finalStrong }));
      setWeak(finalWeak);
      setStrong(finalStrong);
      setCompleted(true);
      return;
    }
    setIndex((value) => value + 1);
    setAnswer("");
    setSubmitted(false);
    setCorrect(false);
  };

  const restart = () => { setIndex(0); setAnswer(""); setSubmitted(false); setCorrect(false); setWeak([]); setStrong([]); setScore(0); setCompleted(false); };
  const recommended = learningModules.find((module) => weak.includes(module.slug)) ?? learningModules.find((module) => !strong.includes(module.slug)) ?? learningModules[0];

  if (completed) return <main className="diagnostic-page learning-page"><header className="learning-header shell"><Link href="/learning" className="back-link">← Learning path</Link><span className="learning-status">Diagnostic complete</span></header><section className="diagnostic-result shell"><p className="eyebrow">A useful starting signal</p><h1>{name}, you have a place to begin.</h1><p className="diagnostic-score">{score} of {questions.length} checkpoints matched on this attempt.</p><p>This is a short orientation, not a validated assessment or a measure of your potential. It found the next concept worth practicing so your path can respond to evidence.</p><div className="diagnostic-recommendation"><p className="eyebrow">Recommended next practice</p><h2>{recommended.title}</h2><p>{weak.length > 0 ? "This concept needs another explanation and a retry." : "You can move toward a new application while keeping this concept available for review."}</p><Link className="button" href="/learning/coach">Practice with the coach <ArrowRight aria-hidden="true" size={15} /></Link></div><div className="diagnostic-result-actions"><Link className="button light" href={`/learning/${recommended.slug}`}>Open the lesson</Link><button className="text-button" type="button" onClick={restart}><RotateCcw aria-hidden="true" size={14} /> Try the diagnostic again</button></div></section></main>;

  return <main className="diagnostic-page learning-page"><header className="learning-header shell"><Link href="/learning" className="back-link">← Learning path</Link><span className="learning-status">Optional diagnostic · {index + 1} / {questions.length}</span></header><section className="diagnostic-intro shell"><p className="eyebrow">Orient · a short starting check</p><h1>Find the next useful <em>question</em>.</h1><p>This four-question check samples concepts from the proposed Foundation path. Try before you look anything up. A miss creates targeted practice; a match reduces repetition.</p><div className="diagnostic-progress" aria-label={`Question ${index + 1} of ${questions.length}`}><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div></section><section className="diagnostic-card shell"><p className="eyebrow">{question.label} · {question.slug.replaceAll("-", " ")}</p><h2>{question.prompt}</h2><form onSubmit={submit}>{question.type === "choice" ? <div className="diagnostic-options">{question.options?.map((option) => <label key={option.value} className={answer === option.value ? "selected" : ""}><input type="radio" name={question.id} value={option.value} checked={answer === option.value} onChange={(event) => setAnswer(event.target.value)} disabled={submitted} />{option.label}</label>)}</div> : <textarea id="diagnostic-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} placeholder="Explain it in your own words…" disabled={submitted} required />}{!submitted ? <button className="button" type="submit">Check my thinking <ArrowRight aria-hidden="true" size={15} /></button> : <div className={`diagnostic-feedback ${correct ? "correct" : "hint"}`} role="status"><strong>{correct ? "This checkpoint matches." : "Not yet — use the hint and try again."}</strong><p>{correct ? question.explanation : question.hint}</p>{correct ? <button className="button" type="button" onClick={next}>{index === questions.length - 1 ? "See my recommendation" : "Next checkpoint"} <ArrowRight aria-hidden="true" size={15} /></button> : <button className="button light" type="button" onClick={() => { setSubmitted(false); setAnswer(""); }}>Try again</button>}</div>}</form></section><p className="diagnostic-note shell">No account is required. This result stays on this device and does not claim official Foundation assessment.</p></main>;
}
