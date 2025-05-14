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
            'Python', 'C/C++', 'R', 'JavaScript', 'SQL', 'HTML/CSS',
            'React', 'Node.js', 'Flask', 'Github API', 'REST API', 'OpenAI API',
            'AWS (EC2, S3)', 'Docker', 'Jest', 'MySQL', 'PostgreSQL', 'Git',
            'Figma', 'Canva', 'Power BI', 'Cursor', 'Pear AI'
          ].map((skill, i) => (
            <div key={skill} className="flex items-center space-x-3 bg-gray-800/60 rounded-lg px-4 py-2 border border-cyber-accent/20">
              <span className="w-3 h-3 rounded-full" style={{ background: [
                '#3776ab','#00599c','#198ce7','#f7df1e','#e38c00','#e34c26',
                '#00f2fe','#3c873a','#000','#24292e','#ff9800','#10a37f',
                '#ff9900','#0db7ed','#c21325','#00758f','#336791','#f34f29',
                '#a259ff','#00c4cc','#f2c811','#00f2fe','#8f00ff'][i] }} />
              <span className="text-white font-semibold">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SkillversePage; 