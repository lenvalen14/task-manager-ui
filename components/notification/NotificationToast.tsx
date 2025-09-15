"use client"

import { toast } from "sonner"
import { Clock, CheckCircle, Flag, XCircle, Bell } from "lucide-react"
import { format } from "date-fns"

type NotificationType = "deadline" | "completed" | "milestone" | "overdue"

const typeConfig: Record<
  NotificationType,
  { icon: any; title: string }
> = {
  deadline: { icon: Clock, title: "⏰ Deadline Approaching" },
  completed: { icon: CheckCircle, title: "✅ Task Completed" },
  milestone: { icon: Flag, title: "🚩 Milestone Reached" },
  overdue: { icon: XCircle, title: "⚠️ Task Overdue" },
}

export function useNotificationToast() {
  function showNotificationToast({
    type,
    message,
    deadline,
  }: {
    type: NotificationType
    message: string
    deadline?: string | null
  }) {
    const config = typeConfig[type] || { icon: Bell, title: "🔔 Notification" }
    const Icon = config.icon

    let formattedDeadline: string | null = null
    if (deadline) {
      try {
        formattedDeadline = format(new Date(deadline), "dd MMM yyyy, HH:mm")
      } catch {
        formattedDeadline = deadline
      }
    }

    toast(
      <div className="flex items-start gap-2">
        <Icon className="h-5 w-5 mt-1" />
        <div>
          <p className="font-medium">{config.title}</p>
          <p>{message}</p>
          {formattedDeadline && (
            <p className="text-xs text-gray-500">Due: {formattedDeadline}</p>
          )}
        </div>
      </div>,
      { duration: 5000 }
    )
  }

  return { showNotificationToast }
}
