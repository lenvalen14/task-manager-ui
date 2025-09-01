import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "./storage" // ✅ import custom storage

import authReducer from "./slices/authSlice"
import { authApi } from "@/services/authService"
import { projectApi } from "@/services/projectService"
import { taskApi } from "@/services/taskService"
import { noteApi } from "@/services/noteService"
import { tagApi } from "@/services/tagService"
import { userApi } from "@/services/userService"
import { timeLogApi } from "@/services/timeLogService"
import { taskAttachmentApi } from "@/services/taskAttachmentService"
import { notificationApi } from "@/services/notificationService"
import { passwordApi } from "@/services/passwordService"
import { userStatsApi } from "@/services/statsService"

const rootReducer = combineReducers({
  user: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [timeLogApi.reducerPath]: timeLogApi.reducer,
  [taskAttachmentApi.reducerPath]: taskAttachmentApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [passwordApi.reducerPath]: passwordApi.reducer,
  [userStatsApi.reducerPath]: userStatsApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // chỉ persist auth
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      projectApi.middleware,
      taskApi.middleware,
      noteApi.middleware,
      tagApi.middleware,
      userApi.middleware,
      timeLogApi.middleware,
      taskAttachmentApi.middleware,
      notificationApi.middleware,
      passwordApi.middleware,
      userStatsApi.middleware,
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
