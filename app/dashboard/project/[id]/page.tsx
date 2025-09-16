import { ProjectView } from "@/components/project-manage/project-view"

export default function ProjectDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-auto">

      <div className="flex-1">
        <ProjectView />
      </div>
    </div>
  )
}
