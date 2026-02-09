import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../data/projects';
import TechBadge from './TechBadge';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLearnings, setShowLearnings] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // 썸네일 + 추가 이미지를 합친 슬라이드 목록
  const slides = [project.thumbnail, ...(project.images || [])];
  const hasMultipleSlides = slides.length > 1;

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
  };
  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((i) => (i + 1) % slides.length);
  };

  const getYoutubeEmbedUrl = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1` : null;
  };

  const youtubeEmbedUrl = project.liveUrl ? getYoutubeEmbedUrl(project.liveUrl) : null;
  const isLocalVideo = project.liveUrl?.endsWith('.mp4');

  return (
    <div className="bento-card group overflow-hidden p-0 flex flex-col">
      {/* Image Slider */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={slides[slideIndex]}
          alt={`${project.title} ${slideIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Slide controls */}
        {hasMultipleSlides && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === slideIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white">
          {project.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* Learnings toggle */}
        <button
          onClick={() => setShowLearnings(!showLearnings)}
          className="text-left text-xs text-primary hover:text-primary-light transition-colors cursor-pointer"
        >
          {showLearnings ? '접기' : '배운 점 보기'}
        </button>
        {showLearnings && (
          <p className="text-xs text-text-secondary leading-relaxed">
            {project.learnings}
          </p>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              데모
            </a>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="image-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className={`image-modal-content ${youtubeEmbedUrl || isLocalVideo ? 'video-modal' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
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
              <img src={slides[slideIndex]} alt={`${project.title} full`} />
            )}
            <button className="image-modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectCard;
