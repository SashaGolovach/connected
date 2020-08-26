import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { Route, Redirect } from 'src/routers';
import Loader from 'src/components/Loader';
import ToastrWrap from 'src/components/ToastrWrap';
import PrivateRoute from 'src/components/PrivateRoute';
import { useDispatch, useSelector } from 'src/store/hooks';
import { setAccessToken } from 'src/store/actions/auth';
import { getUserMe } from 'src/store/actions/users';
import { accessToken } from 'src/utils';
// import Main from '../Main';
import Login from '../Login';
import Connections from '../Connections';
import Users from '../Users';

import { IProps } from './interface';
import Styles from './styles.module.scss';

const App: React.FC<IProps> = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    (async () => {
      if (!accessToken) return;

      dispatch(setAccessToken(accessToken));
      await dispatch(getUserMe());
    })();
  }, []);

  return (
    <div className={Styles.app}>
      <ToastrWrap />
      <Loader />
      <Switch>
        {/* <Route path="/" exact component={Main} /> */}
        <Route path="/login" exact component={Login} />
        <PrivateRoute
          path="/connections"
          exact
          Component={Connections}
          condition={isLoggedIn}
          redirect="/login"
        />
        <PrivateRoute
          path="/users"
          exact
          Component={Users}
          condition={isLoggedIn}
          redirect="/login"
        />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default App;
