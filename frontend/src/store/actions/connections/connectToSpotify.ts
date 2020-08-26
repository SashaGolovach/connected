import { IDispatch, IAction } from 'src/typings';
import { send } from 'src/utils';
import { IHistory } from 'src/routers';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';
import { getUserMe } from '../users/getUserMe';

export interface IConnectToSpotify extends IAction<'CONNECT_TO_SPOTIFY'> {}

type TConnectToSpotify = (
  code: string,
  history: IHistory
) => (dispatch: IDispatch) => void;

export const connectToSpotify: TConnectToSpotify = (
  code,
  history
) => async dispatch => {
  dispatch(showLoader());

  try {
    await send('POST', 'auth/spotify', {
      AuthorizationCode: code,
    });
    await dispatch(getUserMe());
    const action: IConnectToSpotify = {
      type: 'CONNECT_TO_SPOTIFY',
    };
    dispatch(action);
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
