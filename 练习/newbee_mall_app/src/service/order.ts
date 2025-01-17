import type { OrderItem } from "@/interfaces/Order";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import type { List } from "@/utils/Response";

export function createOrder(param: object) {
    return APIClient.post<string>(URLEnum.create_order, param)
}

export function payOrder(param: object) {
    return APIClient.get(URLEnum.pay_order, param)
}

export function order(param: object) {
    return APIClient.get<List<OrderItem>>(URLEnum.order, param)
}

export function orderDetail(id: string) {
    return APIClient.get<OrderItem>(URLEnum.order+`/${id}`)
}

export function orderCancel(id: string) {
    return APIClient.put(URLEnum.order+`/${id}/cancel`)
}

export function orderConfirm(id: string) {
    return APIClient.put(URLEnum.order+`/${id}/finish`)
  }