import { IDispatch, IAction } from 'src/typings';
import { IHistory } from 'src/routers';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';

export interface ILogout extends IAction<'LOGOUT'> {}

type TLogout = (history: IHistory) => (dispatch: IDispatch) => void;

export const logout: TLogout = history => async dispatch => {
  dispatch(showLoader());

  try {
    // const accessToken = await send('POST', 'auth');
    const action: ILogout = {
      type: 'LOGOUT',
    };
    dispatch(action);
    localStorage.clear();
    history.push('/login');
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
