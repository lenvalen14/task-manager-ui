export type Priority = "low" | "medium" | "high" | "urgent"
export type Status = "to-do" | "in-progress" | "need-review" | "done"

export type Task = {
    id: number
    title: string
    description: string
    deadline: string | null
    priority: Priority
    status: Status
    created_at?: string
    updated_at?: string
    is_deleted?: boolean
    project: number
    parent_task: number | null
    tags?: Tag[]
    notes?: Note[]
}

export type TaskCreateResponse = {
    code: number
    message: string
    data: Task
    meta: any
    errors: any
}

export interface TaskUpdateResponse extends TaskCreateRequset { }

export type TaskCreateRequset = {
    title: string
    description: string
    deadline?: string | null
    priority?: Priority
    status?: Status
    project: number
    parent_task: number | null
}

export type TaskUpdateRequset = {
    title: string
    description: string
    deadline?: string | null
    priority?: Priority
    status?: Status
}

export interface Note {
    id: number
    created_by: string
    task: number
    description: string
    created_at: string
    updated_at: string
}

export interface NoteCreateRequest {
    task: Number
    description: string
}

export interface NoteCreateResponse {
    code: number
    message: string
    data: Note
    meta: any
    errors: any
}

export type Tag = {
    id: Number
    tag_name: string
    color: string
}

export interface TagCreateRequest {
    task: Number,
    tag_name: string,
    color: string
}

export interface TagCreateResponse {
    code: number
    message: string
    data: Tag
    meta: any
    errors: any
}

export interface TaskCreateAllRequest {
    title: string
    description: string
    deadline?: string | null
    priority?: Priority
    status?: Status
    project: number
    parent_task?: number | null
    tags?: { tag_name: string; color?: string }[]
    subtasks_input?: { title: string; description?: string; deadline?: string; priority?: Priority; status?: Status }[]
    notes?: { description: string }[]
}

export interface UpdatteStatusSubTaskResponse {
    code: number
    message: string
    data: {
        id: Number
        status: Status
    }
    meta: any
    errors: any
}
