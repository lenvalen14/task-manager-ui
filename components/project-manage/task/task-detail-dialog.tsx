import { useState, useEffect, useMemo } from "react"
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
import { Note, Tag } from "@/types/taskType"
import { useParams } from "next/navigation"

// RTK Query services
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateAllOfTaskMutation,
  useUpdateStatusTaskMutation,
} from "@/services/taskService"
import { useCreateNoteMutation, useDeleteNoteMutation } from "@/services/noteService"
import { useCreateTagMutation, useDeleteTagMutation } from "@/services/tagService"
import type { TaskCreateAllRequest, TaskCreateRequset, TaskUpdateRequset } from "@/types/taskType"

// shadcn toast (nếu bạn dùng sonner thì đổi import/usage tương ứng)
import { useToast } from "@/components/ui/use-toast"

export type SubTask = {
  id: string // id thật từ server hoặc id tạm "temp-xxxx"
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
  notes: Note[]
  progress?: number
  status?: string
  priority?: string
  dueDate?: Date
  tags?: Tag[]
}

type TaskDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  columnId?: string | null
  mode?: "create" | "edit"
  onTaskUpdated?: () => void
  onTaskSaved?: () => void
}

const lightenHex = (hex: string, percent: number = 0.5) => {
  if (!hex) return "#e5e7eb" // fallback gray
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.round(r + (255 - r) * percent)
  g = Math.round(g + (255 - g) * percent)
  b = Math.round(b + (255 - b) * percent)

  return `rgb(${r}, ${g}, ${b})`
}

