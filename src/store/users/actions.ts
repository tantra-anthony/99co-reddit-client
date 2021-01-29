import { AppThunk } from '..';
import { requestSearchUsers } from '../../services/users';
import {
  UsersActionTypes,
  SEARCH_USERS_ERROR,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
} from './types';
import { User, UsersSearchQueryParams } from '../../services/users/types';

export function searchJobs(query: UsersSearchQueryParams): AppThunk {
  return async (dispatch) => {
    dispatch(searchUsersRequest());

    return requestSearchUsers(query)
      .then((data) => {
        dispatch(searchUsersSuccess(data.users, data.count));
      })
      .catch((e) => {
        dispatch(searchUsersError(e));
      });
  };
}

function searchUsersRequest(): UsersActionTypes {
  return {
    type: SEARCH_USERS_REQUEST,
  };
}

function searchUsersSuccess(users: User[], count: number): UsersActionTypes {
  return {
    type: SEARCH_USERS_SUCCESS,
    users,
    count,
  };
}

function searchUsersError(error: string): UsersActionTypes {
  return {
    type: SEARCH_USERS_ERROR,
    error,
  };
}
