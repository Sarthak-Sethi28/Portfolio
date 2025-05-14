import React from 'react';
import SkillCarousel from '../components/SkillCarousel';

const SkillversePage: React.FC = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">
        Skillverse: My Skills Universe
      </h1>
      <SkillCarousel />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-cyber-accent text-center">All Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS',
            'Node.js', 'Express.js', 'Python', 'Django', 'REST APIs',
            'MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'Git', 'GitHub Actions',
            'AWS', 'Vercel', 'VS Code', 'Postman', 'Figma', 'Jira', 'Confluence'
          ].map((skill, i) => (
            <div key={skill} className="flex items-center space-x-3 bg-gray-800/60 rounded-lg px-4 py-2 border border-cyber-accent/20">
              <span className="w-3 h-3 rounded-full" style={{ background: [
                '#00f2fe','#007acc','#f7df1e','#e34c26','#264de4','#38bdf8',
                '#3c873a','#888','#3776ab','#092e20','#ff9800','#47a248','#336791','#00758f',
                '#0db7ed','#f34f29','#2088ff','#ff9900','#fff','#007acc','#ff6c37','#a259ff','#0052cc','#172b4d'][i] }} />
              <span className="text-white font-semibold">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SkillversePage; 