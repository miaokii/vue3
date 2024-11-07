import { customRef } from "vue"

// customRef定义响应式数据
export default function(initValue: string, delay: number = 1000) {
    // 计时器
    let timer: number
    // track跟踪
    // trigger触发
    let msg = customRef((track, trigger) => {
        return {
            // 当msg被读取的时候，调用get函数
            get() {
                // 告诉Vue持续追踪msg，当msg变化的时候就要进行更新
                track()
                return initValue
            },
            // 当msg被修改的时候，调用set函数
            set(value) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    initValue = value
                // 通知Vue msg数据变化了
                trigger()
                }, delay);
            },
        }
    })

    return {msg}
}