import { render, screen, act } from '@testing-library/react';
import { ModalCard } from '../components/ModalCard';
import React from 'react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const data = {
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Lab', url: '' },
  image: 'image.img',
  episode: ['1', '2', 'to test error handling'],
};

describe('Hint', () => {
  it('hint close button and click outside works', async () => {
    const hideModalCard = vi.fn();
    render(<ModalCard hideModalCard={hideModalCard} {...data} />);

    const cross = screen.getByRole('button');
    const blur = screen.getByTestId('blur-window');

    await act(async () => {
      await userEvent.click(cross);
    });

    expect(hideModalCard).toBeCalledTimes(1);

    await act(async () => {
      await userEvent.click(blur);
    });

    expect(hideModalCard).toBeCalledTimes(2);
  });
});
