import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.myUser = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const selectCurrentUser = state => state.user.myUser

export default userSlice.reducer;
