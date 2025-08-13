import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginData, RefreshTokenResponse } from "../../types/auth"

interface UserState {
    sub: number | null
    email: string | null
    user_name: string | null
    access_token: string | null
    refresh_token: string | null
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    sub: null,
    email: null,
    user_name: null,
    access_token: null,
    refresh_token: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true
            state.error = null
        },
        loginSuccess(state, action: PayloadAction<LoginData>) {
            state.loading = false
            state.sub = action.payload.user_id
            state.email = action.payload.email
            state.user_name = action.payload.username
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.error = null

            try {
                localStorage.setItem("accessToken", action.payload.access_token)
                localStorage.setItem("refresh_token", action.payload.refresh_token)
                localStorage.setItem("user_name", action.payload.username)
                localStorage.setItem("email", action.payload.email)
                localStorage.setItem("userId", action.payload.user_id.toString())
            } catch (e) {
                console.error("Failed to save to localStorage", e)
            }
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
            state.sub = null
            state.email = null
            state.email = null
            state.access_token = null
            state.refresh_token = null

            try {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("email")
                localStorage.removeItem("user_name")
                localStorage.removeItem("userId")
            } catch (e) {
                console.error("Failed to clear localStorage", e)
            }
        },
        logout(state) {
            state.sub = null
            state.email = null
            state.user_name = null
            state.access_token = null
            state.refresh_token = null
            state.loading = false
            state.error = null

            try {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("email")
                localStorage.removeItem("user_name")
                localStorage.removeItem("userId")
            } catch (e) {
                console.error("Failed to clear localStorage", e)
            }
        },
        refreshRequest(state) {
            state.loading = true
            state.error = null
        },
        refreshSuccess(state, action: PayloadAction<RefreshTokenResponse>) {
            state.loading = false
            state.access_token = action.payload.data.access
            state.error = null

            try {
                localStorage.setItem("accessToken", action.payload.data.access)
            } catch (e) {
                console.error("Failed to save refreshed token", e)
            }
        },
        refreshFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
            state.access_token = null
            state.refresh_token = null

            try {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
            } catch (e) {
                console.error("Failed to clear localStorage after refresh failure", e)
            }
        },
    },
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    refreshRequest,
    refreshSuccess,
    refreshFailure,
} = userSlice.actions
export default userSlice.reducer
