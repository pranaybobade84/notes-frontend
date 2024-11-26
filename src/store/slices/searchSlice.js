import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, { payload }) => {
      state.query = payload.query;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
