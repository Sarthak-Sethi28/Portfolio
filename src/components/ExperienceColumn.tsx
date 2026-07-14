import React from 'react';
import { experience } from '../data/experience';
import ExperienceRow from './ExperienceRow';

const ExperienceColumn: React.FC = () => (
  <section aria-label="Experience" className="flex min-h-0 flex-col gap-3">
    <div className="section-label">Experience</div>
    <div className="flex flex-col gap-2">
      {experience.map((item) => (
        <ExperienceRow key={`${item.company}-${item.period}`} item={item} />
      ))}
    </div>
  </section>
);

export default ExperienceColumn;
