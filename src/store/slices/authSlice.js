import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  refreshToken: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    clearCredientials: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setCredientials, clearCredientials } = authSlice.actions;
export default authSlice.reducer;
