import React, { useState, useEffect, useMemo } from 'react';
import './AIFace.css';

const AIFace: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateY = ((e.clientX - centerX) / centerX) * 12;
      const rotateX = ((centerY - e.clientY) / centerY) * 8;

      setMousePos({ x: rotateX, y: rotateY });
    };

    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        const threshold = window.innerHeight * 0.7; // 홈 화면의 30% 벗어나면
        setIsMinimized(rect.bottom < threshold);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 타원 형태로 점들 생성
  const generateEyeDots = useMemo(() => {
    const dots: { x: number; y: number; size: number }[] = [];
    const radiusX = 40; // 타원 가로 반지름
    const radiusY = 60; // 타원 세로 반지름

    // 타원 내부에 점들 배치
    for (let y = -radiusY; y <= radiusY; y += 8) {
      for (let x = -radiusX; x <= radiusX; x += 8) {
        // 타원 방정식: (x/a)^2 + (y/b)^2 <= 1
        const normalizedX = x / radiusX;
        const normalizedY = y / radiusY;
        if (normalizedX * normalizedX + normalizedY * normalizedY <= 1) {
          // 중심에 가까울수록 큰 점
          const distFromCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
          const size = 4 + (1 - distFromCenter) * 3;
          dots.push({ x, y, size });
        }
      }
    }
    return dots;
  }, []);

  const eyeOffsetX = mousePos.y * 0.3;
  const eyeOffsetY = -mousePos.x * 0.3;

  return (
    <div className={`ai-face-wrapper ${isMinimized ? 'minimized' : ''}`}>
      <div
        className="ai-face-eve"
        style={{
          transform: isMinimized
            ? 'none'
            : `perspective(1000px) rotateX(${mousePos.x}deg) rotateY(${mousePos.y}deg)`
        }}
      >
        <div className="eve-head">
          <div className="eve-eyes">
            {/* 왼쪽 눈 */}
            <div
              className="eve-eye"
              style={{
                transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`
              }}
            >
              {generateEyeDots.map((dot, i) => (
                <div
                  key={i}
                  className="eye-dot"
                  style={{
                    left: `calc(50% + ${dot.x}px)`,
                    top: `calc(50% + ${dot.y}px)`,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}
            </div>
            {/* 오른쪽 눈 */}
            <div
              className="eve-eye"
              style={{
                transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`
              }}
            >
              {generateEyeDots.map((dot, i) => (
                <div
                  key={i}
                  className="eye-dot"
                  style={{
                    left: `calc(50% + ${dot.x}px)`,
                    top: `calc(50% + ${dot.y}px)`,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFace;
