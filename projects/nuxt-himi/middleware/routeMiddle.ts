// 定义路由中间件，用于重定向
/***
 * 命名路由中间件：在页面使用中通过异步导入自动加载
 * 全局路由中间件：在middleware目录下定义，带有.global后缀，在每次路由切换时都会执行
 * 
 */
export default defineNuxtRouteMiddleware((from) => {
    if (from.path === '/') {
        return navigateTo('/home')
    }
})