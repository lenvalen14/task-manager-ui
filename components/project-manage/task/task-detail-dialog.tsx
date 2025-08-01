import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Star, Heart, Sparkle } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2 } from "lucide-react"

export type SubTask = {
  id: string
  title: string
  completed: boolean
}

export type Task = {
  id: string
  tag: string
  tagColor: string
  title: string
  description: string
  subtasks: SubTask[]
  progress?: number // Calculated from subtasks completion
}

type TaskColumn = {
  id: string
  title: string
}

type TaskDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  columnId?: string | null
  mode?: 'create' | 'edit'
}

export function TaskDetailDialog({ 
  open, 
  onOpenChange, 
  task, 
  columnId,
  mode = 'edit' 
}: TaskDetailDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [newSubtask, setNewSubtask] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-xl border-3 border-black shadow-xl bg-white">
        {/* Fixed Header */}
        <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          {/* Decorative elements */}
          <div className="absolute top-4 right-8">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-8 right-16">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
          </div>
          <div className="absolute top-6 right-24">
            <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
          </div>

          <DialogHeader className="mb-0">
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              {mode === 'create' ? 'Create New Task ✨' : 'Task Details ✨'}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="font-bold text-gray-900">Task Title</Label>
                <Input
                  defaultValue={task?.title}
                  className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-gray-900">Description</Label>
                <Textarea
                  defaultValue={task?.description}
                  className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-900">Status</Label>
                  <Select defaultValue="in-progress">
                    <SelectTrigger className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-do">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-gray-900">Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-gray-900">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-2 border-black rounded-xl bg-gray-50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Subtasks Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-bold text-gray-900">Subtasks</Label>
                  <span className="text-sm font-bold text-gray-600">
                    {task?.subtasks.filter(st => st.completed).length || 0}/{task?.subtasks.length || 0} completed
                  </span>
                </div>

                {/* Progress Bar */}
                <Progress 
                  value={task?.progress || 0} 
                  className="h-2 border-2 border-black bg-gray-100"
                />

                {/* Subtasks List */}
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {task?.subtasks.map((subtask) => (
                    <div 
                      key={subtask.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-black group hover:bg-gray-100 transition-colors"
                    >
                      <Checkbox 
                        id={subtask.id}
                        checked={subtask.completed}
                        className="w-5 h-5 border-2 border-black rounded-md data-[state=checked]:bg-green-500"
                      />
                      <label 
                        htmlFor={subtask.id}
                        className={`flex-1 text-sm font-medium ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                      >
                        {subtask.title}
                      </label>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add Subtask Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                  <Button 
                    className="bg-green-400 hover:bg-green-500 text-white rounded-xl font-bold border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-gray-200 bg-white bottom-0 z-10">
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2 border-black rounded-xl bg-white hover:bg-gray-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-bold border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {mode === 'create' ? 'Create Task' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}