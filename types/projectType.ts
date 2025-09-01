import { Task } from "./taskType"
import { TimeSummaryData } from "./timeLogType"

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
    project_time_summary?: TimeSummaryData
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