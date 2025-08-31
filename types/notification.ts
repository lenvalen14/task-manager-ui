export interface Notification {
    id: number
    title: string
    notification_type?: NotificationType | null
    message: string
    is_read: boolean
    created_at: string
    updated_at: string
    deadline?: string | null
    task_id?: number | null
    task_title?: string | null
}

export type NotificationType = "deadline" | "completed" | "milestone" | "overdue"

export interface NotificationListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Notification[]
}
export interface APIResponse<T> {
    code: number
    message: string
    data: T
}

export interface UnreadCountResponse {
  unread_count: number
}
