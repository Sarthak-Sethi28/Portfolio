import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Background3D: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Create particles dynamically
    const numParticles = 50;
    const container = particlesRef.current;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      
      // Random particle properties
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 60 + 30;
      const delay = Math.random() * -30;
      const opacity = Math.random() * 0.5 + 0.2;
      
      // Apply styles
      particle.className = 'absolute rounded-full bg-cyan-400/80';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = `${opacity}`;
      particle.style.boxShadow = '0 0 10px rgba(0, 242, 254, 0.7)';
      particle.style.animation = `float ${duration}s ease-in-out infinite`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-cyber-black">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom',
          height: '200%',
          bottom: '-20%',
          top: 'auto'
        }}
      />
      
      {/* Radial glow */}
      <div className="absolute inset-0 bg-cyber-radial opacity-40" />
      
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-secondary-500/20 to-transparent" />
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary-500/20 to-transparent" />
      
      {/* Moving horizontal scanline */}
      <motion.div 
        className="absolute inset-x-0 h-[1px] bg-cyber-accent/40"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 z-0" />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Background3D; 