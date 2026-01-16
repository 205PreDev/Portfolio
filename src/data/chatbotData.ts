import { projects } from './projects';
import { personalInfo } from './personalInfo';

export interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isFallback?: boolean;
}

export interface QuickAction {
    label: string;
    value: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
    { label: '🚀 프로젝트 보러가기', value: 'projects' },
    { label: '🛠️ 어떤 기술을 쓰나요?', value: 'skills' },
    { label: '👤 누구신가요?', value: 'about' },
    { label: '🌱 성장과정/성격', value: 'personal' },
    { label: '📧 연락처가 궁금해요', value: 'contact' },
];

export const BOT_NAME = '포트폴리오 비서';

export const getBotResponse = (input: string): { text: string; isFallback?: boolean } => {
    const lowerInput = input.toLowerCase().trim();

    // 1. About Me
    if (lowerInput.includes('누구') || lowerInput.includes('자기소개') || lowerInput.includes('소개') || lowerInput === 'about') {
        return {
            text: '안녕하세요! 저는 방문자님의 탐색을 돕는 포트폴리오 비서입니다. 열정 넘치는 신입 개발자의 기술 여정과 프로젝트를 안내해 드릴게요. 궁금한 점이 있으시면 언제든 물어봐 주세요!',
        };
    }

    // 1.5 Personal Info (Growth / Personality)
    if (lowerInput.includes('성장') || lowerInput.includes('배경') || lowerInput.includes('과정')) {
        return { text: `제 성장과정에 대해 궁금하시군요! ${personalInfo.growthProcess}` };
    }
    if (lowerInput.includes('성격') || lowerInput.includes('장점') || lowerInput.includes('단점') || lowerInput.includes('장단점') || lowerInput === 'personal') {
        return { text: `제 성격과 장단점은 다음과 같습니다. 장점은 ${personalInfo.strengths} 이며, 단점은 ${personalInfo.weaknesses} 입니다.` };
    }

    // 2. Skills
    if (lowerInput.includes('기술') || lowerInput.includes('스택') || lowerInput.includes('언어') || lowerInput === 'skills') {
        const allTech = Array.from(new Set(projects.flatMap((p) => p.techStack)));
        return {
            text: `현재 활용 가능한 기술 스택은 다음과 같습니다: ${allTech.join(', ')}. 특히 React와 TypeScript를 활용한 풀스택 개발에 관심이 많습니다!`,
        };
    }

    // 3. Projects
    if (lowerInput.includes('프로젝트') || lowerInput.includes('작업') || lowerInput === 'projects') {
        const projectTitles = projects.map((p) => p.title).join(', ');
        return {
            text: `최근 진행한 프로젝트로는 [${projectTitles}] 등이 있습니다. 구체적으로 어떤 프로젝트가 궁금하신가요?`,
        };
    }

    // 4. Contact
    if (lowerInput.includes('연락') || lowerInput.includes('메일') || lowerInput.includes('이메일') || lowerInput.includes('번호') || lowerInput === 'contact') {
        return {
            text: '저와 직접 소통하고 싶으시다면 페이지 하단의 Contact 섹션을 확인해 주세요! 이메일(your-email@example.com)이나 GitHub를 통해 언제든 환영합니다.',
        };
    }

    // 5. Fallback
    return {
        text: '죄송합니다. 입력하신 내용에 대한 답변을 찾지 못했습니다. 아래 버튼을 이용하시거나 직접 개발자에게 연락해 보시는 건 어떨까요?',
        isFallback: true,
    };
};
