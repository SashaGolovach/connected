import React from 'react';

import Button from '@material-ui/core/Button';

import { useSelector } from 'src/store/hooks';

import { IProps } from './interface';
import Styles from './styles.module.scss';

const Main: React.FC<IProps> = props => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={Styles.main}>
      <div className={Styles.title}>Connect</div>
      <Button
        className={Styles.btn}
        size="large"
        color="secondary"
        variant="contained"
        onClick={() => {
          props.history.push(isLoggedIn ? '/connections' : '/login');
        }}
      >
        Let's start
      </Button>
    </div>
  );
};

export default Main;
