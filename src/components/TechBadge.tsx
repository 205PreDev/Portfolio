import React from 'react';
import './TechBadge.css';

interface TechBadgeProps {
  tech: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  return <span className="tech-badge">{tech}</span>;
};

export default TechBadge;
