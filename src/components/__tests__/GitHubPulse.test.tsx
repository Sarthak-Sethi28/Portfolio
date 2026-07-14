import { render, screen } from '@testing-library/react';
import GitHubPulse from '../GitHubPulse';
import { useGitHubPulse } from '../../hooks/useGitHubPulse';
import { Pulse } from '../../data/types';

jest.mock('../../hooks/useGitHubPulse');
const mockHook = useGitHubPulse as jest.MockedFunction<typeof useGitHubPulse>;

const basePulse: Pulse = {
  generatedAt: '2026-07-14T00:00:00.000Z',
  live: true,
  user: 'Sarthak-Sethi28',
  stats: { publicRepos: 15, followers: 21, totalStars: 34 },
  contributions: {
    total: 8,
    weeks: [
      { days: [{ date: '2026-07-05', count: 1, level: 1 }, { date: '2026-07-06', count: 0, level: 0 }] },
      { days: [{ date: '2026-07-13', count: 7, level: 3 }] },
    ],
  },
  recent: [],
};

afterEach(() => jest.clearAllMocks());

test('shows a skeleton while loading', () => {
  mockHook.mockReturnValue({ pulse: null, loading: true });
  render(<GitHubPulse />);
  expect(screen.getByTestId('pulse-skeleton')).toBeInTheDocument();
});

test('renders live data: dot, stats, one cell per contribution day', () => {
  mockHook.mockReturnValue({ pulse: basePulse, loading: false });
  render(<GitHubPulse />);

  expect(screen.getByTestId('live-dot')).toBeInTheDocument();
  expect(screen.getByText('34')).toBeInTheDocument(); // stars
  expect(screen.getByText(/8 contributions/)).toBeInTheDocument();

  const totalDays = basePulse.contributions.weeks.reduce((n, w) => n + w.days.length, 0);
  expect(screen.getAllByTestId('heatmap-cell')).toHaveLength(totalDays);
});

test('hides the live dot when serving fallback data', () => {
  mockHook.mockReturnValue({ pulse: { ...basePulse, live: false }, loading: false });
  render(<GitHubPulse />);
  expect(screen.queryByTestId('live-dot')).not.toBeInTheDocument();
});
