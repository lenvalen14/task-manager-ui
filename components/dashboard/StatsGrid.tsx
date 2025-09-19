"use client"

import {
  CheckCircle,
  ListTodo,
  Clock,
  TrendingUp,
} from "lucide-react"
import { StatCard } from "./StatCard"

interface UserStats {
  tasks_completed: number
  tasks_total: number
  tasks_due_soon: number
  total_time_logged: string
  overall_progress: number
}

interface StatsGridProps {
  stats: UserStats | undefined
  isLoading: boolean
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading) {
    return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">Đang tải thống kê...</div>
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">
      <StatCard
        title="Công việc đã hoàn thành"
        value={stats?.tasks_completed ?? 0}
        description={`trên tổng ${stats?.tasks_total ?? 0} công việc`}
        Icon={CheckCircle}
        className="bg-green-300 hover:bg-green-400"
      />
      <StatCard
        title="Công việc sắp đến hạn"
        value={stats?.tasks_due_soon ?? 0}
        description="đến hạn vào ngày mai"
        Icon={ListTodo}
        className="bg-yellow-300 hover:bg-yellow-400"
      />
      <StatCard
        title="Tổng thời gian đã ghi nhận"
        value={stats?.total_time_logged ?? "00:00:00"}
        description="được theo dõi"
        Icon={Clock}
        className="bg-blue-300 hover:bg-blue-400"
      />
      <StatCard
        title="Tiến độ tổng thể"
        value={`${stats?.overall_progress ?? 0}%`}
        description="trên tất cả công việc"
        Icon={TrendingUp}
        className="bg-purple-300 hover:bg-purple-400"
      />
    </div>
  )
}
