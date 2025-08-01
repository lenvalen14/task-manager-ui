"use client" // Make this a client component

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRight, ListTodo, Clock, CheckCircle, TrendingUp, Sparkles, Star, Heart, Zap } from "lucide-react"
import Link from "next/link"
import { AddProjectDialog } from "@/components/project-manage/project/add-project-dialog"
import React from "react"

// Dữ liệu giả định cho biểu đồ và thống kê
const dashboardStats = [
  {
    title: "Tasks Completed",
    value: "85",
    change: "+12% from last week",
    icon: CheckCircle,
    bgColor: "bg-green-300",
    borderColor: "border-green-500",
    hoverColor: "hover:bg-green-400",
  },
  {
    title: "Tasks Due Soon",
    value: "7",
    change: "3 overdue",
    icon: ListTodo,
    bgColor: "bg-yellow-300",
    borderColor: "border-yellow-500",
    hoverColor: "hover:bg-yellow-400",
  },
  {
    title: "Total Time Logged",
    value: "150.5h",
    change: "+5% this month",
    icon: Clock,
    bgColor: "bg-blue-300",
    borderColor: "border-blue-500",
    hoverColor: "hover:bg-blue-400",
  },
  {
    title: "Overall Progress",
    value: "55%",
    change: "Across all projects",
    icon: TrendingUp,
    bgColor: "bg-purple-300",
    borderColor: "border-purple-500",
    hoverColor: "hover:bg-purple-400",
  },
]

type ProjectSummary = {
  id: string
  name: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  color: string
  bgColor: string
  borderColor: string
}

const recentProjects: ProjectSummary[] = [
  { 
    id: "1", 
    name: "Piper Enterprise", 
    progress: 65, 
    tasksCompleted: 80, 
    totalTasks: 124, 
    color: "bg-pink-400",
    bgColor: "bg-pink-200",
    borderColor: "border-pink-500"
  },
  { 
    id: "2", 
    name: "Web Platform Redesign", 
    progress: 40, 
    tasksCompleted: 15, 
    totalTasks: 30, 
    color: "bg-indigo-400",
    bgColor: "bg-indigo-200",
    borderColor: "border-indigo-500"
  },
  { 
    id: "3", 
    name: "Mobile App V2", 
    progress: 90, 
    tasksCompleted: 45, 
    totalTasks: 50, 
    color: "bg-emerald-400",
    bgColor: "bg-emerald-200",
    borderColor: "border-emerald-500"
  },
]

export default function DashboardPage() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)

  return (
    <>
      <div className="flex-1 min-h-screen overflow-auto bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 w-full">
        {/* Hero Section */}
        <div className="relative px-6 pt-8 pb-8 md:px-12 md:pt-12 md:pb-10">
          {/* Decorative elements */}
          <div className="absolute top-4 right-8">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
          </div>
          <div className="absolute top-8 right-20">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse delay-300" />
          </div>
          <div className="absolute top-12 right-32">
            <Zap className="w-5 h-5 text-blue-400 fill-blue-400 animate-pulse delay-700" />
          </div>
          <div className="absolute top-6 left-8">
            <Sparkles className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg transform rotate-3">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              Good morning, Alison!
            </h1>
          </div>
          <p className="text-gray-700 text-xl font-bold bg-yellow-200 inline-block px-4 py-2 rounded-full border-2 border-black shadow-md transform -rotate-1">
            Here's what's happening with your projects today ✨
          </p>
        </div>

        <div className="px-6 pb-12 md:px-12">
          {/* Stats Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 mt-8">
            {dashboardStats.map((stat, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-3 border-black ${stat.bgColor} ${stat.hoverColor} hover:scale-110 cursor-pointer transform hover:-rotate-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-black text-gray-900 uppercase tracking-wide">{stat.title}</CardTitle>
                  <div className={`p-3 rounded-xl bg-white border-2 border-black shadow-md group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className="h-6 w-6 text-gray-900" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-sm text-gray-800 font-bold bg-white px-2 py-1 rounded-full border-2 border-black shadow-sm inline-block">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Projects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black text-gray-900 bg-blue-200 px-6 py-3 rounded-2xl border-3 border-black shadow-lg transform -rotate-1">
                Recent Projects 🚀
              </h2>
              <Button 
                variant="ghost" 
                asChild 
                className="text-gray-900 font-black px-6 py-3 rounded-xl border-2 border-black bg-white hover:bg-pink-100 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Link href="/dashboard/projects" className="flex items-center gap-3">
                  View All Projects 
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-3 border-black bg-white hover:scale-105 transform hover:-rotate-1`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${project.color} flex items-center justify-center text-white text-lg font-black shadow-lg border-2 border-black transform rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                        {project.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                      <CardTitle className="text-xl font-black text-gray-900">{project.name}</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="relative mb-3">
                        <div className="w-full h-4 bg-gray-200 rounded-full shadow-inner overflow-hidden">
                          <div 
                            className={`h-full ${project.color} rounded-full transition-all duration-500 ease-out`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-gray-900 bg-yellow-200 px-3 py-1 rounded-full border-2 border-black shadow-sm">
                        {project.progress}% Complete
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center pt-0">
                    <div className="text-sm font-bold text-gray-700">
                      <span className="text-gray-900 font-black text-lg">{project.tasksCompleted}</span> / {project.totalTasks} Tasks
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
              ))}
            </div>
          </div>

          {/* Add Project Button */}
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
      <AddProjectDialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen} />
    </>
  )
}