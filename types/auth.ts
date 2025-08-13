export interface LoginRequest {
    username: string
    password: string
}

export interface LoginData {
    user_id: number
    email: string
    username: string
    access_token: string
    refresh_token: string
}

export interface LoginResponse {
    code: number
    message: string
    data: {
        data: LoginData
    }
    meta?: any
    errors?: any
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface RefreshTokenResponse {
    code: number
    message: string
    data: {
        access: string
    }
    meta?: any
    errors?: any
}

export interface RegisterRequest {
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string
}

export interface RegisterData {
    id: number;
    username: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
}

export interface RegisterResponse {
    code: number
    message: string
    data: {
        data: RegisterData
    }
    meta?: any
    errors?: any
}
