// 第一种【React Testing Library】写法
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { swapJestListen } from 'rocket-swap';
swapJestListen();

test('renders learn react link', async () => {
  render(<App />);
  const userElement = screen.getByText(/unknown/i);
  const codeElement = screen.getByText(/0/i);
  expect(userElement).toBeInTheDocument();
  expect(codeElement).toBeInTheDocument();

  await waitFor(async () => {
    const nextCodeElement = screen.getByText(/202/i);
    const nextUserElement = screen.getByText(/Lazada/i);
    expect(nextCodeElement).toBeInTheDocument();
    expect(nextUserElement).toBeInTheDocument();
  });
});
