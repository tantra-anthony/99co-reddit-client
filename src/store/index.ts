import { configureStore } from '@reduxjs/toolkit';

import ui from './ui';
import subreddits from './subreddits';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    ui,
    subreddits,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
