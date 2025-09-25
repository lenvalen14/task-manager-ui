import {
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import {
    refreshRequest,
    refreshSuccess,
    refreshFailure,
    logout,
} from "../lib/slices/authSlice"
import { RefreshTokenRequest, RefreshTokenResponse } from "../types/authType"

// baseQuery gốc: luôn gắn access_token từ localStorage
const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_SERVER,
    prepareHeaders: (headers, { endpoint }) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        // bỏ Content-Type cho mấy endpoint upload file
        const skipEndpoints = ["updateUser", "uploadAvatar", "createTaskAttachment"]
        if (!skipEndpoints.includes(endpoint)) {
            headers.set("Content-Type", "application/json")
        }

        return headers
    },
})

// wrapper có xử lý refresh token
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        api.dispatch(refreshRequest())
        const refresh = localStorage.getItem("refresh_token")

        if (!refresh) {
            api.dispatch(refreshFailure("No refresh token found"))
            api.dispatch(logout())
            return result
        }

        const refreshBody: RefreshTokenRequest = { refresh }

        const refreshResult = await rawBaseQuery(
            {
                url: "/token/refresh/",
                method: "POST",
                body: refreshBody,
            } as FetchArgs,
            api,
            extraOptions
        )

        if (refreshResult.data) {
            const data = refreshResult.data as RefreshTokenResponse
            const newAccess = data.data.access

            api.dispatch(refreshSuccess(data))
            localStorage.setItem("accessToken", newAccess)

            // retry request cũ
            result = await rawBaseQuery(args, api, extraOptions)
        } else {
            api.dispatch(refreshFailure("Refresh failed"))
            api.dispatch(logout())
        }
    }

    return result
}
