import {
  SubredditContentDataChildData,
  SubredditContentSortTypes,
} from '../../services/reddit/subreddit/types';

export type Thread = SubredditContentDataChildData;

export interface GetThreadForSubredditParams {
  subreddit: string;
  sort: SubredditContentSortTypes;
  limit: number;
  after?: string;
}

export interface ClearThreadVoteLocalParams {
  threadId: string;
  scoreAdd: number;
}

export interface ClearThreadVoteParams {
  threadId: string;
  upvoted: boolean;
}

export interface VoteThreadLocalParams {
  threadId: string;
  shouldFlipVote: boolean;
  scoreAdd: number;
}

export interface VoteThreadLocalParams {
  threadId: string;
  shouldFlipVote: boolean;
}

export interface VoteThreadParams {
  threadId: string;
  isCurrentlyVoted: boolean;
}
