import { useEffect, useState } from 'react';
import { Pulse } from '../data/types';
import fallbackJson from '../data/github-fallback.json';

const fallback = fallbackJson as Pulse;

export function useGitHubPulse(): { pulse: Pulse | null; loading: boolean } {
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/github')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Pulse) => {
        if (!cancelled) setPulse(data);
      })
      .catch(() => {
        // Offline, local `npm start` (no /api), or endpoint error → committed snapshot.
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
