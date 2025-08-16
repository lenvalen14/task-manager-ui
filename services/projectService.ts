import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAuth } from "./baseQuery"
import { Project, GetAllProjectsResponse, CreateProjectResponse, GetProjectsResponse } from "@/types/projectType";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getAllProjects: builder.query<GetAllProjectsResponse, void>({
            query: () => ({
                url: "/projects/",
                method: "GET",
            }),
        }),
        getProjectById: builder.query<GetProjectsResponse, number>({
            query: (id) => ({
                url: `/projects/${id}/`,
                method: "GET",
            }),
        }),
        createProject: builder.mutation<CreateProjectResponse, Partial<Project>>({
            query: (body) => ({
                url: "/projects/",
                method: "POST",
                body,
            }),
        }),
        updateProject: builder.mutation<Project, { id: number; body: Partial<Project> }>({
            query: ({ id, body }) => ({
                url: `/projects/${id}/`,
                method: "PUT",
                body,
            }),
        }),
        deleteProject: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/projects/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetAllProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi
