import { Task } from "./taskType"

export type Project = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    owner: {
        id: number
        username: string
    }
    tasks: Task[]
}

export type GetAllProjectsResponse = {
    code: number
    message: string
    data: Project[]
    meta: any
    errors: any
}

export type GetProjectsResponse = {
    code: number
    message: string
    data: Project
    meta: any
    errors: any
}

export type CreateProjectResponse = {
    code: number
    message: string
    data: Project
    meta: any
    errors: any
}