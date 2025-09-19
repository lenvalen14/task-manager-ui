"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, ArrowLeft, XCircle, Star, Check } from "lucide-react"
import Link from "next/link"
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/services/notificationService"

const typeConfig = {
  due_soon: { icon: Clock, color: "text-orange-600", bgColor: "bg-orange-300" },
  completed: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-300" },
  overdue: { icon: XCircle, color: "text-red-600", bgColor: "bg-red-300" },
  default: { icon: Bell, color: "text-gray-500", bgColor: "bg-gray-300" },
}

const getNotificationConfig = (title: string) => {
  const lowerCaseTitle = title.toLowerCase()
  if (lowerCaseTitle.includes("overdue")) return typeConfig.overdue
  if (lowerCaseTitle.includes("due soon")) return typeConfig.due_soon
  if (lowerCaseTitle.includes("completed")) return typeConfig.completed
  return typeConfig.default
}

export default function NotificationsPage() {
  const { data, isLoading, isError } = useGetNotificationsQuery()
  const [markAsRead, { isLoading: isMarkingRead }] = useMarkAsReadMutation()
  const [markAllAsRead, { isLoading: isMarkingAllRead }] = useMarkAllAsReadMutation()

  const notifications = data?.data || []
  const hasUnread = notifications.some(n => !n.is_read)

  const handleMarkAllAsRead = async () => {
    if (!hasUnread) return
    try {
      await markAllAsRead().unwrap()
    } catch (err) {
      console.error("Không thể đánh dấu tất cả đã đọc:", err)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id).unwrap()
    } catch (err) {
      console.error("Không thể đánh dấu đã đọc:", err)
    }
  }

  return (
    <div className="flex-1 min-h-screen overflow-auto bg-white w-full">
      {/* Header */}
      <div className="relative px-8 pt-6 pb-8">
        <div className="absolute top-4 right-8"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" /></div>
        <div className="absolute top-8 right-16"><Star className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse delay-300" /></div>
        <div className="absolute top-6 right-24"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse delay-700" /></div>

        <div className="flex items-center gap-8 mb-4">
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200">
            <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /><span className="sr-only">Quay lại Dashboard</span></Link>
          </Button>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white border-4 border-black shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Bell className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-black rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900">
                {notifications.filter(n => !n.is_read).length}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Thông báo</h1>
              <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                Luôn cập nhật tiến độ công việc! 🔔
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={handleMarkAllAsRead}
            disabled={!hasUnread || isMarkingAllRead}
            className="border-2 border-black shadow-md"
          >
            <Check className="mr-2 h-4 w-4" />
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </div>

      <div className="px-8 pt-8 pb-12">
        {isLoading ? (
          <p className="text-center text-gray-500 mt-8">Đang tải thông báo...</p>
        ) : isError ? (
          <p className="text-center text-red-500 mt-8">Không thể tải thông báo. Vui lòng thử lại.</p>
        ) : notifications.length > 0 ? (
          <div className="grid gap-6">
            {notifications.map((notification) => {
              const config = getNotificationConfig(notification.title)
              const IconComponent = config.icon
              return (
                <Card key={notification.id} className={`group shadow-lg border-2 border-black rounded-2xl transition-opacity ${notification.is_read ? "opacity-60 bg-gray-50" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center border-2 border-black flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(notification.created_at).toLocaleString("vi-VN")}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={isMarkingRead}
                        >
                          Đánh dấu đã đọc
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">Bạn không có thông báo mới nào. ✨</p>
        )}
      </div>
    </div>
  )
}
