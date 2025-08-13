"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EllipsisVertical } from "lucide-react"

type Task = {
  id: string
  tag: string
  tagColor: string
  title: string
  description: string
}

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="w-full bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl p-4 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${task.tagColor}`}>
          {task.tag}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 text-gray-400 hover:text-blue-600 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <EllipsisVertical className="w-3.5 h-3.5" />
        </Button>
      </div>
      <Link href={`/task/${task.id}`} className="block">
        <h4 className="font-semibold text-sm mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {task.title}
        </h4>
        <p className="text-xs leading-relaxed text-gray-600 line-clamp-2">
          {task.description}
        </p>
      </Link>
    </div>
  )
}