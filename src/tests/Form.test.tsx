import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, vitest } from 'vitest';

import Form from '../components/Form';

describe('Form', () => {
  it('birth date requirements', () => {
    render(<Form pushUser={() => {}} />);

    const birthdate = screen.getByLabelText(/Birth Date:/i);
    fireEvent.change(birthdate, { target: { value: '2000-03-08' } });

    const submit = screen.getByRole('button');
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.queryByText(/You must be at least 14 years old.*/i)).toBeNull();

    fireEvent.change(birthdate, { target: { value: '2020-03-08' } });
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText(/You must be at least 14 years old.*/i)).toBeInTheDocument();
  });

  it('First name requirements', () => {
    render(<Form pushUser={() => {}} />);
    expect(screen.queryByText(/first name lenght should be at listh 2 simbols.*/i)).toBeNull();

    const nameInput = screen.getByPlaceholderText(/First Name/i);
    fireEvent.change(nameInput, { target: { value: 'olivia' } });

    const submit = screen.getByRole('button');
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(
      screen.getByText(/first name lenght should be at listh 2 simbols.*/i)
    ).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Olivia' } });
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.queryByText(/first name lenght should be at listh 2 simbols.*/i)).toBeNull();
  });

  it('Avatar element shows that file has been selected', async () => {
    global.URL.createObjectURL = vitest.fn();
    render(<Form pushUser={() => {}} />);

    const fileInput = screen.getByLabelText(/avatar:/i);
    const fileInputLabel = screen.getByText(/avatar:/i);

    expect(fileInput).toBeInTheDocument();

    expect(fileInputLabel).not.toHaveClass('img-selected');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/jpeg' })],
      },
    });

    expect(fileInputLabel).toHaveClass('img-selected');
  });

  it('other form errors', () => {
    render(<Form pushUser={() => {}} />);

    expect(screen.queryByText(/Last name lenght.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Brain weight shold.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ZIP must.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/You need to choose.*/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/.*to agree to share your.*/i)).not.toBeInTheDocument();

    const submit = screen.getByRole('button');
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText(/Last name lenght.*/i)).toBeInTheDocument();
    expect(screen.getByText(/Brain weight shold.*/i)).toBeInTheDocument();
    expect(screen.getByText(/ZIP must.*/i)).toBeInTheDocument();
    expect(screen.getByText(/You need to choose.*/i)).toBeInTheDocument();
    expect(screen.getByText(/.*to agree to share your.*/i)).toBeInTheDocument();
  });

  it('brain wheight and flat Earth', () => {
    render(<Form pushUser={() => {}} />);

    const brainWeight = screen.getByPlaceholderText(/brain.*/i);
    fireEvent.change(brainWeight, { target: { value: '1300' } });

    const submit = screen.getByRole('button');
    fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.queryByText(/.*cannot be more than 1050*/i)).toBeInTheDocument();
  });
});
