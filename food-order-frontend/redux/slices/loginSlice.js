import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("login:", action.payload);
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    setLogout: (state, action) => {
      state.username = "";
      state.token = "";
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;

export const orderAction = loginSlice.actions;
let loginReducer = loginSlice.reducer;

export default loginReducer;
