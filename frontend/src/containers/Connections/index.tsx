import React, { FC, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'src/store/hooks';
import { connectToSpotify } from 'src/store/actions/connections';
import Sidebar from 'src/components/Sidebar';

const SpotifyIcon = require('src/assets/svg/spotify.svg');
const ConnectedIcon = require('src/assets/svg/connected.svg');

import { IProps } from './interface';

import Styles from './styles.module.scss';

const SPOTIFY_LOGIN_URL =
  'https://accounts.spotify.com/authorize?response_type=code&client_id=626a574974ec4763b0c8d9a327ecbd5a&redirect_uri=http://localhost:3000/connections?isSpotify=true&scope=user-read-private user-library-read';

const Connections: FC<IProps> = props => {
  const dispatch = useDispatch();

  const userMe = useSelector(state => state.users.userMe);

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

  return (
    <Sidebar>
      <div className={Styles.connectionsContainer}>
        <h2 className={Styles.title}>Your connections:</h2>
        <ul className={Styles.connections}>
          <li>
            <div className={Styles.connection}>
              <SpotifyIcon className={Styles.icon} />
              Spotify
            </div>

            {userMe &&
            userMe.ConnectedServices.some(
              connectedService => connectedService === 'Spotify'
            ) ? (
              <span className={Styles.connected}>
                <ConnectedIcon />
                Connected
              </span>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                href={SPOTIFY_LOGIN_URL}
              >
                Connect
              </Button>
            )}
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default Connections;
