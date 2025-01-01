import { appConfig } from "@/common/config"
import type { AxiosRequestConfig } from "axios"

// 服务器配置
export interface APIServer {
    // 服务器地址
    baseUrl: string
    // 服务器api路径
    apiPath: string
    // 服务器名称
    name: string
    // 是否是生产环境
    isProduct: boolean
    // 请求拦截器
    start?: (config: AxiosRequestConfig) => AxiosRequestConfig

    baseApiUrl(): string
}

// 生产环境
let productServer: APIServer = {
    baseUrl: appConfig.baseUrl,
    apiPath: appConfig.apiPath,
    name: '生产环境',
    isProduct: true,
    baseApiUrl() {
        return `${this.baseUrl}${this.apiPath}`
    },
}   

// 开发环境
let devServer: APIServer = {
    baseUrl: appConfig.devUrl,
    apiPath: appConfig.apiPath,
    name: '开发环境',
    isProduct: false,
    baseApiUrl() {
        return `${this.baseUrl}${this.apiPath}`
    },
}   

// 服务器列表
export const APIServcers = [productServer, devServer]

