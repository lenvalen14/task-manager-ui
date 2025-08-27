import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { Note, NoteCreateRequest, NoteCreateResponse } from "@/types/taskType";

export const noteApi = createApi({
    reducerPath: "noteApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        createNote: builder.mutation<NoteCreateResponse, NoteCreateRequest>({
            query: (body) => ({
                url: "/notes/",
                method: "POST",
                body,
            }),
            invalidatesTags: (r, e, body) => [{ type: "Notes", id: `task-${String(body.task)}` }],
        }),
        deleteNote: builder.mutation<void, number>({
            query: (id) => ({
                url: `/notes/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [{ type: "Notes", id }],
        })
    }),
})

export const {
    useCreateNoteMutation,
    useDeleteNoteMutation,
} = noteApi
