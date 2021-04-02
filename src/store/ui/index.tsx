import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getThemePreference } from '../../services/ui';
import { UIState, ThemePreference } from './types';

export const rehydrateThemePreference = createAsyncThunk<void, ThemePreference>(
  'ui/rehydrateThemePreference',
  async (fallback, thunkApi) => {
    const { dispatch } = thunkApi;
    const preference = getThemePreference();
    dispatch(changeThemePreference(preference || fallback));
  },
);

const initialState: UIState = {
  theme: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeThemePreference(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
  },
});

export const { changeThemePreference } = uiSlice.actions;

export default uiSlice.reducer;
