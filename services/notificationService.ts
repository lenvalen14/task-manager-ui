import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"
import {
  APIResponse,
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
} from "@/types/notification"

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notifications"],

  endpoints: (builder) => ({
    getNotifications: builder.query<{ data: Notification[] }, void>({
      query: () => ({
        url: "/notifications/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({
              type: "Notifications" as const,
              id,
            })),
            { type: "Notifications", id: "LIST" },
          ]
          : [{ type: "Notifications", id: "LIST" }],
    }),

    getUnreadCount: builder.query<APIResponse<UnreadCountResponse>, void>({
      query: () => ({
        url: "/notifications/unread_count/",
        method: "GET",
      }),
      providesTags: [{ type: "Notifications", id: "UnreadCount" }],
    }),

    markAsRead: builder.mutation<{ message: string; notification_id: number }, number>({
      query: (id) => ({
        url: `/notifications/${id}/mark_as_read/`,
        method: "POST",
      }),
      invalidatesTags: (r, e, id) => [
        { type: "Notifications", id },
        { type: "Notifications", id: "UnreadCount" },
      ],
    }),

    markAllAsRead: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `/notifications/mark_all_as_read/`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "Notifications", id: "LIST" },
        { type: "Notifications", id: "UnreadCount" },
      ],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi
