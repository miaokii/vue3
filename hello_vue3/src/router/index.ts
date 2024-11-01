import Props from "@/pages/1_props/Father.vue";
import Event from '@/pages/2_custom-event/Father.vue'
import Mitt from '@/pages/3_mitt/Father.vue'
import VModel from '@/pages/4_v-model/Father.vue'
import Attrs from '@/pages/5_$attrs/Father.vue'
import RefsParent from '@/pages/6_$refs-$parent/Father.vue'
import ProvideInject from '@/pages/7_provide-inject/Father.vue'
import PiniaHome from "@/pages/8_pinia/Home.vue";
import Slot from '@/pages/9_slot/Home.vue'

import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/props',
            component: Props
        },{
            path:'/event',
            component: Event
        },{
            path:'/mitt',
            component: Mitt
        },{
            path:'/vmodel',
            component: VModel
        },{
            path:'/attrs',
            component: Attrs
        },{
            path:'/refsParent',
            component: RefsParent
        }, {
            path:'/provideInject',
            component: ProvideInject
        }, {
            path:'/pinia',
            component: PiniaHome
        }, {
            path:'/slot',
            component: Slot
        }, {
            path:'/',
            redirect:'/props'
        }
    ]
})

export default router