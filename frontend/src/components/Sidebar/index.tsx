import React, { FC } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const LogoIcon = require('src/assets/svg/logo.svg');
const LogoutIcon = require('src/assets/svg/logout.svg');
const UsersIcon = require('src/assets/svg/users.svg');

import { useSelector, useDispatch } from 'src/store/hooks';
import { logout } from 'src/store/actions/auth';

import { IProps } from './interface';

import Styles from './styles.module.scss';
import { NavLink, Link } from 'src/routers';

const Sidebar: FC<IProps> = ({ children, history }) => {
  const dispatch = useDispatch();

  const userMe = useSelector(state => state.users.userMe);

  return (
    <div className={Styles.sidebarWrap}>
      <div className={Styles.sidebar}>
        <LogoIcon className={Styles.logo} />
        <div className={Styles.navbar}>
          <ul className={Styles.navbarList}>
            <li className={Styles.navbarItem}>
              <NavLink
                className={Styles.navbarLink}
                activeClassName={Styles.isActive}
                to="/users"
                replace
              >
                <UsersIcon />
              </NavLink>
            </li>
          </ul>
          <div className={Styles.userInfo}>
            <Link to="/connections" className={Styles.user}>
              <Avatar className={Styles.avatar}>US</Avatar>
              <span>{userMe ? userMe.Username : 'No name'}</span>
            </Link>
            <Button
              onClick={() => {
                dispatch(logout(history));
              }}
              className={Styles.logoutBtn}
            >
              <LogoutIcon></LogoutIcon>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default withRouter(Sidebar);
