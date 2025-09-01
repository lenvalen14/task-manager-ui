import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"

import {
  RequestPasswordOtpRequest,
  RequestPasswordOtpResponse,
  VerifyPasswordOtpRequest,
  VerifyPasswordOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/types/passwordType"

export const passwordApi = createApi({
  reducerPath: "passwordApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Password"],
  endpoints: (builder) => ({
    requestPasswordOtp: builder.mutation<RequestPasswordOtpResponse, RequestPasswordOtpRequest>({
      query: (body) => ({
        url: "/users/send-otp/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Password"],
    }),

    verifyPasswordOtp: builder.mutation<VerifyPasswordOtpResponse, VerifyPasswordOtpRequest>({
      query: (body) => ({
        url: "/users/verify-otp/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Password"],
    }),

    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/users/reset-password/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Password"],
    }),

    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: "/users/forgot-password/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Password"],
    }),
  }),
})

export const {
  useRequestPasswordOtpMutation,
  useVerifyPasswordOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = passwordApi
