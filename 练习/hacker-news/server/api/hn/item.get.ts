import type { Item } from "~/types";

export async function fetchItem(id: string, withComments = false): Promise<Item> {
    const item = await $fetch(`/item/${id}.json`, { baseURL: BASE_URL })
    
    return {
        id: 0,
        url: '',
        title: '',
        type: 'job',
        points: 20,
        user: 'dd',
        content: 'content',
        time: '',
        comments_count: 40,
    }
}
