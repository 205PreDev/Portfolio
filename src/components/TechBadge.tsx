interface TechBadgeProps {
  tech: string;
}

const TechBadge = ({ tech }: TechBadgeProps) => {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary-light border border-primary/20">
      {tech}
    </span>
  );
};

export default TechBadge;
