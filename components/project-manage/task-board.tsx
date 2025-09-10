"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskBoard } from "@/components/project-manage/task/taskBoardView"
import { TaskListView } from "@/components/project-manage/task/taskListView"
import { List, LayoutGrid, Table, Flag } from "lucide-react"
import clsx from "clsx"
import { Task, Priority, Status, Tag, Note } from "@/types/taskType"
import { TaskAttachment } from "@/types/taskAttachmentType"

// ===== UI Types (export để TaskBoardView dùng chung) =====
export type SubTask = {
  id: string
  title: string
  completed: boolean
  status: Status
}

export type UITask = {
  id: string
  title: string
  description: string
  subtasks: SubTask[]
  progress: number
  priority: Priority
  dueDate?: string
  commentsCount: number
  tags: Tag[]
  notes: Note[]
  status: Status
  attachments?: TaskAttachment[]
}

export type TaskColumnData = {
  id: string
  title: string
  status: Status
  tasks: UITask[]
  color: string
}

// ===== Meta / Helpers =====
const statusMeta: Record<Status, { title: string; color: string; id: string }> = {
  "to-do": { id: "1", title: "To Do", color: "bg-red-400" },
  "in-progress": { id: "2", title: "In Progress", color: "bg-blue-400" },
  "need-review": { id: "3", title: "Need Review", color: "bg-orange-400" },
  "done": { id: "4", title: "Done", color: "bg-green-400" },
}

const formatDate = (iso?: string | null): string | undefined => {
  if (!iso) return undefined
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return undefined
    return d.toISOString().split("T")[0]
  } catch {
    return undefined
  }
}

// Random màu tag (class tailwind an toàn)
const randomTagColor = () => {
  const colors = [
    "bg-pink-200 text-pink-800",
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-red-200 text-red-800",
    "bg-orange-200 text-orange-800",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// ===== Priority UI (export để TaskBoardView dùng) =====
export const renderPriority = (priority?: "low" | "medium" | "high" | "urgent") => {
  switch (priority) {
    case "urgent":
      return (
        <div className="flex items-center gap-1 text-red-700 font-bold">
          <Flag className="w-4 h-4 fill-red-700" />
          <span>Urgent</span>
        </div>
      )
    case "high":
      return (
        <div className="flex items-center gap-1 text-orange-500">
          <Flag className="w-4 h-4 fill-orange-500" />
          <span>High</span>
        </div>
      )
    case "medium":
      return (
        <div className="flex items-center gap-1 text-yellow-500">
          <Flag className="w-4 h-4 fill-yellow-500" />
          <span>Medium</span>
        </div>
      )
    case "low":
      return (
        <div className="flex items-center gap-1 text-blue-500">
          <Flag className="w-4 h-4 fill-blue-500" />
          <span>Low</span>
        </div>
      )
    default:
      return <span className="text-gray-500">—</span>
  }
}

// ===== Props =====
type BoardPageProps = {
  tasks: Task[];
  onTaskUpdated?: () => void;
}

// ===== Component =====
export function BoardPage({ tasks, onTaskUpdated }: BoardPageProps) {
  const [viewMode, setViewMode] = useState<"board" | "table" | "list">("board")

  console.log(tasks);

  const columns: TaskColumnData[] = useMemo(() => {
    const colMap: Record<Status, TaskColumnData> = {
      "to-do": { id: statusMeta["to-do"].id, title: statusMeta["to-do"].title, status: "to-do", color: statusMeta["to-do"].color, tasks: [] },
      "in-progress": { id: statusMeta["in-progress"].id, title: statusMeta["in-progress"].title, status: "in-progress", color: statusMeta["in-progress"].color, tasks: [] },
      "need-review": { id: statusMeta["need-review"].id, title: statusMeta["need-review"].title, status: "need-review", color: statusMeta["need-review"].color, tasks: [] },
      "done": { id: statusMeta["done"].id, title: statusMeta["done"].title, status: "done", color: statusMeta["done"].color, tasks: [] },
    }

    const parentById = new Map<number, UITask>()

    // Parent tasks
    tasks
      .filter(t => t.parent_task === null)
      .forEach((t) => {
        const uiTask: UITask = {
          id: String(t.id),
          title: t.title,
          description: t.description,
          subtasks: [],
          progress: 0,
          priority: t.priority ?? "low",
          dueDate: formatDate(t.deadline),
          commentsCount: (t.notes ?? []).length,
          tags: (t.tags ?? []).map(tag => ({
            ...tag,
            style: { backgroundColor: tag.color, color: "#fff" }, // hoặc màu text phù hợp
          })),
          notes: t.notes ?? [],
          status: t.status,
          attachments: t.attachments,
        }
        parentById.set(t.id, uiTask)
        colMap[t.status].tasks.push(uiTask)
      })

    // Subtasks
    tasks
      .filter(t => t.parent_task !== null)
      .forEach((t) => {
        const parent = parentById.get(t.parent_task as number)
        if (!parent) return

        parent.subtasks.push({
          id: String(t.id),
          title: t.title,
          completed: t.status === "done",
          status: t.status
        })

        const total = parent.subtasks.length
        const done = parent.subtasks.filter(s => s.completed).length
        parent.progress = total === 0 ? 0 : Math.round((done / total) * 100)
      })

    return Object.values(colMap)
  }, [tasks])

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-900">Task View</h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-xl border-black shadow-lg p-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("board")}
              className={clsx(
                "rounded-lg font-bold transition-all duration-200 transform",
                viewMode === "board"
                  ? "bg-pink-300 text-gray-900 shadow-md hover:bg-pink-400 scale-105"
                  : "bg-white text-gray-600 hover:bg-pink-100 hover:border-black"
              )}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Board
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("table")}
              className={clsx(
                "rounded-lg font-bold transition-all duration-200 transform",
                viewMode === "table"
                  ? "bg-blue-300 text-gray-900 shadow-md hover:bg-blue-400 scale-105"
                  : "bg-white text-gray-600 hover:bg-blue-100 hover:border-black"
              )}
            >
              <Table className="w-4 h-4 mr-2" />
              Table
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={clsx(
                "rounded-lg font-bold transition-all duration-200 transform",
                viewMode === "list"
                  ? "bg-green-300 text-gray-900 shadow-md hover:bg-green-400 scale-105"
                  : "bg-white text-gray-600 hover:bg-green-100 hover:border-black"
              )}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "board" && <TaskBoard columns={columns} onTaskUpdated={onTaskUpdated} />}
      {viewMode === "list" && <TaskListView columns={columns} onTaskUpdated={onTaskUpdated} />}
      {viewMode === "table" && (
        <div className="text-gray-500 italic p-4 border rounded-lg text-center">
          Table view chưa được phát triển.
        </div>
      )}
    </div>
  )
}