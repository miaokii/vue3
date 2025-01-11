import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ActionBar, ActionBarButton, ActionBarIcon, AddressEdit, AddressList, Button, Card, Cell, CellGroup, Checkbox, CheckboxGroup, ContactCard, Dialog, Divider, Field, Form, Icon, List, Loading, Overlay, Popup, PullRefresh, Skeleton, Stepper, SubmitBar, Swipe, SwipeCell, Tab, Toast } from 'vant'
import APIClient from './utils/APIClient'
import { createPinia } from 'pinia'

import 'vant/lib/index.css';
import 'vant/es/toast/style'
import './common/style/theme.css'

let app = createApp(App)
app.use(router)
app.use(createPinia())

// vant组件
app.use(ActionBarButton)
app.use(ActionBarIcon)
app.use(ActionBar)
app.use(Divider)
app.use(Popup)
app.use(Overlay)
app.use(Loading)
app.use(Dialog)
app.use(Toast)
app.use(ContactCard)
app.use(Form)
app.use(Field)
app.use(Cell)
app.use(SwipeCell)
app.use(CellGroup)
app.use(AddressEdit)
app.use(AddressList)
app.use(Icon)
app.use(Card)
app.use(Button)
app.use(Swipe)
app.use(Stepper)
app.use(PullRefresh)
app.use(List)
app.use(Tab)
app.use(SubmitBar)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Skeleton)


APIClient.initialize()

// 全局过滤器
// app.config.globalProperties.$filters = {
//     prefix(url: string) {
//         if (url && url.startsWith('http')) {
//             return url
//         } else {
//             url = `${appConfig.api}${url}`
//             return url
//         }
//     }
// }

app.mount('#app')
