import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../data/projects';
import TechBadge from './TechBadge';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 유튜브 링크를 embed URL로 변환
  const getYoutubeEmbedUrl = (url: string): string | null => {
    const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1`;
    }
    return null;
  };

  const youtubeEmbedUrl = project.liveUrl ? getYoutubeEmbedUrl(project.liveUrl) : null;
  const isLocalVideo = project.liveUrl?.endsWith('.mp4');

  return (
    <div className="project-card">
      <img
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        className="project-thumbnail"
        onClick={() => setIsModalOpen(true)}
      />
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

      {isModalOpen && createPortal(
        <div className="image-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className={`image-modal-content ${youtubeEmbedUrl || isLocalVideo ? 'video-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-player"
              />
            ) : isLocalVideo ? (
              <video
                src={project.liveUrl}
                controls
                autoPlay
                muted
                className="local-video-player"
              />
            ) : (
              <img src={project.thumbnail} alt={`${project.title} full`} />
            )}
            <button className="image-modal-close" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectCard;
