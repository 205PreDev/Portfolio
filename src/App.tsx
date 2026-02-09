import { useEffect } from 'react';
import { projects } from './data/projects';
import About from './components/About';
import Contact from './components/Contact';
import ProjectCard from './components/ProjectCard';
import TechBadge from './components/TechBadge';
import PDFDownloadCard from './components/PDFDownloadCard';
import Chatbot from './components/Chatbot/Chatbot';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  useEffect(() => {
    const warmupBackend = async () => {
      try {
        await fetch(API_URL, { method: 'GET' });
      } catch {
        // 워밍업 실패는 무시
      }
    };
    warmupBackend();
  }, []);

  const allTech = projects.flatMap(p => p.techStack);
  const uniqueTech = Array.from(new Set(allTech));

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {/* Glassmorphism Nav */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">이영호</span>
          <div className="flex gap-6">
            {[
              ['#about', '소개'],
              ['#skills', '기술'],
              ['#projects', '프로젝트'],
              ['#contact', '연락처'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-text-secondary hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Bento Grid */}
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-12">
        {/* Row 1: Profile + Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <About />
        </div>

        {/* Row 2: Skills */}
        <section id="skills" className="mb-4">
          <div className="bento-card">
            <h2 className="text-xl font-bold mb-4">보유 기술</h2>
            <div className="flex flex-wrap gap-2">
              {uniqueTech.map(tech => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </section>

        {/* Row 3+: Projects Grid */}
        <section id="projects" className="mb-4">
          <h2 className="text-2xl font-bold mb-4 px-2">프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Row: Contact + PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Contact />
          </div>
          <PDFDownloadCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-6 text-center text-sm text-text-secondary">
        &copy; 2026. All rights reserved.
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;
