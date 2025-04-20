import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com/
export const EMAILJS_CONFIG = {
  serviceId: "service_lbvvuwu",    // Email Services ID
  templateId: "template_n3okbb4",  // Email Template ID
  publicKey: "W-ZxqejtsOaOWG81D"   // Public Key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey); 