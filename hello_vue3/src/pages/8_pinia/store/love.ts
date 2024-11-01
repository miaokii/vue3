import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";
import { reactive } from "vue";

/// 选项式store
// export const useLoveStore = defineStore('talk', {
//     actions: {
//         async getALoveTalk() {
//             // 解构data内的content
//             let { data: { content } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//             // let { data: { content: title } }j结构后将content重命名为title
//             let obj = { id: nanoid(), content }
//             this.loveList.unshift(obj)
//         }
//     },
//     state() {
//         return {
//             // 从本地取talkList，否则为空数组
//             loveList: JSON.parse(localStorage.getItem('talkList') as string) || []
//         }
//     },
// })

// 组合式store

export const useLoveStore = defineStore('love', () => {
    let loveList = reactive(
        JSON.parse(localStorage.getItem('talkList') as string) || []
    )

    async function getALoveTalk() {
        // 解构data内的content
        let { data: { content } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
        // let { data: { content: title } }j结构后将content重命名为title
        let obj = { id: nanoid(), content }
        loveList.unshift(obj)
    }

    function deleteALoveTalk() {
        loveList.pop()
    }

    return {loveList, getALoveTalk, deleteALoveTalk}
})