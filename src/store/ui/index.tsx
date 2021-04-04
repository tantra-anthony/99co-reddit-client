import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubredditDisplayTypes } from '../../screens/Subreddit/types';
import {
  getSubredditDisplayPreference,
  getThemePreference,
} from '../../services/ui';
import { UIState, ThemePreference } from './types';

export const rehydrateThemePreference = createAsyncThunk<void, ThemePreference>(
  'ui/rehydrateThemePreference',
  (fallback, thunkApi) => {
    const { dispatch } = thunkApi;
    const preference = getThemePreference();
    dispatch(changeThemePreference(preference || fallback));
  },
);

export const rehydrateSubredditDisplayPreference = createAsyncThunk(
  'ui/rehydrateSubredditDisplayPreference',
  (_, thunkApi) => {
    const { dispatch } = thunkApi;
    const preference = getSubredditDisplayPreference();
    dispatch(changeSubredditDisplayPreference(preference));
  },
);

const initialState: UIState = {
  theme: null,
  displayType: SubredditDisplayTypes.CARD,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeThemePreference(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    changeSubredditDisplayPreference(
      state,
      action: PayloadAction<SubredditDisplayTypes>,
    ) {
      state.displayType = action.payload;
    },
  },
});

export const {
  changeThemePreference,
  changeSubredditDisplayPreference,
} = uiSlice.actions;

export default uiSlice.reducer;
