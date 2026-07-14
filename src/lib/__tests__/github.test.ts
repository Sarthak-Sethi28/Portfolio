import { levelFor, groupWeeks, normalizePublic, fetchPulse } from '../github';

describe('levelFor', () => {
  it('maps contribution counts to 0–4 buckets', () => {
    expect(levelFor(0)).toBe(0);
    expect(levelFor(2)).toBe(1);
    expect(levelFor(5)).toBe(2);
    expect(levelFor(9)).toBe(3);
    expect(levelFor(10)).toBe(4);
    expect(levelFor(99)).toBe(4);
  });
});

describe('groupWeeks', () => {
  it('starts a new week on Sunday and assigns levels', () => {
    // 2026-01-04 is a Sunday
    const days = [
      { date: '2026-01-02', count: 1 }, // Fri
      { date: '2026-01-03', count: 0 }, // Sat
      { date: '2026-01-04', count: 12 }, // Sun -> new week
      { date: '2026-01-05', count: 4 }, // Mon
    ];
    const weeks = groupWeeks(days);
    expect(weeks).toHaveLength(2);
    expect(weeks[0].days.map((d) => d.date)).toEqual(['2026-01-02', '2026-01-03']);
    expect(weeks[1].days.map((d) => d.date)).toEqual(['2026-01-04', '2026-01-05']);
    expect(weeks[1].days[0].level).toBe(4); // 12 -> 4
    expect(weeks[1].days[1].level).toBe(2); // 4 -> 2
  });

  it('handles an empty list', () => {
    expect(groupWeeks([])).toEqual([]);
  });
});

describe('normalizePublic', () => {
  const stats = { publicRepos: 15, followers: 21, totalStars: 34 };

  it('uses lastYear total and passes stats through, live=true', () => {
    const p = normalizePublic(
      { total: { lastYear: 1331 }, contributions: [{ date: '2026-01-04', count: 3 }] },
      stats,
      'Sarthak-Sethi28'
    );
    expect(p.live).toBe(true);
    expect(p.user).toBe('Sarthak-Sethi28');
    expect(p.stats).toEqual(stats);
    expect(p.contributions.total).toBe(1331);
    expect(p.contributions.weeks).toHaveLength(1);
  });

  it('falls back to summing counts when no lastYear total', () => {
    const p = normalizePublic(
      { contributions: [{ date: '2026-01-04', count: 3 }, { date: '2026-01-05', count: 4 }] },
      stats,
      'x'
    );
    expect(p.contributions.total).toBe(7);
  });

  it('does not throw on empty/missing data', () => {
    const p = normalizePublic({}, { publicRepos: 0, followers: 0, totalStars: 0 }, 'x');
    expect(p.contributions).toEqual({ total: 0, weeks: [] });
  });
});

describe('fetchPulse', () => {
  afterEach(() => jest.restoreAllMocks());

  it('assembles a live pulse from public endpoints', async () => {
    global.fetch = jest.fn((url: string) => {
      const u = String(url);
      if (u.includes('jogruber'))
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ total: { lastYear: 5 }, contributions: [{ date: '2026-01-04', count: 5 }] }),
        });
      if (u.includes('/repos'))
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ stargazers_count: 30 }, { stargazers_count: 4 }]),
        });
      if (u.includes('/users/'))
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ public_repos: 15, followers: 21 }) });
      return Promise.resolve({ ok: false });
    }) as unknown as typeof fetch;

    const p = await fetchPulse('Sarthak-Sethi28');
    expect(p.live).toBe(true);
    expect(p.stats).toEqual({ publicRepos: 15, followers: 21, totalStars: 34 });
    expect(p.contributions.total).toBe(5);
  });

  it('rejects when the contribution API fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500 })) as unknown as typeof fetch;
    await expect(fetchPulse('x')).rejects.toThrow();
  });
});
