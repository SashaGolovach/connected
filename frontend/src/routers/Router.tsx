import React from 'react';

import {
  Route as OriginalRoute,
  Redirect as OriginalRedirect,
  NavLink as OriginalNavLink,
  RouteProps as OriginalRouteProps,
  RedirectProps as OriginalRedirectProps,
  NavLinkProps as OriginalNavLinkProps,
  LinkProps as OriginalLinkProps,
  RouteComponentProps,
} from 'react-router-dom';

import { History, LocationState, Location } from 'history';

export interface ILocation<routes extends string> extends Location {
  pathname: routes;
  state: any;
}

export interface IMatch<routes extends string> {
  path: routes;
  url: string;
  isExact: boolean;
  params: { [x: string]: string };
}

export interface IGlobalHistory<routes extends string> extends History {
  location: ILocation<routes>;
  push(path: routes, state?: LocationState): void;
  push(location: ILocation<routes>): void;
}

export interface IGlobalRouteProps<routes extends string>
  extends RouteComponentProps<{}> {
  history: IGlobalHistory<routes>;
  location: ILocation<routes>;
  match: IMatch<routes>;
}

interface IRouteProps<routes extends string> extends OriginalRouteProps {
  path: routes;
}
interface IRedirectProps<routes extends string> extends OriginalRedirectProps {
  to:
    | {
        pathname: routes;
        state?: object;
      }
    | routes;
}
interface INavLinkProps<routes extends string> extends OriginalNavLinkProps {
  to: routes;
}
interface ILinkProps<routes extends string> extends OriginalLinkProps {
  to: routes;
}

export default class Router<routes extends string> {
  public getRoute = () => {
    const Route: React.FC<IRouteProps<routes>> = props => (
      <OriginalRoute {...props} />
    );

    return Route;
  };

  public getRedirect = () => {
    const Redirect: React.FC<IRedirectProps<routes>> = props => (
      <OriginalRedirect {...props} />
    );

    return Redirect;
  };

  public getNavLink = () => {
    const NavLink: React.FC<INavLinkProps<routes>> = props => (
      <OriginalNavLink {...props} />
    );

    return NavLink;
  };

  public getLink = () => {
    const Link: React.FC<ILinkProps<routes>> = props => (
      <OriginalNavLink {...props} />
    );

    return Link;
  };
}
