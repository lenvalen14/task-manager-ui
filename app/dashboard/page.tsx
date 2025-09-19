"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "@/services/projectService"
import { useGetUserStatsQuery } from "@/services/statsService"

import { DashboardHero } from "@/components/dashboard/DashboardHero"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentProjects } from "@/components/dashboard/RecentProjects"
import { toast } from "sonner"
import { useAppSelector } from "@/hooks/redux"
import { useGetUserByIdQuery } from "@/services/userService"

export default function TrangDashboard() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [deletingProjectId, setDeletingProjectId] = useState<
    string | number | null
  >(null)

  const user = useAppSelector((state) => state.user)

  const { data: userData } = useGetUserByIdQuery(user?.sub as number, {
    skip: !user?.sub,
  })

  const { data: projectsData, refetch } = useGetAllProjectsQuery()
  const { data: statsResponse, isLoading: isLoadingStats } =
    useGetUserStatsQuery()
  const [deleteProject] = useDeleteProjectMutation()

  const stats = statsResponse?.data
  const projects = projectsData?.data

  const handleDeleteProject = async (id: string | number) => {
    setDeletingProjectId(id)
    try {
      await deleteProject(Number(id)).unwrap()

      toast.success("Dự án đã được xóa", {
        description: "Dự án của bạn đã được xóa thành công khỏi hệ thống",
      })

      refetch()
    } catch (error) {
      console.error("Xóa dự án thất bại:", error)

      toast.error("Không thể xóa dự án", {
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau nhé!",
      })
    } finally {
      setDeletingProjectId(null)
    }
  }

  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 w-full">
        <DashboardHero userName={userData?.data.username ?? ""} />

        <div className="px-6 pb-12 md:px-12">
          <StatsGrid stats={stats} isLoading={isLoadingStats} />

          <RecentProjects
            projects={projects}
            onDeleteProject={handleDeleteProject}
            deletingProjectId={deletingProjectId}
          />

          {/* Nút "Thêm dự án mới" */}
          <div className="text-center mt-16">
            <Button
              onClick={() => setIsAddProjectDialogOpen(true)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-black shadow-xl hover:shadow-2xl rounded-2xl px-12 py-6 text-xl transition-all duration-300 hover:scale-110 border-3 border-black transform hover:-rotate-1"
            >
              <Plus className="w-8 h-8 mr-4" />
              Thêm dự án mới ✨
            </Button>
          </div>
        </div>
      </div>

      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={(open) => {
          setIsAddProjectDialogOpen(open)
          if (!open) {
            refetch()
          }
        }}
      />
    </>
  )
}
