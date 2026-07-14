import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsColumn: React.FC = () => (
  <section aria-label="Projects">
    <div className="mb-4 flex items-baseline justify-between">
      <span className="section-label">Projects</span>
      <span className="font-mono text-[10px] text-faint">{projects.length} selected</span>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
);

export default ProjectsColumn;
