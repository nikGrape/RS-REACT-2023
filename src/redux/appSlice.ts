import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

type appState = {
  theme: string;
  showHeader: boolean;
};

const initialState: appState = {
  theme: 'light',
  showHeader: true,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: { payload: string }): void => {
      state.theme = action.payload;
    },
    setShowHeader: (state, action: { payload: boolean }): void => {
      state.showHeader = action.payload;
    },
  },
});

export const selectApp = (state: RootState) => ({
  showHeader: state.app.showHeader,
  theme: state.app.theme,
});
export const { setShowHeader, setTheme } = app.actions;
export default app.reducer;
