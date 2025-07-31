import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, Flag, ArrowLeft, XCircle, Star } from "lucide-react"
import Link from "next/link"

type Notification = {
  id: string
  type: "deadline" | "completed" | "milestone" | "overdue"
  message: string
  time: string
  link?: string
}

const notifications: Notification[] = [
  { id: "1", type: "deadline", message: "Task 'Wireframing' is due tomorrow.", time: "1 hour ago", link: "/task/1" },
  {
    id: "2",
    type: "completed",
    message: "Task 'First design concept' has been completed.",
    time: "Yesterday",
    link: "/task/2",
  },
  {
    id: "3",
    type: "milestone",
    message: "Milestone 'Project Kickoff' achieved!",
    time: "2 days ago",
    link: "/project/1",
  },
  {
    id: "4",
    type: "overdue",
    message: "Task 'Review Marketing Plan' is overdue!",
    time: "3 days ago",
    link: "/task/5",
  },
  {
    id: "5",
    type: "deadline",
    message: "Project 'Mobile App V2' deadline approaching.",
    time: "4 days ago",
    link: "/project/3",
  },
]

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
  const getNotificationConfig = (type: Notification["type"]) => {
    return typeConfig[type] || {
      icon: Bell,
      color: "text-gray-500",
      bgColor: "bg-gray-300",
      borderColor: "border-gray-400",
    }
  }

  return (
    <>
      <Header />
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
                  {notifications.length}
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Notifications
                </h1>
                <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                  Stay updated with your tasks! 🔔
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-12">
          {/* Notifications Grid */}
          <div className="grid gap-6">
            {notifications.map((notification, index) => {
              const config = getNotificationConfig(notification.type)
              const IconComponent = config.icon
              
              return (
                <Card
                  key={notification.id}
                  className="group shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-black bg-white hover:scale-[1.02] transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 flex items-start gap-6">
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center border-3 border-black shadow-md group-hover:scale-110 transition-transform duration-200 transform rotate-3 group-hover:rotate-0`}>
                      <IconComponent className={`w-6 h-6 ${config.color}`} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <p className="font-black text-lg text-gray-900 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-sm font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-full border-2 border-black shadow-sm inline-block">
                        {notification.time}
                      </p>
                    </div>
                    
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
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State (if no notifications) */}
          {notifications.length === 0 && (
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