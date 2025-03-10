import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getLocal } from './common/ts/utils'
import 'leaflet/dist/leaflet.css'

import { utils } from './utils/pubUse'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.utils = utils

router.beforeEach((to, from, next) => {
    if (to.name == 'login') {
        next()
    }
    // 未登录
    else if (!getLocal('token')) {
        next({name: 'login'})
    } else {
        next()
    }
})

app.mount('#app')
