import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title">연락처</h2>
        <div className="contact-content">
          <p>아래 채널을 통해 편하게 연락주세요.</p>
          <div className="contact-links">
            <a href="mailto:your-email@example.com" className="contact-link-btn">이메일</a>
            <a href="https://github.com/205PreDev" target="_blank" rel="noopener noreferrer" className="contact-link-btn">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
