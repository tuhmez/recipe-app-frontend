import { combineReducers } from 'redux';
import appReducer from './redux/reducer';

export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: appReducer,
    ...injectedReducers
  });

  return rootReducer;
}