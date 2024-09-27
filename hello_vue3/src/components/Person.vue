<template>
    <div class="person">
        <h2>{{ sheetTitle }}</h2>
        <ul>
            <li v-for="item in persons" :key="item.id">{{ item.name }} {{ item.age }}</li>
        </ul>

        <h2>女性集合</h2>
        <ul>
            <li v-for="item in womens" :key="item.id">{{ item.name }}  {{ item.age }}</li>
        </ul>
    </div>
</template>

<!-- 语法糖实现setup -->
<script setup lang="ts" name='Person'>

// 导入类型时，必须用type标记
import { type PersonInterface, type PersonList } from '@/types'
import { defineProps, reactive } from 'vue'

// 接收父组件传入的数据，组件可能传入多个数据，用数组接收
// defineProps(['sheetTitle', 'persons', 'mans'])

// 接收父组件传入的数据，同时保存起来
// 解构
// let {sheetTitle, persons} = defineProps(['sheetTitle', 'persons'])
// console.log(sheetTitle, persons);

// 接受数据，并限定传入数据的类型
// defineProps<{persons: PersonList}>()

// 接收数据，限制类型，限制必填，设置默认值
withDefaults(defineProps<{sheetTitle?:string, persons:PersonList, womens?:PersonList}>(), {
    womens: ()=>[{name:'李姐', age:12, id:'00005', gender:1}],
    sheetTitle: ()=> "值日表"
})

</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin: 0 0 0 10px;
}
</style>