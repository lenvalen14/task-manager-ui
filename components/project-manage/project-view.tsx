import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoardPage } from "@/components/project-manage/task-board"
import { OverviewTab } from "@/components/project-manage/overview-tab"
import { NotesTab } from "@/components/project-manage/notes-tab"
import { Edit, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

export function ProjectView() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="relative px-8 pt-6 pb-8 bg-white">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200"
            >
              <Link href="/dashboard/project">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to Projects</span>
              </Link>
            </Button>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-pink-400 flex items-center justify-center text-white text-xl font-bold shadow-lg border-4 border-black transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  PE
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-3 border-black rounded-full shadow-md" />
              </div>

              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Piper Enterprise
                </h1>
                <div className="flex items-center gap-4">
                  {/* Custom Progress Bar */}
                  <div className="relative w-32 h-4 bg-gray-200 rounded-full shadow-inner overflow-hidden">
                    <div
                      className="h-full bg-pink-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: '13%' }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-gray-700 bg-yellow-200 px-3 py-1 rounded-full shadow-sm">
                    13% complete
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="bg-white text-gray-900 border-3 border-black shadow-lg hover:shadow-xl font-bold px-6 py-3 rounded-xl hover:bg-yellow-100 transition-all duration-200 transform hover:scale-105"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 px-8 bg-white border-b-4 border-pink-200 shadow-md">
        <Tabs defaultValue="tasks" className="flex flex-col">
          <TabsList className="w-full max-w-2xl h-16 bg-transparent gap-2 justify-start p-2">
            {[
              { value: "overview", label: "Overview", color: "bg-blue-300" },
              { value: "tasks", label: "Tasks", color: "bg-pink-300" },
              { value: "notes", label: "Notes", color: "bg-green-300" },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`px-6 py-3 font-bold text-gray-900 border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 data-[state=active]:${tab.color} data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:bg-white hover:bg-gray-50`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          <div className="pt-8">
            <TabsContent value="overview" className="flex-1">
              <div className="bg-white rounded-2xl p-6 mx-2">
                <OverviewTab />
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="flex-1">
              <div className="bg-white rounded-2xl p-6 mx-2">
                <BoardPage />
                {/* <TaskBoard className="flex gap-6 [&_.task-column-scroll]:h-[calc(100vh-300px)] [&_.task-column-scroll]:scrollbar-thin [&_.task-column-scroll]:scrollbar-track-transparent [&_.task-column-scroll]:scrollbar-thumb-pink-300 hover:[&_.task-column-scroll]:scrollbar-thumb-pink-400" /> */}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1">
              <div className="bg-white rounded-2xl p-6 mx-2">
                <NotesTab />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}