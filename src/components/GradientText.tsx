import React, { useEffect, useRef } from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
  gradientColors?: string[];
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal';
  animationDuration?: number;
  animationDelay?: number;
  animationIterationCount?: number | 'infinite';
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  gradientColors = ['#00f2fe', '#4facfe'],
  gradientDirection = 'horizontal',
  animationDuration = 3,
  animationDelay = 0,
  animationIterationCount = 'infinite',
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      
      // Set up the gradient animation
      const gradientStyle = document.createElement('style');
      const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`;
      
      let gradientDefinition = '';
      
      if (gradientDirection === 'horizontal') {
        gradientDefinition = `
          @keyframes ${gradientId} {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
      } else if (gradientDirection === 'vertical') {
        gradientDefinition = `
          @keyframes ${gradientId} {
            0% { background-position: 50% 0%; }
            50% { background-position: 50% 100%; }
            100% { background-position: 50% 0%; }
          }
        `;
      } else {
        gradientDefinition = `
          @keyframes ${gradientId} {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
        `;
      }
      
      gradientStyle.textContent = gradientDefinition;
      document.head.appendChild(gradientStyle);
      
      // Apply the gradient to the element
      element.style.background = `linear-gradient(${
        gradientDirection === 'horizontal' ? '90deg' : 
        gradientDirection === 'vertical' ? '180deg' : '45deg'
      }, ${gradientColors.join(', ')})`;
      element.style.backgroundSize = '200% 200%';
      element.style.animation = `${gradientId} ${animationDuration}s ease infinite ${animationDelay}s`;
      element.style.animationIterationCount = animationIterationCount.toString();
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
      element.style.backgroundClip = 'text';
      
      return () => {
        document.head.removeChild(gradientStyle);
      };
    }
  }, [gradientColors, gradientDirection, animationDuration, animationDelay, animationIterationCount]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
};

export default GradientText; 