import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    setMenuState: (state, { payload }) => {
      state.isOpen = payload;
    },
  },
});

export const { toggleMenu, setMenuState } = menuSlice.actions;
export default menuSlice.reducer;
