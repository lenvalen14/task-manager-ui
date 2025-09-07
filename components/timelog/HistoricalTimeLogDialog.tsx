"use client"

import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetTaskReportsQuery } from "@/services/timeLogService"

interface TaskReport {
  task_id: number
  title: string
  total_minutes: number
}

export function TaskHistoryList() {
  const {
    data,
    isLoading,
    refetch,
  } = useGetTaskReportsQuery({ include_running: true })

  const reports: TaskReport[] = Array.isArray(data?.data) ? data!.data : []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {reports.length === 0 ? (
        <p className="text-sm text-gray-500">No historical data found</p>
      ) : (
        reports.map((task) => (
          <Card
            key={task.task_id}
            className="p-4 border-2 border-black rounded-xl bg-yellow-50 hover:bg-yellow-100 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">
                {task.title ?? `Task #${task.task_id}`}
              </span>
              <span className="px-3 py-1 bg-pink-200 text-pink-900 font-bold rounded-full border-2 border-black">
                {task.total_minutes} mins
              </span>
            </div>
          </Card>
        ))
      )}
      <Button
        variant="secondary"
        onClick={() => refetch()}
        className="bg-blue-200 hover:bg-blue-300 border-2 border-black font-bold"
      >
        Refresh
      </Button>
    </div>
  )
}
