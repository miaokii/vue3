export interface Item {
    id: number
    url?: string
    title?: string
    type: 'job' | 'story' | 'comment' | 'poll'
    points: number
    user: string
    content?: string
    time: number
    comments_count?: number
    comments?: Item[]
    loading?: boolean
}

export interface User {
    id: string,
    create_time: string,
    created: string,
    karma: number,
    about: string,
    loading?: boolean
}