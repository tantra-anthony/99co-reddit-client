import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  fetchSubredditContent,
  requestVoteThread,
} from '../../services/reddit/subreddit';
import { SubredditContentDataChildData } from '../../services/reddit/subreddit/types';
import { typeThreadsAdded, typeThreadsReceived } from '../subreddits';
import { GetThreadForSubredditParams, Thread } from './types';

const threadsAdapter = createEntityAdapter<Thread>({
  selectId: (subreddit) => subreddit.name,
});

export const getInitialThreadsForSubreddit = createAsyncThunk(
  'threads/getInitialThreadsForSubreddit',
  async (params: GetThreadForSubredditParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const result = await fetchSubredditContent(
        params.subreddit,
        params.sort,
        {
          limit: params.limit,
        },
      );
      const threadsAdded: SubredditContentDataChildData[] = [];
      const threadIdsAdded: string[] = [];
      result.data.children.forEach((child) => {
        threadsAdded.push(child.data);
        threadIdsAdded.push(child.data.name);
      });
      dispatch(threadsAddMany(threadsAdded));
      dispatch(
        typeThreadsReceived({
          sort: params.sort,
          threads: threadIdsAdded,
        }),
      );
      return true;
    } catch (e) {
      return false;
    }
  },
);

export const getSubsequentThreadsForSubreddit = createAsyncThunk(
  'threads/getSubsequentThreadsForSubreddit',
  async (params: GetThreadForSubredditParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const result = await fetchSubredditContent(
        params.subreddit,
        params.sort,
        {
          limit: params.limit,
          after: params.after,
        },
      );
      const threadsAdded: SubredditContentDataChildData[] = [];
      const threadIdsAdded: string[] = [];
      result.data.children.forEach((child) => {
        threadsAdded.push(child.data);
        threadIdsAdded.push(child.data.name);
      });
      dispatch(threadsAddMany(threadsAdded));
      dispatch(
        typeThreadsAdded({
          sort: params.sort,
          threads: threadIdsAdded,
        }),
      );
      return true;
    } catch (e) {
      return false;
    }
  },
);

export const clearThreadVote = createAsyncThunk(
  'threads/clearThreadVote',
  async (threadId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(clearVotesLocal(threadId));
      await requestVoteThread(threadId, 0);
      return true;
    } catch (e) {
      return false;
    }
  },
);

export const upvoteThread = createAsyncThunk(
  'threads/upvoteThread',
  async (threadId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(upvoteThreadLocal(threadId));
      await requestVoteThread(threadId, 1);
      return true;
    } catch (e) {
      dispatch(clearVotesLocal(threadId));
      return false;
    }
  },
);

export const downvoteThread = createAsyncThunk(
  'threads/downvoteThread',
  async (threadId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(downvoteThreadLocal(threadId));
      await requestVoteThread(threadId, -1);
      return true;
    } catch (e) {
      dispatch(clearVotesLocal(threadId));
      return false;
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: threadsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    threadsAddMany(
      state,
      action: PayloadAction<SubredditContentDataChildData[]>,
    ) {
      threadsAdapter.addMany(state, action.payload);
    },
    threadsLoading(state) {
      if (!state.loading) {
        state.loading = true;
      }
    },
    upvoteThreadLocal(state, action: PayloadAction<string>) {
      const thread = state.entities[action.payload];
      if (thread) {
        thread.upvoted = true;
      }
    },
    downvoteThreadLocal(state, action: PayloadAction<string>) {
      const thread = state.entities[action.payload];
      if (thread) {
        thread.upvoted = false;
      }
    },
    clearVotesLocal(state, action: PayloadAction<string>) {
      const thread = state.entities[action.payload];
      if (thread) {
        thread.upvoted = undefined;
      }
    },
  },
});

export const {
  threadsAddMany,
  upvoteThreadLocal,
  downvoteThreadLocal,
  clearVotesLocal,
} = threadsSlice.actions;

export default threadsSlice.reducer;
