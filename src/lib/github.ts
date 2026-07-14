import { Pulse, PulseDay, PulseWeek } from '../data/types';

/** Clamp any contribution count to a 0–4 intensity bucket. */
export function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

interface RawDay {
  date: string;
  count: number;
  level?: number;
}

/** Group a flat, date-sorted day list into GitHub-style weeks (new week each Sunday). */
export function groupWeeks(days: RawDay[]): PulseWeek[] {
  const weeks: PulseWeek[] = [];
  let current: PulseDay[] = [];
  for (const d of days) {
    const dow = new Date(d.date).getUTCDay();
    if (dow === 0 && current.length) {
      weeks.push({ days: current });
      current = [];
    }
    const count = Number(d.count ?? 0);
    current.push({ date: d.date, count, level: levelFor(count) });
  }
  if (current.length) weeks.push({ days: current });
  return weeks;
}

interface RawContrib {
  total?: Record<string, number>;
  contributions?: RawDay[];
}

/** Normalize the public contribution API + basic stats into a Pulse. Pure/testable. */
export function normalizePublic(
  contrib: RawContrib,
  stats: { publicRepos: number; followers: number; totalStars: number },
  user: string
): Pulse {
  const days = Array.isArray(contrib?.contributions) ? contrib.contributions : [];
  const weeks = groupWeeks(days);
  const total =
    contrib?.total?.lastYear ??
    days.reduce((sum, d) => sum + Number(d.count ?? 0), 0);

  return {
    generatedAt: new Date().toISOString(),
    live: true,
    user,
    stats,
    contributions: { total, weeks },
    recent: [],
  };
}

/**
 * Fetch a live Pulse from PUBLIC GitHub data — no token required.
 * Contribution calendar via github-contributions-api; repo/star/follower
 * counts via the unauthenticated GitHub REST API (best-effort).
 */
export async function fetchPulse(user: string): Promise<Pulse> {
  const contribRes = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${user}?y=last`
  );
  if (!contribRes.ok) throw new Error(`contributions HTTP ${contribRes.status}`);
  const contrib = (await contribRes.json()) as RawContrib;

  const stats = { publicRepos: 0, followers: 0, totalStars: 0 };
  try {
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed`),
    ]);
    if (uRes.ok) {
      const u = await uRes.json();
      stats.publicRepos = Number(u.public_repos ?? 0);
      stats.followers = Number(u.followers ?? 0);
    }
    if (rRes.ok) {
      const repos = await rRes.json();
      if (Array.isArray(repos)) {
        stats.totalStars = repos.reduce(
          (s: number, r: { stargazers_count?: number }) => s + Number(r.stargazers_count ?? 0),
          0
        );
      }
    }
  } catch {
    // stats stay at 0 — the calendar is the important part
  }

  return normalizePublic(contrib, stats, user);
}
