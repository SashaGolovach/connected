import { Reducer } from 'redux';

import { ILoaderStateObj } from '../../typings';
import * as defaultStates from '../defaultStates';

import { IShowLoader, IHideLoader } from '../actions/loader';

const reducer: Reducer<ILoaderStateObj, IShowLoader | IHideLoader> = (
  state = defaultStates.loader,
  action
) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        ...state,
        isLoading: true,
        loaderMessage: action.message,
      };

    case 'HIDE_LOADER':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
