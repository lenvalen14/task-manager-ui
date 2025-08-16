export type User = {
    id: number;
    username: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
}

export interface UserResponse {
    code: number
    message: string
    data: User
    meta: any
    errors: any
}

export type UserUpdateRequest = {
    username: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    avatar?: File | null;
}
