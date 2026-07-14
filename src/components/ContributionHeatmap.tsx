import React from 'react';
import { PulseWeek } from '../data/types';

const LEVEL_BG: Record<number, string> = {
  0: 'bg-surface-2',
  1: 'bg-accent/25',
  2: 'bg-accent/45',
  3: 'bg-accent/70',
  4: 'bg-accent',
};

interface Props {
  weeks: PulseWeek[];
}

const ContributionHeatmap: React.FC<Props> = ({ weeks }) => (
  <div className="flex gap-[3px] overflow-hidden" role="img" aria-label="GitHub contribution graph">
    {weeks.map((week, wi) => (
      <div key={wi} className="flex flex-col gap-[3px]">
        {week.days.map((day) => (
          <span
            key={day.date}
            data-testid="heatmap-cell"
            title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
            className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_BG[day.level]}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default ContributionHeatmap;
