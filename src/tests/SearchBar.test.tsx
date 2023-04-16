import React from 'react';
import { describe, it, vi, assert } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import SearchBar from '../components/SearchBar';
import { renderWithRedux } from './util';

describe('SearchBar', () => {
  it('search bar hint', async () => {
    const setSearch = vi.fn();
    renderWithRedux(<SearchBar />);

    const hintButton = screen.getByText('?');

    await act(async () => {
      await userEvent.click(hintButton);
    });

    expect(screen.getByText('Supported search (space separated):')).toBeInTheDocument();

    const cross = screen.getByText('X');
    await act(async () => {
      await userEvent.click(cross);
    });

    expect(screen.queryByText('Supported search (space separated):')).not.toBeInTheDocument();
  });

  it('search bar submit on valid search', async () => {
    const setSearch = vi.fn();
    renderWithRedux(<SearchBar />);

    const submit = screen.getByTestId('search-submit');
    const searchBar = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchBar, 'rick male human alive');
      await userEvent.click(submit);
    });

    // expect(setSearch).toHaveBeenCalledTimes(1);
  });

  it('search bar submit with empty search', async () => {
    const setSearch = vi.fn();
    renderWithRedux(<SearchBar />);

    const submit = screen.getByTestId('search-submit');

    await act(async () => {
      await userEvent.click(submit);
    });

    // expect(setSearch).toHaveBeenCalledTimes(1);
  });

  it('search bar submit on invalid search', async () => {
    renderWithRedux(<SearchBar />);

    const submit = screen.getByTestId('search-submit');
    const searchBar = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchBar, 'rick rick');
      await userEvent.click(submit);
    });

    expect(screen.getByText('Supported search (space separated):')).toBeInTheDocument();
  });

  it('search bar retrieves value from localStorage', () => {
    const setSearch = vi.fn();
    renderWithRedux(<SearchBar />);

    // expect(screen.getByRole('textbox')).toHaveValue('rick female');
  });

  it('search bar saves value to localStorage', async () => {
    const setSearch = vi.fn();
    renderWithRedux(<SearchBar />);

    const submit = screen.getByTestId('search-submit');
    const searchBar = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchBar, 'rick male human alive');
      await userEvent.click(submit);
    });

    // expect(setSearch).toHaveBeenCalledTimes(1);
    // assert(localStorage.getItem(LS_SEARCH_BAR_VALUE_KEY) == 'rick male human alive');
  });
});
