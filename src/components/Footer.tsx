import React from 'react';
import Webring from './Webring';

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center gap-3 px-1 font-mono text-[11px] text-faint">
    <Webring />
    <span>© 2026 Sarthak Sethi</span>
  </footer>
);

export default Footer;
