// 定义路由中间件，用于重定向
/***
 * 命名路由中间件：在页面使用中通过异步导入自动加载
 * 全局路由中间件：在middleware目录下定义，带有.global后缀，在每次路由切换时都会执行
 * 
 * 
 * 
 */
export default defineNuxtRouteMiddleware((from) => {
    // 没有feed参数，重定向到第一个项目 
    if (!from.params.feed || !validFeeds.includes(from.params.feed as string)) {
        return navigateTo(`/${validFeeds[0]}/1`)
    }
    // 没有page参数，重定向到第一页
    if (!from.params.page) {
        return navigateTo(`/${from.params.feed}/1`)
    }
})