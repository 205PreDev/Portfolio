import { Document, Page, Text, View, StyleSheet, Link, Font, Image } from '@react-pdf/renderer';
import { projects } from '../data/projects';

// 로컬 폰트 등록 (public/fonts/ 에 TTF 파일 필요)
Font.register({
  family: 'NotoSansKR',
  fonts: [
    { src: '/fonts/NotoSansKR-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/NotoSansKR-Bold.ttf', fontWeight: 700 },
  ],
});

// === 색상 팔레트 ===
const C = {
  accent: '#646cff',
  accentLight: '#818cf8',
  dark: '#0a0a0f',
  darkCard: '#111118',
  white: '#ffffff',
  gray: '#a1a1aa',
  grayLight: '#d4d4d8',
  border: '#27272a',
};

const base = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansKR',
    fontSize: 10,
    color: C.white,
    backgroundColor: C.dark,
  },
});

// ━━━ 표지 ━━━
const cover = StyleSheet.create({
  page: { ...base.page, justifyContent: 'center', alignItems: 'center' },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: '100%',
    backgroundColor: C.accent,
  },
  photoWrap: {
    width: 400,
    height: 400,
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photoImg: {
    width: 400,
    height: 400,
  },
  name: { fontSize: 42, fontWeight: 700, letterSpacing: 2 },
  role: { fontSize: 16, color: C.gray, marginTop: 8 },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: C.accent,
    marginVertical: 20,
    borderRadius: 2,
  },
  contactRow: { flexDirection: 'row', gap: 20, fontSize: 9, color: C.grayLight },
  link: { color: C.accentLight, textDecoration: 'none' },
  yearBadge: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    fontSize: 9,
    color: C.gray,
  },
});

// ━━━ 프로필 & 기술 페이지 ━━━
const profile = StyleSheet.create({
  page: { ...base.page, padding: 50 },
  sectionLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: C.accent,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 16 },
  body: { fontSize: 11, lineHeight: 1.8, color: C.grayLight },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 28,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  techBadge: {
    fontSize: 9,
    color: C.accentLight,
    backgroundColor: 'rgba(100, 108, 255, 0.15)',
    padding: '4 12',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(100, 108, 255, 0.3)',
  },
  pageNum: {
    position: 'absolute',
    bottom: 30,
    right: 50,
    fontSize: 8,
    color: C.gray,
  },
  pageLabel: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    fontSize: 8,
    color: C.gray,
  },
});

// ━━━ 프로젝트 페이지 ━━━
const proj = StyleSheet.create({
  page: { ...base.page, padding: 0 },
  // 상단 썸네일 영역
  heroWrap: {
    height: 260,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: 'linear-gradient(transparent, #0a0a0f)',
  },
  // 프로젝트 번호
  projectNum: {
    position: 'absolute',
    top: 20,
    right: 30,
    fontSize: 48,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.15)',
  },
  // 본문
  content: {
    padding: '24 50 50 50',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8,
    marginBottom: 20,
  },
  techTag: {
    fontSize: 8,
    color: C.accentLight,
    padding: '3 8',
    borderRadius: 4,
    backgroundColor: 'rgba(100, 108, 255, 0.12)',
  },
  descLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: C.accent,
    letterSpacing: 2,
    marginBottom: 8,
  },
  descText: {
    fontSize: 10,
    lineHeight: 1.7,
    color: C.grayLight,
    marginBottom: 20,
  },
  learningsBox: {
    backgroundColor: C.darkCard,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: C.accent,
  },
  learningsLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: C.accent,
    marginBottom: 6,
  },
  learningsText: {
    fontSize: 9,
    lineHeight: 1.7,
    color: C.grayLight,
  },
  // 문제 해결 섹션
  challengeWrap: {
    marginTop: 16,
  },
  challengeCard: {
    backgroundColor: C.darkCard,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  challengeProblem: {
    padding: '8 12',
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  challengeSolution: {
    padding: '8 12',
    backgroundColor: 'rgba(34, 197, 94, 0.06)',
  },
  challengeLabel: {
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 3,
  },
  challengeProblemLabel: {
    color: '#f87171',
  },
  challengeSolutionLabel: {
    color: '#4ade80',
  },
  challengeText: {
    fontSize: 8,
    lineHeight: 1.6,
    color: C.grayLight,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
    fontSize: 9,
  },
  link: {
    color: C.accentLight,
    textDecoration: 'none',
  },
  pageNum: {
    position: 'absolute',
    bottom: 20,
    right: 50,
    fontSize: 8,
    color: C.gray,
  },
  pageLabel: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    fontSize: 8,
    color: C.gray,
  },
});

// ━━━ 뒷표지 ━━━
const back = StyleSheet.create({
  page: { ...base.page, justifyContent: 'center', alignItems: 'center' },
  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: C.accent,
  },
  heading: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  sub: { fontSize: 11, color: C.gray, marginBottom: 24 },
  contactItem: {
    fontSize: 10,
    color: C.grayLight,
    marginBottom: 6,
  },
  link: { color: C.accentLight, textDecoration: 'none' },
});

