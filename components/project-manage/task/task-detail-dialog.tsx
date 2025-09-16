import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Star, Heart, Sparkle, Plus, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
// shadcn toast
import { useToast } from "@/components/ui/use-toast"
import { UITask } from "../task-board"
import { useState } from "react"
import { lightenHex, useTaskDetail } from "./useTaskDetail"
import { Status, Tag } from "@/types/taskType"

type TaskDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: UITask
  columnId?: string | null
  mode?: "create" | "edit"
  onTaskUpdated?: () => void
  onTaskSaved?: () => void
  projectTags?: Tag[]
}

export function TaskDetailDialog({
  open,
  onOpenChange,
  task,
  mode = "edit",
  projectTags,
  onTaskSaved,
}: TaskDetailDialogProps) {
  const { toast } = useToast()
  const {
    title, setTitle,
    description, setDescription,
    status, setStatus,
    priority, setPriority,
    dueDate, setDueDate,
    localSubtasks, setLocalSubtasks,
    localNotes,
    localTags,
    tagInput, setTagInput,
    tagColorInput, setTagColorInput,
    newSubtask, setNewSubtask,
    newNote, setNewNote,
    addSubtaskLocal,
    deleteSubtaskLocal,
    toggleSubtaskLocal,
    addNoteLocal,
    deleteNoteLocal,
    addTagLocal,
    deleteTagLocal,
    saveChanges,
    updateSubtaskStatusLocal,

    localAttachments,
    addAttachmentLocal,
    deleteAttachmentLocal
  } = useTaskDetail({
    open,
    mode,
    task,
    onClose: () => onOpenChange(false),
    onSaved: () => onTaskSaved?.(),
  })

  const [pendingFile, setPendingFile] = useState<File | null>(null)

  const handleAddFile = async () => {
    if (!pendingFile) return
    await addAttachmentLocal(pendingFile)
    setPendingFile(null)
  }

  const handleDeleteFile = async (id: number) => {
    await deleteAttachmentLocal(id)
  }
  const handleAddSubtaskLocal = () => {
    addSubtaskLocal(newSubtask)
    setNewSubtask("")
  }

  const handleDeleteSubtaskLocal = (id: string) => deleteSubtaskLocal(id)

  const handleAddNoteLocal = () => {
    addNoteLocal(newNote)
    setNewNote("")
  }

  const handleAddTagLocal = () => {
    addTagLocal(tagInput, tagColorInput)
    setTagInput("")
    setTagColorInput("#ff0000")
  }

  const handleSaveChanges = async () => {
    try {
      await saveChanges()
      toast({ description: mode === "create" ? "Task created successfully!" : "Task updated successfully!" })
    } catch (err) {
      console.error("Error saving changes:", err)
      toast({ variant: "destructive", description: "Failed to save changes." })
    }
  }

  // ------- Cancel -------
  const handleCancel = () => {
    onOpenChange(false)
  }

  // ------- Render -------
  const completedCount = localSubtasks.filter(st => st.completed).length
  const progressValue = (completedCount / (localSubtasks.length || 1)) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-xl border-3 border-black shadow-xl bg-white">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="absolute top-4 right-8">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-8 right-16">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
          </div>
          <div className="absolute top-6 right-24">
            <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              {mode === "create" ? "Create New Task ✨" : "Task Details ✨"}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6 space-y-6">
          {/* Title & Description */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-900">Task Title</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border-2 border-black rounded-xl bg-gray-50 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-gray-900">Description</Label>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border-2 border-black rounded-xl bg-gray-50 font-medium min-h-[100px]"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-do">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="need-review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-900">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-2 border-black rounded-xl bg-gray-50">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? dueDate.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Subtasks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-gray-900">Subtasks</Label>
              <span className="text-sm font-bold text-gray-600">
                {completedCount}/{localSubtasks.length} completed
              </span>
            </div>
            <Progress value={progressValue} className="h-2 border-2 border-black bg-gray-100" />
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {localSubtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-black group">
                  <Checkbox
                    checked={subtask.status === "done"}
                    disabled
                    className="w-5 h-5 border-2 border-black rounded-md"
                  />                  <span className={`flex-1 text-sm font-medium ${subtask.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {subtask.title}
                  </span>
                  {/* Dropdown cho trạng thái subtask */}
                  <Select
                    value={subtask.status || "to-do"}
                    onValueChange={(v) => updateSubtaskStatusLocal(subtask.id, v as Status)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-do">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="need-review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteSubtaskLocal(subtask.id)} className="hover:bg-red-100 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Add a subtask..." value={newSubtask} onChange={(e) => setNewSubtask(e.target.value)} className="border-2 border-black rounded-xl bg-gray-50" />
              <Button onClick={handleAddSubtaskLocal} className="bg-green-400 hover:bg-green-500 text-white rounded-xl font-bold border-2 border-black">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Files */}
          <div className="space-y-4">
            <Label className="font-bold text-gray-900">Files</Label>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {localAttachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-black group">
                  <a href={file.file_url ?? undefined} download className="text-sm font-medium text-blue-600 underline">{file.file_name}</a>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteFile(file.id)} className="hover:bg-red-100 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input type="file" onChange={(e) => setPendingFile(e.target.files?.[0] || null)} className="border-2 border-black rounded-xl bg-gray-50" />
              <Button onClick={handleAddFile} disabled={!pendingFile} className="bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-bold border-2 border-black">
                Add File
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <Label className="font-bold text-gray-900">Notes</Label>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {localNotes.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-black group">
                  <span className="text-sm font-medium text-gray-900">{note.description}</span>
                  <Button size="sm" variant="ghost" onClick={() => deleteNoteLocal(note.id)} className="hover:bg-red-100 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="border-2 border-black rounded-xl bg-gray-50"
              />
              <Button onClick={handleAddNoteLocal} className="bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-bold border-2 border-black">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-900">Tags</Label>

            {/* Selected tags */}
            <div className="flex flex-wrap gap-2">
              {localTags.map((t, idx) => (
                <div
                  key={idx} // dùng index hoặc tạo id local
                  className="flex items-center gap-2 px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: lightenHex(t.color, 0.5),
                    color: "#000",
                  }}
                >
                  <span className="font-medium">{t.tag_name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTagLocal(Number(t.id))}
                    className="hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Dropdown chọn từ tag có sẵn */}
            <div className="flex gap-2 mt-2">
              <Select
                onValueChange={(value) => {
                  const selectedTag = projectTags?.find((t) => String(t.id) === value)
                  if (selectedTag) {
                    // 🚀 Thêm tag mới dựa trên name + color, không mang id cũ
                    addTagLocal(selectedTag.tag_name, selectedTag.color)
                  }
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select existing tag" />
                </SelectTrigger>
                <SelectContent>
                  {projectTags
                    ?.filter(tag => !localTags.some(t => t.tag_name === tag.tag_name)) // bỏ tag đã có
                    .map((tag) => (
                      <SelectItem key={Number(tag.id)} value={String(tag.id)}>
                        {tag.tag_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Ô nhập nếu muốn thêm mới */}
              <Input
                placeholder="Add new tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border-2 border-black rounded-xl bg-gray-50"
              />
              <input
                type="color"
                value={tagColorInput}
                onChange={(e) => setTagColorInput(e.target.value)}
                className="w-12 h-10 p-1 border-2 border-black rounded-lg cursor-pointer"
              />
              <Button
                onClick={handleAddTagLocal}
                className="bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-bold border-2 border-black"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white bottom-0 z-10">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel} className="border-2 border-black rounded-xl bg-white font-bold">
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveChanges} className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-bold border-2 border-black">
              {mode === "create" ? "Create Task" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  )
}