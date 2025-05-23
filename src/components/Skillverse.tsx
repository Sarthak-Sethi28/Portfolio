import React, { useState, useEffect, useRef } from 'react';

const skills = [
  { name: 'React', color: '#00f2fe' },
  { name: 'TypeScript', color: '#007acc' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'HTML', color: '#e34c26' },
  { name: 'CSS', color: '#264de4' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Node.js', color: '#3c873a' },
  { name: 'Express.js', color: '#888' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Django', color: '#092e20' },
  { name: 'REST APIs', color: '#ff9800' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'Docker', color: '#0db7ed' },
  { name: 'Git', color: '#f34f29' },
  { name: 'GitHub Actions', color: '#2088ff' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Vercel', color: '#fff' },
  { name: 'VS Code', color: '#007acc' },
  { name: 'Postman', color: '#ff6c37' },
  { name: 'Figma', color: '#a259ff' },
  { name: 'Jira', color: '#0052cc' },
  { name: 'Confluence', color: '#172b4d' }
];

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Skillverse: React.FC = () => {
  const [supernovaIdx, setSupernovaIdx] = useState<number | null>(null);
  const [easterEgg, setEasterEgg] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [baseAngle, setBaseAngle] = useState(0);
  const requestRef = useRef<number>();

  // Animate base angle for smooth rotation
  useEffect(() => {
    const animate = () => {
      setBaseAngle(prev => (prev + 0.18) % 360);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // Supernova event
  useEffect(() => {
    const interval = setInterval(() => {
      setSupernovaIdx(Math.floor(Math.random() * skills.length));
      setTimeout(() => setSupernovaIdx(null), 1200);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // SVG center
  const cx = 250, cy = 250, sunRadius = 38, orbitBase = 90, orbitStep = 18;

  return (
    <div style={{ background: 'radial-gradient(ellipse at center, #181a20 60%, #101116 100%)', borderRadius: 20, boxShadow: '0 0 32px #00f2fe33', margin: '2rem auto', maxWidth: 520, padding: 24, position: 'relative' }}>
      {/* Cosmic background */}
      <svg width={500} height={500} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        {[...Array(60)].map((_, i) => (
          <circle key={i} cx={getRandom(0, 500)} cy={getRandom(0, 500)} r={getRandom(0.5, 1.8)} fill="#fff" opacity={getRandom(0.08, 0.18)} />
        ))}
        {/* Nebula */}
        <ellipse cx={cx} cy={cy} rx={180} ry={80} fill="#00f2fe22" />
        <ellipse cx={cx} cy={cy} rx={120} ry={40} fill="#8f00ff11" />
      </svg>
      <svg width={500} height={500} style={{ position: 'relative', zIndex: 1 }}>
        {/* Orbits */}
        {skills.map((_, i) => (
          <circle key={i} cx={cx} cy={cy} r={orbitBase + orbitStep * (i % 6)} fill="none" stroke="#00f2fe22" strokeDasharray="2 6" />
        ))}
        {/* Sun (You) */}
        <g>
          <circle cx={cx} cy={cy} r={sunRadius} fill="#00f2fe" filter="url(#glow)" style={{ cursor: 'pointer' }}
            onClick={() => setEasterEgg(e => !e)} />
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize={easterEgg ? 22 : 18} fill="#181a20" fontWeight="bold" style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {easterEgg ? '👾' : 'YOU'}
          </text>
        </g>
        {/* Planets (Skills) */}
        {skills.map((skill, i) => {
          // Evenly space planets
          const angle = baseAngle + (360 / skills.length) * i;
          const rad = (angle * Math.PI) / 180;
          const r = orbitBase + orbitStep * (i % 6);
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          const isSupernova = supernovaIdx === i;
          return (
            <g key={skill.name} style={{ transition: 'filter 0.3s', filter: hovered === i ? 'drop-shadow(0 0 16px #fff)' : undefined }}>
              {/* Trail */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={skill.color} strokeWidth={hovered === i ? 2.5 : 1.2} strokeDasharray="2 8" opacity={0.18} />
              {/* Planet */}
              <circle
                cx={x}
                cy={y}
                r={isSupernova ? 28 : 15}
                fill={isSupernova ? '#fff' : skill.color}
                style={{
                  transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
                  cursor: 'pointer',
                  filter: isSupernova ? 'blur(4px) brightness(2)' : `drop-shadow(0 0 12px ${skill.color})`,
                  animation: hovered === i ? 'planetPulse 0.7s infinite alternate' : 'planetPulse 1.8s infinite alternate',
                  opacity: isSupernova ? 0.7 : 1
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Skill name always visible, orbiting the planet */}
              <defs>
                <path id={`circlePath${i}`} d={`M ${x} ${y} m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0`} />
              </defs>
              <text fontSize={12} fill={hovered === i ? '#fff' : skill.color} fontWeight="bold" style={{ fontWeight: hovered === i ? 900 : 700, textShadow: hovered === i ? '0 0 8px #fff' : undefined }}>
                <textPath href={`#circlePath${i}`} startOffset="25%">
                  {skill.name} • {skill.name}
                </textPath>
              </text>
              {/* Supernova burst: radiating lines */}
              {isSupernova && (
                <g>
                  {[...Array(12)].map((_, j) => {
                    const blastAngle = (360 / 12) * j;
                    const blastRad = (blastAngle * Math.PI) / 180;
                    const blastLen = 38 + 18 * Math.sin(Date.now() / 120);
                    const bx1 = x + Math.cos(blastRad) * 0;
                    const by1 = y + Math.sin(blastRad) * 0;
                    const bx2 = x + Math.cos(blastRad) * blastLen;
                    const by2 = y + Math.sin(blastRad) * blastLen;
                    return (
                      <line key={j} x1={bx1} y1={by1} x2={bx2} y2={by2} stroke="#8f00ff" strokeWidth={3} opacity={0.7} />
                    );
                  })}
                  <circle cx={x} cy={y} r={48} fill="#fff" opacity={0.22} />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize={28} fill="#8f00ff" fontWeight="bold">💥</text>
                </g>
              )}
            </g>
          );
        })}
        {/* SVG filter for sun glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Easter egg message */}
      {easterEgg && <div style={{ position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center', color: '#8f00ff', fontWeight: 700, fontSize: 18, textShadow: '0 0 8px #fff' }}>👾 Welcome to the Skillverse! 🚀</div>}
      <style>{`
        @keyframes planetPulse {
          0% { filter: brightness(1) drop-shadow(0 0 8px #00f2fe); }
          100% { filter: brightness(1.3) drop-shadow(0 0 24px #fff); }
        }
      `}</style>
    </div>
  );
};

export default Skillverse; 