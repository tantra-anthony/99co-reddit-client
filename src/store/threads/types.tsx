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
