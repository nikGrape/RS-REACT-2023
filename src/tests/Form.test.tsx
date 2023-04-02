import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';
import Users from '../pages/Users';

describe('Form', () => {
  it('birth date requirements', async () => {
    render(<Form addUser={() => {}} />);
    const birthdate = screen.getByLabelText(/Birth Date:/i);
    await fireEvent.change(birthdate, { target: { value: '2020-03-08' } });

    const submit = screen.getByRole('button');
    await userEvent.click(submit);

    await expect(
      screen.queryByText(/.*user has to be at least 14 years old.*/i)
    ).toBeInTheDocument();

    await fireEvent.change(birthdate, { target: { value: '2000-03-08' } });

    await userEvent.click(submit);
    await expect(screen.queryByText(/User has to be at least 14 years old.*/i)).toBeNull();
  });

  it('First name requirements', async () => {
    render(<Users />);
    expect(screen.queryByText(/should start with a capital letter.*/i)).toBeNull();

    const nameInput = screen.getByPlaceholderText(/First Name/i);
    await fireEvent.change(nameInput, { target: { value: 'olivia' } });

    const submit = screen.getByRole('button');
    await userEvent.click(submit);

    console.log('submit', submit.innerHTML);
    expect(await screen.findByText(/should start with a capital letter.*/i)).toBeInTheDocument();

    await fireEvent.change(nameInput, { target: { value: 'Olivia' } });

    await userEvent.click(submit);
    await expect(screen.queryByText(/should start with a capital letter.*/i)).toBeNull();
  });

  it('other form errors', async () => {
    render(<Form addUser={() => {}} />);

    expect(screen.queryByText(/last name is Required.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ZIP is required.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Birthdate is required.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/You need to choose.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/.*to agree to share your.*/i)).not.toBeInTheDocument();

    const submit = screen.getByRole('button');
    await userEvent.click(submit);

    expect(await screen.findByText(/last name is Required.*/i)).toBeInTheDocument();
    expect(await screen.findByText(/ZIP is required.*/i)).toBeInTheDocument();
    expect(await screen.findByText(/Birthdate is required.*/i)).toBeInTheDocument();
    expect(await screen.findByText(/You need to choose.*/i)).toBeInTheDocument();
    expect(await screen.findByText(/.*to agree to share your.*/i)).toBeInTheDocument();
  });
});
