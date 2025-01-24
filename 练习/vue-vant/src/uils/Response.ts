export interface Response<T> {
    code: number
    subCode: number
    msg: string
    timestamp: number,
    logMessageId: string
    data: T
}

export interface List<T> {
    totalCount: number,
    pageSize: number,
    totalPage: number,
    currPage: number,
    list: T[]
}