import type { User } from "@/types/User";
import APIClient from "@/uils/APIClient";
import { URLEnum } from "@/uils/APIEnum";

export function login(param: object) {
    return APIClient.postJson<User>(URLEnum.smsLogin, param)
}

export function logout() {
    return APIClient.post(URLEnum.logout)
}

export function sendSMSCode(phone: string) {
    return APIClient.post(URLEnum.sendSmsCode, {phone})
}

export function unregister() {
    return APIClient.post(URLEnum.unregister)
}