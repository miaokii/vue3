import { APIServcers } from "@/utils/APIServer"
import { appConfig } from "../config"
import APIClient from "@/utils/APIClient"

/**
 * 设置本地存储
 * @param key 
 * @param value 
 */
export const setLocal = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

/**
 * 获取本地存储
 * @param key 
 * @returns 
 */
export const getLocal = (key: string) => {
    return localStorage.getItem(key)
}

/**
 * 删除本地存储
 * @param key 
 */
export const removeLocal = (key: string) => {
    localStorage.removeItem(key)
}

/**
 * 获取url中参数的值
 * @param name 
 * @returns 
 */
export function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/** 
 * 图片前缀
 */
export const prefix = (url: string) => {
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = `${APIClient.currentService().baseUrl}${url}`
        return url
    }
}

