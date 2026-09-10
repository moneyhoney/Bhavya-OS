import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LearningHome from "./LearningHome";

export default function LearningPage() {
  return <main className="learning-page">
    <header className="learning-header shell"><Link href="/" className="back-link">← Bhavya Foundation</Link><span className="learning-status">A proposed learning experience</span></header>
    <section className="learning-hero shell"><div><p className="eyebrow">Free AI learning / the foundation path</p><h1>Build the <em>ground</em> before you build the future.</h1><p>AI changes quickly. Curiosity, computing, evidence, and care last longer. Begin with one small investigation and learn by changing something yourself.</p><Link className="button" href="/learning/what-is-a-computer">Start the first lesson <ArrowRight aria-hidden="true" size={15} /></Link></div><div className="learning-seal" aria-label="The learning flow"><span>Understand</span><b>↓</b><span>Try</span><b>↓</b><span>Reflect</span></div></section>
    <LearningHome />
    <section className="learning-resources shell" aria-labelledby="resources-title"><div><p className="eyebrow">Open doors, careful provenance</p><h2 id="resources-title">Learn from the wider field.</h2><p>Some resources are free to access. Fewer are free to adapt. Bhavya’s resource map records that difference so original learning stays distinct and trustworthy.</p><Link className="button light" href="/knowledge">Open the knowledge space →</Link></div><div className="resource-note"><span>Learning boundary</span><strong>Free ≠ open ≠ ours</strong><p>This proposed path uses original explanations and interactions. It is not approved Foundation curriculum yet.</p><Link href="/knowledge">Read the principle →</Link></div></section>
    <footer className="footer shell"><Link className="footer-brand" href="/"><span>Bhavya Foundation</span></Link><p>Proposed experience, not published curriculum.</p><small>Review before release.</small></footer>
  </main>;
}
