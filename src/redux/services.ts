import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
  body: {
    token: string;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/user"
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials
      })
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET"
      })
    })
  })
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
