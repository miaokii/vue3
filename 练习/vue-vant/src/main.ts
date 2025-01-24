import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { ActionSheet, Button, Checkbox, ConfigProvider, Dialog, Divider, Field, Form, Icon, NavBar, NumberKeyboard, Radio, RadioGroup, Tabbar, TabbarItem } from 'vant'

import 'vant/lib/index.css';
import 'vant/es/toast/style'
import APIClient from './uils/APIClient'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.use(ConfigProvider)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(Button)
app.use(Divider)
app.use(ActionSheet)
app.use(Form)
app.use(Field)
app.use(Checkbox)
app.use(Dialog)
app.use(NumberKeyboard)
app.use(Radio)
app.use(RadioGroup)

APIClient.initialize()

app.mount('#app')
