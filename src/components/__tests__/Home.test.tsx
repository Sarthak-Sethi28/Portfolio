import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { projects } from '../../data/projects';

// The hero renders a <video>; stub it for DOM tests.
jest.mock('../../components/HeroBackground', () => ({
  __esModule: true,
  default: () => null,
}));

// jsdom has no clipboard/fetch; the page should still render fully.
beforeAll(() => {
  // minimal fetch stub for jsdom; the Pulse falls back to its snapshot on rejection
  global.fetch = () => Promise.reject(new Error('no network'));
});

test('renders the name and all three section labels', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { level: 1, name: /Sarthak Sethi/i })).toBeInTheDocument();
  expect(screen.getByText('Experience')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  // GitHub Pulse section is present (label may read "GitHub" or "GitHub · loading")
  expect(screen.getByLabelText('GitHub activity')).toBeInTheDocument();
});

test('renders one card per selected project', () => {
  render(<Home />);
  for (const p of projects) {
    expect(screen.getByRole('heading', { level: 3, name: new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
  }
});
