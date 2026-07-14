import React from 'react';
import { Bot, Boxes, Wrench, Layers, BrainCircuit } from 'lucide-react';

const builds = [
  { Icon: Bot, label: 'AI agents' },
  { Icon: Boxes, label: 'SaaS products' },
  { Icon: Wrench, label: 'Dev tools' },
  { Icon: Layers, label: 'Full-stack apps' },
  { Icon: BrainCircuit, label: 'ML pipelines' },
];

const Focus: React.FC = () => (
  <section aria-label="What I build" className="card flex flex-col p-5">
    <div className="mb-3 section-label">What I build</div>
    <ul className="flex flex-col gap-1.5">
      {builds.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2 text-accent-hi">
            <Icon size={12} />
          </span>
          <span className="text-[13px] text-ink">{label}</span>
        </li>
      ))}
    </ul>
    <div className="mt-4 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-live-pulse" />
      <span className="font-mono text-[11px] text-accent-hi">ready for the next build</span>
    </div>
  </section>
);

export default Focus;
