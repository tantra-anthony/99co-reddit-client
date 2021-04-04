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
import {
  ClearThreadVoteLocalParams,
  ClearThreadVoteParams,
  GetThreadForSubredditParams,
  Thread,
  VoteThreadLocalParams,
  VoteThreadParams,
} from './types';

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
  async (params: ClearThreadVoteParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(
        clearVotesLocal({
          threadId: params.threadId,
          scoreAdd: params.upvoted ? -1 : 1,
        }),
      );
      await requestVoteThread(params.threadId, 0);
      return true;
    } catch (e) {
      const args = {
        threadId: params.threadId,
        shouldFlipVote: false,
        scoreAdd: params.upvoted ? -1 : 1,
      };
      dispatch(
        params.upvoted ? upvoteThreadLocal(args) : downvoteThreadLocal(args),
      );
      return false;
    }
  },
);

export const upvoteThread = createAsyncThunk(
  'threads/upvoteThread',
  async (params: VoteThreadParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(
        upvoteThreadLocal({
          threadId: params.threadId,
          shouldFlipVote: true,
          scoreAdd: params.isCurrentlyVoted ? 2 : 1,
        }),
      );
      await requestVoteThread(params.threadId, 1);
      return true;
    } catch (e) {
      dispatch(
        clearVotesLocal({
          threadId: params.threadId,
          scoreAdd: -1,
        }),
      );
      return false;
    }
  },
);

export const downvoteThread = createAsyncThunk(
  'threads/downvoteThread',
  async (params: VoteThreadParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(
        downvoteThreadLocal({
          threadId: params.threadId,
          shouldFlipVote: true,
          scoreAdd: params.isCurrentlyVoted ? -2 : -1,
        }),
      );
      await requestVoteThread(params.threadId, -1);
      return true;
    } catch (e) {
      dispatch(
        clearVotesLocal({
          threadId: params.threadId,
          scoreAdd: 1,
        }),
      );
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
    upvoteThreadLocal(state, action: PayloadAction<VoteThreadLocalParams>) {
      const thread = state.entities[action.payload.threadId];
      if (thread) {
        if (action.payload.shouldFlipVote) {
          thread.upvoted = true;
        }
        thread.score = thread.score + action.payload.scoreAdd;
      }
    },
    downvoteThreadLocal(state, action: PayloadAction<VoteThreadLocalParams>) {
      const thread = state.entities[action.payload.threadId];
      if (thread) {
        if (action.payload.shouldFlipVote) {
          thread.upvoted = false;
        }
        thread.score = thread.score + action.payload.scoreAdd;
      }
    },
    clearVotesLocal(state, action: PayloadAction<ClearThreadVoteLocalParams>) {
      const thread = state.entities[action.payload.threadId];
      if (thread) {
        thread.upvoted = undefined;
        thread.score = thread.score + action.payload.scoreAdd;
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
