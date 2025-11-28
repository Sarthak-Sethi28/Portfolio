import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Clock, Linkedin, Github, ExternalLink } from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';

const Contact = () => {
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

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      
      setStatus({ loading: false, error: '', success: true });
      setFormData({ from_name: '', from_email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        loading: false,
        error: 'Failed to send message. Please try again later.',
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
      url: 'https://sarthaksethi.com',
      icon: <ExternalLink className="w-6 h-6" />,
    }
  ];

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
          Get in Touch
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-300 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm currently looking for internship opportunities in software development.
          Feel free to reach out if you'd like to connect!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Contact Form</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-cyber-accent focus:border-transparent
                           transition-all duration-300"
                  required
                  disabled={status.loading}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-cyber-accent focus:border-transparent
                           transition-all duration-300"
                  required
                  disabled={status.loading}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-cyber-accent focus:border-transparent
                           transition-all duration-300"
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
                className={`w-full px-6 py-3 bg-cyber-accent text-white rounded-lg 
                          transition-all duration-300 transform
                          ${status.loading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-cyber-accent-dark hover:scale-[1.02]'}`}
                disabled={status.loading}
                whileHover={{ scale: status.loading ? 1 : 1.02 }}
                whileTap={{ scale: status.loading ? 1 : 0.98 }}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <motion.div 
              className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Connect With Me</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-300 hover:text-cyber-accent 
                             transition-colors duration-300 group"
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
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 