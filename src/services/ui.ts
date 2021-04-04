import { SubredditDisplayTypes } from '../screens/Subreddit/types';
import { ThemePreference } from '../store/ui/types';
import { getItemFromStorage, setItemInStorage } from './storage';

const THEME_PREFERENCE_KEY = 'preferred_theme';
const SUBREDDIT_DISPLAY_PREFERENCE_KEY = 'preferred_display';

export function getThemePreference() {
  return getItemFromStorage(THEME_PREFERENCE_KEY) as ThemePreference;
}

export function setThemePreference(theme: ThemePreference) {
  return setItemInStorage(THEME_PREFERENCE_KEY, theme);
}

export function getSubredditDisplayPreference() {
  const item =
    getItemFromStorage(SUBREDDIT_DISPLAY_PREFERENCE_KEY) ||
    SubredditDisplayTypes.CARD;
  return item as SubredditDisplayTypes;
}

export function setSubredditDisplayPreference(display: SubredditDisplayTypes) {
  return setItemInStorage(SUBREDDIT_DISPLAY_PREFERENCE_KEY, display);
}
