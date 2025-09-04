import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"
import { Tag, TagCreateRequest, TagCreateResponse } from "@/types/taskType";

export const tagApi = createApi({
    reducerPath: "tagApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Tags"],
    endpoints: (builder) => ({
        createTag: builder.mutation<TagCreateResponse, TagCreateRequest>({
            query: (body) => ({
                url: "/tags/",
                method: "POST",
                body,
            }),
            invalidatesTags: (r, e, body) => [{ type: "Tags", id: `task-${String(body.task)}` }],
        }),
        deleteTag: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tags/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [{ type: "Tags", id }],
        })
    }),
})

export const {
    useCreateTagMutation,
    useDeleteTagMutation,
} = tagApi
