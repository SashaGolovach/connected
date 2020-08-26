import { Reducer } from 'redux';

import { IToastrsStateObj } from '../../typings';
import * as defaultStates from '../defaultStates';
import {
  IAddToastr,
  IRemoveToastr,
  IHideToastr,
  IShowToastr,
} from '../actions/toastrs';

const reducer: Reducer<
  IToastrsStateObj,
  IAddToastr | IRemoveToastr | IHideToastr | IShowToastr
> = (state = defaultStates.toastrs, action) => {
  switch (action.type) {
    case 'ADD_TOASTR':
      return {
        ...state,
        [action.toastr.id]: action.toastr,
      };
    case 'SHOW_TOASTR':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isVisible: true,
        },
      };
    case 'HIDE_TOASTR':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isVisible: false,
        },
      };
    case 'REMOVE_TOASTR':
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default reducer;
