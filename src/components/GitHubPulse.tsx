import React from 'react';
import { useGitHubPulse } from '../hooks/useGitHubPulse';
import ContributionHeatmap from './ContributionHeatmap';
import { profile } from '../data/profile';

const GitHubPulse: React.FC = () => {
  const { pulse, loading } = useGitHubPulse();

  return (
    <section aria-label="GitHub activity" className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="section-label">GitHub</span>
          {pulse?.live && (
            <span className="flex items-center gap-1.5">
              <span data-testid="live-dot" className="h-2 w-2 rounded-full bg-accent animate-live-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-hi">live</span>
            </span>
          )}
        </div>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-faint hover:text-accent-hi"
        >
          @{profile.github} ↗
        </a>
      </div>

      {loading || !pulse ? (
        <div data-testid="pulse-skeleton" className="h-28 w-full animate-pulse rounded-lg bg-surface-2" />
      ) : (
        <>
          <div className="mb-4 font-mono text-[11px] text-faint">
            {pulse.contributions.total} contributions · past year
          </div>
          <ContributionHeatmap weeks={pulse.contributions.weeks} />
        </>
      )}
    </section>
  );
};

export default GitHubPulse;
