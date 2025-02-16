import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth.slice";
import { profileReducer } from "./features/profile.slice";
import { updateReducer } from "./features/update.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    update: updateReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
