import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  } | null;
}

export const profileApi = createAsyncThunk(
  "profile/fetchProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!data.body) {
        return rejectWithValue(data.message || "Failed to fetch profile");
      }

      return data.body;
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = "Failed to fetch profile";
      }
      return rejectWithValue({ message });
    }
  }
);

const initialState: ProfileState = {
  status: "idle",
  message: null,
  user: null
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profileApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(profileApi.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "Failed to fetch profile";
      });
  }
});

export const profileReducer = profileSlice.reducer;
