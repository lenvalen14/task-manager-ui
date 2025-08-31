"use client"

import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, Flag, ArrowLeft, XCircle, Star, RefreshCw, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useNotifications } from "@/lib/contexts/NotificationContext"
import { useState } from "react"
import { formatNotificationTime } from "@/lib/utils/notificationUtils"
import { useWebSocket } from "@/hooks/useWebSocket"

const typeConfig = {
  deadline: {
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-300",
    borderColor: "border-orange-400",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-300",
    borderColor: "border-green-400",
  },
  milestone: {
    icon: Flag,
    color: "text-blue-600",
    bgColor: "bg-blue-300",
    borderColor: "border-blue-400",
  },
  overdue: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-300",
    borderColor: "border-red-400",
  },
}

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    error, 
    markAsRead, 
    markAllAsRead, 
    refreshNotifications,
    testWebSocket 
  } = useNotifications();
  
  const [testMessage, setTestMessage] = useState('');
  const [isTestLoading, setIsTestLoading] = useState(false);
  const { isConnected, connectionStatus } = useWebSocket();

  const getNotificationConfig = (type: string) => {
    return typeConfig[type as keyof typeof typeConfig] || {
      icon: Bell,
      color: "text-gray-500",
      bgColor: "bg-gray-300",
      borderColor: "border-gray-400",
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const handleTestWebSocket = async () => {
    if (!testMessage.trim()) return;
    
    try {
      setIsTestLoading(true);
      await testWebSocket(testMessage);
      setTestMessage('');
    } catch (err) {
      console.error('Failed to send test notification:', err);
    } finally {
      setIsTestLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-white w-full">
        {/* Header Section */}
        <div className="relative px-8 pt-6 pb-8">
          {/* Decorative stars */}
          <div className="absolute top-4 right-8">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-8 right-16">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse delay-300" />
          </div>
          <div className="absolute top-6 right-24">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse delay-700" />
          </div>

          <div className="flex items-center gap-8 mb-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200"
            >
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white border-4 border-black shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Bell className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-3 border-black rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900">
                  {unreadCount}
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Notifications
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                    Stay updated with your tasks! 🔔
                  </p>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black shadow-sm text-sm font-bold ${
                    isConnected 
                      ? 'bg-green-200 text-green-800' 
                      : connectionStatus === 'error'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isConnected 
                        ? 'bg-green-500 animate-pulse' 
                        : connectionStatus === 'error'
                        ? 'bg-red-500'
                        : 'bg-yellow-500 animate-pulse'
                    }`} />
                    {isConnected ? 'Connected' : connectionStatus === 'error' ? 'Connection Error' : 'Connecting...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-12">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              onClick={refreshNotifications}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 rounded-xl font-bold"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                className="bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 rounded-xl font-bold"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read ({unreadCount})
              </Button>
            )}
          </div>

          {/* Test WebSocket Section */}
          <div className="mb-8 p-6 bg-yellow-50 border-2 border-black rounded-2xl shadow-md">
            <h3 className="text-lg font-black text-gray-900 mb-4">Test WebSocket Connection</h3>
            <div className="flex gap-4">
              <Input
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Enter test message..."
                className="flex-1 border-2 border-black rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleTestWebSocket()}
              />
              <Button
                onClick={handleTestWebSocket}
                disabled={isTestLoading || !testMessage.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 rounded-xl font-bold"
              >
                <Send className={`w-4 h-4 mr-2 ${isTestLoading ? 'animate-pulse' : ''}`} />
                Send Test
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-2xl">
              <p className="text-red-700 font-bold">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && notifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center text-white border-4 border-black shadow-lg transform rotate-3 mx-auto mb-6">
                <RefreshCw className="w-12 h-12 animate-spin" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Loading Notifications</h3>
              <p className="text-lg font-bold text-gray-700 bg-gray-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                Please wait... 🔄
              </p>
            </div>
          )}

          {/* Notifications Grid */}
          {!isLoading && (
            <div className="grid gap-6">
            {notifications.map((notification, index) => {
              const config = getNotificationConfig(notification.type)
              const IconComponent = config.icon

              return (
                <Card
                  key={notification.id}
                  className={`group shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-black bg-white hover:scale-[1.02] transform ${!notification.is_read ? 'ring-2 ring-blue-300' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 flex items-start gap-6">
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center border-3 border-black shadow-md group-hover:scale-110 transition-transform duration-200 transform rotate-3 group-hover:rotate-0`}>
                      <IconComponent className={`w-6 h-6 ${config.color}`} />
                    </div>

                    <div className="flex-1 space-y-2">
                      {notification.title && (
                        <h3 className="font-black text-xl text-gray-900 leading-tight">
                          {notification.title}
                        </h3>
                      )}
                      <p className={`font-black text-lg leading-relaxed ${!notification.is_read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-sm font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-full border-2 border-black shadow-sm inline-block">
                        {notification.created_at ? formatNotificationTime(notification.created_at) : notification.time}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {!notification.is_read && (
                        <Button
                          onClick={() => handleMarkAsRead(notification.id)}
                          size="sm"
                          className="shrink-0 border-2 border-black hover:border-black hover:bg-green-300 bg-green-200 text-gray-900 hover:text-gray-900 rounded-xl font-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 px-3 py-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      
                      {notification.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0 border-3 border-black hover:border-black hover:bg-blue-300 bg-white text-gray-900 hover:text-gray-900 rounded-xl font-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 px-4 py-2"
                        >
                          <Link href={notification.link}>View Details</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            </div>
          )}

          {/* Empty State (if no notifications) */}
          {!isLoading && notifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white border-4 border-black shadow-lg transform rotate-3 mx-auto mb-6">
                <Bell className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No Notifications</h3>
              <p className="text-lg font-bold text-gray-700 bg-gray-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                You're all caught up! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}