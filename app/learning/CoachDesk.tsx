"use client";

import Link from "next/link";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { defaultProfile, goalLabels, coachCompleteKey, coachMissKey, coachPrompts, LearnerProfile, learnerProfileKey, readProfile, recommendedModule, reviewKey } from "./learnerState";
import { learningModules } from "./data";

function saveProfile(profile: LearnerProfile) {
  window.localStorage.setItem(learnerProfileKey, JSON.stringify(profile));
}

export default function CoachDesk() {
  const [profile, setProfile] = useState(defaultProfile);
  const [targetSlug, setTargetSlug] = useState("");
  const [depth, setDepth] = useState<"simple" | "practical" | "technical">("simple");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "hint" | "success"; text: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [savedProfile, setSavedProfile] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setTargetSlug(recommendedModule().slug);
  }, []);

  const target = learningModules.find((module) => module.slug === targetSlug) ?? learningModules[0];
  const prompt = coachPrompts[target.slug];
  const coachName = profile.name.trim() || "Learner";
  const dueAt = typeof window !== "undefined" ? Number(window.localStorage.getItem(reviewKey(target.slug)) ?? 0) : 0;
  const isReview = dueAt > 0 && dueAt <= Date.now();
  const depthCopy = prompt[depth];
  const missCount = typeof window !== "undefined" ? Number(window.localStorage.getItem(coachMissKey(target.slug)) ?? 0) : 0;

  const moduleOptions = useMemo(() => learningModules.map((module) => ({ ...module, completed: typeof window !== "undefined" && window.localStorage.getItem(coachCompleteKey(module.slug)) === "complete" })), []);

  const handleProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveProfile(profile);
    setSavedProfile(true);
    window.setTimeout(() => setSavedProfile(false), 2200);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = answer.toLowerCase();
    const missing = prompt.required.filter((term) => !normalized.includes(term));
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (missing.length > 0) {
      const nextMisses = missCount + 1;
      window.localStorage.setItem(coachMissKey(target.slug), String(nextMisses));
      setFeedback({ kind: "hint", text: `You have a useful start. Look again for ${missing.join(" and ")}. ${prompt.hint}` });
      return;
    }
    window.localStorage.setItem(coachCompleteKey(target.slug), "complete");
    window.localStorage.setItem(reviewKey(target.slug), String(Date.now() + 3 * 24 * 60 * 60 * 1000));
    setFeedback({ kind: "success", text: prompt.explain });
  };

  const reset = () => {
    setAnswer("");
    setFeedback(null);
    setAttempts(0);
  };

  return <>
    <section className="coach-intro shell">
      <div>
        <p className="eyebrow">Local learning coach · no account required</p>
        <h1>Think it through with <em>one question</em> at a time.</h1>
        <p>This is an offline-first practice coach, not a chatbot or an official source of Foundation information. It uses your saved learning signals to choose a small question, offer a hint after a mistake, and schedule a later recall.</p>
      </div>
      <div className="coach-signal"><Sparkles aria-hidden="true" size={18} /><span>{isReview ? "Review is due" : "Today's focus"}</span><strong>{target.title}</strong><small>{goalLabels[profile.goal]}</small></div>
    </section>

    <section className="coach-layout shell" aria-label="Learning coach">
      <aside className="coach-profile">
        <p className="eyebrow">Your learning setup</p>
        <h2>{coachName}, make the next step fit.</h2>
        <p>Keep this small. The setup stays only on this device and changes the wording of your plan, not your access to learning.</p>
        <form onSubmit={handleProfile} className="coach-form">
          <label htmlFor="learner-name">Preferred name <span>optional</span></label>
          <input id="learner-name" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder="What should we call you?" />
          <label htmlFor="learner-goal">Your goal</label>
          <select id="learner-goal" value={profile.goal} onChange={(event) => setProfile({ ...profile, goal: event.target.value as LearnerProfile["goal"] })}>{Object.entries(goalLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>
          <label htmlFor="learner-minutes">Time today</label>
          <select id="learner-minutes" value={profile.minutes} onChange={(event) => setProfile({ ...profile, minutes: event.target.value as LearnerProfile["minutes"] })}><option value="10">10 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option></select>
          <label htmlFor="learner-device">Usual device</label>
          <select id="learner-device" value={profile.device} onChange={(event) => setProfile({ ...profile, device: event.target.value as LearnerProfile["device"] })}><option value="phone">Phone</option><option value="computer">My computer</option><option value="shared-computer">Shared computer</option></select>
          <button className="button" type="submit">Save my setup <Check aria-hidden="true" size={15} /></button>
          {savedProfile && <p className="coach-saved" role="status">Saved on this device.</p>}
        </form>
      </aside>

      <div className="coach-session">
        <div className="coach-session-top"><div><p className="eyebrow">{isReview ? "Retrieve · then explain" : "Understand · then answer"}</p><h2>{isReview ? "What do you still remember?" : "A focused checkpoint"}</h2></div><span className="coach-attempts">{attempts === 0 ? "New checkpoint" : `${attempts} attempt${attempts === 1 ? "" : "s"}`}</span></div>
        <label className="coach-select-label" htmlFor="coach-topic">Focus concept</label>
        <select id="coach-topic" className="coach-topic" value={target.slug} onChange={(event) => { setTargetSlug(event.target.value); reset(); }}>{moduleOptions.map((module) => <option value={module.slug} key={module.slug}>{module.completed ? "✓ " : ""}{module.title}</option>)}</select>
        <div className="coach-question"><p className="eyebrow">Question for {coachName}</p><h3>{prompt.question}</h3><div className="depth-tabs" role="tablist" aria-label="Explanation depth">{(["simple", "practical", "technical"] as const).map((value) => <button type="button" role="tab" aria-selected={depth === value} className={depth === value ? "is-active" : ""} onClick={() => setDepth(value)} key={value}>{value}</button>)}</div><p className="depth-copy">{depthCopy}</p></div>
        <form className="coach-answer" onSubmit={submit}><label htmlFor="coach-answer">Your explanation <span>There is no perfect wording.</span></label><textarea id="coach-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} placeholder="Explain what you think, in your own words…" required /><button className="button" type="submit">{feedback?.kind === "hint" ? "Try again" : "Check my thinking"} <ArrowRight aria-hidden="true" size={15} /></button></form>
        {feedback && <div className={`coach-feedback ${feedback.kind}`} role="status"><strong>{feedback.kind === "success" ? "Your reasoning is moving." : "Pause and look again."}</strong><p>{feedback.text}</p>{feedback.kind === "hint" && attempts > 1 && <p className="coach-smaller-step">Smaller step: use the explanation above, then write one sentence that includes the missing idea.</p>}{feedback.kind === "success" && <><p className="coach-next"><Check aria-hidden="true" size={16} /> Review saved for three days from now.</p><Link className="text-link" href={`/learning/${target.slug}`}>Apply it in the lesson <ArrowRight aria-hidden="true" size={14} /></Link></>}</div>}
        {!feedback && <p className="coach-guidance">The coach waits for your response. A wrong answer creates a hint; it does not reveal the full explanation immediately.</p>}
      </div>
    </section>

    <section className="coach-footer shell"><div><p className="eyebrow">Why this changes tomorrow</p><h2>Your answer becomes a learning signal.</h2></div><div className="coach-loop"><span>Answer</span><b>→</b><span>Hint or explanation</span><b>→</b><span>Review later</span></div><div className="coach-footer-actions"><Link className="button light" href="/learning">Back to learning path</Link><button className="text-button" type="button" onClick={reset}><RotateCcw aria-hidden="true" size={14} /> Reset this checkpoint</button></div></section>
  </>;
}
