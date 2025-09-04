import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"
import { Task, TaskCreateResponse, TaskCreateRequset, TaskUpdateRequset, TaskUpdateResponse, TaskCreateAllRequest, Status, UpdatteStatusSubTaskResponse, TaskListResponse } from "@/types/taskType";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<TaskListResponse, void>({
            query: () => ({
                url: "/tasks/",
                method: "GET",
            }),
            providesTags: (result) => {
                const list = result?.data ?? []
                return [
                    { type: "Tasks" as const, id: "LIST" },
                    ...list.map((t) => ({ type: "Tasks" as const, id: t.id })),
                ]
            },
        }),
        createTask: builder.mutation<TaskCreateResponse, TaskCreateRequset>({
            query: (body) => ({
                url: "/tasks/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],
        }),
        createAllOfTask: builder.mutation<TaskCreateResponse, TaskCreateAllRequest>({
            query: (body) => ({
                url: "/tasks/",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],
        }),
        updateTask: builder.mutation<TaskUpdateResponse, { id: number; body: TaskUpdateRequset }>({
            query: ({ id, body }) => ({
                url: `/tasks/${id}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (r, e, arg) => [{ type: "Tasks", id: arg.id }],
        }),
        updateStatusTask: builder.mutation<UpdatteStatusSubTaskResponse, { id: number; body: { status: string } }>({
            query: ({ id, body }) => ({
                url: `/tasks/${id}/toggle-status/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (r, e, arg) => [{ type: "Tasks", id: arg.id }],
        }),
        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [
                { type: "Tasks", id },
                { type: "Tasks", id: "LIST" },
            ],
        })
    }),
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useCreateAllOfTaskMutation,
    useUpdateStatusTaskMutation,
} = taskApi
