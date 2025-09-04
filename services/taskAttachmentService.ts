import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"
import {
    TaskAttachmentCreateRequest,
    TaskAttachmentCreateResponse,
    TaskAttachmentDeleteResponse,
} from "@/types/taskAttachmentType"

export const taskAttachmentApi = createApi({
    reducerPath: "taskAttachmentApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["TaskAttachments"],
    endpoints: (builder) => ({
        // Tạo mới (upload file đính kèm)
        createTaskAttachment: builder.mutation<
            TaskAttachmentCreateResponse,
            TaskAttachmentCreateRequest
        >({
            query: ({ taskId, file, fileName }) => {
                const formData = new FormData()
                formData.append("task", String(taskId))
                formData.append("file", file)
                formData.append("file_name", fileName)  // thêm field file_name
                // taskId sẽ lấy từ URL
                return {
                    url: `/tasks/${taskId}/attachments/`, // URL có taskId
                    method: "POST",
                    body: formData,
                }
            },
            invalidatesTags: [{ type: "TaskAttachments", id: "LIST" }],
        }),

        // Xóa attachment
        deleteTaskAttachment: builder.mutation<
            TaskAttachmentDeleteResponse,
            number
        >({
            query: (id) => ({
                url: `/task-attachments/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [
                { type: "TaskAttachments", id },
                { type: "TaskAttachments", id: "LIST" },
            ],
        }),
    }),
})

export const {
    useCreateTaskAttachmentMutation,
    useDeleteTaskAttachmentMutation,
} = taskAttachmentApi
