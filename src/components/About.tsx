import { Sparkles } from 'lucide-react';

const About = () => {
  return (
    <>
      {/* Profile Card - 사진 중심 */}
      <div id="about" className="bento-card flex flex-col items-center justify-center text-center">
        <img
          src="/myshot.png"
          alt="이영호 프로필"
          width={533}
          height={512}
          className="rounded-2xl object-cover border-2 border-primary/40 mb-4"
        />
        <h1 className="text-2xl font-bold mb-1">이영호</h1>
        <p className="text-text-secondary text-sm">웹 개발자</p>
      </div>

      {/* Intro Card */}
      <div className="bento-card flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">소개</h2>
        </div>
        <p className="text-text-secondary leading-relaxed text-sm">
          안녕하세요! 웹 기술을 통해 아이디어를 현실로 만드는 것을 즐기는 개발자입니다.
          사용자에게 가치 있는 경험을 제공하는 깔끔하고 효율적인 코드를 작성하기 위해 항상 노력합니다.
        </p>
        <p className="text-text-secondary leading-relaxed text-sm mt-3">
          새로운 기술을 배우고 동료들과 지식을 공유하는 과정에서 큰 보람을 느낍니다.
          이 포트폴리오는 저의 학습 과정과 결과물을 담은 공간입니다.
        </p>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-text-secondary">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle">🎮 취미: 인디게임 제작</span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle">🏓 특기: 탁구</span>
        </div>
      </div>
    </>
  );
};

export default About;
