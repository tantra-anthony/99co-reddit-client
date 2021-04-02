import { combineReducers, Action, createStore, applyMiddleware } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import users from './users/reducers';
import ui from './ui/reducers';

const rootReducer = combineReducers({
  users,
  ui,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
