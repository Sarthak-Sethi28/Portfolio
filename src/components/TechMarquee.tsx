import React from 'react';
import { stack, Tech } from '../data/stack';

const Chip: React.FC<{ tech: Tech }> = ({ tech }) => {
  const Icon = tech.Icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return (
    <span className="mx-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
      <Icon className="h-3.5 w-3.5 text-accent-hi" aria-hidden="true" />
      <span className="font-mono text-[11px] text-muted">{tech.name}</span>
    </span>
  );
};

const TechMarquee: React.FC = () => (
  <section aria-label="Tech stack" className="flex items-center gap-4">
    <span className="section-label shrink-0">Stack</span>
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee" style={{ willChange: 'transform' }}>
        {[...stack, ...stack].map((t, i) => (
          <Chip key={`${t.name}-${i}`} tech={t} />
        ))}
      </div>
    </div>
  </section>
);

export default TechMarquee;
