import produce from 'immer';
import { UIActionTypes, CHANGE_THEME_PREFERENCE, UIState } from './types';

const initialState: UIState = {
  theme: null,
};

function ui(state = initialState, action: UIActionTypes): UIState {
  switch (action.type) {
    case CHANGE_THEME_PREFERENCE: {
      return produce(state, (draft) => {
        draft.theme = action.theme;
      });
    }
    default: {
      return state;
    }
  }
}

export default ui;
