import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { CardProps } from '../components/Card';
import { extractCurrentPageIndex } from '../CustomHooks/useCallAPI';
import characters from '../assets/characters.json';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

interface SearchStateType {
  searchText: string;
  url: string;
  cards: CardProps[];
  loading: boolean;
  error: string | null;
  totalNumberOfPages: number;
  currentPageIndex: number;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
}

const initialState: SearchStateType = {
  searchText: '',
  url: BASE_URL,
  cards: characters,
  loading: false,
  error: null,
  totalNumberOfPages: 0,
  currentPageIndex: 1,
  prevPageUrl: null,
  nextPageUrl: null,
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: { payload: string }) => {
      state.searchText = action.payload;
    },
    setUrl: (state, action: { payload: string }) => {
      state.url = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setSearchResult: (
      state,
      action: {
        payload: {
          cards: CardProps[];
          loading: boolean;
          error: string | null;
          totalNumberOfPages: number;
          currentPageIndex: number;
          prevPageUrl: string | null;
          nextPageUrl: string | null;
        };
      }
    ) => {
      state.cards = action.payload.cards;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.totalNumberOfPages = action.payload.totalNumberOfPages;
      state.currentPageIndex = action.payload.currentPageIndex;
      state.prevPageUrl = action.payload.prevPageUrl;
      state.nextPageUrl = action.payload.nextPageUrl;
    },
  },
});

export const callApiAndSetSearchResult =
  (url: string): AppThunk =>
  async (dispatch) => {
    const controller = new AbortController();
    try {
      dispatch(setLoading(true));
      const res = await axios.get(url, { signal: controller.signal });
      const { results } = res.data;
      const cards = results.map((item: CardProps) => ({ ...item }));
      dispatch(
        setSearchResult({
          cards: cards,
          loading: false,
          error: null,
          currentPageIndex: extractCurrentPageIndex(url),
          totalNumberOfPages: res.data.info.pages,
          nextPageUrl: res.data.info.next,
          prevPageUrl: res.data.info.prev,
        })
      );
    } catch (err) {
      dispatch(setError((err as Error).message));
      dispatch(setLoading(false));
    }
  };

export const { setSearchResult, setUrl, setSearchText, setLoading, setError } = search.actions;

export const selectSearch = (state: RootState) => ({
  ...state.search,
});

export default search.reducer;
