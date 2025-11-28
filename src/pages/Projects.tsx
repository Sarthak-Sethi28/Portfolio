import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Code, Calendar, Tag } from 'lucide-react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const projects = [
    {
      title: 'Muse Sketch Studio',
      period: 'Toronto, ON',
      description: 'AI-driven design pipeline (prompt → sketch → colorization → model → runway) built with React, TypeScript, and Node.js. Won 1st Place at Replicate AI Hackathon (2025), awarded $1,000 cash and $500 Amazon gift card among 100+ participants.',
      technologies: ['React', 'TypeScript', 'Node.js/Express', 'Replicate API', 'Tailwind CSS'],
      points: [
        'Won 1st Place at the Replicate AI Hackathon (2025), awarded $1,000 cash and $500 Amazon gift card among 100+ participants.',
        'Built an AI-driven design pipeline (prompt → sketch → colorization → model → runway) using google/nano-banana for sketches/colors and google/veo-3 for runway video synthesis.',
        'Developed a full-stack solution with React + TypeScript frontend and Node.js/Express backend, integrating Replicate API for secure generation and export of PNG/MP4 outputs.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/muse-sketch-studio',
      repoExists: true,
      imageUrl: ''
    },
    {
      title: 'Danier Custom Chatbot',
      period: 'Toronto, ON',
      description: 'AI-powered chatbot with FastAPI (Python) backend and React/Tailwind frontend, auto-syncing every 6h with Shopify product CSVs to update prices, descriptions, and availability in real time.',
      technologies: ['FastAPI', 'React', 'Tailwind CSS', 'OpenAI API'],
      points: [
        'Developed an AI-powered chatbot for Danier with FastAPI (Python) backend and React/Tailwind frontend, auto-syncing every 6h with Shopify product CSVs to update prices, descriptions, and availability in real time.',
        'Parsed and cleaned unstructured Shopify CSV data using image URLs and normalize product attributes, enabling accurate product search alongside a curated FAQ knowledge base.',
        'Integrated caching, retry logic, and secure API key management, achieving 72% uptime with sub-second response times for both FAQ and product queries.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/danier-chatbot',
      repoExists: true,
      imageUrl: ''
    },
    {
      title: 'Danier Low-Stock Alert System',
      period: 'Toronto, ON',
      description: 'Automated inventory monitoring system with Python, FastAPI, SQLAlchemy, parsing Shopify CSV exports to detect SKUs below safe stock levels and trigger instant alerts.',
      technologies: ['FastAPI', 'SQLAlchemy', 'Pandas', 'Gmail SMTP'],
      points: [
        'Built an automated inventory monitoring system with Python, FastAPI, SQLAlchemy, parsing Shopify CSV exports to detect SKUs below safe stock levels and trigger instant alerts.',
        'Generated HTML email alerts with product names, images, and variant details using Gmail SMTP, ensuring proactive restocking before sellouts.',
        'Deployed on Render with persistent disk, multi-worker Uvicorn, and health checks, achieving 100% reliability in alert delivery.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/low-stock-alert',
      repoExists: true,
      imageUrl: ''
    },
    {
      title: 'Personal Portfolio Website',
      period: 'Waterloo, ON',
      description: 'A responsive personal portfolio using React.js, HTML, CSS, and JavaScript to showcase projects, experience, and skills with fast load times and smooth navigation.',
      technologies: ['React.js', 'HTML', 'CSS', 'JavaScript'],
      points: [
        'Developed a responsive personal portfolio using React.js, HTML, CSS, and JavaScript to showcase projects, experience, and skills with fast load times and smooth navigation.',
        'Implemented basic SEO optimization and integrated GitHub/LinkedIn links for recruiters\' quick access.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/portfolio',
      repoExists: true,
      imageUrl: ''
    },
    {
      title: 'CarRaksha - Safe Driving System',
      period: 'India',
      description: 'A collision-prevention system with Arduino, ultrasonic sensors, and MQ-3 alcohol sensors, integrating ignition lockout and speed-limiting features to mitigate impaired driving risks.',
      technologies: ['C++', 'Arduino'],
      points: [
        'Won 1st Prize at the All India TechFest Hackathon, competing against 100,000+ students nationwide.',
        'Developed a collision-prevention system with Arduino, ultrasonic sensors, and MQ-3 alcohol sensors, integrating ignition lockout and speed-limiting features to mitigate impaired driving risks.',
        'Tested across 10+ vehicle models, achieving 79% reliability with modular hardware adaptable to multiple configurations.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/CarRaksha',
      repoExists: true,
      imageUrl: ''
    },
    {
      title: 'GIM - Guard in Motion',
      period: 'India',
      description: 'A wearable safety device integrating GPS, motion sensors, microphone, and camera to enable real-time location tracking, live audio/video streaming, and emergency alerts.',
      technologies: ['Python', 'ML'],
      points: [
        'Developed a wearable safety device integrating GPS, motion sensors, microphone, and camera to enable real-time location tracking, live audio/video streaming, and emergency alerts to designated contacts.',
        'Implemented intelligent motion and gyro-based triggers to auto-start recording on sudden impact or abnormal movement, with secure cloud storage, real-time encoding, and minimal data loss during network disruptions.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/GIM',
      repoExists: true,
      imageUrl: ''
    }
  ];

  // Function to handle project link click
  const handleProjectClick = (e: React.MouseEvent, project: typeof projects[0]) => {
    if (!project.repoExists) {
      e.preventDefault();
      alert("This repository is currently being set up. Please check back later or contact me for more information about this project.");
    }
  };

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
                      
                      <div className="relative">
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-md bg-cyber-accent text-white
                                  hover:bg-cyber-accent-dark transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleProjectClick(e, project)}
                        >
                          <Code size={16} className="mr-2" />
                          View on GitHub
                          <ExternalLink size={16} className="ml-2" />
                        </motion.a>
                      </div>
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