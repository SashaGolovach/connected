import React from 'react';

import { routes, IRouteProps } from 'src/routers';

export interface IProps extends IRouteProps {
  Component: React.ComponentType<any>;
  condition: boolean;
  redirect: routes;
  path: routes;
  exact?: boolean;
}
