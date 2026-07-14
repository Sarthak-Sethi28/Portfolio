import React from 'react';
import { experience } from '../data/experience';
import ExperienceRow from './ExperienceRow';

const ExperienceColumn: React.FC = () => (
  <section aria-label="Experience">
    <div className="mb-4 section-label">Experience</div>
    <div className="flex flex-col gap-3">
      {experience.map((item) => (
        <ExperienceRow key={`${item.company}-${item.period}`} item={item} />
      ))}
    </div>
  </section>
);

export default ExperienceColumn;
