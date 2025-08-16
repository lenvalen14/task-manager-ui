import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { Task, TaskCreateResponse, TaskCreateRequset, TaskUpdateRequset, TaskUpdateResponse, TaskCreateAllRequest, Status, UpdatteStatusSubTaskResponse } from "@/types/taskType";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createTask: builder.mutation<TaskCreateResponse, TaskCreateRequset>({
            query: (body) => ({
                url: "/tasks/",
                method: "POST",
                body,
            }),
        }),
        createAllOfTask: builder.mutation<TaskCreateResponse, TaskCreateAllRequest>({
            query: (body) => ({
                url: "/tasks/",
                method: "POST",
                body,
            })
        }),
        updateTask: builder.mutation<TaskUpdateResponse, { id: number; body: TaskUpdateRequset }>({
            query: ({ id, body }) => ({
                url: `/tasks/${id}/`,
                method: "PUT",
                body,
            }),
        }),
        updateStatusTask: builder.mutation<UpdatteStatusSubTaskResponse, { id: number; body: { status: string } }>({
            query: ({ id, body }) => ({
                url: `/tasks/${id}/toggle-status/`,
                method: "PATCH",
                body,
            }),
        }),
        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}/`,
                method: "DELETE",
            }),
        })
    }),
})

export const {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useCreateAllOfTaskMutation,
    useUpdateStatusTaskMutation,
} = taskApi
