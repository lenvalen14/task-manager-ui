"use client"

import React, { useState } from "react"
import clsx from "clsx"
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
    MessageSquare,
    Paperclip,
} from "lucide-react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"
import { toast } from "sonner"
import {
    useDeleteTaskMutation,
    useUpdateStatusTaskMutation,
} from "@/services/taskService"


import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import type { UITask, TaskColumnData } from "@/components/project-manage/task-board"
import { renderPriority } from "@/components/project-manage/task-board"

// giống board view
const lightenHex = (hex: string, percent = 0.5) => {
    if (!hex || !hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) return "#e5e7eb"
    // hỗ trợ #rgb ngắn
    const full = hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex

    let r = parseInt(full.slice(1, 3), 16)
    let g = parseInt(full.slice(3, 5), 16)
    let b = parseInt(full.slice(5, 7), 16)

    r = Math.round(r + (255 - r) * percent)
    g = Math.round(g + (255 - g) * percent)
    b = Math.round(b + (255 - b) * percent)

    return `rgb(${r}, ${g}, ${b})`
}

const downloadFile = async (url?: string, fileName?: string) => {
    if (!url) return
    const res = await fetch(url)
    const blob = await res.blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = fileName || "download"
    link.click()
    URL.revokeObjectURL(link.href)
}

