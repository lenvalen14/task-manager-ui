export interface TimeSummaryData {
  total_seconds: number;
  total_minutes: number;
  total_hours: number;
  formatted_time: string;
  logs_count: number;
}

export interface TaskReport {
  task_id: number
  title: string
  total_minutes: number
}

export interface TaskReportResponse {
  code: number
  message: string
  data: TaskReport[]
  meta: any
  errors: any
}

export interface ChartDataPoint {
  date: string
  total_duration_hours: number
}
