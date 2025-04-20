import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ChevronUp } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Sarthak-Sethi28',
      icon: <Github size={18} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sarthak2803',
      icon: <Linkedin size={18} />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/sarthaksethi',
      icon: <Twitter size={18} />,
    },
    {
      name: 'Email',
      url: 'mailto:s36sethi@uwaterloo.ca',
      icon: <Mail size={18} />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative z-10 bg-cyber-darker border-t border-cyber-accent/20">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent/50 to-transparent w-full" />
      
      {/* Scroll to top button */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToTop}
          className="group bg-cyber-dark p-2 rounded-full border border-cyber-accent/30 hover:border-cyber-accent/70 transition-all duration-300 shadow-cyber"
          aria-label="Scroll to top"
        >
          <ChevronUp 
            size={20} 
            className="text-cyber-accent group-hover:text-white transition-colors duration-300" 
          />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center group">
              <span className="font-display text-xl font-bold text-white">
                S<span className="text-cyber-accent">.</span>Sethi
              </span>
            </Link>
            <div className="mt-2 text-sm text-gray-400">
              © {currentYear} Sarthak Sethi. All rights reserved.
            </div>
          </div>
          
          {/* Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6 md:mb-0">
            <div>
              <h3 className="text-white font-medium mb-3">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-cyber-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-cyber-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-gray-400 hover:text-cyber-accent transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-cyber-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social links and made with love */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-cyber-accent/10">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-cyber-accent transition-colors duration-300
                          border border-cyber-accent/0 hover:border-cyber-accent/30 rounded-md hover:shadow-cyber"
                whileHover={{ scale: 1.1 }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          
          
        </div>
      </div>
      
      {/* Back decoration */}
      <div className="relative h-1 w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  );
};

export default Footer; 