export function TaskListView({
    className,
    columns,
    onTaskUpdated,
}: {
    className?: string
    columns: TaskColumnData[]
    onTaskUpdated?: () => void
}) {
    const [selectedTask, setSelectedTask] = useState<UITask | null>(null)
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState<UITask | null>(null)
    const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string | number>>(new Set())
    const [collapsedColumns, setCollapsedColumns] = useState<Record<string, boolean>>({})
    const [updateStatusTask] = useUpdateStatusTaskMutation()
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()

    const openDialog = (task: UITask | null, columnId: string) => {
        setSelectedTask(task)
        setSelectedColumn(columnId)
        setIsDialogOpen(true)
    }

    const toggleTaskSubtasks = (taskId: string | number) => {
        setExpandedTaskIds(prev => {
            const next = new Set(prev)
            next.has(taskId) ? next.delete(taskId) : next.add(taskId)
            return next
        })
    }

    const handleForDelete = (task: UITask) => {
        setTaskToDelete(task)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (!taskToDelete) return
        try {
            await deleteTask(Number(taskToDelete.id)).unwrap()
            toast("Đã xóa task thành công!")
            onTaskUpdated?.()
            setIsDeleteDialogOpen(false)
        } catch (error) {
            console.error(error)
            toast("Xóa task thất bại, vui lòng thử lại.")
        } finally {
            setTaskToDelete(null)
        }
    }

    const toggleColumnCollapse = (columnId: string) => {
        setCollapsedColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }))
    }

    return (
        <div className={clsx("space-y-6", className)}>
            {columns.map((column) => {
                const isCollapsed = collapsedColumns[column.id] ?? false

                return (
                    <div key={column.id} className="border rounded-xl shadow bg-white overflow-hidden">
                        {/* Header cột */}
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
                        </div>

                        {/* Bảng task */}
                        {!isCollapsed && (
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-2 w-1/6">Title</th>
                                            <th className="px-4 py-2 w-1/6">Tags</th>
                                            <th className="px-4 py-2 w-1/6">Description</th>
                                            <th className="px-4 py-2 w-1/12">Priority</th>
                                            <th className="px-4 py-2 w-1/12">Subtasks</th>
                                            <th className="px-4 py-2 w-1/6">Progress</th>
                                            <th className="px-4 py-2 w-1/12">Notes</th>
                                            <th className="px-4 py-2 w-1/16">Files</th>
                                            <th className="px-4 py-2 w-1/6">Due</th>
                                            <th className="px-4 py-2 w-1/12 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {column.tasks.length === 0 ? (
                                            <tr>
                                                <td colSpan={10} className="px-4 py-3 italic text-gray-400 text-center">
                                                    No tasks
                                                </td>
                                            </tr>
                                        ) : (
                                            column.tasks.map((task) => {
                                                const done = task.subtasks?.filter(st => st.completed).length ?? 0
                                                const total = task.subtasks?.length ?? 0
                                                const percent = task.progress ?? Math.round((total ? (done / total) * 100 : 0))

                                                return (
                                                    <React.Fragment key={task.id}>
                                                        <tr
                                                            className="border-t hover:bg-gray-50 cursor-pointer"
                                                            onClick={() => toggleTaskSubtasks(task.id)}
                                                        >
                                                            <td className="px-4 py-2 font-medium text-gray-900">
                                                                {task.title}
                                                            </td>

                                                            {/* Tags pastel như board */}
                                                            <td className="px-4 py-2">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {task.tags?.map((tag, idx) => (
                                                                        <span
                                                                            key={`${tag.tag_name}-${idx}`}
                                                                            className="px-2 py-0.5 rounded-full text-xs font-bold shadow-sm"
                                                                            style={{ backgroundColor: lightenHex(tag.color, 0.5), color: "#000" }}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            {tag.tag_name}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-2 text-gray-700 truncate max-w-xs">
                                                                {task.description || "—"}
                                                            </td>

                                                            <td className="px-4 py-2">
                                                                {renderPriority(task.priority)}
                                                            </td>

                                                            <td className="px-4 py-2 text-gray-700">
                                                                {done}/{total}
                                                            </td>

                                                            {/* Progress giống board (số + thanh có viền đen) */}
                                                            <td className="px-4 py-2">
                                                                <div className="w-full">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span className="font-bold text-gray-700">{percent}%</span>
                                                                    </div>
                                                                    <div className="w-full h-2 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                                                                        <div
                                                                            className="h-full bg-green-400 transition-all duration-500"
                                                                            style={{ width: `${percent}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Notes popover */}
                                                            <td className="px-4 py-2">
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <button
                                                                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <MessageSquare className="w-4 h-4" />
                                                                            {task.commentsCount ?? task.notes?.length ?? 0}
                                                                        </button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent
                                                                        align="start"
                                                                        side="top"
                                                                        className="w-80 p-2"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <div className="max-h-60 overflow-y-auto space-y-2">
                                                                            {(task.notes?.length ?? 0) === 0 && (
                                                                                <div className="text-sm text-gray-500 italic px-1">No notes yet.</div>
                                                                            )}
                                                                            {task.notes?.map((n) => (
                                                                                <div key={n.id} className="border rounded-md p-2 bg-gray-50">
                                                                                    <div className="text-xs text-gray-500 mb-1">
                                                                                        <span className="font-semibold">{n.created_by}</span>{" "}
                                                                                        • {new Date(n.created_at).toLocaleString()}
                                                                                    </div>
                                                                                    <div className="text-sm text-gray-800 whitespace-pre-wrap">
                                                                                        {n.description}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </td>

                                                            {/* Files popover + download */}
                                                            <td className="px-4 py-2">
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <button
                                                                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <Paperclip className="w-4 h-4" />
                                                                            {task.attachments?.length ?? 0}
                                                                        </button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent
                                                                        align="start"
                                                                        side="top"
                                                                        className="w-80 p-2"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <div className="max-h-60 overflow-y-auto space-y-2">
                                                                            {(task.attachments?.length ?? 0) === 0 && (
                                                                                <div className="text-sm text-gray-500 italic px-1">No attachments yet.</div>
                                                                            )}
                                                                            {task.attachments?.map((a) => (
                                                                                <div key={a.id} className="border rounded-md p-2 bg-gray-50">
                                                                                    <button
                                                                                        onClick={() => downloadFile(a.file_url!, a.file_name)}
                                                                                        className="text-blue-600 underline text-sm"
                                                                                    >
                                                                                        {a.file_name}
                                                                                    </button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </td>

                                                            <td className="px-4 py-2 text-gray-700">{task.dueDate || "—"}</td>

                                                            <td className="px-4 py-2 text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-6 w-6"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <MoreVertical className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end" className="w-32" onClick={(e) => e.stopPropagation()}>
                                                                        <DropdownMenuItem onClick={() => openDialog(task, column.id)}>Edit</DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleForDelete(task)
                                                                            }}
                                                                            className="text-red-600"
                                                                        >
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </td>
                                                        </tr>

                                                        {/* Hàng subtasks mở rộng */}
                                                        {expandedTaskIds.has(task.id) && (
                                                            <tr>
                                                                <td colSpan={10} className="px-6 pb-4 bg-gray-50">
                                                                    <ul className="space-y-2">
                                                                        {task.subtasks?.map((sub) => (
                                                                            <li key={sub.id} className="flex items-center gap-2">
                                                                                {sub.completed
                                                                                    ? <CheckCircle className="w-4 h-4 text-green-500" />
                                                                                    : <Circle className="w-4 h-4 text-gray-400" />
                                                                                }
                                                                                <span className={sub.completed ? "line-through text-gray-500" : "text-gray-800"}>
                                                                                    {sub.title}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            })
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
                onTaskSaved={() => {
                    onTaskUpdated?.()
                    setIsDialogOpen(false)
                }}
            />

            <DeleteConfirmationDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={confirmDelete}
                itemName={taskToDelete?.title || "this task"}
                isDeleting={isDeleting}
            />
        </div>
    )
}
