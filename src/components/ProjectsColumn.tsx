import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsColumn: React.FC = () => (
  <section aria-label="Projects" className="flex min-h-0 flex-col gap-3">
    <div className="flex shrink-0 items-baseline justify-between">
      <span className="section-label">Projects</span>
      <span className="font-mono text-[10px] text-faint">{projects.length} selected</span>
    </div>
    <div className="scroll-fade scrollbar-thin scrollbar-thumb-line flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
);

export default ProjectsColumn;
