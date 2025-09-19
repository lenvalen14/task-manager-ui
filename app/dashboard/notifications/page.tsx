"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, ArrowLeft, XCircle, Star, Check, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  
  const { data, isLoading, isError } = useGetNotificationsQuery({ 
    page: currentPage, 
    pageSize 
  })
  const [markAsRead, { isLoading: isMarkingRead }] = useMarkAsReadMutation()
  const [markAllAsRead, { isLoading: isMarkingAllRead }] = useMarkAllAsReadMutation()

  const notifications = data?.data || []
  const totalItems = data?.meta?.count || 0
  const totalPages = Math.ceil(totalItems / pageSize)
  const hasNext = data?.meta?.next !== null
  const hasPrevious = data?.meta?.previous !== null
  const hasUnread = notifications.some(n => !n.is_read)

  // Handle pagination errors
  const isValidPage = !isError || (data?.code !== 404)

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page)
    }
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
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

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleMarkAllAsRead}
              disabled={!hasUnread || isMarkingAllRead}
              className="border-2 border-black shadow-md"
            >
              <Check className="mr-2 h-4 w-4" />
              Đánh dấu tất cả đã đọc
            </Button>
          </div>
          
          {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Hiển thị:</span>
              <select 
                value={pageSize} 
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-3 py-1 border-2 border-black rounded-lg font-medium bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">mỗi trang</span>
            </div>
        </div>
      </div>

      <div className="px-8 pt-8 pb-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-center text-gray-500">Đang tải thông báo...</p>
          </div>
        ) : isError ? (
          <div className="text-center mt-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-500 font-medium mb-2">Không thể tải thông báo</p>
            <p className="text-gray-500 text-sm mb-4">
              {data?.code === 404 ? "Trang không tồn tại" : "Vui lòng thử lại sau"}
            </p>
            <Button 
              onClick={() => {
                if (data?.code === 404 && currentPage > 1) {
                  setCurrentPage(1)
                } else {
                  window.location.reload()
                }
              }}
              className="border-2 border-black shadow-md"
            >
              {data?.code === 404 && currentPage > 1 ? "Về trang đầu" : "Thử lại"}
            </Button>
          </div>
        ) : notifications.length > 0 ? (
          <>
            {/* Notifications List */}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevious}
                  className="border-2 border-black shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Trang trước</span>
                </Button>

                {/* First page */}
                {generatePageNumbers()[0] > 1 && (
                  <>
                    <Button
                      variant={1 === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      className="border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 min-w-[2.5rem]"
                    >
                      1
                    </Button>
                    {generatePageNumbers()[0] > 2 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Page numbers */}
                {generatePageNumbers().map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 min-w-[2.5rem] ${
                      pageNum === currentPage 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-600" 
                        : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}

                {/* Last page */}
                {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages && (
                  <>
                    {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages - 1 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <Button
                      variant={totalPages === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 min-w-[2.5rem]"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNext}
                  className="border-2 border-black shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Trang sau</span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-500 font-medium">Bạn không có thông báo mới nào</p>
            <p className="text-gray-400 text-sm mt-2">Chúng tôi sẽ thông báo khi có cập nhật mới ✨</p>
          </div>
        )}
      </div>
    </div>
  )
}