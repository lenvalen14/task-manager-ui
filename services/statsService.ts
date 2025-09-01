// services/userStatsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { UserStats, ApiResponse } from "@/types/statsType"

export const userStatsApi = createApi({
    reducerPath: "userStatsApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["UserStats"],
    endpoints: (builder) => ({
        getUserStats: builder.query<ApiResponse<UserStats>, void>({
            query: () => ({
                url: "/user/stats/",   // API backend
                method: "GET",
            }),
            providesTags: ["UserStats"],
        }),
    }),
})

export const { useGetUserStatsQuery } = userStatsApi
