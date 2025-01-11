
/**
 * @description: 请求方式枚举
 */
export const enum RequstMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

/**
 * @description: API地址枚举
 */
export const enum URLEnum {

    // 首页
    home_index_infos = '/index-infos',

    // 购物车
    shop_cart = '/shop-cart',

    // 用户信息
    user_info = '/user/info',
    // 登录
    user_login = '/user/login',
    // 登出
    user_logout = '/user/logout',
    // 注册
    user_register = '/user/register',

    // 商品详情
    good_detail = '/goods/detail'

}
