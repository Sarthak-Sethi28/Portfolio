import React from 'react';
import Webring from './Webring';

const Footer: React.FC = () => (
  <footer className="flex flex-col-reverse items-center justify-between gap-4 px-1 font-mono text-[11px] text-faint sm:flex-row">
    <span>© 2026 Sarthak Sethi</span>
    <Webring />
  </footer>
);

export default Footer;
