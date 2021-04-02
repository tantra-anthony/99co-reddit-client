import { ThemePreference } from '../store/ui/types';
import { getItemFromStorage, setItemInStorage } from './storage';

const THEME_PREFERENCE_KEY = 'preferred_theme';

export function getThemePreference() {
  return getItemFromStorage(THEME_PREFERENCE_KEY) as ThemePreference;
}

export function setThemePreference(theme: ThemePreference) {
  return setItemInStorage(THEME_PREFERENCE_KEY, theme);
}
