import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, vitest } from 'vitest';
import { act } from 'react-dom/test-utils';

import UsersPage from '../pages/UsersPage';

describe('Form', () => {
  it('birth date requirements', async () => {
    global.URL.createObjectURL = vitest.fn();
    vitest.useFakeTimers();
    localStorage.removeItem('users');
    render(<UsersPage updateLocation={() => {}} />);

    expect(screen.queryByText(/Agreed to: Share data/i)).not.toBeInTheDocument();

    const fileInput = screen.getByLabelText(/avatar:/i);
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/jpeg' })],
      },
    });

    const firstname = screen.getByPlaceholderText(/first name/i);
    fireEvent.change(firstname, { target: { value: 'Jane' } });

    const lastname = screen.getByPlaceholderText(/last name/i);
    fireEvent.change(lastname, { target: { value: 'Doe' } });

    const brainWeight = screen.getByPlaceholderText(/brain.*/i);
    fireEvent.change(brainWeight, { target: { value: '1300' } });

    const zip = screen.getByPlaceholderText(/zip/i);
    fireEvent.change(zip, { target: { value: '99204' } });

    const birthdate = screen.getByLabelText(/Birth Date:/i);
    fireEvent.change(birthdate, { target: { value: '2000-03-08' } });

    const female = screen.getByLabelText(/female/i);
    fireEvent.change(female, { target: { checked: true } });

    const dataShare = screen.getByLabelText(/.*personal data/i);
    fireEvent.change(dataShare, { target: { checked: true } });

    const flatEarth = screen.getByLabelText(/.*Earth is.*/i);
    fireEvent.change(flatEarth, { target: { checked: true } });

    const submit = screen.getByRole('button');
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.queryByText(/first name lenght.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name lenght.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Brain weight shold.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ZIP must.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/You must be at least 14 years old.*/i)).toBeNull();
    expect(screen.queryByText(/You need to choose.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/.*to agree to share your.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/.*cannot be more than 1050*/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Agreed to: Share data/i)).toBeInTheDocument();
    expect(screen.getByText(/.*Brain Weight: 1300.*/i)).toBeInTheDocument();

    expect(screen.getByText(/The user was successfully added/i)).toBeInTheDocument();
    act(() => {
      vitest.runAllTimers();
    });
    expect(screen.queryByText(/The user was successfully added/i)).not.toBeInTheDocument();

    vitest.useRealTimers();
    localStorage.removeItem('users');
  });
});

it('if no avatar selected use default image', async () => {
  localStorage.removeItem('users');
  global.URL.createObjectURL = vitest.fn();
  render(<UsersPage updateLocation={() => {}} />);

  const fileInput = screen.getByLabelText(/avatar:/i);
  fireEvent.change(fileInput, {
    target: {
      files: null,
    },
  });
  const firstname = screen.getByPlaceholderText(/first name/i);
  fireEvent.change(firstname, { target: { value: 'Jane' } });

  const lastname = screen.getByPlaceholderText(/last name/i);
  fireEvent.change(lastname, { target: { value: 'Doe' } });

  const brainWeight = screen.getByPlaceholderText(/brain.*/i);
  fireEvent.change(brainWeight, { target: { value: '1300' } });

  const zip = screen.getByPlaceholderText(/zip/i);
  fireEvent.change(zip, { target: { value: '99204' } });

  const birthdate = screen.getByLabelText(/Birth Date:/i);
  fireEvent.change(birthdate, { target: { value: '2000-03-08' } });

  const female = screen.getByLabelText(/female/i);
  fireEvent.change(female, { target: { checked: true } });

  const dataShare = screen.getByLabelText(/.*personal data/i);
  fireEvent.change(dataShare, { target: { checked: true } });

  const flatEarth = screen.getByLabelText(/.*Earth is.*/i);
  fireEvent.change(flatEarth, { target: { checked: true } });

  const submit = screen.getByRole('button');
  fireEvent(
    submit,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(screen.getByAltText(/avatar/i)).toHaveAttribute(
    'src',
    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
  );
  localStorage.removeItem('users');
});
