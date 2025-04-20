import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Briefcase, GraduationCap, Code } from 'lucide-react';

const About = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState('languages');

  const experiences = [
    {
      company: 'Prompt Solutions India',
      role: 'Front-End Lead',
      period: 'Aug 2023 – Jul 2024',
      points: [
        'Built a comprehensive, HIPAA-compliant healthcare platform integrating hospital locations, emergency services, and online consultations for thousands of users.',
        'Architected a microservices backend on AWS EC2, RDS, S3  using Python (Flask) and implemented CI/CD pipelines with Jenkins.',
        'Developed the front end with React (web) and Kotlin (Android), leveraging Redux for state management and Firebase for real-time notifications.',
        'Launched the platform with 10,000+ user sign-ups in the first month, improving emergency response efficiency by 30%.'
      ]
    },
    {
      company: 'Nokia India',
      role: 'Software Engineer Co-op',
      period: 'June 2023 – July 2023',
      points: [
        'Modernized an outdated bug tracking system to reduce duplicate efforts and improve resolution times.',
        'Revamped the system using Node.js and Express, optimizing PostgreSQL queries to boost performance by 40%.',
        'Created custom React dashboards with D3.js for real-time analytics and deployed the solution via Docker and Kubernetes.',
        'Implemented automated triaging and enhanced search, reducing duplicate tickets by 40%.'
      ]
    },
    {
      company: 'Creative Stree India',
      role: 'Digital Marketing Analyst',
      period: 'Oct 2022 – Dec 2022',
      points: [
        'Leveraged A/B testing to boost brand visibility and user engagement through creative digital solutions.',
        'Designed and developed interactive web assets using HTML/CSS and JavaScript.',
        'Optimized website performance through responsive design principles and cross-browser compatibility.',
        'Leveraged SEO and analytics tools to optimize digital campaigns.'
      ]
    }
  ];

  const skills = {
    languages: 'Kotlin, Python, C/C++, HTML/CSS, JavaScript, SQL MySQL, PostgreSQL',
    frameworks: 'React, Node.js, Flask, Docker, Kubernetes, AWS EC2, RDS, S3, Lambda, Firebase, Jenkins',
    concepts: 'Microservices, RESTful APIs, Cloud Deployment, Agile, SDLC, TDD, CI/CD'
  };

  const education = {
    university: 'University of Waterloo',
    degree: 'Bachelor of Computer Science',
    period: 'Sep 2024 – Present',
    courses: 'Data Structures & Algorithms, Operating Systems, Optimization, Functional Programming',
    awards: "President's Scholarship of Distinction"
  };

  const skillTabs = [
    { id: 'languages', label: 'Languages', icon: <Code size={18} /> },
    { id: 'frameworks', label: 'Frameworks & Tools', icon: <Briefcase size={18} /> },
    { id: 'concepts', label: 'Concepts', icon: <GraduationCap size={18} /> },
  ];

  const skillsList = {
    languages: skills.languages.split(', ').map(skill => ({
      name: skill,
      level: Math.random() * 30 + 70 // Random proficiency between 70-100%
    })),
    frameworks: skills.frameworks.split(', ').map(skill => ({
      name: skill,
      level: Math.random() * 30 + 70
    })),
    concepts: skills.concepts.split(', ').map(skill => ({
      name: skill,
      level: Math.random() * 30 + 70
    }))
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
            <div className="flex space-x-2 mb-6">
              {skillTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSkillTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-all duration-300
                             ${activeSkillTab === tab.id 
                               ? 'bg-cyber-accent text-white' 
                               : 'bg-gray-700/50 text-gray-400 hover:text-white'}`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {skillsList[activeSkillTab as keyof typeof skillsList].map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{Math.round(skill.level)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About; 