"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"

interface Task {
  status: string
}

interface Project {
  id: string | number
  name: string
  color?: string
  tasks: Task[]
}

interface ProjectCardProps {
  project: Project
  index: number
  onDelete: (id: string | number) => void
  isDeleting: boolean
}

export function ProjectCard({
  project,
  index,
  onDelete,
  isDeleting,
}: ProjectCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ]

  const color =
    project.color || colors[(project.id as number) % colors.length]
  const totalTasks = project.tasks?.length || 0
  const completedTasks =
    totalTasks > 0
      ? project.tasks.filter((task) => task.status === "done").length
      : 0
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleDeleteConfirm = () => {
    onDelete(project.id)
  }

  return (
    <>
      <Card
        className="group relative flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-3 border-black bg-white hover:scale-105 transform hover:-rotate-1"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between">
            {/* Tên dự án + biểu tượng màu */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white text-lg font-black shadow-lg border-2 border-black transform rotate-3 group-hover:rotate-0 transition-transform duration-300`}
              >
                {project.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <CardTitle className="text-xl font-black text-gray-900">
                {project.name}
              </CardTitle>
            </div>

            {/* Menu thao tác */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl border-2 border-black shadow-lg"
              >
                <DropdownMenuItem
                  className="font-bold text-red-600 focus:bg-red-100 focus:text-red-700 cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault()
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  Xóa dự án
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Thanh tiến độ */}
          <CardDescription>
            <div className="relative mb-3">
              <div className="w-full h-4 bg-gray-200 rounded-full shadow-inner overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-lg font-black text-gray-900 bg-yellow-200 px-3 py-1 rounded-full border-2 border-black shadow-sm">
              Hoàn thành {progress}%
            </span>
          </CardDescription>
        </CardHeader>

        {/* Footer: số task + nút xem chi tiết */}
        <CardContent className="flex justify-between items-center pt-0 mt-auto">
          <div className="text-sm font-bold text-gray-700">
            <span className="text-gray-900 font-black text-lg">
              {completedTasks}
            </span>{" "}
            / {totalTasks} Công việc
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-2 border-black bg-white text-gray-900 rounded-xl font-black shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-50"
          >
            <Link href={`/dashboard/project/${project.id}`}>Xem dự án</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Dialog xác nhận xóa */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={project.name}
        isDeleting={isDeleting}
      />
    </>
  )
}
