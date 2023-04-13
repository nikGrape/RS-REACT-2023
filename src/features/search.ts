import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CardProps } from '../components/Card';
import { BASE_URL } from '../pages/Main';

interface SearchStateType {
  searchText: string;
  url: string;
  searchResult: CardProps[];
}

const initialState: SearchStateType = {
  searchText: '',
  url: BASE_URL,
  searchResult: [],
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
    setSearchResult: (state, action: { payload: CardProps[] }) => {
      state.searchResult = action.payload;
    },
  },
});

export default search.reducer;

export const { setSearchResult, setUrl, setSearchText } = search.actions;

export const selectSearch = (state: RootState) => ({
  url: state.search.url,
  searchText: state.search.searchText,
  searchResult: state.search.searchResult,
});
