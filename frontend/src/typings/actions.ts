import { Action, StoreEnhancer } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type reduxActions =
  // Loader
  | 'SHOW_LOADER'
  | 'HIDE_LOADER'
  // Toastr
  | 'ADD_TOASTR'
  | 'REMOVE_TOASTR'
  | 'SHOW_TOASTR'
  | 'HIDE_TOASTR'
  // Auth
  | 'LOGIN'
  | 'CHECK_AUTH'
  | 'SIGN_UP'
  | 'LOGOUT'
  | 'SET_ACCESS_TOKEN'
  //Connections
  | 'CONNECT_TO_SPOTIFY'
  //Users
  | 'GET_USER_ME'
  | 'GET_USERS'
  | 'GET_MATCH';

export interface IAction<T extends reduxActions = reduxActions>
  extends Action<T> {}

export interface IDispatch extends ThunkDispatch<{}, {}, IAction> {}

export type TStoreEnhancer = StoreEnhancer<{ dispatch: IDispatch }, {}>;
