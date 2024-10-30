import Props from "@/pages/1_props/Father.vue";
import Event from '@/pages/2_custom-event/Father.vue'
import Mitt from '@/pages/3_mitt/Father.vue'

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
        }, {
            path:'/',
            redirect:'/props'
        }
    ]
})

export default router