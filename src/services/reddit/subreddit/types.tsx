import { ParsedUrlQueryInput } from 'querystring';

export enum SubredditContentSortTypes {
  HOT = 'hot',
  NEW = 'new',
  TOP = 'top',
}

export interface SubredditContentQueryParams extends ParsedUrlQueryInput {
  limit?: number;
  after?: string;
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

export interface SubredditContentDataChildData {
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
  created_utc: number;
  url: string;
  id: string;
  post_hint: string;
  permalink: string;
  thumbnail: string;
  upvoted?: boolean;
}

export interface SubredditSearchInfoResult {
  kind: string;
  data: SubredditSearchInfoData;
}

export interface SubredditAboutResult {
  kind: string;
  data: SubredditSearchInfoDataChildData;
}

interface SubredditSearchInfoData {
  dist: number;
  children: SubredditSearchInfoDataChild[];
}

export interface SubredditSearchInfoDataChild {
  kind: string;
  data: SubredditSearchInfoDataChildData;
}

export interface SubredditSearchInfoDataChildData {
  title: string;
  icon_img: string;
  display_name: string;
  display_name_prefixed: string;
  banner_background_image: string;
  community_icon: string;
  subscribers: number;
  accounts_active: number;
  created: number;
  name: string;
  public_description: string;
  mobile_banner_image: string;
}
