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
    { label: '🚀 프로젝트가 궁금해요', value: 'projects' },
    { label: '🛠️ 기술 스택은?', value: 'skills' },
    { label: '👤 자기소개 해주세요', value: 'about' },
    { label: '💡 어떤 걸 배웠나요?', value: 'learnings' },
];

export const BOT_NAME = '포트폴리오 AI 비서';
