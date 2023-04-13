import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormHook, { User } from '../components/Form';
import UserCard from '../components/UserCard';
import { selectUsers, addUser as addUserToGlobalStore } from '../features/users';

const Users = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const successMessage = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  };

  const addUser: (user: User) => void = async (user) => {
    successMessage();
    dispatch(addUserToGlobalStore(user));
  };

  return (
    <div className="page" id="user-page">
      {success && <div className="success-message">The user was successfully added</div>}
      <FormHook addUser={addUser} />
      <div className="cards user-cards">
        {users.map((user, i) => (
          <UserCard {...user} key={i + user.lastname} />
        ))}
      </div>
    </div>
  );
};

export default Users;
