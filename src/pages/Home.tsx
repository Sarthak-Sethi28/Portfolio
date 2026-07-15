import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Check, ArrowDown } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import Monogram from '../components/Monogram';
import ExperienceColumn from '../components/ExperienceColumn';
import ProjectsColumn from '../components/ProjectsColumn';
import TechMarquee from '../components/TechMarquee';
import Focus from '../components/Focus';
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
    {/* ---- HERO: cinematic video intro; auto-scrolls to content on the water splash ---- */}
    <section className="relative h-screen w-full overflow-hidden">
      <HeroBackground />
      {/* left-to-right scrim keeps the name legible over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.92)_0%,rgba(10,10,11,0.55)_38%,transparent_65%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <Monogram size={40} />
          <HeroLinks />
        </div>

        <div className="pointer-events-none flex flex-1 flex-col items-start justify-center px-6 text-left md:px-12 lg:px-20">
          <h1 className="font-serif text-5xl leading-[0.95] text-ink drop-shadow-[0_2px_30px_rgba(10,10,11,0.95)] sm:text-6xl md:text-7xl lg:text-8xl">
            Sarthak
            <br />
            Sethi
          </h1>
          <p className="mt-5 max-w-md font-mono text-sm text-muted md:text-base">
            <span className="block text-ink">{profile.title}</span>
            <span className="mt-1 block text-faint">{profile.school}</span>
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-base/50 px-3 py-1 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-live-pulse" />
            <span className="font-mono text-[11px] text-accent-hi">{profile.status}</span>
          </div>
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

    {/* ---- CONTENT ---- */}
    <section id="content-start" className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ExperienceColumn />
        <ProjectsColumn />
      </div>
      <div className="mt-16">
        <TechMarquee />
      </div>
      <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
        <Focus />
        <GitHubPulse />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </section>
  </div>
);

export default Home;
