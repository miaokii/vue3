import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ActionBar, ActionBarButton, ActionBarIcon, AddressEdit, AddressList, Button, Card, Cell, CellGroup, Checkbox, CheckboxGroup, ContactCard, Dialog, Divider, Field, Form, Icon, List, Loading, Overlay, Popup, PullRefresh, Skeleton, Stepper, SubmitBar, Swipe, SwipeCell, SwipeItem, Tab, Tabbar, TabbarItem, Tabs, Toast } from 'vant'
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
.use(ActionBarIcon)
.use(ActionBar)
.use(Divider)
.use(Popup)
.use(Overlay)
.use(Loading)
.use(Dialog)
.use(Toast)
.use(ContactCard)
.use(Form)
.use(AddressEdit)
.use(AddressList)
.use(Field)
.use(CellGroup)
.use(Cell)
.use(SwipeCell)
.use(Icon)
.use(Stepper)
.use(Card)
.use(Button)
.use(Swipe)
.use(SwipeItem)
.use(PullRefresh)
.use(List)
.use(Tab)
.use(Tabs)
.use(SubmitBar)
.use(Checkbox)
.use(CheckboxGroup)
.use(Skeleton)
.use(Tab)
.use(Tabbar)
.use(TabbarItem)

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
