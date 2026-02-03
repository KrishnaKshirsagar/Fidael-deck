import { baseApi } from "../api/baseApi";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<{ message: string }, SendOtpRequest>({
      query: (credentials) => ({
        url: "/auth/send_otp",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      query: (credentials) => ({
        url: "/auth/verify_otp",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
