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
import { useGetAllProjectsQuery } from "@/services/projectService"

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Time & Reports", href: "/dashboard/time-reports", icon: Clock },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false)

  // gọi API lấy projects
  const { data: projectsData, isLoading } = useGetAllProjectsQuery()
  const projects = projectsData?.data?.slice(0, 5) || []

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col shrink-0 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 px-4">
        <img
          src="/logo.svg"
          alt="Managemate Logo"
          className="w-[100px] h-[100px]"
        />
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Projects
        </h2>

        {isLoading ? (
          // Skeleton loading
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full bg-gray-100 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          // Trường hợp chưa có project nào
          <div className="flex flex-col items-center text-gray-500 text-sm">
            <p className="mb-2">No projects yet</p>
            <Button
              onClick={() => setIsAddProjectDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Button>
          </div>
        ) : (
          // Hiển thị project list
          <ScrollArea className="h-[180px]">
            <nav className="grid gap-1">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/project/${project.id}`}
                  className="flex items-center justify-between p-2 rounded-lg text-sm hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2">{project.name}</div>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        )}
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Navigation
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

      {/* Time logged */}
      <div className="mb-6 mt-auto pt-4 border-t border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Time Logged
        </h2>
        <div className="text-2xl font-bold mb-1 text-gray-900">23.7 hours</div>
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
          2.5% from last week
        </div>
      </div>

      {/* Nút Add Project chung (chỉ hiện khi có project) */}
      {projects.length > 0 && (
        <Button
          onClick={() => setIsAddProjectDialogOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      )}

      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
      />
    </aside>
  )
}
