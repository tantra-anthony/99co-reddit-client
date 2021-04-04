import { SubredditDisplayTypes } from '../../screens/Subreddit/types';

export type ThemePreference = 'light' | 'dark' | null;

export interface UIState {
  theme: 'light' | 'dark' | null;
  displayType: SubredditDisplayTypes;
}
