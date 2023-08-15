import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { createReducer } from '../reducers';

export function configureStore(preloadedState: any) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(createReducer(), preloadedState, compose(middlewareEnhancer));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(createReducer()))
  }

  return store;
};
