"use client"

import React from "react"
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

export default function DashboardPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] =
    React.useState(false)

  const [deletingProjectId, setDeletingProjectId] = React.useState<
    string | number | null
  >(null)

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
      refetch()
    } catch (error) {
      console.error("Failed to delete project:", error)
    } finally {
      setDeletingProjectId(null)
    }
  }


  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 w-full">
        <DashboardHero userName="Alison" />

        <div className="px-6 pb-12 md:px-12">
          <StatsGrid stats={stats} isLoading={isLoadingStats} />

          <RecentProjects
            projects={projects}
            onDeleteProject={handleDeleteProject}
            deletingProjectId={deletingProjectId}
          />

          {/* Nút "Add New Project" */}
          <div className="text-center mt-16">
            <Button
              onClick={() => setIsAddProjectDialogOpen(true)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-black shadow-xl hover:shadow-2xl rounded-2xl px-12 py-6 text-xl transition-all duration-300 hover:scale-110 border-3 border-black transform hover:-rotate-1"
            >
              <Plus className="w-8 h-8 mr-4" />
              Add New Project ✨
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