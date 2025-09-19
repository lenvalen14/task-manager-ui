"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ListTodo, TrendingUp, Activity, Star } from "lucide-react"

type OverviewTabProps = {
  projectProgress: number;
  totalTasks: { done: number; pending: number };
  timeSpent: String
};

export function OverviewTab({ projectProgress, totalTasks, timeSpent }: OverviewTabProps) {
  return (
    <div className="relative">
      {/* Ngôi sao trang trí */}
      <div className="absolute top-4 right-4 z-10">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
      </div>
      <div className="absolute top-8 right-12 z-10">
        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse delay-500" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Thẻ Tiến độ Dự án */}
        <Card className="border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl bg-blue-100 transform hover:scale-105">
          <CardHeader className="bg-blue-200 rounded-t-xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-gray-900">Tiến độ dự án</CardTitle>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-gray-900 mb-3">{projectProgress}% Hoàn thành</div>

            {/* Thanh tiến độ */}
            <div className="relative w-full h-4 bg-white rounded-full border border-gray-300 shadow-inner overflow-hidden mb-3">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${projectProgress}%` }}
              ></div>
            </div>

            <p className="text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-400 inline-block">
              Dựa trên số công việc đã hoàn thành
            </p>
          </CardContent>
        </Card>

        {/* Thẻ Tổng số công việc */}
        <Card className="border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl bg-pink-100 transform hover:scale-105">
          <CardHeader className="bg-pink-200 rounded-t-xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-gray-900">Tổng số công việc</CardTitle>
              <ListTodo className="h-6 w-6 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-gray-900 mb-3">{totalTasks.done + totalTasks.pending}</div>
            <div className="flex gap-2">
              <span className="bg-green-300 text-gray-900 px-3 py-1 rounded-full border border-gray-400 text-sm font-bold">
                {totalTasks.done} đã xong
              </span>
              <span className="bg-orange-300 text-gray-900 px-3 py-1 rounded-full border border-gray-400 text-sm font-bold">
                {totalTasks.pending} đang chờ
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Thẻ Thời gian đã dùng */}
        <Card className="border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl bg-green-100 transform hover:scale-105">
          <CardHeader className="bg-green-200 rounded-t-xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-gray-900">Thời gian đã dùng</CardTitle>
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-gray-900 mb-3">{timeSpent}</div>
            <div className="bg-white px-3 py-1 rounded-full border border-gray-400 inline-flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">↗</span>
              <span className="text-sm font-bold text-green-600">+2.5% so với tuần trước</span>
            </div>
          </CardContent>
        </Card>

        {/* Thẻ Hoạt động gần đây - Toàn chiều rộng */}
        <Card className="md:col-span-2 lg:col-span-3 border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl bg-yellow-50">
          <CardHeader className="bg-yellow-200 rounded-t-xl">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-yellow-600" />
              <CardTitle className="text-2xl font-black text-gray-900">Hoạt động gần đây</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: 'đã hoàn thành công việc "Wireframing"', time: '2 giờ trước', color: 'bg-green-200' },
                { action: 'thêm một ghi chú mới vào "Customer Journey Mapping"', time: 'hôm qua', color: 'bg-blue-200' },
                { action: 'cập nhật mô tả cho "Persona development"', time: '3 ngày trước', color: 'bg-purple-200' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-300 shadow-sm">
                  <div className={`w-4 h-4 rounded-full ${activity.color} border border-gray-400`}></div>
                  <div className="flex-1">
                    <span className="font-black text-gray-900 bg-gray-200 px-2 py-1 rounded-full border border-gray-400 text-sm mr-2">
                      Bạn
                    </span>
                    <span className="text-gray-800 font-medium text-lg">{activity.action}</span>
                  </div>
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold border border-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Nút Xem thêm */}
            <div className="text-center mt-6">
              <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-black px-6 py-3 rounded-xl border border-gray-400 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Xem tất cả hoạt động
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
