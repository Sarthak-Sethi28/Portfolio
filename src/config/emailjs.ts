import emailjs from '@emailjs/browser';

// EmailJS Configuration - Updated with new EmailJS service
export const EMAILJS_CONFIG = {
  serviceId: "service_ha0fg1t",    // EmailJS Email Service (more reliable than Gmail)
  templateId: "template_n3okbb4",  // Your Email Template ID
  publicKey: "W-ZxqejtsOaOWG81D"   // Your Public Key
};

// Initialize EmailJS with public key
try {
  emailjs.init(EMAILJS_CONFIG.publicKey);
  console.log('✅ EmailJS initialized successfully with service:', EMAILJS_CONFIG.serviceId);
} catch (error) {
  console.error('❌ EmailJS initialization error:', error);
} 