/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f9ff',
          100: '#ccf2ff',
          200: '#99e6ff',
          300: '#66d9ff',
          400: '#33cdff',
          500: '#00c0ff',
          600: '#009acc',
          700: '#007399',
          800: '#004d66',
          900: '#002633',
        },
        secondary: {
          50: '#f2e6ff',
          100: '#e6ccff',
          200: '#cc99ff',
          300: '#b366ff',
          400: '#9933ff',
          500: '#8000ff',
          600: '#6600cc',
          700: '#4d0099',
          800: '#330066',
          900: '#1a0033',
        },
        cyber: {
          black: '#101116',
          darker: '#15161e',
          dark: '#1a1b26',
          accent: '#00f2fe',
          glow: '#00f2fe',
          pink: '#ff00ff',
          purple: '#8000ff',
          'grid-line': 'rgba(0, 242, 254, 0.1)',
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, var(--tw-gradient-stops)), linear-gradient(to bottom, var(--tw-gradient-stops))',
        'cyber-grid-small': 'linear-gradient(rgba(0, 242, 254, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)',
        'cyber-grid-large': 'linear-gradient(rgba(0, 242, 254, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 242, 254, 0.05) 2px, transparent 2px)',
        'cyber-radial': 'radial-gradient(circle at center, rgba(0, 242, 254, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        'cyber-glow': 'linear-gradient(180deg, rgba(0, 242, 254, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
      },
      animation: {
        'cyber-glow': 'cyber-glow 2s ease-in-out infinite alternate',
        'cyber-scan': 'cyber-scan 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-fade': 'matrix-fade 2.5s ease-out forwards',
        'blur-in': 'blur-in 1s ease-out forwards',
      },
      keyframes: {
        'cyber-glow': {
          '0%': { boxShadow: '0 0 10px rgba(0, 242, 254, 0.5), 0 0 20px rgba(0, 242, 254, 0.3), 0 0 30px rgba(0, 242, 254, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 242, 254, 0.7), 0 0 30px rgba(0, 242, 254, 0.5), 0 0 45px rgba(0, 242, 254, 0.2)' },
        },
        'cyber-scan': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 0%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'text-glow': {
          '0%': { textShadow: '0 0 5px rgba(0, 242, 254, 0.5), 0 0 10px rgba(0, 242, 254, 0.3)' },
          '100%': { textShadow: '0 0 10px rgba(0, 242, 254, 0.7), 0 0 20px rgba(0, 242, 254, 0.5)' },
        },
        'matrix-fade': {
          '0%': { opacity: 0 },
          '5%': { opacity: 0.2 },
          '10%': { opacity: 0.5 },
          '15%': { opacity: 0.3 },
          '20%': { opacity: 0.7 },
          '25%': { opacity: 0.4 },
          '30%': { opacity: 0.8 },
          '35%': { opacity: 0.5 },
          '40%': { opacity: 0.9 },
          '45%': { opacity: 0.7 },
          '50%': { opacity: 1 },
          '100%': { opacity: 1 },
        },
        'blur-in': {
          '0%': { filter: 'blur(10px)', opacity: 0 },
          '100%': { filter: 'blur(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'cyber': '0 0 10px rgba(0, 242, 254, 0.5), 0 0 20px rgba(0, 242, 254, 0.3), 0 0 30px rgba(0, 242, 254, 0.1)',
        'cyber-strong': '0 0 15px rgba(0, 242, 254, 0.7), 0 0 30px rgba(0, 242, 254, 0.5), 0 0 45px rgba(0, 242, 254, 0.2)',
        'cyber-text': '0 0 5px rgba(0, 242, 254, 0.5), 0 0 10px rgba(0, 242, 254, 0.3)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} 