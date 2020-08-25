import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'src/store/hooks';
import { getUsers } from 'src/store/actions/users';

import { IProps } from './interface';

const Users: FC<IProps> = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users);

  useEffect(() => {
    (async () => {
      if (users.length) return;
      await dispatch(getUsers());
    })();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.Id}>
          {user.FirstName} {user.LastName}
        </li>
      ))}
    </ul>
  );
};

export default Users;
