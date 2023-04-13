import { configureStore } from '@reduxjs/toolkit';
import users from './features/users';
import search from './features/search';
import cards from './features/cards';
import path from './features/path';

const store = configureStore({
  reducer: {
    users,
    search,
    cards,
    path,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
