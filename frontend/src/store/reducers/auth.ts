import { Reducer } from 'redux';
import * as defaultStates from '../defaultStates';
import { IAuthStateObj } from '../../typings';
import { ILogin, ILogout, ISetAccessToken } from '../actions/auth';

const reducer: Reducer<IAuthStateObj, ILogin | ILogout | ISetAccessToken> = (
  state = defaultStates.auth,
  action
) => {
  switch (action.type) {
    case 'LOGIN':
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.accessToken, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, accessToken: null, isLoggedIn: false };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
