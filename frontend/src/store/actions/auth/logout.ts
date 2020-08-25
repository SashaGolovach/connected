import { IDispatch, IAction } from '../../../typings';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';
import { send } from '../../../utils';

export interface ILogout extends IAction<'LOGOUT'> {}

type TLogout = () => (dispatch: IDispatch) => void;

export const logout: TLogout = () => async dispatch => {
  dispatch(showLoader());

  try {
    // const accessToken = await send('POST', 'auth');
    const action: ILogout = {
      type: 'LOGOUT',
    };
    dispatch(action);
    localStorage.clear();
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
