import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchSubredditInfo } from '../../services/reddit/subreddit';
import { SubredditSearchInfoDataChildData } from '../../services/reddit/subreddit/types';
import { Subreddit } from './types';

const subredditsAdapter = createEntityAdapter<Subreddit>({
  selectId: (subreddit) => subreddit.display_name,
});

export const getSubredditInfo = createAsyncThunk(
  'subreddits/getSubredditInfo',
  async (subreddit: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const result = await fetchSubredditInfo(subreddit);
      dispatch(subredditsAdded(result));
      return true;
    } catch (e) {
      return false;
    }
  },
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: subredditsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    subredditsAdded(
      state,
      action: PayloadAction<SubredditSearchInfoDataChildData>,
    ) {
      subredditsAdapter.addOne(state, action.payload);
    },
    subredditsLoading(state) {
      if (!state.loading) {
        state.loading = true;
      }
    },
  },
});

export const { subredditsAdded } = subredditsSlice.actions;

export default subredditsSlice.reducer;
