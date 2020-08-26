import { ReactNode } from 'react';
import { IRouteProps } from 'src/routers';

export interface IProps extends IRouteProps {
  children: ReactNode;
}
