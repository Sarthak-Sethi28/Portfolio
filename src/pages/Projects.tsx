import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Code, Calendar, Tag } from 'lucide-react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const projects = [
    {
      title: 'GIM - Gesture Interactive Mouse',
      period: 'Jan 2024 – Apr 2024',
      description: 'An innovative computer vision-based system that enables hands-free mouse control through gesture recognition.',
      technologies: ['Python', 'OpenCV', 'MediaPipe', 'Machine Learning'],
      points: [
        'Engineered a real-time gesture recognition system using OpenCV and MediaPipe for hands-free mouse control.',
        'Implemented advanced hand tracking algorithms to detect and interpret 21 hand landmarks for precise gesture mapping.',
        'Developed custom gesture patterns for common mouse actions like click, drag, scroll, and cursor movement.',
        'Optimized performance using parallel processing, achieving <50ms latency for smooth real-time interaction.',
        'Created an intuitive calibration system to adapt to different user environments and lighting conditions.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/GIM',
      imageUrl: '/projects/gim.png'
    },
    {
      title: 'CarRaksha – Safe Driving System',
      period: 'Mar 2023 – Aug 2023',
      description: 'A real-time vehicle safety system built with C++ and Arduino, promoting safer driving through automated interventions.',
      technologies: ['C++', 'Arduino', 'Sensors', 'Image Processing'],
      points: [
        'Developed a real-time vehicle safety system in C++ on Arduino promoting safer driving through automated interventions.',
        'Integrated an MQ-3 alcohol sensor and ultrasonic sensors for collision prevention, enabling automatic stops under risky conditions.',
        'Programmed a speed sensor to monitor and cap vehicle velocity, reducing accident rates by 15%.',
        'Implemented a camera module with image processing for drowsiness detection, increasing driver alertness by 20%.',
        'Engineered a sensor interface module to decouple hardware and processing, enabling plug-and-play sensor integration.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/CaRaksha',
      imageUrl: '/projects/carraksha.png'
    },
    {
      title: 'iMoney – Product Strategy & Marketing',
      period: 'Oct 2022 – Jan 2023',
      description: 'A Python and OpenCV-based solution for banknote validation and analysis.',
      technologies: ['Python', 'OpenCV', 'SQL', 'ETL Pipeline'],
      points: [
        'Spearheaded user-centric validation for a banknote identifier, ensuring design alignment with customer needs.',
        'Developed detection algorithms in Python and OpenCV achieving over 95% accuracy.',
        'Engineered an ETL pipeline using Python and SQL to integrate and transform transactional data, enabling real-time analytics.',
        'Executed a targeted go-to-market strategy, driving a 25% increase in early adoption.',
        'Streamlined product design with cross-functional collaboration and iterative testing based on customer insights.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/iMoney',
      imageUrl: '/projects/imoney.png'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-300 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of my key projects that showcase my technical skills and problem-solving abilities.
          Each project represents a unique challenge and innovative solution.
        </motion.p>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gray-800/50 rounded-lg overflow-hidden border border-transparent
                         hover:border-cyber-accent/30 transition-all duration-300
                         ${expandedProject === index ? 'bg-gray-800/70' : ''}`}
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: expandedProject === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="text-cyber-accent mr-2" size={20} />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-cyber-accent">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-400">{project.period}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      onHoverStart={() => setHoveredTech(tech)}
                      onHoverEnd={() => setHoveredTech(null)}
                      className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-300
                                ${hoveredTech === tech 
                                  ? 'bg-cyber-accent text-white scale-110' 
                                  : 'bg-gray-700/50 text-gray-300'}`}
                    >
                      <Tag size={12} className="mr-1" />
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <AnimatePresence>
                  {expandedProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="list-disc list-inside space-y-2 mb-6">
                        {project.points.map((point, i) => (
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
                      </ul>
                      
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-cyber-accent text-white
                                 hover:bg-cyber-accent-dark transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Code size={16} className="mr-2" />
                        View Source
                        <ExternalLink size={16} className="ml-2" />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects; 