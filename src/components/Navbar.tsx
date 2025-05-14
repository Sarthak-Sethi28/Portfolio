import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Home, User, Briefcase, Mail, Download } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/about', label: 'About', icon: <User size={18} /> },
    { path: '/projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle resume download
  const handleResumeDownload = () => {
    window.open('/Sarthak Sethi Cv.pdf', '_blank');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 20 ? 'py-2 bg-cyber-dark/90 backdrop-blur-md shadow-cyber' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-cyber-glow group-hover:text-white transition-colors duration-300">
              <Terminal size={24} />
            </span>
            <span className="text-xl font-display font-bold text-white">
              S<span className="text-cyber-accent">.</span>Sethi
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    relative px-4 py-2 rounded-md font-medium transition-all duration-300 group flex items-center space-x-1
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.icon}</span>
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-indicator"
                          className="absolute inset-0 bg-cyber-dark border border-cyber-accent/50 rounded-md z-0 shadow-cyber"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            {/* Resume Download Button */}
            <li className="ml-2">
              <button
                onClick={handleResumeDownload}
                className="flex items-center space-x-1 px-4 py-2 rounded-md bg-cyber-accent text-white hover:bg-cyber-accent-dark transition-colors duration-300"
              >
                <Download size={18} />
                <span>Resume</span>
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center text-gray-300 hover:text-white transition-colors"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cyber-darker/95 backdrop-blur-lg border-y border-cyber-accent/20"
          >
            <div className="container mx-auto px-4 py-3">
              <ul className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center space-x-3 px-4 py-3 rounded-md font-medium
                        ${isActive 
                          ? 'bg-cyber-accent/10 text-white border-l-2 border-cyber-accent' 
                          : 'text-gray-400 hover:bg-cyber-accent/5 hover:text-white'
                        }
                      `}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
                
                {/* Resume Download Button (Mobile) */}
                <li>
                  <button
                    onClick={handleResumeDownload}
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-md bg-cyber-accent/10 text-white hover:bg-cyber-accent/20 transition-colors duration-300 border-l-2 border-cyber-accent"
                  >
                    <Download size={18} />
                    <span>Download Resume</span>
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative scanning line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-cyber-accent/40"
        animate={{
          width: ['0%', '100%', '0%'],
          left: ['0%', '0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </header>
  );
};

export default Navbar; 