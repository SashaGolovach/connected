import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import { IStore, IAction, TStoreEnhancer } from '../typings';

import * as defaultStates from './defaultStates';

const composeEnhancers: <R>(a: R) => R =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [reduxThunk];
const initialState: IStore = {
  loader: defaultStates.loader,
  toastrs: defaultStates.toastrs,
  auth: defaultStates.auth,
  connections: defaultStates.connections,
  users: defaultStates.users,
};

const store = createStore<IStore, IAction, {}, TStoreEnhancer>(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
