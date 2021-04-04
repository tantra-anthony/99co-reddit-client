import {
  SubredditContentSortTypes,
  SubredditSearchInfoDataChildData,
} from '../../services/reddit/subreddit/types';

export type Subreddit = SubredditSearchInfoDataChildData;

export interface TypeThreadsAddedPayload {
  threads: string[];
  sort: SubredditContentSortTypes;
}
