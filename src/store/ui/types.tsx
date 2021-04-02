export const CHANGE_THEME_PREFERENCE = 'CHANGE_THEME_PREFERENCE';

interface ChangeThemePreferenceAction {
  type: typeof CHANGE_THEME_PREFERENCE;
  theme: ThemePreference;
}

export type UIActionTypes = ChangeThemePreferenceAction;

export type ThemePreference = 'light' | 'dark' | null;

export interface UIState {
  theme: 'light' | 'dark' | null;
}
