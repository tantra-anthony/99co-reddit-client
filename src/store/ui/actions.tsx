import { AppThunk } from '..';
import { ThemePreference, CHANGE_THEME_PREFERENCE } from './types';
import { getThemePreference } from '../../services/ui';

export function changeThemePreference(theme: ThemePreference) {
  return {
    type: CHANGE_THEME_PREFERENCE,
    theme,
  };
}

export function rehydrateThemePreference(
  fallback: ThemePreference = 'light',
): AppThunk {
  return async (dispatch) => {
    const preference = getThemePreference();
    dispatch(changeThemePreference(preference || fallback));
  };
}
