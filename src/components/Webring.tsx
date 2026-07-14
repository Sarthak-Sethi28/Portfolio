import React from 'react';

// UW CS webring (cs.uwatering.com). The hash is this site's URL.
const RING = 'https://cs.uwatering.com/#https://sethisarthak.com';

const arrow = 'font-mono text-xs text-faint transition-colors hover:text-accent-hi';

const Webring: React.FC = () => (
  <div className="flex items-center gap-2" aria-label="UW CS webring">
    <a className={arrow} href={`${RING}?nav=prev`} aria-label="Previous site in the UW CS webring">
      ←
    </a>
    <a href={RING} target="_blank" rel="noopener noreferrer" aria-label="UW CS webring">
      <img
        src="https://cs.uwatering.com/icon.white.svg"
        alt="UW CS Webring"
        className="h-5 w-auto opacity-60 transition-opacity hover:opacity-100"
      />
    </a>
    <a className={arrow} href={`${RING}?nav=next`} aria-label="Next site in the UW CS webring">
      →
    </a>
  </div>
);

export default Webring;
