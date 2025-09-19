"use client"

import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  EllipsisVertical,
  Plus,
  LayoutDashboard,
  Bell,
  Settings,
  Clock,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import { EditProjectDialog } from "@/components/project-manage/project/edit-project-dialog"
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "@/services/projectService"
import { useGetUserStatsQuery } from "@/services/statsService"
import { Project } from "@/types/projectType"
import { useToast } from "@/components/ui/use-toast"
import { DeleteConfirmationDialog } from "../ui/delete-confirmation-dialog"

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Thông báo", href: "/dashboard/notifications", icon: Bell },
  { name: "Thời gian & Báo cáo", href: "/dashboard/time-reports", icon: Clock },
  { name: "Cài đặt", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [projectToDelete, setProjectToDelete] = React.useState<Project | null>(null)

  const { toast } = useToast()

  // Lấy danh sách dự án
  const { data: projectsData, isLoading, refetch: refetchProjects } = useGetAllProjectsQuery()
  const projects = projectsData?.data?.slice(0, 5) || []

  // Lấy thống kê người dùng
  const { data: statsResponse } = useGetUserStatsQuery()
  const stats = statsResponse?.data

  const handleEditClick = (project: Project) => {
    setSelectedProject(project)
    setIsEditProjectDialogOpen(true)
  }

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()

  const promptForDelete = (project: Project) => {
    setProjectToDelete(project)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!projectToDelete) return

    try {
      await deleteProject(projectToDelete.id).unwrap()
      toast({
        title: "Xóa thành công",
        description: "Dự án đã được xóa khỏi hệ thống",
      })
      refetchProjects()
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa dự án. Vui lòng thử lại sau nhé!",
        variant: "destructive",
      })
    } finally {
      setProjectToDelete(null)
    }
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col shrink-0 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 px-4">
        <img
          src="/logo.svg"
          alt="Logo Managemate"
          className="w-[100px] h-[100px]"
        />
      </div>

      {/* Dự án */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Dự án
        </h2>

        {isLoading ? (
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full bg-gray-100 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center text-gray-500 text-sm">
            <p className="mb-2">Chưa có dự án nào</p>
            <Button
              onClick={() => setIsAddProjectDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm dự án mới
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[180px]">
            <nav className="grid gap-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-2 rounded-lg text-sm hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  <Link
                    href={`/dashboard/project/${project.id}`}
                    className="flex-1 flex items-center gap-2"
                  >
                    {project.name}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-gray-500 hover:text-gray-700"
                      >
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="shadow-lg rounded-lg"
                    >
                      <DropdownMenuItem onClick={() => handleEditClick(project)}>
                        Chỉnh sửa dự án
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => promptForDelete(project)}
                      >
                        Xóa dự án
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </nav>
          </ScrollArea>
        )}
      </div>

      {/* Điều hướng */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Điều hướng
        </h2>
        <nav className="grid gap-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-lg text-sm hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <item.icon className="w-4 h-4 text-gray-600" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Thời gian đã ghi nhận */}
      {stats && (
        <div className="mb-6 mt-auto pt-4 border-t border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Thời gian đã ghi nhận
          </h2>
          <div className="text-2xl font-bold mb-1 text-gray-900">
            {stats.total_time_logged}
          </div>
          <div className="flex items-center text-sm text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trending-up mr-1"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            +5% tháng này
          </div>
        </div>
      )}

      {/* Nút thêm dự án */}
      {projects.length > 0 && (
        <Button
          onClick={() => setIsAddProjectDialogOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm dự án
        </Button>
      )}

      {/* Dialog thêm dự án */}
      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={(open) => {
          setIsAddProjectDialogOpen(open)
          if (!open) {
            refetchProjects()
          }
        }}
      />

      {/* Dialog chỉnh sửa dự án */}
      {selectedProject && (
        <EditProjectDialog
          open={isEditProjectDialogOpen}
          onOpenChange={setIsEditProjectDialogOpen}
          project={selectedProject}
          onSuccess={() => {
            refetchProjects()
            toast({
              title: "Cập nhật thành công",
              description: "Dự án đã được chỉnh sửa thành công ✅",
            })
          }}
        />
      )}

      {/* Dialog xác nhận xóa */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={projectToDelete?.name || "dự án này"}
        isDeleting={isDeleting}
      />
    </aside>
  )
}
