import type { Item } from "~/types";

interface InnerItem {
    id: number,
    by: string,
    score: number,
    time: number,
    text: string,
    url: string,
    type: 'job' | 'story' | 'comment' | 'poll',
    title: string,
    kids?: string[],
}

/**
 * fetchItem 函数用于根据给定的 id 获取 Hacker News 的单条内容（item）详情。
 * 
 * 主要流程如下：
 * 1. 通过 $fetch 请求 `/item/${id}.json`，从 Hacker News API 获取原始条目数据（InnerItem）。
 * 2. 将原始数据字段映射为本地 Item 类型，包括 id、url、title、type、points、user、content、time 等。
 * 3. comments_count 字段取自 kids 数组的长度（即该条目的评论数）。
 * 4. 如果 withComments 为 true，则递归地为每个 kid（评论 id）调用 fetchItem，获取所有子评论的详细内容，并通过 Promise.all 并发获取，最终组成 comments 数组。
 * 5. 如果 withComments 为 false，则 comments 字段为一个空数组。
 * 
 * @param id - 条目 id，字符串类型
 * @param withComments - 是否递归获取所有评论，默认为 false
 * @returns Promise<Item> - 解析为本地 Item 类型的对象
 */
export async function fetchItem(id: string, withComments = false): Promise<Item> {
    const url = `${BASE_URL}/item/${id}.json`
    console.log(`----request url: ${url}, ${withComments ? 'comment' : '' } itemId: ${id} ----`);

    const item = await $fetch<InnerItem>(url)
    item.kids = item.kids || []
    return {
        id: item.id,
        url: item.url,
        title: item.title,
        type: item.type,
        points: item.score,
        user: item.by,
        content: item.text,
        time: item.time,
        comments_count: item.kids?.length ?? 0,
        comments: withComments ? await Promise.all(
            Object.values(item.kids as string[]).map(id =>
                fetchItem(id, withComments)
            )
        ) : []
    }
}

/**
 * 这段代码定义了一个用于获取 Hacker News 单条内容（item）详情的 API 处理器，并对结果做了缓存。
 * 
 * 主要功能和流程如下：
 * 1. 使用 defineCachedEventHandler 包裹主处理函数，实现接口响应的缓存（maxAge: 60秒）。
 * 2. 从请求参数中获取 id（条目 ID）。
 * 3. 校验 id 是否存在且为数字。如果校验失败，抛出 422 或 400 错误。
 * 4. 调用 fetchItem(id, true) 获取该条目及其所有评论的详细内容。
 * 5. getKey 用于生成缓存的唯一 key，格式为 'item/ID'，保证不同条目缓存互不干扰。
 * 6. swr: false 表示不启用 stale-while-revalidate 策略，maxAge: 60 表示缓存 60 秒。
 * 
 * 总结：当有请求到达 `/api/hn/item` 路径时，Nuxt/Nitro 会自动调用这个 handler，返回指定 id 的条目详情及其评论，并自动处理缓存。
 */

defineCachedEventHandler((event)=> {
    const { id } = getQuery(event) as {id? : string}
    console.log(id);
     
    if (!id) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Must provide a item ID'
        })
    }
    if (Number.isNaN(+id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Item ID must a numnber but got' + id
        })
    }    
    return fetchItem(id, true)
}, {
    name: 'api/hb',
    getKey(event) {
        const {id} = getQuery(event)
        return ['item', id].join('/')
    },
    swr: false,
    maxAge: 60
})