import { createSlice } from '@reduxjs/toolkit';
import exp from 'constants';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
