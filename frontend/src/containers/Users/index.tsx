import React, { FC, useEffect, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import { useDispatch, useSelector } from 'src/store/hooks';
import { getUsers } from 'src/store/actions/users';

import Sidebar from 'src/components/Sidebar';

import { IProps } from './interface';

import Styles from './styles.module.scss';

const Users: FC<IProps> = () => {
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
                <Avatar className={Styles.avatar}>
                  {user.FirstName[0]}
                  {user.LastName[0]}
                </Avatar>
                {user.FirstName} {user.LastName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};

export default Users;
