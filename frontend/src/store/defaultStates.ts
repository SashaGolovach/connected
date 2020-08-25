import {
  ILoaderStateObj,
  IToastrsStateObj,
  IAuthStateObj,
  IConnectionsObj,
  IUsersObj,
} from '../typings';

export const loader: ILoaderStateObj = {
  isLoading: false,
  loaderMessage: 'Loading...',
};

export const toastrs: IToastrsStateObj = {};

export const auth: IAuthStateObj = {
  isLoggedIn: false,
  accessToken: null,
};

export const connections: IConnectionsObj = {};

export const users: IUsersObj = {
  userMe: null,
  users: [],
};
