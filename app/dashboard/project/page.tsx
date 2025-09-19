"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowLeft, FolderOpen, Star } from "lucide-react"
import Link from "next/link"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import React from "react"
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "@/services/projectService"
import { ProjectCard } from "@/components/dashboard/ProjectCard"

export default function AllProjectsPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const { data, isLoading, isError, refetch } = useGetAllProjectsQuery()
  const [deletingProjectId, setDeletingProjectId] = useState<string | number | null>(null)
  const [deleteProject] = useDeleteProjectMutation()

  // Xử lý xóa dự án
  const handleDeleteProject = async (id: string | number) => {
    setDeletingProjectId(id)
    try {
      await deleteProject(Number(id)).unwrap()
      refetch()
    } catch (error) {
      console.error("Xóa dự án thất bại:", error)
    } finally {
      setDeletingProjectId(null)
    }
  }

  // Lọc danh sách dự án theo từ khóa tìm kiếm
  const filteredProjects = React.useMemo(() => {
    if (!searchTerm) return data?.data ?? []
    return (
      data?.data?.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? []
    )
  }, [data?.data, searchTerm])

  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-white w-full px-6 md:px-12 pt-6">
        {/* Phần Header */}
        <div className="relative mb-8">
          {/* Hiệu ứng ngôi sao */}
          <div className="absolute top-4 right-8 animate-pulse">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="absolute top-8 right-16 animate-pulse delay-300">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          </div>
          <div className="absolute top-6 right-24 animate-pulse delay-700">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Quay lại Bảng điều khiển</span>
                </Link>
              </Button>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white border-4 border-black shadow-lg">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-3 border-black rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900">
                  {data?.data?.length ?? 0}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Tất cả Dự án</h1>
              <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black">
                Quản lý và theo dõi toàn bộ dự án của bạn! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm + Nút thêm */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-600" />
            <Input
              type="search"
              placeholder="Tìm kiếm dự án..."
              className="pl-12 h-12 border-3 border-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsAddProjectDialogOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Thêm Dự án Mới
          </Button>
        </div>

        {/* Danh sách Dự án */}
        {isLoading && <p>Đang tải danh sách dự án...</p>}
        {isError && <p>Không thể tải danh sách dự án</p>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDelete={handleDeleteProject}
              isDeleting={deletingProjectId === project.id}
            />
          ))}
        </div>
      </div>

      {/* Dialog thêm dự án */}
      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={(open) => {
          setIsAddProjectDialogOpen(open)
          if (!open) refetch()
        }}
      />
    </>
  )
}
