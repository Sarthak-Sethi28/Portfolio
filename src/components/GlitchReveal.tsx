import React, { useState, useEffect } from 'react';

interface GlitchRevealProps {
  text: string;
  className?: string;
  glitchColors?: string[];
  revealDuration?: number;
  glitchIntensity?: number;
  glitchDuration?: number;
  glitchInterval?: number;
}

const GlitchReveal: React.FC<GlitchRevealProps> = ({
  text,
  className = '',
  glitchColors = ['#00f2fe', '#ff00ff', '#00f2fe'],
  revealDuration = 1.5,
  glitchIntensity = 0.7,
  glitchDuration = 0.2,
  glitchInterval = 3000,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generate random characters for glitch effect
  const getRandomChar = () => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Create glitch effect
  const createGlitch = () => {
    if (!isGlitching) return;
    
    const glitchChars = text.split('').map(char => {
      if (Math.random() < glitchIntensity) {
        return getRandomChar();
      }
      return char;
    });
    
    setGlitchText(glitchChars.join(''));
  };

  // Handle glitch animation
  useEffect(() => {
    if (isGlitching) {
      const interval = setInterval(createGlitch, 50);
      const timeout = setTimeout(() => {
        setIsGlitching(false);
        setGlitchText('');
      }, glitchDuration * 1000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isGlitching, text, glitchIntensity, glitchDuration]);

  // Trigger glitch periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
    }, glitchInterval);
    
    return () => clearInterval(interval);
  }, [glitchInterval]);

  // Handle reveal animation
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + revealDuration * 1000;
    
    const animationFrame = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / (revealDuration * 1000), 1);
      
      setProgress(newProgress);
      
      if (now < endTime) {
        requestAnimationFrame(animationFrame);
      } else {
        setIsRevealed(true);
      }
    };
    
    requestAnimationFrame(animationFrame);
  }, [revealDuration]);

  // Add keyframes for glitch animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitch-1 {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }
      @keyframes glitch-2 {
        0% { transform: translate(0); }
        20% { transform: translate(2px, -2px); }
        40% { transform: translate(2px, 2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(-2px, 2px); }
        100% { transform: translate(0); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Calculate clip path for reveal effect
  const clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;

  return (
    <div className={`relative ${className}`}>
      {/* Main text with reveal animation */}
      <div 
        className="relative"
        style={{ 
          clipPath,
          transition: 'clip-path 0.1s ease-out'
        }}
      >
        <span className="text-white">{text}</span>
        
        {/* Glitch layers */}
        {isGlitching && (
          <>
            <span 
              className="absolute top-0 left-0 text-transparent"
              style={{ 
                textShadow: `2px 0 ${glitchColors[0]}`,
                animation: 'glitch-1 0.2s infinite'
              }}
            >
              {glitchText}
            </span>
            <span 
              className="absolute top-0 left-0 text-transparent"
              style={{ 
                textShadow: `-2px 0 ${glitchColors[1]}`,
                animation: 'glitch-2 0.2s infinite'
              }}
            >
              {glitchText}
            </span>
          </>
        )}
      </div>
      
      {/* Reveal line */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"
        style={{ 
          width: `${progress * 100}%`,
          transition: 'width 0.1s ease-out'
        }}
      />
    </div>
  );
};

export default GlitchReveal; 