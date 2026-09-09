import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearningModule, learningModules } from "../data";

export function generateStaticParams() {
  return learningModules.map(({ slug }) => ({ module: slug }));
}

export default function LearningModulePage({ params }: { params: { module: string } }) {
  const learningModule = getLearningModule(params.module);
  if (!learningModule) notFound();

  return (
    <main className="learning-page">
      <header className="learning-header shell">
        <Link href="/learning" className="back-link">â† Learning path</Link>
        <span className="learning-status">Proposed Â· Foundation review required</span>
      </header>
      <article className="module-detail shell">
        <p className="eyebrow">Module {learningModule.number} Â· Foundation path</p>
        <h1>{learningModule.title}</h1>
        <p className="module-lede">{learningModule.objective}</p>
        <div className="module-detail-grid">
          <section><p className="eyebrow">Try</p><h2>Make the idea visible.</h2><p>{learningModule.activity}</p></section>
          <section><p className="eyebrow">Build</p><h2>Leave evidence behind.</h2><p>{learningModule.project}</p></section>
          <section><p className="eyebrow">Reflect</p><h2>What did you learn?</h2><p>{learningModule.evidence}</p></section>
        </div>
        <div className="module-concepts"><span>Concepts</span>{learningModule.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
        <p className="module-boundary">This is an original proposed learning outline. It contains no Foundation impact claims and is not published curriculum.</p>
      </article>
    </main>
  );
}


