import { Reducer } from 'redux';
import { IConnectionsObj } from 'src/typings';
import { IConnectToSpotify } from '../actions/connections';

import * as defaultStates from '../defaultStates';

const reducer: Reducer<IConnectionsObj, IConnectToSpotify> = (
  state = defaultStates.connections,
  actions
) => {
  switch (actions.type) {
    default:
      return { ...state };
  }
};

export default reducer;
