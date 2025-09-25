import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"
import { ChartDataPoint, TaskReportResponse } from "../types/timeLogType"
type TimeLog = {
  id: number
  task: number
  user: number
  start_time: string
  end_time?: string | null
  duration?: number | null
  status: "RUNNING" | "PAUSED" | "STOPPED"
}

type TaskReportArgs = {
  taskId: number,
  includeRunning?: boolean
}

export interface TaskTimeReport {
  total_seconds: number
  total_minutes: number
  total_hours: number
  formatted_time: string
  logs_count: number
}

interface APIResponse<T> {
  code: number
  message: string
  data: T
}

export const timeLogApi = createApi({
  reducerPath: "timeLogApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TimeLogs", "TaskReport"],
  endpoints: (builder) => ({
    startTimeLog: builder.mutation<APIResponse<TimeLog>, { taskId: number }>({
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
    getTaskTimeReport: builder.query<APIResponse<TaskTimeReport>, TaskReportArgs>({
      query: ({ taskId, includeRunning }) => ({

        url: "/timelogs/tasks/",
        params: {
          task_id: taskId,
          include_running: includeRunning,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "TaskReport", id: arg.taskId },
      ],
    }),
    getTaskReports: builder.query<TaskReportResponse, { include_running?: boolean }>({
      query: ({ include_running = false }) => ({
        url: `/tasks/list_time-report/`,
        params: { include_running },
      }),
      providesTags: ["TaskReport"],
    }),
    getDailySummary: builder.query<APIResponse<ChartDataPoint[]>, { startDate?: string; endDate?: string } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.startDate) {
          searchParams.append('start_date', params.startDate);
        }
        if (params?.endDate) {
          searchParams.append('end_date', params.endDate);
        }
        
        const queryString = searchParams.toString();
        
        return {
          url: `/stats/daily-timelog-summary/${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        const dataArray = Array.isArray(result?.data) ? result.data : [];
        return dataArray.length
          ? dataArray.map(() => ({ type: 'TimeLogs' as const, id: 'LIST' }))
          : [{ type: 'TimeLogs', id: 'LIST' }];
      }
    }),
  }),
})

export const {
  useStartTimeLogMutation,
  usePauseTimeLogMutation,
  useStopTimeLogMutation,
  useGetTaskTimeReportQuery,
  useGetTaskReportsQuery,
  useGetDailySummaryQuery,
} = timeLogApi


