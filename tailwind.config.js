/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        base: '#0A0A0B',
        surface: '#111113',
        'surface-2': '#161619',
        line: '#1E1E22',
        ink: '#EDEDEF',
        muted: '#A1A1AA',
        faint: '#8A8A93', // ~5:1 on #0A0A0B — passes WCAG AA for small text
        accent: '#6366F1',
        'accent-hi': '#818CF8',
        'accent-dim': 'rgba(99, 102, 241, 0.12)',
      },
      keyframes: {
        'live-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'live-pulse': 'live-pulse 1.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
