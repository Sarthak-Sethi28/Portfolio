import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Check, ArrowDown } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import Monogram from '../components/Monogram';
import ExperienceColumn from '../components/ExperienceColumn';
import ProjectsColumn from '../components/ProjectsColumn';
import GitHubPulse from '../components/GitHubPulse';
import Footer from '../components/Footer';
import { profile } from '../data/profile';

const linkClass =
  'flex items-center gap-1.5 rounded-lg border border-line/80 bg-base/40 px-3 py-2 font-mono text-xs text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-accent-hi';

const HeroLinks: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Links">
      <a className={linkClass} href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
        <Github size={14} /> github
      </a>
      <a className={linkClass} href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
        <Linkedin size={14} /> linkedin
      </a>
      <button className={linkClass} onClick={copyEmail} aria-label="Copy email address">
        {copied ? <Check size={14} className="text-accent-hi" /> : <Mail size={14} />}
        {copied ? 'copied' : 'email'}
      </button>
      <a className={linkClass} href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
        <FileText size={14} /> resume ↓
      </a>
    </nav>
  );
};

const Home: React.FC = () => (
  <div className="grid-bg bg-base text-ink">
    {/* ---- 3D HERO ---- */}
    <section className="relative h-screen w-full overflow-hidden">
      <Hero3D />
      {/* vignette for text legibility over the glowing core */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,11,0.9)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between px-6 py-5">
          <Monogram size={40} />
          <HeroLinks />
        </div>

        <div className="pointer-events-none flex flex-1 flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="font-serif text-6xl leading-none text-ink drop-shadow-[0_2px_30px_rgba(10,10,11,0.9)] md:text-8xl"
          >
            Sarthak Sethi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 font-mono text-sm text-muted md:text-base"
          >
            <span className="text-ink">{profile.title}</span>
            <span className="text-faint"> · {profile.school}</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-base/50 px-3 py-1 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-live-pulse" />
            <span className="font-mono text-[11px] text-accent-hi">{profile.status}</span>
          </motion.div>
        </div>

        <div className="flex justify-center pb-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-faint"
          >
            scroll
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ---- DASHBOARD ---- */}
    <section className="h-screen w-full">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col gap-4 px-4 py-6">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,1fr)_minmax(340px,1.25fr)_minmax(300px,1fr)]">
          <ExperienceColumn />
          <ProjectsColumn />
          <GitHubPulse />
        </div>
        <Footer />
      </div>
    </section>
  </div>
);

export default Home;
