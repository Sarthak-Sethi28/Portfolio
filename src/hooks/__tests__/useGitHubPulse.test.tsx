import { renderHook, waitFor } from '@testing-library/react';
import { useGitHubPulse } from '../useGitHubPulse';
import { Pulse } from '../../data/types';

const livePulse: Pulse = {
  generatedAt: '2026-07-14T00:00:00.000Z',
  live: true,
  user: 'Sarthak-Sethi28',
  stats: { publicRepos: 15, followers: 21, totalStars: 34 },
  contributions: { total: 5, weeks: [{ days: [{ date: '2026-07-14', count: 5, level: 2 }] }] },
  recent: [],
};

afterEach(() => {
  jest.restoreAllMocks();
});

test('uses live data when the endpoint responds ok', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(livePulse),
  }) as unknown as typeof fetch;

  const { result } = renderHook(() => useGitHubPulse());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.pulse?.live).toBe(true);
  expect(result.current.pulse?.stats.totalStars).toBe(34);
});

test('falls back to the committed snapshot on error', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('network')) as unknown as typeof fetch;

  const { result } = renderHook(() => useGitHubPulse());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.pulse).not.toBeNull();
  expect(result.current.pulse?.live).toBe(false);
  expect(result.current.pulse?.contributions.weeks.length).toBeGreaterThan(0);
});

test('falls back when the endpoint returns non-ok', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 }) as unknown as typeof fetch;

  const { result } = renderHook(() => useGitHubPulse());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.pulse?.live).toBe(false);
});
