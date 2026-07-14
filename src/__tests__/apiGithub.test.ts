import handler from '../../api/github';

// Minimal Vercel res stub capturing what the handler sets.
function mockRes() {
  const res: {
    statusCode: number;
    headers: Record<string, string>;
    body: unknown;
    setHeader: (k: string, v: string) => void;
    status: (c: number) => typeof res;
    json: (b: unknown) => typeof res;
  } = {
    statusCode: 0,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(b) {
      this.body = b;
      return this;
    },
  };
  return res;
}

const gqlUserData = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 3,
          weeks: [{ contributionDays: [{ date: '2026-07-14', contributionCount: 3 }] }],
        },
      },
      repositories: { totalCount: 5, nodes: [{ stargazerCount: 2 }] },
      followers: { totalCount: 9 },
    },
  },
};

const OLD_ENV = process.env;
afterEach(() => {
  process.env = OLD_ENV;
  jest.restoreAllMocks();
});

function callHandler() {
  const res = mockRes();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return handler({} as any, res as any).then(() => res);
}

test('serves fallback with live:false when no token is set', async () => {
  process.env = { ...OLD_ENV, GITHUB_TOKEN: '' };
  const res = await callHandler();
  expect(res.statusCode).toBe(200);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).live).toBe(false);
});

test('returns live pulse + long cache header on success', async () => {
  process.env = { ...OLD_ENV, GITHUB_TOKEN: 'tok' };
  global.fetch = jest.fn((url: string) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(String(url).includes('graphql') ? gqlUserData : []),
    })
  ) as unknown as typeof fetch;

  const res = await callHandler();
  expect(res.statusCode).toBe(200);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).live).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).stats.followers).toBe(9);
  expect(res.headers['Cache-Control']).toContain('s-maxage=3600');
});

test('falls back when GraphQL responds non-ok', async () => {
  process.env = { ...OLD_ENV, GITHUB_TOKEN: 'tok' };
  global.fetch = jest.fn((url: string) =>
    Promise.resolve({ ok: !String(url).includes('graphql'), json: () => Promise.resolve([]) })
  ) as unknown as typeof fetch;

  const res = await callHandler();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).live).toBe(false);
});

test('falls back when GraphQL returns errors', async () => {
  process.env = { ...OLD_ENV, GITHUB_TOKEN: 'tok' };
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ errors: [{ message: 'bad' }] }) })
  ) as unknown as typeof fetch;

  const res = await callHandler();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).live).toBe(false);
});

test('keeps a valid GraphQL result even if the events fetch rejects', async () => {
  process.env = { ...OLD_ENV, GITHUB_TOKEN: 'tok' };
  global.fetch = jest.fn((url: string) =>
    String(url).includes('graphql')
      ? Promise.resolve({ ok: true, json: () => Promise.resolve(gqlUserData) })
      : Promise.reject(new Error('events down'))
  ) as unknown as typeof fetch;

  const res = await callHandler();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).live).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect((res.body as any).recent).toEqual([]);
});
