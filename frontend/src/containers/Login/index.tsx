import React, { FC, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect, Link } from 'src/routers';

import { useDispatch, useSelector } from 'src/store/hooks';
import { login } from 'src/store/actions/auth';

import { IProps } from './interface';

import Styles from './styles.module.scss';

const Login: FC<IProps> = props => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { from } = props.location.state || {
    from: { pathname: '/connect' },
  };

  if (isLoggedIn) {
    return <Redirect to={from} />;
  }
  return (
    <div className={Styles.loginContainer}>
      <form className={Styles.form}>
        <h2 className={Styles.title}>Great to see you again!</h2>
        <div className={Styles.inputWrap}>
          <TextField
            type="text"
            value={email}
            fullWidth={true}
            placeholder="Enter your login"
            variant="outlined"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>

        <div className={Styles.inputWrap}>
          <TextField
            type="password"
            value={password}
            fullWidth={true}
            placeholder="Enter your password"
            variant="outlined"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>

        <Button
          onClick={() => {
            dispatch(login({ email, password }, props.history));
          }}
          color="primary"
          variant="contained"
          size="large"
        >
          Login
        </Button>
        <ul className={Styles.list}>
          <li className={Styles.item}>
            <Link to="/forgot-password" className={Styles.link}>
              Forgot password?
            </Link>
          </li>
          <li className={Styles.item}>
            No account yet?{' '}
            <Link to="/sign-up" className={Styles.link}>
              sign up
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
