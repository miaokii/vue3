import type { WritableComputedOptions } from "vue";
import type { Item, User } from "~/types";

export interface StoreState {
    items: Record<number, Item>,
    comments: Record<number, Item[]>,
    users: Record<number, User>,
    feeds: Record<number, Record<number, number[]>>,
}

export const useStore = () => useState<StoreState> ('state', ()=>({
    items: {},
    comments: {},
    users: {},
    feeds: Object.fromEntries(validFeeds.map(i=>[i, {}])),
}))

interface FeedQuery {
    feed: string,
    page: number
}

export function getFeed(state: StoreState, {feed, page}: FeedQuery) {

}

export function fetchFeed(query: FeedQuery) {
    const state = useStore()
    const {feed, page} = query
}


// 定义一个异步函数reactiveLoad，泛型T
export async function reactiveLoad<T>(
    get: ()=>T | undefined,         // get函数，用于获取数据
    set: (data: T)=>void,           // set函数，用于设置数据
    fetch: ()=>Promise<T>,          // fetch函数，返回Promise，用于异步获取数据
    init?:T                         // 可选的初始值
) {
    // 创建一个computed响应式数据data，get/set由参数传入
    const data = computed({
        get,
        set
    } as WritableComputedOptions<T | undefined>)  
    
    // 创建一个响应式的loading标志，初始为false
    const loading = ref(false)

    // 如果data当前值为null或undefined
    if(data.value == null) {
        // 如果传入了初始值init，则先赋值
        if (init != null) {
            data.value = init
        }

        // 定义一个异步任务task，用于拉取数据
        const task = async () => {
            try {
                loading.value = true      // 开始加载，设置loading为true
                const fetched = await fetch()   // 调用fetch获取数据

                // 如果data已经有值，则合并新数据到已有数据
                if (data.value != null) {
                    data.value = Object.assign(data.value, fetched)
                }
                // 否则直接赋值
                else {
                    data.value = fetched
                }
            } 
            catch(e) {
                // 捕获异常，打印错误，并将data设为undefined
                console.error(e)
                data.value = undefined
            }
            finally {
                // 无论成功失败，最后都将loading设为false
                loading.value = false
            }
        }
        // 判断当前是否在客户端环境
        if (import.meta.client) {
            // 客户端环境下，直接调用task（不await）
            task()
        }
        else {
            // 服务端环境下，await task，确保数据拉取完成
            await task()
        }
    }
    // 返回一个响应式对象，包含loading和data
    return reactive({
        loading,
        data
    })
}


// 优化和完善后的reactiveLoad实现
export async function reactiveLoad2<T>(
    get: () => T | undefined,         // 获取数据
    set: (data: T) => void,           // 设置数据
    fetch: () => Promise<T>,          // 异步获取数据
    init?: T                          // 可选初始值
) {
    // computed 只适合纯getter/setter场景，这里其实更适合ref
    // 但如果外部数据是store里的getter/setter，可以保留
    const data = computed({
        get,
        set
    } as WritableComputedOptions<T | undefined>)

    const loading = ref(false)
    const error = ref<unknown>(null) // 新增error状态

    // 避免多次并发拉取
    let taskPromise: Promise<void> | null = null

    // 封装拉取逻辑，避免重复
    const task = async () => {
        loading.value = true
        error.value = null
        try {
            const fetched = await fetch()
            // 这里不能简单Object.assign，需考虑T类型
            // 如果是对象，合并；否则直接赋值
            if (data.value != null && typeof data.value === 'object' && typeof fetched === 'object') {
                data.value = Object.assign({}, data.value, fetched)
            } else {
                data.value = fetched
            }
        } catch (e) {
            error.value = e
            console.error(e)
            data.value = undefined
        } finally {
            loading.value = false
        }
    }

    // 初始化逻辑
    if (data.value == null) {
        if (init != null) {
            data.value = init
        }
        // 避免SSR和客户端重复拉取
        if (!taskPromise) {
            if (import.meta.client) {
                // 客户端异步拉取
                taskPromise = task()
            } else {
                // SSR需await
                taskPromise = task()
                await taskPromise
            }
        }
    }

    // 提供手动刷新方法
    const refresh = async () => {
        if (!loading.value) {
            await task()
        }
    }

    // 返回loading, data, error, refresh
    return reactive({
        loading,
        data,
        error,
        refresh
    })
}