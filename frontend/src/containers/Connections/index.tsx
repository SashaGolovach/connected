import React, { FC, useEffect } from 'react';

import Link from '@material-ui/core/Link';

import { Redirect } from 'src/routers';
import { useDispatch, useSelector } from 'src/store/hooks';
import { connectToSpotify } from 'src/store/actions/connections';

import { IProps } from './interface';

import Styles from './styles.module.scss';

const SPOTIFY_LOGIN_URL =
  'https://accounts.spotify.com/authorize?response_type=code&client_id=626a574974ec4763b0c8d9a327ecbd5a&redirect_uri=http://localhost:3000/connections?isSpotify=true&scope=user-read-private user-library-read';

const Connections: FC<IProps> = props => {
  const dispatch = useDispatch();

  const userMe = useSelector(state => state.users.userMe);
  const hasConnectedService = !!userMe && !!userMe.ConnectedServices.length;

  const { from } = props.location.state || {
    from: { pathname: '/users' },
  };

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const isSpotify = urlParams.get('isSpotify');

      if (isSpotify) {
        const code = urlParams.get('code');
        await dispatch(connectToSpotify(code, props.history));
      }
    })();
  }, []);

  if (hasConnectedService) {
    return <Redirect to={from} />;
  }

  return (
    <div className={Styles.connectionsContainer}>
      <h2>Your connections:</h2>
      <ul className={Styles.connections}>
        <li>
          Spotify
          {userMe &&
          userMe.ConnectedServices.some(
            connectedService => connectedService === 'Spotify'
          ) ? (
            <Link href="/users" color="secondary">
              Go to users
            </Link>
          ) : (
            <Link href={SPOTIFY_LOGIN_URL} color="secondary">
              Connect
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Connections;
