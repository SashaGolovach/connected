import { send } from 'src/utils';
import { IAction, IDispatch, IUser } from 'src/typings';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';

export interface IGetUsers extends IAction<'GET_USERS'> {
  users: IUser[];
}

export type TGetUsers = () => (dispatch: IDispatch) => void;

export const getUsers: TGetUsers = () => async dispatch => {
  dispatch(showLoader());

  try {
    const users = await send('GET', 'users');
    const action: IGetUsers = {
      type: 'GET_USERS',
      users,
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
