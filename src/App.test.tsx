import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sarthak Sethi', () => {
  render(<App />);
  const nameElement = screen.getByText(/Sarthak Sethi/i);
  expect(nameElement).toBeInTheDocument();
});
