import { IAction } from '../../typings';

interface ILoaderParams {
  message?: string;
}
export interface IShowLoader extends IAction<'SHOW_LOADER'>, ILoaderParams {}

export type TShowLoader = (params?: ILoaderParams) => IShowLoader;
export const showLoader: TShowLoader = ({ message } = {}) => ({
  type: 'SHOW_LOADER',
  message: message || 'Loading...',
});

export interface IHideLoader extends IAction<'HIDE_LOADER'> {}
export type THideLoader = () => IHideLoader;
export const hideLoader: THideLoader = () => ({
  type: 'HIDE_LOADER',
});
