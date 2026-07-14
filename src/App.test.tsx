import { render, screen } from '@testing-library/react';
import App from './App';

// The 3D hero uses WebGL, which jsdom can't run — stub it for DOM tests.
jest.mock('./components/Hero3D', () => ({ __esModule: true, default: () => null }));

beforeAll(() => {
  // minimal fetch stub for jsdom; the Pulse falls back to its snapshot on rejection
  global.fetch = () => Promise.reject(new Error('no network'));
});

test('renders the name heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Sarthak Sethi/i })).toBeInTheDocument();
});
