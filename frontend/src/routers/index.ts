import Router, { IGlobalRouteProps, IGlobalHistory } from './Router';

export type routes =
  | '/'
  | '/login'
  | '/sign-up'
  | '/forgot-password'
  | '/connections'
  | '/users';

export interface IRouteProps extends IGlobalRouteProps<routes> {}
export interface IHistory extends IGlobalHistory<routes> {}

const RouterInstance = new Router<routes>();

export const Route = RouterInstance.getRoute();
export const Redirect = RouterInstance.getRedirect();
export const NavLink = RouterInstance.getNavLink();
export const Link = RouterInstance.getLink();
