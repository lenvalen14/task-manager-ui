"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowLeft, FolderOpen, Star } from "lucide-react"
import Link from "next/link"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import React from "react"
import { useGetAllProjectsQuery } from "@/services/projectService"

type ProjectUI = {
  id: string
  name: string
  description: string
  status: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  updatedAt: string
  color: string
  bgColor: string
}

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-300 text-gray-900 border-2 border-blue-500",
  "Planning": "bg-yellow-300 text-gray-900 border-2 border-yellow-500",
  "Completed": "bg-green-300 text-gray-900 border-2 border-green-500",
  "To Do": "bg-gray-300 text-gray-900 border-2 border-gray-400"
}

// 🎨 Màu random cho từng project
const colorPalette = [
  { color: "bg-pink-400", bgColor: "bg-pink-50" },
  { color: "bg-blue-400", bgColor: "bg-blue-50" },
  { color: "bg-green-400", bgColor: "bg-green-50" },
  { color: "bg-yellow-400", bgColor: "bg-yellow-50" },
  { color: "bg-purple-400", bgColor: "bg-purple-50" }
]

// 🔄 Format API -> ProjectUI
const formatProjects = (apiProjects: any[]): ProjectUI[] => {
  return apiProjects.map((p, index) => {
    const totalTasks = p.tasks?.length || 0
    const tasksCompleted = p.tasks?.filter((t: any) => t.status === "Completed").length || 0
    const progress = totalTasks ? Math.round((tasksCompleted / totalTasks) * 100) : 0
    const colors = colorPalette[index % colorPalette.length]

    return {
      id: String(p.id),
      name: p.name,
      description: p.description || "No description provided.",
      status: progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "To Do",
      progress,
      tasksCompleted,
      totalTasks,
      updatedAt: p.updated_at,
      ...colors
    }
  })
}

export default function AllProjectsPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const { data, isLoading, isError, refetch } = useGetAllProjectsQuery()

  const projects = React.useMemo(() => {
    if (!data?.data) return []
    return formatProjects(data.data)
  }, [data])

  // Filter theo search
  const filteredProjects = React.useMemo(() => {
    if (!searchTerm) return projects
    return projects.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects, searchTerm])

  const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.round(diffMs / (1000 * 60))
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return `Yesterday`
    return `${diffDays}d ago`
  }

  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-white w-full px-6 md:px-12 pt-6">
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute top-4 right-8 animate-pulse">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="absolute top-8 right-16 animate-pulse delay-300">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          </div>
          <div className="absolute top-6 right-24 animate-pulse delay-700">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Back to Dashboard</span>
                </Link>
              </Button>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white border-4 border-black shadow-lg">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-3 border-black rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900">
                  {projects.length}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">All Projects</h1>
              <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black">
                Manage and track all your projects! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Search + Add */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-600" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-12 h-12 border-3 border-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsAddProjectDialogOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {isLoading && <p>Loading projects...</p>}
        {isError && <p>Failed to load projects</p>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...(data?.data || [])]
            .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((project: any, index: number) => {
              // Random màu 
              const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
              const color = project.color || colors[Math.floor(Math.random() * colors.length)];

              // Xử lý progress và tasks
              let totalTasks = project.tasks?.length || 0;
              let completedTasks = 0;
              let progress = 0;

              if (totalTasks > 0) {
                completedTasks = project.tasks.filter((task: any) => task.status === "done").length;
                progress = Math.round((completedTasks / totalTasks) * 100);
              }

              return (
                <Card
                  key={project.id}
                  className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-3 border-black bg-white hover:scale-105 transform hover:-rotate-1`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white text-lg font-black shadow-lg border-2 border-black transform rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                        {project.name.split(" ").map((word: string) => word[0]).join("").slice(0, 2)}
                      </div>
                      <CardTitle className="text-xl font-black text-gray-900">{project.name}</CardTitle>
                    </div>
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
                        {progress}% Complete
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center pt-0">
                    <div className="text-sm font-bold text-gray-700">
                      <span className="text-gray-900 font-black text-lg">{completedTasks}</span> / {totalTasks} Tasks
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-2 border-black bg-white text-gray-900 rounded-xl font-black shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-50"
                    >
                      <Link href={`/dashboard/project/${project.id}`}>View Project</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Add Project Dialog */}
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
