// https://nuxt.com/docs/api/configuration/nuxt-config

/* 
* nuxt.config.ts用于覆盖或扩展应用的默认行为
* 
*
* 
*/

// 导出配置函数
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  app: {
    head: {
      // 备用标题
      title: 'HackNews',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      // 引用外部样式
      link: [{
        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
      }]
    },

    // pageTransition: { name: 'fade', mode: 'out-in' },
    // layoutTransition: { name: 'fade', mode: 'out-in' }
  },
  
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
      // vite预处理器
      preprocessorOptions: {
        scss: {
          // 让每个组件样式<style lang="scss">自动注入全局变量
          additionalData: `@use '~/assets/css/variables.scss' as *;`
        }
      }
    }
  }
})
