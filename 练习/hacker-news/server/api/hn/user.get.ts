import type { User } from "~/types";

async function fetchUser(id: string): Promise<User> {
    return await $fetch<User>(`/user/${id}.json`, {baseURL: BASE_URL})
}

export default defineCachedEventHandler((event)=> {
    const {id} = getQuery(event) as {id?: string}
    if (!id) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Must provide a user ID'
        })
    }
    return fetchUser(id)
}, {
    name: 'api/hn',
    getKey(event) {
        const {id} = getQuery(event)
        return ['user', id].join('/')
    },
    swr: false,
    maxAge: 60
})