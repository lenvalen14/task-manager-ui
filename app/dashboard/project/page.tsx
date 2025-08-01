"use client" // Make this a client component

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ArrowLeft, FolderOpen, Star } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import React from "react"

type Project = {
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

const allProjects: Project[] = [
  {
    id: "1",
    name: "Piper Enterprise",
    description: "Main product development for Q3, focusing on new features and performance.",
    status: "In Progress",
    progress: 65,
    tasksCompleted: 80,
    totalTasks: 124,
    updatedAt: "2025-07-30T10:00:00Z",
    color: "bg-pink-400",
    bgColor: "bg-pink-50"
  },
  {
    id: "2",
    name: "Web Platform Redesign",
    description: "Revamp existing website with new UI/UX, improving user engagement.",
    status: "Planning",
    progress: 10,
    tasksCompleted: 5,
    totalTasks: 50,
    updatedAt: "2025-07-29T15:30:00Z",
    color: "bg-blue-400",
    bgColor: "bg-blue-50"
  },
  {
    id: "3",
    name: "Mobile App V2",
    description: "Develop new features for mobile application, including offline mode.",
    status: "Completed",
    progress: 100,
    tasksCompleted: 45,
    totalTasks: 45,
    updatedAt: "2025-07-27T08:00:00Z",
    color: "bg-green-400",
    bgColor: "bg-green-50"
  },
  {
    id: "4",
    name: "Marketing Campaign Q4",
    description: "Plan and execute Q4 marketing strategies across all channels.",
    status: "To Do",
    progress: 0,
    tasksCompleted: 0,
    totalTasks: 20,
    updatedAt: "2025-07-23T11:00:00Z",
    color: "bg-yellow-400",
    bgColor: "bg-yellow-50"
  },
  {
    id: "5",
    name: "Internal Tooling Improvement",
    description: "Enhance internal tools for efficiency and automation of workflows.",
    status: "In Progress",
    progress: 30,
    tasksCompleted: 10,
    totalTasks: 35,
    updatedAt: "2025-07-25T14:00:00Z",
    color: "bg-purple-400",
    bgColor: "bg-purple-50"
  },
]

const statusColors = {
  "In Progress": "bg-blue-300 text-gray-900 border-2 border-blue",
  "Planning": "bg-yellow-300 text-gray-900 border-2 border-yellow",
  "Completed": "bg-green-300 text-gray-900 border-2 border-green",
  "To Do": "bg-gray-300 text-gray-900 border-2 border-gray"
}

export default function AllProjectsPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)

  // Helper to format date for display
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
      <div className="flex-1 min-h-screen overflow-auto bg-white w-full">
        {/* Header Section */}
        <div className="relative px-8 pt-6 bg-white">
          {/* Decorative stars */}
          <div className="absolute top-4 right-8">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-8 right-16">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse delay-300" />
          </div>
          <div className="absolute top-6 right-24">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse delay-700" />
          </div>
          
          <div className="flex items-center gap-8 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200"
            >
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white border-4 border-black shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-3 border-black rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-900">
                  {allProjects.length}
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  All Projects
                </h1>
                <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-full border-2 border-black shadow-sm inline-block">
                  Manage and track all your projects! ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-12">
          {/* Search and Add Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-600" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-12 h-12 border-3 border-black focus:border-pink-400 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-gray-900 font-semibold"
              />
            </div>
            <Button
              onClick={() => setIsAddProjectDialogOpen(true)}
              className="w-full sm:w-auto h-12 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-black shadow-lg hover:shadow-xl rounded-xl px-8 py-3 border-3 border-black transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Project
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white hover:scale-105 transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`relative w-12 h-12 rounded-xl ${project.color} flex items-center justify-center text-white text-lg font-black shadow-md border-2 border-black group-hover:scale-110 transition-transform duration-200 transform rotate-3 group-hover:rotate-0`}>
                      {project.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
                    </div>
                    <CardTitle className="text-xl font-black text-gray-900 group-hover:text-gray-800 tracking-tight">
                      {project.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 text-gray-700 text-sm font-semibold leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-2 rounded-full text-sm font-black shadow-md ${statusColors[project.status as keyof typeof statusColors]}`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-900 font-black bg-gray-200 px-3 py-1 rounded-full border-2 border-grey shadow-sm">
                      {formatRelativeTime(project.updatedAt)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="relative w-full h-4 bg-gray-200 rounded-full shadow-inner overflow-hidden">
                      <div 
                        className={`h-full ${project.color} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-900">
                      <span className="font-black bg-yellow-200 px-3 py-1 rounded-full border-2 border-grey shadow-sm">
                        {project.progress}% Complete
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full border-2 border-grey shadow-sm font-black">
                        {project.tasksCompleted} / {project.totalTasks} Tasks
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full mt-4 h-10 border-3 border-grey hover:border-black hover:bg-blue-300 bg-white text-gray-900 hover:text-gray-900 rounded-xl font-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href={`/dashboard/project/${project.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AddProjectDialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen} />
    </>
  )
}