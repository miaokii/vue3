// 用户信息
export interface UserInfo {
    nickName: string
    loginName: string
    introduceSign: string
}

export interface UserAddress {
    addressId: string
    userId: string
    userName: string
    userPhone: string
    defaultFlag: boolean
    provinceName: string
    cityName: string
    regionName: string
    detailAddress: string
}