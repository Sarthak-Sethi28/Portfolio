import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import { Terminal, ChevronRight, ExternalLink, Code, Cpu, Cloud, Database } from 'lucide-react';

const Home = () => {
  const skills = [
    { name: 'React', icon: <Code className="mr-2" size={16} /> },
    { name: 'Python', icon: <Terminal className="mr-2" size={16} /> },
    { name: 'FastAPI', icon: <Cloud className="mr-2" size={16} /> },
    { name: 'Node.js', icon: <Cpu className="mr-2" size={16} /> },
    { name: 'PostgreSQL', icon: <Database className="mr-2" size={16} /> },
    { name: 'TypeScript', icon: <Code className="mr-2" size={16} /> },
    { name: 'AWS', icon: <Cloud className="mr-2" size={16} /> },
    { name: 'Docker', icon: <Cpu className="mr-2" size={16} /> }
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
  
  return (
    <div ref={containerRef}>
      <Background3D />
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-[-50px] left-[-30px] w-20 h-20 border border-cyber-accent/30 animate-pulse-slow" />
            <div className="absolute bottom-[-60px] right-[-40px] w-32 h-32 border border-cyber-accent/20 rotate-12 animate-pulse-slower" />
            
            {/* Main title */}
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
            
            {/* Subtitle with typing effect */}
            <motion.h2 
              className="text-xl md:text-2xl text-gray-300 mb-6 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-cyber-accent">{'>'}</span> Full Stack Developer & Software Engineer
            </motion.h2>
            
            {/* Brief intro */}
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Computer Science student at University of Waterloo with experience in building
              scalable applications, microservices architecture, and full-stack development.
            </motion.p>
            
            {/* Code snippet */}
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
                    {'  '}<span className="text-yellow-300">mission</span>: <span className="text-green-400">'Crafting digital experiences through code'</span>,<br />
                    {'  '}<span className="text-yellow-300">skills</span>: [<span className="text-green-400">'Web', 'Mobile', 'Cloud', 'AI'</span>],<br />
                    {'}'};
                  </code>
                </pre>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/0 via-cyber-accent/5 to-cyber-accent/0 animate-cyber-scan pointer-events-none" />
            </motion.div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Link
                  to="/projects"
                  className="group relative px-6 py-3 bg-cyber-dark overflow-hidden rounded-md font-medium text-white shadow-cyber inline-flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 bg-cyber-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Link
                  to="/contact"
                  className="group relative px-6 py-3 overflow-hidden rounded-md font-medium text-white shadow-cyber inline-flex items-center border border-cyber-accent/30"
                >
                  <span className="relative z-10 flex items-center">
                    Contact Me
                    <ExternalLink className="ml-1 w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-cyber-accent/0 group-hover:bg-cyber-accent/20 transition-colors" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
            <div className="w-5 h-10 border-2 border-gray-400 rounded-full relative">
              <motion.div 
                className="w-1 h-2 bg-cyber-accent rounded-full absolute left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [2, 6, 2]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Skills Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative z-10 mb-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                <span className="text-cyber-accent">{'<'}</span> Skills <span className="text-cyber-accent">{'/>'}</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                These are the technologies and frameworks I work with to build modern, scalable applications.
              </p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                  }}
                  className="rounded-lg border border-cyber-accent/20 bg-cyber-darker/50 backdrop-blur-sm p-4 text-center 
                            hover:border-cyber-accent/50 hover:bg-cyber-accent/5 hover:shadow-cyber 
                            transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-2 text-cyber-accent">
                    {skill.icon}
                  </div>
                  <p className="text-gray-300">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 