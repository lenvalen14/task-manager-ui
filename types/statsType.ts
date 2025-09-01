export interface UserStats {
    tasks_total: number;
    tasks_completed: number;
    tasks_due_soon: number;
    total_time_logged: string;
    overall_progress: number;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    meta?: any;
    errors?: any;
}
