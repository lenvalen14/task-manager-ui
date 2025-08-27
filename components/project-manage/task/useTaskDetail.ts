import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateAllOfTaskMutation,
  useUpdateStatusTaskMutation,
} from "@/services/taskService"
import { useCreateNoteMutation, useDeleteNoteMutation } from "@/services/noteService"
import { useCreateTagMutation, useDeleteTagMutation } from "@/services/tagService"
import type { Note, Tag, TaskCreateAllRequest, TaskUpdateRequset } from "@/types/taskType"
import type { UITask } from "../task-board"

export type SubTask = {
  id: string
  title: string
  completed: boolean
}

export type UseTaskDetailOptions = {
  open: boolean
  mode?: "create" | "edit"
  task?: UITask
  onClose: () => void
  onSaved?: () => void
}

// Date helpers (avoid timezone drift by using YYYY-MM-DD strings internally)
const toDateString = (date: Date | undefined): string | undefined => {
  if (!date) return undefined
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

const fromDateString = (dateStr: string | undefined): Date | undefined => {
  if (!dateStr) return undefined
  const [y, m, d] = dateStr.split("-").map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

const normalizeIncomingDate = (value: unknown): string | undefined => {
  if (!value) return undefined
  try {
    // value might be ISO string, date-only string, or Date
    if (value instanceof Date) return toDateString(value)
    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
      const d = new Date(value)
      if (!isNaN(d.getTime())) return toDateString(d)
    }
  } catch {}
  return undefined
}

const makeTempStringId = () => `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
const makeTempNumberId = () => -Date.now()

export function useTaskDetail({ open, mode = "edit", task, onClose, onSaved }: UseTaskDetailOptions) {
  const params = useParams()
  const projectId = Number(params?.id)

  const [createTask] = useCreateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [createAllOfTask] = useCreateAllOfTaskMutation()
  const [updatedSubtasksStatus] = useUpdateStatusTaskMutation()
  const [createNote] = useCreateNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()
  const [createTag] = useCreateTagMutation()
  const [deleteTag] = useDeleteTagMutation()

  const [originalTask, setOriginalTask] = useState<UITask | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"to-do" | "in-progress" | "need-review" | "done">("to-do")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [dueDateStr, setDueDateStr] = useState<string | undefined>(undefined)

  const [localSubtasks, setLocalSubtasks] = useState<SubTask[]>([])
  const [localNotes, setLocalNotes] = useState<Note[]>([])
  const [localTags, setLocalTags] = useState<Tag[]>([])

  const [tagInput, setTagInput] = useState("")
  const [tagColorInput, setTagColorInput] = useState("#ff0000")
  const [newSubtask, setNewSubtask] = useState("")
  const [newNote, setNewNote] = useState("")

  // Initialize/reset when dialog opens or task changes
  useEffect(() => {
    if (!open) return
    if (mode === "edit" && task) {
      setOriginalTask(task)
      setTitle(task.title || "")
      setDescription(task.description || "")
      setStatus((task.status as any) || "to-do")
      setPriority((task.priority as any) || "medium")
      setDueDateStr(normalizeIncomingDate((task as any).dueDate ?? (task as any).deadline))
      setLocalSubtasks(task.subtasks || [])
      setLocalNotes(task.notes || [])
      setLocalTags(task.tags || [])
    } else {
      setOriginalTask(null)
      setTitle("")
      setDescription("")
      setStatus("to-do")
      setPriority("medium")
      setDueDateStr(undefined)
      setLocalSubtasks([])
      setLocalNotes([])
      setLocalTags([])
    }
    setTagInput("")
    setTagColorInput("#ff0000")
    setNewSubtask("")
    setNewNote("")
  }, [open, mode, task])

  // Diffs
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
    const origSubtasks: SubTask[] = (orig.subtasks as unknown as SubTask[]) || []
    const origNotes: Note[] = (orig.notes as unknown as Note[]) || []
    const origTags: Tag[] = (orig.tags as unknown as Tag[]) || []

    const addedSubtasks = localSubtasks.filter(st => !origSubtasks.some((o: SubTask) => o.id === st.id))
    const deletedSubtasks = origSubtasks.filter((o: SubTask) => !localSubtasks.some(st => st.id === o.id))
    const updatedSubtasks = localSubtasks.filter(st => {
      const match = origSubtasks.find((o: SubTask) => o.id === st.id)
      if (!match) return false
      return match.title !== st.title || match.completed !== st.completed
    })

    const addedNotes = localNotes.filter(n => !origNotes.some((o: Note) => o.id === n.id))
    const deletedNotes = origNotes.filter((o: Note) => !localNotes.some(n => n.id === o.id))

    const addedTags = localTags.filter(t => !origTags.some((o: Tag) => o.id === t.id))
    const deletedTags = origTags.filter((o: Tag) => !localTags.some(t => t.id === o.id))

    const origDueDateStr = normalizeIncomingDate((orig as any).dueDate ?? (orig as any).deadline)
    const infoChanged =
      (orig.title || "") !== title ||
      (orig.description || "") !== description ||
      (orig.status || "to-do") !== status ||
      (orig.priority || "medium") !== priority ||
      (origDueDateStr || null) !== (dueDateStr || null)

    return {
      subtasks: { added: addedSubtasks, deleted: deletedSubtasks, updated: updatedSubtasks },
      notes: { added: addedNotes, deleted: deletedNotes },
      tags: { added: addedTags, deleted: deletedTags },
      infoChanged,
    }
  }, [originalTask, localSubtasks, localNotes, localTags, title, description, status, priority, dueDateStr])

  // Local handlers
  const addSubtaskLocal = (titleInput: string) => {
    const trimmed = titleInput.trim()
    if (!trimmed) return
    const temp: SubTask = { id: makeTempStringId(), title: trimmed, completed: false }
    setLocalSubtasks(prev => [...prev, temp])
  }
  const deleteSubtaskLocal = (id: string) => {
    setLocalSubtasks(prev => prev.filter(st => st.id !== id))
  }
  const toggleSubtaskLocal = (id: string, checked: boolean) => {
    setLocalSubtasks(prev => prev.map(st => (st.id === id ? { ...st, completed: checked } : st)))
  }

  const addNoteLocal = (desc: string) => {
    const trimmed = desc.trim()
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
  }
  const deleteNoteLocal = (id: number) => {
    setLocalNotes(prev => prev.filter(n => n.id !== id))
  }

  const addTagLocal = (name: string, color: string) => {
    const tagName = name.trim()
    if (!tagName) return
    const temp: Tag = { id: makeTempNumberId(), tag_name: tagName, color: color || "#ff0000" }
    setLocalTags(prev => [...prev, temp])
  }
  const deleteTagLocal = (id: number) => {
    setLocalTags(prev => prev.filter(t => t.id !== id))
  }

  const saveChanges = async () => {
    if (mode === "create") {
      const payload: TaskCreateAllRequest = {
        title,
        description,
        deadline: dueDateStr, // backend expects YYYY-MM-DD (avoid timezone issues)
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
      onClose()
      onSaved?.()
      return
    }

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
            deadline: dueDateStr ?? null,
          } as TaskUpdateRequset,
        }).unwrap()
      )
    }

    if (diffs.subtasks.added.length) {
      requests.push(
        ...diffs.subtasks.added.map((st: SubTask) =>
          createTask({
            title: st.title,
            description: "",
            deadline: null,
            project: projectId,
            parent_task: Number(originalTask.id),
            status: st.completed ? "done" : "to-do",
          } as any).unwrap()
        )
      )
    }

    if (diffs.subtasks.deleted.length) {
      requests.push(...diffs.subtasks.deleted.map(st => deleteTask(Number(st.id)).unwrap()))
    }

    if (diffs.subtasks.updated.length) {
      requests.push(
        ...diffs.subtasks.updated.map((st: SubTask) =>
          updatedSubtasksStatus({
            id: Number(st.id),
            body: { status: st.completed ? "done" : "to-do" },
          }).unwrap()
        )
      )
    }

    if (diffs.notes.added.length) {
      requests.push(
        ...diffs.notes.added.map((n: Note) => createNote({ task: Number(originalTask.id), description: n.description }).unwrap())
      )
    }
    if (diffs.notes.deleted.length) {
      requests.push(...diffs.notes.deleted.map(n => deleteNote(n.id).unwrap()))
    }

    if (diffs.tags.added.length) {
      requests.push(
        ...diffs.tags.added.map((t: Tag) => createTag({ task: Number(originalTask.id), tag_name: t.tag_name, color: t.color }).unwrap())
      )
    }
    if (diffs.tags.deleted.length) {
      requests.push(...diffs.tags.deleted.map(t => deleteTag(Number(t.id)).unwrap()))
    }

    await Promise.all(requests)
    onClose()
    onSaved?.()
  }

  return {
    // state
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    dueDateStr,
    setDueDateStr,
    dueDate: fromDateString(dueDateStr),
    setDueDate: (d?: Date) => setDueDateStr(toDateString(d)),

    // lists
    localSubtasks,
    setLocalSubtasks,
    localNotes,
    setLocalNotes,
    localTags,
    setLocalTags,

    // inputs
    tagInput,
    setTagInput,
    tagColorInput,
    setTagColorInput,
    newSubtask,
    setNewSubtask,
    newNote,
    setNewNote,

    // handlers
    addSubtaskLocal,
    deleteSubtaskLocal,
    toggleSubtaskLocal,
    addNoteLocal,
    deleteNoteLocal,
    addTagLocal,
    deleteTagLocal,

    // save
    saveChanges,
  }
}

export const lightenHex = (hex: string, percent: number = 0.5) => {
  if (!hex) return "#e5e7eb"
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  r = Math.round(r + (255 - r) * percent)
  g = Math.round(g + (255 - g) * percent)
  b = Math.round(b + (255 - b) * percent)
  return `rgb(${r}, ${g}, ${b})`
}


