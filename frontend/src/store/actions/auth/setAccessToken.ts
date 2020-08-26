import { IAction } from 'src/typings';

import { initAxiosAuthHeader } from 'src/utils';

export interface ISetAccessToken extends IAction<'SET_ACCESS_TOKEN'> {
  accessToken: string;
}

export type TSetAccessToken = (accessToken: string) => ISetAccessToken;

export const setAccessToken: TSetAccessToken = accessToken => {
  initAxiosAuthHeader(accessToken);
  return {
    type: 'SET_ACCESS_TOKEN',
    accessToken,
  };
};
