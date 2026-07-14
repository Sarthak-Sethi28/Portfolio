import { Pulse, PulseEvent, PulseWeek } from '../data/types';

/** GraphQL query for the contribution calendar, repo/star counts and followers. */
export const graphqlQuery = (login: string) => `
  query {
    user(login: "${login}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount
        nodes { stargazerCount }
      }
      followers { totalCount }
    }
  }
`;

/** Map a raw contribution count to a 0–4 intensity bucket. */
export function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

interface RawCommit {
  sha?: string;
  message?: string;
}
interface RawEvent {
  type?: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: { commits?: RawCommit[] };
}

/** Turn public REST events into up to 5 recent push entries (head commit each). */
export function buildRecent(events: RawEvent[] | undefined | null): PulseEvent[] {
  if (!Array.isArray(events)) return [];
  const out: PulseEvent[] = [];
  for (const e of events) {
    if (e?.type !== 'PushEvent') continue;
    const commits = e.payload?.commits;
    if (!commits || commits.length === 0) continue;
    const head = commits[commits.length - 1];
    const repo = e.repo?.name ?? '';
    if (!repo || !head?.sha) continue;
    out.push({
      type: 'PushEvent',
      repo,
      message: head.message ?? '',
      url: `https://github.com/${repo}/commit/${head.sha}`,
      at: e.created_at ?? '',
    });
    if (out.length === 5) break;
  }
  return out;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeGitHub(
  gql: any,
  events: RawEvent[] | undefined | null,
  user: string
): Pulse {
  const u = gql?.user ?? {};
  const calendar = u?.contributionsCollection?.contributionCalendar ?? {};
  const rawWeeks: any[] = Array.isArray(calendar.weeks) ? calendar.weeks : [];

  const weeks: PulseWeek[] = rawWeeks.map((w) => ({
    days: (Array.isArray(w?.contributionDays) ? w.contributionDays : []).map((d: any) => {
      const count = Number(d?.contributionCount ?? 0);
      return { date: String(d?.date ?? ''), count, level: levelFor(count) };
    }),
  }));

  // Stars are summed over the top-100 most-starred repos (query is ordered by
  // STARGAZERS desc); stars beyond that are negligible in practice.
  const repoNodes: any[] = Array.isArray(u?.repositories?.nodes) ? u.repositories.nodes : [];
  const totalStars = repoNodes.reduce((sum, r) => sum + Number(r?.stargazerCount ?? 0), 0);

  return {
    generatedAt: new Date().toISOString(),
    live: true,
    user,
    stats: {
      publicRepos: Number(u?.repositories?.totalCount ?? 0),
      followers: Number(u?.followers?.totalCount ?? 0),
      totalStars,
    },
    contributions: {
      total: Number(calendar.totalContributions ?? 0),
      weeks,
    },
    recent: buildRecent(events),
  };
}
