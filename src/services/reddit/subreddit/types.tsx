import { ParsedUrlQueryInput } from 'querystring';

export enum SubredditContentSortTypes {
  HOT = 'hot',
  NEW = 'new',
  TOP = 'top',
}

export interface SubredditContentQueryParams extends ParsedUrlQueryInput {
  limit?: number;
  offset?: number;
}

export interface SubredditContentResult {
  data: SubredditContentData;
}

interface SubredditContentData {
  children: SubredditContentDataChild[];
}

interface SubredditContentDataChild {
  kind: string;
  data: SubredditContentDataChildData;
}

interface SubredditContentDataChildData {
  subreddit: string;
  selftext: string;
  title: string;
  name: string;
  upvote_ratio: number;
  score: number;
  total_awards_received: number;
  author: string;
  num_comments: number;
  stickied: boolean;
  url: string;
  id: string;
}

export interface SubredditInfoResult {
  kind: string;
  data: SubredditInfoData;
}

interface SubredditInfoData {
  title: string;
  icon_img: string;
  display_name_prefixed: string;
  subscribers: number;
  accounts_active: number;
  name: string;
  public_description: string;
  mobile_banner_image: string;
}
