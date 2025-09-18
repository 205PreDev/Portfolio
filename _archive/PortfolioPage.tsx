import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import TechBadge from '../components/TechBadge'; // Import TechBadge
import './PortfolioPage.css';

const PortfolioPage: React.FC = () => {
  // Extract unique skills from all projects
  const allTech = projects.flatMap(p => p.techStack);
  const uniqueTech = Array.from(new Set(allTech));

  return (
    <div className="portfolio-page">
      <div className="skills-section">
        <h2 className="skills-title">보유 기술</h2>
        <div className="skills-list">
          {uniqueTech.map(tech => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>

      <h1 className="portfolio-title">프로젝트</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
