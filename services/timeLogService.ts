import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"

type TimeLog = {
  id: number
  task: number
  user: number
  start_time: string
  end_time?: string | null
  duration?: number | null
  status: "RUNNING" | "PAUSED" | "STOPPED"
}

export const timeLogApi = createApi({
  reducerPath: "timeLogApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["TimeLogs"],
  endpoints: (builder) => ({
    startTimeLog: builder.mutation<TimeLog, { taskId: number }>({
      query: (body) => ({
        url: "/timelogs/start/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TimeLogs", id: "LIST" }],
    }),
    pauseTimeLog: builder.mutation<TimeLog, { timelogId: number }>({
      query: (body) => ({
        url: "/timelogs/pause/",
        method: "POST",
        body,
      }),
      invalidatesTags: (r, e, arg) => [{ type: "TimeLogs", id: arg.timelogId }],
    }),
    stopTimeLog: builder.mutation<TimeLog, { timelogId: number }>({
      query: (body) => ({
        url: "/timelogs/stop/",
        method: "POST",
        body,
      }),
      invalidatesTags: (r, e, arg) => [
        { type: "TimeLogs", id: arg.timelogId },
        { type: "TimeLogs", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useStartTimeLogMutation,
  usePauseTimeLogMutation,
  useStopTimeLogMutation,
} = timeLogApi


