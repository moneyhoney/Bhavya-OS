"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultProfile, goalLabels, initialLearningDecision, learningDecision, LearnerProfile, learnerProfileKey, readProfile, type LearningDecision } from "./learnerState";

export default function LearningDesk() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  const [decision, setDecision] = useState<LearningDecision>(initialLearningDecision());
  const [hasSetup, setHasSetup] = useState(false);
  useEffect(() => { setProfile(readProfile()); setDecision(learningDecision()); setHasSetup(Boolean(window.localStorage.getItem(learnerProfileKey))); }, []);
  const name = profile.name.trim() || "Learner";
  return <section className="learning-desk shell" aria-labelledby="desk-title"><div className="desk-heading"><div><p className="eyebrow">Your learning desk</p><h2 id="desk-title">{name}, here is the next useful move.</h2><p>{goalLabels[profile.goal]} · {profile.minutes} minutes · {profile.device === "phone" ? "phone-friendly" : profile.device === "shared-computer" ? "shared-computer aware" : "computer-ready"}</p></div><CircleUserRound aria-hidden="true" size={25} /></div><div className="desk-grid"><article className="desk-plan"><p className="eyebrow">{decision.kind === "review" ? "Review" : decision.kind === "remediate" ? "Targeted practice" : decision.kind === "resume" ? "Resume" : decision.kind === "apply" ? "Apply" : "Next step"}</p><h3>{decision.heading}</h3><p>{decision.description}</p><Link className="button" href={decision.href}>{decision.action} <ArrowRight aria-hidden="true" size={15} /></Link></article><article className="desk-resume"><CalendarClock aria-hidden="true" size={18} /><div><p className="eyebrow">Resume signal</p><strong>{hasSetup ? "Your plan is saved locally" : "Set up a small plan"}</strong><p>{hasSetup ? "Your answers and review dates stay on this device. Nothing is sent to a server." : "Tell the coach your goal and available time so the next action has context."}</p></div><Link className="text-link" href="/learning/coach/">{hasSetup ? "Adjust setup" : "Set it up"} <ArrowRight aria-hidden="true" size={14} /></Link></article></div></section>;
}
