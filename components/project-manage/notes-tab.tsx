import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Star, Edit3 } from "lucide-react"

type Note = {
  id: string
  date: string
  content: string
}

const notes: Note[] = [
  {
    id: "n1",
    date: "2025-07-29",
    content: "Discussed wireframe iterations with the client. They prefer a cleaner navigation flow.",
  },
  {
    id: "n2",
    date: "2025-07-28",
    content: "Initial research on competitor features is complete. Need to compile a summary report.",
  },
  {
    id: "n3",
    date: "2025-07-27",
    content: "Meeting scheduled for next week to review branding guidelines with the design team.",
  },
]

export function NotesTab() {
  return (
    <div className="flex flex-col h-full relative">
      {/* Decorative stars */}
      <div className="absolute top-4 right-4 z-10">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
      </div>
      <div className="absolute top-8 right-12 z-10">
        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse delay-700" />
      </div>

      {/* Add New Note Card */}
      <Card className="mb-8 border border-gray-300 shadow-lg rounded-2xl bg-yellow-50 transform hover:scale-105 transition-all duration-200">
        <CardHeader className="bg-yellow-100 rounded-t-xl">
          <div className="flex items-center gap-3">
            <Edit3 className="w-6 h-6 text-gray-900" />
            <CardTitle className="text-2xl font-black text-gray-900">Add New Note</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            placeholder="Write your brilliant thoughts here..."
            className="mb-4 border-2 border-gray-300 focus:border-pink-400 rounded-xl bg-white text-gray-900 font-medium placeholder:text-gray-500 min-h-[120px] text-lg"
            rows={4}
          />
          <Button className="w-full bg-pink-400 hover:bg-pink-500 text-gray-900 font-black text-lg py-4 rounded-xl border border-gray-400 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />
            Add Awesome Note
          </Button>
        </CardContent>
      </Card>

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-black text-gray-900">All Notes</h2>
        <div className="bg-blue-300 text-gray-900 px-4 py-2 rounded-full text-lg font-bold border border-gray-400 shadow-md">
          {notes.length} notes
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {notes.map((note, index) => (
          <Card
            key={note.id}
            className="border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl bg-white transform hover:scale-105 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              {/* Note Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-300 rounded-full border border-gray-400 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">ME</span>
                  </div>
                  <span className="font-black text-gray-900 text-lg">You</span>
                </div>
                <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-bold border border-gray-400">
                  {note.date}
                </div>
              </div>

              {/* Note Content */}
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                {note.content}
              </p>

              {/* Note Actions */}
              <div className="flex justify-end mt-4 pt-3 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-yellow-100 font-bold border border-transparent hover:border-gray-300 rounded-lg transition-all duration-200"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State or Add More */}
        <div className="text-center py-8">
          <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-2xl p-8 hover:border-gray-500 hover:bg-gray-200 transition-all duration-200 cursor-pointer">
            <Plus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 font-bold text-lg">Add more notes to keep track of your thoughts!</p>
          </div>
        </div>
      </div>
    </div>
  )
}