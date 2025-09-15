"use client"

import { useEffect, useRef } from "react"
import { useNotificationToast } from "@/components/notification/NotificationToast"
import { useAppDispatch } from "@/hooks/redux"
import { notificationApi } from "@/services/notificationService"
import type { Notification, NotificationType } from "@/types/notification"

const RECONNECT_DELAY = 5000

// Map WS type -> NotificationType (FE)
function mapWsTypeToNotificationType(wsType: string): NotificationType {
  switch (wsType) {
    case "task_due_soon_notification":
      return "deadline"
    case "task_overdue_notification":
      return "overdue"
    case "task_completed_notification":
      return "completed"
    default:
      return "milestone"
  }
}

function mapWsToNotification(raw: any): Notification {
  return {
    id: raw.notification_id,
    title: raw.task_title || "Notification",
    notification_type: mapWsTypeToNotificationType(raw.type),
    message: raw.message,
    is_read: false,
    created_at: raw.timestamp,
    updated_at: raw.timestamp,
    deadline: raw.deadline ?? null,
    task_id: raw.task_id ?? null,
    task_title: raw.task_title ?? null,
  }
}

export function useAppSocket(token?: string | null) {
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()
  const { showNotificationToast } = useNotificationToast()
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL

  useEffect(() => {
    if (!token) return

    let isMounted = true

    function connect() {
      const url = `${WS_URL}?token=${token}`
      const socket = new WebSocket(url)
      socketRef.current = socket

      socket.onopen = () => {
        console.log("🔌 Connected to notification WS")
      }

      socket.onmessage = (event) => {
        console.log("📩 WS Message raw:", event.data)
        try {
          const raw = JSON.parse(event.data)

          if (raw.type === "connection_established") {
            console.log("✅ WS Connected:", raw.message)
            return
          }

          const newNotification = mapWsToNotification(raw)
          console.log("📦 Parsed notification:", newNotification)

          console.log("🔥 Trigger toast:", newNotification)
          showNotificationToast({
            type: newNotification.notification_type ?? "deadline",
            message: newNotification.message,
            deadline: newNotification.deadline,
          })

          dispatch(
            notificationApi.util.updateQueryData(
              "getNotifications",
              undefined,
              (draft) => {
                draft.data.unshift(newNotification)
              }
            )
          )

          dispatch(
            notificationApi.util.updateQueryData(
              "getUnreadCount",
              undefined,
              (draft) => {
                draft.data.unread_count += 1
              }
            )
          )
        } catch (err) {
          console.error("❌ Invalid notification:", event.data, err)
        }
      }

      socket.onerror = () => {
        console.warn("⚠️ WebSocket connection failed")
      }

      socket.onclose = () => {
        console.log("🔌 WS Disconnected. Retrying in 5s...")
        if (isMounted) {
          reconnectTimeout.current = setTimeout(connect, RECONNECT_DELAY)
        }
      }
    }

    connect()

    return () => {
      isMounted = false
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current)
      }
    }
  }, [token, dispatch, showNotificationToast])
}
