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
    return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">Loading stats...</div>
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">
      <StatCard
        title="Tasks Completed"
        value={stats?.tasks_completed ?? 0}
        description={`of ${stats?.tasks_total ?? 0} tasks`}
        Icon={CheckCircle}
        className="bg-green-300 hover:bg-green-400"
      />
      <StatCard
        title="Tasks Due Soon"
        value={stats?.tasks_due_soon ?? 0}
        description="due tomorrow"
        Icon={ListTodo}
        className="bg-yellow-300 hover:bg-yellow-400"
      />
      <StatCard
        title="Total Time Logged"
        value={stats?.total_time_logged ?? "00:00:00"}
        description="tracked"
        Icon={Clock}
        className="bg-blue-300 hover:bg-blue-400"
      />
      <StatCard
        title="Overall Progress"
        value={`${stats?.overall_progress ?? 0}%`}
        description="across all tasks"
        Icon={TrendingUp}
        className="bg-purple-300 hover:bg-purple-400"
      />
    </div>
  )
}