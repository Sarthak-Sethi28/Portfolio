import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const experiences = [
    {
      company: 'Danier',
      role: 'Software Developer',
      period: 'Jun 2025 – Aug 2025',
      points: [
        'Developed a custom chatbot with FastAPI (Python), React, and Tailwind CSS, integrating FAQ/product search, analytics hooks, and caching for faster and more reliable responses across the site.',
        'Built a Low-Stock Alert System using FastAPI, SQLAlchemy, and Pandas/OpenPyXL, sending automated HTML email alerts to stakeholders and improving on-page SEO to boost visibility in search rankings.'
      ]
    },
    {
      company: 'Prompt Solutions',
      role: 'Front-End Developer',
      period: 'Aug 2023 – Jul 2024',
      points: [
        'Delivered a HIPAA-compliant healthcare platform using React (Redux) and Flask on AWS EC2, integrating APIs for emergency services and ensuring a safe and scalable patient experience.',
        'Launched the platform to 5000+ users, improving emergency response efficiency by 32% through optimized UI components and backend microservices designed for speed and reliability.'
      ]
    },
    {
      company: 'NOiSA',
      role: 'Software Engineer',
      period: 'Jun 2023 – Jul 2023',
      points: [
        'Modernized bug tracking with Node.js/Express and optimized PostgreSQL queries, significantly reducing load times by 47% and improving overall database query performance for internal tools.',
        'Created React dashboards with D3.js visualizations, containerized with Docker for deployment and consistent results across all developer environments.'
      ]
    }
  ];

  const education = {
    university: 'University of Waterloo',
    degree: 'Honours Bachelor of Computer Science',
    period: 'Sep 2024 – May 2029',
    courses: '',
    awards: ''
  };

  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h1>

        {/* Education Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="text-blue-400 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-white">Education</h2>
          </div>
          <motion.div 
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors duration-300
                       border border-transparent hover:border-cyber-accent/30"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-blue-400">{education.university}</h3>
              <span className="text-gray-400">{education.period}</span>
            </div>
            <p className="text-gray-300 mb-2">{education.degree}</p>
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-4">
            <Briefcase className="text-blue-400 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-white">Experience</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800/50 rounded-lg p-6 cursor-pointer
                           border border-transparent hover:border-cyber-accent/30
                           ${expandedExp === index ? 'bg-gray-800/70' : ''}`}
                onClick={() => setExpandedExp(expandedExp === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: expandedExp === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="text-blue-400 mr-2" size={20} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-blue-400">{exp.company}</h3>
                  </div>
                  <span className="text-gray-400">{exp.period}</span>
                </div>
                <p className="text-white mb-4">{exp.role}</p>
                <AnimatePresence>
                  {expandedExp === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="list-disc list-inside space-y-2"
                    >
                      {exp.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-gray-300"
                        >
                          {point}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About; 