import type { CartGoods, Goods } from "./Home"

export interface OrderItem {
    orderId: string
    orderNo: string
    totalPrice: string
    payType: string
    orderStatus: number
    orderStatusString: string
    createTime: string
    newBeeMallOrderItemVOS: CartGoods[]
}