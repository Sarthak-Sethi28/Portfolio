import { levelFor, buildRecent, normalizeGitHub } from '../github';

describe('levelFor', () => {
  it('maps contribution counts to 0–4 buckets', () => {
    expect(levelFor(0)).toBe(0);
    expect(levelFor(1)).toBe(1);
    expect(levelFor(2)).toBe(1);
    expect(levelFor(3)).toBe(2);
    expect(levelFor(5)).toBe(2);
    expect(levelFor(6)).toBe(3);
    expect(levelFor(9)).toBe(3);
    expect(levelFor(10)).toBe(4);
    expect(levelFor(99)).toBe(4);
  });
});

describe('buildRecent', () => {
  const events = [
    {
      type: 'PushEvent',
      repo: { name: 'Sarthak-Sethi28/yardvision' },
      created_at: '2026-07-13T09:36:06Z',
      payload: {
        commits: [
          { sha: 'aaa', message: 'wip' },
          { sha: 'bbb111', message: 'feat: add pulse' },
        ],
      },
    },
    { type: 'WatchEvent', repo: { name: 'x/y' }, created_at: '2026-07-12T00:00:00Z', payload: {} },
    {
      type: 'PushEvent',
      repo: { name: 'Sarthak-Sethi28/openclaw' },
      created_at: '2026-07-11T00:00:00Z',
      payload: { commits: [{ sha: 'ccc', message: 'fix: gate' }] },
    },
  ];

  it('keeps only push events and uses the head commit', () => {
    const recent = buildRecent(events);
    expect(recent).toHaveLength(2);
    expect(recent[0]).toMatchObject({
      type: 'PushEvent',
      repo: 'Sarthak-Sethi28/yardvision',
      message: 'feat: add pulse',
      url: 'https://github.com/Sarthak-Sethi28/yardvision/commit/bbb111',
      at: '2026-07-13T09:36:06Z',
    });
  });

  it('skips push events with no commits or a commit missing a sha', () => {
    const bad = [
      { type: 'PushEvent', repo: { name: 'a/b' }, created_at: 't', payload: { commits: [] } },
      {
        type: 'PushEvent',
        repo: { name: 'a/c' },
        created_at: 't',
        payload: { commits: [{ message: 'no sha' }] },
      },
      { type: 'PushEvent', repo: {}, created_at: 't', payload: { commits: [{ sha: 'x', message: 'no repo' }] } },
    ];
    expect(buildRecent(bad)).toEqual([]);
  });

  it('caps at 5 and tolerates missing payloads', () => {
    expect(buildRecent([])).toEqual([]);
    expect(buildRecent(undefined)).toEqual([]);
    const many = Array.from({ length: 8 }, (_, i) => ({
      type: 'PushEvent',
      repo: { name: `r/${i}` },
      created_at: '2026-01-01T00:00:00Z',
      payload: { commits: [{ sha: `s${i}`, message: `m${i}` }] },
    }));
    expect(buildRecent(many)).toHaveLength(5);
  });
});

describe('normalizeGitHub', () => {
  const gql = {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 42,
          weeks: [
            {
              contributionDays: [
                { date: '2026-07-06', contributionCount: 0 },
                { date: '2026-07-07', contributionCount: 4 },
              ],
            },
            { contributionDays: [{ date: '2026-07-13', contributionCount: 12 }] },
          ],
        },
      },
      repositories: {
        totalCount: 15,
        nodes: [{ stargazerCount: 3 }, { stargazerCount: 7 }, { stargazerCount: 0 }],
      },
      followers: { totalCount: 21 },
    },
  };

  it('maps calendar, stats and levels', () => {
    const p = normalizeGitHub(gql, [], 'Sarthak-Sethi28');
    expect(p.live).toBe(true);
    expect(p.user).toBe('Sarthak-Sethi28');
    expect(p.stats).toEqual({ publicRepos: 15, followers: 21, totalStars: 10 });
    expect(p.contributions.total).toBe(42);
    expect(p.contributions.weeks).toHaveLength(2);
    expect(p.contributions.weeks[0].days[0]).toEqual({ date: '2026-07-06', count: 0, level: 0 });
    expect(p.contributions.weeks[0].days[1].level).toBe(2); // 4 -> 2
    expect(p.contributions.weeks[1].days[0].level).toBe(4); // 12 -> 4
    expect(typeof p.generatedAt).toBe('string');
    expect(Number.isNaN(Date.parse(p.generatedAt))).toBe(false);
  });

  it('does not throw on empty/missing data', () => {
    const p = normalizeGitHub({}, undefined, 'nobody');
    expect(p.stats).toEqual({ publicRepos: 0, followers: 0, totalStars: 0 });
    expect(p.contributions).toEqual({ total: 0, weeks: [] });
    expect(p.recent).toEqual([]);
    expect(p.live).toBe(true);
  });
});
