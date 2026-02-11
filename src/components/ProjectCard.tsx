import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../data/projects';
import TechBadge from './TechBadge';

type ModalTab = 'detail' | 'challenges' | 'video';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>('detail');
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
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = project.liveUrl ? getYoutubeEmbedUrl(project.liveUrl) : null;
  const isLocalVideo = project.liveUrl?.endsWith('.mp4');
  const hasVideo = !!(youtubeEmbedUrl || isLocalVideo);

  const openModal = () => {
    setActiveTab('detail');
    setIsModalOpen(true);
  };

  const tabs: { key: ModalTab; label: string }[] = [
    { key: 'detail', label: '상세' },
    { key: 'challenges', label: '문제 해결' },
    ...(hasVideo ? [{ key: 'video' as ModalTab, label: '영상' }] : []),
  ];

  return (
    <div className="bento-card group overflow-hidden p-0 flex flex-col">
      {/* Image Slider */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={openModal}
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

      {/* 3-Tab Modal */}
      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">{project.title}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            {/* Tabs */}
            <div className="modal-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`modal-tab ${activeTab === tab.key ? 'modal-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="modal-body">
              {activeTab === 'detail' && (
                <div className="tab-detail">
                  {/* Image slider */}
                  <div className="tab-detail-slider">
                    <img
                      src={slides[slideIndex]}
                      alt={`${project.title} ${slideIndex + 1}`}
                    />
                    {hasMultipleSlides && (
                      <>
                        <button className="slider-btn slider-btn-left" onClick={prevSlide}>
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="slider-btn slider-btn-right" onClick={nextSlide}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {slides.map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                i === slideIndex ? 'bg-white' : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <p className="tab-detail-text">{project.detail}</p>

                  <div className="tab-detail-section">
                    <h4 className="tab-detail-heading">배운 점</h4>
                    <p className="tab-detail-text">{project.learnings}</p>
                  </div>

                  <div className="tab-detail-section">
                    <h4 className="tab-detail-heading">기술 스택</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'challenges' && (
                <div className="tab-challenges">
                  {project.challenges.map((challenge, idx) => (
                    <div key={idx} className="challenge-card">
                      <div className="challenge-problem">
                        <span className="challenge-label">Problem</span>
                        <p>{challenge.problem}</p>
                      </div>
                      <div className="challenge-solution">
                        <span className="challenge-label">Solution</span>
                        <p>{challenge.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'video' && (
                <div className="tab-video">
                  {youtubeEmbedUrl ? (
                    <iframe
                      src={youtubeEmbedUrl}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : isLocalVideo ? (
                    <video
                      src={project.liveUrl}
                      controls
                      muted
                    />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectCard;
