export interface User {
  id: number;
  name: string;
}

export interface UserSearchResult {
  count: number;
  users: User[];
}

export interface UsersSearchQueryParams {
  keyword?: string;
  limit?: number;
  offset?: number;
}
