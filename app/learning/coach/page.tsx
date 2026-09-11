import Link from "next/link";
import CoachDesk from "../CoachDesk";

export default function CoachPage() {
  return <main className="learning-page coach-page">
    <header className="learning-header shell"><Link href="/learning" className="back-link">← Learning path</Link><span className="learning-status">Offline-first practice</span></header>
    <CoachDesk />
    <footer className="footer shell"><Link className="footer-brand" href="/"><span>Bhavya Foundation</span></Link><p>Practice is proposed learning content, saved only on this device.</p><small>Review before release.</small></footer>
  </main>;
}
