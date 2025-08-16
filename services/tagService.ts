import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { Tag, TagCreateRequest, TagCreateResponse } from "@/types/taskType";

export const tagApi = createApi({
    reducerPath: "tagApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createTag: builder.mutation<TagCreateResponse, TagCreateRequest>({
            query: (body) => ({
                url: "/tags/",
                method: "POST",
                body,
            }),
        }),
        deleteTag: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tags/${id}/`,
                method: "DELETE",
            }),
        })
    }),
})

export const {
    useCreateTagMutation,
    useDeleteTagMutation,
} = tagApi
