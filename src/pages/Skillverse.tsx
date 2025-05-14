import React from 'react';
import SkillCarousel from '../components/SkillCarousel';

const SkillversePage: React.FC = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">
        Skillverse: My Skills Universe
      </h1>
      <SkillCarousel />
    </div>
  </div>
);

export default SkillversePage; 