import React from 'react';
import { stack, Tech } from '../data/stack';

const Chip: React.FC<{ tech: Tech }> = ({ tech }) => {
  // react-icons' IconType returns ReactNode; cast to a plain SVG component for JSX.
  const Icon = tech.Icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return (
    <span className="mx-2 inline-flex shrink-0 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2">
      <Icon className="h-4 w-4 text-accent-hi" aria-hidden="true" />
      <span className="font-mono text-xs text-muted">{tech.name}</span>
    </span>
  );
};

const Row: React.FC<{ items: Tech[]; reverse?: boolean }> = ({ items, reverse }) => (
  <div className="flex w-max" style={{ willChange: 'transform' }}>
    <div className={`flex ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
      {/* duplicated once for a seamless -50% loop */}
      {[...items, ...items].map((t, i) => (
        <Chip key={`${t.name}-${i}`} tech={t} />
      ))}
    </div>
  </div>
);

const TechMarquee: React.FC = () => {
  const mid = Math.ceil(stack.length / 2);
  const rowA = stack.slice(0, mid);
  const rowB = stack.slice(mid);

  return (
    <section aria-label="Tech stack">
      <div className="mb-4 section-label">Stack</div>
      <div
        className="relative flex flex-col gap-3 overflow-hidden py-1"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
};

export default TechMarquee;
