import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { type UserAddress, type UserInfo } from "@/interfaces/User";

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


export function address() {
    return APIClient.get<UserAddress[]>(URLEnum.user_address)
}

export function addressDetail(addressId: string) {
    return APIClient.get<UserAddress>(URLEnum.user_address + `/${addressId}`)
}

export function addressDelete(addressId: string) {
    return APIClient.delete(URLEnum.user_address + `/${addressId}`)
}

export function addressEdit(param: object) {
    return APIClient.put(URLEnum.user_address, param)
}

export function addressNew(param: object) {
    return APIClient.post(URLEnum.user_address, param)
}

export function getDefaultAddress() {
    return APIClient.get<UserAddress>(URLEnum.user_default_address)
}


