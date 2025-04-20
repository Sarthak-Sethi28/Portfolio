import React, { useEffect, useRef, useState } from 'react';

interface FuzzyTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  glitchIntensity?: number;
  glitchDuration?: number;
  glitchInterval?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  text,
  className = '',
  duration = 0.5,
  delay = 0,
  glitchIntensity = 0.5,
  glitchDuration = 0.1,
  glitchInterval = 2000,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);

  // Function to generate random characters
  const generateRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  // Function to create glitch effect
  const createGlitch = () => {
    if (!isGlitching) return;
    
    const newText = text.split('').map((char, index) => {
      // Only glitch some characters based on intensity
      if (Math.random() < glitchIntensity) {
        return generateRandomChar();
      }
      return char;
    }).join('');
    
    setGlitchText(newText);
    
    // Continue glitching until the duration is over
    if (isGlitching) {
      glitchTimeoutRef.current = window.setTimeout(() => {
        createGlitch();
      }, glitchDuration * 1000);
    }
  };

  // Start and stop glitch effect
  useEffect(() => {
    // Start periodic glitching
    intervalRef.current = window.setInterval(() => {
      setIsGlitching(true);
      createGlitch();
      
      // Stop glitching after a short duration
      setTimeout(() => {
        setIsGlitching(false);
        setGlitchText(text);
      }, glitchDuration * 1000);
    }, glitchInterval);
    
    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, [text, glitchIntensity, glitchDuration, glitchInterval]);

  return (
    <span 
      className={`inline-block ${className}`}
      style={{ 
        transition: `all ${duration}s ease-in-out ${delay}s`,
        transform: isGlitching ? 'skew(2deg, 0deg)' : 'skew(0deg, 0deg)',
        textShadow: isGlitching 
          ? '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff' 
          : '0 0 10px rgba(0, 255, 242, 0.5)',
      }}
    >
      {isGlitching ? glitchText : text}
    </span>
  );
};

export default FuzzyText; 