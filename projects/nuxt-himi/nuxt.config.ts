// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // 加载全局样式
  css: [
    '~/assets/css/main.scss'
  ],
  vite: {
    css: {
      // vite预处理器
      preprocessorOptions: {
        scss: {
          // 让每个组件样式<style lang="scss">自动注入全局变量
          additionalData: `@use '~/assets/css/variables.scss' as *;`
        }
      }
    }
  },
  // 自动导入app/components下的组件
  components: [
    {
      path: '~/components', pathPrefix: false
    }
  ],
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    // 默认语言
    defaultLocale: 'en',
    // 支持的语言
    locales: [ 
      { code: 'en', name: 'ENGLISH'},
      { code: 'zh', name: '中文'},
    ],
    // url策略，添加路由前缀的方式
    // strategy: 'prefix_except_default',
    // 不添加路由前缀
    strategy: 'no_prefix',
    vueI18n: '~/i18n/i18n.config.ts',
    // 检测浏览器语言
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // 在根路径时重定向
      alwaysRedirect: false, // 不总是重定向
      fallbackLocale: 'en' // 如果检测失败，使用默认语言
    }
  }
})