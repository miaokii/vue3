import type { CartObj } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";

export function getCart(params: any) {
    return APIClient.get<CartObj[]>(URLEnum.shop_cart, params);
}

export function addCart(params: any) {
    return APIClient.post(URLEnum.shop_cart, params);
}

export function deleteCart(id: string | number) {
    return APIClient.post(URLEnum.shop_cart+`/${id}`)
}
