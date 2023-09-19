import http from "./http"

http.interceptorsAll()

export const loginApi = (data: { username: string, password: string }) => http.request({ method: "post", url: "/auth/login", data })


export const userApi = () => http.request({ method: "get", url: "/auth/currentUser" })

export const queryApi = (params: { current: number, pageSize: number }) => http.request({ method: "get", url: "/admin/interview/query", params })

export const showApi = (params: { id: string }) => http.request({ method: "get", url: "/admin/interview/show", params })

export const delApi = (data: { id: string }) => http.request({ method: "delete", url: `/admin/interview/remove`, data })


export const addApi = (data: { stem: string, content: string }) => http.request({ method: "post", url: `/admin/interview/create`, data })


export const emitApi = (data: { id: string, stem: string, content: string }) => http.request({ method: "put", url: `/admin/interview/update`, data })