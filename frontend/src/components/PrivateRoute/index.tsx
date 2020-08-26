import React from 'react';
import { withRouter } from 'react-router';

import { Route, Redirect } from 'src/routers';
import { IProps } from './interface';

export const PrivateRoute: React.FC<IProps> = ({
  Component,
  condition,
  redirect,
  path,
  location,
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      condition ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirect,
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default withRouter(PrivateRoute);
