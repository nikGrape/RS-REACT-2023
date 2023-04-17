import React from 'react';
import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import SearchBar from '../components/SearchBar';
import { renderWithRedux } from './util';

describe('SearchBar', () => {
  it('search bar hint', async () => {
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

  it('search bar submit with empty search', async () => {
    const { AppStore } = renderWithRedux(<SearchBar />);

    const submit = screen.getByTestId('search-submit');

    await act(async () => {
      await userEvent.click(submit);
    });

    expect(AppStore.getState().search.searchText == '').toBeTruthy;
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

  it('search bar saves value to the store', async () => {
    const { AppStore } = renderWithRedux(<SearchBar />);
    const searchText = 'rick male human alive';

    const submit = screen.getByTestId('search-submit');
    const searchBar = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchBar, searchText);
      await userEvent.click(submit);
    });

    expect(AppStore.getState().search.searchText == searchText).toBeTruthy;
  });
});
