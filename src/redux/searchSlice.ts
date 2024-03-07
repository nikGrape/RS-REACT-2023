import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CardProps } from '../components/Card';
import characters from '../assets/characters.json';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

interface SearchStateType {
  searchText: string;
  url: string;
  cards: CardProps[];
  status: 'idle' | 'pending' | 'success' | 'failed';
  error: string | null;
  totalNumberOfPages: number;
  currentPageIndex: number;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
}

const initialState: SearchStateType = {
  searchText: '',
  url: BASE_URL,
  status: 'success',
  error: null,
  cards: characters.results,
  totalNumberOfPages: characters.info.pages,
  currentPageIndex: 1,
  prevPageUrl: characters.info.prev,
  nextPageUrl: characters.info.next,
};

export const fetchData = createAsyncThunk('search/fetchData', async (url: string, { signal }) => {
  const response = await axios.get(url, { signal });
  const { results, info } = response.data;
  const cards = results.map((item: CardProps) => ({ ...item }));
  const pageInx = url.match(/page=\d+/)?.[0].substring('page='.length) || '1';
  return {
    cards,
    url,
    currentPageIndex: parseInt(pageInx),
    totalNumberOfPages: info.pages,
    nextPageUrl: info.next,
    prevPageUrl: info.prev,
  };
});

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: { payload: string }) => {
      state.searchText = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        return { ...state, status: 'success', error: null, ...action.payload };
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setSearchText, setError } = search.actions;

export const selectSearch = (state: RootState) => state.search;

export default search.reducer;
