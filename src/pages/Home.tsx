import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Background3D from '../components/Background3D';
import { 
  ChevronRight, ExternalLink, Code, 
  GraduationCap, Mail, Phone, MapPin, Clock, Linkedin, Github, 
  Download, Calendar, Tag 
} from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';

const Home = () => {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [trainProgress, setTrainProgress] = useState(0);
  const experienceSectionRef = useRef<HTMLDivElement>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: false
  });

  const skillsTable = [
    {
      category: 'Languages',
      skills: ['Python', 'C/C++', 'TypeScript', 'JavaScript', 'SQL']
    },
    {
      category: 'Frontend',
      skills: ['React', 'Redux', 'Tailwind CSS', 'D3.js', 'Framer Motion']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'FastAPI', 'Flask', 'Django', 'Express']
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLAlchemy', 'Pinecone']
    },
    {
      category: 'AI/ML',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Hugging Face']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Git', 'REST APIs', 'GraphQL']
    },
    {
      category: 'AI APIs',
      skills: ['OpenAI API', 'Google Gemini API', 'Replicate API', 'Nano-Banana', 'Veo-3']
    },
    {
      category: 'Mobile & IoT',
      skills: ['React Native', 'Arduino', 'IoT', 'Sensors', 'Embedded']
    }
  ];

  const experiences = [
    {
      company: 'University of Waterloo',
      role: 'Computer Science Student',
      period: 'Sep 2024 – Present',
      isEducation: true,
      points: [
        'Honours Bachelor of Computer Science'
      ]
    },
    {
      company: 'Constellation Software | Volaris Group',
      role: 'Software Developer Intern',
      period: 'Jan 2026 – Aug 2026 (Incoming)',
      points: [
        'Incoming Software Developer Intern at Constellation Software, a Volaris Group company.',
        'Will work on enterprise software solutions and contribute to product development.',
        'Focus on building scalable applications and implementing innovative features.',
        'Collaborate with cross-functional teams on mission-critical software projects.'
      ]
    },
    {
      company: 'Danier',
      role: 'Software Developer',
      period: 'Jun 2025 – Aug 2025',
      points: [
        'Developed a custom chatbot with FastAPI (Python), React, and Tailwind CSS, integrating FAQ/product search and analytics hooks.',
        'Implemented caching mechanisms for faster and more reliable responses across the site.',
        'Built a Low-Stock Alert System using FastAPI, SQLAlchemy, and Pandas/OpenPyXL.',
        'Automated HTML email alerts to stakeholders and improved on-page SEO to boost search rankings.'
      ]
    },
    {
      company: 'Prompt Solutions',
      role: 'Front-End Developer',
      period: 'Aug 2023 – Jul 2024',
      points: [
        'Delivered a HIPAA-compliant healthcare platform using React (Redux) and Flask on AWS EC2.',
        'Integrated APIs for emergency services ensuring a safe and scalable patient experience.',
        'Launched the platform to 5000+ users, improving emergency response efficiency by 32%.',
        'Optimized UI components and backend microservices designed for speed and reliability.'
      ]
    },
    {
      company: 'NOKIA',
      role: 'Software Engineer',
      period: 'Jun 2023 – Jul 2023',
      points: [
        'Modernized bug tracking system with Node.js/Express and optimized PostgreSQL queries.',
        'Reduced load times by 47% and improved database query performance for internal tools.',
        'Created React dashboards with D3.js visualizations for better data insights.',
        'Containerized applications with Docker for consistent deployment across all environments.'
      ]
    }
  ];

  const projects = [
    {
      title: 'Muse Sketch Studio',
      period: '2025',
      description: 'AI-driven design pipeline built with React, TypeScript, and Node.js. Won 1st Place at Replicate AI Hackathon (2025), awarded $1,000 cash and $500 Amazon gift card.',
      technologies: ['React', 'TypeScript', 'Node.js/Express', 'Replicate API', 'Tailwind CSS'],
      points: [
        'Won 1st Place at the Replicate AI Hackathon (2025) among 100+ participants.',
        'Awarded $1,000 cash and $500 Amazon gift card for innovative AI solution.',
        'Built an AI-driven design pipeline: prompt → sketch → colorization → model → runway.',
        'Used google/nano-banana for sketches/colors and google/veo-3 for runway video synthesis.',
        'Developed full-stack solution with React + TypeScript frontend and Node.js/Express backend.',
        'Integrated Replicate API for secure generation and export of PNG/MP4 outputs.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/muse-sketch-studio',
      videoUrl: '/assets/projects/videos/muse-sketch-studio.mp4',
      isInternal: false
    },
    {
      title: 'Custom Chatbot',
      period: '2025',
      description: 'AI-powered chatbot with FastAPI backend and React/Tailwind frontend, auto-syncing with Shopify to update product information in real time.',
      technologies: ['FastAPI', 'React', 'Tailwind CSS', 'OpenAI API'],
      points: [
        'Developed an AI-powered chatbot with FastAPI (Python) backend and React/Tailwind frontend.',
        'Auto-syncs every 6 hours with Shopify product CSVs to update prices and availability.',
        'Parsed and cleaned unstructured Shopify CSV data using image URLs.',
        'Normalized product attributes for accurate search alongside curated FAQ knowledge base.',
        'Integrated caching, retry logic, and secure API key management.',
        'Achieved 72% uptime with sub-second response times for FAQ and product queries.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/danier-chatbot',
      videoUrl: '/assets/projects/videos/custom-chatbot.mp4',
      isInternal: false
    },
    {
      title: 'Low-Stock Alert System',
      period: '2025',
      description: 'Automated inventory monitoring system with Python, FastAPI, and SQLAlchemy, parsing Shopify exports to detect low stock levels.',
      technologies: ['FastAPI', 'SQLAlchemy', 'Pandas', 'Gmail SMTP'],
      points: [
        'Built automated inventory monitoring system with Python, FastAPI, and SQLAlchemy.',
        'Parsed Shopify CSV exports to detect SKUs below safe stock levels.',
        'Triggered instant alerts to prevent stockouts and maintain inventory levels.',
        'Generated HTML email alerts with product names, images, and variant details using Gmail SMTP.',
        'Ensured proactive restocking before sellouts occurred.',
        'Deployed on Render with persistent disk, multi-worker Uvicorn, and health checks.',
        'Achieved 100% reliability in alert delivery.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/low-stock-alert',
      isInternal: true
    },
    {
      title: 'CarRaksha - Safe Driving System',
      period: '2023',
      description: 'Collision-prevention system with Arduino sensors, integrating ignition lockout and speed-limiting features.',
      technologies: ['C++', 'Arduino'],
      points: [
        'Won 1st Prize at the All India TechFest Hackathon among 100,000+ students nationwide.',
        'Developed collision-prevention system with Arduino and ultrasonic sensors.',
        'Integrated MQ-3 alcohol sensors for impaired driving detection.',
        'Implemented ignition lockout and speed-limiting features to mitigate driving risks.',
        'Tested across 10+ vehicle models achieving 79% reliability.',
        'Created modular hardware adaptable to multiple vehicle configurations.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/CarRaksha',
      imageUrl: '/assets/projects/images/caraksha.png',
      isInternal: false
    },
    {
      title: 'Personal Portfolio Website',
      period: '2024',
      description: 'A responsive personal portfolio using React.js to showcase projects, experience, and skills with fast load times.',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      points: [
        'Developed responsive personal portfolio using React.js and TypeScript.',
        'Showcased projects, experience, and skills with fast load times and smooth navigation.',
        'Implemented modern animations and transitions using Framer Motion.',
        'Created single-page application with smooth scrolling sections.',
        'Optimized SEO and integrated GitHub/LinkedIn links for easy recruiter access.',
        'Designed cyber-themed UI with gradient effects and interactive elements.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/portfolio',
      imageUrl: '/assets/projects/images/portfolio.png',
      isInternal: false
    },
    {
      title: 'GIM - Guard in Motion',
      period: '2023',
      description: 'Wearable safety device integrating GPS, motion sensors, and camera for real-time tracking and emergency alerts.',
      technologies: ['Python', 'ML', 'IoT'],
      points: [
        'Developed wearable safety device integrating GPS, motion sensors, microphone, and camera.',
        'Enabled real-time location tracking and live audio/video streaming.',
        'Sent emergency alerts to designated contacts during critical situations.',
        'Implemented intelligent motion and gyro-based triggers for auto-recording.',
        'Activated recording on sudden impact or abnormal movement detection.',
        'Integrated secure cloud storage with real-time encoding.',
        'Minimized data loss during network disruptions through buffering mechanisms.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/GIM',
      imageUrl: '/assets/projects/images/gim.png',
      isInternal: false
    },
    {
      title: 'iMoney - Accessible Finance Manager for Visually Impaired',
      period: '2024',
      description: 'Accessible personal finance application designed specifically for visually impaired users with voice navigation and screen reader optimization.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Web Speech API', 'ARIA'],
      points: [
        'Developed accessible finance management application for blind and visually impaired users.',
        'Implemented comprehensive voice navigation using Web Speech API for hands-free operation.',
        'Designed with WCAG 2.1 AAA compliance and optimized for screen readers (JAWS, NVDA, VoiceOver).',
        'Built React frontend with semantic HTML and ARIA labels for enhanced accessibility.',
        'Created audio feedback system for all user actions and financial transactions.',
        'Integrated MongoDB for secure storage with voice-activated expense tracking and budgeting.',
        'Developed real-time audio alerts for bill reminders and budget notifications.'
      ],
      demoUrl: 'https://github.com/Sarthak-Sethi28/iMoney',
      imageUrl: '/assets/projects/images/imoney.png',
      isInternal: false
    }
  ];


  const contactInfo = {
    email: 's36sethi@uwaterloo.ca',
    phone: '+1 548-398-7610',
    location: 'Waterloo, ON, Canada',
    availability: 'Open to Internship Opportunities'
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sarthak2803',
      icon: <Linkedin className="w-6 h-6" />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Sarthak-Sethi28',
      icon: <Github className="w-6 h-6" />,
    },
    {
      name: 'Portfolio',
      url: 'https://sethisarthak.com',
      icon: <ExternalLink className="w-6 h-6" />,
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Matrix text effect for hero title
  useEffect(() => {
    if (!containerRef.current) return;
    
    const textElement = containerRef.current.querySelector('.matrix-text') as HTMLElement;
    if (!textElement) return;
    
    const originalText = textElement.innerText;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let interval: NodeJS.Timeout | null = null;
    let iteration = 0;
    
    const startEffect = () => {
      clearInterval(interval as NodeJS.Timeout);
      
      interval = setInterval(() => {
        textElement.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            
            if (letter === ' ') return ' ';
            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');
        
        if (iteration >= originalText.length) {
          clearInterval(interval as NodeJS.Timeout);
          interval = null;
        }
        
        iteration += 1 / 3;
      }, 30);
    };
    
    startEffect();
    
    // Restart effect periodically
    const restartInterval = setInterval(() => {
      if (!interval) {
        iteration = 0;
        startEffect();
      }
    }, 7000);
    
    return () => {
      clearInterval(interval as NodeJS.Timeout);
      clearInterval(restartInterval);
    };
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  // Track scroll progress for train animation and auto-expand
  useEffect(() => {
    const handleScroll = () => {
      if (experienceSectionRef.current) {
        const section = experienceSectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Start train at top when section is in view, move down as we scroll
        let progress = 0;
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          // Progress from 0 to 1 as section scrolls through viewport
          progress = Math.max(0, Math.min(1, 
            (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)
          ));
        }
        
        setTrainProgress(progress);
        
        // Check each experience card's position and expand when centered
        const cards = section.querySelectorAll('[data-experience-index]');
        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const viewportCenter = windowHeight / 2;
          
          // Expand when card is centered in viewport (within 20% of center)
          const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
          const threshold = windowHeight * 0.2;
          
          if (distanceFromCenter < threshold && expandedExp !== index) {
            setExpandedExp(index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedExp, experiences.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      if (!formRef.current) {
        throw new Error('Form reference not found');
      }

      console.log('Sending email with config:', {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
      });

      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      
      console.log('EmailJS success:', result);
      
      setStatus({ loading: false, error: '', success: true });
      setFormData({ from_name: '', from_email: '', message: '' });
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error: any) {
      console.error('EmailJS detailed error:', error);
      const errorMessage = error?.text || error?.message || 'Failed to send message. Please try again later.';
      setStatus({
        loading: false,
        error: errorMessage,
        success: false
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div ref={containerRef}>
      <Background3D />
      <div className="relative">
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            <div className="absolute top-[-50px] left-[-30px] w-20 h-20 border border-cyber-accent/30 animate-pulse-slow" />
            <div className="absolute bottom-[-60px] right-[-40px] w-32 h-32 border border-cyber-accent/20 rotate-12 animate-pulse-slower" />
            
            <div className="relative inline-block mb-2">
              <motion.h1 
                className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white matrix-text"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                SARTHAK SETHI
              </motion.h1>
              <motion.div 
                className="absolute -inset-1 border-b-2 border-cyber-accent/50 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            <motion.h2 
              className="text-xl md:text-2xl text-gray-300 mb-6 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-cyber-accent">{'>'}</span> AI Solutions Builder & Software Engineer
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Specializing in AI-powered solutions, full-stack development, and scalable microservices 
              architecture with real-world impact across multiple industries.
            </motion.p>
            
            <motion.div
              className="relative max-w-md mx-auto mb-8 text-left font-mono"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="bg-cyber-darker p-4 rounded-lg border border-cyber-accent/20 shadow-cyber overflow-hidden">
                <div className="flex items-center text-xs mb-2 text-gray-500">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span>profile.ts</span>
                </div>
                <pre className="text-sm overflow-x-auto scrollbar-thin scrollbar-thumb-cyber-accent/20 scrollbar-track-transparent">
                  <code>
                    <span className="text-gray-500">{'// My code philosophy'}</span><br />
                    <span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = {'{'}<br />
                    {'  '}<span className="text-yellow-300">name</span>: <span className="text-green-400">'Sarthak Sethi'</span>,<br />
                    {'  '}<span className="text-yellow-300">mission</span>: <span className="text-green-400">'Building innovative AI solutions'</span>,<br />
                    {'  '}<span className="text-yellow-300">specialties</span>: [<span className="text-green-400">'AI/ML', 'Full-Stack', 'Cloud Architecture'</span>],<br />
                    {'}'};
                  </code>
                </pre>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/0 via-cyber-accent/5 to-cyber-accent/0 animate-cyber-scan pointer-events-none" />
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                onClick={() => scrollToSection('projects')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                  className="group relative px-6 py-3 bg-cyber-dark overflow-hidden rounded-md font-medium text-white shadow-cyber inline-flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 bg-cyber-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                  className="group relative px-6 py-3 overflow-hidden rounded-md font-medium text-white shadow-cyber inline-flex items-center border border-cyber-accent/30"
                >
                  <span className="relative z-10 flex items-center">
                    Contact Me
                    <ExternalLink className="ml-1 w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-cyber-accent/0 group-hover:bg-cyber-accent/20 transition-colors" />
              </motion.button>

              <motion.a
                href="/resume/Sarthak_Sethi_Resume.pdf"
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="group relative px-6 py-3 overflow-hidden rounded-md font-medium text-white shadow-cyber inline-flex items-center border border-cyber-accent/30 bg-cyber-accent/10 hover:bg-cyber-accent/20"
              >
                <Download className="mr-2 w-4 h-4" />
                <span className="relative z-10">Resume</span>
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Experience Section - Railway Track Journey */}
        <section id="experience" ref={experienceSectionRef} className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-4 text-center">
                <span className="text-cyber-accent">{'<'}</span> Professional Journey <span className="text-cyber-accent">{'/>'}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-center">
                Follow the journey as experiences unfold along the track
              </p>
              
              {/* Railway Track Timeline */}
              <div className="relative">
                {/* Railway Track - Two parallel lines */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block" style={{ width: '8px', height: '100%' }}>
                  <div className="absolute left-0 w-0.5 h-full bg-gradient-to-b from-gray-600 via-gray-500 to-transparent" />
                  <div className="absolute right-0 w-0.5 h-full bg-gradient-to-b from-gray-600 via-gray-500 to-transparent" />
                  
                  {/* Railway Sleepers */}
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-12 h-1 bg-gray-700 left-1/2 transform -translate-x-1/2"
                      style={{ top: `${i * 5}%`, opacity: 0.6 }}
                    />
                  ))}
                </div>
                
                {/* Animated Full Train */}
                <motion.div
                  className="absolute left-1/2 hidden md:block z-30"
                  style={{
                    top: `${trainProgress * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
          <motion.div 
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1"
                  >
                    {/* Headlight Beam */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-40 bg-gradient-to-b from-yellow-400/40 to-transparent blur-2xl pointer-events-none" />
                    
                    {/* Smoke/Steam */}
              <motion.div 
                animate={{
                        scale: [0, 2],
                        opacity: [0.7, 0],
                        y: [-30, -60],
                }}
                transition={{
                        duration: 2,
                  repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-400 rounded-full blur-lg"
                    />
                    
                    {/* Train Engine (Front) */}
                    <div className="relative w-14 h-20 bg-gradient-to-b from-cyan-400 to-cyan-700 rounded-t-lg border-2 border-cyan-300 shadow-2xl shadow-cyan-500/60">
                      {/* Chimney */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-t" />
                      
                      {/* Engine Window */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-7 bg-yellow-200/90 rounded border border-gray-600" />
                      
                      {/* Headlight */}
                      <motion.div
                        animate={{ opacity: [1, 0.6, 1], scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-400/80 border-2 border-yellow-500"
                      />
                      
                      {/* Side Details */}
                      <div className="absolute top-12 left-1 w-2 h-2 bg-gray-800 rounded-full" />
                      <div className="absolute top-12 right-1 w-2 h-2 bg-gray-800 rounded-full" />
                    </div>
                    
                    {/* Carriage 1 */}
                    <div className="relative w-14 h-16 bg-gradient-to-b from-blue-500 to-blue-700 border-2 border-blue-400 shadow-xl shadow-blue-500/40">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-blue-200/70 rounded border border-gray-600" />
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-blue-200/70 rounded border border-gray-600" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-600" />
                    </div>
                    
                    {/* Connector */}
                    <div className="w-1 h-1 bg-gray-600" />
                    
                    {/* Carriage 2 */}
                    <div className="relative w-14 h-16 bg-gradient-to-b from-purple-500 to-purple-700 border-2 border-purple-400 shadow-xl shadow-purple-500/40">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-purple-200/70 rounded border border-gray-600" />
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-purple-200/70 rounded border border-gray-600" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-600" />
                    </div>
                    
                    {/* Connector */}
                    <div className="w-1 h-1 bg-gray-600" />
                    
                    {/* Carriage 3 (Cargo) */}
                    <div className="relative w-14 h-14 bg-gradient-to-b from-orange-600 to-orange-800 rounded-b-lg border-2 border-orange-400 shadow-xl shadow-orange-500/40">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-orange-300/40 rounded" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white font-bold">📦</div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Experience Stations */}
                {experiences.map((exp, index) => {
                  const stationProgress = (index + 0.5) / experiences.length;
                  const isAtStation = Math.abs(trainProgress - stationProgress) < 0.12;
                  
                  return (
                    <motion.div
                      key={index}
                      data-experience-index={index}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`relative mb-16 md:mb-32 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2`}
                    >
                      {/* Station Platform */}
                      <div className="hidden md:block absolute top-8 w-20 h-1 bg-gray-600" 
                           style={{ 
                             [index % 2 === 0 ? 'right' : 'left']: '0',
                             [index % 2 === 0 ? 'left' : 'right']: 'auto'
                           }} />
                      
                      {/* Station Node - Glows when train is at station */}
                      <motion.div 
                        className="hidden md:block absolute top-8 w-6 h-6 rounded-full border-4 border-cyber-dark z-10"
                        style={{ [index % 2 === 0 ? 'left' : 'right']: '-0.75rem' }}
                        animate={{
                          backgroundColor: isAtStation ? '#00f5ff' : '#6b7280',
                          boxShadow: isAtStation ? '0 0 25px rgba(0, 245, 255, 1)' : 'none',
                          scale: isAtStation ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Experience Card */}
                      <motion.div
                        className="relative group"
                        onClick={() => setExpandedExp(expandedExp === index ? null : index)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Enhanced Glow when train is at station */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-cyber-accent/10 to-transparent rounded-xl blur-xl transition-all duration-300"
                          animate={{
                            opacity: isAtStation ? 1 : 0,
                            scale: isAtStation ? 1.1 : 1,
                          }}
                        />
                        
                        <div className="relative bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-cyber-accent/20 group-hover:border-cyber-accent/50 transition-all duration-300 shadow-lg cursor-pointer">
                          {/* Education Badge */}
                          {exp.isEducation && (
                            <div className="mb-3 inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs text-purple-400 font-semibold">
                              <GraduationCap size={14} className="mr-1" />
                              Education
                            </div>
                          )}
                          
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-accent transition-colors duration-300 mb-1">
                                {exp.company}
                              </h3>
                              <p className="text-lg text-cyan-400 font-medium">{exp.role}</p>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedExp === index ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-cyber-accent"
                            >
                              <ChevronRight size={24} className="transform rotate-90" />
                            </motion.div>
                          </div>
                          
                          {/* Period Badge */}
                          <div className="inline-flex items-center px-3 py-1 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full text-sm text-cyber-accent mb-4">
                            <Calendar size={14} className="mr-2" />
                            {exp.period}
                          </div>
                          
                          {/* Auto-expanded Content */}
                          <AnimatePresence>
                            {expandedExp === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mt-4 pt-4 border-t border-cyber-accent/20"
                              >
                                <div className="grid grid-cols-1 gap-3">
                                  {exp.points.map((point, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex items-start"
                                    >
                                      <div className="mt-1.5 mr-3 w-2 h-2 bg-cyber-accent rounded-full flex-shrink-0" />
                                      <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="relative py-20 px-4 bg-cyber-dark/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-4 text-center">
                <span className="text-cyber-accent">{'<'}</span> Projects <span className="text-cyber-accent">{'/>'}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto text-center">
                Here are some of my key projects that showcase my technical skills and problem-solving abilities.
              </p>

              <div className="space-y-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`bg-gray-800/50 rounded-lg overflow-hidden border border-transparent hover:border-cyber-accent/30 transition-all duration-300 ${expandedProject === index ? 'bg-gray-800/70' : ''}`}
                  >
                    {/* Video/Image Display - Back to Original Layout */}
                    {(project.videoUrl || project.imageUrl) && (
                      <div className="w-full bg-gray-900/50 border-b-2 border-cyber-accent/20 relative overflow-hidden">
                        {project.videoUrl ? (
                          <video
                            ref={(video) => {
                              if (video) {
                                // Set all properties programmatically
                                video.defaultMuted = true;
                                video.muted = true;
                                video.autoplay = true;
                                video.loop = true;
                                video.playsInline = true;
                                video.controls = false;
                                
                                // Multiple autoplay triggers
                                const forcePlay = () => {
                                  video.currentTime = 0;
                                  video.play().catch(() => {
                                    // If blocked, try again on any user interaction
                                    const startVideo = () => {
                                      video.play();
                                      document.removeEventListener('click', startVideo);
                                      document.removeEventListener('scroll', startVideo);
                                      document.removeEventListener('touchstart', startVideo);
                                    };
                                    document.addEventListener('click', startVideo, { once: true });
                                    document.addEventListener('scroll', startVideo, { once: true });
                                    document.addEventListener('touchstart', startVideo, { once: true });
                                  });
                                };
                                
                                // Try multiple times with different events
                                video.addEventListener('loadeddata', forcePlay);
                                video.addEventListener('canplay', forcePlay);
                                video.addEventListener('loadedmetadata', forcePlay);
                                
                                // Immediate attempts
                                setTimeout(forcePlay, 50);
                                setTimeout(forcePlay, 200);
                                setTimeout(forcePlay, 500);
                                
                                // Intersection Observer to play when in view
                                const observer = new IntersectionObserver((entries) => {
                                  entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                      forcePlay();
                                    }
                                  });
                                }, { threshold: 0.3 });
                                
                                observer.observe(video);
                              }
                            }}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            className="w-full max-h-[500px] object-contain no-controls"
                            style={{ 
                              pointerEvents: 'none',
                              outline: 'none'
                            }}
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={project.imageUrl}
                            alt={`${project.title} preview`}
                            className="w-full max-h-[500px] object-contain"
                            draggable={false}
                            onError={() => console.log('Image failed to load:', project.imageUrl)}
                            onLoad={() => console.log('Image loaded:', project.imageUrl)}
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="p-8" onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
                      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                        <div className="flex items-center flex-wrap gap-3">
                          <motion.div
                            animate={{ rotate: expandedProject === index ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="text-cyber-accent mr-2" size={20} />
                          </motion.div>
                          <h3 className="text-2xl font-semibold text-white group-hover:text-cyber-accent">
                            {project.title}
                          </h3>
                          {project.isInternal && (
                            <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs text-orange-400 font-semibold">
                              🔒 Internal Tool
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-400">{project.period}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            onHoverStart={() => setHoveredTech(tech)}
                            onHoverEnd={() => setHoveredTech(null)}
                            className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-300 ${hoveredTech === tech ? 'bg-cyber-accent text-white scale-110' : 'bg-gray-700/50 text-gray-300'}`}
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
                            
                            {project.isInternal ? (
                              <div className="inline-flex items-center px-4 py-2 rounded-md bg-gray-700/50 text-gray-400 border border-gray-600">
                                <Code size={16} className="mr-2" />
                                Internal Company Tool - No Public Demo Available
                              </div>
                            ) : (
                              <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-md bg-cyber-accent text-white hover:bg-cyber-accent-dark transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Code size={16} className="mr-2" />
                                View on GitHub
                                <ExternalLink size={16} className="ml-2" />
                              </motion.a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Skills Section - Professional Table Design */}
        <section id="skills" className="relative py-20 px-4">
          <div className="container mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-4 text-center">
                <span className="text-cyber-accent">{'<'}</span> Technical Skills <span className="text-cyber-accent">{'/>'}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-center">
                A comprehensive overview of my technical expertise and proficiencies
              </p>
            
              {/* Enhanced Skills Table */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl border-2 border-cyber-accent/30 bg-gray-900/40 backdrop-blur-md shadow-2xl"
              >
                {/* Table Header */}
                <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b-2 border-cyber-accent/30">
                  <div className="grid grid-cols-12 gap-6 px-8 py-5">
                    <div className="col-span-12 md:col-span-3">
                      <h3 className="text-sm font-bold text-cyber-accent uppercase tracking-widest">Category</h3>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <h3 className="text-sm font-bold text-cyber-accent uppercase tracking-widest">Technologies & Tools</h3>
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-700/30">
                  {skillsTable.map((row, index) => (
                    <motion.div
                      key={row.category}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="grid grid-cols-12 gap-6 px-8 py-6 hover:bg-gray-800/50 transition-all duration-300 group relative overflow-hidden"
                    >
                      {/* Hover Effect Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/0 via-cyber-accent/5 to-cyber-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Column */}
                      <div className="col-span-12 md:col-span-3 flex items-start relative z-10">
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-2.5 h-2.5 rounded-full bg-cyber-accent"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                          />
                          <span className="text-base font-bold text-white group-hover:text-cyber-accent transition-colors duration-300">
                            {row.category}
                          </span>
                        </div>
                      </div>

                      {/* Skills Column */}
                      <div className="col-span-12 md:col-span-9 relative z-10">
                        <div className="flex flex-wrap gap-2.5">
                          {row.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.08 + skillIndex * 0.04 }}
                              whileHover={{ scale: 1.08, y: -3 }}
                              className="relative px-4 py-2.5 bg-gray-800/60 border border-gray-600/60 rounded-xl text-sm font-medium text-gray-300 
                                       hover:border-cyber-accent/70 hover:bg-gray-700/70 hover:text-white hover:shadow-lg hover:shadow-cyber-accent/20
                                       transition-all duration-300 cursor-default"
                            >
                              {skill}
                              {/* Shine effect on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100"
                                initial={false}
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                            </motion.span>
                          ))}
                        </div>
                      </div>
                </motion.div>
              ))}
            </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 px-4 bg-cyber-dark/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-4 text-center">
                <span className="text-cyber-accent">{'<'}</span> Get in Touch <span className="text-cyber-accent">{'/>'}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto text-center">
                I'm currently looking for internship opportunities in software development. Feel free to reach out!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50">
                  <h3 className="text-2xl font-semibold text-white mb-6">Contact Form</h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all duration-300"
                        required
                        disabled={status.loading}
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="from_email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all duration-300"
                        required
                        disabled={status.loading}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all duration-300"
                        required
                        disabled={status.loading}
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <AnimatePresence>
                      {status.error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                        >
                          {status.error}
                        </motion.div>
                      )}
                      
                      {status.success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-green-500 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20"
                        >
                          Message sent successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.button
                      type="submit"
                      className={`w-full px-6 py-3 bg-cyber-accent text-white rounded-lg transition-all duration-300 transform ${status.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyber-accent-dark hover:scale-[1.02]'}`}
                      disabled={status.loading}
                      whileHover={{ scale: status.loading ? 1 : 1.02 }}
                      whileTap={{ scale: status.loading ? 1 : 0.98 }}
                    >
                      {status.loading ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </div>

                <div className="space-y-8">
                  <motion.div 
                    className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
                    <div className="space-y-4">
                      {socialLinks.map((link) => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 text-gray-300 hover:text-cyber-accent transition-colors duration-300 group"
                          whileHover={{ x: 10 }}
                        >
                          <span className="text-cyber-accent group-hover:scale-110 transition-transform duration-300">
                            {link.icon}
                          </span>
                          <span>{link.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-center space-x-3">
                        <Mail className="text-cyber-accent" size={20} />
                        <p>{contactInfo.email}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="text-cyber-accent" size={20} />
                        <p>{contactInfo.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-cyber-accent" size={20} />
                        <p>{contactInfo.location}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="text-cyber-accent" size={20} />
                        <p>{contactInfo.availability}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 