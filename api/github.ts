import type { VercelRequest, VercelResponse } from '@vercel/node';
import { graphqlQuery, normalizeGitHub } from '../src/lib/github';
import fallback from '../src/data/github-fallback.json';

const USER = 'Sarthak-Sethi28';

function sendFallback(res: VercelResponse) {
  // Short cache so a transient GitHub outage doesn't pin the stale snapshot.
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.status(200).json({ ...fallback, live: false });
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return sendFallback(res);

  try {
    const [gqlRes, eventsRes] = await Promise.all([
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': USER,
        },
        body: JSON.stringify({ query: graphqlQuery(USER) }),
      }),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, {
        headers: {
          Authorization: `bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': USER,
        },
      }),
    ]);

    if (!gqlRes.ok) return sendFallback(res);

    const gqlJson = await gqlRes.json();
    if (gqlJson.errors || !gqlJson.data?.user) return sendFallback(res);

    const events = eventsRes.ok ? await eventsRes.json() : [];
    const pulse = normalizeGitHub(gqlJson.data, events, USER);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(pulse);
  } catch {
    return sendFallback(res);
  }
}
