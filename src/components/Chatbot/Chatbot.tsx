import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import './Chatbot.css';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {isOpen ? (
                <ChatInterface onClose={() => setIsOpen(false)} />
            ) : (
                <button className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
                    <span className="btn-icon">💬</span>
                    <span className="btn-text">무엇이든 물어보세요!</span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
