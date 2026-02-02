import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { MessageType, QUICK_ACTIONS } from '../../data/chatbotData';

interface ChatInterfaceProps {
    onClose: () => void;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const STORAGE_KEY = 'portfolio-chat-history';

const getInitialMessages = (): MessageType[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.messages.map((msg: MessageType) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));
        }
    } catch {
        // 파싱 실패 시 기본값 사용
    }
    return [{
        id: 'welcome',
        text: '안녕하세요! 포트폴리오에 대해 궁금한 것을 물어보세요.',
        sender: 'bot',
        timestamp: new Date(),
    }];
};

const getInitialSessionId = (): string | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved).sessionId || null;
        }
    } catch {
        // 파싱 실패 시 null 반환
    }
    return null;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<MessageType[]>(getInitialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(getInitialSessionId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // 대화 기록 localStorage에 저장
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            messages,
            sessionId,
        }));
    }, [messages, sessionId]);

    const handleSend = async (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMessage: MessageType = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        abortControllerRef.current = new AbortController();

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    session_id: sessionId,
                }),
                signal: abortControllerRef.current.signal,
            });

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const botMessage: MessageType = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                // 사용자가 요청을 중단함 - 메시지 표시하지 않음
                return;
            }
            const errorMessage: MessageType = {
                id: (Date.now() + 1).toString(),
                text: '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
                sender: 'bot',
                timestamp: new Date(),
                isFallback: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            abortControllerRef.current = null;
            setIsTyping(false);
        }
    };

    const handleAbort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleQuickAction = (value: string, label: string) => {
        handleSend(label);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('your-email@example.com');
        alert('이메일 주소가 복사되었습니다!');
    };

    const scrollToContact = () => {
        onClose();
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <h3>포트폴리오 AI 비서</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <React.Fragment key={msg.id}>
                        <Message message={msg} />
                        {msg.isFallback && (
                            <div className="fallback-actions">
                                <button onClick={scrollToContact}>📍 연락처 섹션으로 이동</button>
                                <button onClick={handleCopyEmail}>📋 이메일 주소 복사</button>
                                <a href="mailto:your-email@example.com" className="email-link">📧 메일 앱 열기</a>
                            </div>
                        )}
                    </React.Fragment>
                ))}
                {isTyping && (
                    <Message
                        message={{
                            id: 'typing',
                            text: '',
                            sender: 'bot',
                            timestamp: new Date(),
                        }}
                        isTyping={true}
                    />
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
                <div className="quick-actions">
                    {QUICK_ACTIONS.map((action) => (
                        <button
                            key={action.value}
                            onClick={() => handleQuickAction(action.value, action.label)}
                            disabled={isTyping}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
                <form
                    className="chat-input-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend(inputValue);
                    }}
                >
                    <input
                        type="text"
                        placeholder="프로젝트, 기술 스택 등을 물어보세요..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    {isTyping ? (
                        <button type="button" className="abort-btn" onClick={handleAbort}>
                            중단
                        </button>
                    ) : (
                        <button type="submit" disabled={!inputValue.trim()}>
                            전송
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
