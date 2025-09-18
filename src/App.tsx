import React from 'react';
import './App.css';
import { projects } from './data/projects';
import About from './components/About';
import Contact from './components/Contact';
import ProjectCard from './components/ProjectCard';
import TechBadge from './components/TechBadge';
import ParticleBackground from './components/ParticleBackground'; // Import particles

function App() {
  // Extract unique skills from all projects
  const allTech = projects.flatMap(p => p.techStack);
  const uniqueTech = Array.from(new Set(allTech));

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="main-nav">
        <a href="#home">홈</a>
        <a href="#about">소개</a>
        <a href="#skills">보유 기술</a>
        <a href="#projects">프로젝트</a>
        <a href="#contact">연락처</a>
      </nav>

      {/* Home Section */}
      <header id="home" className="App-header">
        <ParticleBackground />
        <div className="header-content">
            <h1>안녕하세요!</h1>
            <p>이곳은 저의 기술적 여정과 프로젝트를 담은 포트폴리오 웹사이트입니다.</p>
            <p>React와 TypeScript를 사용하여 제작되었습니다.</p>
            <a href="#projects" className="App-link">프로젝트 보러가기</a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* About Section */}
        <About />

        {/* Skills Section */}
        <section id="skills" className="skills-section-main">
            <div className="section-container">
                <h2 className="section-title">보유 기술</h2>
                <div className="skills-list">
                {uniqueTech.map(tech => (
                    <TechBadge key={tech} tech={tech} />
                ))}
                </div>
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section-main">
            <div className="section-container">
                <h2 className="section-title">프로젝트</h2>
                <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
