"use client"

import { useToast } from "@/components/ui/use-toast"
import { Clock, CheckCircle, Flag, XCircle, Bell } from "lucide-react"

type NotificationType = "deadline" | "completed" | "milestone" | "overdue"

const typeConfig: Record<
  NotificationType,
  { icon: any; title: string; variant?: "default" | "destructive" }
> = {
  deadline: { icon: Clock, title: "⏰ Deadline Approaching", variant: "default" },
  completed: { icon: CheckCircle, title: "✅ Task Completed", variant: "default" },
  milestone: { icon: Flag, title: "🚩 Milestone Reached", variant: "default" },
  overdue: { icon: XCircle, title: "⚠️ Task Overdue", variant: "destructive" },
}

export function useNotificationToast() {
  const { toast } = useToast()

  function showNotificationToast({
    type,
    message,
    deadline,
  }: {
    type: NotificationType
    message: string
    deadline?: string | null
  }) {
    const config = typeConfig[type] || {
      icon: Bell,
      title: "🔔 Notification",
      variant: "default" as const,
    }
    const Icon = config.icon

    toast({
      title: config.title,
      description: (
        <div>
          <p>{message}</p>
          {deadline && <p className="text-xs text-gray-500">Due: {deadline}</p>}
        </div>
      ),
      variant: config.variant,
      duration: 5000,
    })
  }

  return { showNotificationToast }
}
