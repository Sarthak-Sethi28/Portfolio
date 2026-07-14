import React from 'react';
import { PulseWeek } from '../data/types';

const LEVEL_BG: Record<number, string> = {
  0: 'bg-white/[0.07]',
  1: 'bg-accent/50',
  2: 'bg-accent/70',
  3: 'bg-accent/85',
  4: 'bg-accent',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const LABEL_W = 26;

interface Props {
  weeks: PulseWeek[];
}

/** GitHub-style contribution calendar that fills its container width (no dead space). */
const ContributionHeatmap: React.FC<Props> = ({ weeks }) => {
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
    <div className="w-full">
      {/* Month labels */}
      <div className="flex h-4">
        <div className="shrink-0" style={{ width: LABEL_W }} />
        <div className="flex flex-1 gap-[3px]">
          {monthCols.map((label, i) => (
            <div key={i} className="relative min-w-0 flex-1">
              {label && (
                <span className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] text-faint">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-2.5 flex items-stretch gap-1.5">
        <div
          className="flex shrink-0 flex-col justify-between py-[1px]"
          style={{ width: LABEL_W }}
        >
          {DAY_LABELS.map((d, i) => (
            <span key={i} className="font-mono text-[9px] leading-none text-faint">
              {d}
            </span>
          ))}
        </div>

        <div className="flex flex-1 gap-[3px]" role="img" aria-label="GitHub contribution graph">
          {weeks.map((week, wi) => {
            const slots: (typeof week.days[number] | null)[] = Array(7).fill(null);
            week.days.forEach((day) => {
              slots[new Date(day.date).getUTCDay()] = day;
            });
            return (
              <div key={wi} className="flex min-w-0 flex-1 flex-col gap-[3px]">
                {slots.map((day, di) =>
                  day ? (
                    <span
                      key={di}
                      data-testid="heatmap-cell"
                      title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                      className={`aspect-square w-full rounded-[2px] ${LEVEL_BG[day.level]}`}
                    />
                  ) : (
                    <span key={di} className="aspect-square w-full" />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-1.5 self-end pl-[26px] font-mono text-[9px] text-faint">
        <span className="ml-auto">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`h-2 w-2 rounded-[2px] ${LEVEL_BG[l]}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
