interface HeroProps {
  onNavigate: (index: number) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <p className="text-text-secondary text-lg mb-2">안녕하세요</p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        <span className="text-primary-light">이영호</span>입니다
      </h1>
      <p className="text-xl md:text-2xl text-text-secondary mb-3">
        지속 성장하는 풀스택 개발자
      </p>
      <p className="text-text-secondary text-sm md:text-base max-w-lg mb-10 leading-relaxed">
        <span className="text-primary-light font-medium">뭘 쓰느냐보다 어떻게 쓰느냐</span>가
        중요하다고 믿는 개발자입니다.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => onNavigate(2)}
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors cursor-pointer"
        >
          프로젝트 보기
        </button>
        <button
          onClick={() => onNavigate(3)}
          className="px-6 py-3 rounded-xl border border-border-subtle text-text-secondary hover:border-primary/40 hover:text-white transition-all cursor-pointer"
        >
          연락하기
        </button>
      </div>
    </div>
  );
};

export default Hero;
