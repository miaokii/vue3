<template>
    <h1>Watch监视</h1>
    <div class="person">
        <h2>情况一：监视【ref】定义的【基本类型】数据</h2>
        <h3>当前num：{{ num }}</h3> <br>
        <button @click="changeNum">num+1</button>

        <h2>情况二：监视【ref】定义的【对象类型】数据</h2>
        <h3>姓名：{{ person.name }}</h3>
        <h3>年龄：{{ person.age }}</h3>

        <button @click="changeName">改姓名</button>
        <button @click="changeAge">改年龄</button>
        <button @click="changePerson">换个人</button>

        <h2>情况三：监视【reactive】定义的【对象类型】数据</h2>
        <h3>姓名：{{ man.name }}</h3>
        <h3>年龄：{{ man.age }}</h3>

        <button @click="changeManName">改姓名</button>
        <button @click="changeManAge">改年龄</button>
        <button @click="changeMan">换个人</button>

        <NewPerson></NewPerson>
    </div>
</template>

<!-- 这个script标签用于配置组件名 -->
<script lang="ts">
import NewPerson from './NewPerson.vue'
export default {
    name: 'Person',
    components: {NewPerson}
}
</script>

<!-- 语法糖实现setup -->
<script setup lang="ts">
// 引入响应式，监视
import { ref, reactive, watch } from 'vue'

let num = ref(0)

// 情况一，ref监视基本类型数据
// 监听num，不是num.value
// watch返回值是一个函数
let stopWatch = watch(num, (newValue, oldValue) => {
    console.log('num改变', newValue, oldValue);
    // 停止监视
    if (newValue > 10) {
        stopWatch()
    }
})

function changeNum() {
    num.value += 1
}


// 情况二，监视对象类型数据
let person = ref({
    name: '张三',
    age: 18
})

// 如果要监视对象内部的属性，需要开启深度监视
// 参数1：监视对象
// 参数2：监视回调
// 参数3：配置对象（deep：深度监视，immediate：立即监视）
watch(person, (newValue, oldValue) => {
    console.log('person变化', newValue, oldValue)
}, {deep: true})

function changeName() {
    person.value.name += '～'
}

function changeAge() {
    person.value.age += 1
}

function changePerson() {
    person.value = {
        name: '李四',
        age: 20
    }
}

// 情况三，reactive监视对象类型数据
let man = reactive({
    name: '张三',
    age: 18
})

// reactive监视的对象，默认开启了深度监视，内部属性变化，也能监视到
// 隐式创建了深度监视，并且不能关闭
watch(man, (newValue, oldValue) => {
    console.log('person变化', newValue, oldValue)
})

function changeManName() {
    man.name += '～'
}

function changeManAge() {
    man.age += 1
}

function changeMan() {
    // 修改的是对象里面的每一个属性，而不是新建对象替换
    Object.assign( man, {
        name: '李四',
        age: 20
    })
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