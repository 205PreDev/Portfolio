# Portfolio Project Guide

## 프로젝트 추가 방법

### 1. `src/data/projects.ts` 파일 수정

```typescript
{
  title: "프로젝트 제목",
  description: "프로젝트 설명",
  techStack: ["React", "TypeScript", "..."],
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://live-demo.com",  // 선택사항
  thumbnail: "https://이미지URL 또는 로컬경로",
  learnings: "이 프로젝트에서 배운 점",
}
```

### 2. 필수 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| title | string | 프로젝트 제목 |
| description | string | 프로젝트 설명 |
| techStack | string[] | 사용 기술 스택 배열 |
| githubUrl | string | GitHub 저장소 URL |
| thumbnail | string | 썸네일 이미지 URL |
| learnings | string | 프로젝트에서 배운 점 |

### 3. 선택 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| liveUrl | string | 배포된 사이트 URL |

### 4. 예시

GitHub 주소만 알려주면 아래 정보를 확인 후 추가:
- README.md에서 프로젝트 설명 추출
- package.json 또는 코드에서 기술 스택 파악
- 썸네일은 placeholder 또는 스크린샷 사용

## 프로젝트 구조

```
src/
├── components/
│   ├── Chatbot/      # RAG 기반 AI 챗봇
│   ├── ProjectCard.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── data/
│   ├── projects.ts   # 프로젝트 데이터
│   ├── chatbotData.ts
│   └── personalInfo.ts
└── App.tsx
```
