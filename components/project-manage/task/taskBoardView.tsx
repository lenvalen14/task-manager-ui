"use client"

import { useState, useEffect } from "react"
import { Plus, Star, MoreVertical, MessageSquare } from "lucide-react"
import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import { renderPriority, TaskColumnData, UITask } from "@/components/project-manage/task-board"
import clsx from "clsx"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"

import {
    useDeleteTaskMutation,
    useUpdateStatusTaskMutation,
} from "@/services/taskService"

import { toast } from "sonner"
import React from "react"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"
import { Tag } from "@/types/taskType"

// DnD
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd"

const downloadFile = async (url: string, fileName: string) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
}

const lightenHex = (hex: string, percent: number = 0.5) => {
    if (!hex) return "#e5e7eb"
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)

    r = Math.round(r + (255 - r) * percent)
    g = Math.round(g + (255 - g) * percent)
    b = Math.round(b + (255 - b) * percent)

    return `rgb(${r}, ${g}, ${b})`
}

export function TaskBoard({
    className,
    columns,
    onTaskUpdated,
}: {
    className?: string
    columns: TaskColumnData[]
    onTaskUpdated?: () => void
}) {
    const [selectedTask, setSelectedTask] = useState<UITask | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [taskToDelete, setTaskToDelete] = useState<UITask | null>(null)
    const [projectTags, setProjectTags] = useState<Tag[]>([])
    const [localCols, setLocalCols] = useState<TaskColumnData[]>([])
    const [updateStatusTask] = useUpdateStatusTaskMutation()
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()

    useEffect(() => {
        if (!columns || columns.length === 0) return

        const allTags = columns.flatMap(col =>
            col.tasks.flatMap(task => task.tags || [])
        )

        const uniqueTags = allTags.filter(
            (tag, index, self) =>
                index === self.findIndex(t => t.tag_name === tag.tag_name)
        )

        setProjectTags(uniqueTags)
        setLocalCols(columns.map(col => ({ ...col, tasks: [...col.tasks] })))
    }, [columns])

    useEffect(() => {
        setLocalCols(columns.map(col => ({ ...col, tasks: [...col.tasks] })))
    }, [columns.length])

    const handleAddTask = (columnId?: string) => {
        setSelectedTask(null)
        setSelectedColumn(columnId || null)
        setIsDialogOpen(true)
    }

    const handleEdit = (task: UITask, columnId: string) => {
        setSelectedTask(task)
        setSelectedColumn(columnId)
        setIsDialogOpen(true)
    }

    const promptForDelete = (task: UITask) => {
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

    // ---------- DnD handlers ----------
    const findColumnIndex = (colId: string) =>
        localCols.findIndex(c => c.id === colId)

    const handleDragEnd = async (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        const srcColIndex = findColumnIndex(source.droppableId)
        const destColIndex = findColumnIndex(destination.droppableId)
        if (srcColIndex === -1 || destColIndex === -1) return

        const newCols = localCols.map(col => ({ ...col, tasks: [...col.tasks] }))
        const [moved] = newCols[srcColIndex].tasks.splice(source.index, 1)
        if (!moved) return

        newCols[destColIndex].tasks.splice(destination.index, 0, moved)
        setLocalCols(newCols)

        try {
            await updateStatusTask({
                id: Number(moved.id),
                body: { status: newCols[destColIndex].status },
            }).unwrap()

            if (newCols[destColIndex].id === "done" && moved.subtasks?.length) {
                await Promise.all(
                    moved.subtasks.map(st =>
                        updateStatusTask({
                            id: Number(st.id),
                            body: { status: "done" },
                        }).unwrap()
                    )
                )
            }
            onTaskUpdated?.()

            console.log(newCols);
        } catch (error) {
            console.error("Update status failed:", error)
            toast("Cập nhật trạng thái thất bại!")
            setLocalCols(localCols) // rollback
        }
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
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-8 overflow-x-auto pb-4">
                    {localCols.map((column, colIndex) => (
                        <Droppable key={column.id} droppableId={String(column.id)}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex-shrink-0 w-80"
                                >
                                    {/* Column header */}
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

                                    {/* Task cards */}
                                    <div className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                                        {column.tasks.map((task, taskIndex) => (
                                            <Draggable
                                                key={String(task.id)}
                                                draggableId={String(task.id)}
                                                index={taskIndex}
                                            >
                                                {(providedTask) => (
                                                    <div
                                                        ref={providedTask.innerRef}
                                                        {...providedTask.draggableProps}
                                                        {...providedTask.dragHandleProps}
                                                        onClick={() => {
                                                            setSelectedTask(task)
                                                            setSelectedColumn(column.id)
                                                            setIsDialogOpen(true)
                                                        }}
                                                        className="bg-white rounded-xl border-2 border-black shadow-lg p-4 hover:shadow-xl transition-all duration-190 transform hover:scale-95 cursor-pointer"
                                                        style={{
                                                            animationDelay: `${colIndex * 100 + taskIndex * 50}ms`,
                                                            ...(providedTask.draggableProps.style || {}),
                                                        }}
                                                    >
                                                        {/* Tags */}
                                                        <div className="mb-3 flex flex-wrap gap-2">
                                                            {task.tags?.map((tag, idx) => (
                                                                <span
                                                                    key={`${tag.tag_name}-${idx}`}
                                                                    className="px-3 py-1 rounded-full text-sm font-bold shadow-sm"
                                                                    style={{
                                                                        backgroundColor: lightenHex(tag.color, 0.5),
                                                                        color: "#000",
                                                                    }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    {tag.tag_name}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Title + desc */}
                                                        <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                                            {task.title}
                                                        </h4>
                                                        <p className="text-gray-700 text-sm leading-relaxed">
                                                            {task.description}
                                                        </p>

                                                        {/* Progress */}
                                                        <div className="mt-4 mb-3">
                                                            <div className="flex justify-between text-sm mb-1">
                                                                <span className="font-bold text-gray-700">
                                                                    {task.subtasks?.filter((st) => st.completed).length}/
                                                                    {task.subtasks?.length ?? 0} subtasks
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

                                                        {/* Footer */}
                                                        <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
                                                            <div className="flex items-center gap-3">
                                                                {renderPriority(task.priority)}
                                                                {/* Notes */}
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <button
                                                                            className="flex items-center gap-1 text-gray-600 text-sm hover:text-gray-800"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <MessageSquare className="w-4 h-4" />
                                                                            {task.commentsCount} notes
                                                                        </button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent align="start" side="top" className="w-80 p-2">
                                                                        <div className="max-h-60 overflow-y-auto space-y-2">
                                                                            {task.notes.length === 0 && (
                                                                                <div className="text-sm text-gray-500 italic px-1">
                                                                                    No notes yet.
                                                                                </div>
                                                                            )}
                                                                            {task.notes.map((n) => (
                                                                                <div
                                                                                    key={n.id}
                                                                                    className="border rounded-md p-2 bg-gray-50"
                                                                                >
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
                                                            </div>
                                                            {/* Files */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <button
                                                                        className="flex items-center gap-1 text-gray-600 text-sm hover:text-gray-800"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        📎
                                                                        {task.attachments?.length ?? 0} files
                                                                    </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    align="start"
                                                                    side="top"
                                                                    className="w-80 p-2"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                                                        {task.attachments?.length === 0 && (
                                                                            <div className="text-sm text-gray-500 italic px-1">
                                                                                No attachments yet.
                                                                            </div>
                                                                        )}
                                                                        {task.attachments?.map((a) => (
                                                                            <div key={a.id} className="border rounded-md p-2 bg-gray-50">
                                                                                <button
                                                                                    onClick={() => downloadFile(a.file_url!, a.file_name!)}
                                                                                    className="text-blue-600 underline text-sm"
                                                                                >
                                                                                    {a.file_name}
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>

                                                            {/* Menu */}
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
                                                                <DropdownMenuContent align="end" className="w-32">
                                                                    <DropdownMenuItem onClick={() => handleEdit(task, column.id)}>
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => promptForDelete(task)}
                                                                        className="text-red-600"
                                                                    >
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}

                                        <button
                                            onClick={() => handleAddTask(column.id)}
                                            className="w-full bg-gray-100 hover:bg-gray-200 border-4 border-dashed border-gray-400 rounded-xl p-4 text-gray-600 hover:text-gray-800 font-bold transition-all duration-200 hover:border-black"
                                        >
                                            <Plus className="w-5 h-5 mx-auto mb-2" />
                                            Add new task
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <TaskDetailDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                task={selectedTask ?? undefined}
                columnId={selectedColumn}
                mode={selectedTask ? "edit" : "create"}
                projectTags={projectTags}
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
