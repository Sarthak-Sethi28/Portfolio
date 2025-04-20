import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';

interface CyberCardProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

const CyberCard: React.FC<CyberCardProps> = ({ 
  children, 
  glowColor = '#00fff2',
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tilt
      className={`relative ${className}`}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1000}
      onEnter={() => setIsHovered(true)}
      onLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden rounded-lg
          bg-gray-900/80 backdrop-blur-sm
          border border-gray-700
          transition-all duration-300
          ${isHovered ? 'shadow-lg' : ''}
        `}
        style={{
          boxShadow: isHovered ? `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}20` : 'none'
        }}
      >
        {/* Glitch lines */}
        <div className="absolute inset-0 overflow-hidden">
          {isHovered && Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] bg-white/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                transform: `translateX(${Math.random() * 100 - 50}%)`,
                opacity: Math.random() * 0.5 + 0.25,
                filter: 'blur(1px)',
                animation: `glitch-line ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/50" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </Tilt>
  );
};

export default CyberCard; 