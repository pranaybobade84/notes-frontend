import { createSlice } from "@reduxjs/toolkit";

const openEditModalSlice = createSlice({
  name: "modal",
  initialState: {
    isShown: false,
    type: null,
    data: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.isShown = true;
      state.type = payload.type || "add";
      state.data = payload.data || null;
    },
    closeModal: (state) => {
      state.isShown = false;
      state.type = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = openEditModalSlice.actions;
export default openEditModalSlice.reducer;
