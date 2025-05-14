import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Briefcase, GraduationCap, Code } from 'lucide-react';
import SkillsDashboard from '../components/SkillsDashboard';
import Skillverse from '../components/Skillverse';

const About = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState('languages');

  const experiences = [
    {
      company: 'Prompt Solutions India',
      role: 'Front-End Developer',
      period: 'Aug 2023 – Jul 2024',
      points: [
        'Built a HIPAA-compliant healthcare platform integrating hospital locations, emergency services, and online consultations for thousands of users.',
        'Developed the front end (web) using React, leveraging Redux using JavaScript for state management.',
        'Managed and developed a microservices backend using Python (Flask) hosted on AWS EC2 for scalable healthcare services.',
        'Worked in a cross-functional team of 5 developers, ensuring on-time delivery and stakeholder satisfaction.',
        'Launched with 5000+ user sign-ups, improving emergency response efficiency by 32%.'
      ]
    },
    {
      company: 'Nokia India',
      role: 'Software Engineer Co-op',
      period: 'Jun 2023 – Jul 2023',
      points: [
        'Modernized an outdated bug tracking system to reduce duplicate efforts and improve resolution times.',
        'Revamped using Node.js and Express, optimizing PostgreSQL queries to boost performance by 47%.',
        'Created custom React dashboards with D3.js for real-time analytics and deployed via Docker.',
        'Integrated unit testing with Jest, achieving 63% code coverage and reducing bug recurrence.'
      ]
    },
    {
      company: 'Creative Stree India',
      role: 'Digital Marketing Analyst',
      period: 'Oct 2022 – Dec 2022',
      points: [
        'Ran A/B tests on landing pages and ad creatives; evaluated performance using CTR and bounce rate metrics.',
        'Built static campaign pages using HTML, CSS, and JavaScript; maintained brand styling consistency.',
        'Implemented on-page SEO (title tags, meta descriptions, heading structure) using keyword research.',
        'Used Google Analytics to track traffic sources, user behavior, and session durations.',
        'Managed content delivery via Meta Business Suite and Canva; scheduled promotional assets for Instagram and Facebook.',
        'Generated monthly analytics reports with traffic summaries and visualized KPIs using Google Sheets and Charts.'
      ]
    }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs'] },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
    { category: 'DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'AWS', 'Vercel'] },
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

        {/* Skillverse Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-cyber-accent mb-4 text-center">Skillverse: My Skills Universe</h2>
          <Skillverse />
        </motion.section>

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
            <p className="text-gray-400 mb-2">Courses: {education.courses}</p>
            <p className="text-gray-400">Awards: {education.awards}</p>
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

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <Code className="text-blue-400 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-white">Skills</h2>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
            {skills.map((skill, idx) => (
              <div key={skill.category} className="mb-4">
                <h3 className="text-lg font-semibold text-cyber-accent mb-2">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="bg-cyber-dark px-3 py-1 rounded-full text-gray-300 text-sm border border-cyber-accent/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About; 