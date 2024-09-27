<template>
    
</template>

<!-- 语法糖实现setup -->
<script setup lang="ts" name = 'Person'>

// 导入类型时，必须用type标记
import {type PersonInterface, type PersonList, type Persons} from '@/types'

let wangwu: PersonInterface = {
    name:'王五', age:13, id:'lokakfnhuiwqptnf00001'
} 

let zhaosi: PersonInterface = {
    name:'赵四', age:13, id:'lokakfnhuiwqptnf00002'
}

let mans: PersonList = [
    wangwu, zhaosi,
    {name: '章三', age: 12, id:'lokakfnhuiwqptnf00003'}
]

let womens: Persons = [
    wangwu, zhaosi
]

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