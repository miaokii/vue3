// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  // 自动导入app/components下的组件
  components: [
    {
      path: '~/components', pathPrefix: false
    }
  ],
  // 加载全局样式
  css: [
    '~/assets/css/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 让每个组件样式<style lang="scss">自动注入全局变量
          additionalData: `@use '~/assets/css/variables.scss' as *;`
        }
      }
    }
  }
})
