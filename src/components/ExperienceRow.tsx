import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Experience } from '../data/types';

const LogoTile: React.FC<{ item: Experience }> = ({ item }) => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white/90">
    {item.logo ? (
      <img
        src={item.logo}
        alt={`${item.company} logo`}
        className="h-7 w-7 object-contain"
        loading="lazy"
      />
    ) : (
      <span className="font-serif text-lg font-semibold text-base">
        {item.company.charAt(0)}
      </span>
    )}
  </div>
);

const ExperienceRow: React.FC<{ item: Experience }> = ({ item }) => (
  <article className="card flex items-start gap-4 px-4 py-3.5 transition-colors hover:border-accent/40">
    <LogoTile item={item} />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="flex items-center gap-2 truncate text-[15px] font-semibold text-ink">
          {item.isEducation && <GraduationCap size={14} className="shrink-0 text-accent-hi" />}
          <span className="truncate">{item.company}</span>
        </h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint">
          {item.period}
        </span>
      </div>
      <div className="mt-0.5 font-mono text-[11px] text-muted">
        {item.role} · {item.location}
      </div>
      <p className="mt-1.5 text-[13px] leading-snug text-muted">{item.metric}</p>
    </div>
  </article>
);

export default ExperienceRow;
