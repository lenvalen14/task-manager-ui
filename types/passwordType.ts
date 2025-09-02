export interface RequestPasswordOtpRequest {
  email: string
}

export interface RequestPasswordOtpResponse {
  code: number
  message: string
}

export interface VerifyPasswordOtpRequest {
  email: string
  otp: number
}

export interface VerifyPasswordOtpResponse {
  code: number
  message: string
}

export interface ResetPasswordRequest {
    email: string
    old_password: string
    new_password: string
    confirm_password: string
}

export interface ResetPasswordResponse {
    code: number
    message: string
}

export interface ChangePasswordRequest {
    email: string
    new_password: string
    confirm_password: string
}
export interface ChangePasswordResponse {
    code: number
    message: string
}