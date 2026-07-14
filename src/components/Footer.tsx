import React from 'react';

const buildDate = process.env.REACT_APP_BUILD_DATE;

const Footer: React.FC = () => (
  <footer className="flex shrink-0 items-center justify-between px-1 font-mono text-[11px] text-faint">
    <span>© 2026 Sarthak Sethi</span>
    <span>built in React{buildDate ? ` · deployed ${buildDate}` : ''}</span>
  </footer>
);

export default Footer;
