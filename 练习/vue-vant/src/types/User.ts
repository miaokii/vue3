// 用户信息
export type User = {
    userId: string
    userPhone: string
    token: string
    channelId: string
    newUser: boolean
} | null


export type SettingItem = {
    icon?: string,
    title: string,
    action?: ()=>void,
    url?: string,
    path?: string
}