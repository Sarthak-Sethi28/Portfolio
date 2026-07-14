import { renderHook, waitFor } from '@testing-library/react';
import { useGitHubPulse } from '../useGitHubPulse';

afterEach(() => jest.restoreAllMocks());

test('uses live public data when the APIs respond', async () => {
  global.fetch = jest.fn((url: string) => {
    const u = String(url);
    if (u.includes('jogruber'))
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ total: { lastYear: 42 }, contributions: [{ date: '2026-01-04', count: 3 }] }),
      });
    if (u.includes('/repos'))
      return Promise.resolve({ ok: true, json: () => Promise.resolve([{ stargazers_count: 34 }]) });
    if (u.includes('/users/'))
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ public_repos: 15, followers: 21 }) });
    return Promise.resolve({ ok: false });
  }) as unknown as typeof fetch;

  const { result } = renderHook(() => useGitHubPulse());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.pulse?.live).toBe(true);
  expect(result.current.pulse?.contributions.total).toBe(42);
});

test('falls back to the committed snapshot when the APIs fail', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('offline'))) as unknown as typeof fetch;

  const { result } = renderHook(() => useGitHubPulse());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.pulse).not.toBeNull();
  expect(result.current.pulse?.live).toBe(false);
  expect(result.current.pulse?.contributions.weeks.length).toBeGreaterThan(0);
});
