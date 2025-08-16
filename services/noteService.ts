import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { Note, NoteCreateRequest, NoteCreateResponse } from "@/types/taskType";

export const noteApi = createApi({
    reducerPath: "noteApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createNote: builder.mutation<NoteCreateResponse, NoteCreateRequest>({
            query: (body) => ({
                url: "/notes/",
                method: "POST",
                body,
            }),
        }),
        deleteNote: builder.mutation<void, number>({
            query: (id) => ({
                url: `/notes/${id}/`,
                method: "DELETE",
            }),
        })
    }),
})

export const {
    useCreateNoteMutation,
    useDeleteNoteMutation,
} = noteApi
