export interface Profile {
  name: string;
  title: string;
  school: string;
  status: string;
  email: string;
  github: string; // username only
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  /** Metric-led one-liner (proof-forward). */
  metric: string;
  isEducation?: boolean;
}

export type Badge = 'Hackathon Winner' | '1st Prize' | 'Internal Tool';

export interface Project {
  title: string;
  year: string;
  /** Proof-forward one-liner. */
  metric: string;
  tags: string[];
  badge?: Badge;
  url?: string;
  video?: string;
  image?: string;
}

// --- GitHub Pulse ---

export interface PulseDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PulseWeek {
  days: PulseDay[];
}

export interface PulseEvent {
  type: string;
  repo: string;
  message: string;
  url: string;
  at: string;
}

export interface Pulse {
  generatedAt: string;
  live: boolean;
  user: string;
  stats: { publicRepos: number; followers: number; totalStars: number };
  contributions: { total: number; weeks: PulseWeek[] };
  recent: PulseEvent[];
}
