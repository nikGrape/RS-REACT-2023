import { configureStore, ThunkAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import users from './redux/usersSlice';
import search from './redux/searchSlice';
import app from './redux/appSlice';

declare const window: Window &
  typeof globalThis & {
    __PRELOADED_STATE__: object;
  };

const store = configureStore({
  reducer: {
    users,
    search,
    app,
  },
  // preloadedState: __isBrowser__ ? window.__PRELOADED_STATE__ : {},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;

export default store;
