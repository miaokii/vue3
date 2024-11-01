// 引入definStore用于创建store
import { defineStore } from "pinia";

// 创建并暴露store
export const useCountStore = defineStore('count', {
    // 动作，响应组件中的事件
    actions: {
        increment(value: number) {
            // this表示当前的store
            this.num += value
        }
    },
    // 状态
    state() {
        return {
            num: 1,
            option: 1,
            name: ''
        }
    },
    // 计算
    getters: {
        bigNum(): number {
            return this.num * 10
        },
        upperName(state): string {
            return state.name.toUpperCase()
        },
        // option: state => state.option
    }
})