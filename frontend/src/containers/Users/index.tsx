import React, { FC, useEffect, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'src/store/hooks';
import { getUsers, getMatch } from 'src/store/actions/users';

import Sidebar from 'src/components/Sidebar';

import { IProps } from './interface';

import Styles from './styles.module.scss';

import { Pie } from 'react-chartjs-2';

const Users: FC<IProps> = props => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      if (users.length) return;
      await dispatch(getUsers());
    })();
  }, []);

  return (
    <Sidebar>
      <div className={Styles.usersWrap}>
        <TextField
          type="text"
          value={searchValue}
          fullWidth={true}
          placeholder="Search"
          variant="outlined"
          onChange={({ target: { value } }) => setSearchValue(value)}
          className={Styles.search}
        />
        <div className={Styles.usersContainer}>
          <h2 className={Styles.title}>Users:</h2>
          <ul className={Styles.users}>
            {users.map(user => (
              <li key={user.Id}>
                <div className={Styles.user}>
                  <Avatar className={Styles.avatar}>
                    {user.FirstName[0]}
                    {user.LastName[0]}
                  </Avatar>
                  {user.FirstName} {user.LastName}
                </div>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push(`/match/${user.Id}`);
                  }}
                >
                  Match
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};

export default Users;
