import { useEffect, useRef } from "react"
import { useNotificationToast } from "@/components/notification/NotificationToast"
import { useAppDispatch } from "@/hooks/redux"
import { notificationApi } from "@/services/notificationService"
import type { Notification, NotificationType } from "@/types/notification"

const RECONNECT_DELAY = 5000

export function useAppSocket(token: string | null) {
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()
  const { showNotificationToast } = useNotificationToast()

  useEffect(() => {
    if (!token) {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
      socketRef.current?.close()
      socketRef.current = null
      return
    }

    const connect = () => {
      const wsUrl = `ws://localhost:8000/ws/notifications/?token=${token}`
      const socket = new WebSocket(wsUrl)
      socketRef.current = socket

      socket.onopen = () => {
        console.log("🔌 Connected to notification WS")
      }

      socket.onmessage = (event) => {
        try {
          const newNotification: Notification = JSON.parse(event.data)
          if (!newNotification.id) return

          showNotificationToast({
            type: (newNotification.notification_type as NotificationType) ?? "info",
            message: newNotification.message,
            deadline: newNotification.deadline,
          })

          dispatch(
            notificationApi.util.updateQueryData("getNotifications", undefined, (draft) => {
              draft.data.unshift(newNotification)
            })
          )

          dispatch(
            notificationApi.util.updateQueryData("getUnreadCount", undefined, (draft) => {
              draft.data.unread_count += 1
            })
          )
        } catch (err) {
          console.error("Invalid notification:", event.data, err)
        }
      }

      socket.onclose = () => {
        console.log(`WS Disconnected. Retrying in ${RECONNECT_DELAY / 1000}s...`)
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = setTimeout(() => {
          if (socketRef.current?.readyState !== WebSocket.OPEN) {
            connect()
          }
        }, RECONNECT_DELAY)
      }

      socket.onerror = (err) => {
        console.error("WebSocket error:", err)
        socket.close()
      }
    }

    connect()

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
      socketRef.current?.close()
    }
  }, [token, dispatch, showNotificationToast])
}