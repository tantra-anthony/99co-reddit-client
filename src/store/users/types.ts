import { User } from '../../services/users/types';

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_ERROR = 'SEARCH_USERS_ERROR';

interface SearchUsersRequestAction {
  type: typeof SEARCH_USERS_REQUEST;
}

interface SearchUsersSuccessAction {
  type: typeof SEARCH_USERS_SUCCESS;
  users: User[];
  count: number;
}

interface SearchUsersErrorAction {
  type: typeof SEARCH_USERS_ERROR;
  error: string;
}

export type UsersActionTypes =
  | SearchUsersRequestAction
  | SearchUsersSuccessAction
  | SearchUsersErrorAction;

export interface UsersByIdState {
  [id: string]: User;
}

export interface UsersState {
  fetching: boolean;
  byId: UsersByIdState;
  allId: string[];
  count: number;
}
