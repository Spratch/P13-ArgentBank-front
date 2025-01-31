import { configureStore, createSlice } from "@reduxjs/toolkit";

// Authentication
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

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
    authentication: authenticationSlice.reducer,
    profile: profileSlice.reducer
  }
});

export default store;
