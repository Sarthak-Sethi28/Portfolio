import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, Check } from 'lucide-react';
import { profile } from '../data/profile';
import Monogram from './Monogram';

const linkClass =
  'flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent-hi';

const Header: React.FC = () => {
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
    <header className="card flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <Monogram size={36} />
          <h1 className="font-serif text-3xl leading-none text-ink md:text-[2.4rem]">
            {profile.name}
          </h1>
        </div>
        <p className="mt-2 font-mono text-xs text-muted">
          <span className="text-ink">{profile.title}</span>
          <span className="text-faint"> · {profile.school}</span>
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-accent-dim px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-live-pulse" />
          <span className="font-mono text-[11px] text-accent-hi">{profile.status}</span>
        </div>
      </div>

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
    </header>
  );
};

export default Header;
