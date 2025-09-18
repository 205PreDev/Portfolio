export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  thumbnail: string;
  learnings: string; // 새로 추가된 항목
}

export const projects: Project[] = [
  {
    title: "우리동네 GS 편의점 솔루션 (CVSproject)",
    description: "점주와 고객을 위한 편의점 관리 및 주문/결제 시스템입니다. Supabase를 백엔드로 사용하여 사용자, 재고, 주문, 결제 등 복잡한 데이터를 관리하는 풀스택 애플리케이션입니다.",
    techStack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "#",
    thumbnail: "https://via.placeholder.com/400x250.png?text=CVS+Project",
    learnings: "복잡한 데이터베이스 스키마 설계와 RLS(Row Level Security) 정책을 실제로 적용하며 백엔드 보안의 중요성을 깊이 이해했습니다. 또한, 전역 상태 관리를 통해 여러 컴포넌트가 공유하는 데이터를 효율적으로 관리하는 방법을 학습했습니다.",
  },
  {
    title: "모임 관리 앱 (Group)",
    description: "사용자들이 다양한 목적의 모임을 만들고 참여할 수 있도록 돕는 웹 애플리케이션입니다. 순수 HTML, CSS, JavaScript로 구현되었습니다.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "#",
    thumbnail: "https://via.placeholder.com/400x250.png?text=Group+Project",
    learnings: "JavaScript만으로 DOM을 직접 조작하고 이벤트를 처리하며 웹의 기본적인 동작 원리를 탄탄히 다질 수 있었습니다. 라이브러리나 프레임워크의 도움 없이 순수 코드로 기능을 구현하는 경험을 통해 코드의 기초 체력을 기를 수 있었습니다.",
  },
  {
    title: "맞춤형 복지 정보 제공 서비스 (Welf)",
    description: "소득분위 계산, 복지 정보 검색 및 상세 보기 등 개인에게 필요한 복지 정보를 제공하는 웹사이트입니다.",
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
    githubUrl: "#",
    thumbnail: "https://via.placeholder.com/400x250.png?text=Welf+Project",
    learnings: "공공 데이터 API를 호출하고 비동기적으로 받아온 데이터를 사용자에게 유의미한 정보로 가공하여 보여주는 과정을 경험했습니다. Bootstrap을 활용하여 반응형 웹 디자인을 빠르게 구축하는 방법을 익혔습니다.",
  },
  {
    title: "3D 웹 게임 프로젝트 (KDTgames)",
    description: "Three.js 라이브러리를 활용하여 제작된 3D 웹 게임입니다. Node.js 기반의 간단한 서버를 포함하고 있습니다.",
    techStack: ["Three.js", "JavaScript", "HTML", "Node.js"],
    githubUrl: "https://github.com/205PreDev/KDTgames",
    thumbnail: "https://via.placeholder.com/400x250.png?text=KDT+Games",
    learnings: "3D 렌더링, 카메라, 조명 등 Three.js의 핵심 개념을 익히고, 3D 공간에서의 사용자 상호작용을 구현하는 방법을 학습했습니다. WebGL 기반의 3D 그래픽스를 웹 환경에서 어떻게 표현하고 최적화하는지에 대한 이해를 높일 수 있었습니다.",
  },
];
