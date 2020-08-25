import { Reducer } from 'redux';
import { IUsersObj } from 'src/typings';
import { IGetUserMe, IGetUsers } from '../actions/users';

import * as defaultStates from '../defaultStates';

const reducer: Reducer<IUsersObj, IGetUserMe | IGetUsers> = (
  state = defaultStates.users,
  actions
) => {
  switch (actions.type) {
    case 'GET_USER_ME':
      return { ...state, userMe: actions.userMe };
    case 'GET_USERS':
      return { ...state, users: actions.users };
    default:
      return { ...state };
  }
};

export default reducer;
