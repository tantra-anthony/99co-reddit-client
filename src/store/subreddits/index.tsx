import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchSubredditInfo } from '../../services/reddit/subreddit';
import {
  SubredditContentSortTypes,
  SubredditSearchInfoDataChildData,
} from '../../services/reddit/subreddit/types';
import { Subreddit, TypeThreadsAddedPayload } from './types';

interface SubredditExtraState {
  loading: boolean;
  hot: string[];
  new: string[];
  top: string[];
}

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
  initialState: subredditsAdapter.getInitialState<SubredditExtraState>({
    loading: false,
    [SubredditContentSortTypes.HOT]: [],
    [SubredditContentSortTypes.NEW]: [],
    [SubredditContentSortTypes.TOP]: [],
  }),
  reducers: {
    subredditsAdded(
      state,
      action: PayloadAction<SubredditSearchInfoDataChildData>,
    ) {
      subredditsAdapter.addOne(state, action.payload);
    },
    typeThreadsAdded(state, action: PayloadAction<TypeThreadsAddedPayload>) {
      const initial = state[action.payload.sort];
      const toAdd = action.payload.threads;
      state[action.payload.sort] = [...initial, ...toAdd];
    },
    typeThreadsReceived(state, action: PayloadAction<TypeThreadsAddedPayload>) {
      state[action.payload.sort] = action.payload.threads;
    },
    subredditsLoading(state) {
      if (!state.loading) {
        state.loading = true;
      }
    },
  },
});

export const {
  subredditsAdded,
  typeThreadsAdded,
  typeThreadsReceived,
} = subredditsSlice.actions;

export default subredditsSlice.reducer;
