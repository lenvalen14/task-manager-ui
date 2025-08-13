"use client";

import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/project-manage/task-card"
import { Plus, EllipsisVertical } from "lucide-react"

type Task = {
  id: string
  tag: string
  tagColor: string
  title: string
  description: string
}

type TaskColumnData = {
  id: string
  title: string
  status: "to-do" | "in-progress" | "need-review" | "done"
  tasks: Task[]
  color: string
}

type TaskColumnProps = {
  column: {
    id: string
    title: string
    status: "to-do" | "in-progress" | "need-review" | "done"
    tasks: Task[]
    color: string
  }
}

export function TaskColumn({ column }: TaskColumnProps) {
  return (
    <div className="w-[320px] bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
          {column.title}
          <span className="text-gray-400 font-normal text-sm">({column.tasks.length})</span>
        </h3>
        <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-blue-600 -mr-1">
          <EllipsisVertical className="w-3.5 h-3.5" />
        </Button>
      </div>
      <Button
        variant="outline"
        className="w-full mb-4 border-dashed text-gray-500 hover:text-blue-600 hover:border-blue-300 bg-gray-50/50 rounded-lg text-sm font-medium"
      >
        <Plus className="w-3.5 h-3.5 mr-1.5" />
        Add Task
      </Button>
      <div className="grid gap-3 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
