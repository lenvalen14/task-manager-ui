"use client"

import { useState } from "react"
import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Plus,
    MoreVertical,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    Circle,
} from "lucide-react"
import clsx from "clsx"
import type { Task, TaskColumnData } from "@/components/project-manage/task-board"
import { renderPriority } from "@/components/project-manage/task-board"

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
    const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string>>(new Set())
    const [collapsedColumns, setCollapsedColumns] = useState<Record<string, boolean>>({})

    const openDialog = (task: Task | null, columnId: string) => {
        setSelectedTask(task)
        setSelectedColumn(columnId)
        setIsDialogOpen(true)
    }

    const toggleTaskSubtasks = (taskId: string) => {
        setExpandedTaskIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(taskId)) {
                newSet.delete(taskId)
            } else {
                newSet.add(taskId)
            }
            return newSet
        })
    }

    const toggleColumnCollapse = (columnId: string) => {
        setCollapsedColumns(prev => ({
            ...prev,
            [columnId]: !prev[columnId],
        }))
    }

    return (
        <div className={clsx("space-y-6", className)}>
            {columns.map((column) => {
                const isCollapsed = collapsedColumns[column.id] ?? false

                return (
                    <div key={column.id} className="border rounded-xl shadow bg-white overflow-hidden">
                        <div
                            className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 font-bold text-base cursor-pointer"
                            onClick={() => toggleColumnCollapse(column.id)}
                        >
                            <div className="flex items-center gap-3">
                                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                                <div className={`w-4 h-4 rounded-full ${column.color} border-2 border-black shadow-sm`} />
                                <h3 className="text-lg font-black text-gray-900">{column.title}</h3>
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold border-2 border-black">
                                    {column.tasks.length}
                                </span>
                            </div>
                        </div>

                        {!isCollapsed && (
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-2 w-1/4">Title</th>
                                            <th className="px-4 py-2 w-1/4">Tag</th>
                                            <th className="px-4 py-2 w-1/6">Due Date</th>
                                            <th className="px-4 py-2 w-1/6">Priority</th>
                                            <th className="px-4 py-2 w-1/6">Subtasks</th>
                                            <th className="px-4 py-2 w-1/6">Progress</th>
                                            <th className="px-4 py-2 w-1/12 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openDialog(null, column.id)
                                                    }}
                                                    className="gap-1"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {column.tasks.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-4 py-3 italic text-gray-400 text-center">
                                                    No tasks
                                                </td>
                                            </tr>
                                        ) : (
                                            column.tasks.map((task) => (
                                                <>
                                                    <tr
                                                        key={task.id}
                                                        className="border-t hover:bg-gray-50 cursor-pointer"
                                                        onClick={() => toggleTaskSubtasks(task.id)}
                                                    >
                                                        <td className="px-4 py-2 font-medium text-gray-900">{task.title}</td>
                                                        <td className="px-4 py-2 font-medium text-gray-900">
                                                            {task.tag && (
                                                                <span
                                                                    className={clsx(
                                                                        "inline-block px-3 py-1 rounded-full text-sm font-bold shadow-sm",
                                                                        task.tagColor ?? "bg-gray-200 text-gray-700"
                                                                    )}
                                                                >
                                                                    {task.tag}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-gray-700">{task.dueDate || "—"}</td>
                                                        <td className="px-4 py-2">{renderPriority(task.priority as "Urgent" | "High" | "Medium" | "Low")}</td>
                                                        <td className="px-4 py-2 text-gray-700">{task.subtasks?.length ?? 0}</td>
                                                        <td className="px-4 py-2 text-gray-700 font-bold">{task.progress ?? 0}%</td>
                                                        <td className="px-4 py-2 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-32">
                                                                    <DropdownMenuItem onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        openDialog(task, column.id)
                                                                    }}>
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            alert(`Delete task: ${task.id}`)
                                                                        }}
                                                                        className="text-red-600"
                                                                    >
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>

                                                    {expandedTaskIds.has(task.id) && (
                                                        <tr>
                                                            <td colSpan={7} className="px-6 pb-4 bg-gray-50">
                                                                <ul className="space-y-2">
                                                                    {task.subtasks.map((subtask) => (
                                                                        <li key={subtask.id} className="flex items-center gap-2">
                                                                            {subtask.completed ? (
                                                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                                            ) : (
                                                                                <Circle className="w-4 h-4 text-gray-400" />
                                                                            )}
                                                                            <span className={subtask.completed ? "line-through text-gray-500" : "text-gray-800"}>
                                                                                {subtask.title}
                                                                            </span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )
            })}

            <TaskDetailDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                task={selectedTask ?? undefined}
                columnId={selectedColumn}
                mode={selectedTask ? "edit" : "create"}
            />
        </div>
    )
}
