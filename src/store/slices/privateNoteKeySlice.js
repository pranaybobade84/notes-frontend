import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerified: false,
};

const privateNotekeySlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    isKeyVerified: (state, { payload }) => {
      state.isVerified = payload?.isVerified;
    },
  },
});

export const { isKeyVerified } = privateNotekeySlice.actions;
export default privateNotekeySlice.reducer;
