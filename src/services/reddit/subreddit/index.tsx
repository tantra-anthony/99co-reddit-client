import axios from 'axios';
import {
  SubredditAboutResult,
  SubredditContentQueryParams,
  SubredditContentResult,
  SubredditContentSortTypes,
  SubredditSearchInfoDataChildData,
  SubredditSearchInfoResult,
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

function getSubredditSearchInfoFetchURL(
  subreddit: string,
  limit: number,
): string {
  const qstring = querystring.stringify({
    limit,
    q: subreddit,
  });

  return new URL(
    `subreddits/search.json?${qstring}`,
    REDDIT_BASE_URL,
  ).toString();
}

function getSubredditAboutFetchURL(subreddit: string): string {
  return new URL(`r/${subreddit}/about.json`, REDDIT_BASE_URL).toString();
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

export function searchSubreddit(
  keyword: string,
  limit: number,
): Promise<SubredditSearchInfoResult> {
  const url = getSubredditSearchInfoFetchURL(keyword, limit);
  return axios.get<SubredditSearchInfoResult>(url).then((res) => res.data);
}

export async function fetchSubredditInfo(
  subreddit: string,
): Promise<SubredditSearchInfoDataChildData> {
  const url = getSubredditAboutFetchURL(subreddit);
  const result = await axios
    .get<SubredditAboutResult>(url)
    .then((res) => res.data);
  if (result.kind !== 't5') {
    throw new Error('404');
  }

  return result.data;
}

export async function requestVoteThread(threadId: string, vote: -1 | 0 | 1) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // resolve();
      reject(new Error('Mock'));
    }, 3000);
  });
}
