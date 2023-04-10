import React, { useState } from 'react';

import FormHook, { User } from '../components/Form';
import UserCard from '../components/UserCard';

interface UsersState {
  users: User[];
  success: boolean;
}

const Users = () => {
  const initialState: UsersState = {
    users: [],
    success: false,
  };

  const [state, setState] = useState<UsersState>(initialState);

  const successMessage = () => {
    setState((state) => ({
      ...state,
      success: true,
    }));
    setTimeout(() => {
      setState((state) => ({ ...state, success: false }));
    }, 3500);
  };

  const addUser: (user: User) => void = async (user) => {
    successMessage();
    setState((state) => ({
      ...state,
      users: [...state.users, user],
    }));
  };

  return (
    <div className="page" id="user-page">
      {state.success && <div className="success-message">The user was successfully added</div>}
      <FormHook addUser={addUser} />
      <div className="cards user-cards">
        {state.users.map((user, i) => (
          <UserCard {...user} key={i + user.lastname} />
        ))}
      </div>
    </div>
  );
};

export default Users;
