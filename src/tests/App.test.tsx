import React from 'react';
import { MemoryRouter } from 'react-router';
import { describe, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import axios from 'axios';

import { App, AppWrapper } from '../App';
import characters from '../assets/characters.json';
import { renderWithRedux } from './util';

vi.mock('axios');
const get = axios.get as jest.MockedFunction<typeof axios.get>;
get.mockImplementation(() => Promise.resolve({ data: { ...characters } }));

describe('App', () => {
  it('Renders page desc', () => {
    renderWithRedux(<AppWrapper />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Rick and Morty');
  });

  it('Render Oops page not found on invalid path', () => {
    renderWithRedux(
      <MemoryRouter initialEntries={['/banana']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('404');
    expect(screen.getByTestId('page-not-found')).toHaveTextContent('page not found');
  });

  it('Render main page name in header', () => {
    renderWithRedux(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Main');
  });

  it("Render About Us page's name in header", () => {
    renderWithRedux(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    const p = screen.getByText(/Everything you can do with React!.*/i);
    expect(p).toBeInTheDocument();
  });
});
