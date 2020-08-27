import { Reducer } from 'redux';
import { IUsersObj } from 'src/typings';
import { IGetUserMe, IGetUsers, IGetMatch } from '../actions/users';

import * as defaultStates from '../defaultStates';

const reducer: Reducer<IUsersObj, IGetUserMe | IGetUsers | IGetMatch> = (
  state = defaultStates.users,
  actions
) => {
  switch (actions.type) {
    case 'GET_USER_ME':
      return { ...state, userMe: actions.userMe };
    case 'GET_USERS':
      return { ...state, users: actions.users };
    case 'GET_MATCH':
      return { ...state, score: actions.score };
    default:
      return { ...state };
  }
};

export default reducer;
