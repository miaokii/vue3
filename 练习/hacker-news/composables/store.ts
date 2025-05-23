import type { WritableComputedOptions } from "vue";
import type { Item, User } from "~/types";

// store存储的类型
export interface StoreState {
    // 以数字为键，Item为值的对象类型
    items: Record<number, Item>,
    comments: Record<number, Item[]>,
    users: Record<number, User>,
    feeds: Record<string, Record<number, number[]>>,
}

/**
 * useStore 是一个自定义的全局状态管理钩子函数。
 * 
 * 作用：
 *   - 用于在 Nuxt 应用中创建和访问全局响应式状态（StoreState 类型）。
 *   - 通过 useState API 保证全局唯一性和响应式。
 * 
 * 具体实现：
 *   - useState<StoreState>('state', ...) 创建名为 'state' 的全局状态，类型为 StoreState。
 *   - 初始值为一个对象，包含：
 *       - items: 以数字为键、Item 为值的对象，初始为空。
 *       - comments: 以数字为键、Item 数组为值的对象，初始为空。
 *       - users: 以数字为键、User 为值的对象，初始为空。
 *       - feeds: 以 validFeeds 数组中的每个 key 为键，值为一个空对象。这样可以为每个 feed 类型预先分配一个空的页码-列表映射表。
 *   - Object.fromEntries(validFeeds.map(key => [key, {}])) 的作用是把 validFeeds（如 ['top', 'new', ...]）转为 { top: {}, new: {}, ... }。
 * 
 * 用法：
 *   - 组件或其他逻辑中调用 useStore()，即可获得全局响应式的 state 对象。
 */
export const useStore = () => useState<StoreState>('state', () => ({
    items: {},
    comments: {},
    users: {},
    // 初始化 feeds 对象，以 validFeeds 中的每个 key 为键，值为一个空对象
    feeds: Object.fromEntries(validFeeds.map(key => [key, {}])),
}))

// 查询参数
interface FeedQuery {
    feed: string,
    page: number
}

/**
 * getFeed 函数用于根据给定的 feed 名称和页码，从全局状态 state 中获取对应的 Item 列表。
 * 
 * 参数:
 *   - state: StoreState 类型，包含所有的 items、feeds 等数据。
 *   - {feed, page}: FeedQuery 类型，指定要查询的 feed 名称和页码。
 * 
 * 实现逻辑:
 *   1. 通过 state.feeds[feed][page] 获取当前 feed 和页码下的所有 item id 数组。
 *   2. 如果 id 数组存在且长度大于 0，则通过 id 映射到 state.items，返回对应的 Item 数组。
 *   3. 如果没有找到对应的 id 数组或为空，则返回 undefined。
 */
export function getFeed(state: StoreState, {feed, page}: FeedQuery) {
    const ids = state.feeds[feed][page]
    // const ids = state.feeds?.[feed]?.[page]
    if (ids?.length) {
        return ids.map(i=>state.items[i])
    }
    return undefined
}

/**
 * fetchFeed 函数用于根据传入的 query（包含 feed 名称和页码）获取对应的 feed 数据，并将其存入全局状态。
 * 
 * 实现流程如下：
 * 1. 通过 useStore() 获取全局响应式状态 state。
 * 2. 调用 reactiveLoad<Item[]>，实现数据的响应式加载和缓存。
 *    - 第一个参数：一个函数，返回当前 state 中该 feed/page 下的 items（通过 getFeed 实现）。
 *    - 第二个参数：一个函数，接收新获取到的 items 数组，将其 id 列表存入 state.feeds[feed][page]，并将每个 item 合并或写入 state.items。
 *    - 第三个参数：一个异步函数，实际发起网络请求，调用 $fetch('api/hn/feeds', {params: query}) 获取数据。
 *    - 第四个参数：初始值，若 state.feeds[feed][page] 已有 id 列表，则将其映射为对应的 item 对象数组作为初始值。
 * 
 * 这样，fetchFeed 实现了：
 * - 优先从本地 state 获取数据，若无则发起网络请求。
 * - 获取到数据后自动写入全局 state，并保证响应式更新。
 */
export function fetchFeed(query: FeedQuery) {
    const state = useStore()
    const {feed, page} = query

    return reactiveLoad<Item[]>(
        ()=>getFeed(state.value, query),
        (items) => {
            const ids = items.map(item=>item.id)
            state.value.feeds[feed][page] = ids
            items.filter(Boolean).forEach((item)=>{
                if (state.value.items[item.id]) {
                    Object.assign(state.value.items[item.id], item)
                } else {
                    state.value.items[item.id] = item
                }
            })
        },
        () => $fetch('/api/hn/feeds', {params: query}),
        (state.value.feeds[feed][page] || []).map(id => state.value.items[id])
    )
}

// 根据id加载Item
export function fetchItem(id: number) {
    const state = useStore()
    return reactiveLoad<Item>(
        ()=>state.value.items[id],
        (item)=>{state.value.items[id] = item},
        () => $fetch('/api/hn/item', { params: {id} })
    )
}

// 根据id加载的评论
export function fetchComments(id: number) {
    const state = useStore()
    return reactiveLoad<Item[]>(
        () => state.value.comments[id],
        (comments) => {state.value.comments[id] = comments},
        () => $fetch('/api/hn/item', { params: { id} }).then(i => i.comments!)
    )
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
                console.log('!!!!s',fetched);
                
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
export async function reactiveLoadOptimization<T>(
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