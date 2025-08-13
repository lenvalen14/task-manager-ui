import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_SERVER,
    prepareHeaders: (headers, { endpoint }) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
        }

        const formDataEndpoints = ['createHospitalWithMedia', 'updateHospitalWithMedia', 'createCertification']
        if (!formDataEndpoints.includes(endpoint)) {
            headers.set("Content-Type", "application/json")
        }

        return headers
    },
})

