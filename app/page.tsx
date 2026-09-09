"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const missions = [
  { eyebrow: "01 / living systems", title: "Forest", text: "Restore ecosystems and learn to notice the systems that keep life moving.", tone: "forest", href: "/missions#forest" },
  { eyebrow: "02 / open inquiry", title: "Knowledge", text: "Make room for questions, careful research and responsible access to ideas.", tone: "knowledge", href: "/missions#knowledge" },
  { eyebrow: "03 / living memory", title: "Heritage", text: "Carry forward the wisdom, places and practices that connect generations.", tone: "heritage", href: "/missions#heritage" },
  { eyebrow: "04 / shared agency", title: "Community", text: "Build with people, not around them, toward lasting capability and care.", tone: "community", href: "/missions#community" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main>
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Bhavya Foundation home"><Image src="/logo.png" alt="Bhavya Foundation" width={152} height={132} priority /></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /><b>Menu</b></button>
      <nav id="primary-nav" className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link><Link href="/missions" onClick={() => setMenuOpen(false)}>Missions</Link><Link href="/learning" onClick={() => setMenuOpen(false)}>Learn AI</Link><Link href="/labs" onClick={() => setMenuOpen(false)}>AI Labs</Link>
      </nav>
      <Link className="button small header-cta" href="/learning">Enter the learning path <span aria-hidden="true">↗</span></Link>
    </header>

    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow reveal">A public institution for generations</p>
        <h1 id="hero-title" className="reveal reveal-delay-1">The future is a place we <em>build.</em></h1>
        <p className="hero-lede reveal reveal-delay-2">Bhavya brings nature, knowledge, heritage and communities into one long view.</p>
        <div className="actions reveal reveal-delay-3"><Link className="button" href="/learning">Begin with curiosity <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/missions">See the four missions <span aria-hidden="true">↓</span></Link></div>
      </div>
      <div className="hero-art" aria-label="An abstract illustration of a mountain landscape, rising sun and growing tree">
        <div className="hero-noise" /><div className="sun" /><div className="sun-glow" /><div className="mountain back" /><div className="mountain middle" /><div className="mountain front" /><div className="hero-tree" /><span className="hero-caption">nature · knowledge · heritage</span>
      </div>
    </section>

    <section className="signal-strip shell" aria-label="Bhavya principles"><span>01 / stay curious</span><span>02 / make it useful</span><span>03 / leave something stronger</span></section>

    <section className="section shell mission-section" aria-labelledby="mission-title">
      <div className="section-heading"><div><p className="eyebrow">Four permanent missions</p><h2 id="mission-title">A wider definition of progress.</h2></div><p className="heading-note">The work begins with care for the places, ideas and people that make a future possible.</p></div>
      <div className="mission-grid">{missions.map((mission,index)=><Link className={"mission-card " + mission.tone} href={mission.href} key={mission.title}><span className="mission-index">{mission.eyebrow}</span><span className="mission-glyph" aria-hidden="true">{["↟","◌","⌂","◎"][index]}</span><h3>{mission.title}</h3><p>{mission.text}</p><span className="card-link">Explore the mission <span aria-hidden="true">↗</span></span></Link>)}</div>
    </section>

    <section className="learning-callout shell" aria-labelledby="learning-title">
      <div className="learning-copy"><p className="eyebrow">The Bhavya learning path</p><h2 id="learning-title">AI is not a distant future. It is something you can learn to shape.</h2><p>A free learning ecosystem is being established for students, including learners who may not have a computer at home. Start on a phone. Continue at the right moment. Build with others.</p><Link className="button light" href="/learning">See the learning vision <span aria-hidden="true">↗</span></Link></div>
      <div className="path-map" aria-label="Learning journey: understand, observe, try, experiment, build, reflect"><div className="path-line" /><span className="path-node node-1">Understand</span><span className="path-node node-2">Observe</span><span className="path-node node-3">Try</span><span className="path-node node-4">Experiment</span><span className="path-node node-5">Build</span><span className="path-node node-6">Reflect</span></div>
    </section>

    <section className="section shell ecosystem" aria-labelledby="ecosystem-title"><div className="eyebrow">Open the next door</div><h2 id="ecosystem-title">A thoughtful place to start.</h2><div className="door-grid"><Link href="/learning" className="door door-learning"><span className="door-label">For learners</span><strong>Find your first question.</strong><span>Explore the free AI learning vision <b aria-hidden="true">↗</b></span></Link><Link href="/labs" className="door door-labs"><span className="door-label">For practical access</span><strong>Make space to experiment.</strong><span>Understand the AI Lab model <b aria-hidden="true">↗</b></span></Link><Link href="/knowledge" className="door door-knowledge"><span className="door-label">For the long view</span><strong>Keep good knowledge moving.</strong><span>Visit the knowledge space <b aria-hidden="true">↗</b></span></Link></div></section>

    <footer className="footer shell"><Link className="footer-brand" href="/"><Image src="/logo.png" alt="Bhavya Foundation" width={105} height={91}/><span>Nature. Knowledge. Heritage.</span></Link><p>Building institutions that strengthen nature, knowledge and heritage.</p><small>© {new Date().getFullYear()} Bhavya Foundation</small></footer>
  </main>;
}
