// 引入createApp用于创建应用
import { createApp } from "vue";
// 引入App根组件
import App from "./App.vue";
import { createPinia } from "pinia";


// 创建app
let app = createApp(App)
let pinia = createPinia()
app.use(pinia)
// 使用路由
// app.use(router)
// 挂载为app
app.mount('#app')