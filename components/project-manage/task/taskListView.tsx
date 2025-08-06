// components/project-manage/task-list-view.tsx
"use client"

import { useState } from "react"
import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import clsx from "clsx"

import type { Task, TaskColumnData } from "@/components/project-manage/task-board"

export function TaskListView({
    className,
    columns,
}: {
    className?: string
    columns: TaskColumnData[]
}) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleClickTask = (task: Task, columnId: string) => {
        setSelectedTask(task)
        setSelectedColumn(columnId)
        setIsDialogOpen(true)
    }

    const handleClickCreateTask = () => {
        setSelectedTask(null)
        setSelectedColumn(null)
        setIsDialogOpen(true)
    }

    return (
        <div className={clsx("relative space-y-6", className)}>
            <div className="flex items-center justify-between">
                <Button onClick={handleClickCreateTask} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Task
                </Button>
            </div>

            <ScrollArea className="rounded-lg border shadow-sm max-h-[70vh]">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr className="text-left">
                            <th className="px-4 py-3 font-semibold">Title</th>
                            <th className="px-4 py-3 font-semibold">Tag</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold">Subtasks</th>
                            <th className="px-4 py-3 font-semibold">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {columns.map((column) =>
                            column.tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="group border border-black rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white cursor-pointer"
                                    onClick={() => handleClickTask(task, column.id)}
                                >
                                    {/* Title + Description */}
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        <div className="text-base">{task.title}</div>
                                        {task.description && (
                                            <div className="text-xs text-gray-500">{task.description}</div>
                                        )}
                                    </td>

                                    {/* Tag */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block text-xs font-bold px-2 py-1 rounded border border-black ${task.tagColor}`}
                                        >
                                            {task.tag}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border border-black ${column.color}`}
                                        >
                                            {column.title}
                                        </span>
                                    </td>

                                    {/* Subtasks */}
                                    <td className="px-6 py-4">
                                        {task.subtasks.length > 0 ? (
                                            <>
                                                <div className="text-xs text-gray-600 font-semibold mb-1">
                                                    ✅ {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length} subtasks
                                                </div>
                                                <ul className="space-y-1 text-xs text-gray-600">
                                                    {task.subtasks.map((subtask, index) => (
                                                        <li
                                                            key={index}
                                                            className={subtask.completed ? "line-through text-gray-400" : ""}
                                                        >
                                                            • {subtask.title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No subtasks</span>
                                        )}
                                    </td>

                                    {/* Progress */}
                                    <td className="px-6 py-4 font-semibold text-gray-700">
                                        {task.progress !== undefined ? `${task.progress}%` : "0%"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </ScrollArea>

            <TaskDetailDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                task={selectedTask ?? undefined}
                columnId={selectedColumn}
                mode="create"
            />
        </div>
    )
}
