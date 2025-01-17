export interface Response<T> {
    resultCode: number
    message: string
    data: T 
}

export interface List<T> {
    totalCount: number,
    pageSize: number,
    totalPage: number,
    currPage: number,
    list: T[]
}