export function TaskDetailDialog({
  open,
  onOpenChange,
  task,
  columnId,
  mode = "edit",
  onTaskUpdated,
  onTaskSaved,
}: TaskDetailDialogProps) {
  const params = useParams()
  const projectId = Number(params?.id)
  const { toast } = useToast()

  // ------- API hooks -------
  const [createTask] = useCreateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [createAllOfTask] = useCreateAllOfTaskMutation()
  const [updatedSubtasksStatus] = useUpdateStatusTaskMutation()

  const [createNote] = useCreateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()

  const [createTag] = useCreateTagMutation()
  const [deleteTag] = useDeleteTagMutation()

  // ------- Local editable states (draft) -------
  const [originalTask, setOriginalTask] = useState<Task | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"to-do" | "in-progress" | "need-review" | "done">("to-do")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // chỉ dùng cho input thêm tag mới
  const [tagInput, setTagInput] = useState("")
  const [tagColorInput, setTagColorInput] = useState("#ff0000")

  // các mảng có thể thêm/xóa/chỉnh sửa cục bộ
  const [localSubtasks, setLocalSubtasks] = useState<SubTask[]>([])
  const [localNotes, setLocalNotes] = useState<Note[]>([])
  const [localTags, setLocalTags] = useState<Tag[]>([])

  // input tiện lợi
  const [newSubtask, setNewSubtask] = useState("")
  const [newNote, setNewNote] = useState("")

  // ------- Helpers -------
  const isTempId = (id: string | number) => {
    if (typeof id === "string") return id.startsWith("temp-")
    return typeof id === "number" && id < 0
  }

  const makeTempStringId = () => `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const makeTempNumberId = () => -Date.now()

  // ------- Load task -> draft -------
  useEffect(() => {
    if (!open) return
    if (mode === "edit" && task) {
      setOriginalTask(task)
      setTitle(task.title || "")
      setDescription(task.description || "")
      setStatus((task.status as any) || "to-do")
      setPriority((task.priority as any) || "medium")
      setDate(task.dueDate ? new Date(task.dueDate) : undefined)
      setLocalSubtasks(task.subtasks || [])
      setLocalNotes(task.notes || [])
      setLocalTags(task.tags || [])
      setTagInput("")
      setTagColorInput("#ff0000")
      setNewSubtask("")
      setNewNote("")
    } else if (mode === "create") {
      setOriginalTask(null)
      setTitle("")
      setDescription("")
      setStatus("to-do")
      setPriority("medium")
      setDate(undefined)
      setLocalSubtasks([])
      setLocalNotes([])
      setLocalTags([])
      setTagInput("")
      setTagColorInput("#ff0000")
      setNewSubtask("")
      setNewNote("")
    }
  }, [task, open, mode])

  // ------- Add/remove/toggle in DRAFT ONLY -------
  // Subtasks
  const handleAddSubtaskLocal = () => {
    const trimmed = newSubtask.trim()
    if (!trimmed) return
    const temp: SubTask = { id: makeTempStringId(), title: trimmed, completed: false }
    setLocalSubtasks(prev => [...prev, temp])
    setNewSubtask("")
  }
  const handleDeleteSubtaskLocal = (id: string) => {
    setLocalSubtasks(prev => prev.filter(st => st.id !== id))
  }
  const handleToggleSubtaskLocal = (id: string, checked: boolean) => {
    setLocalSubtasks(prev => prev.map(st => (st.id === id ? { ...st, completed: checked } : st)))
  }

  // Notes
  const handleAddNoteLocal = () => {
    const trimmed = newNote.trim()
    if (!trimmed) return
    const temp: Note = {
      id: makeTempNumberId(),
      created_by: "current_user",
      task: originalTask ? Number(originalTask.id) : 0,
      description: trimmed,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setLocalNotes(prev => [...prev, temp])
    setNewNote("")
  }
  const handleDeleteNoteLocal = (id: number) => {
    setLocalNotes(prev => prev.filter(n => n.id !== id))
  }

  // Tags
  const handleAddTagLocal = () => {
    const name = tagInput.trim()
    if (!name) return
    const temp: Tag = {
      id: makeTempNumberId(),
      tag_name: name,
      color: tagColorInput || "#ff0000",
    }
    setLocalTags(prev => [...prev, temp])
    setTagInput("")
    setTagColorInput("#ff0000")
  }
  const handleDeleteTagLocal = (id: number) => {
    setLocalTags(prev => prev.filter(t => t.id !== id))
  }

  // ------- Diff logic for EDIT mode -------
  const diffs = useMemo(() => {
    if (!originalTask) {
      return {
        subtasks: { added: localSubtasks, deleted: [] as SubTask[], updated: [] as SubTask[] },
        notes: { added: localNotes, deleted: [] as Note[] },
        tags: { added: localTags, deleted: [] as Tag[] },
        infoChanged: true,
      }
    }
    const orig = originalTask

    // Subtasks
    const addedSubtasks = localSubtasks.filter(st => !orig.subtasks.some(o => o.id === st.id))
    const deletedSubtasks = orig.subtasks.filter(o => !localSubtasks.some(st => st.id === o.id))
    const updatedSubtasks = localSubtasks.filter(st => {
      const match = orig.subtasks.find(o => o.id === st.id)
      if (!match) return false
      return match.title !== st.title || match.completed !== st.completed
    })

    // Notes (chỉ tạo/xóa; không sửa nội dung ở UI hiện tại)
    const addedNotes = localNotes.filter(n => !orig.notes.some(o => o.id === n.id))
    const deletedNotes = orig.notes.filter(o => !localNotes.some(n => n.id === o.id))

    // Tags (chỉ tạo/xóa; không sửa tag_name/color ở UI hiện tại)
    const origTags = orig.tags || [];
    const addedTags = localTags.filter(t => !origTags.some(o => o.id === t.id));
    const deletedTags = origTags.filter(o => !localTags.some(t => t.id === o.id));


    // Info changed
    const infoChanged =
      (orig.title || "") !== title ||
      (orig.description || "") !== description ||
      (orig.status || "to-do") !== status ||
      (orig.priority || "medium") !== priority ||
      ((orig.dueDate && new Date(orig.dueDate).toISOString()) || null) !==
      (date ? date.toISOString() : null)


    return {
      subtasks: { added: addedSubtasks, deleted: deletedSubtasks, updated: updatedSubtasks },
      notes: { added: addedNotes, deleted: deletedNotes },
      tags: { added: addedTags, deleted: deletedTags },
      infoChanged,
    }
  }, [originalTask, localSubtasks, localNotes, localTags, title, description, status, priority, date])

  // ------- Save Changes -------
  const handleSaveChanges = async () => {
    try {
      if (mode === "create") {
        // build payload for createAllOfTask
        const payload: TaskCreateAllRequest = {
          title,
          description,
          deadline: date ? date.toISOString() : undefined,
          project: projectId,
          parent_task: null,
          status,
          priority,
          tags: localTags.map(t => ({ tag_name: t.tag_name, color: t.color })),
          subtasks_input: localSubtasks.map(st => ({
            title: st.title,
            description: "",
            deadline: undefined,
            status: st.completed ? "done" : "to-do",
            priority: "low",
          })),
          notes: localNotes.map(n => ({ description: n.description })),
        }

        await createAllOfTask(payload).unwrap()
        toast({ description: "Task created successfully!" })
        onOpenChange(false)
        onTaskSaved?.()
        return
      }

      // --- EDIT MODE ---
      if (!originalTask) return
      const requests: Promise<any>[] = []

      if (diffs.infoChanged) {
        requests.push(
          updateTask({
            id: Number(originalTask.id),
            body: {
              title,
              description,
              status,
              priority,
              deadline: date ? date.toISOString().split("T")[0] : null,
            } as TaskUpdateRequset
          }).unwrap()
        )
      }

      if (diffs.subtasks.added.length) {
        requests.push(...diffs.subtasks.added.map(st =>
          createTask({
            title: st.title,
            description: "",
            deadline: null,
            project: projectId,
            parent_task: Number(originalTask.id),
            status: st.completed ? "done" : "to-do",
          } as any).unwrap()
        ))
      }

      if (diffs.subtasks.deleted.length) {
        requests.push(...diffs.subtasks.deleted.map(st => deleteTask(Number(st.id)).unwrap()))
      }

      if (diffs.subtasks.updated.length) {
        requests.push(...diffs.subtasks.updated.map(st =>
          updatedSubtasksStatus({
            id: Number(st.id),
            body: {
              status: st.completed ? "done" : "to-do"
            }
          }).unwrap()
        ))
      }

      // Notes
      if (diffs.notes.added.length) {
        requests.push(...diffs.notes.added.map(n =>
          createNote({ task: Number(originalTask.id), description: n.description }).unwrap()
        ))
      }
      if (diffs.notes.deleted.length) {
        requests.push(...diffs.notes.deleted.map(n => deleteNote(n.id).unwrap()))
      }

      // Tags
      if (diffs.tags.added.length) {
        requests.push(...diffs.tags.added.map(t =>
          createTag({ task: Number(originalTask.id), tag_name: t.tag_name, color: t.color }).unwrap()
        ))
      }
      if (diffs.tags.deleted.length) {
        requests.push(...diffs.tags.deleted.map(t => deleteTag(Number(t.id)).unwrap()))
      }

      await Promise.all(requests)
      toast({ description: "Task updated successfully!" })
      onOpenChange(false)
      onTaskSaved?.()   // <-- gọi callback khi save xong

    } catch (err) {
      console.error("Error saving changes:", err)
      toast({ variant: "destructive", description: "Failed to save changes." })
    }
  }
  // ------- Cancel -------
  const handleCancel = () => {
    // Không gọi API, chỉ đóng dialog
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
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
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
                    checked={subtask.completed}
                    onCheckedChange={(v) => handleToggleSubtaskLocal(subtask.id, Boolean(v))}
                    className="w-5 h-5 border-2 border-black rounded-md"
                  />
                  <label className={`flex-1 text-sm font-medium ${subtask.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {subtask.title}
                  </label>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteSubtaskLocal(subtask.id)} className="hover:bg-red-100 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a subtask..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="border-2 border-black rounded-xl bg-gray-50"
              />
              <Button onClick={handleAddSubtaskLocal} className="bg-green-400 hover:bg-green-500 text-white rounded-xl font-bold border-2 border-black">
                <Plus className="w-4 h-4" />
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
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteNoteLocal((note.id))} className="hover:bg-red-100 hover:text-red-600">
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
            <div className="flex flex-wrap gap-2">
              {localTags.map((t) => (
                <div
                  key={Number(t.id)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: lightenHex(t.color, 0.5),
                    color: "#000", // chữ đen dễ đọc trên nền pastel
                  }}
                >
                  <span className="text-white font-medium">{t.tag_name}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteTagLocal(Number(t.id))} className="hover:bg-red-100 hover:text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add a tag..."
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
              <Button onClick={handleAddTagLocal} className="bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-bold border-2 border-black">
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
    </Dialog>
  )
}
