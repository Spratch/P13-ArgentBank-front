import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface LoginError {
  message: string;
}

export const loginApi = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: LoginError }
>("auth/loginAsync", async (credentials: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!data.body.token) {
      return rejectWithValue(data.message || "Login failed");
    }
    localStorage.setItem("token", data.body.token);
    return data.body;
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Login failed";
    }
    return rejectWithValue({ message });
  }
});

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.message : "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
