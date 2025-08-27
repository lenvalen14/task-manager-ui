import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import { authApi } from "@/services/authService"
import { projectApi } from "@/services/projectService"
import { taskApi } from "@/services/taskService"
import { noteApi } from "@/services/noteService"
import { tagApi } from "@/services/tagService"
import { userApi } from "@/services/userService"

export const store = configureStore({
    reducer: {
        user: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [noteApi.reducerPath]: noteApi.reducer,
        [tagApi.reducerPath]: tagApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(
            authApi.middleware,
            projectApi.middleware,
            taskApi.middleware,
            noteApi.middleware,
            tagApi.middleware,
            userApi.middleware,
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
