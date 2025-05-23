import React, { useState } from 'react';

const skills = [
  { name: 'Python', color: '#3776ab' },
  { name: 'C/C++', color: '#00599c' },
  { name: 'R', color: '#198ce7' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'SQL', color: '#e38c00' },
  { name: 'HTML/CSS', color: '#e34c26' },
  { name: 'React', color: '#00f2fe' },
  { name: 'Node.js', color: '#3c873a' },
  { name: 'Flask', color: '#000' },
  { name: 'Github API', color: '#24292e' },
  { name: 'REST API', color: '#ff9800' },
  { name: 'OpenAI API', color: '#10a37f' },
  { name: 'AWS (EC2, S3)', color: '#ff9900' },
  { name: 'Docker', color: '#0db7ed' },
  { name: 'Jest', color: '#c21325' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Git', color: '#f34f29' },
  { name: 'Figma', color: '#a259ff' },
  { name: 'Canva', color: '#00c4cc' },
  { name: 'Power BI', color: '#f2c811' },
  { name: 'Cursor', color: '#00f2fe' },
  { name: 'Pear AI', color: '#8f00ff' },
];

const SkillCarousel: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const visible = 7; // Number of cards visible at once
  const half = Math.floor(visible / 2);

  const getCardStyle = (i: number) => {
    const offset = ((i - centerIdx + skills.length) % skills.length);
    let rel = offset;
    if (offset > skills.length / 2) rel = offset - skills.length; // wrap around
    const z = -Math.abs(rel);
    const scale = rel === 0 ? 1.1 : 1 - Math.abs(rel) * 0.13;
    const rotateY = rel * 28;
    const translateX = rel * 60;
    const blur = Math.abs(rel) > 2 ? 2 : 0;
    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex: 10 + z,
      filter: `blur(${blur}px)`,
      opacity: Math.abs(rel) > half ? 0 : 1,
      boxShadow: rel === 0 ? `0 0 24px ${skills[i].color}` : undefined,
      transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
      cursor: rel === 0 ? 'pointer' : 'grab',
    };
  };

  const prev = () => setCenterIdx((centerIdx - 1 + skills.length) % skills.length);
  const next = () => setCenterIdx((centerIdx + 1) % skills.length);

  return (
    <div style={{ perspective: 1200, margin: '2rem auto', maxWidth: 700, position: 'relative', minHeight: 320 }}>
      <div style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center', color: '#00f2fe', fontWeight: 700, fontSize: 18, letterSpacing: 2 }}>
        Skill Carousel
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320, position: 'relative' }}>
        <button onClick={prev} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#00f2fe', fontSize: 32, cursor: 'pointer', zIndex: 20 }}>&lt;</button>
        <div style={{ position: 'relative', width: 420, height: 320 }}>
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                position: 'absolute',
                top: 80,
                left: '50%',
                width: 140,
                height: 160,
                background: '#181a20ee',
                borderRadius: 18,
                border: `2.5px solid ${skill.color}`,
                color: skill.color,
                fontWeight: 900,
                fontSize: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px #00f2fe33',
                userSelect: 'none',
                ...getCardStyle(i),
              }}
            >
              <span style={{ fontSize: 38, marginBottom: 8 }}>{skill.name[0]}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
        <button onClick={next} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#00f2fe', fontSize: 32, cursor: 'pointer', zIndex: 20 }}>&gt;</button>
      </div>
    </div>
  );
};

export default SkillCarousel; 