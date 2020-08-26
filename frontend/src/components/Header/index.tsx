import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const LogoIcon = require('src/assets/svg/logo.svg');

import { IProps } from './interface';
import Styles from './styles.module.scss';

const Header: FC<IProps> = () => {
  return (
    <div className={Styles.headerWrapper}>
      <div className={Styles.header}>
        <Link to="/login" className={Styles.logo}>
          <LogoIcon />
          Connected
        </Link>
      </div>
    </div>
  );
};

export default Header;
