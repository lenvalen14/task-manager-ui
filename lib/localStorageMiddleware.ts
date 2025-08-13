import { Middleware } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess, refreshSuccess, logout } from './slices/authSlice';
import { authApi } from '../services/authService';
import type { AppDispatch } from './store';
import type { RefreshTokenResponse } from '../types/auth';

type JwtPayload = { exp: number };

export const refreshTokenThunk =
    (refreshToken: string) => async (dispatch: AppDispatch) => {
        try {
            const response: RefreshTokenResponse = await dispatch(
                authApi.endpoints.refreshToken.initiate({ refresh: refreshToken })
            ).unwrap();
            dispatch(refreshSuccess(response));
        } catch (err) {
            console.error('Refresh token failed', err);
            dispatch(logout());
        }
    };

// Type guard: đảm bảo action có thuộc tính `type`
function hasTypeProperty(action: unknown): action is { type: string } {
    return typeof action === 'object' && action !== null && 'type' in action;
}

// Middleware lưu trữ token
export const localStorageMiddleware: Middleware<{}, any, AppDispatch> =
    (store) => (next) => (action) => {
        const result = next(action);

        // Khi login thành công
        if (loginSuccess.match(action)) {
            const { email, access_token, refresh_token, user_id, username } = action.payload;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('userName', username);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', user_id.toString());
        }

        // Khi refresh token thành công
        if (refreshSuccess.match(action)) {
            const access = action.payload.data.access;
            localStorage.setItem('accessToken', access);
        }

        // Khi logout
        if (logout.match(action)) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
        }

        // Kiểm tra token khi app khởi chạy
        if (hasTypeProperty(action) && action.type === '@@INIT') {
            const accessToken = localStorage.getItem('accessToken');
            const refreshTokenStored = localStorage.getItem('refreshToken');

            if (accessToken && refreshTokenStored) {
                try {
                    const decoded: JwtPayload = jwtDecode(accessToken);
                    if (decoded.exp * 1000 < Date.now()) {
                        store.dispatch(refreshTokenThunk(refreshTokenStored));
                    }
                } catch (err) {
                    console.error('Invalid token:', err);
                    store.dispatch(logout());
                }
            }
        }

        return result;
    };

// Utility: load user từ localStorage khi app khởi chạy
export const loadUserFromStorage = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const email = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (accessToken && refreshToken && email) {
        return { accessToken, refreshToken, email, userName };
    }
    return null;
};

// Utility: clear user khỏi localStorage
export const clearUserFromStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
};
