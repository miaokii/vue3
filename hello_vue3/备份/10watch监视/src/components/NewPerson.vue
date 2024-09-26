<template>
    <h2>情况四：监视ref或reactive定义的对象类型中的某个属性</h2>
    <h3>姓名：{{ person.name }}</h3>
    <h3>年龄：{{ person.age }}</h3>
    <h3>汽车：{{ car }}</h3>

    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改所有车</button>

    <h2>情况四：监视多个值</h2>
    
</template>

<script lang="ts">
export default {
    name: 'NewPerson'
}
</script>

<script lang="ts" setup>
import { reactive, watch, computed } from 'vue'

let person = reactive({
    name: '章三',
    age: 10,
    car: {
        c1: '宝马',
        c2: '奥迪'
    }
})

let car = computed(() => {
    return person.car.c1 + '、' + person.car.c2
}
)

function changeName() {
    person.name += '~'
}

function changeAge() {
    person.age += 1
}

function changeC1() {
    person.car.c1 = '奥迪'
}

function changeC2() {
    person.car.c2 = '福特'
}

function changeCar() {
    person.car = {
        c1: 'Audi',
        c2: 'BMW'
    }
}

// 监视属性是基础类型，需要用getter函数，即返回值
// 监视地址值
watch(() => person.name, (newValue, oldValue) => {
    console.log('person.name变化', newValue, oldValue);
})

// car是对象类型，可以监测到内部属性的变化，但是整体car改变，不能监听到
// 如果car被整体被重新赋值，监视需要用getter函数
// 如果car属性改变和整体改变都要监视，就用getter函数，并且开启深度监视
// watch(()=>person.car, (newValue, oldValue) => {
//     console.log('person.car变化', newValue, oldValue);
// }, {deep:true})


watch([()=>person.name, person.car, ()=>person.car.c1], (newValue, oldValue) => {
    console.log('person变化', newValue, oldValue);
})

</script>

<style>
button {
    margin: 0 0 0 10px;
}
</style>