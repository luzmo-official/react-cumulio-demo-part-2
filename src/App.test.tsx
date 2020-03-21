import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders my website', () => {
  const { getByText } = render(<App />);
  const element = getByText(/My Website/i);
  expect(element).toBeInTheDocument();
});
