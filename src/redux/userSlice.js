import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setNewToken: (state, action) => {
      state.currentUser.accessToken = action.payload;
    },
    logOut: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, setNewToken, logOut } = userSlice.actions;
export default userSlice.reducer;
