import React from 'react';
import { Project } from '../data/projects';
import TechBadge from './TechBadge';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.thumbnail} alt={`${project.title} thumbnail`} className="project-thumbnail" />
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech-stack">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="project-learnings">
          <h4>배운 점</h4>
          <p>{project.learnings}</p>
        </div>

        <div className="project-links">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
            GitHub 저장소
          </a>
          {project.liveUrl && project.liveUrl !== '#' && (
             <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
               데모 보기
             </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
