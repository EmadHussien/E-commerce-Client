import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    setNewToken: (state, action) => {
      console.log(action.payload);
      state.currentUser.accessToken = action.payload;
    },
    logOut: (state, action) => {
      console.log(action.payload);
      state.currentUser = null;
    },
  },
});

export const { addUser, setNewToken, logOut } = userSlice.actions;
export default userSlice.reducer;
