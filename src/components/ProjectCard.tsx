import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink, Trophy, Lock } from 'lucide-react';
import { Project } from '../data/types';

const Badge: React.FC<{ badge: NonNullable<Project['badge']> }> = ({ badge }) => {
  const internal = badge === 'Internal Tool';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
        internal
          ? 'border border-line text-faint'
          : 'bg-accent-dim text-accent-hi'
      }`}
    >
      {internal ? <Lock size={10} /> : <Trophy size={10} />}
      {badge}
    </span>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const hasMedia = Boolean(project.video || project.image);
  const expandable = hasMedia || Boolean(project.url);

  return (
    <article className="card overflow-hidden transition-colors hover:border-accent/40">
      <button
        type="button"
        onClick={() => expandable && setOpen((v) => !v)}
        className="w-full px-4 py-3 text-left"
        aria-expanded={expandable ? open : undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
            {expandable && (
              <ChevronRight
                size={15}
                className={`shrink-0 text-faint transition-transform ${open ? 'rotate-90' : ''}`}
              />
            )}
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint">
            {project.year}
          </span>
        </div>

        {project.badge && (
          <div className="mt-1.5">
            <Badge badge={project.badge} />
          </div>
        )}

        <p className="mt-1.5 text-[13px] leading-snug text-muted">{project.metric}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line"
          >
            {project.video ? (
              <video
                className="max-h-64 w-full bg-black object-contain"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : project.image ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="max-h-64 w-full bg-black object-contain"
                draggable={false}
              />
            ) : null}

            <div className="px-4 py-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-hi hover:underline"
                >
                  View on GitHub <ExternalLink size={13} />
                </a>
              ) : (
                <span className="font-mono text-xs text-faint">
                  Internal company tool — no public repo
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ProjectCard;
