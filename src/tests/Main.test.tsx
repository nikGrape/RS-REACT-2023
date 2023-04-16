import React from 'react';
import { describe, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import axios from 'axios';

import Main from '../pages/Main';
import characters from '../assets/characters.json';
import { BASE_URL } from '../redux/searchSlice';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './util';

vi.mock('axios');
const controller = new AbortController();

describe('Main', () => {
  it('render the list of all cards and call API', async () => {
    const get = axios.get as jest.MockedFunction<typeof axios.get>;
    get.mockImplementationOnce(() => Promise.resolve({ data: { ...characters } }));
    renderWithRedux(<Main />);
    const cardElements = await screen.findAllByTestId('card');
    expect(cardElements).toHaveLength(5);
    cardElements.map((card) => expect(card).toHaveClass('card'));

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(BASE_URL, { signal: controller.signal });
  });

  it('calls api on next/prev page button click', async () => {
    const get = axios.get as jest.MockedFunction<typeof axios.get>;
    get.mockImplementationOnce(() => Promise.resolve({ data: { ...characters } }));
    renderWithRedux(<Main />);
    expect(get).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(`${BASE_URL}`, { signal: controller.signal });

    const prev = await screen.findByText(/prev/);
    await act(async () => {
      await userEvent.click(prev);
    });
    expect(get).toHaveBeenCalledWith(`${BASE_URL}?page=2`, { signal: controller.signal });
    expect(get).toHaveBeenCalledTimes(2);

    const next = await screen.findByText(/next/);
    await act(async () => {
      await userEvent.click(next);
    });
    expect(get).toHaveBeenCalledTimes(3);
    expect(get).toHaveBeenCalledWith(`${BASE_URL}?page=3`, { signal: controller.signal });
  });

  it('show error on 404 response', async () => {
    const get = axios.get as jest.MockedFunction<typeof axios.get>;
    get.mockImplementationOnce(() => Promise.reject(new Error("We didn't find anything")));
    renderWithRedux(<Main />);

    expect(await screen.findByText(/Oooops!/i)).toBeInTheDocument();

    const cross = await screen.findByText('X');
    await act(async () => {
      await userEvent.click(cross);
    });

    expect(screen.queryByText(/Oooops!/i)).not.toBeInTheDocument();
  });
});
