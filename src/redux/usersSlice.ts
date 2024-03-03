import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../components/Form';

type UsersStateType = {
  userList: User[];
};

const initialState: UsersStateType = {
  userList: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: { payload: User }) => {
      state.userList.push(action.payload);
    },
  },
});

export default users.reducer;

export const { addUser } = users.actions;

export const selectUsers = (state: RootState) => state.users.userList;
