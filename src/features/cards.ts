import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const cards = createSlice({
  name: 'cards',
  initialState: {
    cades: [],
  },
  reducers: {
    setCards: (state, action) => {
      state.cades = action.payload;
    },
  },
});

export default cards.reducer;

export const { setCards } = cards.actions;

export const selectCards = (state: RootState) => state.cards.cades;
