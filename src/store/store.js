import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import menuReducer from "./slices/menuSlice";
import modalReducer from "./slices/openAddEditModalSlice";
import authReducer from "./slices/authSlice";
import privateKeyReducer from "./slices/privateNoteKeySlice";
import searchQueryReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    modal: modalReducer,
    auth: authReducer,
    privateKey: privateKeyReducer,
    searchQuery: searchQueryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
