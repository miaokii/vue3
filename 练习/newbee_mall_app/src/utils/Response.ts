export interface Response<T> {
    resultCode: number
    message: string
    data: T 
}