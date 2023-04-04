import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { AppWrapper } from '../App';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Theme', () => {
  it('Shwitches theme on click', async () => {
    render(<AppWrapper />);

    const themeSwitch = screen.getByRole('button');

    expect(themeSwitch.firstChild).toHaveClass('fa-sun');

    await act(async () => {
      await userEvent.click(themeSwitch);
    });

    expect(themeSwitch.firstChild).toHaveClass('fa-moon');

    await act(async () => {
      await userEvent.click(themeSwitch);
    });

    expect(themeSwitch.firstChild).toHaveClass('fa-sun');
  });
});
