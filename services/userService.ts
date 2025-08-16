import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { UserResponse, UserUpdateRequest } from "@/types/userType"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, number>({
            query: (id) => ({
                url: `/users/${id}/`,
                method: "GET",
            }),
        }),
        updateUser: builder.mutation<UserResponse, { id: number; body: UserUpdateRequest }>({
            query: ({ id, body }) => {
                const formData = new FormData();

                Object.entries(body).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // Nếu là File thì append trực tiếp
                        if (value instanceof File) {
                            formData.append(key, value);
                        } else {
                            // Convert sang string cho chắc chắn
                            formData.append(key, String(value));
                        }
                    }
                });

                return {
                    url: `/users/${id}/`,
                    method: "PUT",
                    body: formData,
                };
            },
        }),
        uploadAvatar: builder.mutation<UserResponse, { userId: number; file: File }>({
            query: ({ userId, file }) => {
                const formData = new FormData();
                formData.append("avatar", file);

                return {
                    url: `/users/${userId}/`,
                    method: "PATCH",
                    body: formData,
                };
            },
        }),
    }),
})

export const {
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useUploadAvatarMutation,
} = userApi
