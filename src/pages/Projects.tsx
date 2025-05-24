import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Code, Calendar, Tag } from 'lucide-react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const projects = [
    {
      title: 'Personal Portfolio Website',
      period: '',
      description: 'A responsive portfolio website built with React.js, HTML, CSS, and JavaScript to showcase projects.',
      technologies: ['React.js', 'HTML', 'CSS', 'JavaScript'],
      points: [
        'Built a responsive portfolio website with React.js, HTML, CSS, and JavaScript to showcase projects.',
        'Designed a dynamic user interface with component-based architecture for cross-device compatibility.',
        'Integrated SEO optimization, increasing website visibility and reducing load times.',
        'Implemented interactive project showcases to highlight technical expertise and personal branding.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/Portfolio',
      imageUrl: ''
    },
    {
      title: 'GIM - Guard in Motion',
      period: '',
      description: 'A wearable safety device for women integrating GPS, motion sensors, mic, and camera for real-time protection.',
      technologies: ['Python', 'ML'],
      points: [
        'Designed a extfwearable safety device for women integrating extfGPS, motion sensors, mic, and camera to ensure real-time protection.',
        'Built a extfbone-touch activation system for live audio-video streaming to the cloud and emergency alerts to trusted contacts.',
        'Integrated extfbmotion and gyro sensors for auto-triggered recording on sudden impact or abnormal movement.',
        'Engineered the backend with extfbsecure cloud storage, audio/video encoding, and real-time location tracking.',
        'Collaborated on mobile app integration to manage contacts, view alerts, and enhance user control.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/GIM-Guard-in-Motion',
      imageUrl: ''
    },
    {
      title: 'CarRaksha - Safe Driving System',
      period: '',
      description: 'A vehicle safety system in C++ and Arduino for collision prevention.',
      technologies: ['C++', 'Arduino'],
      points: [
        'Developed a vehicle safety system in C++ on Arduino for collision prevention.',
        'Integrated MQ-3 alcohol and ultrasonic sensors, enabling automatic stops, reducing accidents by 15%.',
        'Programmed a speed sensor to cap vehicle velocity, enhancing safety metrics.',
        'Tested in real-world conditions with 10+ vehicles, achieving 79% reliability in safety interventions.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/CarRaksha',
      imageUrl: ''
    },
    {
      title: 'iMoney - Banknote Identifier',
      period: '',
      description: 'A banknote identifier with user-centric design, ensuring customer alignment.',
      technologies: ['Python'],
      points: [
        'Validated a banknote identifier with user-centric design, ensuring customer alignment.',
        'Developed detection algorithms in Python, achieving 84% accuracy.',
        'Optimized image processing workflows using AWS S3 to enhance detection speed and scalability.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/iMoney-Banknote-Identifier',
      imageUrl: ''
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
                        View on GitHub
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