"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProjectCard } from "./ProjectCard"

// Định nghĩa kiểu dữ liệu (TypeScript) cho một Project
interface Project {
  id: string | number
  name: string
  color?: string
  created_at: string
  tasks: { status: string }[]
}

// Định nghĩa các props mà component này nhận vào
interface RecentProjectsProps {
  projects: Project[] | undefined
  onDeleteProject: (id: string | number) => void
  deletingProjectId: string | number | null
}

export function RecentProjects({
  projects,
  onDeleteProject,
  deletingProjectId,
}: RecentProjectsProps) {
  return (
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
          <Link href="/dashboard/project" className="flex items-center gap-3">
            View All Projects
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...(projects || [])]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 3)

          .map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDelete={onDeleteProject}
              isDeleting={deletingProjectId === project.id}
            />
          ))}
      </div>
    </div>
  )
}