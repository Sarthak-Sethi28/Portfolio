import React, { useEffect, useState } from 'react';
import './SkillsDashboard.css';

const skills = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'SQL', 'HTML/CSS', 'Bash', 'R'] },
  { category: 'Frontend', items: ['React', 'React Router', 'Tailwind CSS', 'Redux'] },
  { category: 'Backend', items: ['FastAPI', 'Flask', 'Node.js', 'Express', 'REST API', 'OpenAI API'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'SQLite', 'SQLAlchemy'] },
  { category: 'Cloud/DevOps', items: ['AWS (EC2, S3)', 'Docker', 'Render', 'Uvicorn', 'CI/CD', 'Jenkins'] },
  { category: 'Tools', items: ['Git', 'GitLab', 'Figma', 'Canva', 'Power BI', 'Cursor', 'Pear AI', 'Jest', 'Pandas', 'OpenPyXL', 'Powershell'] }
];

const aiMessages = [
  'Lightning fast UI builder!',
  'Backend wizardry detected!',
  'Database mastery unlocked!',
  'DevOps ninja mode: ON!',
  'Toolbox overflowing with power!',
  'Skill anomaly detected... enhancing!',
  'Glitch in the matrix... skill boosted!',
  'AI recommends: More coffee ☕',
  'Skill level: Over 9000!'
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SkillsDashboard: React.FC = () => {
  const [revealed, setRevealed] = useState(0);
  const [surpriseIdx, setSurpriseIdx] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState('');

  useEffect(() => {
    if (revealed < skills.flatMap(s => s.items).length) {
      const timeout = setTimeout(() => setRevealed(revealed + 1), 350);
      return () => clearTimeout(timeout);
    } else {
      // Pick a random skill for the surprise effect
      setSurpriseIdx(getRandomInt(0, skills.flatMap(s => s.items).length - 1));
      // Change AI analysis every 2 seconds
      const aiInterval = setInterval(() => {
        setAiAnalysis(aiMessages[getRandomInt(0, aiMessages.length - 1)]);
      }, 2000);
      return () => clearInterval(aiInterval);
    }
  }, [revealed]);

  // Flatten all skills for sequential reveal
  const allSkills = skills.flatMap(s => s.items.map(item => ({
    category: s.category,
    name: item
  })));

  return (
    <div className="skills-dashboard-terminal">
      <div className="terminal-header">AI Skill Analyzer v3.1 <span className="blinking-cursor">█</span></div>
      <div className="terminal-body">
        {allSkills.map((skill, idx) => {
          const revealedNow = idx < revealed;
          const proficiency = getRandomInt(70, 100);
          const isSurprise = idx === surpriseIdx;
          return (
            <div key={skill.name + idx} className={`terminal-line ${revealedNow ? 'revealed' : ''} ${isSurprise ? 'surprise' : ''}`}>
              <span className="terminal-category">[{skill.category}]</span> <span className="terminal-skill">{skill.name}</span>
              {revealedNow && (
                <>
                  <span className="terminal-bar-outer">
                    <span className={`terminal-bar-inner glitchy ${isSurprise ? 'explode' : ''}`} style={{ width: `${proficiency}%` }} />
                  </span>
                  <span className="terminal-percent">{proficiency}%</span>
                  {isSurprise && <span className="terminal-surprise">💥</span>}
                </>
              )}
            </div>
          );
        })}
        {revealed >= allSkills.length && (
          <div className="terminal-ai-analysis">
            <span className="terminal-ai-label">AI Analysis:</span> <span className="terminal-ai-message glitchy">{aiAnalysis}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsDashboard; 