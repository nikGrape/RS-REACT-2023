import { fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import UsersPage from '../pages/Users';

describe('Form', () => {
  it('error message of ivalid first name', async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<UsersPage></UsersPage>);

    await act(async () => {
      await userEvent.type(getByPlaceholderText(/first name/i), 'olivia');
    });

    await act(async () => {
      await userEvent.click(getByRole('button'));
    });

    expect(getByText('should start with a capital letter')).toBeInTheDocument();
  });

  it('card color error handling and selection', async () => {
    const { queryByText, getByRole, getByText } = render(<UsersPage></UsersPage>);

    await act(async () => {
      await userEvent.click(getByRole('button'));
    });

    expect(getByText(/Choose a card color/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.selectOptions(getByRole('combobox'), 'Blue');
    });

    expect((getByText('Blue') as HTMLOptionElement).selected).toBeTruthy();
    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(queryByText(/Choose a card color/i)).not.toBeInTheDocument();
  });

  it('card creation (female), succes message', async () => {
    global.URL.createObjectURL = vi.fn();
    const { queryByText, getByRole, getByText, getByPlaceholderText, getByLabelText } = render(
      <UsersPage></UsersPage>
    );

    await act(async () => {
      await userEvent.type(getByPlaceholderText(/first name/i), 'Jane');
      await userEvent.type(getByPlaceholderText(/last name/i), 'Doe');
      await userEvent.type(getByPlaceholderText(/brain.*/i), '1300');
      await userEvent.type(getByPlaceholderText(/zip/i), '99204');
      await userEvent.type(getByLabelText(/Birth Date:/i), '2000-03-08');
      await userEvent.click(getByLabelText(/female/i));
      await userEvent.type(getByPlaceholderText(/.*bio/i), 'I am a very cool man');
      await userEvent.click(getByLabelText(/.*policy/i));
      await userEvent.click(getByLabelText(/.*personal data/i));
      await userEvent.selectOptions(getByRole('combobox'), 'Blue');
      await userEvent.upload(getByLabelText(/avatar:/i), [
        new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/jpeg' }),
      ]);
    });

    vi.useFakeTimers();

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(getByText(/The user was successfully added/i)).toBeInTheDocument();
    expect(getByText(/.*Brain Weight: 1300.*/i)).toBeInTheDocument();

    act(() => {
      vi.runAllTimers();
    });
    expect(queryByText(/The user was successfully added/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
