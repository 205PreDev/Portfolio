import { Sparkles } from 'lucide-react';

const About = () => {
  return (
    <>
      {/* Profile Card */}
      <div id="about" className="bento-card flex flex-col items-center justify-center text-center">
        <img
          src="/myshot.png"
          alt="이영호 프로필"
          width={266}
          height={256}
          className="rounded-2xl object-cover border-2 border-primary/40 mb-4"
        />
        <h1 className="text-2xl font-bold mb-1">이영호</h1>
        <p className="text-text-secondary text-sm">풀스택 개발자</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3 text-xs text-text-secondary">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle">🎮 인디게임 제작</span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle">🏓 탁구</span>
        </div>
      </div>

      {/* Intro Card */}
      <div className="bento-card flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">소개</h2>
        </div>
        <p className="text-text-secondary leading-relaxed text-sm">
          AI를 단순 코드 생성이 아닌 <span className="text-primary-light font-medium">코드 리뷰, 보안 검증, 설계 검토</span> 도구로
          활용합니다. 반복 작업에 쓸 시간을 아껴 설계와 코드 품질에 집중하는 게 목표입니다.
        </p>
        <p className="text-text-secondary leading-relaxed text-sm mt-3">
          동작하는 코드보다 <span className="text-primary-light font-medium">읽히는 코드</span>를 추구합니다.
          다음에 이 코드를 볼 사람이 바로 이해할 수 있는지를 항상 기준으로 두고,
          불필요한 추상화보다 명확한 구조를 선택합니다.
        </p>
        <p className="text-text-secondary leading-relaxed text-sm mt-3">
          막히면 공식 문서 → 커뮤니티 → 직접 실험 순서로 풀어가며,
          문제를 해결한 과정 자체를 기록하고 공유하는 습관을 만들어가고 있습니다.
        </p>
      </div>
    </>
  );
};

export default About;
