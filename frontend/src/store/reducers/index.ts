import { combineReducers } from 'redux';

import loader from './loader';
import toastrs from './toastrs';
import auth from './auth';
import connections from './connections';
import users from './users';

export default combineReducers({
  loader,
  toastrs,
  auth,
  connections,
  users,
});
