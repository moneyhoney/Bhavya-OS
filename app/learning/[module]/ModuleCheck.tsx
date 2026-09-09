"use client";

import { useEffect, useState } from "react";

const choices = [
  { id: "input", label: "An input is something a system receives before it acts." },
  { id: "output", label: "An output is the result produced after instructions are followed." },
  { id: "guess", label: "A computer can always guess what a person means." },
];

export default function ModuleCheck({ slug }: { slug: string }) {
  const key = `bhavya-learning-check:${slug}`;
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => setSaved(window.localStorage.getItem(key) === "complete"), [key]);

  function checkAnswer() {
    if (!selected) return;
    const isCorrect = selected !== "guess";
    setSaved(isCorrect);
    if (isCorrect) window.localStorage.setItem(key, "complete");
  }

  return (
    <section className="module-check" aria-labelledby="check-title">
      <p className="eyebrow">Try it</p>
      <h2 id="check-title">Which statements help explain a computer?</h2>
      <p>Select a statement that is useful. You can change your answer and try again.</p>
      <div className="check-options">
        {choices.map((choice) => <label key={choice.id} className={selected === choice.id ? "is-selected" : ""}><input type="radio" name="module-check" value={choice.id} checked={selected === choice.id} onChange={() => setSelected(choice.id)} /><span>{choice.label}</span></label>)}
      </div>
      <button className="button" type="button" onClick={checkAnswer} disabled={!selected}>Check my thinking</button>
      {saved && <p className="check-feedback" role="status">Good start. This check is saved on this device so you can resume later.</p>}
      {selected === "guess" && !saved && <p className="check-feedback" role="status">Try again: computers follow inputs and instructions; they do not automatically know what a person means.</p>}
    </section>
  );
}
