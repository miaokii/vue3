import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  //配置根路径，解决部署到服务器之后绝对路径会报404问题，所以需改为相对路径
  // base: './',
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  // 路径别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/images': './src/assets/images'
    },
  },
  // 生产环境
  build: {
    // 
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     // 生产环境移除log
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // },
    rollupOptions: {
      output: {
        // entry部分的文件命名，我们这里是spa,所以entry写死也没事,多入口的话需要注意了
        entryFileNames: "js/[name]-[hash].js",
        // 自定义chunk如何命名法，包含懒加载或者自定义分包的一些内容的命名
        chunkFileNames: "js/[name]-[hash].js",
        // 除js之外其他资源的存放
        // assetFileNames: "[ext]/[name]-[hash].[ext]",
        // 这里注意一下中括号里面的东西都是占位符
      }
    }
  }
})
