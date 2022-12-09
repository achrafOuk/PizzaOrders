import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
};
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("login:", action.payload); state.username = action.payload.username;
    },
    setLogout: (state) => {
      state.username = "";
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;

export const orderAction = loginSlice.actions;
let loginReducer = loginSlice.reducer;

export default loginReducer;
