import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { MiniCard } from '../components/MiniCard';
const data = {
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Lab', url: '' },
  image: 'image.img',
  episode: ['1', '2'],
};

describe('MiniCard', () => {
  it('checks if card data parses correctly', () => {
    const showModalCard = vi.fn();

    render(<MiniCard {...data} showModalCard={showModalCard} />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(data.name);
    expect(screen.getByRole('img')).toBeDefined();
  });

  it('checks if like button works on a card', async () => {
    const showModalCard = vi.fn();
    render(<MiniCard {...data} showModalCard={showModalCard} />);

    const likes = screen.getByTestId('card-likes');
    expect(likes).toHaveTextContent('0');
    await act(async () => {
      await userEvent.click(likes);
    });
    await act(async () => {
      await userEvent.click(likes);
    });
    expect(likes).toHaveTextContent('2');

    await act(async () => {
      await userEvent.click(likes);
    });
  });

  it('shows modal window', async () => {
    const showModalCard = vi.fn();
    const { container } = render(<MiniCard {...data} showModalCard={showModalCard} />);

    await act(async () => {
      await userEvent.click(container.firstChild as Element);
    });

    expect(showModalCard).toHaveBeenCalledTimes(1);
  });
});
