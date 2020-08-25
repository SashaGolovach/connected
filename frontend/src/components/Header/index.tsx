import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { useSelector, useDispatch } from 'src/store/hooks';
import { logout } from 'src/store/actions/auth';

const LogoIcon = require('./logo.svg');

import { IProps } from './interface';
import Styles from './styles.module.scss';

const Header: React.FC<IProps> = props => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userMe = useSelector(state => state.users.userMe);

  return (
    <div className={Styles.headerWrapper}>
      <div className={Styles.header}>
        <Link to="/" className={Styles.logo}>
          <LogoIcon />
          Connected
        </Link>
        {isLoggedIn ? (
          <div className={Styles.profile}>
            <div className={Styles.user}>
              <span>Hi, {userMe ? userMe.Username : 'No name'}</span>
              <Avatar>US</Avatar>
            </div>
            <div className={Styles.userInfo}>
              <Button
                onClick={() => {
                  dispatch(logout());
                }}
                color="secondary"
                variant="contained"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              props.history.push('/login');
            }}
            color="secondary"
            variant="contained"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
