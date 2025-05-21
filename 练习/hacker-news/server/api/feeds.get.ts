import { feedsInfo, validFeeds } from "~/utils/api";
import { BASE_URL } from "../utils/constants";

const feedUrls: Record<keyof typeof feedsInfo, string> = {
    ask: 'askstories',
    jobs: 'jobstories',
    show: 'showstories',
    newest: 'newstories',
    news: 'topstories',
}

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
export async function fetchFeed(feed: keyof typeof feedsInfo, page = 1) {
    const { fetchItem } = await import('./item.get')
    const url = `${BASE_URL}/${feedUrls[feed]}.json`
    const entries = (await $fetch<string[]>(url)).slice((page-1)*10, page*10)
    return Promise.all(entries.map(id=>fetchItem(id)))
}