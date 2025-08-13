import { createApi } from "@reduxjs/toolkit/query/react"
import { LoginRequest, LoginResponse, RefreshTokenResponse, RefreshTokenRequest, RegisterRequest, RegisterResponse } from "../types/auth"
import { baseQueryWithAuth } from "./baseQuery"
import { register } from "module"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login/",
                method: "POST",
                body,
            }),
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: "/token/refresh/",
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: "/auth/register/",
                method: "POST",
                body,
            })
        }),
    }),
})

export const { useLoginMutation, useRefreshTokenMutation, useRegisterMutation } = authApi
