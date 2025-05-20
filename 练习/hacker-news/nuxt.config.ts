// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  // 自动导入app/components下的组件
  components: [
    {
      path: '~/app/components', pathPrefix: false
    }
  ]
})
