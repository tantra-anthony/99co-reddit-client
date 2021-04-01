import axios from 'axios';
import {
  SubredditContentQueryParams,
  SubredditContentResult,
  SubredditContentSortTypes,
} from './types';
import { REDDIT_BASE_URL } from '../constants';
import querystring from 'querystring';

function getSubredditContentFetchURL(
  subreddit: string,
  sort: string,
  query: string,
): string {
  return new URL(
    `r/${subreddit}/${sort}.json?${query}`,
    REDDIT_BASE_URL,
  ).toString();
}

export function fetchSubredditContent(
  subreddit: string,
  sort: SubredditContentSortTypes,
  query: SubredditContentQueryParams,
): Promise<SubredditContentResult> {
  const qstring = querystring.stringify(query);
  const url = getSubredditContentFetchURL(subreddit, sort, qstring);
  return axios.get<SubredditContentResult>(url).then((res) => res.data);
}
