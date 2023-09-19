import axios, { AxiosInstance } from "axios"

interface options {
    method: "get" | "post" | "put" | "delete"
    url: string
    data?: any
    params?: any
}

class Http {
    http: AxiosInstance
    constructor() {
        this.http = axios.create({
            baseURL: "http://interview-api-t.itheima.net/",
            timeout: 10000
        })
    }

    requested() {
        this.http.interceptors.request.use((config: any) => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }, (err: any) => {
            return Promise.reject()
        })
    }

    responsed() {
        this.http.interceptors.response.use((result: any) => {
            return result.data
        }, (err: any) => {
            return Promise.reject()
        })
    }

    interceptorsAll() {
        this.requested()
        this.responsed()
    }

    async request(options: options) {

        let data = await this.http({ method: options.method, url: options.url, data: options.data, params: options.params })
        return data
    }
}

export default new Http()