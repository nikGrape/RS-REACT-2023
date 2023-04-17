import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

import { AppWrapper } from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  it('Renders page desc', async () => {
    render(<AppWrapper />);

    await act(async () => {
      await userEvent.click(screen.getByText('Users'));
    });

    expect(screen.getByText(/sign up a new user/i)).toBeInTheDocument();
  });
});