// ━━━ 컴포넌트 ━━━
const PortfolioPDF = () => {
  const allTech = Array.from(new Set(projects.flatMap(p => p.techStack)));
  const totalPages = 2 + projects.length + 1; // 표지 + 프로필 + 프로젝트들 + 뒷표지

  return (
    <Document>
      {/* ── 1. 표지 ── */}
      <Page size="A4" style={cover.page}>
        <View style={cover.accentBar} />
        <View style={cover.photoWrap}>
          <Image style={cover.photoImg} src={new URL('/myshot.png', window.location.origin).href} />
        </View>
        <Text style={cover.name}>이영호</Text>
        <Text style={cover.role}>Full-Stack Developer Portfolio</Text>
        <View style={cover.divider} />
        <View style={cover.contactRow}>
          <Text>lyh2050609@gmail.com</Text>
          <Link style={cover.link} src="https://github.com/205PreDev">
            github.com/205PreDev
          </Link>
        </View>
        <Text style={cover.yearBadge}>2026</Text>
      </Page>

      {/* ── 2. 프로필 + 기술 스택 ── */}
      <Page size="A4" style={profile.page}>
        <Text style={profile.sectionLabel}>ABOUT</Text>
        <Text style={profile.heading}>개발자 소개</Text>
        <Text style={profile.body}>
          뭘 쓰느냐보다 어떻게 쓰느냐가 중요하다고 믿는 개발자입니다. AI를 적극 활용해 반복 작업을 줄이고, 아낀 시간을 설계와 코드 품질에 투자합니다.
        </Text>
        <Text style={profile.body}>
          이 포트폴리오 자체도 Claude Code와의 페어 프로그래밍으로 제작했고, Convi 프로젝트에서는 AI로 Supabase RLS 정책 17개 테이블의 보안 규칙을 검증하고 TanStack Query 캐시 전략을 설계했습니다. 3DU에서는 RK4 물리 수식 구현 시 AI 코드 리뷰로 엣지 케이스를 사전에 잡아냈습니다.
        </Text>
        <Text style={profile.body}>
          막히면 공식 문서 → 커뮤니티 → 직접 실험 순서로 풀어가며, 읽는 사람이 바로 이해할 수 있는 코드를 좋은 코드의 기준으로 삼고 있습니다.
        </Text>
        <Text style={profile.body}>
          취미: 인디게임 제작 | 특기: 탁구
        </Text>

        <View style={profile.divider} />

        <Text style={profile.sectionLabel}>TECH STACK</Text>
        <Text style={profile.heading}>보유 기술</Text>
        <View style={profile.techGrid}>
          {allTech.map((tech) => (
            <Text key={tech} style={profile.techBadge}>{tech}</Text>
          ))}
        </View>

        <Text style={profile.pageLabel}>이영호 포트폴리오</Text>
        <Text style={profile.pageNum}>2 / {totalPages}</Text>
      </Page>

      {/* ── 3. 프로젝트별 1페이지 ── */}
      {projects.map((project, index) => (
        <Page key={project.title} size="A4" style={proj.page}>
          {/* 썸네일 히어로 */}
          <View style={proj.heroWrap}>
            <Image style={proj.heroImage} src={project.thumbnail.startsWith('/') ? new URL(project.thumbnail, window.location.origin).href : project.thumbnail} />
            <Text style={proj.projectNum}>
              {String(index + 1).padStart(2, '0')}
            </Text>
          </View>

          {/* 본문 */}
          <View style={proj.content}>
            <Text style={proj.title}>{project.title}</Text>

            <View style={proj.techRow}>
              {project.techStack.map((tech) => (
                <Text key={tech} style={proj.techTag}>{tech}</Text>
              ))}
            </View>

            <Text style={proj.descLabel}>OVERVIEW</Text>
            <Text style={proj.descText}>{project.detail}</Text>

            <View style={proj.learningsBox}>
              <Text style={proj.learningsLabel}>WHAT I LEARNED</Text>
              <Text style={proj.learningsText}>{project.learnings}</Text>
            </View>

            {project.challenges.length > 0 && (
              <View style={proj.challengeWrap}>
                <Text style={proj.descLabel}>PROBLEM SOLVING</Text>
                {project.challenges.map((c, i) => (
                  <View key={i} style={proj.challengeCard}>
                    <View style={proj.challengeProblem}>
                      <Text style={[proj.challengeLabel, proj.challengeProblemLabel]}>PROBLEM</Text>
                      <Text style={proj.challengeText}>{c.problem}</Text>
                    </View>
                    <View style={proj.challengeSolution}>
                      <Text style={[proj.challengeLabel, proj.challengeSolutionLabel]}>SOLUTION</Text>
                      <Text style={proj.challengeText}>{c.solution}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <View style={proj.linksRow}>
              <Link style={proj.link} src={project.githubUrl}>
                GitHub Repository
              </Link>
              {project.liveUrl && !project.liveUrl.endsWith('.mp4') && (
                <Link style={proj.link} src={project.liveUrl}>
                  Live Demo
                </Link>
              )}
            </View>
          </View>

          <Text style={proj.pageLabel}>이영호 포트폴리오</Text>
          <Text style={proj.pageNum}>{index + 3} / {totalPages}</Text>
        </Page>
      ))}

      {/* ── 4. 뒷표지 ── */}
      <Page size="A4" style={back.page}>
        <Text style={back.heading}>Thank You</Text>
        <Text style={back.contactItem}>Email: lyh2050609@gmail.com</Text>
        <Link style={back.link} src="https://github.com/205PreDev">
          <Text style={back.contactItem}>GitHub: github.com/205PreDev</Text>
        </Link>
        <View style={back.accentBar} />
      </Page>
    </Document>
  );
};

export default PortfolioPDF;
