import React, { useState, useEffect } from 'react';

const skills = [
  { name: 'React', color: '#00f2fe', group: 0 },
  { name: 'TypeScript', color: '#007acc', group: 0 },
  { name: 'JavaScript', color: '#f7df1e', group: 0 },
  { name: 'HTML', color: '#e34c26', group: 1 },
  { name: 'CSS', color: '#264de4', group: 1 },
  { name: 'Tailwind CSS', color: '#38bdf8', group: 1 },
  { name: 'Node.js', color: '#3c873a', group: 2 },
  { name: 'Express.js', color: '#888', group: 2 },
  { name: 'Python', color: '#3776ab', group: 2 },
  { name: 'Django', color: '#092e20', group: 2 },
  { name: 'REST APIs', color: '#ff9800', group: 2 },
  { name: 'MongoDB', color: '#47a248', group: 3 },
  { name: 'PostgreSQL', color: '#336791', group: 3 },
  { name: 'MySQL', color: '#00758f', group: 3 },
  { name: 'Docker', color: '#0db7ed', group: 4 },
  { name: 'Git', color: '#f34f29', group: 4 },
  { name: 'GitHub Actions', color: '#2088ff', group: 4 },
  { name: 'AWS', color: '#ff9900', group: 4 },
  { name: 'Vercel', color: '#fff', group: 4 },
  { name: 'VS Code', color: '#007acc', group: 5 },
  { name: 'Postman', color: '#ff6c37', group: 5 },
  { name: 'Figma', color: '#a259ff', group: 5 },
  { name: 'Jira', color: '#0052cc', group: 5 },
  { name: 'Confluence', color: '#172b4d', group: 5 }
];

// Predefined connections (by index)
const connections = [
  [0, 1], [1, 2], [0, 2], // React, TS, JS
  [3, 4], [4, 5], [3, 5], // HTML, CSS, Tailwind
  [6, 7], [7, 8], [8, 9], [9, 10], // Node, Express, Python, Django, REST
  [11, 12], [12, 13], [11, 13], // Mongo, Postgres, MySQL
  [14, 15], [15, 16], [16, 17], [17, 18], // Docker, Git, Actions, AWS, Vercel
  [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], // VSCode, Postman, Figma, Jira, Confluence
  // Cross-group connections
  [2, 6], [5, 11], [10, 14], [18, 19]
];

const width = 600, height = 400, centerX = width / 2, centerY = height / 2, radius = 150;

function getStarPos(i: number, total: number, t: number) {
  // Animate the constellation with a gentle rotation
  const angle = ((2 * Math.PI) / total) * i + t * 0.2;
  const r = radius + 30 * Math.sin(t * 0.5 + i);
  return [centerX + r * Math.cos(angle), centerY + r * Math.sin(angle)];
}

const SkillConstellation: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const anim = () => {
      setTime(t => t + 0.015);
      requestAnimationFrame(anim);
    };
    anim();
    // eslint-disable-next-line
  }, []);

  // Precompute star positions
  const starPositions = skills.map((_, i) => getStarPos(i, skills.length, time));

  return (
    <div style={{ background: 'radial-gradient(ellipse at center, #181a20 60%, #101116 100%)', borderRadius: 20, boxShadow: '0 0 32px #00f2fe33', margin: '2rem auto', maxWidth: 700, padding: 24, position: 'relative' }}>
      <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
        {/* Draw connections */}
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={starPositions[a][0]}
            y1={starPositions[a][1]}
            x2={starPositions[b][0]}
            y2={starPositions[b][1]}
            stroke={hovered !== null && (a === hovered || b === hovered) ? '#fff' : '#00f2fe44'}
            strokeWidth={hovered !== null && (a === hovered || b === hovered) ? 2.5 : 1.2}
            opacity={0.7}
          />
        ))}
        {/* Draw stars */}
        {starPositions.map(([x, y], i) => (
          <g key={skills[i].name}>
            <circle
              cx={x}
              cy={y}
              r={hovered === i ? 13 : 9}
              fill={skills[i].color}
              filter={hovered === i ? 'drop-shadow(0 0 16px #fff)' : `drop-shadow(0 0 8px ${skills[i].color})`}
              style={{ transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
            {/* Skill name */}
            <text
              x={x}
              y={y - 18}
              textAnchor="middle"
              fontSize={hovered === i ? 18 : 13}
              fill={hovered === i ? '#fff' : skills[i].color}
              fontWeight={hovered === i ? 900 : 700}
              style={{ textShadow: hovered === i ? '0 0 8px #fff' : undefined, pointerEvents: 'none', userSelect: 'none', transition: 'all 0.2s' }}
            >
              {skills[i].name}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center', color: '#00f2fe', fontWeight: 700, fontSize: 18, letterSpacing: 2 }}>
        Skill Constellation
      </div>
    </div>
  );
};

export default SkillConstellation; 