import { useEffect, useState } from 'react';
import { Pulse } from '../data/types';
import { fetchPulse } from '../lib/github';
import { profile } from '../data/profile';
import fallbackJson from '../data/github-fallback.json';

const fallback = fallbackJson as Pulse;

export function useGitHubPulse(): { pulse: Pulse | null; loading: boolean } {
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchPulse(profile.github)
      .then((data) => {
        if (!cancelled) setPulse(data);
      })
      .catch(() => {
        // Offline or the public APIs are unreachable → committed snapshot.
        if (!cancelled) setPulse({ ...fallback, live: false });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pulse, loading };
}
