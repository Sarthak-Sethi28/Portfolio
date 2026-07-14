import React from 'react';
import { GitCommit, Star, Users, FolderGit2 } from 'lucide-react';
import { useGitHubPulse } from '../hooks/useGitHubPulse';
import ContributionHeatmap from './ContributionHeatmap';
import { profile } from '../data/profile';

function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const day = 86_400_000;
  if (diff < day) return 'today';
  const days = Math.round(diff / day);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.round(days / 30)}mo ago`;
}

const Stat: React.FC<{ icon: React.ReactNode; value: number; label: string }> = ({
  icon,
  value,
  label,
}) => (
  <div className="flex items-center gap-1.5">
    <span className="text-accent-hi">{icon}</span>
    <span className="font-mono text-sm text-ink">{value}</span>
    <span className="text-xs text-faint">{label}</span>
  </div>
);

const GitHubPulse: React.FC = () => {
  const { pulse, loading } = useGitHubPulse();

  if (loading || !pulse) {
    return (
      <section aria-label="GitHub activity" className="card p-5">
        <div className="section-label mb-4">GitHub · loading</div>
        <div data-testid="pulse-skeleton" className="animate-pulse space-y-3">
          <div className="h-4 w-32 rounded bg-surface-2" />
          <div className="h-20 w-full rounded bg-surface-2" />
          <div className="h-3 w-3/4 rounded bg-surface-2" />
          <div className="h-3 w-2/3 rounded bg-surface-2" />
        </div>
      </section>
    );
  }

  return (
    <section aria-label="GitHub activity" className="card flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className="section-label">GitHub</span>
        {pulse.live && (
          <span className="flex items-center gap-1.5">
            <span
              data-testid="live-dot"
              className="h-2 w-2 rounded-full bg-accent animate-live-pulse"
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent-hi">
              live
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Stat icon={<FolderGit2 size={14} />} value={pulse.stats.publicRepos} label="repos" />
        <Stat icon={<Star size={14} />} value={pulse.stats.totalStars} label="stars" />
        <Stat icon={<Users size={14} />} value={pulse.stats.followers} label="followers" />
      </div>

      <div>
        <div className="mb-2 font-mono text-[11px] text-faint">
          {pulse.contributions.total} contributions · last 6 months
        </div>
        <ContributionHeatmap weeks={pulse.contributions.weeks} />
      </div>

      {pulse.recent.length > 0 && (
        <ul className="flex flex-col gap-2 border-t border-line pt-3">
          {pulse.recent.slice(0, 4).map((e) => (
            <li key={e.url} className="flex items-start gap-2 text-xs">
              <GitCommit size={13} className="mt-0.5 shrink-0 text-faint" />
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 truncate text-muted hover:text-accent-hi"
                title={`${e.repo}: ${e.message}`}
              >
                <span className="text-faint">{e.repo.split('/')[1] ?? e.repo}</span>{' '}
                {e.message}
              </a>
              <span className="shrink-0 font-mono text-[10px] text-faint">
                {relativeTime(e.at)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <a
        href={profile.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto font-mono text-[11px] text-faint hover:text-accent-hi"
      >
        @{profile.github} ↗
      </a>
    </section>
  );
};

export default GitHubPulse;
