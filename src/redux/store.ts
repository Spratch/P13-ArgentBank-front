import { configureStore, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./services";

// Profile
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    accounts: []
  },
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    }
  }
});

// Store
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    profile: profileSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

export default store;
