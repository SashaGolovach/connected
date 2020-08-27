import { send } from 'src/utils';
import { IAction, IDispatch, IUser } from 'src/typings';
import { showLoader, hideLoader } from '../loader';
import { addToastr } from '../toastrs';

export interface IGetMatch extends IAction<'GET_MATCH'> {
  score: number;
}

export type TGetMatch = (userId: string) => (dispatch: IDispatch) => void;

export const getMatch: TGetMatch = userId => async dispatch => {
  dispatch(showLoader());

  try {
    const { Score } = await send('GET', `match/${userId}`);

    const action: IGetMatch = {
      type: 'GET_MATCH',
      score: Score,
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
