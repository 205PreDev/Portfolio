import React from 'react';
import { MessageType } from '../../data/chatbotData';

interface MessageProps {
    message: MessageType;
    isTyping?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isTyping }) => {
    const isBot = message.sender === 'bot';

    return (
        <div className={`message-container ${isBot ? 'bot' : 'user'}`}>
            <div className="message-bubble">
                {isTyping ? (
                    <div className="typing-indicator">
                        <div className="gear-container">
                            <div className="gear">⚙️</div>
                        </div>
                        <span>답변을 짜내는 중...</span>
                    </div>
                ) : (
                    <div className="message-text">{message.text}</div>
                )}
            </div>
            <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default Message;
