export interface TaskAttachment {
    id: number
    task?: number
    file_url: string | null
    file_name?: string
    is_deleted?: boolean
    created_at?: string
    updated_at?: string
    isLocal?: boolean   // flag để phân biệt file mới (chưa upload)
}


// Request khi tạo mới
export interface TaskAttachmentCreateRequest {
    taskId: number
    file: File // form-data
    fileName: string
}

// Response khi tạo mới
export interface TaskAttachmentCreateResponse {
    code: number
    message: string
    data: TaskAttachment
    meta: any
    errors: any
}

// Response khi xoá
export interface TaskAttachmentDeleteResponse {
    code: number
    message: string
    data: {
        id: number
        is_deleted: boolean
    }
    meta: any
    errors: any
}
