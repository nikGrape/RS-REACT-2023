import { render, screen, act } from '@testing-library/react';
import { Hint } from '../components/Hint';
import React from 'react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Hint', () => {
  it('hint close button and click outside works', async () => {
    const closeHint = vi.fn();
    render(<Hint closeHint={closeHint} messages={['hello', 'world']} />);

    const cross = screen.getByRole('button');
    const blur = screen.getByTestId('blur-window');

    await act(async () => {
      await userEvent.click(cross);
    });

    expect(closeHint).toBeCalledTimes(1);

    await act(async () => {
      await userEvent.click(blur);
    });

    expect(closeHint).toBeCalledTimes(2);
  });
});
