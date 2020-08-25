import {
  IToastrsStateObj,
  ILoaderStateObj,
  IAuthStateObj,
  IConnectionsObj,
  IUsersObj,
} from '.';

export interface IStore {
  loader: ILoaderStateObj;
  toastrs: IToastrsStateObj;
  auth: IAuthStateObj;
  connections: IConnectionsObj;
  users: IUsersObj;
}
