import { toQueryString } from '../../utils/common';
import { get } from '../http';
import { UsersSearchQueryParams, UserSearchResult } from './types';

export async function requestSearchUsers(
  query: UsersSearchQueryParams,
): Promise<UserSearchResult> {
  const qstring = toQueryString(query);
  return (await get<UserSearchResult>(`users/search${qstring}`)).data;
}
