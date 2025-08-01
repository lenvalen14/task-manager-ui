"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskColumn } from "@/components/project-manage/task-column"
import { List, LayoutGrid, Table, Plus, Star } from "lucide-react"
import { TaskDetailDialog } from "@/components/project-manage/task/task-detail-dialog"
import clsx from "clsx"

type SubTask = {
  id: string
  title: string
  completed: boolean
}

type Task = {
  id: string
  tag: string
  tagColor: string
  title: string
  description: string
  subtasks: SubTask[]
  progress?: number
}

type TaskColumnData = {
  id: string
  title: string
  status: "to-do" | "in-progress" | "need-review" | "done"
  tasks: Task[]
  color: string
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
        description:
          "Create low-fidelity designs that outline the basic structure and layout of the product or service...",
        subtasks: [
          { id: "st1", title: "Create user flow diagrams", completed: true },
          { id: "st2", title: "Design key screens", completed: false },
          { id: "st3", title: "Review with team", completed: false },
        ],
        progress: 33,
      },
      {
        id: "t2",
        tag: "Design",
        tagColor: "bg-purple-200 text-purple-900 border-2 border-black",
        title: "First design concept",
        description:
          "Create a concept based on the research and insights gathered during the discovery phase of the project...",
        subtasks: [
          { id: "st4", title: "Research design trends", completed: true },
          { id: "st5", title: "Create mood board", completed: true },
          { id: "st6", title: "Design initial concepts", completed: false },
        ],
        progress: 66,
      },
      {
        id: "t3",
        tag: "Design",
        tagColor: "bg-purple-200 text-purple-900 border-2 border-black",
        title: "Design library",
        description: "Create a collection of reusable design elements, such as buttons, forms, and navigation menus.",
        subtasks: []
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
        subtasks: []
      },
      {
        id: "t5",
        tag: "UX stage",
        tagColor: "bg-yellow-200 text-yellow-900 border-2 border-black",
        title: "Persona development",
        description: "Create user personas based on the research data to represent different user groups and their characteristics, goals, and behaviors...",
        subtasks: []
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
        subtasks: []
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
        subtasks: []
      },
      {
        id: "t8",
        tag: "Branding",
        tagColor: "bg-pink-200 text-pink-900 border-2 border-black",
        title: "Marketing materials",
        description: "Create a branded materials such as business cards, flyers, brochures, and social media graphics...",
        subtasks: []
      },
    ],
  },
]

export function TaskBoard({ className }: { className?: string }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)

  const handleAddTask = (columnId?: string) => {
    setSelectedTask(null) // Clear any selected task
    setSelectedColumn(columnId || null) // Store column if provided
    setIsDialogOpen(true)
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

      {/* Header with view controls */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-900">Task Board</h2>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-white rounded-xl border-black shadow-lg p-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-pink-300 text-gray-900 border-black rounded-lg shadow-md font-bold hover:bg-pink-400 transition-all duration-200 transform hover:scale-105"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Board
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white text-gray-600 border-gray-300 rounded-lg hover:bg-blue-100 hover:border-black transition-all duration-200 font-bold"
            >
              <Table className="w-4 h-4 mr-2" />
              Table
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white text-gray-600 border-gray-300 rounded-lg hover:bg-green-100 hover:border-black transition-all duration-200 font-bold"
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Task Columns */}
      <div className="flex gap-8 overflow-x-auto pb-4">
        {taskColumns.map((column, index) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            {/* Column Header */}
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

            {/* Tasks Container */}
            <div className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 pr-2">
              {column.tasks.map((task, taskIndex) => (
                <div
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task)
                    setIsDialogOpen(true)
                  }}
                  className="bg-white rounded-xl border-2 border-black shadow-lg p-4 hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${(index * 100) + (taskIndex * 50)}ms` }}
                >
                  {/* Task Tag */}
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${task.tagColor} shadow-sm`}>
                      {task.tag}
                    </span>
                  </div>

                  {/* Task Title */}
                  <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {task.title}
                  </h4>

                  {/* Task Description */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {task.description}
                  </p>

                  {/* Subtasks Progress */}
                  <div className="mt-4 mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-gray-700">
                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                      </span>
                      <span className="font-bold text-gray-700">{task.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                      <div 
                        className="h-full bg-green-400 transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Task Footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
                    <div className="flex -space-x-2">
                      {/* Avatar placeholders */}
                      <div className="w-6 h-6 bg-blue-300 rounded-full border-2 border-black"></div>
                      <div className="w-6 h-6 bg-pink-300 rounded-full border-2 border-black"></div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 font-bold">
                      •••
                    </button>
                  </div>
                </div>
              ))}

              {/* Column Add Task Button */}
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

      {/* Task Detail Dialog */}
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