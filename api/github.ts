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
    // Run both concurrently but independently: a failing events fetch must not
    // discard a good GraphQL result (the recent-commits list is optional).
    const [gqlSettled, eventsSettled] = await Promise.allSettled([
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

    if (gqlSettled.status !== 'fulfilled' || !gqlSettled.value.ok) return sendFallback(res);

    const gqlJson = await gqlSettled.value.json();
    if (gqlJson.errors || !gqlJson.data?.user) return sendFallback(res);

    let events: unknown[] = [];
    if (eventsSettled.status === 'fulfilled' && eventsSettled.value.ok) {
      try {
        events = await eventsSettled.value.json();
      } catch {
        events = [];
      }
    }

    const pulse = normalizeGitHub(gqlJson.data, events as never, USER);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(pulse);
  } catch {
    return sendFallback(res);
  }
}
