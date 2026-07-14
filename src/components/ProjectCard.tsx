import React from 'react';
import { ArrowUpRight, Trophy, Lock, Sparkles } from 'lucide-react';
import { Project } from '../data/types';

const Badge: React.FC<{ badge: NonNullable<Project['badge']> }> = ({ badge }) => {
  const internal = badge === 'Internal Tool';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
        internal ? 'border border-line text-faint' : 'bg-accent-dim text-accent-hi'
      }`}
    >
      {internal ? <Lock size={10} /> : <Trophy size={10} />}
      {badge}
    </span>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const Wrapper = project.url ? 'a' : 'div';
  const linkProps = project.url
    ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`card group flex min-h-[168px] flex-col p-5 transition-colors ${
        project.url ? 'hover:border-accent/50' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
            {project.year}
          </span>
          {project.url && (
            <ArrowUpRight
              size={16}
              className="text-faint transition-colors group-hover:text-accent-hi"
            />
          )}
        </div>
      </div>

      {(project.badge || project.accolades) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.badge && <Badge badge={project.badge} />}
          {project.accolades?.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 rounded-full bg-accent-dim px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-hi"
            >
              <Sparkles size={10} />
              {a}
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-sm leading-relaxed text-muted">{project.metric}</p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
    </Wrapper>
  );
};

export default ProjectCard;
