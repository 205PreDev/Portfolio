export interface Challenge {
  problem: string;
  solution: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  thumbnail: string;
  images?: string[];   // 추가 스크린샷 (슬라이드용)
  learnings: string;
  detail: string;
  challenges: Challenge[];
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
    detail: "고객·점주·본사 3개 역할이 하나의 플랫폼에서 실시간으로 연결되는 편의점 통합 관리 시스템입니다. 고객은 GPS 기반 근처 지점 검색과 토스페이먼츠 결제로 주문하고, 점주는 실시간 주문 알림·재고 자동 차감·매출 분석 대시보드로 매장을 운영하며, 본사는 전국 지점 모니터링과 물류 승인 시스템으로 전체를 관리합니다. 17개 테이블에 RLS 보안 정책을 적용하고 13개 PostgreSQL 함수와 15개 트리거로 비즈니스 로직을 자동화했습니다. React Hook Form으로 고성능 폼을 관리하고, TanStack Query로 서버 상태 캐싱 및 동기화를 처리합니다.",
    challenges: [
      {
        problem: "역할별(고객/점주/본사) 데이터 접근 제어를 클라이언트 레벨에서만 처리하면 보안 취약점이 발생했습니다.",
        solution: "Supabase RLS(Row Level Security) 정책을 17개 테이블에 적용하여 DB 레벨에서 역할별 데이터 접근을 제어했습니다. JWT 토큰의 role claim을 기반으로 정책을 설정해 클라이언트 우회 공격을 원천 차단했습니다.",
      },
      {
        problem: "토스페이먼츠 결제 완료 후 네트워크 지연이나 사용자의 중복 클릭으로 같은 주문이 여러 번 생성되는 문제가 발생했습니다.",
        solution: "PaymentKey 기반 3단계 중복 결제 차단 로직을 구현했습니다. 결제 요청 시 고유 키를 생성하고, 서버 측에서 동일 PaymentKey의 중복 주문을 검증·거부하여 데이터 일관성을 보장했습니다.",
      },
    ],
  },
  {
    title: "3D 소셜 메타버스 플랫폼 (MetaPlaza)",
    description: "React와 Three.js, Spring Boot를 활용한 3D 소셜 커뮤니티 플랫폼입니다. 가상 광장에서 실시간 멀티플레이어 상호작용, 채팅, 친구 시스템, 미니게임(오목, 반응속도), 아바타 커스터마이징, 상점/결제 시스템을 제공합니다. WebSocket(STOMP) 기반 실시간 동기화와 Mapbox 지도 연동을 지원합니다.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "React", "Three.js", "WebSocket", "TossPayments"],
    githubUrl: "https://github.com/205PreDev/MetaPlaza",
    liveUrl: "https://youtu.be/1YbolamFJ-Y",
    thumbnail: "/metaplaza-thumbnail.png",
    learnings: "Java/Spring Boot 기반 RESTful API 설계 및 WebSocket(STOMP) 실시간 통신 서버를 구축했습니다. PostgreSQL 연동, JWT 인증/인가, TossPayments 결제 시스템을 구현하며 백엔드 개발 역량을 키웠습니다. Spring Security로 역할 기반 접근 제어(ROLE_USER/ROLE_DEVELOPER)를 구현하고, JPA 엔티티 설계와 @Transactional을 활용한 트랜잭션 관리, lazy-initialization 등 백엔드 성능 최적화를 경험했습니다.",
    detail: "React Three Fiber 기반 3D 가상 광장에서 다수의 사용자가 실시간으로 상호작용하는 소셜 메타버스 플랫폼입니다. WASD 키보드 조작으로 3D 캐릭터를 이동하고, 전역 채팅(말풍선 표시), 친구 시스템, DM, 미니게임(오목·반응속도), 상점/인벤토리/TossPayments 결제, 출석 체크 보상 시스템을 제공합니다. Spring Boot 백엔드에서 WebSocket(STOMP) 기반으로 위치·채팅·게임 상태를 실시간 동기화하고, Mapbox 지도 연동으로 GPS 기반 캐릭터 스폰을 지원합니다. 관리자 기능으로 유저 관리, 신고 처리, 제재 시스템도 구현했습니다.",
    challenges: [
      {
        problem: "Spring Boot 백엔드 시작 시간이 과도하게 오래 걸렸습니다. DataInitializer에서 매번 전체 사용자를 조회하여 기본 아이템을 지급하고, SQL/DEBUG 로깅으로 콘솔 출력 오버헤드가 발생했습니다.",
        solution: "빈 지연 로딩(lazy-initialization) 활성화, SQL 로깅 비활성화, 로깅 레벨을 WARN/INFO로 최적화했습니다. DataInitializer에 @Transactional과 saveAll() 배치 처리를 적용하고, 이미 초기화된 경우 스킵하는 로직을 추가하여 시작 시간을 수 초에서 약 1초로 단축했습니다.",
      },
      {
        problem: "WebSocket 연결 시 SessionAttributes가 null이어서 NullPointerException이 발생하고, FriendService에서 트랜잭션 누락으로 친구 목록 API가 500 에러를 반환했습니다.",
        solution: "WebSocketEventListener에 세션 속성 null 체크를 추가하여 예외를 방지하고, FriendService에 클래스 레벨 @Transactional(readOnly = true)을 적용하여 Lazy Loading 문제를 해결했습니다.",
      },
    ],
  },
  {
    title: "실시간 데스크톱 메신저 (Messenger)",
    description: "Electron 기반의 실시간 메신저 데스크톱 애플리케이션입니다. MetaPlaza의 Spring Boot 백엔드와 연동되어 1:1 DM 및 그룹 채팅, 읽음 상태 표시, 타이핑 인디케이터, 데스크톱 알림, 다크 모드를 지원합니다. WebSocket(STOMP)을 통한 실시간 메시지 송수신과 자동 재연결 기능을 제공합니다.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Electron", "React", "WebSocket", "JWT"],
    githubUrl: "https://github.com/205PreDev/Messenger",
    liveUrl: "/Messenger.mp4",
    thumbnail: "/Messenger.jpg",
    learnings: "Java/Spring Boot 백엔드와 연동하여 WebSocket(STOMP) 기반 실시간 메시징 시스템을 구현했습니다. 연결 끊김 감지 및 자동 재연결 로직으로 안정적인 통신을 구현하고, Electron의 IPC 통신과 preload 보안 컨텍스트 분리를 통해 크로스 플랫폼 데스크톱 앱 개발 경험을 쌓았습니다.",
    detail: "MetaPlaza의 Spring Boot 3.2 백엔드와 연동되는 Electron 기반 실시간 데스크톱 메신저입니다. 1:1 DM 및 그룹 채팅, 메시지 읽음 상태(PATCH /read API), 타이핑 인디케이터, 데스크톱 푸시 알림, 다크 모드, 메시지 검색 기능을 지원합니다. WebSocket(STOMP)으로 방별 메시지 구독(/topic/chat/room/{roomId})과 개인 알림 구독(/topic/user/{userId}/updates)을 처리하며, REST API로 대화방 생성·초대·나가기 등을 관리합니다.",
    challenges: [
      {
        problem: "네트워크 불안정 시 WebSocket 연결이 끊어지면 메시지 유실과 UI 불일치가 발생했습니다.",
        solution: "WebSocket 자동 재연결 로직을 구현하고, 연결 복구 시 REST API(GET /rooms/{roomId}/messages)로 누락된 메시지를 재조회하여 동기화했습니다. 연결 상태를 Context로 관리하여 UI에 실시간 반영했습니다.",
      },
      {
        problem: "Electron의 메인/렌더러 프로세스 간 통신에서 보안 컨텍스트 분리가 미흡하여 렌더러에서 Node.js API에 직접 접근할 수 있는 보안 문제가 있었습니다.",
        solution: "contextIsolation을 활성화하고 preload.js에서 contextBridge로 필요한 API만 안전하게 노출했습니다. 메인 프로세스의 IPC 핸들러에서 채널별 검증을 수행하여 허용된 통신만 처리하도록 제한했습니다.",
      },
    ],
  },
  {
    title: "교육용 3D 물리 시뮬레이터 (3DU)",
    description: "물리 법칙을 3D 시각화로 학습하는 웹 애플리케이션입니다. 야구 투구 시뮬레이터를 통해 중력, 항력, 마그누스 효과를 직관적으로 체험하고, 구종별 회전에 따른 궤적 변화를 시각적으로 확인할 수 있습니다. 블렌더로 제작한 투수 3D 모델과 애니메이션, 힘 벡터 시각화, 실험 비교 모드 등을 지원합니다.",
    techStack: ["React", "TypeScript", "Three.js", "Supabase", "Styled-components", "Zustand"],
    githubUrl: "https://github.com/205PreDev/3DU",
    liveUrl: "https://youtu.be/150HZWKh7jY",
    thumbnail: "/3Du-thumbnail.png",
    learnings: "Zustand를 활용한 복잡한 시뮬레이션 상태 관리 패턴(selector, 모드별 스토어 분리)을 습득했습니다. Supabase Auth 연동으로 사용자 인증·인가를 구현하고, RLS 정책으로 사용자별 데이터 접근 제어를 적용했습니다. TypeScript의 엄격한 타입 시스템을 활용하여 물리 파라미터 인터페이스를 설계하고 런타임 에러를 사전에 방지하는 경험을 쌓았습니다.",
    detail: "물리 법칙을 3D 시각화로 학습하는 교육용 웹 애플리케이션입니다. 단순 모드에서는 슬라이더와 구종 선택으로 쉽게, 전문가 모드에서는 초기 속도·릴리즈 각도·회전수 등 상세 파라미터를 직접 제어할 수 있습니다. Zustand로 시뮬레이션 파라미터 상태를 관리하고, Supabase Auth/DB로 사용자 인증과 실험 데이터 저장을 처리합니다. core/physics 모듈에서 Euler→RK4 적분으로 정확한 궤적을 계산하며, 프로 투수의 구종별 프리셋 시스템을 제공합니다.",
    challenges: [
      {
        problem: "단순 모드와 전문가 모드에서 공유하는 시뮬레이션 파라미터가 많아 컴포넌트 간 prop drilling이 심해지고 상태 관리가 복잡해졌습니다.",
        solution: "Zustand 스토어로 시뮬레이션 파라미터를 중앙 관리하고, 모드별로 다른 UI가 같은 스토어를 구독하도록 설계했습니다. selector 패턴으로 필요한 상태만 구독하여 불필요한 리렌더링을 방지했습니다.",
      },
      {
        problem: "Supabase Auth 연동 시 사용자별 실험 데이터를 저장·조회하는 과정에서 인증 상태와 DB 쿼리의 타이밍 불일치가 발생했습니다.",
        solution: "Auth 상태 변경 리스너(onAuthStateChange)를 Context로 래핑하여 인증 완료 후에만 DB 쿼리가 실행되도록 보장했습니다. RLS 정책으로 사용자 본인의 데이터만 접근 가능하도록 보안을 적용했습니다.",
      },
    ],
  },
  {
    title: "3D 웹 게임 프로젝트 (KDTgames)",
    description: "Three.js 라이브러리를 활용하여 제작된 3D 웹 게임입니다. Node.js 기반의 간단한 서버를 포함하고 있습니다.",
    techStack: ["Three.js", "JavaScript", "HTML", "Node.js"],
    githubUrl: "https://github.com/205PreDev/KDTgames",
    liveUrl: "https://youtu.be/ZZ3ksjaNbRE",
    thumbnail: "/asura-thumbnail.jpg",
    learnings: "Node.js 서버에서 멀티플레이어 게임 상태를 관리하고 클라이언트와 실시간 동기화하는 구조를 설계했습니다. 서버 권위(authoritative server) 패턴으로 게임 로직의 검증을 서버 측에서 처리하는 방법을 익히고, 클라이언트-서버 간 이벤트 기반 통신 설계 경험을 쌓았습니다.",
    detail: "Three.js를 활용한 3D PvP 웹 게임입니다. 제한 시간 내에 맵에 흩어진 무기를 주워 상대방보다 더 많이 처치하는 것이 목표입니다. Node.js 기반 서버로 멀티플레이어 동기화를 처리하고, 클라이언트-서버 간 게임 상태(플레이어 위치, 무기 획득, 킬 수, 타이머)를 실시간으로 관리합니다.",
    challenges: [
      {
        problem: "멀티플레이어 환경에서 클라이언트와 서버 간 게임 상태(플레이어 위치, 무기 획득, 킬 수) 동기화가 일관되지 않아 각 플레이어에게 다른 결과가 표시되었습니다.",
        solution: "서버를 권위적 소스(authoritative server)로 설계하여 킬 판정과 아이템 획득을 서버에서 검증한 뒤 모든 클라이언트에 브로드캐스트하는 방식으로 상태 일관성을 보장했습니다.",
      },
      {
        problem: "게임 제한 시간, 무기 리스폰, 결과 산출 등 여러 이벤트의 타이밍을 클라이언트에서 각자 관리하니 플레이어 간 타이머 차이가 발생했습니다.",
        solution: "Node.js 서버에서 게임 타이머를 단일 관리하고, 주기적으로 남은 시간을 클라이언트에 동기화했습니다. 무기 리스폰과 게임 종료 판정도 서버 타이머 기준으로 처리하여 공정성을 확보했습니다.",
      },
    ],
  },
];
