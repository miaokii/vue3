import type { CartGoods } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";

export function getCart(params: any = null) {
    return APIClient.get<CartGoods[]>(URLEnum.shop_cart, params);
}

export function addCart(params: any) {
    return APIClient.post(URLEnum.shop_cart, params);
}

export function deleteCart(id: string | number) {
    return APIClient.delete(URLEnum.shop_cart+`/${id}`)
}

export function modifyCart(param: object) {
    return APIClient.put(URLEnum.shop_cart, param)
}

export function getByCartItemIds(cartItemIds: string) {
    return APIClient.get<CartGoods[]>(URLEnum.shop_cart_settle, {cartItemIds} );
}
