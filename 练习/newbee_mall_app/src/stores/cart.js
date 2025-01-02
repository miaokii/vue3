import { defineStore } from "pinia";
import { ref } from "vue";
import { getCart } from "@/services/cart";

// 定义一个名为cart的store，并导出
export const useCartStore = defineStore('cart', {
    actions: {
        async updateCart() {
            const data = await getCart()
            // this表示当前store实例
            this.count = data.length
        }
    },  
    getters: {
    },
    state: () => ({
        count: ref(0),
    })
})