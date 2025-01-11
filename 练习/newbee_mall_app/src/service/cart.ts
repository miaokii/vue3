import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";

export function getCart(params: any) {
    return APIClient.get(URLEnum.shop_cart, params);    
}