import { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Muse Sketch Studio',
    year: '2025',
    metric:
      '1st place, Replicate AI Hackathon ($1,500 in prizes). AI pipeline: prompt → sketch → runway video.',
    tags: ['React', 'TypeScript', 'Node.js', 'Replicate'],
    badge: 'Hackathon Winner',
    url: 'https://github.com/Sarthak-Sethi28/muse-sketch-studio',
    video: '/assets/projects/videos/muse-sketch-studio.mp4',
  },
  {
    title: 'CarRaksha',
    year: '2023',
    metric:
      '1st place, All-India TechFest among 100,000+ students. Arduino collision-prevention + alcohol detection.',
    tags: ['C++', 'Arduino'],
    badge: '1st Prize',
    url: 'https://github.com/Sarthak-Sethi28/CarRaksha',
    image: '/assets/projects/images/caraksha.png',
  },
  {
    title: 'Custom Chatbot',
    year: '2025',
    metric: 'AI chatbot auto-syncing Shopify every 6h — sub-second FAQ + product search.',
    tags: ['FastAPI', 'React', 'OpenAI'],
    url: 'https://github.com/Sarthak-Sethi28/danier-chatbot',
    video: '/assets/projects/videos/custom-chatbot.mp4',
  },
  {
    title: 'iMoney',
    year: '2024',
    metric:
      'WCAG 2.1 AAA finance app for the visually impaired — full voice navigation, screen-reader first.',
    tags: ['React', 'Node.js', 'MongoDB', 'Web Speech', 'ARIA'],
    url: 'https://github.com/Sarthak-Sethi28/iMoney',
    image: '/assets/projects/images/imoney.png',
  },
  {
    title: 'Low-Stock Alert System',
    year: '2025',
    metric: 'Automated inventory alerts — 100% delivery reliability, multi-worker on Render.',
    tags: ['FastAPI', 'SQLAlchemy', 'Pandas'],
    badge: 'Internal Tool',
  },
  {
    title: 'GIM — Guard in Motion',
    year: '2023',
    metric: 'Wearable safety device — GPS + motion triggers with live audio/video streaming.',
    tags: ['Python', 'ML', 'IoT'],
    url: 'https://github.com/Sarthak-Sethi28/GIM',
    image: '/assets/projects/images/gim.png',
  },
];
