
/**
 * @description: 请求方式枚举
 */
export const enum RequstMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

/**
 * @description: API地址枚举
 */
export const enum URLEnum {

    // 首页
    home_index_infos = '/index-infos',

    // 购物车
    shop_cart = '/shop-cart',
    // 根据购物车id查询商品
    shop_cart_settle = '/shop-cart/settle',

    // 用户信息
    user_info = '/user/info',
    // 登录
    user_login = '/user/login',
    // 登出
    user_logout = '/user/logout',
    // 注册
    user_register = '/user/register',
    // 地址
    user_address = '/address',
    // 默认地址
    user_default_address = '/address/default',

    // 商品详情
    goods_detail = '/goods/detail',
    // 商品种类
    goods_category = '/categories',
    // 搜索
    goods_search = '/search',

    // 创建订单
    create_order = '/saveOrder',
    // 获取订单
    order = '/order',
    // 支付订单
    pay_order = '/paySuccess'

}
