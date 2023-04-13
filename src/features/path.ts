import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const path = createSlice({
  name: 'path',
  initialState: {
    path: 'Main',
    header: 'Rick and Morty',
  },
  reducers: {
    setPath: (store, action) => {
      store.path = action.payload.path;
      store.header = action.payload.header;
    },
  },
});

export default path.reducer;

export const { setPath } = path.actions;

export const selectPath = (state: RootState) => ({
  path: state.path.path,
  header: state.path.header,
});
