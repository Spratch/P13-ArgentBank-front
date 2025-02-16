import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UpdateState {
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
  user: {
    firstName: string;
    lastName: string;
  } | null;
}

interface UpdateRequest {
  token: string | null;
  body: {
    firstName: string;
    lastName: string;
  };
}

export const updateApi = createAsyncThunk<
  { firstName: string; lastName: string },
  UpdateRequest,
  { rejectValue: string }
>("update/fetchUpdate", async (payload: UpdateRequest, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`
      },
      body: JSON.stringify(payload.body)
    });

    const data = await response.json();

    if (!data.body) {
      return rejectWithValue(data.message || "Failed to update profile");
    }

    return data.body;
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Login failed";
    }
    return rejectWithValue(message);
  }
});

const initialState: UpdateState = {
  status: "idle",
  message: null,
  user: null
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateApi.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      });
  }
});

export const updateReducer = updateSlice.reducer;
