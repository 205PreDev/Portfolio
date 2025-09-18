import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title">개발자 소개</h2>
        <div className="about-content">
          <p>
            안녕하세요! 웹 기술을 통해 아이디어를 현실로 만드는 것을 즐기는 개발자입니다.
            사용자에게 가치 있는 경험을 제공하는 깔끔하고 효율적인 코드를 작성하기 위해 항상 노력합니다.
          </p>
          <p>
            새로운 기술을 배우고 동료들과 지식을 공유하는 과정에서 큰 보람을 느낍니다.
            이 포트폴리오는 저의 학습 과정과 결과물을 담은 공간입니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
