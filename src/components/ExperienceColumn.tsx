import React from 'react';
import { experience } from '../data/experience';
import ExperienceRow from './ExperienceRow';

const ExperienceColumn: React.FC = () => (
  <section aria-label="Experience" className="flex min-h-0 flex-col gap-3">
    <div className="section-label shrink-0">Experience</div>
    <div className="scrollbar-thin scrollbar-thumb-line flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
      {experience.map((item) => (
        <ExperienceRow key={`${item.company}-${item.period}`} item={item} />
      ))}
    </div>
  </section>
);

export default ExperienceColumn;
