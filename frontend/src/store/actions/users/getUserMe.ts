import { send } from 'src/utils';
import { IAction, IUserMe, IDispatch } from 'src/typings';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';

export interface IGetUserMe extends IAction<'GET_USER_ME'> {
  userMe: IUserMe;
}

export type TGetUserMe = () => (dispatch: IDispatch) => void;

export const getUserMe: TGetUserMe = () => async dispatch => {
  dispatch(showLoader());

  try {
    const userMe = await send('GET', 'users/me');
    const action: IGetUserMe = {
      type: 'GET_USER_ME',
      userMe,
    };

    dispatch(action);
  } catch {
    dispatch(
      addToastr({
        type: 'error',
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};
