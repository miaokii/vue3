import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { type UserInfo } from "@/interfaces/User";

export function getUserInfo() {
    return APIClient.get<UserInfo>(URLEnum.user_info)
}

export function editUserInfo(param: object) {
    return APIClient.put(URLEnum.user_info, param)
}

export function login(param: object) {
    return APIClient.post<string>(URLEnum.user_login, param)
}

export function logout() {
    return APIClient.post(URLEnum.user_logout)
}

export function register(param: object) {
    return APIClient.post(URLEnum.user_register, param)
}



