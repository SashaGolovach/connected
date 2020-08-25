import { IDispatch, IAction } from 'src/typings';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';
import { getUserMe } from '../users';
import { send, initAxiosAuthHeader } from 'src/utils';
import { IHistory } from 'src/routers';

export interface ILogin extends IAction<'LOGIN'> {
  accessToken: string;
}

type TLogin = (
  user: {
    email: string;
    password: string;
  },
  history: IHistory
) => (dispatch: IDispatch) => void;

export const login: TLogin = (
  { email, password },
  history
) => async dispatch => {
  dispatch(showLoader());

  try {
    const { Token } = await send('POST', 'auth/token', {
      Username: email,
      Password: password,
    });
    initAxiosAuthHeader(Token);
    await dispatch(getUserMe());
    const action: ILogin = {
      type: 'LOGIN',
      accessToken: Token,
    };
    dispatch(action);
    localStorage.setItem('accessToken', Token);
    history.push('/connections');
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
