import { defineStore } from "pinia";
import { ref } from "vue";
import { getCart } from "@/service/cart";

// 定义一个名为cart的store，并导出
export const useCartStore = defineStore('cart', () => {
    // 购物车商品数量
    const count = ref(0)
    // 更新购物车
    async function updateCart() {
        const result = await getCart()
        count.value = result.data.length
    }
    return { count, updateCart }
})