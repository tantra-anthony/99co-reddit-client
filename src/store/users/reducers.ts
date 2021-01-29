import produce from 'immer';
import {
  UsersActionTypes,
  UsersState,
  SEARCH_USERS_ERROR,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  UsersByIdState,
} from './types';

const initialState: UsersState = {
  fetching: false,
  byId: {},
  allId: [],
  count: 0,
};

function users(state = initialState, action: UsersActionTypes): UsersState {
  switch (action.type) {
    case SEARCH_USERS_REQUEST: {
      return produce(state, (draft) => {
        draft.fetching = true;
      });
    }
    case SEARCH_USERS_SUCCESS: {
      return produce(state, (draft) => {
        const allId: string[] = [];
        const byId: UsersByIdState = {};
        action.users.forEach((user) => {
          allId.push(user.id.toString());
          byId[user.id] = user;
        });

        draft.allId = allId;
        draft.byId = byId;
        draft.count = action.count;
        draft.fetching = false;
      });
    }
    case SEARCH_USERS_ERROR: {
      return produce(state, (draft) => {
        draft.fetching = false;
      });
    }
    default: {
      return state;
    }
  }
}

export default users;
