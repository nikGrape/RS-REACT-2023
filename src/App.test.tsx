import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { assert, describe, it } from 'vitest';
import { MemoryRouter } from 'react-router';

import { App, AppWrapper } from './App';

describe('App', () => {
  it('Renders RS School 2023', () => {
    render(<AppWrapper />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('RS School 2023');
  });
  it('Render Oops page not found on invalid path', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/banana']}>
        <App />
      </MemoryRouter>
    );
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('404');
    expect(screen.getByTestId('page-not-found')).toHaveTextContent('page not found');
  });
  it('Render main page name in header', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Main');
  });
  it('Render about page name in header', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('About Us');
  });
  it('search bar retrieves value from localStorage', () => {
    // ARRANGE
    localStorage.setItem('search', 'Hello world');
    render(<AppWrapper />);
    // EXPECT
    expect(screen.getByRole('textbox')).toHaveValue('Hello world');
  });

  it('search bar saves value to localStorage', () => {
    // ARRANGE
    const { unmount } = render(<AppWrapper />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'The eternal sun shines on all of us equally' },
    });
    unmount();
    // EXPECT
    assert(
      localStorage.getItem('search') == 'The eternal sun shines on all of us equally',
      `value do not match`
    );
  });
});
