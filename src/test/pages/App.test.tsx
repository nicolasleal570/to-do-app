/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Render App without crash', () => {
  render(<App />);
  const linkElement = screen.getByText(/HOME PAGE/i);
  expect(linkElement).toBeInTheDocument();
});
