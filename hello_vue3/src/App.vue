<!-- html结构 -->
<template>

<!-- 使用:属性名传递数据，传入的值为表达式的值 -->
<Person sheetTitle="值日表" :persons="persons"/>

</template>

<!-- 脚本 ts或js -->
<script lang="ts" setup name="App">
import Person from './components/Person.vue';
import {type PersonList, type PersonInterface} from '@/types'
import {reactive} from 'vue'

let persons: PersonList = [
    {name: '章三', age: 12, id:'00001'},
    {name: '赵四', age: 33, id:'00002'},
    {name: '章三', age: 12, id:'00003', gender:1}
]

let mans = reactive<PersonList>([
    {name: '章三', age: 12, id:'00001'},
    {name: '赵四', age: 33, id:'00002'},
    {name: '章三', age: 12, id:'00003', gender:1}
])

</script>

<!-- 样式 -->
<style></style>