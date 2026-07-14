import React from 'react';
import { PulseWeek } from '../data/types';

const LEVEL_BG: Record<number, string> = {
  0: 'bg-surface-2',
  1: 'bg-accent/25',
  2: 'bg-accent/45',
  3: 'bg-accent/70',
  4: 'bg-accent',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const CELL = 11; // px per day cell (incl. via gap)

interface Props {
  weeks: PulseWeek[];
}

/** GitHub-style full-year contribution calendar with month + weekday labels. */
const ContributionHeatmap: React.FC<Props> = ({ weeks }) => {
  // Month label per week column (shown when the month changes).
  let prevMonth = -1;
  const monthCols = weeks.map((week) => {
    const first = week.days[0]?.date;
    if (!first) return '';
    const m = new Date(first).getUTCMonth();
    if (m !== prevMonth) {
      prevMonth = m;
      return MONTHS[m];
    }
    return '';
  });

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex flex-col gap-1">
        {/* Month labels */}
        <div className="flex" style={{ paddingLeft: 28 }}>
          {monthCols.map((label, i) => (
            <div
              key={i}
              className="whitespace-nowrap font-mono text-[10px] text-faint"
              style={{ width: CELL }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {/* Weekday labels */}
          <div className="flex flex-col justify-between" style={{ width: 24 }}>
            {DAY_LABELS.map((d, i) => (
              <span key={i} className="font-mono text-[9px] leading-none text-faint" style={{ height: CELL - 3 }}>
                {d}
              </span>
            ))}
          </div>

          {/* Week columns */}
          <div className="flex gap-[3px]" role="img" aria-label="GitHub contribution graph">
            {weeks.map((week, wi) => {
              // place each day in its weekday row (0=Sun … 6=Sat)
              const slots: (typeof week.days[number] | null)[] = Array(7).fill(null);
              week.days.forEach((day) => {
                slots[new Date(day.date).getUTCDay()] = day;
              });
              return (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {slots.map((day, di) =>
                    day ? (
                      <span
                        key={di}
                        data-testid="heatmap-cell"
                        title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                        className={`h-2 w-2 rounded-[2px] ${LEVEL_BG[day.level]}`}
                      />
                    ) : (
                      <span key={di} className="h-2 w-2" />
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
