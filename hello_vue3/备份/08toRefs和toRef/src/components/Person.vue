<template>
    <div class="person">
        <h2>姓名：{{ person.name }}</h2>
        <h2>年龄：{{ age1 }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
        <br>
    </div>
</template>

<!-- 这个script标签用于配置组件名 -->
<script lang="ts">
export default {
    name: 'Person',
}
</script>

<!-- 语法糖实现setup -->
<script setup lang="ts">
// 引入响应式
import { reactive, toRefs, toRef } from 'vue'

let person = reactive({
    name: '章三',
    age: 19
})

// 将响应式对象的属性解构，依然保持响应式
let {name, age} = toRefs(person)
// 只结构响应式对象中的某一个属性，保持其响应式
let age1 = toRef(person, 'age')

// 非响应式，改变时模板中的元素值不变
function changeName() {
    // setup函数中this是未定义的，不可用
    // this.name = '藏三'
    name.value = '张三'
}

function changeAge() {
    age.value += 1
}

function showTel() {
    alert(tel)
}

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