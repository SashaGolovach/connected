import { guid } from '../../utils';
import { IAction, IToastrItem, IDispatch } from '../../typings';

export interface IAddToastr extends IAction<'ADD_TOASTR'> {
  toastr: IToastrItem;
}
export type TAddToastr = (toastr: IToastrItem) => (dispatch: IDispatch) => void;
export const addToastr: TAddToastr = toastr => async dispatch => {
  const LONG_DELAY_BEFORE_CLOSE = 12000;
  const SHORT_DELAY_BEFORE_CLOSE = 4000;
  let closeDelay = LONG_DELAY_BEFORE_CLOSE;

  if (toastr.type === 'success') {
    closeDelay = SHORT_DELAY_BEFORE_CLOSE;
  }

  toastr.id = guid();
  toastr.timeoutId = setTimeout(
    () => dispatch(removeToastr(toastr)),
    closeDelay
  );
  toastr.isVisible = false;
  dispatch({
    type: 'ADD_TOASTR',
    toastr,
  });
};

export interface IShowToastr extends IAction<'SHOW_TOASTR'> {
  id: string;
}
export type TShowToastr = (id: string) => IShowToastr;
export const showToastr: TShowToastr = id => ({
  type: 'SHOW_TOASTR',
  id,
});

export interface IHideToastr extends IAction<'HIDE_TOASTR'> {
  id: string;
}
export type THideToastr = (id: string) => IHideToastr;
export const hideToastr: THideToastr = id => ({
  type: 'HIDE_TOASTR',
  id,
});

export interface IRemoveToastr extends IAction<'REMOVE_TOASTR'> {
  id: string;
}
export type TRemoveToastr = (
  toastr: IToastrItem
) => (dispatch: IDispatch) => void;
export const removeToastr: TRemoveToastr = toastr => dispatch => {
  clearTimeout(toastr.timeoutId);
  dispatch(hideToastr(toastr.id));
  setTimeout(() => {
    dispatch({
      type: 'REMOVE_TOASTR',
      id: toastr.id,
    });
  }, 300);
};
