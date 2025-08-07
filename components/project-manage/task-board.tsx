"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskBoard } from "@/components/project-manage/task/taskBoardView"
import { TaskListView } from "@/components/project-manage/task/taskListView"
import { List, LayoutGrid, Table, Plus, Star } from "lucide-react"
import { Flag } from "lucide-react"
import clsx from "clsx"

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

export const renderPriority = (priority?: "Urgent" | "High" | "Medium" | "Low") => {
  switch (priority) {
    case "Urgent":
      return (
        <div className="flex items-center gap-1 text-red-700 font-bold">
          <Flag className="w-4 h-4 fill-red-700" />
          <span>Urgent</span>
        </div>
      )
    case "High":
      return (
        <div className="flex items-center gap-1 text-orange-500">
          <Flag className="w-4 h-4 fill-orange-500" />
          <span>High</span>
        </div>
      )
    case "Medium":
      return (
        <div className="flex items-center gap-1 text-yellow-500">
          <Flag className="w-4 h-4 fill-yellow-500" />
          <span>Medium</span>
        </div>
      )
    case "Low":
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


const taskColumns: TaskColumnData[] = [
  {
    id: "1",
    title: "To Do",
    status: "to-do",
    color: "bg-red-400",
    tasks: [
      {
        id: "t1",
        tag: "UX stages",
        tagColor: "bg-yellow-200 text-yellow-900 border-2 border-black",
        title: "Wireframing",
        description: "Create low-fidelity designs that outline the basic structure and layout of the product or service...",
        subtasks: [
          { id: "st1", title: "Create user flow diagrams", completed: true },
          { id: "st2", title: "Design key screens", completed: false },
          { id: "st3", title: "Review with team", completed: false },
        ],
        progress: 33,
        priority: "High",
        dueDate: "2025-08-10",
        commentsCount: 3,
      },
      {
        id: "t2",
        tag: "Design",
        tagColor: "bg-purple-200 text-purple-900 border-2 border-black",
        title: "First design concept",
        description: "Create a concept based on the research and insights gathered during the discovery phase of the project...",
        subtasks: [
          { id: "st4", title: "Research design trends", completed: true },
          { id: "st5", title: "Create mood board", completed: true },
          { id: "st6", title: "Design initial concepts", completed: false },
        ],
        progress: 66,
        priority: "Medium",
        dueDate: "2025-08-12",
        commentsCount: 2,
      },
      {
        id: "t3",
        tag: "Design",
        tagColor: "bg-purple-200 text-purple-900 border-2 border-black",
        title: "Design library",
        description: "Create a collection of reusable design elements, such as buttons, forms, and navigation menus.",
        subtasks: [],
        priority: "Low",
        dueDate: "2025-08-14",
        commentsCount: 0,
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    status: "in-progress",
    color: "bg-blue-400",
    tasks: [
      {
        id: "t4",
        tag: "UX stages",
        tagColor: "bg-yellow-200 text-yellow-900 border-2 border-black",
        title: "Customer Journey Mapping",
        description: "Identify the key touchpoints and pain points in the customer journey, and to develop strategies to improve the overall customer...",
        subtasks: [],
        priority: "High",
        dueDate: "2025-08-09",
        commentsCount: 4,
      },
      {
        id: "t5",
        tag: "UX stage",
        tagColor: "bg-yellow-200 text-yellow-900 border-2 border-black",
        title: "Persona development",
        description: "Create user personas based on the research data to represent different user groups and their characteristics, goals, and behaviors...",
        subtasks: [],
        priority: "Medium",
        dueDate: "2025-08-11",
        commentsCount: 1,
      },
    ],
  },
  {
    id: "3",
    title: "Need Review",
    status: "need-review",
    color: "bg-orange-400",
    tasks: [
      {
        id: "t6",
        tag: "UX stages",
        tagColor: "bg-yellow-200 text-yellow-900 border-2 border-black",
        title: "Competitor research",
        description: "Research competitors and identify weakness and strengths each of them. Compare their product features, quality...",
        subtasks: [],
        priority: "Low",
        dueDate: "2025-08-07",
        commentsCount: 2,
      },
    ],
  },
  {
    id: "4",
    title: "Done",
    status: "done",
    color: "bg-green-400",
    tasks: [
      {
        id: "t7",
        tag: "Branding",
        tagColor: "bg-pink-200 text-pink-900 border-2 border-black",
        title: "Branding, visual identity",
        description: "Create a brand identity system that includes a logo, typography, color palette, and brand guidelines...",
        subtasks: [],
        priority: "Medium",
        dueDate: "2025-08-05",
        commentsCount: 0,
      },
      {
        id: "t8",
        tag: "Branding",
        tagColor: "bg-pink-200 text-pink-900 border-2 border-black",
        title: "Marketing materials",
        description: "Create a branded materials such as business cards, flyers, brochures, and social media graphics...",
        subtasks: [],
        priority: "Low",
        dueDate: "2025-08-06",
        commentsCount: 1,
      },
    ],
  },
]


export function BoardPage() {
  const [viewMode, setViewMode] = useState<"board" | "table" | "list">("board")

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

      {/* Hiển thị chế độ tương ứng */}
      {viewMode === "board" && <TaskBoard columns={taskColumns} />}
      {viewMode === "list" && <TaskListView columns={taskColumns} />}
      {viewMode === "table" && (
        <div className="text-gray-500 italic p-4 border rounded-lg text-center">
          Table view chưa được phát triển.
        </div>
      )}
    </div>
  )
}