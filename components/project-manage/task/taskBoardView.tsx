"use client"

import { useState } from "react"
import { Plus, Star, MoreVertical } from "lucide-react"
import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import { renderPriority } from "@/components/project-manage/task-board"
import clsx from "clsx"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export type SubTask = {
    id: string
    title: string
    completed: boolean
}

export type Task = {
    id: string
    tag: string
    tagColor: string
    title: string
    description: string
    subtasks: SubTask[]
    progress?: number
    priority?: "Urgent" | "High" | "Medium" | "Low"
    dueDate?: string
    commentsCount?: number
}

export type TaskColumnData = {
    id: string
    title: string
    status: "to-do" | "in-progress" | "need-review" | "done"
    tasks: Task[]
    color: string
}

export function TaskBoard({
    className,
    columns,
}: {
    className?: string
    columns: TaskColumnData[]
}) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null)

    const handleAddTask = (columnId?: string) => {
        setSelectedTask(null)
        setSelectedColumn(columnId || null)
        setIsDialogOpen(true)
    }

    const handleEdit = (task: Task, columnId: string) => {
        setSelectedTask(task)
        setSelectedColumn(columnId)
        setIsDialogOpen(true)
    }

    const handleDelete = (taskId: string) => {
        alert(`Delete task: ${taskId}`)
    }

    return (
        <div className={clsx("flex flex-col flex-1 relative", className)}>
            {/* Decorative stars */}
            <div className="absolute top-4 right-4 z-10">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
            <div className="absolute top-8 right-12 z-10">
                <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse delay-500" />
            </div>

            {/* Task Columns */}
            <div className="flex gap-8 overflow-x-auto pb-4">
                {columns.map((column, index) => (
                    <div key={column.id} className="flex-shrink-0 w-80">
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className={`w-4 h-4 rounded-full ${column.color} border-2 border-black shadow-sm`}
                                />
                                <h3 className="text-lg font-black text-gray-900">
                                    {column.title}
                                </h3>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold border-2 border-black">
                                    {column.tasks.length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 pr-2">
                            {column.tasks.map((task, taskIndex) => (
                                <div
                                    key={task.id}
                                    onClick={() => {
                                        setSelectedTask(task)
                                        // setIsDialogOpen(true)
                                    }}
                                    className="bg-white rounded-xl border-2 border-black shadow-lg p-4 hover:shadow-xl transition-all duration-190 transform hover:scale-95 cursor-pointer"
                                    style={{
                                        animationDelay: `${index * 100 + taskIndex * 50}ms`,
                                    }}
                                >
                                    <div className="mb-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-bold ${task.tagColor} shadow-sm`}
                                        >
                                            {task.tag}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                        {task.title}
                                    </h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {task.description}
                                    </p>
                                    <div className="mt-4 mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-bold text-gray-700">
                                                {task.subtasks.filter((st) => st.completed).length}/
                                                {task.subtasks.length} subtasks
                                            </span>
                                            <span className="font-bold text-gray-700">
                                                {task.progress ?? 0}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                                            <div
                                                className="h-full bg-green-400 transition-all duration-500"
                                                style={{ width: `${task.progress ?? 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
                                        <div className="flex flex-col gap-1">
                                            {renderPriority(task.priority)}
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleEdit(task, column.id)
                                                    }}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDelete(task.id)
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => handleAddTask(column.id)}
                                className="w-full bg-gray-100 hover:bg-gray-200 border-4 border-dashed border-gray-400 rounded-xl p-4 text-gray-600 hover:text-gray-800 font-bold transition-all duration-200 hover:border-black"
                            >
                                <Plus className="w-5 h-5 mx-auto mb-2" />
                                Add new task
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
