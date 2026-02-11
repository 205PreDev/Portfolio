import { useEffect, useRef, useCallback } from 'react';
import { projects } from './data/projects';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import ProjectCard from './components/ProjectCard';
import TechBadge from './components/TechBadge';
import PDFDownloadButton from './components/PDFDownloadButton';
import Chatbot from './components/Chatbot/Chatbot';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const NAV_ITEMS = [
  { label: '소개', index: 1 },
  { label: '프로젝트', index: 2 },
  { label: '연락처', index: 3 },
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

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

  const scrollToSlide = useCallback((index: number) => {
    slidesRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const setSlideRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) slidesRef.current[index] = el;
  }, []);

  const allTech = projects.flatMap(p => p.techStack);
  const uniqueTech = Array.from(new Set(allTech));

  return (
    <div className="fullpage-container" ref={containerRef}>
      {/* Glassmorphism Nav */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <button
            onClick={() => scrollToSlide(0)}
            className="text-lg font-bold tracking-tight cursor-pointer bg-transparent border-none text-text-primary"
          >
            이영호
          </button>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map(({ label, index }) => (
              <button
                key={label}
                onClick={() => scrollToSlide(index)}
                className="text-sm text-text-secondary hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              >
                {label}
              </button>
            ))}
            <PDFDownloadButton />
          </div>
        </div>
      </nav>

      {/* Slide 0: Hero */}
      <div ref={setSlideRef(0)} className="fullpage-slide">
        <Hero onNavigate={scrollToSlide} />
      </div>

      {/* Slide 1: About + Skills */}
      <div ref={setSlideRef(1)} className="fullpage-slide">
        <div className="slide-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <About />
          </div>
          <section>
            <div className="bento-card">
              <h2 className="text-xl font-bold mb-4">보유 기술</h2>
              <div className="flex flex-wrap gap-2">
                {uniqueTech.map(tech => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Slide 2: Projects */}
      <div ref={setSlideRef(2)} className="fullpage-slide fullpage-slide-scroll">
        <div className="slide-content">
          <h2 className="text-2xl font-bold mb-4 px-2">프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Slide 3: Contact + Footer */}
      <div ref={setSlideRef(3)} className="fullpage-slide">
        <div className="slide-content flex flex-col justify-center h-full">
          <div className="grid grid-cols-1 gap-4 mb-8">
            <Contact />
          </div>
          <footer className="border-t border-border-subtle py-6 text-center text-sm text-text-secondary">
            &copy; 2026. All rights reserved.
          </footer>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}

export default App;
