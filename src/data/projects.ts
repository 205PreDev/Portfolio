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
  /**
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
  },*/
  {
    title: "편의점 종합 솔루션 v2.0 (Convi)",
    description: "고객, 점주, 본사가 실시간으로 연결되는 편의점 통합 관리 플랫폼입니다. GPS 기반 지점 검색, 토스페이먼츠 결제, 실시간 주문 추적, 스마트 재고 관리, 매출 분석 대시보드, 본사 물류 승인 시스템 등 편의점 비즈니스의 모든 프로세스를 자동화합니다. 17개 테이블과 RLS 보안 정책이 적용된 상용 수준의 풀스택 애플리케이션입니다.",
    techStack: ["React 19", "TypeScript", "Vite", "Supabase", "TanStack Query", "Zustand", "Tailwind CSS", "TossPayments"],
    githubUrl: "https://github.com/205PreDev/convi",
    liveUrl: "https://youtu.be/4zU7Tvae-vo",
    thumbnail: "/convi-thumbnail.png",
    learnings: "React 19와 Vite 6를 활용한 최신 프론트엔드 개발 환경을 구축했습니다. Supabase의 Row Level Security(RLS) 정책으로 역할별 데이터 접근 제어를 구현하고, PostgreSQL 함수와 트리거를 활용한 비즈니스 로직 자동화를 경험했습니다. TanStack Query와 Zustand를 조합한 효율적인 서버/클라이언트 상태 관리 패턴을 습득했습니다.",
  },
  {
    title: "3D 소셜 메타버스 플랫폼 (MetaPlaza)",
    description: "React와 Three.js, Spring Boot를 활용한 3D 소셜 커뮤니티 플랫폼입니다. 가상 광장에서 실시간 멀티플레이어 상호작용, 채팅, 친구 시스템, 미니게임(오목, 반응속도), 아바타 커스터마이징, 상점/결제 시스템을 제공합니다. WebSocket(STOMP) 기반 실시간 동기화와 Mapbox 지도 연동을 지원합니다.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "React", "Three.js", "WebSocket", "TossPayments"],
    githubUrl: "https://github.com/205PreDev/MetaPlaza",
    liveUrl: "https://youtu.be/1YbolamFJ-Y",
    thumbnail: "/metaplaza-thumbnail.png",
    learnings: "Java/Spring Boot 기반 RESTful API 설계 및 WebSocket(STOMP) 실시간 통신 서버를 구축했습니다. PostgreSQL 연동, JWT 인증/인가, TossPayments 결제 시스템을 구현하며 백엔드 개발 역량을 키웠습니다. React Three Fiber와 Rapier 물리 엔진으로 3D 멀티플레이어 동기화를 구현해 풀스택 경험을 쌓았습니다.",
  },
  {
    title: "실시간 데스크톱 메신저 (Messenger)",
    description: "Electron 기반의 실시간 메신저 데스크톱 애플리케이션입니다. MetaPlaza의 Spring Boot 백엔드와 연동되어 1:1 DM 및 그룹 채팅, 읽음 상태 표시, 타이핑 인디케이터, 데스크톱 알림, 다크 모드를 지원합니다. WebSocket(STOMP)을 통한 실시간 메시지 송수신과 자동 재연결 기능을 제공합니다.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Electron", "React", "WebSocket", "JWT"],
    githubUrl: "https://github.com/205PreDev/Messenger",
    liveUrl: "/Messenger.mp4",
    thumbnail: "/Messenger.jpg",
    learnings: "Java/Spring Boot 백엔드와 연동하여 WebSocket(STOMP) 기반 실시간 메시징 시스템을 구현했습니다. 연결 끊김 감지 및 자동 재연결 로직으로 안정적인 통신을 구현하고, Electron의 IPC 통신과 preload 보안 컨텍스트 분리를 통해 크로스 플랫폼 데스크톱 앱 개발 경험을 쌓았습니다.",
  },
  {
    title: "교육용 3D 물리 시뮬레이터 (3DU)",
    description: "물리 법칙을 3D 시각화로 학습하는 웹 애플리케이션입니다. 야구 투구 시뮬레이터를 통해 중력, 항력, 마그누스 효과를 직관적으로 체험하고, 구종별 회전에 따른 궤적 변화를 시각적으로 확인할 수 있습니다. 블렌더로 제작한 투수 3D 모델과 애니메이션, 힘 벡터 시각화, 실험 비교 모드 등을 지원합니다.",
    techStack: ["React", "TypeScript", "Three.js", "Supabase", "Styled-components", "Zustand"],
    githubUrl: "https://github.com/205PreDev/3DU",
    liveUrl: "https://youtu.be/150HZWKh7jY",
    thumbnail: "/3Du-thumbnail.png",
    learnings: "4차 Runge-Kutta(RK4) 수치 적분을 구현하여 정확한 물리 시뮬레이션을 달성했습니다. Three.js와 React Three Fiber를 활용한 3D 렌더링 최적화, FBX 모델 통합 및 애니메이션 동기화, Supabase Auth/DB 연동을 통한 사용자 데이터 관리 등 풀스택 개발 역량을 종합적으로 향상시켰습니다.",
  },
  {
    title: "3D 웹 게임 프로젝트 (KDTgames)",
    description: "Three.js 라이브러리를 활용하여 제작된 3D 웹 게임입니다. Node.js 기반의 간단한 서버를 포함하고 있습니다.",
    techStack: ["Three.js", "JavaScript", "HTML", "Node.js"],
    githubUrl: "https://github.com/205PreDev/KDTgames",
    liveUrl: "https://youtu.be/ZZ3ksjaNbRE",
    thumbnail: "/asura-thumbnail.jpg",
    learnings: "3D 렌더링, 카메라, 조명 등 Three.js의 핵심 개념을 익히고, 3D 공간에서의 사용자 상호작용을 구현하는 방법을 학습했습니다. WebGL 기반의 3D 그래픽스를 웹 환경에서 어떻게 표현하고 최적화하는지에 대한 이해를 높일 수 있었습니다.",
  },
];
