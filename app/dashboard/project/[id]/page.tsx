import { Header } from "@/components/layout/header"
import { ProjectView } from "@/components/project-manage/project-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-auto">

      <div className="flex-1">
        <ProjectView />
      </div>
    </div>
  )
}
