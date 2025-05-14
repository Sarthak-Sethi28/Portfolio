import React, { useEffect, useRef, useState } from 'react';

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

const SkillWaterfall: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [positions, setPositions] = useState(() => skills.map(() => getRandom(-200, 0)));
  const [speeds] = useState(() => skills.map(() => getRandom(1.2, 2.5)));
  const requestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setPositions(prev => prev.map((y, i) => {
        if (hovered === i) return y; // Pause on hover
        let next = y + speeds[i];
        if (next > 420) next = getRandom(-60, 0); // Reset to top
        return next;
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [hovered, speeds]);

  return (
    <div style={{ position: 'relative', height: 420, background: 'linear-gradient(to bottom, #181a20 60%, #101116 100%)', borderRadius: 20, boxShadow: '0 0 32px #00f2fe33', margin: '2rem auto', maxWidth: 700, overflow: 'hidden' }}>
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          style={{
            position: 'absolute',
            left: `calc(${(i + 0.5) * (100 / skills.length)}% - 32px)`,
            top: positions[i],
            color: skill.color,
            fontWeight: 700,
            fontSize: hovered === i ? 28 : 20,
            textShadow: hovered === i ? '0 0 16px #fff' : `0 0 8px ${skill.color}`,
            cursor: 'pointer',
            transition: 'font-size 0.2s, text-shadow 0.2s',
            zIndex: hovered === i ? 2 : 1,
            filter: hovered === i ? 'brightness(1.5)' : 'none',
            userSelect: 'none',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === i ? (
            <span style={{
              background: '#181a20ee',
              borderRadius: 8,
              padding: '6px 18px',
              color: '#fff',
              fontWeight: 900,
              fontSize: 22,
              boxShadow: `0 0 16px ${skill.color}`,
              border: `2px solid ${skill.color}`,
              position: 'relative',
              top: -32,
              left: -12,
              whiteSpace: 'nowrap',
            }}>{skill.name}</span>
          ) : (
            <span>{skill.name[0]}</span>
          )}
        </div>
      ))}
      <div style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center', color: '#00f2fe', fontWeight: 700, fontSize: 18, letterSpacing: 2 }}>
        Skill Waterfall
      </div>
    </div>
  );
};

export default SkillWaterfall; 