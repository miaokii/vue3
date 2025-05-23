import { feedsInfo } from "~/utils/api";
import { BASE_URL } from '~/server/utils/constants'
import { validFeeds } from "~/utils/api";

const feedUrls: Record<keyof typeof feedsInfo, string> = {
    ask: 'askstories',
    jobs: 'jobstories',
    show: 'showstories',
    newest: 'newstories',
    news: 'topstories',
}

/**
 * 业务逻辑：通过 https://hacker-news.firebaseio.com/v0/${feedUrls[feed]}.json获取到的为对应feed的id集合
 * 通过https://hacker-news.firebaseio.com/v0/item/${id}.json获取item或者评论详情
 */

/**
 * fetchFeed 函数用于获取指定 feed 类型（如 news、ask、jobs 等）和页码的内容列表。
 * 
 * 主要流程如下：
 * 1. 动态导入 fetchItem 方法，用于根据 id 获取具体的条目信息。
 * 2. 根据 feed 类型，拼接出对应的 API 地址（如 topstories.json、askstories.json 等）。
 * 3. 通过 $fetch 获取该 feed 下所有条目的 id 列表。
 * 4. 根据页码参数，截取当前页需要的 10 条 id。
 * 5. 对每个 id 调用 fetchItem，获取详细内容，并通过 Promise.all 并发返回所有条目的详细信息数组。
 * 
 * @param feed - feed 类型，限定为 feedsInfo 的 key
 * @param page - 页码，默认为 1
 * @returns Promise，解析为当前页的条目详细信息数组
 */
async function fetchFeed(feed: keyof typeof feedsInfo, page = '1') {
    const { fetchItem } = await import('./item.get')
    const url = `${BASE_URL}/${feedUrls[feed]}.json`
    console.log(`----request url: ${url} feed: ${feed} page: ${page} ----`);
    // 截取对应分页的id集合
    const entries = (await $fetch<string[]>(url)).slice((+page - 1) * 10, +page * 10)
    // 去获取item的详细信息
    return Promise.all(entries.map(id => fetchItem(id)))
}


/**
 * 这个函数是 Nuxt 3 的 server API 路由自动调用的。
 * 
 * 原理和流程如下：
 * 
 * 1. 在 Nuxt 3 项目中，`server/api/hn/feeds.get.ts` 文件会被自动注册为一个 API 路由，路径为 `/api/hn/feeds`，并且只响应 GET 请求（因为文件名以 `.get.ts` 结尾）。
 * 
 * 2. 当客户端（比如通过 $fetch('/api/hn/feeds?feed=news&page=1')）或服务端有请求发到 `/api/hn/feeds` 路径时，Nuxt 的 server engine（Nitro）会自动调用本文件导出的默认函数。
 * 
 * 3. 这里导出的 `defineCachedEventHandler` 是 Nuxt/Nitro 提供的一个高阶函数，用于包裹实际的处理逻辑，实现接口的缓存（cache）功能。它的第一个参数是实际的处理函数（接收 event），第二个参数是缓存相关的配置。
 * 
 * 4. 具体流程是：当有请求到达 `/api/hn/feeds` 时，Nitro 会把请求信息封装成 event 对象，传递给这个 handler。handler 解析参数、校验、拉取数据、返回响应。若命中缓存，则直接返回缓存内容，否则执行 handler 并缓存结果。
 * 
 * 5. 总结：你无需手动调用这个函数，Nuxt/Nitro 会在有请求到达对应 API 路径时自动调用它，并自动处理 event、缓存、响应等流程。
 */

/**
 * 这段代码定义了一个用于获取 Hacker News feed 列表的 API 处理器，并对结果做了缓存。
 * 
 * 主要功能如下：
 * 1. 使用 defineCachedEventHandler 包裹主处理函数，实现接口响应的缓存（maxAge: 60秒）。
 * 2. 从请求参数中获取 page（页码，默认为'1'）和 feed（类型，默认为'news'）。
 * 3. 校验 feed 是否在允许的类型列表 validFeeds 中，且 page 是否为合法数字字符串。如果校验失败，抛出 422 错误。
 * 4. 调用 fetchFeed(feed, page) 获取对应 feed 和页码的内容列表。
 * 5. getKey 用于生成缓存的唯一 key，格式为 'feed/类型/页码'，保证不同 feed 和页码缓存互不干扰。
 * 6. swr: false 表示不启用 stale-while-revalidate 策略，maxAge: 60 表示缓存 60 秒。
 */

export default defineCachedEventHandler((event) => {
    // 2 
    const { page = '1', feed = 'news' } = getQuery(event) as { page: string, feed: keyof typeof feedsInfo }
    // 3
    if (!validFeeds.includes(feed) || String(Number(page)) !== page) {
        throw createError({
            statusCode: 422,
            statusMessage: `Must provide one of ${validFeeds.join(', ')} and a valid page number.`
        })
    }
    // 4

    return fetchFeed(feed, page)
}, {
    name: 'api/hn',
    // 5
    getKey(event) {
        const { page = '1', feed = 'news' } = getQuery(event)
        return ['feed', feed, page].join('/')
    },
    // 6
    swr: false,
    maxAge: 60
})
