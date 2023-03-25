import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { assert, describe, it } from 'vitest';
import { MemoryRouter } from 'react-router';

import { App, AppWrapper } from '../App';
import Card from '../components/Card';
import cards from '../assets/card.json';
import Main from '../pages/Main';

describe('App', () => {
  it('Renders page desc', () => {
    render(<AppWrapper />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Usefull resources to work with Web development'
    );
  });

  it('checks if card data parses correctly', () => {
    const data = {
      icon: 'react.svg',
      title: 'REACT',
      desc: 'The library for web and native user interfaces',
      link: 'https://react.dev/',
      likes: 100,
      views: 5,
    };

    render(<Card {...data} />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(data.title);
    expect(screen.getByRole('img')).toBeDefined();
    expect(screen.getByRole('link')).toHaveAttribute('href', data.link);
    expect(screen.getByRole('definition')).toHaveTextContent(data.desc);
  });

  it('checks if like button works on a card', () => {
    const data = { icon: '', title: '', desc: '', link: '', likes: 100, views: 0 };
    render(<Card {...data} />);

    const likes = screen.getByTestId('card-likes');
    expect(likes).toHaveTextContent('100');
    fireEvent(
      likes,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(likes).toHaveTextContent('101');
  });

  it('render the list of all cards', () => {
    render(<Main updateLocation={() => {}} />);
    const cardElements = screen.getAllByTestId('card');

    expect(cardElements).toHaveLength(cards.cards.length);
    cardElements.map((card) => expect(card).toHaveClass('card'));
  });

  it('Render Oops page not found on invalid path', () => {
    render(
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
    render(
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
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

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
